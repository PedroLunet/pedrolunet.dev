<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	if (browser) {
		gsap.registerPlugin(ScrollTrigger);
	}

	export let delay: number = 0;
	export let duration: number = 0.8;
	export let ease: string = 'power2.out';
	export let from: gsap.TweenVars = { opacity: 0, y: 30 };
	export let to: gsap.TweenVars = { opacity: 1, y: 0 };
	export let threshold: number = 0.1;
	export let rootMargin: string = '0px';
	export let triggerOnce: boolean = true;
	export let className: string = '';
	export let stagger: number = 0;

	let ref: HTMLDivElement;
	let scrollTriggerInstance: ScrollTrigger | null = null;
	let timeline: gsap.core.Timeline | null = null;

	function initAnimation() {
		if (!browser || !ref) return;

		const el = ref;
		const children = stagger > 0 ? Array.from(el.children) : [el];

		// Set initial styles with will-change for performance
		gsap.set(children, {
			...from,
			willChange: 'transform, opacity',
			force3D: true
		});

		const startPct = (1 - threshold) * 100;
		const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
		const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
		const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
		const sign =
			marginValue < 0 ? `-=${Math.abs(marginValue)}${marginUnit}` : `+=${marginValue}${marginUnit}`;
		const start = `top ${startPct}%${sign}`;

		timeline = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				start,
				toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
				once: triggerOnce,
				onToggle: (self) => {
					scrollTriggerInstance = self;
				}
			},
			delay: delay / 1000,
			onComplete: () => {
				// Clear will-change after animation
				gsap.set(children, { clearProps: 'willChange' });
			}
		});

		if (stagger > 0 && children.length > 1) {
			timeline.to(children, {
				...to,
				duration,
				ease,
				stagger: stagger / 1000,
				force3D: true
			});
		} else {
			timeline.to(children, {
				...to,
				duration,
				ease,
				force3D: true
			});
		}
	}

	function cleanup() {
		if (timeline) {
			timeline.kill();
			timeline = null;
		}
		if (scrollTriggerInstance) {
			scrollTriggerInstance.kill();
			scrollTriggerInstance = null;
		}
	}

	onMount(() => {
		initAnimation();
	});

	onDestroy(() => {
		cleanup();
	});

	// Reactive statement to reinitialize when props change
	$: if (browser && ref) {
		cleanup();
		initAnimation();
	}
</script>

<div bind:this={ref} class="fade-in-container {className}">
	<slot />
</div>

<style>
	.fade-in-container {
		/* Ensure container doesn't interfere with layout */
		contain: layout style;
	}
</style>
