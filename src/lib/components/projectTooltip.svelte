<script lang="ts">
	import { Globe, ArrowRight } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let text: string;
	export let external: string;
	export let internal: string;

	let hovered = false;
	let triggerEl: HTMLElement;
	let alignment: 'center' | 'left' | 'right' = 'center';

	function handleOpen() {
		if (window.innerWidth < 1024) return;
		if (!triggerEl) return;

		const rect = triggerEl.getBoundingClientRect();
		const screenWidth = window.innerWidth;
		const threshold = 180;

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

<div class="relative inline-block" bind:this={triggerEl}>
	<a
		href={internal || external}
		class="text-text-primary border-b border-accent/40 font-medium transition-colors duration-500 hover:text-accent lg:cursor-default {hovered
			? 'invisible'
			: 'visible'}"
		on:mouseenter={handleOpen}
		on:mouseleave={() => (hovered = false)}
		on:click={(e) => {
			if (window.innerWidth >= 1024) {
				e.preventDefault();
			}
		}}
	>
		{text}
	</a>

	{#if hovered}
		<div
			transition:fly={{ y: 4, duration: 300, easing: cubicOut }}
			class="absolute top-1/2 z-50 hidden -translate-y-1/2 flex-row border border-accent bg-bg shadow-2xl lg:flex
      {alignment === 'center' ? 'left-1/2 -translate-x-1/2' : ''}
      {alignment === 'left' ? 'left-0' : ''}
      {alignment === 'right' ? 'right-0' : ''}"
		>
			<a
				in:fade={{ delay: 100, duration: 200 }}
				href={external}
				target="_blank"
				rel="noopener noreferrer"
				class="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest whitespace-nowrap text-text-secondary uppercase transition-colors duration-300 hover:bg-accent hover:text-bg"
			>
				<Globe size={12} />
				<span>Visit Site</span>
			</a>

			{#if internal}
				<div in:fade={{ delay: 150 }} class="h-auto w-px bg-accent/20"></div>
				<a
					in:fade={{ delay: 200, duration: 200 }}
					href={internal}
					class="flex items-center gap-2 px-4 py-2 text-[10px] font-bold tracking-widest whitespace-nowrap text-text-secondary uppercase transition-colors duration-300 hover:bg-accent hover:text-bg"
				>
					<ArrowRight size={12} />
					<span>Project Page</span>
				</a>
			{/if}
		</div>
	{/if}
</div>
