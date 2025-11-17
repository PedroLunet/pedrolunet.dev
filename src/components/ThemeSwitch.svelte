<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { setMode } from 'mode-watcher';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Track current theme mode
	const mode = writable<'light' | 'dark'>('light');

	// Detect initial mode and observe changes to the theme
	onMount(() => {
		const updateMode = () => {
			if (document.documentElement.classList.contains('dark')) {
				mode.set('dark');
			} else {
				mode.set('light');
			}
		};
		updateMode();
		const observer = new MutationObserver(updateMode);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	});

	function toggleTheme() {
		mode.update((current) => {
			const next = current === 'light' ? 'dark' : 'light';
			setMode(next);
			return next;
		});
	}
</script>

<button
	class={buttonVariants({ variant: 'outline', size: 'icon' })}
	aria-label="Toggle theme"
	on:click={toggleTheme}
>
	{#if $mode === 'light'}
		<SunIcon class="h-[1.2rem] w-[1.2rem] transition-all" />
	{:else}
		<MoonIcon class="h-[1.2rem] w-[1.2rem] transition-all" />
	{/if}
</button>
