<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { ArrowRight, LoaderCircle, Copy, Check } from '@lucide/svelte';
	import { fly } from 'svelte/transition';
	import gsap from 'gsap';

	import SEO from '$lib/components/seo.svelte';
	import Modal from '$lib/components/modal.svelte';

	const EMAIL = 'hello@pedrolunet.dev';

	let { form } = $props();

	let loading = $state(false);
	let hours = $state('');
	let minutes = $state('');
	let showSuccessPopup = $state(false);

	// Only flag the email once the visitor leaves a non-empty invalid value, and
	// clear it as soon as they start fixing it.
	let emailInvalid = $state(false);
	function validateEmail(event: FocusEvent & { currentTarget: HTMLInputElement }) {
		const input = event.currentTarget;
		emailInvalid = input.value !== '' && !input.validity.valid;
	}

	let emailCopied = $state(false);
	let isHovered = $state(false);
	let copiedTimer: ReturnType<typeof setTimeout> | undefined;

	async function handleEmailClick() {
		try {
			await navigator.clipboard.writeText(EMAIL);
			emailCopied = true;
			clearTimeout(copiedTimer);
			copiedTimer = setTimeout(() => (emailCopied = false), 2000);
		} catch {
			// Clipboard can be unavailable (permissions, insecure context). Fall back
			// to opening the mail client so the click still does something useful.
			window.location.href = `mailto:${EMAIL}`;
		}
	}

	function updateClock() {
		const [h, m] = new Date()
			.toLocaleTimeString('en-GB', {
				timeZone: 'Europe/Lisbon',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			})
			.split(':');
		hours = h;
		minutes = m;
	}

	onMount(() => {
		// Render immediately instead of showing "--:--" for the first second.
		updateClock();
		const interval = setInterval(updateClock, 1000);

		const ctx = gsap.context(() => {
			gsap.to('.reveal', {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out'
			});
		});

		return () => {
			clearInterval(interval);
			clearTimeout(copiedTimer);
			ctx.revert();
		};
	});
</script>

<SEO
	title="Contact - Pedro Lunet"
	description="Get in touch with Pedro Lunet, a Design Engineer based in Porto, Portugal."
/>

<Modal
	open={showSuccessPopup}
	title="Message Sent"
	description="Thank you. I'll get back to you shortly."
	onclose={() => (showSuccessPopup = false)}
/>

