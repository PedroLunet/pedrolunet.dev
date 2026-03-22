<script lang="ts">
	// +error.svelte
</script>

<div class="relative -mb-12 h-full w-full flex-1 overflow-hidden bg-bg">
	<div
		class="absolute top-[35%] left-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 text-center md:gap-8 lg:top-[30%] 2xl:top-[10%]"
	>
		<p class="text-xl font-light tracking-tight text-text md:text-2xl 2xl:text-3xl">
			looks like you got lost...
		</p>

		<a
			href="/"
			class="text-lg font-extralight tracking-tight text-text underline decoration-accent underline-offset-4 transition-transform duration-300 hover:scale-110 md:text-xl 2xl:text-2xl"
		>
			go back to home page
		</a>
	</div>

	<div
		class="pointer-events-none absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-[8%] items-end justify-center select-none"
	>
		<span
			class="flex flex-row text-[60vw] leading-[0.7] font-medium tracking-[-0.07em] text-text md:text-[50vw] xl:text-[40vw]"
		>
			<span>4</span>
			<span class="-mx-[4%] text-accent">0</span>
			<span>4</span>
		</span>
	</div>
</div>
