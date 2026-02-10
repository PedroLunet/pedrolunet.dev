<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight, Copy, Check } from '@lucide/svelte';
	import gsap from 'gsap';

	let copied = $state(false);
	const email = 'pedro@example.com';

	function copyEmail() {
		navigator.clipboard.writeText(email);
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

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

		return () => clearInterval(interval);
	});

	$effect(() => {
		const ctx = gsap.context(() => {
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

<div class="min-h-screen w-full bg-bg px-4 pt-32 pb-12 lg:px-12 lg:pt-40">
	<div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
		<div class="col-span-1 lg:col-span-8">
			<div class="reveal translate-y-8 opacity-0">
				<h1
					class="text-text-primary text-[clamp(3.5rem,14cqi,10rem)] leading-[0.8] font-bold tracking-tighter uppercase"
				>
					Let's<br />
					Talk.
				</h1>
			</div>
		</div>

		<div class="col-span-1 flex flex-col gap-12 lg:col-span-4 lg:pt-4">
			<div class="reveal translate-y-8 opacity-0">
				<h3
					class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
				>
					Email
				</h3>
				<button
					onclick={copyEmail}
					class="group border-text-primary/10 relative flex w-full items-center justify-between border-b pb-4 text-left transition-colors hover:border-accent"
				>
					<span
						class="text-text-primary text-xl font-light transition-colors group-hover:text-accent md:text-2xl"
					>
						{email}
					</span>

					<div class="relative h-5 w-5 overflow-hidden">
						<div
							class="ease-spring absolute inset-0 flex items-center justify-center text-text-secondary transition-transform duration-500 group-hover:text-accent"
							class:translate-y-[-100%]={copied}
							class:translate-y-0={!copied}
						>
							<Copy size={20} strokeWidth={1.5} />
						</div>

						<div
							class="ease-spring absolute inset-0 flex items-center justify-center text-emerald-500 transition-transform duration-500"
							class:translate-y-0={copied}
							class:translate-y-[100%]={!copied}
						>
							<Check size={20} strokeWidth={2} />
						</div>
					</div>

					<div
						class="absolute bottom-[-1px] left-0 h-[1px] w-0 bg-accent transition-all duration-500 group-hover:w-full"
					></div>
				</button>
			</div>

			<div class="reveal translate-y-8 opacity-0">
				<h3
					class="mb-4 text-[10px] font-bold tracking-widest text-text-secondary uppercase opacity-50"
				>
					Socials
				</h3>
				<div class="flex flex-col gap-2">
					{#each [{ name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile' }, { name: 'GitHub', url: 'https://github.com/yourusername' }, { name: 'Twitter / X', url: 'https://twitter.com/yourhandle' }] as social}
						<a
							href={social.url}
							target="_blank"
							rel="noreferrer"
							class="group text-text-primary flex items-center justify-between py-2 transition-colors hover:text-accent"
						>
							<span class="text-sm font-medium tracking-wide uppercase">{social.name}</span>
							<ArrowUpRight
								size={16}
								class="-translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
							/>
						</a>
					{/each}
				</div>
			</div>

			<div class="reveal mt-auto translate-y-8 opacity-0">
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
						<span class="text-text-primary font-mono text-xs">
							{time || '--:--'}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.ease-spring {
		transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
	}
</style>
