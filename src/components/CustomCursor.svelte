<script lang="ts">
	import { onMount } from 'svelte';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isVisible = $state(false);
	let isDark = $state(false);

	let { children } = $props();

	onMount(() => {
		// Check initial theme
		isDark = document.documentElement.classList.contains('dark');

		// Watch for theme changes
		const observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

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
			observer.disconnect();
			window.removeEventListener('mousemove', handleMouseMove);
			document.body.removeEventListener('mouseleave', handleMouseLeave);
			document.body.removeEventListener('mouseenter', handleMouseEnter);
		};
	});
</script>

<!-- Inverted theme layer with circular mask -->
<div
	class="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
	class:opacity-100={isVisible}
	class:opacity-0={!isVisible}
	class:dark={!isDark}
	style:--cursor-x="{cursorX}px"
	style:--cursor-y="{cursorY}px"
	style:clip-path="circle(50px at var(--cursor-x) var(--cursor-y))"
>
	{@render children()}
</div>
