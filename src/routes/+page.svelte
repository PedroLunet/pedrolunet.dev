<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	import Hero from '$lib/components/landing/hero.svelte';

	let ctx: gsap.Context;

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		ctx = gsap.context(() => {
			if (reduceMotion) {
				gsap.set('.hero-text', { y: 0, autoAlpha: 1 });
				return;
			}

			gsap.set('.hero-text', { y: 20, autoAlpha: 0 });

			gsap.to('.hero-text', {
				y: 0,
				autoAlpha: 1,
				duration: 1.2,
				ease: 'power3.out',
				stagger: 0.3
			});
		});

		return () => ctx.revert();
	});
</script>

<div class="relative w-full flex-1 overflow-hidden">
	<div class="absolute inset-0 z-10 flex flex-col items-start justify-center">
		<Hero />
	</div>
</div>

<style>
	:global(.hero-text) {
		opacity: 0;
		visibility: hidden;
	}
</style>
