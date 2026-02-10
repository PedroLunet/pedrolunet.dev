<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { ArrowRight, Loader2 } from '@lucide/svelte';
	import gsap from 'gsap';

	let { form } = $props();

	let loading = $state(false);
	let time = $state('');

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

<div class="min-h-screen w-full bg-bg px-6 pt-32 pb-12 lg:px-9 lg:pt-40">
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
			{#if form?.success}
				<div
					class="animate-in fade-in slide-in-from-bottom-4 flex h-full flex-col items-start justify-center duration-700"
				>
					<h3 class="text-text-primary mb-2 text-4xl font-bold tracking-tight uppercase">
						Message Sent
					</h3>
					<p class="mb-8 text-lg font-light text-text-secondary">
						Thank you. I'll get back to you shortly.
					</p>

					<a
						href="/contact"
						class="group flex items-center gap-2 text-xs font-bold tracking-widest text-accent uppercase transition-colors hover:text-white"
					>
						<span>Send Another</span>
						<ArrowRight size={14} class="transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			{:else}
				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
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
							value={form?.values?.name ?? ''}
							placeholder=" "
							class="peer border-text-primary/20 text-text-primary w-full rounded-none border-0 border-b bg-transparent py-4 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
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
							value={form?.values?.email ?? ''}
							placeholder=" "
							class="peer border-text-primary/20 text-text-primary w-full rounded-none border-0 border-b bg-transparent py-4 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
						/>
						<label
							for="email"
							class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50 peer-valid:-top-2 peer-valid:text-[10px] peer-valid:font-bold peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent"
						>
							Email
						</label>
					</div>

					<div class="group relative">
						<textarea
							name="message"
							id="message"
							required
							rows="4"
							value={form?.values?.message ?? ''}
							placeholder=" "
							class="peer border-text-primary/20 text-text-primary w-full resize-none rounded-none border-0 border-b bg-transparent py-4 text-lg font-light placeholder-transparent transition-colors outline-none focus:border-accent focus:ring-0"
						></textarea>
						<label
							for="message"
							class="pointer-events-none absolute top-4 left-0 text-xs font-bold tracking-widest text-text-secondary uppercase transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-normal peer-placeholder-shown:text-text-secondary/50 peer-valid:-top-2 peer-valid:text-[10px] peer-valid:font-bold peer-focus:-top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-accent"
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
								class="relative flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"
							>
								{#if loading}
									<Loader2 size={16} class="animate-spin" />
								{:else}
									<ArrowRight size={16} />
								{/if}
							</div>
						</button>
					</div>
				</form>
			{/if}

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
