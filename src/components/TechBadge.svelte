<script lang="ts">
	import type { Technology } from '$lib/data/projects.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	export let technology: Technology;
</script>

<Badge
	variant="outline"
	class="flex items-center gap-2 px-3 py-2 text-base"
	style="border-color: {technology.color}40"
>
	<img src={technology.icon} alt={technology.name} class="h-6 w-6 object-contain" loading="lazy" />
	<span>{technology.name}</span>
</Badge>

<style>
	/* Ensure consistent sizing and prevent layout shift */
	img {
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
	}
</style>
