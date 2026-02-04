<script lang="ts">
	import { onMount } from 'svelte';
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

<main class="w-full h-screen">
	{@render children()}
</main>
