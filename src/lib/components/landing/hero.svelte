<script lang="ts">
	let { block } = $props();
</script>

<div
	class="pointer-events-none flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4"
>
	<h1
		class="hero-text invisible text-6xl leading-none font-medium tracking-tighter md:text-7xl lg:text-9xl"
	>
		Pedro
	</h1>

	<div class="pointer-events-auto">
		{@render block()}
	</div>

	<h1
		class="hero-text invisible text-6xl leading-none font-medium tracking-tighter md:text-7xl lg:text-9xl"
	>
		Lunet
	</h1>
</div>

<h2
	class="hero-text invisible mt-4 text-2xl font-medium tracking-tight text-text-secondary md:mt-5 md:text-4xl lg:mt-6 lg:text-7xl"
>
	frontend dev
</h2>

<h3 class="hero-text invisible mt-2 text-lg font-normal text-accent md:text-xl lg:text-2xl">
	porto, portugal
</h3>
