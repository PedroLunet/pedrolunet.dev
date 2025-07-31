<script>
	import { House } from 'phosphor-svelte';
</script>

<header
	class="flex h-[var(--navbar-height)] items-center justify-between bg-transparent px-4 md:px-6 lg:px-8"
>
	<div class="flex items-center">
		<h1 class="text-xl font-semibold text-muted dark:text-muted-dark">[</h1>
		<h1 class="text-xl font-bold tracking-tighter text-accent dark:text-accent-dark">
			Pedro Lunet
		</h1>
		<h1 class="text-xl font-semibold text-muted dark:text-muted-dark">]</h1>
	</div>
	<a href="/" class="text-text dark:text-text-dark" aria-label="Home">
		<House size={28} weight="light" class="text-muted dark:text-muted-dark" />
	</a>
</header>
