<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { lightTheme, darkTheme } from '$lib/theme';

	let coords = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.8
		}
	);
	let isVisible = $state(false);
	let isDark = $state(false);

	let { children } = $props();

	const oppositeTheme = $derived(isDark ? lightTheme : darkTheme);

	const themeStyles = $derived(
		Object.entries(oppositeTheme)
			.map(([key, value]) => `${key}: ${value}`)
			.join('; ')
	);

	onMount(() => {
		isDark = document.documentElement.classList.contains('dark');

		const observer = new MutationObserver(() => {
			isDark = document.documentElement.classList.contains('dark');
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class']
		});

		const handleMouseMove = (e: MouseEvent) => {
			coords.set({ x: e.clientX, y: e.clientY });
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

<div
	class="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200"
	class:opacity-100={isVisible}
	class:opacity-0={!isVisible}
	style:--cursor-x="{$coords.x}px"
	style:--cursor-y="{$coords.y}px"
	style:clip-path="circle(40px at var(--cursor-x) var(--cursor-y))"
	style={themeStyles}
>
	<div class="h-full w-full bg-background text-foreground">
		{@render children()}
	</div>
</div>
