<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<main class="p-4 md:p-6 lg:p-8">
	{@render children()}
</main>
