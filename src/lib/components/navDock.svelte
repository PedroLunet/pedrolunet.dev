<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { Mail, Plus } from '@lucide/svelte';

	import CardTexture from './landing/cardTexture.svelte';

	const EMAIL = 'hello@pedrolunet.dev';

	const links = [
		{
			href: resolve('/work'),
			label: 'Selected work',
			meta: 'Projects & experiments',
			variant: 'work' as const
		},
		{
			href: resolve('/about'),
			label: 'About me',
			meta: 'Story & experience',
			variant: 'about' as const
		},
		{
			href: resolve('/contact'),
			label: 'Contact',
			meta: 'Start a conversation',
			variant: 'contact' as const
		},
		{
			href: resolve('/mural'),
			label: 'Mural',
			meta: 'Notes & moments',
			variant: 'mural' as const
		}
	];

	let open = $state(false);
	let root = $state<HTMLDivElement>();
	let trigger = $state<HTMLButtonElement>();
	let panel = $state<HTMLElement>();

	function sectionFor(pathname: string) {
		if (pathname.startsWith('/work')) return 'work';
		if (pathname.startsWith('/about')) return 'about';
		if (pathname.startsWith('/contact')) return 'contact';
		if (pathname.startsWith('/mural')) return 'mural';
		return 'home';
	}

	function isActive(href: string) {
		const pathname = page.url.pathname;
		return pathname === href || pathname.startsWith(`${href}/`);
	}

	let currentSection = $derived(sectionFor(page.url.pathname));

	afterNavigate(() => {
		open = false;
	});

	function close(restoreFocus = false) {
		open = false;
		if (restoreFocus) trigger?.focus({ preventScroll: true });
	}

	function toggle() {
		if (open) {
			close();
			return;
		}

		open = true;
		requestAnimationFrame(() => {
			if (panel) panel.scrollTop = 0;
		});
	}

	function handlePointerDown(event: PointerEvent) {
		if (!open || !root) return;
		if (!root.contains(event.target as Node)) close();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !open) return;
		event.preventDefault();
		close(true);
	}

	function handleFocusOut(event: FocusEvent) {
		if (!open || !root) return;

		const next = event.relatedTarget as Node | null;
		if (next && !root.contains(next)) open = false;
	}
</script>

<svelte:window onkeydown={handleKeydown} onpointerdown={handlePointerDown} />

<div bind:this={root} class="nav-dock" class:open onfocusout={handleFocusOut}>
	<button
		bind:this={trigger}
		type="button"
		onclick={toggle}
		aria-label={open ? 'Close menu' : 'Open menu'}
		aria-expanded={open}
		aria-controls="site-nav"
		class="flex h-[var(--dock-pill-h)] w-full shrink-0 cursor-pointer items-center justify-between pr-1.5 pl-2.5 text-panel-fg transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-panel-accent focus-visible:outline-solid active:bg-white/[0.06] sm:pl-4 2xl:pr-2 2xl:pl-5"
	>
		<span class="flex min-w-0 items-center gap-2">
			<img src="/favicon.svg" alt="" aria-hidden="true" class="size-3.5 shrink-0 sm:size-4" />
			<span
				class="hidden truncate text-[13px] font-semibold tracking-tight text-panel-fg/75 sm:block lg:text-sm"
			>
				{currentSection}
			</span>
		</span>

		<span class="flex shrink-0 items-center gap-1.5">
			<span
				class="rounded-md bg-panel-fg px-1.5 py-1 text-[11px] leading-none font-medium text-panel sm:px-2.5 sm:text-[12px] lg:text-[13px]"
			>
				{open ? 'close' : 'menu'}
			</span>
			<span
				class="grid size-6 place-items-center text-panel-fg/60 sm:size-7 lg:size-8 2xl:size-9"
				aria-hidden="true"
			>
				<Plus
					size={13}
					class="transition-transform duration-150 ease-out motion-reduce:transition-none {open
						? 'rotate-45'
						: ''} sm:scale-110 2xl:scale-125"
				/>
			</span>
		</span>
	</button>

	<nav
		bind:this={panel}
		id="site-nav"
		aria-label="Site"
		aria-hidden={!open}
		inert={!open}
		data-lenis-prevent
		class="nav-panel relative left-1/2 w-[var(--dock-panel-w)] -translate-x-1/2 overflow-y-auto overscroll-contain border-t border-white/10"
	>
		<ul class="grid grid-cols-2 gap-1 p-1">
			{#each links as link (link.href)}
				{@const active = isActive(link.href)}
				<li>
					<a
						href={link.href}
						aria-current={active ? 'page' : undefined}
						onclick={() => (open = false)}
						class="relative isolate flex h-full min-h-36 flex-col justify-end overflow-hidden rounded-md p-3 transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-panel-accent sm:min-h-40 sm:p-3.5 {active
							? 'bg-white/[0.06]'
							: 'bg-white/[0.025]'}"
					>
						<CardTexture variant={link.variant} accent={active} active={open} />

						<span class="relative z-10 block">
							<span class="block text-[15px] font-medium tracking-tight text-panel-fg lg:text-base">
								{link.label}
							</span>
							<span class="mt-1 block text-[11px] leading-snug text-panel-fg/55 sm:text-xs">
								{link.meta}
							</span>
						</span>
					</a>
				</li>
			{/each}
		</ul>

		<div
			class="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-3 py-2.5"
		>
			<div class="flex items-center gap-4 text-[11px] font-medium text-panel-fg/60 sm:text-xs">
				<a
					href="https://github.com/PedroLunet"
					target="_blank"
					rel="noopener noreferrer"
					class="py-1.5 transition-colors duration-150 outline-none hover:text-panel-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-panel-accent"
				>
					GitHub
				</a>
				<a
					href="https://linkedin.com/in/PedroLunet"
					target="_blank"
					rel="noopener noreferrer"
					class="py-1.5 transition-colors duration-150 outline-none hover:text-panel-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-panel-accent"
				>
					LinkedIn
				</a>
			</div>

			<a
				href="mailto:{EMAIL}"
				class="flex items-center gap-1.5 rounded-md bg-white/[0.07] px-2.5 py-1.5 text-[11px] font-medium text-panel-fg/80 transition-colors duration-150 outline-none hover:bg-white/[0.12] hover:text-panel-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-panel-accent sm:text-xs"
			>
				<Mail size={12} class="text-panel-accent" />
				{EMAIL}
			</a>
		</div>
	</nav>
