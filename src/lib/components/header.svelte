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

			tl = gsap.timeline({
				paused: true,
				onStart: () => {
					if (!triggerRef || !ghostRef || isHomePage) return;

					const rect = triggerRef.getBoundingClientRect();
					gsap.set(ghostRef, {
						top: rect.top,
						left: rect.left,
						width: rect.width,
						height: rect.height,
						scale: 1,
						borderRadius: '0px',
						backgroundColor: '#FF4D00',
						autoAlpha: 1,
						display: 'block'
					});

					gsap.set('.ghost-text-wrapper', { autoAlpha: 1 });
					gsap.set(triggerRef, { autoAlpha: 0 });
				},
				onReverseComplete: () => {
					if (triggerRef) gsap.set(triggerRef, { autoAlpha: 1 });
					if (ghostRef) gsap.set(ghostRef, { autoAlpha: 0, display: 'none' });
				}
			});

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

			tl.to('.ghost-text-wrapper', { autoAlpha: 0, duration: 0.2 }, 0.1);
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
		if (tl) {
			tl.pause();
			tl.progress(0);
			tl.kill();
		}

		isMenuOpen = false;

		if (ghostRef) {
			gsap.set(ghostRef, {
				clearProps: 'all',
				autoAlpha: 0,
				display: 'none'
			});
		}

		gsap.set(['.menu-overlay', '.close-strip', '.menu-item'], {
			clearProps: 'all',
			autoAlpha: 0,
			visibility: 'hidden'
		});

		gsap.set('.header-content-wrapper', {
			clearProps: 'all',
			autoAlpha: 1
		});

		if (triggerRef) {
			gsap.set(triggerRef, {
				clearProps: 'all',
				autoAlpha: 1
			});
		}
	});
</script>

<div bind:this={bgSamplerRef} class="hidden bg-bg"></div>

<div
	bind:this={ghostRef}
	class="pointer-events-none invisible fixed z-55 overflow-hidden bg-accent px-2 will-change-transform"
	class:hidden={isHomePage}
>
	<div class="ghost-text-wrapper absolute inset-0 flex h-[200%] w-full flex-col">
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
</div>

<div class="menu-overlay pointer-events-none invisible fixed inset-0 z-60 flex opacity-0">
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
	class="sticky top-0 z-50 flex h-(--header-height-mobile) w-full flex-row items-center justify-between bg-bg/90 px-6 text-base font-semibold tracking-tight backdrop-blur-sm transition-all duration-300
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
		<span>portfolio </span><TumblerYear />
	</div>
</header>
