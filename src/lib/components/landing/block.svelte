<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let {
		onclick,
		isOpen = false,
		controls
	}: {
		onclick: () => void;
		isOpen?: boolean;
		/** id of the menu this button opens, for `aria-controls`. */
		controls?: string;
	} = $props();

	let label = $state('menu');

	const DELAY_MOBILE = 450;
	const DELAY_DESKTOP = 600;

	$effect(() => {
		const targetLabel = isOpen ? 'close' : 'menu';

		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		const currentDelay = isDesktop ? DELAY_DESKTOP : DELAY_MOBILE;

		const timer = setTimeout(() => {
			label = targetLabel;
		}, currentDelay);

		return () => clearTimeout(timer);
	});
</script>

<!--
	Focus ring: off-white outline offset from the orange block so it reads
	against both the block and the dark background. Only shown for keyboard
	focus (`focus-visible`).
-->
<button
	{onclick}
	class="js-block group relative flex h-12 w-32 cursor-pointer border-none p-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text focus-visible:outline-solid md:h-24 md:w-48 2xl:h-32 2xl:w-64"
	aria-label={isOpen ? 'Close menu' : 'Open menu'}
	aria-expanded={isOpen}
	aria-controls={controls}
>
	<div
		class="relative flex h-full w-full items-end justify-center overflow-hidden bg-accent transition-transform duration-200 ease-out md:active:scale-90"
	>
		<div
			class="absolute inset-0 z-0 origin-left bg-accent-light transition-transform duration-300 ease-out {isOpen
				? 'scale-x-100'
				: 'scale-x-0'} md:scale-x-0 md:group-hover:scale-x-100 md:group-focus-visible:scale-x-100"
		></div>

		<div class="relative z-10 flex h-5 w-full justify-center leading-none lg:h-7 2xl:h-10">
			<!--
				Crossfade + slight zoom between "menu" and "close". This used to rely on
				`animate-in fade-in zoom-in-95` (tw-animate-css), which isn't installed,
				so the swap was instant.
			-->
			{#key label}
				<span
					in:scale={{ start: 0.95, duration: 300, easing: cubicOut }}
					out:fade={{ duration: 150 }}
					class="absolute bottom-0 flex items-end justify-center text-lg font-medium tracking-widest text-bg lowercase lg:text-3xl 2xl:text-5xl"
					aria-hidden="true"
				>
					{label}
				</span>
			{/key}
		</div>
	</div>
</button>
