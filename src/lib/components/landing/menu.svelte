<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let { isOpen, id }: { isOpen: boolean; id?: string } = $props();

	const EMAIL = 'hello@pedrolunet.dev';

	const links = [
		{ href: resolve('/work'), label: 'Selected Works' },
		{ href: resolve('/about'), label: 'About Me' },
		{ href: resolve('/contact'), label: 'Contact' },
		{ href: resolve('/mural'), label: 'Mural' }
	];

	// --- Email: copy on desktop, open mail app on touch --------------------
	// The address is a real `mailto:` link, so it works without JS, can be
	// right-clicked, and opens the mail app on phones. On devices with a fine
	// pointer + hover we intercept the click and copy it instead, with feedback.
	let copied = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	async function handleEmailClick(event: MouseEvent) {
		if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

		event.preventDefault();
		try {
			await navigator.clipboard.writeText(EMAIL);
			copied = true;
			clearTimeout(copiedTimer);
			copiedTimer = setTimeout(() => (copied = false), 1800);
		} catch {
			window.location.href = `mailto:${EMAIL}`;
		}
	}

	$effect(() => () => clearTimeout(copiedTimer));
</script>

<nav
	{id}
	aria-label="Main"
	class="flex flex-col items-end gap-2 pr-6 text-right md:gap-6 lg:pr-9 2xl:gap-8 2xl:pr-24 {isOpen
		? 'pointer-events-auto'
		: 'pointer-events-none'}"
>
	{#each links as link (link.href)}
		<!--
			Keyboard focus and touch presses get the same skew/colour as hover.
			Tailwind v4 only applies `hover:` on hover-capable devices, so taps
			previously had no feedback at all.
		-->
		<a
			href={link.href}
			aria-current={page.url.pathname === link.href ? 'page' : undefined}
			class="menu-item group invisible block text-4xl font-thin tracking-tight text-text outline-none md:text-7xl 2xl:text-[clamp(3rem,4vw,5rem)]"
		>
			<span
				class="block origin-right transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-skew-x-12 group-hover:text-accent group-focus-visible:-skew-x-12 group-focus-visible:text-accent group-active:-skew-x-12 group-active:text-accent"
			>
				{link.label}
			</span>
		</a>
	{/each}

	<div class="menu-item invisible my-4 mr-1 h-px w-24 bg-text-secondary 2xl:my-8 2xl:w-40"></div>

	<p class="menu-item invisible pr-1 text-lg text-text-secondary 2xl:text-2xl">
		<a
			href="mailto:{EMAIL}"
			onclick={handleEmailClick}
			class="group relative inline-grid overflow-hidden text-accent outline-none"
		>
			<!-- Both states share one grid cell, so the width never jumps. -->
			<span
				class="col-start-1 row-start-1 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] {copied
					? '-translate-y-full'
					: 'translate-y-0'}"
			>
				{EMAIL}
			</span>
			<span
				class="col-start-1 row-start-1 text-text transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] {copied
					? 'translate-y-0'
					: 'translate-y-full'}"
				aria-hidden="true"
			>
				copied to clipboard
			</span>
			<!-- Underline sweeps in from the right on hover / keyboard focus. -->
			<span
				class="pointer-events-none absolute right-0 bottom-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
				aria-hidden="true"
			></span>
		</a>
		<span class="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
	</p>
</nav>