</div>

<style>
	.nav-dock {
		--dock-panel-w: calc(100vw - 3rem);
		--dock-pill-w: 6.75rem;
		--dock-pill-h: 2.25rem;
		--dock-pill-half: 1.125rem;

		position: absolute;
		top: calc(50% - var(--dock-pill-half));
		left: 50%;
		z-index: 60;
		width: var(--dock-pill-w);
		overflow: hidden;
		pointer-events: none;
		transform: translateX(-50%);
		border-radius: 8px;
		background: var(--color-panel);
		color: var(--color-panel-fg);
		filter: drop-shadow(0 14px 30px rgb(0 0 0 / 0.35));
		clip-path: inset(0 0 calc(100% - var(--dock-pill-h)) 0 round 8px);
		transition:
			width 130ms cubic-bezier(0.32, 0.72, 0, 1),
			clip-path 150ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.nav-dock.open {
		width: var(--dock-panel-w);
		clip-path: inset(0 0 0 0 round 8px);
		transition:
			width 180ms cubic-bezier(0.32, 0.72, 0, 1),
			clip-path 200ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	/* Single stroke that always hugs the visible shape, pill and panel alike. */
	.nav-dock::after {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: var(--dock-pill-h);
		pointer-events: none;
		border-radius: 8px;
		box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1);
		transition: height 200ms cubic-bezier(0.32, 0.72, 0, 1);
	}

	.nav-dock.open::after {
		height: 100%;
	}

	.nav-dock > button,
	.nav-dock.open .nav-panel {
		pointer-events: auto;
	}

	.nav-panel {
		max-height: calc(100vh - var(--dock-pill-h) - 2rem);
		max-height: calc(100dvh - var(--dock-pill-h) - 2rem);
		scrollbar-color: rgb(255 255 255 / 0.2) transparent;
		scrollbar-width: thin;
	}

	.nav-panel::-webkit-scrollbar {
		width: 6px;
	}

	.nav-panel::-webkit-scrollbar-track {
		background: transparent;
	}

	.nav-panel::-webkit-scrollbar-thumb {
		border-radius: 999px;
		background: rgb(255 255 255 / 0.18);
	}

	@media (min-width: 640px) {
		.nav-dock {
			--dock-panel-w: 21rem;
			--dock-pill-w: 12rem;
			--dock-pill-h: 2.5rem;
			--dock-pill-half: 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.nav-dock {
			--dock-panel-w: 22rem;
			--dock-pill-w: 12.25rem;
			--dock-pill-h: 2.75rem;
			--dock-pill-half: 1.375rem;
		}
	}

	@media (min-width: 1536px) {
		.nav-dock {
			--dock-panel-w: 24rem;
			--dock-pill-w: 13rem;
			--dock-pill-h: 3rem;
			--dock-pill-half: 1.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-dock,
		.nav-dock.open,
		.nav-dock::after,
		.nav-dock.open::after {
			transition: none;
		}
	}
</style>
