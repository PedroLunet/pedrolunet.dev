<script lang="ts">
	import CustomCursor from '../components/CustomCursor.svelte';
	import FadeIn from '../components/FadeIn.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getAllTimelineItems } from '$lib/data/timeline';
	import { getFeaturedProjects } from '$lib/data/projects';

	// Icons
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import MailIcon from '@lucide/svelte/icons/mail';
	import GithubIcon from '@lucide/svelte/icons/github';

	const timelineItems = getAllTimelineItems();
	const featuredProjects = getFeaturedProjects();

	// Sort timeline: Most recent first
	const sortedTimeline = [...timelineItems].sort((a, b) => b.id - a.id);
</script>

<svelte:head>
	<title>Pedro Lunet | Frontend Developer</title>
	<meta
		name="description"
		content="Portfolio of Pedro Lunet, a Frontend Developer specializing in Svelte, React, and Next.js."
	/>
</svelte:head>

<main class="relative bg-background selection:bg-primary selection:text-primary-foreground">
	<CustomCursor>
		<section id="hero" class="relative flex min-h-screen flex-col items-center justify-center px-4">
			<h1
				class="text-center text-6xl leading-none font-black tracking-tighter text-primary sm:text-8xl md:text-9xl lg:text-[11rem]"
			>
				PEDRO<br />LUNET.
			</h1>

			<div
				class="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium tracking-widest text-muted-foreground uppercase"
			>
				<span>Frontend</span>
				<span class="opacity-50">•</span>
				<span>Creative</span>
				<span class="opacity-50">•</span>
				<span>Engineer</span>
			</div>

			<div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
				<ArrowDownIcon class="h-5 w-5 text-muted-foreground/60" />
			</div>
		</section>
	</CustomCursor>

	<section id="about" class="container mx-auto max-w-5xl px-4 py-32 md:py-48">
		<FadeIn>
			<div class="grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="col-span-1 md:col-span-3">
					<span class="block text-xs font-bold tracking-widest text-muted-foreground uppercase">
						(01) — Profile
					</span>
				</div>
				<div class="col-span-1 md:col-span-9">
					<h2
						class="text-3xl leading-tight font-medium text-foreground md:text-5xl md:leading-tight"
					>
						I craft performant digital experiences. Currently an Informatics Engineering student at
						FEUP, merging technical precision with creative fluidity in Svelte & React.
					</h2>
				</div>
			</div>
		</FadeIn>
	</section>

	<section id="experience" class="container mx-auto max-w-5xl px-4 py-24">
		<FadeIn>
			<div class="mb-16 grid grid-cols-1 gap-12 md:grid-cols-12">
				<div class="col-span-1 md:col-span-3">
					<span class="block text-xs font-bold tracking-widest text-muted-foreground uppercase">
						(02) — The Path
					</span>
				</div>

				<div class="relative col-span-1 md:col-span-9">
					<div class="absolute top-2 bottom-0 left-0 w-px bg-border/60 md:left-[140px]"></div>

					<div class="space-y-16">
						{#each sortedTimeline as item (item.id)}
							<div class="group relative flex flex-col gap-6 md:flex-row md:gap-12">
								<div class="flex-shrink-0 pt-1 md:w-[140px] md:text-right">
									<span
										class="inline-block bg-background pr-4 font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary md:pr-6"
									>
										{item.date || '2023 — Present'}
									</span>
									<div
										class="absolute top-[9px] left-[-5px] z-10 h-2.5 w-2.5 rounded-full border border-muted-foreground bg-background transition-all duration-300 group-hover:scale-125 group-hover:border-primary group-hover:bg-primary md:left-[136px]"
									></div>
								</div>

								<div class="max-w-xl pt-0 pl-6 md:pt-0 md:pl-0">
									<h3
										class="text-2xl font-bold text-foreground transition-colors group-hover:text-primary"
									>
										{item.title}
									</h3>
									<div class="mt-1 mb-4 flex items-center gap-2">
										<span class="text-base font-medium text-foreground/80">{item.organization}</span
										>
										{#if item.type === 'education'}
											<span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
												>Edu</span
											>
										{:else}
											<span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
												>Work</span
											>
										{/if}
									</div>
									<p class="text-sm leading-relaxed text-muted-foreground md:text-base">
										{item.description}
									</p>

									{#if item.tags}
										<div class="mt-4 flex flex-wrap gap-2">
											{#each item.tags as tag}
												<span
													class="rounded-sm border border-border px-2 py-1 font-mono text-xs text-muted-foreground/60"
												>
													{tag}
												</span>
											{/each}
										</div>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</FadeIn>
	</section>

	<section id="projects" class="container mx-auto max-w-6xl px-4 py-24">
		<div class="mb-16 flex items-end justify-between border-b border-border pb-6">
			<div class="space-y-2">
				<span class="block text-xs font-bold tracking-widest text-muted-foreground uppercase">
					(03) — Selected Works
				</span>
				<h2 class="text-4xl font-black text-primary md:text-5xl">FEATURED.</h2>
			</div>
			<Button href="/projects" variant="ghost" class="group hidden gap-2 md:flex">
				View Archive
				<ArrowRightIcon class="h-4 w-4 transition-transform group-hover:translate-x-1" />
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
			{#each featuredProjects as project, i (project.id)}
				<FadeIn delay={i * 0.1}>
					<div class="{i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'} group">
						<ProjectCard {project} />
					</div>
				</FadeIn>
			{/each}
		</div>

		<div class="mt-12 flex justify-center md:hidden">
			<Button href="/projects" variant="outline">View All Projects</Button>
		</div>
	</section>

	<section id="contact" class="px-4 py-32 md:py-48">
		<div class="mx-auto max-w-4xl text-center">
			<FadeIn>
				<h2 class="mb-8 text-5xl font-black tracking-tight text-primary md:text-7xl lg:text-8xl">
					LET'S TALK.
				</h2>
				<p class="mx-auto mb-12 max-w-xl text-xl text-muted-foreground">
					I'm currently looking for new challenges. If you have a project in mind or just want to
					say hi.
				</p>
				<div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
					<Button
						href="mailto:your.email@example.com"
						size="lg"
						class="h-14 min-w-[200px] gap-2 text-lg"
					>
						<MailIcon class="h-5 w-5" />
						Get in touch
					</Button>
					<Button
						href="https://github.com/PedroLunet"
						variant="outline"
						size="lg"
						target="_blank"
						class="h-14 min-w-[200px] gap-2 text-lg"
					>
						<GithubIcon class="h-5 w-5" />
						GitHub
					</Button>
				</div>
			</FadeIn>
		</div>
	</section>
</main>
