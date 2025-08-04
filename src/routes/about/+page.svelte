<script>
	import SplitText from '../../components/SplitText.svelte';
	import Shiny from '../../components/Shiny.svelte';
	import { MapPin } from 'phosphor-svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	let ref;
</script>

<section
	class="text-text flex h-[calc(90vh-var(--navbar-height))] flex-col items-center justify-center overflow-visible bg-background px-4 py-20 text-center"
>
	<SplitText
		bind:this={ref}
		text="Hi, I'm [Pedro Lunet]"
		className="mb-6 text-3xl font-bold md:text-5xl leading-tight text-text"
		splitType="words, chars"
		delay={50}
		duration={2}
		ease="power3.out"
		from={{ opacity: 0, y: 40 }}
		to={{ opacity: 1, y: 0 }}
		threshold={0.1}
		rootMargin="-100px"
		textAlign="center"
		highlightText="[Pedro Lunet]"
		highlightClass="text-accent"
	/>

	<div class="text-text mb-4 flex items-center gap-1">
		<MapPin size={18} weight="bold" class="text-accent" />
		<Shiny text="Porto, Portugal" className="text-lg md:text-xl" speed={5} />
	</div>

	<p class="text-text mb-6 max-w-2xl text-lg md:text-xl">
		I’m a frontend developer who enjoys building clean and responsive web interfaces using
		SvelteKit, Tailwind, and modern web tech.
	</p>

	<div class="flex gap-4">
		<Button href="/projects">View Projects</Button>
		<Button variant="outline" href="/about">About Me</Button>
	</div>
</section>


