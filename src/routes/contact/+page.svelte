<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { ArrowRight, LoaderCircle, X, Copy, Check } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import gsap from 'gsap';

	let { form } = $props();

	let loading = $state(false);
	let time = $state('');
	let showSuccessPopup = $state(false);

	let emailCopied = $state(false);
	let isHovered = $state(false);

	function handleEmailClick() {
		navigator.clipboard.writeText('hello@pedrolunet.dev');
		emailCopied = true;
		setTimeout(() => (emailCopied = false), 2000);
	}

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date().toLocaleTimeString('en-US', {
				timeZone: 'Europe/Lisbon',
				hour: '2-digit',
				minute: '2-digit',
				hour12: false
			});
		}, 1000);

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
			ctx.revert();
		};
	});
</script>

{#if showSuccessPopup}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="absolute inset-0 bg-bg/80 backdrop-blur-sm"
			role="button"
			tabindex="-1"
			onclick={() => (showSuccessPopup = false)}
			onkeydown={(e) => e.key === 'Escape' && (showSuccessPopup = false)}
			transition:fade={{ duration: 200 }}
		></div>

		<div
			class="relative z-10 w-full max-w-md border border-accent bg-bg p-12 text-center shadow-2xl"
			transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: backOut }}
		>
			<h3 class="mb-2 text-2xl font-bold tracking-widest text-text uppercase">Message Sent</h3>
			<p class="mb-8 text-sm text-text-secondary">Thank you. I'll get back to you shortly.</p>

			<button
				onclick={() => (showSuccessPopup = false)}
				class="group mx-auto flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase transition-colors hover:text-text"
			>
				<span>Close</span>
				<div class="relative transition-transform duration-300 group-hover:rotate-90">
					<X size={14} />
				</div>
			</button>
		</div>
	</div>
{/if}

<div class="grid grid-cols-1 gap-16 lg:grid-cols-12 2xl:gap-32">
	<div class="col-span-1 lg:col-span-7">
		<div class="reveal translate-y-8 opacity-0">
			<h1
				class="text-[clamp(3.5rem,14cqi,10rem)] leading-[0.8] font-bold tracking-tighter text-text uppercase 2xl:text-[clamp(5rem,14cqi,14rem)]"
			>
				Let's<br />Talk.
			</h1>
		</div>
	</div>

	<div class="col-span-1 flex flex-col gap-12 lg:col-span-5 lg:pt-4 2xl:gap-20 2xl:pt-8">
		<form
			method="POST"
			use:enhance={() => {
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
			<div class="group relative">
				<input
					type="text"
					name="name"
					id="name"
					required
					placeholder=" "
					class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:pb-2 2xl:text-2xl"
				/>
				<label
					for="name"
					class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-valid:-top-4 peer-valid:text-[10px] peer-valid:font-bold
          peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
          2xl:text-sm 2xl:peer-placeholder-shown:text-xl"
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
					placeholder=" "
					class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:pb-2 2xl:text-2xl"
				/>
				<label
					for="email"
					class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-valid:-top-4 peer-valid:text-[10px] peer-valid:font-bold
          peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
          2xl:text-sm 2xl:peer-placeholder-shown:text-xl"
				>
					Email
				</label>
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
					class="pointer-events-none absolute top-4 left-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
          peer-valid:-top-2.5 peer-valid:left-3 peer-valid:bg-bg peer-valid:px-1 peer-valid:text-[10px] peer-valid:font-bold
          peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-bg peer-focus:px-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
          2xl:text-sm 2xl:peer-placeholder-shown:top-6 2xl:peer-placeholder-shown:left-6 2xl:peer-placeholder-shown:text-xl"
				>
					Message
				</label>
			</div>

			{#if form?.error}
				<div
					class="animate-in fade-in slide-in-from-top-1 text-xs font-bold tracking-widest text-red-500 uppercase"
				>
					{form.error}
				</div>
			{/if}

			<div class="flex items-center justify-end pt-4 md:justify-between 2xl:pt-8">
				<button
					type="button"
					onclick={handleEmailClick}
					onmouseenter={() => (isHovered = true)}
					onmouseleave={() => {
						isHovered = false;
						emailCopied = false;
					}}
					class="group hidden items-center overflow-hidden text-left md:grid"
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
							{emailCopied ? 'Copied!' : 'hello@pedrolunet.dev'}
						</span>

						{#if emailCopied}
							<Check size={12} class="text-emerald-500 2xl:h-4 2xl:w-4" />
						{:else}
							<Copy size={12} class="text-accent 2xl:h-4 2xl:w-4" />
						{/if}
					</div>
				</button>

				<button
					type="submit"
					disabled={loading}
					class="group flex items-center gap-4 text-xs font-bold tracking-widest text-text uppercase transition-colors hover:text-accent disabled:opacity-50 2xl:text-sm"
				>
					<span>{loading ? 'Sending...' : 'Send Message'}</span>
					<div
						class="flex h-8 w-8 items-center justify-center border border-text/20 transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-text 2xl:h-12 2xl:w-12"
					>
						{#if loading}
							<LoaderCircle size={14} class="animate-spin 2xl:h-6 2xl:w-6" />
						{:else}
							<ArrowRight size={14} class="2xl:h-6 2xl:w-6" />
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
						class="text-xs font-bold uppercase transition-colors hover:text-accent 2xl:text-sm"
						>LinkedIn</a
					>
					<a
						href="https://github.com/PedroLunet"
						target="_blank"
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
					<span class="text-xs text-text 2xl:text-sm">{time || '--:--'}</span>
				</div>
			</div>
		</div>
	</div>
</div>
