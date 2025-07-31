<script lang="ts">
	import '../app.css';
	import Header from '../components/Header.svelte';

	let { children } = $props();
</script>

<Header />
<main class="bg-background p-4 md:p-6 lg:p-8 dark:bg-background-dark">
	{@render children()}
</main>
