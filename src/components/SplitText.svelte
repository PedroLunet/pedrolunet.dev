<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText as GSAPSplitText } from 'gsap/SplitText';

	if (browser) {
		gsap.registerPlugin(ScrollTrigger, GSAPSplitText);
	}

	export let text: string;
	export let className: string = '';
	export let delay: number = 100;
	export let duration: number = 0.6;
	export let ease: string | ((t: number) => number) = 'power3.out';
	export let splitType: 'chars' | 'words' | 'lines' | 'words, chars' = 'chars';
	export let from: gsap.TweenVars = { opacity: 0, y: 40 };
	export let to: gsap.TweenVars = { opacity: 1, y: 0 };
	export let threshold: number = 0.1;
	export let rootMargin: string = '-100px';
	export let textAlign: string = 'center';
	export let highlightText: string = '';
	export let highlightClass: string = '';

	const dispatch = createEventDispatcher<{
		letterAnimationComplete: void;
	}>();

	let ref: HTMLParagraphElement;
	let animationCompleted = false;
	let scrollTriggerInstance: ScrollTrigger | null = null;
	let timeline: gsap.core.Timeline | null = null;
	let splitter: GSAPSplitText | null = null;

	function initAnimation() {
		if (!browser || !ref || !text) return;

		const el = ref;
		animationCompleted = false;

		const absoluteLines = splitType === 'lines';
		if (absoluteLines) el.style.position = 'relative';

		try {
			splitter = new GSAPSplitText(el, {
				type: splitType,
				absolute: absoluteLines,
				linesClass: 'split-line'
			});
		} catch (error) {
			console.error('Failed to create SplitText:', error);
			return;
		}

		let targets: Element[];
		switch (splitType) {
			case 'lines':
				targets = splitter.lines;
				break;
			case 'words':
				targets = splitter.words;
				break;
			case 'chars':
				targets = splitter.chars;
				break;
			default:
				targets = splitter.chars;
		}

		if (!targets || targets.length === 0) {
			console.warn('No targets found for SplitText animation');
			splitter.revert();
			return;
		}

		targets.forEach((t) => {
			(t as HTMLElement).style.willChange = 'transform, opacity';
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
				toggleActions: 'play none none none',
				once: true,
				onToggle: (self) => {
					scrollTriggerInstance = self;
				}
			},
			smoothChildTiming: true,
			onComplete: () => {
				animationCompleted = true;
				gsap.set(targets, {
					...to,
					clearProps: 'willChange',
					immediateRender: true
				});
				dispatch('letterAnimationComplete');
			}
		});

		timeline.set(targets, { ...from, immediateRender: false, force3D: true });
		timeline.to(targets, {
			...to,
			duration,
			ease,
			stagger: delay / 1000,
			force3D: true
		});
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
		if (splitter) {
			splitter.revert();
			splitter = null;
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

<p
	bind:this={ref}
	class="split-parent inline-block overflow-hidden whitespace-normal {className}"
	style="text-align: {textAlign}; word-wrap: break-word;"
>
	{#if highlightText && text.includes(highlightText)}
		{@html text
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(
				highlightText.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
				`<span class="${highlightClass}">${highlightText.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`
			)}
	{:else}
		{text}
	{/if}
</p>
