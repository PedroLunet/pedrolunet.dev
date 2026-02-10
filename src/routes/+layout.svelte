<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import Lenis from '@studio-freight/lenis';

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/header.svelte';

	let { children } = $props();

	onMount(() => {
		const lenis = new Lenis({
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
	});

	afterNavigate(() => {
		document.body.style.overflow = '';
		document.documentElement.style.overflow = '';
		window.scrollTo(0, 0);
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

<main
	class="min-h-[calc(100vh-var(--header-height-mobile))] w-full md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))]"
>
	{@render children()}
</main>
