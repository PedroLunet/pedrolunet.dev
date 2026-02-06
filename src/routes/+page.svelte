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

			tlLoad
				.addLabel('start')
				.to(
					'.hero-text',
					{ y: 0, autoAlpha: 1, duration: 1.2, ease: 'power3.out', stagger: 0.3 },
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
					duration: 0.5,
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
					duration: 0.6,
					ease: 'power3.out',
					stagger: 0.05
				},
				0.2
			);

			tlOpen.to(
				'.js-block',
				{
					x: () => {
						const block = document.querySelector('.js-block');
						const ghost = document.querySelector('.js-ghost-target');
						if (!block || !ghost) return 0;
						return ghost.getBoundingClientRect().left - block.getBoundingClientRect().left;
					},
					y: () => {
						const block = document.querySelector('.js-block');
						const ghost = document.querySelector('.js-ghost-target');
						if (!block || !ghost) return 0;
						return ghost.getBoundingClientRect().top - block.getBoundingClientRect().top;
					},
					rotation: 90,
					scale: 0.75,
					duration: 1.0,
					ease: 'expo.inOut'
				},
				0
			);
		});

		return () => ctx.revert();
	});

	function handleClick() {
		if (!tlOpen) return;
		if (isMenuOpen) {
			tlOpen.reverse();
			isMenuOpen = false;
		} else {
			tlOpen.play();
			isMenuOpen = true;
		}
	}

	function handleScroll(event: WheelEvent) {
		if (!tlOpen) return;
		const threshold = 5;
		if (event.deltaY > threshold && !isMenuOpen) {
			tlOpen.play();
			isMenuOpen = true;
		} else if (event.deltaY < -threshold && isMenuOpen) {
			tlOpen.reverse();
			isMenuOpen = false;
		}
	}
</script>

<svelte:window onwheel={handleScroll} />

<div class="relative h-full w-full overflow-hidden px-8 lg:px-12">
	<div class="js-ghost-target absolute top-1/2 left-3 h-0 w-0 -translate-y-1/2 lg:left-9"></div>

	<div class="absolute inset-0 flex flex-col justify-center px-8 lg:px-12">
		<Hero>
			{#snippet block()}
				<Block onclick={handleClick} isOpen={isMenuOpen} />
			{/snippet}
		</Hero>
	</div>

	<div
		class="pointer-events-none absolute inset-0 flex flex-col items-end justify-center px-6 lg:px-9"
	>
		<Menu isOpen={isMenuOpen} />
	</div>
</div>
