<script>
	import SplitText from '../components/SplitText.svelte';
	import Shiny from '../components/Shiny.svelte';
	import { MapPin } from 'phosphor-svelte';
	let ref;
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center overflow-visible bg-background px-4 py-20 text-center text-text dark:bg-background-dark dark:text-text-dark"
>
	<SplitText
		bind:this={ref}
		text="Hi, I'm [Pedro Lunet]"
		className="mb-6 text-3xl font-bold md:text-5xl leading-tight text-text dark:text-text-dark"
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
		highlightClass="text-accent dark:text-accent-dark"
	/>

	<div class="mb-4 flex items-center gap-1 text-text dark:text-text-dark">
		<MapPin size={18} />
		<Shiny text="Porto, Portugal" className="text-lg md:text-xl" speed={5} />
	</div>

	<p class="mb-6 max-w-2xl text-lg text-text md:text-xl dark:text-text-dark">
		I’m a frontend developer who enjoys building clean and responsive web interfaces using
		SvelteKit, Tailwind, and modern web tech.
	</p>

	<div class="flex gap-4">
		<a
			href="/projects"
			class="rounded-2xl bg-primary px-6 py-2 text-white shadow transition hover:bg-primary/80 dark:bg-primary-dark dark:text-background-dark dark:hover:bg-primary-dark/80"
		>
			View Projects
		</a>
		<a
			href="/about"
			class="hover:bg-opacity-60 rounded-2xl border border-primary px-6 py-2 text-primary transition hover:bg-background dark:border-primary-dark dark:text-primary-dark dark:hover:bg-background-dark"
		>
			About Me
		</a>
	</div>
</section>

<section class="my-5 px-6 py-20">
	<div class="mx-auto max-w-3xl text-center flex flex-col items-center justify-center">
		<h2 class="mb-4 text-3xl font-semibold text-text dark:text-text-dark">Let’s Talk</h2>
		<p class="mb-6 text-lg text-text opacity-90 dark:text-text-dark">
			Want to work together or just say hi? I’d love to hear from you.
		</p>
		<a
			href="/contact"
			class="hover:bg-opacity-60 rounded-2xl border border-primary px-6 py-2 text-primary transition hover:bg-background dark:border-primary-dark dark:text-primary-dark dark:hover:bg-background-dark"
		>
			Contact Me
		</a>
	</div>
</section>
