<script lang="ts">
	import { onMount } from 'svelte';
	import { lightTheme, darkTheme } from '$lib/theme';

	let cursorX = $state(0);
	let cursorY = $state(0);
	let isVisible = $state(false);
	let isDark = $state(false);

	let { children } = $props();

	// Get opposite theme colors - if page is dark, show light theme and vice versa
	const oppositeTheme = $derived(isDark ? lightTheme : darkTheme);

	// Convert to inline style string
	const themeStyles = $derived(
		Object.entries(oppositeTheme)
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ')
	);

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

<!-- Inverted theme layer with circular mask - the "hole" showing opposite theme -->
<div
	class="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200"
	class:opacity-100={isVisible}
	class:opacity-0={!isVisible}
	style:--cursor-x="{cursorX}px"
	style:--cursor-y="{cursorY}px"
	style:clip-path="circle(50px at var(--cursor-x) var(--cursor-y))"
	style={themeStyles}
>
	<div class="h-full w-full bg-background text-foreground">
		{@render children()}
	</div>
</div>
