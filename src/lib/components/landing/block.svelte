<script lang="ts">
	let { onclick, isOpen = false } = $props();

	let label = $state('menu');

	const DELAY_MOBILE = 450;
	const DELAY_DESKTOP = 600;

	$effect(() => {
		const targetLabel = isOpen ? 'close' : 'menu';

		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		const currentDelay = isDesktop ? DELAY_DESKTOP : DELAY_MOBILE;

		const timer = setTimeout(() => {
			label = targetLabel;
		}, currentDelay);

		return () => clearTimeout(timer);
	});
</script>

<button
	{onclick}
	class="js-block group relative flex h-12 w-32 cursor-pointer border-none p-0 outline-none md:h-24 md:w-48 2xl:h-32 2xl:w-64"
	aria-label="Toggle Menu"
>
	<div
		class="relative flex h-full w-full items-end justify-center overflow-hidden bg-accent transition-transform duration-200 ease-out md:active:scale-90"
	>
		<div
			class="absolute inset-0 z-0 origin-left bg-accent-light transition-transform duration-300 ease-out {isOpen
				? 'scale-x-100'
				: 'scale-x-0'} md:scale-x-0 md:group-hover:scale-x-100"
		></div>

		<div class="relative z-10 flex h-5 w-full justify-center leading-none lg:h-7 2xl:h-10">
			{#key label}
				<span
					class="animate-in fade-in zoom-in-95 absolute bottom-0 flex items-end justify-center text-lg font-medium tracking-widest text-bg lowercase duration-300 lg:text-3xl 2xl:text-5xl"
				>
					{label}
				</span>
			{/key}
		</div>
	</div>
</button>
