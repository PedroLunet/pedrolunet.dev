<script lang="ts">
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import TumblerYear from './tumblerYear.svelte';
	import Menu from '$lib/components/landing/menu.svelte';

	let isMenuOpen = $state(false);
	let tl: gsap.core.Timeline;
	let ctx: gsap.Context;

	let isHomePage = $derived($page.url.pathname === '/');

	onMount(() => {
		ctx = gsap.context(() => {
			tl = gsap.timeline({ paused: true });

			tl.to(
				'.header-block-bg',
				{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100vw',
					height: '100vh',
					borderRadius: 0,
					margin: 0,
					x: 0,
					y: 0,
					zIndex: 40,
					duration: 0.8,
					ease: 'expo.inOut'
				},
				0
			);

			tl.to(
				'.header-content-wrapper',
				{
					autoAlpha: 0,
					duration: 0.3
				},
				0
			);

			tl.to(
				'.menu-overlay',
				{
					autoAlpha: 1,
					duration: 0.1
				},
				0
			);

			tl.fromTo(
				'.menu-item',
				{ x: 50, autoAlpha: 0 },
				{ x: 0, autoAlpha: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out' },
				0.4
			);
		});

		return () => ctx.revert();
	});

	function toggleMenu() {
		if (!tl) return;
		if (isMenuOpen) {
			tl.reverse();
			isMenuOpen = false;
		} else {
			tl.play();
			isMenuOpen = true;
		}
	}

	afterNavigate(() => {
		if (isMenuOpen && tl) {
			tl.reverse();
			isMenuOpen = false;
		}
	});
</script>

<div
	class="menu-overlay pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-center px-6 opacity-0 lg:px-9"
>
	<Menu isOpen={isMenuOpen} />
</div>

<header
	class="relative z-50 flex h-(--header-height-mobile) w-full flex-row items-center justify-between px-6 text-base font-semibold tracking-tight md:h-(--header-height-tablet) lg:h-(--header-height-desktop) lg:px-9 lg:text-xl"
>
	<div class="header-content-wrapper flex items-center gap-4 transition-opacity">
		<a href="/">pedro lunet</a>

		<button
			onclick={toggleMenu}
			class="group relative flex h-6 w-6 items-center justify-center transition-all duration-300"
			class:opacity-0={isHomePage}
			class:pointer-events-none={isHomePage}
			aria-label="Open Menu"
		>
			<div
				class="header-block-bg h-3 w-3 bg-accent transition-transform duration-300 group-hover:rotate-90"
			></div>
		</button>
	</div>

	<div class="header-content-wrapper flex flex-row items-center transition-opacity">
		<span>portfolio </span><TumblerYear />
	</div>
</header>
