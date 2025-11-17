<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isVisible = $state(false);

	onMount(() => {
		const handleMouseMove = (e: MouseEvent) => {
			cursorX = e.clientX;
			cursorY = e.clientY;
			if (!isVisible) isVisible = true;
		};

		const handleMouseLeave = () => {
			isVisible = false;
		};

		const handleMouseEnter = () => {
			isVisible = true;
		};

		window.addEventListener('mousemove', handleMouseMove);
		document.body.addEventListener('mouseleave', handleMouseLeave);
		document.body.addEventListener('mouseenter', handleMouseEnter);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			document.body.removeEventListener('mouseleave', handleMouseLeave);
			document.body.removeEventListener('mouseenter', handleMouseEnter);
		};
	});
</script>

<div
	class="pointer-events-none fixed inset-0 isolate z-[9999] transition-opacity duration-300"
	class:opacity-100={isVisible}
	class:opacity-0={!isVisible}
	style:--cursor-x="{cursorX}px"
	style:--cursor-y="{cursorY}px"
>
	<div
		class="absolute h-[75px] w-[75px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/10 will-change-transform"
		style:left="var(--cursor-x)"
		style:top="var(--cursor-y)"
		style:backdrop-filter="invert(1) hue-rotate(180deg)"
		style:-webkit-backdrop-filter="invert(1) hue-rotate(180deg)"
	></div>
</div>
