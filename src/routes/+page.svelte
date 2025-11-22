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
<section class="px-4 py-32">
	<div class="mx-auto max-w-3xl">
		<FadeIn>
			<h2 class="mb-8 text-5xl font-black text-primary">ABOUT ME.</h2>
		</FadeIn>

		<FadeIn delay={0.2}>
			<p class="text-xl leading-relaxed text-foreground/80">
				I'm a frontend developer passionate about creating beautiful, performant web experiences.
				Currently in my final year of Informatics Engineering at FEUP, I specialize in modern
				frameworks like Svelte, React, and Next.js. I've had the opportunity to work at Significa,
				developing responsive applications and deepening my knowledge of reactive UI development.
			</p>
		</FadeIn>
	</div>
</section>

<!-- Career Timeline Section -->
<section class="bg-muted/20 px-4 py-32">
	<div class="mx-auto max-w-5xl">
		<FadeIn>
			<h2 class="mb-16 text-5xl font-black text-primary">CAREER JOURNEY.</h2>
		</FadeIn>

		<!-- Experience -->
		<FadeIn delay={0.2}>
			<div class="mb-16">
				<div class="mb-8 flex items-center gap-3">
					<BriefcaseIcon class="h-7 w-7 text-primary" />
					<h3 class="text-3xl font-bold">Experience</h3>
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
				<div class="mb-8 flex items-center gap-3">
					<GraduationCapIcon class="h-7 w-7 text-primary" />
					<h3 class="text-3xl font-bold">Education</h3>
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
<section class="px-4 py-32">
	<div class="mx-auto max-w-6xl">
		<FadeIn>
			<div class="mb-16 flex flex-wrap items-center justify-between gap-4">
				<h2 class="text-5xl font-black text-primary">PROJECTS.</h2>
				<Button href="/projects" variant="outline" class="gap-2">
					View All
					<ArrowRightIcon class="h-4 w-4" />
				</Button>
			</div>
		</FadeIn>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each featuredProjects as project (project.id)}
				<FadeIn delay={0.1}>
					<ProjectCard {project} />
				</FadeIn>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="bg-muted/20 px-4 py-32">
	<div class="mx-auto max-w-4xl">
		<FadeIn>
			<h2 class="mb-8 text-5xl font-black text-primary">LET'S WORK TOGETHER.</h2>
			<p class="mb-10 max-w-2xl text-xl text-foreground/80">
				I'm always open to new opportunities and collaborations. Feel free to reach out if you'd
				like to connect!
			</p>
			<div class="flex flex-wrap gap-4">
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
