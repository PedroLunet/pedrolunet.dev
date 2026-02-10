<script lang="ts">
	import { ArrowLeft, ArrowRight } from '@lucide/svelte';

	let { images, title } = $props();

	let scroller: HTMLDivElement;
	let currentIndex = $state(0);

	let loaded = $derived<boolean[]>(new Array(images.length).fill(false));

	let cursorX = $state(0);
	let cursorY = $state(0);
	let showCursor = $state(false);
	let cursorSide: 'left' | 'right' | null = $state(null);

	function handleScroll() {
		if (!scroller) return;
		const scrollLeft = scroller.scrollLeft;
		const width = scroller.clientWidth;
		currentIndex = Math.round(scrollLeft / width);
	}

	function scrollToSlide(index: number) {
		if (!scroller) return;
		const width = scroller.clientWidth;
		if (index < 0 || index >= images.length) return;

		scroller.scrollTo({
			left: index * width,
			behavior: 'smooth'
		});
	}

	function handleWheel(e: WheelEvent) {
		const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
		if (isHorizontal) {
			e.stopPropagation();
		}
	}

	function handleMouseMove(e: MouseEvent) {
		showCursor = true;
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		cursorX = e.clientX - rect.left;
		cursorY = e.clientY - rect.top;
		cursorSide = cursorX > rect.width / 2 ? 'right' : 'left';
	}

	function handleMouseLeave() {
		showCursor = false;
		cursorSide = null;
	}

	function handleClick() {
		if (cursorSide === 'right') scrollToSlide(currentIndex + 1);
		if (cursorSide === 'left') scrollToSlide(currentIndex - 1);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight') scrollToSlide(currentIndex + 1);
		if (e.key === 'ArrowLeft') scrollToSlide(currentIndex - 1);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="group border-text-primary/10 relative aspect-16/10 w-full cursor-none overflow-hidden border bg-neutral-900 shadow-2xl shadow-black/20 select-none"
	role="button"
	tabindex="0"
	aria-label="Project Gallery"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	onclick={handleClick}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') handleClick();
	}}
	onwheel={handleWheel}
>
	<div
		bind:this={scroller}
		onscroll={handleScroll}
		class="flex h-full w-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
		style="scrollbar-width: none; -ms-overflow-style: none;"
	>
		<style>
			div::-webkit-scrollbar {
				display: none;
			}

			@keyframes shimmer {
				0% {
					background-position: 200% 0;
				}
				100% {
					background-position: -200% 0;
				}
			}
			.animate-shimmer {
				background: linear-gradient(90deg, #171717 25%, #262626 50%, #171717 75%);
				background-size: 200% 100%;
				animation: shimmer 2s infinite linear;
			}
		</style>

		{#each images as src, i}
			<div class="relative h-full w-full shrink-0 snap-center bg-neutral-900">
				{#if !loaded[i]}
					<div class="animate-shimmer absolute inset-0 z-10 h-full w-full"></div>
				{/if}

				<img
					{src}
					alt="{title} - Fig {i + 1}"
					class="pointer-events-none h-full w-full object-cover transition-opacity duration-700 ease-in-out"
					class:opacity-0={!loaded[i]}
					class:opacity-100={loaded[i]}
					draggable="false"
					onload={() => (loaded[i] = true)}
				/>
			</div>
		{/each}
	</div>

	{#if showCursor && cursorSide}
		<div
			class="pointer-events-none absolute z-50 hidden text-white mix-blend-difference drop-shadow-md transition-transform duration-75 ease-out md:block"
			style="
        left: {cursorX}px; 
        top: {cursorY}px; 
        transform: translate(-50%, -50%);
      "
		>
			{#if cursorSide === 'left'}
				<ArrowLeft size={32} strokeWidth={2} />
			{:else}
				<ArrowRight size={32} strokeWidth={2} />
			{/if}
		</div>
	{/if}

	<div
		class="pointer-events-none absolute inset-0 m-6 border border-white/10 transition-colors duration-300 group-hover:border-white/20"
	></div>

	<div
		class="pointer-events-none absolute right-6 bottom-6 flex gap-2 font-mono text-[9px] tracking-widest text-white/50 uppercase"
	>
		<span class="text-white">Fig. {String(currentIndex + 1).padStart(2, '0')}</span>
		<span class="opacity-50">/</span>
		<span class="opacity-50">{String(images.length).padStart(2, '0')}</span>
	</div>

	<div class="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full bg-white/5">
		<div
			class="h-full bg-accent transition-all duration-300 ease-out"
			style="width: {100 / images.length}%; transform: translateX({currentIndex * 100}%);"
		></div>
	</div>
</div>
