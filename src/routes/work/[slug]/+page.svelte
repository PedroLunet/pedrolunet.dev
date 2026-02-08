<script lang="ts">
	import { fade } from 'svelte/transition';

	let { data } = $props();

	function getIconPath(techName: string) {
		return `/icons/${techName.toLowerCase().replace('.', '')}.svg`;
	}
</script>

<div class="min-h-screen w-full bg-bg px-4 pt-4 pb-12 lg:px-12 lg:pt-8">
	<div class="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
		<div class="order-1 col-span-1 flex h-fit flex-col gap-12 lg:sticky lg:top-48 lg:col-span-4">
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
					class="text-text-primary w-full text-[12cqi] leading-[0.85] font-bold tracking-tight break-normal hyphens-none uppercase"
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
				<div class="flex flex-wrap gap-3">
					{#each data.project.tech as t}
						<div
							class="group border-text-primary/10 bg-text-primary/5 relative flex h-10 w-10 items-center justify-center rounded-sm border transition-all hover:border-accent hover:bg-accent/10"
							title={t}
						>
							<img
								src={getIconPath(t)}
								alt={t}
								class="h-5 w-5 opacity-60 grayscale transition-all group-hover:opacity-100 group-hover:grayscale-0"
								onerror={(e) => {
									(e.currentTarget as HTMLElement).style.display = 'none';
									(e.currentTarget as HTMLElement).nextElementSibling!.classList.remove('hidden');
								}}
							/>
							<span class="hidden text-[10px] font-bold text-accent">
								{t.slice(0, 2).toUpperCase()}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="order-2 col-span-1 flex flex-col gap-16 lg:col-span-8 lg:mt-12">
			<div
				class="text-text-primary/90 prose prose-lg max-w-none leading-relaxed font-light prose-invert"
			>
				<p>{data.project.description}</p>
			</div>

			<div
				class="border-text-primary/10 relative aspect-4/3 w-full border bg-neutral-900 shadow-2xl shadow-black/20"
			>
				<img
					src={data.project.image}
					alt={data.project.title}
					class="absolute inset-0 h-full w-full object-cover"
					in:fade={{ duration: 600 }}
				/>
				<div class="pointer-events-none absolute inset-0 m-6 border border-white/10"></div>
				<div
					class="pointer-events-none absolute right-6 bottom-6 text-[9px] tracking-widest text-white/50 uppercase"
				>
					Fig. 01
				</div>
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="border-text-primary/5 aspect-square w-full border bg-neutral-800/20"></div>
				<div class="border-text-primary/5 aspect-square w-full border bg-neutral-800/20"></div>
			</div>
		</div>
	</div>
</div>
