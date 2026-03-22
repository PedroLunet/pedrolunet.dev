<script lang="ts">
	// +error.svelte
</script>

<div class="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden bg-bg">
	<div class="relative z-10 flex flex-col items-center gap-6 text-center md:gap-8">
		<p class="text-lg font-medium tracking-tight text-text/60 md:text-xl 2xl:text-2xl">
			looks like you got lost.
		</p>

		<a
			href="/"
			class="group flex flex-row items-center justify-center gap-2 border border-text/10 px-6 py-3 transition-all duration-300 hover:border-accent hover:bg-accent/5 active:scale-95 2xl:px-8 2xl:py-4"
		>
			<span
				class="text-xs font-semibold tracking-tight text-text uppercase transition-colors duration-300 group-hover:text-accent 2xl:text-sm"
			>
				go back to home page
			</span>
			<span
				class="text-xs text-text transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent 2xl:text-sm"
			>
				↗
			</span>
		</a>
	</div>

	<div
		class="pointer-events-none absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-[2%] items-end justify-center select-none"
	>
		<span class="text-[50vw] leading-[0.8] font-bold tracking-tighter text-text/5 md:text-[35vw]">
			404
		</span>
	</div>
</div>
