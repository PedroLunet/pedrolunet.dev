<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';

	export let year = new Date().getFullYear().toString();

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
	{#each year as digit}
		<div class="digit-col flex flex-col text-text-secondary">
			{#each Array(10) as _, i}
				<span class="flex h-[1em] items-center justify-center">
					{i}
				</span>
			{/each}
		</div>
	{/each}
</div>
