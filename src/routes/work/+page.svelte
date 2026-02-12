<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ArrowUpRight } from '@lucide/svelte';
	import projects from '$lib/data/projects.json';

	import SEO from '$lib/components/seo.svelte';

	let activeImage = $state(projects[0].image);
</script>

<SEO
	title="Work - Pedro Lunet"
	description="Selected projects and experiments in frontend development, UI/UX design, and interactive web experiences."
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

		{#each projects as project}
			<a
				href="/work/{project.slug}"
				class="group relative grid grid-cols-1 gap-y-2 border-b border-text/20 py-8 transition-all duration-300 hover:bg-text/5 hover:pl-6 lg:grid-cols-12 lg:items-center lg:gap-6 2xl:py-16 2xl:hover:pl-10"
				onmouseenter={() => (activeImage = project.image)}
			>
				<div
					class="col-span-1 text-sm text-accent opacity-70 transition-opacity group-hover:opacity-100 2xl:text-base"
				>
					/{project.id}
				</div>

				<div
					class="col-span-5 flex flex-col justify-center pr-6"
					style="container-type: inline-size"
				>
					<h2
						class="overflow-hidden text-[clamp(1.5rem,12cqi,3rem)] leading-none font-bold text-ellipsis whitespace-nowrap text-text transition-colors group-hover:text-accent 2xl:text-[clamp(2.5rem,12cqi,5rem)]"
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
					class="col-span-4 mt-2 flex flex-wrap content-center items-center gap-2 lg:mt-0 2xl:gap-3"
				>
					{#each project.tech.slice(0, 5) as t}
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
					class="col-span-2 mt-2 text-right text-sm text-text-secondary group-hover:text-text lg:mt-0 2xl:text-base"
				>
					{project.year}
				</div>
			</a>
		{/each}

		<a
			href="https://github.com/pedrolunet"
			target="_blank"
			rel="noreferrer"
			class="group flex items-center justify-between border-b border-text/20 py-8 transition-all duration-300 hover:bg-text/5 hover:pl-6 2xl:py-16 2xl:hover:pl-10"
		>
			<span
				class="text-sm font-bold tracking-widest text-text-secondary uppercase transition-colors group-hover:text-accent 2xl:text-base"
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

	<div class="sticky top-32 col-span-6 hidden h-fit lg:block 2xl:top-48">
		<div
			class="relative aspect-16/10 w-full overflow-hidden border border-text/5 bg-neutral-100 shadow-2xl shadow-bg/5"
		>
			{#key activeImage}
				<img
					src={activeImage}
					alt="Preview"
					in:fade={{ duration: 300 }}
					class="absolute inset-0 h-full w-full object-cover"
				/>
			{/key}
			<div
				class="pointer-events-none absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/5"
			></div>
		</div>
	</div>
</div>
