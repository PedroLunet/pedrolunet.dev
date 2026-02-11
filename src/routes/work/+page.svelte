<script lang="ts">
	import { fade } from 'svelte/transition';
	import { ArrowUpRight } from '@lucide/svelte';
	import projects from '$lib/data/projects.json';

	let activeImage = $state(projects[0].image);
</script>

<div
	class="min-h-[calc(100vh-var(--header-height-mobile))] w-full bg-bg px-6 pt-4 pb-12 md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))] lg:px-9"
>
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
		<div class="col-span-1 flex flex-col lg:col-span-7">
			<div
				class="border-text-primary/10 mb-2 hidden grid-cols-12 gap-4 border-b pb-2 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-40 lg:grid"
			>
				<div class="col-span-1">No.</div>
				<div class="col-span-5">Project</div>
				<div class="col-span-4">Stack</div>
				<div class="col-span-2 text-right">Year</div>
			</div>

			{#each projects as project}
				<a
					href="/work/{project.slug}"
					class="group border-text-primary/20 hover:bg-text-primary/5 relative grid grid-cols-1 gap-y-2 border-b py-6 transition-all duration-300 hover:pl-4 lg:grid-cols-12 lg:items-center lg:gap-4"
					onmouseenter={() => (activeImage = project.image)}
				>
					<div
						class="col-span-1 text-xs text-accent opacity-70 transition-opacity group-hover:opacity-100"
					>
						/{project.id}
					</div>

					<div
						class="col-span-5 flex flex-col justify-center pr-6"
						style="container-type: inline-size"
					>
						<h2
							class="text-text-primary overflow-hidden text-[clamp(1.25rem,11cqi,2.5rem)] leading-none font-bold text-ellipsis whitespace-nowrap transition-colors group-hover:text-accent"
						>
							{project.title}
						</h2>
						<span
							class="group-hover:text-text-primary mt-1 text-xs text-text-secondary transition-colors"
						>
							{project.context}
						</span>
					</div>

					<div class="col-span-4 mt-2 flex flex-wrap content-center items-center gap-2 lg:mt-0">
						{#each project.tech.slice(0, 6) as t}
							<span
								class="bg-text-primary/5 rounded-sm px-2 py-1 text-[10px] tracking-wider text-text-secondary uppercase transition-colors group-hover:bg-accent/10 group-hover:text-accent"
							>
								{t}
							</span>
						{/each}

						{#if project.tech.length > 6}
							<span class="px-1 text-[10px] text-text-secondary/50">
								+{project.tech.length - 6}
							</span>
						{/if}
					</div>

					<div
						class="group-hover:text-text-primary col-span-2 mt-2 text-right text-xs text-text-secondary lg:mt-0"
					>
						{project.year}
					</div>
				</a>
			{/each}

			<a
				href="https://github.com/pedrolunet"
				target="_blank"
				rel="noreferrer"
				class="group border-text-primary/20 hover:bg-text-primary/5 flex items-center justify-between border-b py-6 transition-all duration-300 hover:pl-4"
			>
				<span
					class="text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors group-hover:text-accent"
				>
					See more
				</span>

				<div
					class="flex items-center gap-2 text-xs text-text-secondary opacity-50 transition-all group-hover:text-accent group-hover:opacity-100"
				>
					<span class="hidden md:inline-block">GitHub</span>
					<ArrowUpRight
						size={16}
						class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
					/>
				</div>
			</a>
		</div>

		<div class="sticky top-32 col-span-5 hidden h-fit lg:block">
			<div
				class="border-text-primary/5 relative aspect-16/10 w-full overflow-hidden border bg-neutral-100 shadow-2xl shadow-bg/5"
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
</div>
