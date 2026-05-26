<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';
	import { scale } from 'svelte/transition';
	import { backOut } from 'svelte/easing';
	import { Send, LoaderCircle } from '@lucide/svelte';
	import gsap from 'gsap';
	import SEO from '$lib/components/seo.svelte';

	let { data } = $props();

	let loading = $state(false);
	let name = $state('');
	let message = $state('');

	let ctx: gsap.Context;

	onMount(() => {
		ctx = gsap.context(() => {
			gsap.to('.reveal', {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out'
			});
		});

		return () => ctx.revert();
	});
</script>

<SEO
	title="Mural - Pedro Lunet"
	description="Leave a message on the mural wall. A space for thoughts, shoutouts, or whatever you want to share."
/>

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
				return async ({ result, update }) => {
					loading = false;
					await update();
					if (result.type === 'success') {
						name = '';
						message = '';
						await invalidate('/mural');
					}
				};
			}}
			class="flex flex-col gap-6 border border-text/10 p-6 2xl:gap-8 2xl:p-8"
		>
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
						placeholder=" "
						class="peer w-full rounded-none border-0 border-b border-text/20 bg-transparent px-0 py-0 pt-2 text-lg font-light text-text placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0 2xl:text-2xl"
					/>
					<label
						for="mural-message"
						class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
							peer-placeholder-shown:top-0 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
							peer-valid:-top-2.5 peer-valid:text-[10px] peer-valid:font-bold
							peer-focus:-top-2.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent
							2xl:text-sm 2xl:peer-placeholder-shown:text-xl"
					>
						Your message
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
				{#each data.messages as msg (msg.id)}
					<div
						in:scale={{ duration: 400, start: 0.85, opacity: 0, easing: backOut }}
						class="mb-4 break-inside-avoid border border-text/10 bg-bg p-5 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 2xl:mb-6 2xl:p-7"
						style="transform: rotate({(Math.random() - 0.5) * 2}deg)"
					>
						<div class="flex flex-col gap-3 2xl:gap-4">
							<p class="text-sm leading-relaxed text-text 2xl:text-lg">
								{msg.content}
							</p>
							<div
								class="flex items-center justify-between gap-2 border-t border-text/10 pt-3 2xl:pt-4"
							>
								<span
									class="truncate text-[10px] font-bold tracking-widest text-accent uppercase 2xl:text-xs"
								>
									{msg.author}
								</span>
								<span class="shrink-0 text-[10px] text-text-secondary/50 2xl:text-xs">
									{msg.created_at}
								</span>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
