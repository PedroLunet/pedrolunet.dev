<script lang="ts">
	let { isOpen } = $props();
</script>

<nav
	class="flex flex-col items-end gap-2 text-right md:gap-6 {isOpen
		? 'pointer-events-auto'
		: 'pointer-events-none'}"
>
	<a
		href="/works"
		class="menu-item group text-text-primary invisible block text-4xl font-thin tracking-tight md:text-8xl"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			Selected Works
		</span>
	</a>

	<a
		href="/about"
		class="menu-item group text-text-primary invisible block text-4xl font-thin tracking-tight md:text-8xl"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			About Me
		</span>
	</a>

	<a
		href="/contact"
		class="menu-item group text-text-primary invisible block text-4xl font-thin tracking-tight md:text-8xl"
	>
		<span
			class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent"
		>
			Contact
		</span>
	</a>

	<div class="menu-item invisible my-4 mr-1 h-px w-24 bg-text-secondary"></div>

	<p class="menu-item invisible pr-1 text-lg text-text-secondary">
		Available for freelance<br />
		<span class="text-accent">hello@pedrolunet.dev</span>
	</p>
</nav>
