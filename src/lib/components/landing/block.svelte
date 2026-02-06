<script lang="ts">
	let { onclick, isOpen = false } = $props();

	let label = $state('menu');
	const TEXT_DELAY = 600;

	$effect(() => {
		const targetLabel = isOpen ? 'close' : 'menu';
		const timer = setTimeout(() => {
			label = targetLabel;
		}, TEXT_DELAY);
		return () => clearTimeout(timer);
	});
</script>

<button
	{onclick}
	class="js-block group relative flex h-12 w-32 cursor-pointer border-none p-0 outline-none md:h-24 md:w-48"
	aria-label="Toggle Menu"
>
	<div
		class="relative flex h-full w-full items-end justify-center overflow-hidden bg-accent transition-transform duration-200 ease-out active:scale-90"
	>
		<div
			class="absolute inset-0 z-0 origin-left scale-x-0 bg-accent-light transition-transform duration-300 ease-out [@media(hover:hover)]:group-hover:scale-x-100"
		></div>

		<div class="relative z-10 flex h-5 w-full justify-center leading-none lg:h-7">
			{#key label}
				<span
					class="animate-in fade-in zoom-in-95 absolute bottom-0 flex items-end justify-center text-lg font-medium tracking-widest text-bg lowercase duration-300 lg:text-3xl"
				>
					{label}
				</span>
			{/key}
		</div>
	</div>
</button>
