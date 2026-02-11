<script lang="ts">
	import { Globe, ArrowRight } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';

	export let text: string;
	export let external: string;
	export let internal: string;

	let hovered = false;
</script>

<div
	class="relative inline-block"
	role="button"
	tabindex="0"
	onmouseenter={() => (hovered = true)}
	onmouseleave={() => (hovered = false)}
>
	<span
		class="text-text-primary cursor-pointer border-b border-accent/30 font-medium transition-colors hover:border-accent hover:text-accent"
	>
		{text}
	</span>

	{#if hovered}
		<div
			transition:scale={{ duration: 200, start: 0.95 }}
			class="absolute bottom-full left-1/2 z-50 mb-2 flex -translate-x-1/2 flex-col gap-1 rounded-sm border border-accent/20 bg-bg p-2 shadow-2xl backdrop-blur-md"
		>
			<a
				href={external}
				target="_blank"
				class="flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-bold tracking-wider whitespace-nowrap text-text-secondary uppercase transition-colors hover:bg-accent hover:text-bg"
			>
				<Globe size={12} />
				<span>Visit Site</span>
			</a>

			{#if internal}
				<a
					href={internal}
					class="flex items-center gap-3 rounded-sm px-3 py-2 text-xs font-bold tracking-wider whitespace-nowrap text-text-secondary uppercase transition-colors hover:bg-accent hover:text-bg"
				>
					<ArrowRight size={12} />
					<span>Case Study</span>
				</a>
			{/if}

			<div
				class="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-accent/20 bg-bg"
			></div>
		</div>
	{/if}
</div>
