<script>
	import SplitText from '../components/SplitText.svelte';
	import Shiny from '../components/Shiny.svelte';
	import { MapPin } from 'phosphor-svelte';
	let ref;
</script>

<section
	class="bg-main flex min-h-screen flex-col items-center justify-center overflow-visible px-4 py-20 text-center"
>
	<SplitText
		bind:this={ref}
		text="Hi, I'm [Pedro Lunet]"
		className="mb-6 text-3xl font-bold md:text-5xl leading-tight"
		splitType="words, chars"
		delay={50}
		duration={0.8}
		ease="power3.out"
		from={{ opacity: 0, y: 40 }}
		to={{ opacity: 1, y: 0 }}
		threshold={0.1}
		rootMargin="-100px"
		textAlign="center"
		highlightText="[Pedro Lunet]"
		highlightClass="text-orange-500"
	/>

	<div class="mb-4 flex items-center gap-1">
		<MapPin size={18} />
		<Shiny text="Porto, Portugal" className="text-lg md:text-xl" speed={5} />
	</div>
	<p class="mb-6 max-w-2xl text-lg text-gray-600 md:text-xl">
		I’m a frontend developer who enjoys building clean and responsive web interfaces using
		SvelteKit, Tailwind, and modern web tech.
	</p>
	<div class="flex gap-4">
		<a
			href="/projects"
			class="rounded-2xl bg-orange-500 px-6 py-2 text-white shadow transition hover:bg-orange-700"
			>View Projects</a
		>
		<a
			href="/contact"
			class="rounded-2xl border border-orange-500 px-6 py-2 text-orange-500 transition hover:bg-orange-50"
			>Contact Me</a
		>
	</div>
</section>

<section class="my-5 rounded-3xl bg-gray-50 px-6 py-20">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-4 text-3xl font-semibold">About Me</h2>
		<p class="mx-auto max-w-2xl text-lg text-gray-600">
			I'm currently studying computer engineering and building projects in web and mobile
			development. I'm passionate about user experience, accessibility, and learning new tools to
			create meaningful digital products.
		</p>
	</div>
</section>

<section class="rounded-3xl bg-gray-100 my-5 px-6 py-20">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="mb-4 text-3xl font-semibold">Let’s Talk</h2>
		<p class="mb-6 text-lg text-gray-700">
			Want to work together or just say hi? I’d love to hear from you.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-2xl bg-orange-500 px-8 py-3 text-white shadow transition hover:bg-orange-700"
		>
			Contact Me
		</a>
	</div>
</section>
