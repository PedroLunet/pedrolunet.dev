<script lang="ts">
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import TumblerYear from './tumblerYear.svelte';
	import Menu from '$lib/components/landing/menu.svelte';

	let isMenuOpen = $state(false);
	let tl: gsap.core.Timeline;
	let ctx: gsap.Context;

	let triggerRef = $state<HTMLButtonElement>();
	let ghostRef = $state<HTMLDivElement>();
	let bgSamplerRef = $state<HTMLDivElement>();

	let isHomePage = $derived(page.url.pathname === '/');

	onMount(() => {
		ctx = gsap.context(() => {
			if (!triggerRef || !ghostRef || !bgSamplerRef) return;

			const targetColor = window.getComputedStyle(bgSamplerRef).backgroundColor || '#0a0a0a';

			tl = gsap.timeline({ paused: true });

			tl.add(() => {
				const rect = triggerRef!.getBoundingClientRect();
				gsap.set(ghostRef!, {
					position: 'fixed',
					top: rect.top,
					left: rect.left,
					width: rect.width,
					height: rect.height,
					autoAlpha: 1,
					scale: 1,
					backgroundColor: '#FF4D00',
					borderRadius: '0px'
				});
			}, 0);

			tl.to(ghostRef, { scale: 0.9, duration: 0.1, ease: 'power1.out' }, 0);

			tl.to(
				ghostRef,
				{
					top: 0,
					left: 0,
					scale: 1,
					width: '100vw',
					height: '100vh',
					backgroundColor: targetColor,
					duration: 0.8,
					ease: 'expo.inOut'
				},
				0.1
			);

			tl.to('.header-content-wrapper', { autoAlpha: 0, duration: 0.3 }, 0.1);
			tl.to('.menu-overlay', { autoAlpha: 1, duration: 0.01 }, 0.1);

			tl.fromTo('.close-strip', { x: '-100%' }, { x: '0%', duration: 1.0, ease: 'expo.out' }, 0.5);
			tl.fromTo(
				'.menu-item',
				{ x: 100, autoAlpha: 0 },
				{ x: 0, autoAlpha: 1, duration: 1.0, stagger: 0.1, ease: 'expo.out' },
				0.6
			);
		});

		return () => ctx.revert();
	});

	function toggleMenu() {
		if (!tl) return;
		if (isMenuOpen) {
			tl.timeScale(1.5).reverse();
			isMenuOpen = false;
		} else {
			tl.timeScale(1).play();
			isMenuOpen = true;
		}
	}

	afterNavigate(() => {
		if (isMenuOpen && tl) {
			tl.progress(0).pause();
			isMenuOpen = false;
		}
	});
</script>

<div bind:this={bgSamplerRef} class="hidden bg-bg"></div>

<div
	bind:this={ghostRef}
	class="pointer-events-none invisible fixed z-40 bg-accent transition-opacity duration-300"
	class:!opacity-0={isHomePage}
	class:!invisible={isHomePage}
></div>

<div class="menu-overlay pointer-events-none invisible fixed inset-0 z-50 flex opacity-0">
	<div
		class="close-strip absolute top-0 left-0 z-60 h-full w-12 border-r border-text/10 lg:w-24 2xl:w-32"
	>
		<button
			onclick={toggleMenu}
			class="group pointer-events-auto flex h-full w-full flex-col items-center justify-center gap-8 transition-colors hover:bg-accent/5 2xl:gap-16"
		>
			<div class="h-full w-px bg-text-secondary/20 transition-colors group-hover:bg-accent"></div>
			<span
				class="-rotate-90 text-xs font-bold tracking-[0.2em] whitespace-nowrap text-text uppercase transition-colors group-hover:text-accent 2xl:text-sm"
			>
				Close
			</span>
			<div class="h-full w-px bg-text-secondary/20 transition-colors group-hover:bg-accent"></div>
		</button>
	</div>

	<div
		class="pointer-events-auto flex h-full w-full flex-col items-end justify-center bg-bg px-6 pl-12 lg:px-9 lg:pl-24 2xl:px-24 2xl:pl-48"
	>
		<Menu isOpen={isMenuOpen} />
	</div>
</div>

<header
	class="relative z-50 flex h-(--header-height-mobile) w-full flex-row items-center justify-between px-6 text-base font-semibold tracking-tight
  md:h-(--header-height-tablet)
  lg:h-(--header-height-desktop) lg:px-9 lg:text-xl
  2xl:h-(--header-height-ultrawide) 2xl:px-24 2xl:text-3xl"
>
	<div class="header-content-wrapper flex items-center gap-4 transition-opacity 2xl:gap-8">
		<a href="/">pedro lunet</a>

		<button
			bind:this={triggerRef}
			onclick={toggleMenu}
			class="group relative h-4.5 w-auto min-w-9 overflow-hidden bg-accent px-2 transition-transform duration-100 active:scale-90
      2xl:h-8 2xl:min-w-16 2xl:px-4"
			class:opacity-0={isHomePage}
			class:pointer-events-none={isHomePage}
			aria-label="Open Menu"
		>
			<div
				class="absolute inset-0 flex h-[200%] w-full flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2"
			>
				<span
					class="flex h-1/2 w-full items-end justify-center text-xs leading-none font-semibold tracking-tight text-bg uppercase 2xl:text-sm"
				>
					Menu
				</span>
				<span
					class="flex h-1/2 w-full items-end justify-center text-xs leading-none font-semibold tracking-tight text-bg uppercase 2xl:text-sm"
				>
					Menu
				</span>
			</div>
		</button>
	</div>

	<div class="header-content-wrapper flex flex-row items-center transition-opacity">
		<span>portfolio </span>
		<TumblerYear />
	</div>
</header>
