<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Project } from '$lib/data/projects.js';
	import GithubIcon from '@lucide/svelte/icons/github';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import PlayIcon from '@lucide/svelte/icons/play';

	export let project: Project;

	// Get the main technology (first one in the array)
	$: mainTech = project.technologies[0];
</script>

<Card class="relative flex h-full flex-col transition-shadow duration-200 hover:shadow-lg">
	<!-- Main Technology Icon in top-left corner -->
	<div class="absolute top-4 left-4 z-10">
		<img src={mainTech.icon} alt={mainTech.name} class="h-12 w-12" title={mainTech.name} />
	</div>

	<CardHeader class="pt-16">
		<CardTitle class="text-xl">{project.name}</CardTitle>
		<CardDescription class="text-base">{project.description}</CardDescription>
	</CardHeader>

	<CardContent class="flex flex-1 flex-col justify-end">
		<!-- Links -->
		<div class="mt-auto flex gap-2">
			{#if project.links.github}
				<Button variant="outline" size="sm" href={project.links.github} target="_blank">
					<GithubIcon class="mr-1 h-4 w-4" />
					GitHub
				</Button>
			{/if}
			{#if project.links.website}
				<Button variant="default" size="sm" href={project.links.website} target="_blank">
					<GlobeIcon class="mr-1 h-4 w-4" />
					Website
				</Button>
			{/if}
			{#if project.links.demo}
				<Button variant="secondary" size="sm" href={project.links.demo} target="_blank">
					<PlayIcon class="mr-1 h-4 w-4" />
					Demo
				</Button>
			{/if}
		</div>
	</CardContent>
</Card>
