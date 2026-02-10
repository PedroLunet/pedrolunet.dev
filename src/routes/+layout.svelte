<script lang="ts">
	import { onMount } from 'svelte';
	import { onNavigate, afterNavigate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';
	import gsap from 'gsap';

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();
	let lenis: Lenis;
	let curtain: HTMLDivElement;

	onMount(() => {
		lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			orientation: 'vertical',
			smoothWheel: true
		});

		function raf(time: number) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		if (curtain) {
			gsap.set(curtain, { yPercent: 100, autoAlpha: 1 });
		}
	});

	onNavigate((navigation) => {
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			if (lenis) lenis.stop();
			document.body.style.overflow = 'hidden';

			gsap.set(curtain, { display: 'block', yPercent: 100 });

			gsap.to(curtain, {
				yPercent: 0,
				duration: 0.5,
				ease: 'power4.inOut',
				onComplete: () => {
					resolve();
				}
			});
		});
	});

	afterNavigate(() => {
		window.scrollTo(0, 0);

		requestAnimationFrame(() => {
			gsap.to(curtain, {
				yPercent: 100,
				duration: 0.5,
				ease: 'power4.inOut',
				delay: 0.1,
				onComplete: () => {
					gsap.set(curtain, { display: 'none' });

					document.body.style.overflow = '';
					if (lenis) lenis.start();
				}
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		rel="preload"
		href="/fonts/Switzer-Variable.ttf"
		as="font"
		type="font/ttf"
		crossorigin="anonymous"
	/>
</svelte:head>

<Header />

<div
	bind:this={curtain}
	class="pointer-events-none fixed inset-0 z-99999 h-screen w-screen bg-bg"
	style="display: none;"
></div>

<main
	class="min-h-[calc(100vh-var(--header-height-mobile))] w-full md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))]"
>
	{@render children()}
</main>
