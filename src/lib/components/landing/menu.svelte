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
		class="menu-item invisible text-4xl font-semibold tracking-tight transition-colors hover:text-accent md:text-8xl"
	>
		Selected Works
	</a>
	<a
		href="/about"
		class="menu-item invisible text-4xl font-semibold tracking-tight transition-colors hover:text-accent md:text-8xl"
	>
		About Me
	</a>
	<a
		href="/contact"
		class="menu-item invisible text-4xl font-semibold tracking-tight transition-colors hover:text-accent md:text-8xl"
	>
		Contact
	</a>

	<div class="menu-item invisible my-4 h-px w-24 bg-text-secondary"></div>

	<p class="menu-item invisible text-lg text-text-secondary">
		Available for freelance<br />
		<span class="text-accent">hello@pedrolunet.dev</span>
	</p>
</nav>
