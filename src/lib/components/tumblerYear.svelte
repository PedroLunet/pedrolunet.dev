<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let year = new Date().getFullYear().toString();

	const digits = [...Array(10).keys()];

	function columnIndexes(length: number) {
		return [...Array(length).keys()];
	}

	let container: HTMLElement;

	onMount(() => {
		const columns = container.querySelectorAll('.digit-col');

		gsap.fromTo(
			columns,
			{ y: 0 },
			{
				y: (i) => {
					const digit = parseInt(year[i]);
					return `-${digit}em`;
				},
				duration: 2,
				ease: 'power4.out',
				stagger: 0.2
			}
		);
	});
</script>

<div
	bind:this={container}
	class="relative flex h-[1em] overflow-hidden leading-none"
	aria-label={year}
>
	{#each columnIndexes(year.length) as column (column)}
		<div
			class="digit-col flex flex-col text-text-secondary"
			data-column={column}
			style="transform: translateY(-{year[column]}em)"
		>
			{#each digits as digit (digit)}
				<span class="flex h-[1em] items-center justify-center">
					{digit}
				</span>
			{/each}
		</div>
	{/each}
</div>