<div class="grid grid-cols-1 gap-16 lg:grid-cols-12 2xl:gap-32">
	<div class="col-span-1 lg:col-span-7">
		<div class="reveal translate-y-8 opacity-0">
			<h1
				class="text-[clamp(3.5rem,14cqi,10rem)] leading-[0.8] font-bold tracking-tighter text-text uppercase 2xl:text-[clamp(4rem,8cqi,9rem)]"
			>
				Let's<br />Talk.
			</h1>
		</div>
	</div>

	<div class="col-span-1 flex flex-col gap-12 lg:col-span-5 lg:pt-4 2xl:gap-20 2xl:pt-8">
		<form
			method="POST"
			use:enhance={({ cancel }) => {
				// Guard double submits here instead of `disabled`, which would drop
				// keyboard focus from the button mid-request.
				if (loading) return cancel();
				loading = true;
				return async ({ result, update }) => {
					loading = false;
					if (result.type === 'success') {
						await update({ reset: true });
						showSuccessPopup = true;
					} else {
						await update();
					}
				};
			}}
			class="reveal flex translate-y-8 flex-col gap-8 opacity-0 2xl:gap-12"
		>
			<!--
				Floating labels
				- Resting (empty, unfocused): `peer-placeholder-shown:*`
				- Floated (has a value OR is focused): the base classes + `peer-focus:*`
				Previously the floated state was keyed off `peer-valid`, so an
				incomplete email (e.g. "pedro.lunet") dropped the label back on top of
				the typed text. Validity now only affects colour + an inline hint, via
				`aria-invalid`, which is set on blur (see `validateEmail`).
			-->
			<div class="group relative">
				<input
					type="text"
					name="name"
					id="name"
					required
					autocomplete="name"
					placeholder=" "
					class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:pb-2 2xl:text-2xl"
				/>
				<label
					for="name"
					class="pointer-events-none absolute -top-4 left-0 text-[10px] font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
          2xl:peer-placeholder-shown:text-xl"
				>
					Name
				</label>
			</div>

			<div class="group relative">
				<input
					type="email"
					name="email"
					id="email"
					required
					autocomplete="email"
					placeholder=" "
					aria-invalid={emailInvalid}
					aria-describedby={emailInvalid ? 'email-hint' : undefined}
					onblur={validateEmail}
					oninput={() => (emailInvalid = false)}
					class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 aria-invalid:border-red-400/70 2xl:pb-2 2xl:text-2xl"
				/>
				<label
					for="email"
					class="pointer-events-none absolute -top-4 left-0 text-[10px] font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-focus:-top-4
          peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent peer-aria-invalid:text-red-400
          2xl:peer-placeholder-shown:text-xl"
				>
					Email
				</label>
				<!--
					Inline hint, shown only once the visitor leaves a non-empty invalid
					email. Absolutely positioned so it doesn't push the form down.
				-->
				{#if emailInvalid}
					<p
						id="email-hint"
						transition:fly={{ y: -4, duration: 200 }}
						class="absolute top-full left-0 mt-2 text-[10px] font-bold tracking-widest text-red-400 uppercase 2xl:text-xs"
					>
						That email looks incomplete
					</p>
				{/if}
			</div>

			<div class="group relative mt-4">
				<textarea
					name="message"
					id="message"
					required
					placeholder=" "
					data-lenis-prevent
					onwheel={(e) => e.stopPropagation()}
					class="
            peer relative h-40 w-full resize-none overflow-y-auto overscroll-contain rounded-none border border-text/20 bg-transparent p-4 text-lg font-light text-text
            placeholder-transparent
            transition-colors
            outline-none
            focus:border-accent focus:ring-0
            2xl:h-64
            2xl:p-6
            2xl:text-2xl
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-thumb]:bg-text/20 hover:[&::-webkit-scrollbar-thumb]:bg-accent [&::-webkit-scrollbar-track]:bg-transparent
          "
				></textarea>

				<label
					for="message"
					class="pointer-events-none absolute -top-2.5 left-3 bg-bg px-1 text-[10px] font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:bg-transparent peer-placeholder-shown:px-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-bg peer-focus:px-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
          2xl:peer-placeholder-shown:top-6 2xl:peer-placeholder-shown:left-6 2xl:peer-placeholder-shown:text-xl"
				>
					Message
				</label>
			</div>

			{#if form?.error}
				<!-- Previously used tw-animate classes that aren't installed, so it never animated. -->
				<div
					role="alert"
					in:fly={{ y: -4, duration: 250 }}
					class="text-xs font-bold tracking-widest text-red-500 uppercase"
				>
					{form.error}
				</div>
			{/if}

			<div class="flex items-center justify-between pt-4 2xl:pt-8">
				<!-- Touch / small screens: no hover to reveal the address, so link straight to mail. -->
				<a
					href="mailto:{EMAIL}"
					class="py-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-colors hover:text-accent active:text-accent md:hidden"
				>
					Email me instead
				</a>

				<button
					type="button"
					onclick={handleEmailClick}
					onmouseenter={() => (isHovered = true)}
					onmouseleave={() => {
						isHovered = false;
						emailCopied = false;
					}}
					onfocus={() => (isHovered = true)}
					onblur={() => {
						isHovered = false;
						emailCopied = false;
					}}
					aria-label="Copy email address {EMAIL}"
					class="group hidden cursor-pointer items-center overflow-hidden text-left md:grid"
				>
					<span
						class="col-start-1 row-start-1 block py-2 text-xs font-bold tracking-widest text-text-secondary uppercase transition-transform duration-300 2xl:text-sm"
						class:translate-y-[-100%]={isHovered}
					>
						Don't like forms?
					</span>

					<div
						class="col-start-1 row-start-1 flex items-center gap-2 py-2 transition-transform duration-300"
						class:translate-y-full={!isHovered}
						class:translate-y-0={isHovered}
					>
						<span
							class="text-xs font-bold tracking-widest uppercase transition-colors 2xl:text-sm"
							class:text-emerald-500={emailCopied}
							class:text-accent={!emailCopied}
						>
							{emailCopied ? 'Copied!' : EMAIL}
						</span>

						{#if emailCopied}
							<Check size={12} class="text-emerald-500 2xl:h-4 2xl:w-4" />
						{:else}
							<Copy size={12} class="text-accent 2xl:h-4 2xl:w-4" />
						{/if}
					</div>
				</button>
				<span class="sr-only" aria-live="polite">
					{emailCopied ? 'Email address copied to clipboard' : ''}
				</span>

				<button
					type="submit"
					aria-disabled={loading}
					class="group flex cursor-pointer items-center gap-4 text-xs font-bold tracking-widest text-text uppercase transition-colors hover:text-accent aria-disabled:cursor-wait aria-disabled:opacity-50 2xl:text-sm"
				>
					<!--
						Both labels share one grid cell so the button keeps the width of the
						longer one and doesn't shift when switching to "Sending...".
					-->
					<span class="grid text-right">
						<span class="col-start-1 row-start-1" class:invisible={loading}>Send Message</span>
						<span class="col-start-1 row-start-1" class:invisible={!loading} aria-hidden={!loading}>
							Sending...
						</span>
					</span>
					<div
						class="flex h-8 w-8 items-center justify-center border border-text/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-bg 2xl:h-12 2xl:w-12"
					>
						{#if loading}
							<LoaderCircle size={14} class="animate-spin 2xl:h-6 2xl:w-6" />
						{:else}
							<ArrowRight
								size={14}
								class="transition-transform duration-300 group-hover:translate-x-0.5 2xl:h-6 2xl:w-6"
							/>
						{/if}
					</div>
				</button>
			</div>
		</form>

		<div class="reveal mt-12 flex translate-y-8 flex-col gap-8 opacity-0 lg:mt-auto 2xl:gap-12">
			<div>
				<h3
					class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50 2xl:mb-6 2xl:text-xs"
				>
					Socials
				</h3>
				<div class="flex gap-6 2xl:gap-10">
					<a
						href="https://linkedin.com/in/PedroLunet"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-bold uppercase transition-colors hover:text-accent 2xl:text-sm"
						>LinkedIn</a
					>
					<a
						href="https://github.com/PedroLunet"
						target="_blank"
						rel="noopener noreferrer"
						class="text-xs font-bold uppercase transition-colors hover:text-accent 2xl:text-sm"
						>GitHub</a
					>
				</div>
			</div>

			<div class="flex items-end justify-between border-t border-text/10 pt-6 2xl:pt-8">
				<div class="flex flex-col gap-1">
					<span
						class="text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50 2xl:text-xs"
						>Location</span
					>
					<span class="text-xs font-bold text-text uppercase 2xl:text-sm">Porto, Portugal</span>
				</div>
				<div class="flex flex-col items-end gap-1">
					<span
						class="text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50 2xl:text-xs"
						>Local Time</span
					>
					<!-- Tabular numerals keep the width stable; the colon ticks like a clock. -->
					<time class="text-xs text-text tabular-nums 2xl:text-sm">
						{#if hours}
							<span aria-hidden="true">{hours}<span class="clock-colon">:</span>{minutes}</span>
							<span class="sr-only">{hours}:{minutes}</span>
						{:else}
							--:--
						{/if}
					</time>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.clock-colon {
		animation: clock-tick 1s steps(1, end) infinite;
	}

	@keyframes clock-tick {
		50% {
			opacity: 0.25;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.clock-colon {
			animation: none;
		}
	}
</style>
