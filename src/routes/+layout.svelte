<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import Lenis from 'lenis';
	import gsap from 'gsap';

	import './layout.css';
	import Header from '$lib/components/header.svelte';
	import SEO from '$lib/components/seo.svelte';

	let { children } = $props();
	let lenis: Lenis | undefined;
	let curtain: HTMLDivElement;

	// --- Reduced motion ------------------------------------------------------
	// Runs during layout init, i.e. before any page's onMount creates its GSAP
	// timelines. Speeding up GSAP's global timeline makes every tween (page
	// reveals, menus, scroll-triggered items) land on its end state almost
	// immediately, without having to special-case each animation. CSS
	// transitions/animations are handled in layout.css, and Lenis honours the
	// preference itself (`respectReducedMotion`, on by default).
	const REDUCED_MOTION_TIME_SCALE = 20;
	let prefersReducedMotion = false;

	if (browser) {
		const media = window.matchMedia('(prefers-reduced-motion: reduce)');
		const apply = () => {
			prefersReducedMotion = media.matches;
			gsap.globalTimeline.timeScale(prefersReducedMotion ? REDUCED_MOTION_TIME_SCALE : 1);
		};
		apply();
		media.addEventListener('change', apply);
	}

	onMount(() => {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			smoothWheel: true
		});

		// Drive Lenis from GSAP's ticker so there's a single rAF loop and
		// scroll-linked GSAP animations read the same scroll value each frame.
		const tick = (time: number) => lenis?.raf(time * 1000);
		gsap.ticker.add(tick);
		gsap.ticker.lagSmoothing(0);

		gsap.set(curtain, { yPercent: 100, autoAlpha: 1 });

		return () => {
			gsap.ticker.remove(tick);
			lenis?.destroy();
		};
	});

	// --- Page transition -----------------------------------------------------
	// One continuous upward wipe: the curtain rises from the bottom to cover the
	// page (accelerating), the route swaps underneath, then it keeps travelling
	// up and out of the top (decelerating). Together the two halves read as a
	// single ease-in-out sweep, and the whole thing takes ~0.8s instead of the
	// previous 1.1s (0.5s up + 0.1s delay + 0.5s back down).
	const COVER_DURATION = 0.35;
	const REVEAL_DURATION = 0.45;

	// Incremented per transition. Lets a stale callback (from a navigation that
	// was superseded by a newer one) recognise itself and do nothing.
	let transitionId = 0;
	let isTransitioning = false;

	function reveal(id = transitionId) {
		if (!isTransitioning || id !== transitionId) return;
		requestAnimationFrame(() => {
			if (id !== transitionId) return;
			gsap.to(curtain, {
				yPercent: -100,
				duration: REVEAL_DURATION,
				ease: 'power3.out',
				overwrite: true,
				onComplete: () => {
					gsap.set(curtain, { display: 'none', yPercent: 100 });
					document.body.style.overflow = '';
					lenis?.start();
					isTransitioning = false;
				}
			});
		});
	}

	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;
		// Full page loads and reduced-motion users skip the curtain entirely.
		if (navigation.willUnload || prefersReducedMotion || !curtain) return;

		const id = ++transitionId;
		isTransitioning = true;

		// If the navigation fails or is cancelled, don't leave the curtain
		// covering the page with scrolling stopped. Ignored if a newer
		// navigation has already taken over the curtain.
		navigation.complete.catch(() => reveal(id));

		return new Promise((resolve) => {
			lenis?.stop();
			document.body.style.overflow = 'hidden';

			gsap.set(curtain, { display: 'block', yPercent: 100 });
			gsap.to(curtain, {
				yPercent: 0,
				duration: COVER_DURATION,
				ease: 'power3.in',
				overwrite: true,
				onComplete: () => resolve(),
				// A newer navigation took over the curtain mid-cover. Let this one
				// continue so SvelteKit can discard it instead of leaving it pending.
				onInterrupt: () => resolve()
			});
		});
	});

	afterNavigate(() => reveal());
</script>

<svelte:head>
	<link
		rel="preload"
		href="/fonts/Switzer-Variable.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
</svelte:head>

<SEO />
<Header />

<div
	bind:this={curtain}
	class="pointer-events-none fixed inset-0 z-99999 h-screen w-screen bg-bg"
	style="display: none;"
></div>

<main
	class="flex min-h-[calc(100vh-var(--header-height-mobile))] w-full flex-col
  bg-bg
  px-6
  pt-4
  pb-12
  md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))] lg:px-9 lg:pt-12 2xl:min-h-[calc(100vh-var(--header-height-ultrawide))] 2xl:px-24 2xl:pt-20"
>
	{@render children()}
</main>
