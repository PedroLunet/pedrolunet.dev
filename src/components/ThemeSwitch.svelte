<script lang="ts">
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { setMode } from 'mode-watcher';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const mode = writable<'light' | 'dark'>('light');

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
	class="flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background p-2 text-foreground transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
	aria-label="Toggle theme"
	on:click={toggleTheme}
>
	{#if $mode === 'light'}
		<span class="rotate-in inline-block">
			<SunIcon class="h-[1.2rem] w-[1.2rem] transition-all" />
		</span>
	{:else}
		<span class="rotate-in inline-block">
			<MoonIcon class="h-[1.2rem] w-[1.2rem] transition-all" />
		</span>
	{/if}
</button>

<style>
	.rotate-in {
		animation: rotateIn 0.4s;
	}
	@keyframes rotateIn {
		from {
			transform: rotate(90deg);
			opacity: 0;
		}
		to {
			transform: rotate(0deg);
			opacity: 1;
		}
	}
</style>
