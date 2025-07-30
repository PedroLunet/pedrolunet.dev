<script>
	import { House } from 'phosphor-svelte';
</script>

<header
	class="flex h-[var(--navbar-height)] items-center justify-between bg-transparent px-4 md:px-6 lg:px-8"
>
	<h1 class="text-xl font-semibold text-accent dark:text-accent-dark">[Pedro Lunet]</h1>
	<a href="/" class="text-text dark:text-text-dark" aria-label="Home">
		<House size={28} weight="light" class="text-muted dark:text-muted-dark" />
	</a>
</header>
