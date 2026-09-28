<!--
	Small accessible dialog used for form feedback (contact success, mural errors).

	- Escape and backdrop click both close it.
	- Focus moves to the close button on open and returns to `returnFocus` (or
	  whatever was focused before) on close.
	- Tab is trapped inside the panel.
	- `data-lenis-prevent` + `overscroll-contain` stop wheel/touch scrolling from
	  moving the page underneath while it is open.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { X } from '@lucide/svelte';

	let {
		open,
		title,
		description,
		tone = 'accent',
		returnFocus,
		onclose,
		children
	}: {
		open: boolean;
		title: string;
		description?: string;
		tone?: 'accent' | 'muted';
		/** Element to focus on close. Defaults to whatever was focused on open. */
		returnFocus?: HTMLElement | null;
		onclose: () => void;
		children?: Snippet;
	} = $props();

	const uid = $props.id();
	const titleId = `${uid}-title`;
	const descriptionId = `${uid}-description`;

	let panel = $state<HTMLDivElement>();
	let closeButton = $state<HTMLButtonElement>();

	// Keep showing the last content while the outro plays, even if the parent
	// clears the value that controls `open` (e.g. `error = ''`).
	let shownTitle = $state('');
	let shownDescription = $state<string | undefined>();
	$effect.pre(() => {
		if (open) {
			shownTitle = title;
			shownDescription = description;
		}
	});

	$effect(() => {
		if (!open) return;

		const previouslyFocused = document.activeElement as HTMLElement | null;
		closeButton?.focus({ preventScroll: true });

		return () => {
			// Restore focus once the dialog closes (or the component is destroyed).
			const target =
				returnFocus ?? (previouslyFocused !== document.body ? previouslyFocused : null);
			if (target?.isConnected) target.focus({ preventScroll: true });
		};
	});

	function handleWindowKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			event.preventDefault();
			onclose();
		}
	}

	function trapFocus(event: KeyboardEvent) {
		if (event.key !== 'Tab' || !panel) return;

		const focusable = panel.querySelectorAll<HTMLElement>(
			'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		);
		if (focusable.length === 0) return;

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto overscroll-contain p-4"
		data-lenis-prevent
	>
		<div
			class="absolute inset-0 bg-bg/80 backdrop-blur-sm"
			aria-hidden="true"
			onclick={onclose}
			transition:fade={{ duration: 200 }}
		></div>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={shownDescription ? descriptionId : undefined}
			tabindex="-1"
			onkeydown={trapFocus}
			class="relative z-10 w-full max-w-md border bg-bg p-12 text-center shadow-2xl outline-none
				{tone === 'accent' ? 'border-accent' : 'border-text/20'}"
			transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: backOut }}
		>
			<h3 id={titleId} class="mb-2 text-2xl font-bold tracking-widest text-text uppercase">
				{shownTitle}
			</h3>

			{#if shownDescription}
				<p id={descriptionId} class="mb-8 text-sm text-text-secondary">{shownDescription}</p>
			{/if}

			{@render children?.()}

			<button
				bind:this={closeButton}
				onclick={onclose}
				class="group mx-auto flex cursor-pointer items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase transition-colors outline-none hover:text-text focus-visible:text-text focus-visible:underline focus-visible:underline-offset-4"
			>
				<span>Close</span>
				<span
					class="relative transition-transform duration-300 group-hover:rotate-90 group-focus-visible:rotate-90"
				>
					<X size={14} />
				</span>
			</button>
		</div>
	</div>
{/if}
