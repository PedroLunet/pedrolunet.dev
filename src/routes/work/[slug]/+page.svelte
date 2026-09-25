<script lang="ts">
	import { ArrowUpRight, ArrowUp, ArrowLeft, ArrowRight } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import Carousel from '$lib/components/carousel.svelte';
	import gsap from 'gsap';
	import SEO from '$lib/components/seo.svelte';

	let { data } = $props();

	let project = $derived(data.project);
	let allImages = $derived([project.image, ...(project.gallery ?? [])]);

	// Descriptions are plain strings in projects.json; a blank line starts a
	// new paragraph.
	let paragraphs = $derived(
		project.description
			.split(/\n\s*\n/)
			.map((p) => p.trim())
			.filter(Boolean)
	);

	let seoDescription = $derived(summarize(project.description));

	/** Single-line summary for meta tags, cut at a word boundary. */
	function summarize(text: string, max = 160) {
		const flat = text.replace(/\s+/g, ' ').trim();
		if (flat.length <= max) return flat;
		const cut = flat.slice(0, max - 1);
		return cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,.;:–-]+$/, '') + '…';
	}

	function getIconPath(techName: string) {
		return `/icons/${techName.toLowerCase().replace('.', '')}.svg`;
	}

	function scrollToTop() {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
	}

	$effect(() => {
		// SvelteKit reuses this component when going from one project to the
		// next, and the {#key} below re-creates the content, so re-run the intro
		// whenever the project changes.
		void project.slug;

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

<SEO
	title="{project.title} - Pedro Lunet"
	description={seoDescription}
	image={project.image}
	type="article"
/>

<!--
	Keyed on the slug so each project starts fresh: the carousel resets to its
	first slide (instead of keeping the previous project's index and scroll
	position) and the intro animation plays again.
-->
{#key project.slug}
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 2xl:gap-32">
		<div
			class="order-1 col-span-1 flex h-fit flex-col gap-12 lg:sticky lg:top-24 lg:col-span-4 2xl:top-40 2xl:gap-20"
		>
			<div class="reveal translate-y-8 opacity-0">
				<a
					href={resolve('/work')}
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

				<!--
					The label doubles as the accessible name (it stays in the
					accessibility tree while visually hidden), replacing the old
					`title` attribute (slow, unstyled native tooltip) + sr-only copy.
				-->
				<ul class="flex flex-wrap gap-4 2xl:gap-6">
					{#each project.tech as t, i (t)}
						<li class="group/tech relative">
							<div
								aria-hidden="true"
								class="h-5 w-5 bg-text transition-colors duration-300 group-hover/tech:bg-accent 2xl:h-8 2xl:w-8"
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
							<span
								class={[
									'pointer-events-none absolute top-full mt-2 -translate-y-1 bg-text px-2 py-1 text-[10px] font-bold tracking-widest whitespace-nowrap text-bg uppercase opacity-0 transition duration-200 ease-out group-hover/tech:translate-y-0 group-hover/tech:opacity-100 2xl:mt-3 2xl:text-xs',
									// The first label hangs right so it can't overflow the page edge.
									i === 0 ? 'left-0' : 'left-1/2 -translate-x-1/2'
								]}
							>
								{t}
							</span>
						</li>
					{/each}
				</ul>
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
			class="order-2 col-span-1 flex flex-col gap-16 lg:col-span-8 lg:mt-12 2xl:mt-24 2xl:gap-32"
		>
			<div
				class="reveal prose prose-lg max-w-none translate-y-8 leading-relaxed font-light text-text/90 opacity-0 prose-invert 2xl:prose-2xl 2xl:leading-loose"
			>
				{#each paragraphs as paragraph, i (i)}
					<p>{paragraph}</p>
				{/each}
			</div>

			<div class="reveal translate-y-8 opacity-0">
				<Carousel images={allImages} title={project.title} />
			</div>

			<nav
				aria-label="More projects"
				class="reveal mt-8 flex translate-y-8 flex-col border-t border-text/10 opacity-0 lg:mt-24 2xl:mt-40"
			>
				{#if data.next}
					{@const next = data.next}
					<a
						href={resolve('/work/[slug]', { slug: next.slug })}
						aria-label="Next project: {next.title}"
						class="group grid grid-cols-1 items-end gap-6 py-8 transition-transform duration-150 active:scale-[0.99] sm:grid-cols-[minmax(0,1fr)_auto] 2xl:gap-12 2xl:py-12"
					>
						<div class="flex min-w-0 flex-col gap-3 2xl:gap-5" style="container-type: inline-size">
							<span
								class="text-[10px] font-bold tracking-widest text-text-secondary uppercase 2xl:text-xs"
							>
								<span class="text-accent">/{next.id}</span>
								<span class="ml-2">Next project</span>
							</span>
							<span
								class="flex items-center gap-[0.2em] text-[clamp(1.75rem,9cqi,4.5rem)] leading-[0.9] font-bold tracking-tight break-words text-text uppercase transition-colors duration-300 group-hover:text-accent group-focus-visible:text-accent"
							>
								<span class="min-w-0">{next.title}</span>
								<ArrowRight
									aria-hidden="true"
									class="size-[0.7em] shrink-0 -translate-x-2 opacity-0 transition duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
								/>
							</span>
							<span class="text-xs tracking-widest text-text-secondary uppercase 2xl:text-sm">
								{next.context} · {next.year}
							</span>
						</div>

						<div
							class="relative hidden aspect-[3/2] w-40 overflow-hidden bg-neutral-900 sm:block lg:w-56 2xl:w-80"
						>
							<img
								src={next.image}
								alt=""
								loading="lazy"
								decoding="async"
								class="h-full w-full object-cover opacity-80 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
							/>
						</div>
					</a>
				{/if}

				<div class="flex items-center justify-between gap-6 border-t border-text/10 pt-8 2xl:pt-12">
					{#if data.prev && data.prev.slug !== data.next?.slug}
						{@const prev = data.prev}
						<a
							href={resolve('/work/[slug]', { slug: prev.slug })}
							aria-label="Previous project: {prev.title}"
							class="group inline-flex min-w-0 items-center gap-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent 2xl:text-sm"
						>
							<ArrowLeft
								size={16}
								aria-hidden="true"
								class="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
							/>
							<span class="hidden opacity-50 sm:inline">Prev</span>
							<span class="truncate">{prev.title}</span>
						</a>
					{:else}
						<span></span>
					{/if}

					<button
						onclick={scrollToTop}
						class="group flex shrink-0 items-center gap-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent 2xl:text-sm"
					>
						<span>Back to Top</span>
						<div
							class="flex h-8 w-8 items-center justify-center border border-text/20 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg 2xl:h-12 2xl:w-12"
						>
							<ArrowUp
								size={14}
								class="transition-transform duration-300 group-hover:-translate-y-0.5 2xl:h-6 2xl:w-6"
							/>
						</div>
					</button>
				</div>
			</nav>
		</div>
	</div>
{/key}
