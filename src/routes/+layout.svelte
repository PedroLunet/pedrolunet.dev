<script lang="ts">
	import '../app.css';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1 bg-background p-4 md:p-6 lg:p-8 dark:bg-background-dark">
		{@render children()}
	</main>
	<Footer />
</div>
