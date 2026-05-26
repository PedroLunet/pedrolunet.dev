<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { scale, fade } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { Send, LoaderCircle, X } from '@lucide/svelte';
	import gsap from 'gsap';
	import SEO from '$lib/components/seo.svelte';

	let { data, form } = $props();

	let loading = $state(false);
	let name = $state('');
	let message = $state('');
	let now = $state(Date.now());
	let error = $state('');

	function formatTime(dateStr: string) {
		const date = new Date(dateStr.replace(' ', 'T') + 'Z');
		const diff = now - date.getTime();
		const mins = Math.floor(diff / 60000);
		const hours = Math.floor(diff / 3600000);

		if (mins < 1) return 'just now';
		if (hours < 1) return `${mins}min ago`;
		if (hours < 24) return `${hours}h ago`;

		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}

	function tileRotation(id: number): string {
		const angle = ((id * 7.538) % 2.4) - 1.2;
		return `${angle.toFixed(1)}deg`;
	}

	const formatted = $derived(
		data.messages.map((msg) => ({
			id: msg.id,
			author: msg.author,
			content: msg.content,
			time: formatTime(msg.created_at)
		}))
	);

	let ctx: gsap.Context;

	onMount(() => {
		const interval = setInterval(() => (now = Date.now()), 60000);

		ctx = gsap.context(() => {
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

<SEO
	title="Mural - Pedro Lunet"
	description="Leave a message on the mural wall. A space for thoughts, shoutouts, or whatever you want to share."
/>

{#if error}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center p-4"
		role="dialog"
		aria-modal="true"
	>
		<div
			class="absolute inset-0 bg-bg/80 backdrop-blur-sm"
			role="button"
			tabindex="-1"
			onclick={() => (error = '')}
			onkeydown={(e) => e.key === 'Escape' && (error = '')}
			transition:fade={{ duration: 200 }}
		></div>

		<div
			class="relative z-10 w-full max-w-md border border-text/20 bg-bg p-12 text-center shadow-2xl"
			transition:scale={{ duration: 300, start: 0.95, opacity: 0, easing: backOut }}
		>
			<h3 class="mb-2 text-2xl font-bold tracking-widest text-text uppercase">Oops</h3>
			<p class="mb-8 text-sm text-text-secondary">{error}</p>

			<button
				onclick={() => (error = '')}
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

<div class="flex flex-col gap-16 2xl:gap-24">
	<div class="reveal translate-y-8 opacity-0">
		<h1
			class="text-[clamp(3.5rem,14cqi,10rem)] leading-[0.8] font-bold tracking-tighter text-text uppercase 2xl:text-[clamp(5rem,14cqi,14rem)]"
		>
			Mural
		</h1>
		<p class="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary 2xl:mt-6 2xl:text-lg">
			A wall for thoughts, shoutouts, or whatever's on your mind. Leave your mark — no sign-up
			needed.
		</p>
	</div>

	<div class="reveal translate-y-8 opacity-0">
		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				error = '';
				return async ({ result, update }) => {
					loading = false;
					await update();
					if (result.type === 'success') {
						name = '';
						message = '';
						await invalidate('/mural');
					} else if (result.type === 'failure') {
						error = result.data?.error || 'Something went wrong';
					}
				};
			}}
			class="flex flex-col gap-6 border border-text/10 p-6 2xl:gap-8 2xl:p-8"
		>
			<div style="display:none" aria-hidden="true">
				<input type="text" name="website" tabindex="-1" autocomplete="off" />
			</div>

			<div class="flex flex-col gap-4 md:flex-row md:items-end 2xl:gap-6">
				<div class="group relative flex-1">
					<input
						type="text"
						name="name"
						id="mural-name"
						bind:value={name}
						required
						placeholder=" "
						class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 py-0 pt-2 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:text-2xl"
					/>
					<label
						for="mural-name"
						class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
							peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
							peer-valid:-top-2.5 peer-valid:text-[10px] peer-valid:font-bold
							peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
							2xl:text-sm 2xl:peer-placeholder-shown:text-xl"
					>
						Name
					</label>
				</div>

				<div class="group relative flex-1">
					<input
						type="text"
						name="message"
						id="mural-message"
						bind:value={message}
						required
						maxlength={500}
						placeholder=" "
						class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 py-0 pt-2 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:text-2xl"
					/>
					<label
						for="mural-message"
						class="pointer-events-none absolute top-4 left-0 right-0 flex justify-between text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
							peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
							peer-valid:-top-2.5 peer-valid:text-[10px] peer-valid:font-bold
							peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
							2xl:text-sm 2xl:peer-placeholder-shown:text-xl"
					>
						<span>Your message</span>
						<span
							class="text-[10px] normal-case tracking-normal {message.length > 450
								? 'text-accent'
								: 'text-text-secondary/50'} 2xl:text-xs">{message.length}/500</span>
					</label>
				</div>

				<button
					type="submit"
					disabled={loading || !name || !message}
					class="group flex w-full shrink-0 items-center justify-center gap-3 border border-text/20 px-8 py-3 text-xs font-bold tracking-widest text-text uppercase transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg disabled:opacity-30 md:w-auto 2xl:gap-4 2xl:px-10 2xl:py-4 2xl:text-sm"
				>
					{#if loading}
						<LoaderCircle size={14} class="animate-spin" />
						<span>Posting...</span>
					{:else}
						<span>Post on Wall</span>
						<Send size={14} class="transition-transform duration-300 group-hover:translate-x-1" />
					{/if}
				</button>
			</div>
		</form>
	</div>

	<div class="reveal translate-y-8 opacity-0">
		<div
			class="mb-6 flex items-center justify-between border-b border-text/10 pb-3 2xl:mb-8 2xl:pb-4"
		>
			<h2 class="text-xs font-bold tracking-widest text-text-secondary uppercase 2xl:text-sm">
				Messages
			</h2>
			<span class="text-xs text-text-secondary/50 2xl:text-sm"
				>{data.messages.length} note{data.messages.length !== 1 ? 's' : ''}</span
			>
		</div>

		{#if data.messages.length === 0}
			<div class="flex flex-col items-center gap-4 py-20 text-center 2xl:gap-6 2xl:py-32">
				<div class="text-6xl opacity-20 2xl:text-8xl">◻</div>
				<p class="text-sm text-text-secondary/50 2xl:text-lg">
					No messages yet. Be the first to leave your mark.
				</p>
			</div>
		{:else}
			<div class="mural-grid columns-1 gap-4 md:columns-2 lg:columns-3 2xl:gap-6">
				{#each formatted as msg (msg.id)}
					<div
						in:scale={{ duration: 400, start: 0.85, opacity: 0, easing: backOut }}
						class="mb-4 break-inside-avoid border border-text/10 bg-bg p-5 transition-all duration-300 hover:border-accent/70 2xl:mb-6 2xl:p-7"
						style="transform: rotate({tileRotation(msg.id)})"
					>
						<div class="flex flex-col gap-3 2xl:gap-4">
							<p class="text-[15px] leading-relaxed break-words text-text 2xl:text-lg">
								{msg.content}
							</p>
							<div
								class="flex items-center justify-between gap-2 border-t border-text/10 pt-3 2xl:pt-4"
							>
								<span
									class="truncate text-[11px] font-bold tracking-widest text-accent uppercase 2xl:text-xs"
								>
									{msg.author}
								</span>
								<span class="shrink-0 text-[11px] text-text-secondary/50 2xl:text-xs">
									{msg.time}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
