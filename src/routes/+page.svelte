<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	onMount(() => {
		let mm = gsap.matchMedia();
		const tl = gsap.timeline();

		tl.addLabel('start').from(
			'h1, h2, h3',
			{
				y: 20,
				opacity: 0,
				duration: 1.2,
				ease: 'power3.out',
				stagger: 0.5
			},
			'start'
		);

		mm.add('(min-width: 768px)', () => {
			tl.from(
				'.bg-accent',
				{
					width: 0,
					duration: 2,
					ease: 'power4.out'
				},
				'-=1.0'
			);
		});

		mm.add('(max-width: 767px)', () => {
			tl.from(
				'.bg-accent',
				{
					height: 0,
					duration: 2,
					ease: 'power4.out'
				},
				'-=1.0'
			);
		});

		return () => mm.revert();
	});
</script>

<div class="flex h-full w-full flex-col justify-center px-6 md:px-9">
	<div class="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-8">
		<h1 class="text-6xl leading-none font-medium tracking-tighter md:text-9xl">Pedro</h1>
		<div class="h-12 w-24 bg-accent md:h-24 md:w-48"></div>
		<h1 class="text-6xl leading-none font-medium tracking-tighter md:text-9xl">Lunet</h1>
	</div>
	<h2 class="text-2xl font-medium tracking-tight text-text-secondary md:text-7xl">
		frontend dev
	</h2>
	<h3 class="text-lg font-normal text-accent md:text-2xl">porto, portugal</h3>
</div>
