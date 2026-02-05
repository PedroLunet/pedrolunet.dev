<script lang="ts">
	let { onclick } = $props();
</script>

<button
	{onclick}
	class="invisible z-50 block h-12 w-24 cursor-pointer bg-accent lg:h-24 lg:w-48"
	class:js-block={true}
	aria-label="Toggle Navigation"
></button>
