<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { Project } from '$lib/data/projects.js';
	import GithubIcon from '@lucide/svelte/icons/github';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import PlayIcon from '@lucide/svelte/icons/play';
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
	import XIcon from '@lucide/svelte/icons/x';

	export let project: Project;

	$: mainTech = project.technologies[0];
	$: projectYear = project.startDate ? new Date(project.startDate).getFullYear() : '2025';
</script>

<Drawer.Root>
	<Drawer.Trigger
		class="group relative flex h-full min-h-[300px] w-full flex-col justify-between overflow-hidden bg-muted/20 p-8 text-left transition-all duration-500 hover:bg-primary hover:text-primary-foreground"
	>
		<div class="flex w-full items-start justify-between">
			<div class="flex items-center gap-3">
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/50 p-2 backdrop-blur-sm transition-colors group-hover:bg-white/20"
				>
					<img
						src={mainTech.icon}
						alt={mainTech.name}
						class="h-full w-full object-contain opacity-70 grayscale transition-all group-hover:opacity-100 group-hover:invert"
					/>
				</div>
				<span
					class="font-mono text-xs font-medium tracking-widest uppercase opacity-60 group-hover:opacity-80"
				>
					/{mainTech.name}
				</span>
			</div>
			<span class="font-mono text-xs font-bold opacity-40 group-hover:opacity-60">
				©{projectYear}
			</span>
		</div>

		<div class="relative z-10 mt-auto w-full text-left">
			<h3
				class="line-clamp-3 max-w-full text-2xl leading-[0.9] font-black tracking-tighter break-words uppercase sm:text-4xl md:text-5xl"
			>
				{project.name}
			</h3>

			<div
				class="mt-6 flex items-end justify-between border-t border-foreground/10 pt-4 group-hover:border-white/20"
			>
				<p
					class="line-clamp-2 max-w-[70%] text-sm leading-relaxed opacity-70 group-hover:opacity-90"
				>
					{project.description}
				</p>
				<div
					class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:border-white/40 group-hover:bg-white group-hover:text-black"
				>
					<ArrowUpRightIcon
						class="h-6 w-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					/>
				</div>
			</div>
		</div>
	</Drawer.Trigger>

	<Drawer.Content class="max-h-[96vh]">
		<div class="mx-auto w-full max-w-4xl overflow-y-auto">
			<Drawer.Header class="relative border-b border-foreground/5 pt-16 pb-10 text-left md:pt-24">
				<Drawer.Close class="absolute top-6 right-6 z-50">
					<Button variant="secondary" size="icon" class="h-12 w-12 rounded-full shadow-sm">
						<XIcon class="h-5 w-5" />
					</Button>
				</Drawer.Close>

				<div class="space-y-6 px-4 md:px-0">
					<div class="flex items-center justify-start gap-4">
						<span class="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase"
							>Project 0{project.id}</span
						>
						<div class="h-px w-12 bg-primary/30"></div>
						<span class="font-mono text-xs font-medium uppercase opacity-50">{projectYear}</span>
					</div>

					<Drawer.Title
						class="text-5xl leading-[0.85] font-black tracking-tighter break-words text-foreground uppercase sm:text-7xl md:text-8xl"
					>
						{project.name}
					</Drawer.Title>
				</div>
			</Drawer.Header>

			<div class="px-4 py-12 md:px-0">
				<div class="grid gap-12 md:grid-cols-[1.5fr_1fr]">
					<div class="space-y-10">
						<section>
							<h4
								class="mb-4 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase"
							>
								// Overview
							</h4>
							<Drawer.Description
								class="text-left text-xl leading-relaxed text-foreground/90 md:text-2xl"
							>
								{project.description}
							</Drawer.Description>
						</section>

						<div class="flex flex-wrap gap-3">
							{#if project.links.website}
								<Button
									href={project.links.website}
									target="_blank"
									size="lg"
									class="rounded-full px-8 font-bold"
								>
									<GlobeIcon class="mr-2 h-4 w-4" />
									Visit Website
								</Button>
							{/if}
							{#if project.links.demo}
								<Button
									variant="outline"
									href={project.links.demo}
									target="_blank"
									size="lg"
									class="rounded-full px-8 font-bold"
								>
									<PlayIcon class="mr-2 h-4 w-4" />
									Live Demo
								</Button>
							{/if}
						</div>
					</div>

					<div class="space-y-8">
						<section>
							<h4
								class="mb-6 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase"
							>
								// Tech Stack
							</h4>
							<div class="flex flex-wrap gap-2">
								{#each project.technologies as tech}
									<div
										class="group flex items-center gap-2 rounded-full border border-foreground/10 bg-muted/30 px-4 py-2 transition-all hover:bg-primary hover:text-primary-foreground"
									>
										<img
											src={tech.icon}
											alt={tech.name}
											class="h-4 w-4 object-contain grayscale group-hover:grayscale-0 group-hover:invert"
										/>
										<span class="text-xs font-bold uppercase">{tech.name}</span>
									</div>
								{/each}
							</div>
						</section>

						<section class="rounded-2xl bg-muted/20 p-6">
							<h4
								class="mb-4 font-mono text-xs font-bold tracking-widest text-muted-foreground uppercase"
							>
								// Source
							</h4>
							{#if project.links.github}
								<Button
									variant="ghost"
									href={project.links.github}
									target="_blank"
									class="w-full justify-between rounded-xl bg-background px-4 py-6 shadow-sm hover:bg-primary hover:text-primary-foreground"
								>
									<span class="font-bold tracking-tight uppercase">GitHub Repository</span>
									<GithubIcon class="h-5 w-5" />
								</Button>
							{:else}
								<p class="px-2 font-mono text-xs italic opacity-50">Source code is private</p>
							{/if}
						</section>
					</div>
				</div>
			</div>
		</div>
	</Drawer.Content>
</Drawer.Root>
