<script lang="ts">
	let { onclick } = $props();
</script>

<button
	{onclick}
	class="invisible z-50 block cursor-pointer bg-accent transition-opacity hover:opacity-90"
	class:js-block={true}
	aria-label="Toggle Navigation"
></button>
