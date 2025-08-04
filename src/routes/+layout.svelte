<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const root = document.documentElement;
		if (prefersDark) {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}

		// Listen for changes in system theme
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
			if (e.matches) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		});
	});
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-background p-4 md:p-6 lg:p-8">
		{@render children()}
	</main>
	<Footer />
</div>
