<script lang="ts">
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { Moon, Sun } from '@lucide/svelte';

	import TumblerYear from './tumblerYear.svelte';
	import NavDock from './navDock.svelte';

	// Hairline under the sticky header once the page has scrolled.
	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 4);

	let themeTimer: ReturnType<typeof setTimeout> | undefined;

	function toggleTheme() {
		const root = document.documentElement;
		const isLight = !root.classList.contains('light');

		// Fade the inherited colour tokens for a moment. The icon keeps its own
		// rotate/scale transition.
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			root.classList.add('theme-transition');
			clearTimeout(themeTimer);
			themeTimer = setTimeout(() => root.classList.remove('theme-transition'), 550);
		}

		root.classList.toggle('light', isLight);
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', isLight ? '#f8f7f4' : '#131313');

		try {
			localStorage.setItem('theme', isLight ? 'light' : 'dark');
		} catch {
			// localStorage can be unavailable; the theme still toggles for this session.
		}
	}

	onMount(() => () => clearTimeout(themeTimer));
</script>

<svelte:window bind:scrollY />

<header
	class="sticky top-0 z-50 flex h-(--header-height-mobile) w-full flex-row items-center justify-between border-b bg-bg/90 px-6 text-base font-semibold tracking-tight backdrop-blur-sm transition-[border-color] duration-300 md:h-(--header-height-tablet) lg:h-(--header-height-desktop) lg:px-9 lg:text-xl 2xl:h-(--header-height-ultrawide) 2xl:px-24 2xl:text-3xl {isScrolled
		? 'border-text/10'
		: 'border-transparent'}"
>
	<div class="flex items-center gap-4 2xl:gap-8">
		<a
			href={resolve('/')}
			class="group relative block overflow-hidden outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent focus-visible:outline-solid active:opacity-60"
		>
			<span
				class="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full"
			>
				pedro lunet
			</span>
			<span
				class="absolute inset-0 translate-y-full text-accent transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
				aria-hidden="true"
			>
				pedro lunet
			</span>
		</a>
	</div>

	<NavDock />

	<div class="flex flex-row items-center gap-3 md:gap-4 2xl:gap-8">
		<button
			type="button"
			onclick={toggleTheme}
			aria-label="Toggle color theme"
			title="Toggle color theme"
			class="theme-toggle group flex h-10 w-10 shrink-0 items-center justify-center text-text/50 transition-[color,transform] duration-150 ease-out outline-none hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text focus-visible:outline-solid active:scale-90 motion-reduce:transition-none"
		>
			<span
				class="relative flex h-4 w-4 items-center justify-center 2xl:h-5 2xl:w-5"
				aria-hidden="true"
			>
				<Sun
					size={16}
					strokeWidth={2}
					class="absolute inset-0 h-full w-full scale-0 -rotate-90 opacity-0 transition-[opacity,rotate,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none light:scale-100 light:rotate-0 light:opacity-100"
				/>
				<Moon
					size={16}
					strokeWidth={2}
					class="absolute inset-0 h-full w-full scale-100 rotate-0 opacity-100 transition-[opacity,rotate,scale] duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none light:scale-0 light:rotate-90 light:opacity-0"
				/>
			</span>
		</button>

		<a
			href="https://buymeacoffee.com/pedrolunet"
			target="_blank"
			rel="noopener noreferrer"
			class="group hidden flex-row items-center justify-center gap-2 border border-transparent transition-all duration-300 hover:border-accent-light active:scale-90 sm:flex md:h-7 md:px-3 2xl:h-9 2xl:gap-3 2xl:px-4"
			aria-label="Buy me a coffee"
		>
			<img
				src="/bmc.webp"
				alt="BMC Logo"
				class="mask aspect-square w-4.5 object-contain opacity-50 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 md:w-3.5 2xl:w-4.5"
			/>
			<span
				class="hidden text-[10px] font-semibold tracking-tight text-text/50 transition-colors duration-300 group-hover:text-text md:block md:text-xs 2xl:text-sm"
			>
				buy me a coffee
			</span>
		</a>

		<div class="flex flex-row items-center gap-1.5">
			<span class="hidden sm:inline">portfolio</span><TumblerYear />
		</div>
	</div>
</header>

<noscript>
	<nav
		aria-label="Site"
		class="flex flex-wrap gap-x-6 gap-y-2 border-b border-text/10 bg-bg px-6 py-3 text-[11px] font-bold tracking-[0.18em] text-text-secondary uppercase lg:px-9 2xl:px-24"
	>
		<a href={resolve('/work')} class="transition-colors hover:text-accent">Work</a>
		<a href={resolve('/about')} class="transition-colors hover:text-accent">About</a>
		<a href={resolve('/contact')} class="transition-colors hover:text-accent">Contact</a>
		<a href={resolve('/mural')} class="transition-colors hover:text-accent">Mural</a>
	</nav>
</noscript>
