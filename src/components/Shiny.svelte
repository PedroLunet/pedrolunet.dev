<script lang="ts">
	export let text: string;
	export let disabled: boolean = false;
	export let speed: number = 5;
	export let className: string = '';

	$: animationDuration = `${speed}s`;
</script>

<div
	class="shiny-text {disabled ? 'disabled' : ''} {className}"
	style="animation-duration: {animationDuration};"
>
	{text}
</div>

<style>
	.shiny-text {
		background: linear-gradient(110deg, #000 45%, #adacac 55%, #000 65%);
		background-size: 200% 100%;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		animation: shine 2s linear infinite;
	}

	.shiny-text.disabled {
		animation: none;
		background: #000;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@keyframes shine {
		to {
			background-position: 200% center;
		}
	}
</style>
