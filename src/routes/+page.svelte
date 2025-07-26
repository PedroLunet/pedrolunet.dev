<script>
	import SplitText from '../components/SplitText.svelte';
	let ref;
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center overflow-visible bg-white px-4 py-20 text-center"
>
	<SplitText
		bind:this={ref}
		text="Hi, I'm </Pedro Lunet>"
		className="mb-6 text-3xl font-bold md:text-5xl"
		splitType="words, chars"
		delay={50}
		duration={0.8}
		ease="power3.out"
		from={{ opacity: 0, y: 40 }}
		to={{ opacity: 1, y: 0 }}
		threshold={0.1}
		rootMargin="-100px"
		textAlign="center"
		highlightText="</Pedro Lunet>"
		highlightClass="text-blue-600"
	/>
	<p class="mb-6 max-w-2xl text-lg text-gray-600 md:text-xl">
		I’m a frontend developer who enjoys building clean and responsive web interfaces using
		SvelteKit, Tailwind, and modern web tech.
	</p>
	<div class="flex gap-4">
		<a
			href="/projects"
			class="rounded-2xl bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700"
			>View Projects</a
		>
		<a
			href="/contact"
			class="rounded-2xl border border-blue-600 px-6 py-2 text-blue-600 transition hover:bg-blue-50"
			>Contact Me</a
		>
	</div>
</section>

<section class="bg-gray-50 px-6 py-20">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="mb-4 text-3xl font-semibold">About Me</h2>
		<p class="mx-auto max-w-2xl text-lg text-gray-600">
			I'm currently studying computer engineering and building projects in web and mobile
			development. I'm passionate about user experience, accessibility, and learning new tools to
			create meaningful digital products.
		</p>
	</div>
</section>

<section class="bg-white px-6 py-20">
	<div class="mx-auto max-w-5xl">
		<h2 class="mb-10 text-center text-3xl font-semibold">Projects</h2>
		<div class="grid gap-6 md:grid-cols-2">
			{#each [1, 2, 3] as project}
				<div class="rounded-2xl border p-6 shadow-sm transition hover:shadow-md">
					<h3 class="mb-2 text-xl font-bold">Project Title</h3>
					<p class="mb-4 text-gray-600">
						Short description of the project. Mention tech stack and what it does.
					</p>
					<div class="mb-4 flex flex-wrap gap-2">
						<span class="rounded-full bg-gray-100 px-3 py-1 text-sm">SvelteKit</span>
						<span class="rounded-full bg-gray-100 px-3 py-1 text-sm">Tailwind</span>
					</div>
					<div class="flex gap-4">
						<a href="#" class="text-blue-600 hover:underline">GitHub</a>
						<a href="#" class="text-blue-600 hover:underline">Live Demo</a>
					</div>
				</div>
			{/each}
		</div>
		<div class="mt-10 text-center">
			<a href="/projects" class="text-blue-600 hover:underline">See all projects →</a>
		</div>
	</div>
</section>

<section class="bg-gray-100 px-6 py-20">
	<div class="mx-auto max-w-3xl text-center">
		<h2 class="mb-4 text-3xl font-semibold">Let’s Talk</h2>
		<p class="mb-6 text-lg text-gray-700">
			Want to work together or just say hi? I’d love to hear from you.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-2xl bg-blue-600 px-8 py-3 text-white shadow transition hover:bg-blue-700"
		>
			Contact Me
		</a>
	</div>
</section>
