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
			tl = gsap.timeline({ paused: true });

			const targetColor = bgSamplerRef
				? window.getComputedStyle(bgSamplerRef).backgroundColor
				: '#0a0a0a';

			tl.add(() => {
				if (triggerRef && ghostRef) {
					const rect = triggerRef.getBoundingClientRect();
					gsap.set(ghostRef, {
						position: 'fixed',
						top: rect.top,
						left: rect.left,
						width: rect.width,
						height: rect.height,
						autoAlpha: 1,
						backgroundColor: '#FF4D00',
						borderRadius: '0px'
					});
				}
			}, 0);

			if (ghostRef) {
				tl.to(
					ghostRef,
					{
						top: 0,
						left: 0,
						width: '100vw',
						height: '100vh',
						backgroundColor: targetColor,
						duration: 0.8,
						ease: 'expo.inOut'
					},
					0
				);
			}

			tl.to('.header-content-wrapper', { autoAlpha: 0, duration: 0.3 }, 0);

			tl.to('.menu-overlay', { autoAlpha: 1, duration: 0.1 }, 0);

			tl.fromTo('.close-strip', { x: '-100%' }, { x: '0%', duration: 1.0, ease: 'expo.out' }, 0.4);

			tl.fromTo(
				'.menu-item',
				{ x: 100, autoAlpha: 0 },
				{ x: 0, autoAlpha: 1, duration: 1.0, stagger: 0.1, ease: 'expo.out' },
				0.5
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

<div bind:this={ghostRef} class="pointer-events-none fixed z-40 hidden bg-accent"></div>

<div class="menu-overlay pointer-events-none fixed inset-0 z-50 flex opacity-0">
	<div
		class="close-strip border-text-primary/10 absolute top-0 left-0 z-60 h-full w-12 border-r lg:w-24"
	>
		<button
			onclick={toggleMenu}
			class="group pointer-events-auto flex h-full w-full flex-col items-center justify-center gap-8 transition-colors hover:bg-accent/5"
		>
			<div class="h-full w-px bg-text-secondary/20 transition-colors group-hover:bg-accent"></div>
			<span
				class="text-text-primary -rotate-90 text-xs font-bold tracking-[0.2em] whitespace-nowrap uppercase transition-colors group-hover:text-accent"
			>
				Close
			</span>
			<div class="h-full w-px bg-text-secondary/20 transition-colors group-hover:bg-accent"></div>
		</button>
	</div>

	<div
		class="pointer-events-auto flex h-full w-full flex-col items-end justify-center bg-bg px-6 pl-12 lg:px-9 lg:pl-24"
	>
		<Menu isOpen={isMenuOpen} />
	</div>
</div>

<header
	class="relative z-50 flex h-(--header-height-mobile) w-full flex-row items-center justify-between px-6 text-base font-semibold tracking-tight md:h-(--header-height-tablet) lg:h-(--header-height-desktop) lg:px-9 lg:text-xl"
>
	<div class="header-content-wrapper flex items-center gap-4 transition-opacity">
		<a href="/">pedro lunet</a>

		<button
			bind:this={triggerRef}
			onclick={toggleMenu}
			class="group relative h-4.5 w-auto min-w-9 overflow-hidden bg-accent px-2"
			class:opacity-0={isHomePage}
			class:pointer-events-none={isHomePage}
			aria-label="Open Menu"
		>
			<div
				class="absolute inset-0 flex h-[200%] w-full flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2"
			>
				<span
					class="flex h-1/2 w-full items-end justify-center text-xs leading-none font-semibold tracking-tight text-bg uppercase"
				>
					Menu
				</span>

				<span
					class="flex h-1/2 w-full items-end justify-center text-xs leading-none font-semibold tracking-tight text-bg uppercase"
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
