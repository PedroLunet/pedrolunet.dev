<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { ArrowUpRight } from '@lucide/svelte';
	import gsap from 'gsap';
	import projects from '$lib/data/projects.json';

	import SEO from '$lib/components/seo.svelte';

	// --- Hover preview -------------------------------------------------------
	// Every project image is rendered once, stacked on top of each other, so
	// they are fetched up-front and switching between them never shows an
	// empty frame. Each newly activated image is raised above the others and
	// fades/settles in; once it fully covers the frame, everything underneath
	// is hidden. Rapid hovering therefore always layers on top of whatever is
	// currently visible instead of flashing the container background.

	let activeIndex = $state(0);
	let previewImages: HTMLImageElement[] = $state([]);
	const zIndices: number[] = projects.map((_, i) => (i === 0 ? 1 : 0));
	let topZ = 1;

	function showPreview(index: number) {
		if (index === activeIndex) return;
		activeIndex = index;

		const el = previewImages[index];
		if (!el) return;

		zIndices[index] = ++topZ;
		gsap.killTweensOf(el);
		gsap.set(el, { zIndex: topZ });
		gsap.fromTo(
			el,
			{ autoAlpha: 0, scale: 1.04 },
			{
				autoAlpha: 1,
				scale: 1,
				duration: 0.6,
				ease: 'power3.out',
				onComplete: () => {
					// Hide only the images buried underneath this one. Anything above
					// it is a newer hover that is still animating in.
					previewImages.forEach((other, i) => {
						if (i !== index && zIndices[i] < zIndices[index]) {
							gsap.killTweensOf(other);
							gsap.set(other, { autoAlpha: 0 });
						}
					});
				}
			}
		);
	}

	onMount(() => {
		previewImages.forEach((el, i) => {
			gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, zIndex: zIndices[i] });
		});

		return () => gsap.killTweensOf(previewImages);
	});
</script>

<SEO
	title="Work - Pedro Lunet"
	description="Selected projects and interactive web experiments by Pedro Lunet, a Design Engineer based in Porto."
/>

<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 2xl:gap-32">
	<div class="col-span-1 flex flex-col lg:col-span-6">
		<div
			class="mb-2 hidden grid-cols-12 gap-4 border-b border-text/10 pb-4 text-xs font-bold tracking-widest text-text-secondary uppercase opacity-40 lg:grid 2xl:mb-6 2xl:pb-6 2xl:text-sm"
		>
			<div class="col-span-1">No.</div>
			<div class="col-span-5">Project</div>
			<div class="col-span-4">Stack</div>
			<div class="col-span-2 text-right">Year</div>
		</div>

		{#each projects as project, i (project.slug)}
			<!--
				The row itself never changes size on hover. Content columns slide with a
				GPU-friendly transform instead of animating padding, which previously
				forced a layout on every frame and could re-wrap the tech tags.
			-->
			<a
				href={resolve('/work/[slug]', { slug: project.slug })}
				class="group relative grid grid-cols-1 gap-y-2 border-b border-text/20 py-8 transition-colors duration-300 hover:bg-text/5 active:bg-text/5 lg:grid-cols-12 lg:items-center lg:gap-6 2xl:py-16"
				onmouseenter={() => showPreview(i)}
				onfocus={() => showPreview(i)}
			>
				<div
					class="col-span-1 text-sm text-accent opacity-70 transition-[opacity,translate] duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-100 2xl:text-base 2xl:group-hover:translate-x-10"
				>
					/{project.id}
				</div>

				<div
					class="col-span-5 flex flex-col justify-center pr-6 transition-[translate] duration-300 ease-out group-hover:translate-x-6 2xl:group-hover:translate-x-10"
					style="container-type: inline-size"
				>
					<!--
						Sized with container query units so the longest title
						("PEDROLUNET.DEV") fits its column at every breakpoint. Multi-word
						titles may wrap instead of being ellipsised; break-words is only a
						last-resort safety net.
					-->
					<h2
						class="text-[clamp(1.5rem,11cqi,3rem)] leading-none font-bold text-balance break-words text-text transition-colors group-hover:text-accent lg:text-[clamp(1rem,11cqi,3rem)] 2xl:text-[clamp(1rem,11cqi,5rem)]"
					>
						{project.title}
					</h2>
					<span
						class="mt-2 text-sm text-text-secondary transition-colors group-hover:text-text 2xl:mt-3 2xl:text-lg"
					>
						{project.context}
					</span>
				</div>

				<div
					class="col-span-4 mt-2 flex flex-wrap content-center items-center gap-2 transition-[translate] duration-300 ease-out group-hover:translate-x-6 lg:mt-0 2xl:gap-3 2xl:group-hover:translate-x-10"
				>
					{#each project.tech.slice(0, 5) as t (t)}
						<span
							class="rounded-sm bg-text/5 px-3 py-1.5 text-xs tracking-wider text-text-secondary uppercase transition-colors group-hover:bg-accent/10 group-hover:text-accent 2xl:px-4 2xl:py-2 2xl:text-sm"
						>
							{t}
						</span>
					{/each}

					{#if project.tech.length > 5}
						<span class="px-1 text-xs text-text-secondary/50 2xl:text-sm">
							+{project.tech.length - 5}
						</span>
					{/if}
				</div>

				<div
					class="col-span-2 mt-2 text-right text-sm text-text-secondary transition-colors group-hover:text-text lg:mt-0 2xl:text-base"
				>
					{project.year}
				</div>
			</a>
		{/each}

		<a
			href="https://github.com/pedrolunet"
			target="_blank"
			rel="noreferrer"
			class="group flex items-center justify-between border-b border-text/20 py-8 transition-colors duration-300 hover:bg-text/5 active:bg-text/5 2xl:py-16"
		>
			<span
				class="text-sm font-bold tracking-widest text-text-secondary uppercase transition-[color,translate] duration-300 ease-out group-hover:translate-x-6 group-hover:text-accent 2xl:text-base 2xl:group-hover:translate-x-10"
			>
				See more
			</span>

			<div
				class="flex items-center gap-2 text-sm text-text-secondary opacity-50 transition-all group-hover:text-accent group-hover:opacity-100 2xl:text-base"
			>
				<span class="hidden md:inline-block">GitHub</span>
				<ArrowUpRight
					class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 2xl:h-6 2xl:w-6"
				/>
			</div>
		</a>
	</div>

	<div class="sticky top-32 col-span-6 hidden h-fit lg:block 2xl:top-48" aria-hidden="true">
		<!-- Dark base so nothing bright ever shows through between images. -->
		<div
			class="relative aspect-16/10 w-full overflow-hidden border border-text/5 bg-neutral-900 shadow-2xl shadow-bg/5"
		>
			{#each projects as project, i (project.slug)}
				<img
					bind:this={previewImages[i]}
					src={project.image}
					alt=""
					loading="lazy"
					decoding="async"
					draggable="false"
					class="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform]"
					style:opacity={i === 0 ? 1 : 0}
				/>
			{/each}
		</div>
	</div>
</div>
