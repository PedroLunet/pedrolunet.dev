<script lang="ts">
	// DADOS (Podes substituir isto por dados reais ou CMS depois)
	const projects = [
		{
			client: 'Lunet Studio',
			service: 'Creative Dev',
			year: '2024',
			id: '01'
		},
		{
			client: 'Vogue Portugal',
			service: 'E-commerce',
			year: '2023',
			id: '02'
		},
		{
			client: 'Type Foundry',
			service: 'Web Design',
			year: '2023',
			id: '03'
		},
		{
			client: 'Archive 001',
			service: 'Experimental',
			year: '2022',
			id: '04'
		},
		{
			client: 'Freelance',
			service: 'Consulting',
			year: '2021—Present',
			id: '05'
		}
	];
</script>

<div class="min-h-screen w-full bg-bg px-4 pt-32 pb-12 md:px-12 md:pt-48">
	<div class="border-text-primary/20 mb-12 border-b pb-4 md:mb-24">
		<h1 class="text-xs font-bold tracking-widest text-text-secondary uppercase md:text-sm">
			Selected Works (2021—2024)
		</h1>
	</div>

	<div class="flex flex-col">
		<div
			class="hidden grid-cols-12 gap-4 pb-4 text-xs font-medium tracking-widest text-text-secondary uppercase opacity-50 md:grid"
		>
			<div class="col-span-1">No.</div>
			<div class="col-span-5">Client</div>
			<div class="col-span-4">Services</div>
			<div class="col-span-2 text-right">Year</div>
		</div>

		{#each projects as project}
			<a
				href="/works/{project.client.toLowerCase().replace(' ', '-')}"
				class="group border-text-primary/20 hover:bg-text-primary/5 relative grid grid-cols-1 gap-2 border-t py-8 transition-colors duration-300 md:grid-cols-12 md:items-center md:gap-4"
			>
				<div class="col-span-1 mb-2 font-mono text-xs font-medium text-accent md:mb-0 md:text-sm">
					/{project.id}
				</div>

				<div
					class="text-text-primary col-span-5 text-3xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-6xl"
				>
					{project.client}
				</div>

				<div class="col-span-4 flex items-center">
					<span
						class="border-text-primary/30 text-text-primary rounded-full border px-3 py-1 text-xs tracking-widest uppercase md:text-sm"
					>
						{project.service}
					</span>
				</div>

				<div
					class="col-span-2 mt-2 text-right text-xs font-medium text-text-secondary md:mt-0 md:text-sm"
				>
					{project.year}
				</div>
			</a>
		{/each}

		<div class="border-text-primary/20 border-t"></div>
	</div>
</div>
