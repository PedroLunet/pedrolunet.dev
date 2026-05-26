<script lang="ts">
	let { block } = $props();
</script>

<div
	class="pointer-events-none flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-6 2xl:gap-10"
>
	<h1
		class="hero-text invisible text-6xl leading-none font-medium tracking-tighter md:text-7xl lg:text-8xl 2xl:text-[clamp(5rem,8cqi,10rem)]"
	>
		Pedro
	</h1>

	<div class="pointer-events-auto">
		{@render block()}
	</div>

	<h1
		class="hero-text invisible text-6xl leading-none font-medium tracking-tighter md:text-7xl lg:text-8xl 2xl:text-[clamp(5rem,8cqi,10rem)]"
	>
		Lunet
	</h1>
</div>

<h2
	class="hero-text invisible mt-4 text-2xl font-medium tracking-tight text-text-secondary md:mt-5 md:text-3xl lg:mt-6 lg:text-5xl 2xl:mt-8 2xl:text-5xl"
>
	frontend dev
</h2>

<h3
	class="hero-text invisible mt-2 text-lg font-normal text-accent md:text-xl lg:text-2xl 2xl:mt-3 2xl:text-2xl"
>
	porto, portugal
</h3>
