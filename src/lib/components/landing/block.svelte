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
	class="js-block group relative h-12 w-32 cursor-pointer outline-none md:h-24 md:w-48"
	aria-label="Toggle Menu"
>
	<div
		class="relative flex h-full w-full items-end justify-center overflow-hidden bg-accent pb-3 transition-transform duration-200 ease-out active:scale-90 md:pb-4"
	>
		<div
			class="absolute inset-0 z-0 origin-left scale-x-0 bg-accent-light transition-transform duration-300 ease-out group-hover:scale-x-100"
		></div>

		<div class="relative z-10 mb-3 flex h-5 w-full justify-center md:mb-4 lg:h-7">
			{#key label}
				<span
					class="animate-in fade-in zoom-in-95 absolute bottom-0 flex items-end justify-center text-sm font-medium tracking-widest text-bg lowercase duration-300 lg:text-xl"
				>
					{label}
				</span>
			{/key}
		</div>

		<div
			class="pointer-events-none absolute top-1 right-1 h-1 w-1 border-t border-r border-bg/30"
		></div>
		<div
			class="pointer-events-none absolute bottom-1 left-1 h-1 w-1 border-b border-l border-bg/30"
		></div>
	</div>
</button>
