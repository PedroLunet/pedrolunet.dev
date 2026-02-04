<script>
	import TumblerYear from './tumblerYear.svelte';
</script>

<header
	class="flex h-(--header-height-mobile) flex-row items-center justify-between px-6 text-base font-semibold tracking-tight md:h-(--header-height-desktop) md:px-9 md:text-xl"
>
	<a href="/"> pedro lunet </a>
	<div class="flex flex-row items-center">
		<span>portfolio </span><TumblerYear />
	</div>
</header>
