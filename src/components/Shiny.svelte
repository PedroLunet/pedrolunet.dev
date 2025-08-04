<script lang="ts">
	export let text: string;
	export let disabled: boolean = false;
	export let speed: number = 5;
	export let className: string = '';

	$: animationDuration = `${speed}s`;
</script>

<div
	class="bg-gradient-to-r from-muted-foreground via-muted to-muted-foreground bg-[length:200%_100%] bg-clip-text text-transparent {disabled
		? ''
		: 'animate-shine'} {className}"
	style="animation-duration: {animationDuration};"
>
	{text}
</div>

<style>
	@keyframes shine {
		to {
			background-position: 200% center;
		}
	}

	.animate-shine {
		animation: shine 2s linear infinite;
	}
</style>
