<script lang="ts">
	import { ArrowUpRight, ArrowUp, ArrowLeft } from '@lucide/svelte';
	import Carousel from '$lib/components/carousel.svelte';
	import gsap from 'gsap';
	import SEO from '$lib/components/seo.svelte';

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
	<SEO
		title="{project.title} - Pedro Lunet"
		description={project.description
			? project.description.slice(0, 160) + '...'
			: 'Project details'}
		image={project.image}
		type="article"
	/>

	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 2xl:gap-32">
		<div
			class="order-1 col-span-1 flex h-fit flex-col gap-12 lg:sticky lg:top-24 lg:col-span-4 2xl:top-40 2xl:gap-20"
		>
			<div class="reveal translate-y-8 opacity-0">
				<a
					href="/work"
					class="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent 2xl:text-sm"
				>
					<ArrowLeft
						size={16}
						class="transition-transform duration-300 group-hover:-translate-x-1"
					/>
					<span>Index</span>
				</a>
			</div>

			<div
				class="reveal flex translate-y-8 flex-col gap-6 opacity-0 2xl:gap-10"
				style="container-type: inline-size"
			>
				<h1
					class="w-full text-[clamp(2.5rem,12cqi,5rem)] leading-[0.9] font-bold tracking-tight break-words hyphens-auto text-text uppercase 2xl:text-[clamp(3.5rem,12cqi,7rem)]"
				>
					{project.title}
				</h1>

				<div
					class="flex flex-col gap-1 border-l border-text/20 pl-4 text-xs tracking-widest text-text-secondary uppercase 2xl:pl-6 2xl:text-sm"
				>
					<span>{project.year}</span>
					<span class="text-text">{project.context}</span>
				</div>
			</div>

			<div class="reveal translate-y-8 opacity-0">
				<h3
					class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50 2xl:mb-6 2xl:text-xs"
				>
					Stack
				</h3>

				<div class="flex flex-wrap gap-4 2xl:gap-6">
					{#each project.tech as t}
						<div
							title={t}
							class="h-5 w-5 bg-text transition-colors duration-300 hover:bg-accent 2xl:h-8 2xl:w-8"
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
						class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50 2xl:mb-6 2xl:text-xs"
					>
						Resources
					</h3>
					<div class="flex flex-col gap-2 2xl:gap-4">
						{#if project.demo}
							<a
								href={project.demo}
								target="_blank"
								rel="noreferrer"
								class="group flex w-full items-center justify-between border border-text/10 bg-bg px-4 py-3 transition-colors hover:border-accent hover:text-accent 2xl:px-6 2xl:py-5"
							>
								<span class="text-xs font-bold tracking-widest uppercase 2xl:text-sm"
									>Live Demo</span
								>
								<ArrowUpRight
									size={14}
									class="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 2xl:h-5 2xl:w-5"
								/>
							</a>
						{/if}

						{#if project.repo}
							<a
								href={project.repo}
								target="_blank"
								rel="noreferrer"
								class="group flex w-full items-center justify-between border border-text/10 bg-bg px-4 py-3 transition-colors hover:border-accent hover:text-accent 2xl:px-6 2xl:py-5"
							>
								<span class="text-xs font-bold tracking-widest uppercase 2xl:text-sm">GitHub</span>
								<ArrowUpRight
									size={14}
									class="opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 2xl:h-5 2xl:w-5"
								/>
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>

		<div
			class="order-2 col-span-1 flex flex-col gap-16 lg:col-span-8 lg:mt-32 2xl:mt-48 2xl:gap-32"
		>
			<div
				class="reveal prose prose-lg max-w-none translate-y-8 leading-relaxed font-light text-text/90 opacity-0 prose-invert 2xl:prose-2xl 2xl:leading-loose"
			>
				<p>{project.description}</p>
			</div>

			<div class="reveal translate-y-8 opacity-0">
				<Carousel images={allImages} title={project.title} />
			</div>

			<div
				class="reveal mt-24 flex translate-y-8 justify-end border-t border-text/10 pt-8 opacity-0 2xl:mt-40 2xl:pt-12"
			>
				<button
					onclick={scrollToTop}
					class="group flex items-center gap-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent 2xl:text-sm"
				>
					<span>Back to Top</span>
					<div
						class="flex h-8 w-8 items-center justify-center border border-text/20 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg 2xl:h-12 2xl:w-12"
					>
						<ArrowUp size={14} class="2xl:h-6 2xl:w-6" />
					</div>
				</button>
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-[50vh] w-full items-center justify-center">
		<h1 class="font-bold tracking-widest text-text uppercase">Project Not Found</h1>
	</div>
{/if}
