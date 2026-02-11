<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';

	import experience from '$lib/data/experience.json';

	gsap.registerPlugin(ScrollTrigger);

	let sortedExperience = experience.sort((a, b) => {
		const dateA = new Date(a.start);
		const dateB = new Date(b.start);
		return dateB.getTime() - dateA.getTime();
	});

	let ctx: gsap.Context;

	onMount(() => {
		ctx = gsap.context(() => {
			const tl = gsap.timeline();

			tl.to('.reveal-text', {
				y: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: 'power3.out'
			});

			tl.to(
				'.image-mask',
				{
					scaleY: 0,
					transformOrigin: 'bottom',
					duration: 1.2,
					ease: 'expo.inOut'
				},
				0.3
			);

			tl.from(
				'.profile-img',
				{
					scale: 1.2,
					duration: 1.5,
					ease: 'power2.out'
				},
				0.3
			);

			tl.to(
				'.fade-in-text',
				{
					y: 0,
					opacity: 1,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power2.out'
				},
				0.5
			);

			gsap.utils.toArray('.experience-item').forEach((item: any, i) => {
				gsap.from(item, {
					scrollTrigger: {
						trigger: item,
						start: 'top 95%',
						toggleActions: 'play none none reverse'
					},
					y: 20,
					opacity: 0,
					duration: 0.6,
					delay: i * 0.1,
					ease: 'power2.out'
				});
			});
		});

		return () => ctx.revert();
	});
</script>

<div
	class="min-h-[calc(100vh-var(--header-height-mobile))] w-full bg-bg md:min-h-[calc(100vh-var(--header-height-tablet))] lg:min-h-[calc(100vh-var(--header-height-desktop))]"
>
	<div class="mx-auto flex max-w-500 flex-col px-6 lg:px-9 2xl:px-24">
		<div class="flex flex-col gap-16 lg:flex-row lg:gap-12 2xl:gap-24">
			<div class="relative w-full flex-none lg:w-[25%]">
				<div
					class="flex flex-col gap-8 pt-12 lg:sticky lg:top-(--header-height-desktop) lg:pt-12 lg:pb-12"
				>
					<div class="w-full shrink-0 overflow-hidden">
						<h1
							class="reveal-text text-text-primary translate-y-full text-[clamp(3.5rem,6vw,14rem)] leading-[0.85] font-bold tracking-tighter uppercase opacity-0"
						>
							It's<br />Me.
						</h1>
					</div>

					<div
						class="fade-in-text relative aspect-3/4 w-full translate-y-8 overflow-hidden opacity-0 shadow-2xl"
					>
						<div class="image-mask absolute inset-0 z-20 h-full w-full origin-top bg-accent"></div>
						<img
							src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
							alt="Pedro Lunet"
							class="profile-img h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
						/>
					</div>
				</div>
			</div>

			<div class="flex-1 lg:pt-32 2xl:pt-48">
				<div
					class="ml-auto flex max-w-2xl flex-col items-end text-right lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl"
				>
					<div class="flex flex-col gap-8 2xl:gap-16">
						<h3
							class="fade-in-text mb-2 translate-y-8 text-xs font-bold tracking-widest text-accent uppercase opacity-0 2xl:text-sm"
						>
							The Story
						</h3>

						<div class="fade-in-text translate-y-8 opacity-0">
							<p
								class="text-text-primary text-xl leading-relaxed font-light md:text-3xl 2xl:text-5xl 2xl:leading-tight"
							>
								I'm a creative developer based in Porto, sitting right at the intersection of <span
									class="text-text-primary border-b border-accent/50 font-normal">logic</span
								>
								and
								<span class="text-text-primary border-b border-accent/50 font-normal"
									>aesthetics</span
								>.
							</p>
						</div>

						<div
							class="fade-in-text flex translate-y-8 flex-col gap-6 text-base leading-loose text-text-secondary opacity-0 md:text-lg 2xl:gap-10 2xl:text-2xl 2xl:leading-loose"
						>
							<p>
								My journey didn't start in design—it started in engineering. I spent years
								understanding the architecture of systems before realizing that the most powerful
								code is the kind that people can feel.
							</p>
							<p>
								Today, I use that technical foundation to build digital experiences that are fluid,
								reactive, and memorable. I don't just write code; I orchestrate motion,
								interactivity, and typography to turn static screens into living environments.
							</p>
							<p>
								Whether it's a high-performance landing page or a complex WebGL experience, my goal
								is always the same: to make the web feel less like a document and more like a
								destination.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="pt-12 pb-24 lg:pt-24 2xl:pt-40 2xl:pb-40">
			<div class="flex flex-col">
				<h3
					class="fade-in-text border-text-primary/10 mb-8 translate-y-8 border-b pb-4 text-xs font-bold tracking-widest text-text-secondary/50 uppercase opacity-0 2xl:mb-12 2xl:pb-6 2xl:text-sm"
				>
					Experience
				</h3>

				<div class="flex flex-col gap-0">
					{#each sortedExperience as job}
						<div
							class="experience-item group border-text-primary/10 grid grid-cols-1 gap-4 border-b py-8 transition-colors hover:border-accent/50 md:grid-cols-12 2xl:py-12"
						>
							<div class="col-span-3">
								<span
									class="mb-1 block font-mono text-xs text-accent/80 opacity-0 transition-opacity group-hover:opacity-100 2xl:text-sm"
									class:opacity-0={job.end !== 'Present'}
								>
									{job.end === 'Present' ? 'Current' : ''}
								</span>

								<span class="text-text-primary text-sm font-bold 2xl:text-lg">
									{job.start} — {job.end}
								</span>
							</div>

							<div class="col-span-9 flex flex-col gap-2 2xl:gap-4">
								<div class="flex items-center justify-between">
									<h4
										class="text-text-primary text-2xl font-medium transition-colors group-hover:text-accent 2xl:text-4xl"
									>
										{job.role}
									</h4>
									<a href={job.companyUrl} target="_blank" rel="noopener noreferrer">
										<ArrowUpRight
											class="h-5 w-5 -translate-x-2 translate-y-2 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 2xl:h-8 2xl:w-8"
										/>
									</a>
								</div>

								<div
									class="flex items-baseline gap-3 text-xs font-bold tracking-widest text-text-secondary uppercase 2xl:text-sm"
								>
									<a
										href={job.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="transition-colors hover:text-accent"
									>
										{job.company}
									</a>

									{#if job.location}
										<span class="opacity-30">•</span>
										<span class="opacity-50">{job.location}</span>
									{/if}
								</div>

								<p
									class="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary 2xl:max-w-5xl 2xl:text-xl"
								>
									{job.description}
								</p>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
