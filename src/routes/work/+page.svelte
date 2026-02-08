<script lang="ts">
	import { fade } from 'svelte/transition';

	import projects from '$lib/data/projects.json';
	let activeImage = $state(projects[0].image);
</script>

<div class="min-h-screen w-full bg-bg px-4 pt-28 pb-12 md:px-12">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12">
		<div class="col-span-1 flex flex-col lg:col-span-7">
			<div
				class="border-text-primary/10 mb-2 hidden grid-cols-12 gap-4 border-b pb-2 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-40 md:grid"
			>
				<div class="col-span-1">No.</div>
				<div class="col-span-5">Project</div>
				<div class="col-span-4">Stack</div>
				<div class="col-span-2 text-right">Year</div>
			</div>

			{#each projects as project}
				<a
					href="/work/{project.slug}"
					class="group border-text-primary/20 hover:bg-text-primary/5 relative grid grid-cols-1 gap-y-2 border-b py-6 transition-all duration-300 hover:pl-4 md:grid-cols-12 md:items-center md:gap-4"
					onmouseenter={() => (activeImage = project.image)}
				>
					<div
						class="col-span-1 font-mono text-xs text-accent opacity-70 transition-opacity group-hover:opacity-100"
					>
						/{project.id}
					</div>

					<div class="col-span-5 flex flex-col justify-center">
						<h2
							class="text-text-primary text-2xl font-bold transition-colors group-hover:text-accent md:text-3xl lg:text-4xl"
						>
							{project.title}
						</h2>
						<span
							class="group-hover:text-text-primary mt-1 text-xs text-text-secondary transition-colors"
						>
							{project.context}
						</span>
					</div>

					<div class="col-span-4 mt-2 flex flex-wrap content-center items-center gap-2 md:mt-0">
						{#each project.tech.slice(0, 6) as t}
							<span
								class="bg-text-primary/5 rounded-sm px-2 py-1 text-[10px] tracking-wider text-text-secondary uppercase transition-colors group-hover:bg-accent/10 group-hover:text-accent"
							>
								{t}
							</span>
						{/each}

						{#if project.tech.length > 6}
							<span class="px-1 font-mono text-[10px] text-text-secondary/50">
								+{project.tech.length - 6}
							</span>
						{/if}
					</div>

					<div
						class="group-hover:text-text-primary col-span-2 mt-2 text-right font-mono text-xs text-text-secondary md:mt-0"
					>
						{project.year}
					</div>
				</a>
			{/each}
		</div>

		<div class="sticky top-32 col-span-5 hidden h-[50vh] lg:block">
			<div
				class="border-text-primary/5 relative h-full w-full overflow-hidden border bg-neutral-100 shadow-2xl shadow-black/5"
			>
				{#key activeImage}
					<img
						src={activeImage}
						alt="Preview"
						in:fade={{ duration: 400 }}
						class="absolute inset-0 h-full w-full object-cover"
					/>
				{/key}
				<div
					class="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"
				></div>
			</div>
		</div>
	</div>
</div>
