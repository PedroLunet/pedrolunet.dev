<script>
	import TumblerYear from './tumblerYear.svelte';
</script>

<header
	class="flex h-(--header-height-mobile) flex-row items-center justify-between px-6 text-base font-semibold tracking-tight md:h-(--header-height-tablet) lg:h-(--header-height-desktop) lg:px-9 lg:text-xl"
>
	<a href="/"> pedro lunet </a>
	<div class="flex flex-row items-center">
		<span>portfolio </span><TumblerYear />
	</div>
</header>
