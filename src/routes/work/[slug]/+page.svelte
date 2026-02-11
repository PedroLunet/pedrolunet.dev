<script lang="ts">
	import { ArrowUpRight, ArrowUp } from '@lucide/svelte';
	import Carousel from '$lib/components/carousel.svelte';
	import gsap from 'gsap';

	let { data } = $props();

	let project = $derived(data.project || {});

	let allImages = $derived(project.image ? [project.image, ...(project.gallery || [])] : []);

	function getIconPath(techName: string) {
		return `/icons/${techName.toLowerCase().replace('.', '')}.svg`;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	$effect(() => {
		const ctx = gsap.context(() => {
			gsap.to('.reveal', {
				y: 0,
				opacity: 1,
				autoAlpha: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out'
			});
		});

		return () => ctx.revert();
	});
</script>

{#if data.project}
	<div
		class="min-h-[calc(100vh-var(--header-height-mobile))] w-full bg-bg px-4 pt-8 pb-24 md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))] lg:px-12 lg:pt-12"
	>
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
			<div class="order-1 col-span-1 flex h-fit flex-col gap-12 lg:sticky lg:top-12 lg:col-span-4">
				<div class="reveal translate-y-8 opacity-0">
					<a
						href="/work"
						class="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent"
					>
						<span class="transition-transform duration-300 group-hover:-translate-x-1">←</span>
						<span>Index</span>
					</a>
				</div>

				<div
					class="reveal flex translate-y-8 flex-col gap-6 opacity-0"
					style="container-type: inline-size"
				>
					<h1
						class="text-text-primary w-full text-[clamp(2.5rem,12cqi,6rem)] leading-[0.85] font-bold tracking-tight break-normal hyphens-none uppercase"
					>
						{project.title}
					</h1>

					<div
						class="border-text-primary/20 flex flex-col gap-1 border-l pl-4 text-xs tracking-widest text-text-secondary uppercase"
					>
						<span>{project.year}</span>
						<span class="text-text-primary">{project.context}</span>
					</div>
				</div>

				<div class="reveal translate-y-8 opacity-0">
					<h3
						class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
					>
						Stack
					</h3>

					<div class="flex flex-wrap gap-4">
						{#each project.tech as t}
							<div
								title={t}
								class="h-5 w-5 bg-text transition-colors duration-300 hover:bg-accent-light"
								style="
                  mask-image: url({getIconPath(t)});
                  mask-size: contain;
                  mask-position: center;
                  mask-repeat: no-repeat;
                  -webkit-mask-image: url({getIconPath(t)});
                  -webkit-mask-size: contain;
                  -webkit-mask-position: center;
                  -webkit-mask-repeat: no-repeat;
                "
							></div>
							<span class="sr-only">{t}</span>
						{/each}
					</div>
				</div>

				{#if project.repo || project.demo}
					<div class="reveal translate-y-8 opacity-0">
						<h3
							class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
						>
							Resources
						</h3>
						<div class="flex flex-col gap-2">
							{#if project.demo}
								<a
									href={project.demo}
									target="_blank"
									rel="noreferrer"
									class="border-text-primary/10 group flex w-full items-center justify-between border bg-bg px-4 py-3 transition-colors hover:border-accent hover:text-accent"
								>
									<span class="text-xs font-bold tracking-widest uppercase">Live Demo</span>
									<ArrowUpRight
										size={14}
										class="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
									/>
								</a>
							{/if}

							{#if project.repo}
								<a
									href={project.repo}
									target="_blank"
									rel="noreferrer"
									class="border-text-primary/10 group flex w-full items-center justify-between border bg-bg px-4 py-3 transition-colors hover:border-accent hover:text-accent"
								>
									<span class="text-xs font-bold tracking-widest uppercase">GitHub</span>
									<ArrowUpRight
										size={14}
										class="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
									/>
								</a>
							{/if}
						</div>
					</div>
				{/if}
			</div>

			<div class="order-2 col-span-1 flex flex-col gap-16 lg:col-span-8 lg:mt-20">
				<div
					class="reveal text-text-primary/90 prose prose-lg max-w-none translate-y-8 leading-relaxed font-light opacity-0 prose-invert"
				>
					<p>{project.description}</p>
				</div>

				<div class="reveal translate-y-8 opacity-0">
					<Carousel images={allImages} title={project.title} />
				</div>

				<div
					class="reveal border-text-primary/10 mt-24 flex translate-y-8 justify-end border-t pt-8 opacity-0"
				>
					<button
						onclick={scrollToTop}
						class="group flex items-center gap-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent"
					>
						<span>Back to Top</span>
						<div
							class="border-text-primary/20 flex h-8 w-8 items-center justify-center border transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-text"
						>
							<ArrowUp size={14} />
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-screen w-full items-center justify-center">
		<h1 class="text-text-primary font-bold tracking-widest uppercase">Project Not Found</h1>
	</div>
{/if}
