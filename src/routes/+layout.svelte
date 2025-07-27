<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="bg-background p-4 md:p-6 lg:p-8 dark:bg-background-dark">
	{@render children()}
</main>
