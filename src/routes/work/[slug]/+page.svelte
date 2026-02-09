<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ArrowUpRight, ArrowUp } from '@lucide/svelte';
	import Carousel from '$lib/components/carousel.svelte';

	let { data } = $props();

	let allImages = $derived([data.project.image, ...(data.project.gallery || [])]);

	function getIconPath(techName: string) {
		return `/icons/${techName.toLowerCase().replace('.', '')}.svg`;
	}

	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<div class="min-h-screen w-full bg-bg px-4 pt-8 pb-24 lg:px-12 lg:pt-12">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="order-1 col-span-1 flex h-fit flex-col gap-12 lg:sticky lg:top-12 lg:col-span-4">
			<div>
				<a
					href="/work"
					class="group inline-flex items-center gap-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent"
				>
					<span class="transition-transform duration-300 group-hover:-translate-x-1">←</span>
					<span>Index</span>
				</a>
			</div>

			<div class="flex flex-col gap-6" style="container-type: inline-size">
				<h1
					class="text-text-primary w-full text-[clamp(2.5rem,12cqi,6rem)] leading-[0.85] font-bold tracking-tight break-normal hyphens-none uppercase"
				>
					{data.project.title}
				</h1>

				<div
					class="border-text-primary/20 flex flex-col gap-1 border-l pl-4 text-xs tracking-widest text-text-secondary uppercase"
				>
					<span>{data.project.year}</span>
					<span class="text-text-primary">{data.project.context}</span>
				</div>
			</div>

			<div>
				<h3
					class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
				>
					Stack
				</h3>

				<div class="flex flex-wrap gap-4">
					{#each data.project.tech as t}
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

			{#if data.project.repo || data.project.demo}
				<div>
					<h3
						class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
					>
						Resources
					</h3>
					<div class="flex flex-col gap-2">
						{#if data.project.demo}
							<a
								href={data.project.demo}
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

						{#if data.project.repo}
							<a
								href={data.project.repo}
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
				class="text-text-primary/90 prose prose-lg max-w-none leading-relaxed font-light prose-invert"
			>
				<p>{data.project.description}</p>
			</div>

			<Carousel images={allImages} title={data.project.title} />

			<div class="border-text-primary/10 mt-24 flex justify-end border-t pt-8">
				<button
					onclick={scrollToTop}
					class="group flex items-center gap-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent"
				>
					<span>Back to Top</span>
					<div
						class="border-text-primary/20 flex h-8 w-8 items-center justify-center border transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
					>
						<ArrowUp size={14} />
					</div>
				</button>
			</div>
		</div>
	</div>
</div>
