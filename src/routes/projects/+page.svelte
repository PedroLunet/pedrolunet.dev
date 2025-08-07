<script lang="ts">
	import ProjectCard from '../../components/ProjectCard.svelte';
	import TechBadge from '../../components/TechBadge.svelte';
	import Marquee from 'svelte-fast-marquee';
	import {
		projectsData,
		getFeaturedProjects,
		sortProjectsByDate,
		getAllUsedTechnologies,
		type Project
	} from '$lib/data/projects.js';

	// You can switch between all projects or just featured ones
	$: featuredProjects = sortProjectsByDate(getFeaturedProjects());
	$: allProjects = sortProjectsByDate(projectsData);
	$: nonFeaturedProjects = sortProjectsByDate(projectsData.filter((project) => !project.featured));

	// Get all unique technologies used across projects
	$: allTechnologies = getAllUsedTechnologies();

	let marqueePlay = true;
</script>

<svelte:head>
	<title>Projects - Pedro Lunet</title>
	<meta
		name="description"
		content="Explore my projects and work. Full-stack development, web applications, and more."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-4xl font-bold tracking-tight">Projects</h1>
			<p class="mx-auto max-w-2xl text-xl text-muted-foreground">
				A collection of projects I've worked on, ranging from personal experiments to professional
				work.
			</p>
		</div>

		<!-- Technologies Marquee -->
		<div class="mb-16">
			<h2 class="mb-6 text-center text-2xl font-semibold">Technologies I Use</h2>
			<div class="relative overflow-hidden">
				<Marquee pauseOnHover={true} speed={30} play={marqueePlay}>
					{#each allTechnologies as technology}
						<div class="mx-3">
							<TechBadge {technology} />
						</div>
					{/each}
				</Marquee>
			</div>
		</div>

		<!-- Featured Projects Section (if you want to highlight some) -->
		{#if featuredProjects.length > 0}
			<div class="mb-16">
				<h2 class="mb-8 text-center text-2xl font-semibold">Featured Projects</h2>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
					{#each featuredProjects as project}
						<ProjectCard {project} />
					{/each}
				</div>
			</div>
		{/if}

		<!-- All Projects Section -->
		<div>
			<h2 class="mb-8 text-center text-2xl font-semibold">
				{#if featuredProjects.length > 0}Other Projects{:else}All Projects{/if}
			</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each featuredProjects.length > 0 ? nonFeaturedProjects : allProjects as project}
					<ProjectCard {project} />
				{/each}
			</div>
		</div>

		<!-- Empty state if no projects -->
		{#if allProjects.length === 0}
			<div class="py-12 text-center">
				<p class="text-lg text-muted-foreground">No projects to show yet. Check back soon!</p>
			</div>
		{/if}
	</div>
</div>
