<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { ArrowRight, LoaderCircle, X } from '@lucide/svelte';
	import gsap from 'gsap';

	let { form } = $props();

	let loading = $state(false);
	let time = $state('');
	let showSuccessPopup = $state(false);

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

<div class="relative min-h-screen w-full bg-bg px-6 pt-12 pb-12 lg:px-9 lg:pt-24">
	{#if showSuccessPopup}
		<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div
				class="absolute inset-0"
				role="button"
				tabindex="-1"
				onclick={() => (showSuccessPopup = false)}
				onkeydown={() => (showSuccessPopup = false)}
			></div>

			<div
				class="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-md border border-accent bg-bg p-12 text-center shadow-2xl duration-300"
			>
				<h3 class="text-text-primary mb-2 text-2xl font-bold tracking-widest uppercase">
					Message Sent
				</h3>
				<p class="mb-8 text-sm text-text-secondary">Thank you. I'll get back to you shortly.</p>

				<button
					onclick={() => (showSuccessPopup = false)}
					class="group mx-auto flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase transition-colors hover:text-white"
				>
					<span>Close</span>
					<X size={14} class="transition-transform group-hover:rotate-90" />
				</button>
			</div>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
		<div class="col-span-1 lg:col-span-7">
			<div class="reveal translate-y-8 opacity-0">
				<h1
					class="text-text-primary text-[clamp(3.5rem,14cqi,10rem)] leading-[0.8] font-bold tracking-tighter uppercase"
				>
					Let's<br />Talk.
				</h1>
			</div>
		</div>

		<div class="col-span-1 flex flex-col gap-12 lg:col-span-5 lg:pt-4">
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
				class="reveal flex translate-y-8 flex-col gap-8 opacity-0"
			>
				<div class="group relative">
					<input
						type="text"
						name="name"
						id="name"
						required
						placeholder=" "
						class="peer border-text-primary/20 text-text-primary w-full rounded-none border-0 border-b bg-transparent px-0 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
					/>
					<label
						for="name"
						class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50 peer-valid:-top-2 peer-valid:text-[10px] peer-valid:font-bold peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent"
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
						class="peer border-text-primary/20 text-text-primary w-full rounded-none border-0 border-b bg-transparent px-0 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
					/>
					<label
						for="email"
						class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50 peer-valid:-top-2 peer-valid:text-[10px] peer-valid:font-bold peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent"
					>
						Email
					</label>
				</div>

				<div class="group relative mt-4">
					<textarea
						name="message"
						id="message"
						required
						rows="5"
						placeholder=" "
						class="peer border-text-primary/20 text-text-primary w-full resize-none rounded-none border bg-transparent p-4 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
					></textarea>

					<label
						for="message"
						class="pointer-events-none absolute top-4 left-4 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50
            peer-valid:-top-2.5 peer-valid:left-3 peer-valid:bg-bg peer-valid:px-1 peer-valid:text-[10px] peer-valid:font-bold peer-focus:-top-2.5
            peer-focus:left-3 peer-focus:bg-bg peer-focus:px-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent"
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

				<div class="flex justify-end pt-4">
					<button
						type="submit"
						disabled={loading}
						class="group text-text-primary flex items-center gap-4 text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent disabled:opacity-50"
					>
						<span>{loading ? 'Sending...' : 'Send Message'}</span>
						<div
							class="border-text-primary/20 flex h-8 w-8 items-center justify-center border transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
						>
							{#if loading}
								<LoaderCircle size={14} class="animate-spin" />
							{:else}
								<ArrowRight size={14} />
							{/if}
						</div>
					</button>
				</div>
			</form>

			<div class="reveal mt-12 flex translate-y-8 flex-col gap-8 opacity-0 lg:mt-auto">
				<div>
					<h3
						class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
					>
						Socials
					</h3>
					<div class="flex gap-6">
						<a
							href="https://linkedin.com/in/PedroLunet"
							target="_blank"
							class="text-xs font-bold uppercase transition-colors hover:text-accent">LinkedIn</a
						>
						<a
							href="https://github.com/PedroLunet"
							target="_blank"
							class="text-xs font-bold uppercase transition-colors hover:text-accent">GitHub</a
						>
					</div>
				</div>

				<div class="border-text-primary/10 flex items-end justify-between border-t pt-6">
					<div class="flex flex-col gap-1">
						<span
							class="text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
							>Location</span
						>
						<span class="text-text-primary text-xs font-bold uppercase">Porto, Portugal</span>
					</div>
					<div class="flex flex-col items-end gap-1">
						<span
							class="text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
							>Local Time</span
						>
						<span class="text-text-primary font-mono text-xs">{time || '--:--'}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
