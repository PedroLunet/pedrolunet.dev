<script lang="ts">
	import { page } from '$app/state';

	// Fallback to 404 just in case, then convert to a string like "404" or "500"
	let statusStr = $derived(String(page.status || 404));

	// Dynamically change the text based on the error type
	let errorMessage = $derived(
		page.status === 404 ? 'looks like you got lost...' : 'something went wrong...'
	);
</script>

<div class="relative -mb-12 h-full w-full flex-1 overflow-hidden bg-bg">
	<div
		class="absolute top-[35%] left-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 text-center md:gap-8 lg:top-[30%] 2xl:top-[10%]"
	>
		<h1 class="text-xl font-light tracking-tight text-text md:text-2xl 2xl:text-3xl">
			{errorMessage}
		</h1>

		<a
			href="/"
			class="text-lg font-extralight tracking-tight text-text underline decoration-accent underline-offset-4 transition-transform duration-300 hover:scale-110 md:text-xl 2xl:text-2xl"
		>
			go back to home page
		</a>
	</div>

	<div
		aria-hidden="true"
		class="pointer-events-none absolute bottom-0 left-1/2 flex w-full -translate-x-1/2 translate-y-[8%] items-end justify-center select-none"
	>
		<span
			class="flex flex-row text-[60vw] leading-[0.7] font-medium tracking-[-0.07em] text-text md:text-[50vw] xl:text-[40vw]"
		>
			<span>{statusStr[0]}</span>
			<span class="-mx-[4%] text-accent">{statusStr[1]}</span>
			<span>{statusStr[2]}</span>
		</span>
	</div>
</div>
