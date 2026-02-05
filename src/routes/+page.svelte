<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Hero from '$lib/components/landing/hero.svelte';
	import Menu from '$lib/components/landing/menu.svelte';
	import Block from '$lib/components/landing/block.svelte';

	let isMenuOpen = $state(false);
	let tlOpen: gsap.core.Timeline;
	let ctx: gsap.Context;

	onMount(() => {
		let mm = gsap.matchMedia();

		ctx = gsap.context(() => {
			const tlLoad = gsap.timeline();

			gsap.set('.hero-text', { y: 20, autoAlpha: 0 });
			gsap.set('.menu-item', { x: 50, autoAlpha: 0 });

			tlLoad.addLabel('start').to(
				'.hero-text',
				{
					y: 0,
					autoAlpha: 1,
					duration: 1.2,
					ease: 'power3.out',
					stagger: 0.3
				},
				'start'
			);

			mm.add('(min-width: 1024px)', () => {
				tlLoad.fromTo(
					'.js-block',
					{ width: 0, autoAlpha: 1 },
					{ width: '12rem', duration: 2.5, ease: 'power4.out' },
					'-=1.0'
				);
			});
			mm.add('(max-width: 1023px)', () => {
				tlLoad.fromTo(
					'.js-block',
					{ height: 0, autoAlpha: 1 },
					{ height: '3rem', duration: 2.5, ease: 'power4.out' },
					'-=1.0'
				);
			});

			tlOpen = gsap.timeline({ paused: true });

			tlOpen.to(
				'.hero-text',
				{
					x: -50,
					autoAlpha: 0,
					duration: 0.8,
					ease: 'power3.inOut',
					stagger: 0.05
				},
				0
			);

			tlOpen.to(
				'.menu-item',
				{
					x: 0,
					autoAlpha: 1,
					duration: 1.2,
					ease: 'power3.inOut',
					stagger: 0.1
				},
				0.2
			);

			tlOpen.to(
				'.js-block',
				{
					rotation: 90,
					scale: 0.8,
					duration: 0.8,
					ease: 'back.out(1.7)'
				},
				0
			);
		});

		return () => ctx.revert();
	});

	function toggle() {
		if (!tlOpen) return;
		isMenuOpen ? tlOpen.reverse() : tlOpen.play();
		isMenuOpen = !isMenuOpen;
	}
</script>

<div class="relative h-full w-full overflow-hidden px-6 lg:px-9">
	<div class="absolute inset-0 flex flex-col justify-center px-6 lg:px-9">
		<Hero>
			{#snippet block()}
				<Block onclick={toggle} />
			{/snippet}
		</Hero>
	</div>

	<div
		class="pointer-events-none absolute inset-0 flex flex-col items-end justify-center px-6 lg:px-9"
	>
		<Menu isOpen={isMenuOpen} />
	</div>
</div>
