<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		Drawer,
		DrawerContent,
		DrawerDescription,
		DrawerHeader,
		DrawerTitle,
		DrawerTrigger,
		DrawerClose
	} from '$lib/components/ui/drawer/index.js';
	import type { Project } from '$lib/data/projects.js';
	import GithubIcon from '@lucide/svelte/icons/github';
	import GlobeIcon from '@lucide/svelte/icons/globe';
	import PlayIcon from '@lucide/svelte/icons/play';
	import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right';
	import XIcon from '@lucide/svelte/icons/x';

	export let project: Project;

	$: mainTech = project.technologies[0];
	$: projectYear = project.startDate ? new Date(project.startDate).getFullYear() : '2024';
</script>

<Drawer>
	<DrawerTrigger
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
	</DrawerTrigger>

	<DrawerContent>
		<div class="mx-auto w-full max-w-3xl">
			<DrawerHeader class="relative pt-12 pb-8 text-left">
				<DrawerClose class="absolute top-4 right-4 opacity-50 transition-opacity hover:opacity-100">
					<Button variant="ghost" size="icon" class="h-10 w-10 rounded-full bg-muted">
						<XIcon class="h-5 w-5" />
					</Button>
				</DrawerClose>

				<div class="space-y-4">
					<div class="flex items-center justify-start gap-3 text-muted-foreground">
						<span class="font-mono text-xs tracking-widest uppercase">Project 0{project.id}</span>
						<span class="h-px w-8 bg-border"></span>
						<span class="font-mono text-xs tracking-widest uppercase">{projectYear}</span>
					</div>

					<DrawerTitle
						class="text-3xl font-black tracking-tighter break-words text-primary uppercase sm:text-5xl md:text-7xl"
					>
						{project.name}
					</DrawerTitle>
				</div>
			</DrawerHeader>

			<div class="px-4 pb-12 md:px-6">
				<div class="grid gap-10 md:grid-cols-[2fr_1fr]">
					<div class="space-y-8 text-left">
						<div>
							<h4 class="mb-3 text-sm font-bold tracking-widest text-muted-foreground uppercase">
								Context
							</h4>
							<DrawerDescription class="text-left text-lg leading-relaxed text-foreground/90">
								{project.description}
							</DrawerDescription>
						</div>

						<div class="flex flex-wrap justify-start gap-3">
							{#if project.links.website}
								<Button href={project.links.website} target="_blank" size="lg" class="rounded-full">
									<GlobeIcon class="mr-2 h-4 w-4" />
									Visit Website
								</Button>
							{/if}
							{#if project.links.demo}
								<Button
									variant="secondary"
									href={project.links.demo}
									target="_blank"
									size="lg"
									class="rounded-full"
								>
									<PlayIcon class="mr-2 h-4 w-4" />
									Live Demo
								</Button>
							{/if}
						</div>
					</div>

					<div class="space-y-8 rounded-xl bg-muted/30 p-6 text-left">
						<div>
							<h4 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
								Stack
							</h4>
							<div class="flex flex-wrap justify-start gap-2">
								{#each project.technologies as tech}
									<div
										class="flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 shadow-sm"
									>
										<img src={tech.icon} alt={tech.name} class="h-4 w-4" />
										<span class="text-xs font-bold">{tech.name}</span>
									</div>
								{/each}
							</div>
						</div>

						<div>
							<h4 class="mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">
								Source
							</h4>
							{#if project.links.github}
								<Button
									variant="outline"
									href={project.links.github}
									target="_blank"
									class="w-full justify-start gap-2"
								>
									<GithubIcon class="h-4 w-4" />
									Repository
								</Button>
							{:else}
								<span class="text-sm text-muted-foreground italic">Source not public</span>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</DrawerContent>
</Drawer>
