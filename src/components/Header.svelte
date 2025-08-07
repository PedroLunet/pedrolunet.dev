<script>
	import { List, XCircle } from 'phosphor-svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';

	let menuOpen = false;
</script>

<header
	class="relative flex min-h-fit flex-col items-center justify-around gap-y-2 bg-transparent p-4 md:p-6 lg:p-8"
>
	<a href="/" class="text-text transition-transform duration-500 hover:scale-110" aria-label="Home">
		<div class="flex items-center">
			<h1 class="text-xl font-semibold text-primary">[</h1>
			<h1 class="text-xl font-bold tracking-tighter text-muted-foreground">Pedro Lunet</h1>
			<h1 class="text-xl font-semibold text-primary">]</h1>
		</div>
	</a>
	<!-- Desktop nav -->
	<nav class="hidden items-center gap-6 md:flex">
		<a href="/projects" class="text-text transition hover:text-primary" aria-label="Projects"
			>Projects</a
		>
		<a href="/about" class="text-text transition hover:text-primary" aria-label="About Me"
			>About Me</a
		>
	</nav>

	<!-- Hamburger icon for mobile -->
	<button
		class="flex cursor-pointer items-center rounded p-2 focus:outline-none md:hidden"
		aria-label="Open menu"
		on:click={() => (menuOpen = !menuOpen)}
	>
		<List size={26} class="text-primary" />
	</button>

	<!-- Theme switcher always on the right -->
	<div class="absolute top-4 right-4 md:top-8 md:right-8">
		<ThemeSwitch />
	</div>

	<!-- Mobile menu overlay -->
	{#if menuOpen}
		<div
			class="bg-opacity-95 fixed inset-0 z-50 flex flex-col items-center justify-center bg-background md:hidden"
		>
			<button
				class="absolute top-4 right-4 cursor-pointer p-2"
				aria-label="Close menu"
				on:click={() => (menuOpen = false)}
			>
				<XCircle size={24} class="text-primary" />
			</button>
			<nav class="flex flex-col items-center gap-8 text-xl">
				<a
					href="/projects"
					class="text-text transition hover:text-primary"
					aria-label="Projects"
					on:click={() => (menuOpen = false)}>Projects</a
				>
				<a
					href="/about"
					class="text-text transition hover:text-primary"
					aria-label="About Me"
					on:click={() => (menuOpen = false)}>About Me</a
				>
			</nav>
		</div>
	{/if}
</header>
