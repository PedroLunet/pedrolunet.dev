<script lang="ts">
	import { fade } from 'svelte/transition';

	const projects = [
		{
			id: '01',
			title: 'Neural Architectures',
			context: "Master's Thesis",
			year: '2024',
			tech: [
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL',
				'Python',
				'TensorFlow',
				'WebGL'
			],
			image:
				'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop'
		},
		{
			id: '02',
			title: 'Morphology',
			context: 'Generative Art',
			year: '2023',
			tech: ['p5.js', 'GLSL', 'Canvas'],
			image:
				'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
		},
		{
			id: '03',
			title: 'Urban Decay',
			context: 'Photography',
			year: '2023',
			tech: ['Analog', 'Darkroom', 'Scan'],
			image:
				'https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=1998&auto=format&fit=crop'
		},
		{
			id: '04',
			title: 'System 01',
			context: 'University',
			year: '2022',
			tech: ['Figma', 'Design Systems'],
			image:
				'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop'
		},
		{
			id: '05',
			title: 'Playground',
			context: 'Experiments',
			year: '2021—24',
			tech: ['Svelte', 'Three.js', 'Blender'],
			image:
				'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop'
		}
	];

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
					href="/works/{project.title.toLowerCase().replace(' ', '-')}"
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

		<div class="relative sticky top-32 col-span-5 hidden h-[50vh] lg:block">
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
