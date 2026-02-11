<script lang="ts">
	import { Globe, ArrowRight } from '@lucide/svelte';
	import { scale } from 'svelte/transition';

	export let text: string;
	export let external: string;
	export let internal: string;

	let hovered = false;
	let triggerEl: HTMLElement;
	let alignment: 'center' | 'left' | 'right' = 'center';

	function handleHover() {
		if (!triggerEl) return;

		const rect = triggerEl.getBoundingClientRect();
		const screenWidth = window.innerWidth;
		const threshold = 160;

		if (rect.left < threshold) {
			alignment = 'left';
		} else if (screenWidth - rect.right < threshold) {
			alignment = 'right';
		} else {
			alignment = 'center';
		}

		hovered = true;
	}
</script>

<div
	class="relative inline-block"
	bind:this={triggerEl}
	role="button"
	tabindex="0"
	on:mouseenter={handleHover}
	on:mouseleave={() => (hovered = false)}
>
	<span
		class="text-text-primary cursor-pointer border-b border-accent/40 font-medium transition-colors hover:border-accent hover:text-accent"
	>
		{text}
	</span>

	{#if hovered}
		<div
			transition:scale={{ duration: 150, start: 0.98, opacity: 0 }}
			class="absolute bottom-[calc(100%+12px)] z-50 flex flex-row border border-accent/20 bg-bg shadow-2xl backdrop-blur-md
      {alignment === 'center' ? 'left-1/2 -translate-x-1/2' : ''}
      {alignment === 'left' ? 'left-0' : ''}
      {alignment === 'right' ? 'right-0' : ''}"
		>
			<a
				href={external}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 px-4 py-3 text-[10px] font-bold tracking-widest whitespace-nowrap text-text-secondary uppercase transition-colors hover:bg-accent hover:text-bg"
			>
				<Globe size={12} />
				<span>Visit Site</span>
			</a>

			{#if internal}
				<div class="h-auto w-px bg-accent/10"></div>
				<a
					href={internal}
					class="flex items-center gap-2 px-4 py-3 text-[10px] font-bold tracking-widest whitespace-nowrap text-text-secondary uppercase transition-colors hover:bg-accent hover:text-bg"
				>
					<ArrowRight size={12} />
					<span>Case Study</span>
				</a>
			{/if}
		</div>
	{/if}
</div>
