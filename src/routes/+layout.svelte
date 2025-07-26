<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="p-4 md:p-6 lg:p-8 bg-slate-100 dark:bg-slate-800">
	{@render children()}
</main>
