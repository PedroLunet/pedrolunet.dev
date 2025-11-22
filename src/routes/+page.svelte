<script lang="ts">
	import ThemeSwitch from '../components/ThemeSwitch.svelte';
	import FadeIn from '../components/FadeIn.svelte';
	import TimelineCard from '../components/TimelineCard.svelte';
	import ProjectCard from '../components/ProjectCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { getAllTimelineItems } from '$lib/data/timeline';
	import { getFeaturedProjects } from '$lib/data/projects';
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
	import BriefcaseIcon from '@lucide/svelte/icons/briefcase';
	import GraduationCapIcon from '@lucide/svelte/icons/graduation-cap';
	import CodeIcon from '@lucide/svelte/icons/code';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	const timelineItems = getAllTimelineItems();
	const featuredProjects = getFeaturedProjects();
</script>

<!-- Theme Switch in Header -->
<header class="fixed top-0 right-0 z-50 p-4">
	<ThemeSwitch />
</header>

<!-- Hero Section -->
<section class="relative flex min-h-screen items-center justify-center">
	<h1 class="text-8xl font-black text-primary">PEDRO LUNET.</h1>

	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<ArrowDownIcon class="h-6 w-6 text-muted-foreground" />
	</div>
</section>

<!-- About Section -->
<section class="bg-muted/30 px-4 py-20">
	<div class="mx-auto max-w-4xl">
		<FadeIn>
			<div class="mb-12 text-center">
				<h2 class="mb-4 text-4xl font-bold text-primary md:text-5xl">About Me</h2>
				<div class="mx-auto mb-6 h-1 w-20 bg-primary"></div>
			</div>
		</FadeIn>

		<FadeIn delay={0.2}>
			<div class="mx-auto prose prose-lg text-center dark:prose-invert">
				<p class="text-lg leading-relaxed text-muted-foreground">
					I'm a frontend developer passionate about creating beautiful, performant web experiences.
					Currently in my final year of Informatics Engineering at FEUP, I specialize in modern
					frameworks like Svelte, React, and Next.js. I've had the opportunity to work at Significa,
					developing responsive applications and deepening my knowledge of reactive UI development.
				</p>
			</div>
		</FadeIn>
	</div>
</section>

<!-- Career Timeline Section -->
<section class="px-4 py-20">
	<div class="mx-auto max-w-5xl">
		<FadeIn>
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-primary md:text-5xl">Career Journey</h2>
				<div class="mx-auto mb-6 h-1 w-20 bg-primary"></div>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					My professional experience and educational background
				</p>
			</div>
		</FadeIn>

		<!-- Experience -->
		<FadeIn delay={0.2}>
			<div class="mb-12">
				<div class="mb-6 flex items-center gap-3">
					<BriefcaseIcon class="h-6 w-6 text-primary" />
					<h3 class="text-2xl font-bold">Experience</h3>
				</div>

				<div class="space-y-6">
					{#each timelineItems.filter((item) => item.type === 'experience') as item (item.id)}
						<FadeIn delay={0.1}>
							<TimelineCard {item} />
						</FadeIn>
					{/each}
				</div>
			</div>
		</FadeIn>

		<!-- Education -->
		<FadeIn delay={0.3}>
			<div>
				<div class="mb-6 flex items-center gap-3">
					<GraduationCapIcon class="h-6 w-6 text-primary" />
					<h3 class="text-2xl font-bold">Education</h3>
				</div>

				<div class="space-y-6">
					{#each timelineItems.filter((item) => item.type === 'education') as item (item.id)}
						<FadeIn delay={0.1}>
							<TimelineCard {item} />
						</FadeIn>
					{/each}
				</div>
			</div>
		</FadeIn>
	</div>
</section>

<!-- Featured Projects Section -->
<section class="bg-muted/30 px-4 py-20">
	<div class="mx-auto max-w-6xl">
		<FadeIn>
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-primary md:text-5xl">Featured Projects</h2>
				<div class="mx-auto mb-6 h-1 w-20 bg-primary"></div>
				<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
					A selection of my recent work and side projects
				</p>
			</div>
		</FadeIn>

		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredProjects as project (project.id)}
				<FadeIn delay={0.1}>
					<ProjectCard {project} />
				</FadeIn>
			{/each}
		</div>

		<FadeIn delay={0.3}>
			<div class="text-center">
				<Button href="/projects" size="lg" variant="outline" class="gap-2">
					<CodeIcon class="h-5 w-5" />
					View All Projects
					<ArrowRightIcon class="h-4 w-4" />
				</Button>
			</div>
		</FadeIn>
	</div>
</section>

<!-- CTA Section -->
<section class="px-4 py-20">
	<div class="mx-auto max-w-4xl text-center">
		<FadeIn>
			<h2 class="mb-6 text-3xl font-bold md:text-4xl">Let's Work Together</h2>
			<p class="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
				I'm always open to new opportunities and collaborations. Feel free to reach out if you'd
				like to connect!
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/about" size="lg" class="gap-2">
					Get In Touch
					<ArrowRightIcon class="h-4 w-4" />
				</Button>
				<Button href="https://github.com/PedroLunet" variant="outline" size="lg" target="_blank">
					GitHub Profile
				</Button>
			</div>
		</FadeIn>
	</div>
</section>
