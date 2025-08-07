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
	import {
		Drawer,
		DrawerContent,
		DrawerDescription,
		DrawerHeader,
		DrawerTitle,
		DrawerTrigger
	} from '$lib/components/ui/drawer/index.js';
	import type { Project } from '$lib/data/projects.js';
	import { getFormattedProjectDateRange } from '$lib/data/projects.js';
	import GithubIcon from '@lucide/svelte/icons/github';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import PlayIcon from '@lucide/svelte/icons/play';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import ArchiveIcon from '@lucide/svelte/icons/archive';
	import PlusCircleIcon from '@lucide/svelte/icons/plus-circle';

	export let project: Project;

	// Get the main technology (first one in the array)
	$: mainTech = project.technologies[0];

	// Status icon mapping
	$: statusIcon = {
		completed: CheckCircle2Icon,
		'in-progress': ClockIcon,
		archived: ArchiveIcon
	}[project.status];

	// Status colors
	$: statusColor = {
		completed: 'text-green-600',
		'in-progress': 'text-blue-600',
		archived: 'text-gray-600'
	}[project.status];
</script>

<Drawer>
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
			<div class="mt-auto flex items-center justify-between gap-2">
				<div class="flex flex-wrap gap-2">
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
				<DrawerTrigger>
					<Button variant="ghost" size="sm" class="shrink-0">
						<PlusCircleIcon class="h-4 w-4" />
					</Button>
				</DrawerTrigger>
			</div>
		</CardContent>
	</Card>

	<DrawerContent class="px-6 pb-6">
		<DrawerHeader class="text-left">
			<div class="mb-4 flex items-center gap-4">
				<img src={mainTech.icon} alt={mainTech.name} class="h-16 w-16" />
				<div class="flex-1">
					<DrawerTitle class="text-2xl font-bold">{project.name}</DrawerTitle>
					<div class="mt-2 flex items-center gap-2">
						<svelte:component this={statusIcon} class="h-4 w-4 {statusColor}" />
						<span class="text-sm capitalize {statusColor}">{project.status.replace('-', ' ')}</span>
						{#if project.featured}
							<Badge variant="secondary" class="ml-2">Featured</Badge>
						{/if}
					</div>
				</div>
			</div>
		</DrawerHeader>

		<div class="space-y-6">
			<!-- Description -->
			<div>
				<h3 class="mb-2 text-lg font-semibold">About</h3>
				<DrawerDescription class="text-base leading-relaxed">
					{project.description}
				</DrawerDescription>
			</div>

			<!-- Timeline -->
			<div>
				<h3 class="mb-2 text-lg font-semibold">Timeline</h3>
				<div class="flex items-center gap-2 text-muted-foreground">
					<CalendarIcon class="h-4 w-4" />
					<span>{getFormattedProjectDateRange(project)}</span>
				</div>
			</div>

			<!-- Technologies -->
			<div>
				<h3 class="mb-3 text-lg font-semibold">Technologies</h3>
				<div class="flex flex-wrap gap-3">
					{#each project.technologies as tech}
						<div class="flex items-center gap-2 rounded-lg border bg-background px-3 py-2">
							<img src={tech.icon} alt={tech.name} class="h-6 w-6" />
							<span class="text-sm font-medium">{tech.name}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Links -->
			<div>
				<h3 class="mb-3 text-lg font-semibold">Links</h3>
				<div class="flex flex-wrap gap-3">
					{#if project.links.github}
						<Button
							variant="outline"
							href={project.links.github}
							target="_blank"
							class="flex-1 sm:flex-none"
						>
							<GithubIcon class="mr-2 h-4 w-4" />
							View on GitHub
						</Button>
					{/if}
					{#if project.links.website}
						<Button href={project.links.website} target="_blank" class="flex-1 sm:flex-none">
							<GlobeIcon class="mr-2 h-4 w-4" />
							Visit Website
						</Button>
					{/if}
					{#if project.links.demo}
						<Button
							variant="secondary"
							href={project.links.demo}
							target="_blank"
							class="flex-1 sm:flex-none"
						>
							<PlayIcon class="mr-2 h-4 w-4" />
							View Demo
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</DrawerContent>
</Drawer>
