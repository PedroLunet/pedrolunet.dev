<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import CustomCursor from '../components/CustomCursor.svelte';
	import { onMount } from 'svelte';
	import { ModeWatcher } from 'mode-watcher';

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

<ModeWatcher />
<CustomCursor />
<div class="flex min-h-screen flex-col">
	<!-- <Header /> -->
	<main class="flex-1 bg-background">
		{@render children()}
	</main>
	<!-- <Footer /> -->
</div>
