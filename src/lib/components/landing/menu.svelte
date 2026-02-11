<script lang="ts">
	let { isOpen } = $props();
</script>

<nav
	class="flex flex-col items-end gap-2 pr-6 text-right md:gap-6 lg:pr-9 2xl:gap-8 2xl:pr-24 {isOpen
		? 'pointer-events-auto'
		: 'pointer-events-none'}"
>
	<a
		href="/work"
		class="menu-item group invisible block text-4xl font-thin tracking-tight text-text md:text-8xl 2xl:text-[clamp(6rem,10vw,10rem)]"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			Selected Works
		</span>
	</a>

	<a
		href="/about"
		class="menu-item group invisible block text-4xl font-thin tracking-tight text-text md:text-8xl 2xl:text-[clamp(6rem,10vw,10rem)]"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			About Me
		</span>
	</a>

	<a
		href="/contact"
		class="menu-item group invisible block text-4xl font-thin tracking-tight text-text md:text-8xl 2xl:text-[clamp(6rem,10vw,10rem)]"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			Contact
		</span>
	</a>

	<div class="menu-item invisible my-4 mr-1 h-px w-24 bg-text-secondary 2xl:my-8 2xl:w-40"></div>

	<p class="menu-item invisible pr-1 text-lg text-text-secondary 2xl:text-2xl">
		<span class="text-accent">hello@pedrolunet.dev</span>
	</p>
</nav>
