<script>
	import SplitText from '../../components/SplitText.svelte';
</script>

<section class="bg-background px-4 py-24 text-text dark:bg-background-dark dark:text-text-dark">
	<div class="mx-auto max-w-3xl text-center">
		<SplitText
			text="About Me"
			className="mb-6 text-4xl font-bold md:text-5xl leading-tight text-primary dark:text-primary-dark"
			splitType="words"
			delay={60}
			duration={0.8}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>

		<p class="mx-auto max-w-2xl text-lg text-muted md:text-xl dark:text-muted-dark">
			I'm a frontend developer focused on building clean, performant, and accessible web interfaces.
			My current stack revolves around <strong>SvelteKit</strong>, <strong>Tailwind CSS</strong>,
			and modern frontend tooling. I'm especially interested in user experience, animation, and
			minimalist design.
		</p>
	</div>
</section>

<section class="bg-border/30 px-4 py-20 dark:bg-border-dark/30">
	<div class="mx-auto grid max-w-4xl items-start gap-12 md:grid-cols-2">
		<div>
			<h2 class="mb-4 text-2xl font-semibold text-primary dark:text-primary-dark">Background</h2>
			<p class="leading-relaxed text-muted dark:text-muted-dark">
				I’m currently studying <strong>Informatics and Computer Engineering</strong>. Over time,
				I’ve developed a deep interest in mobile development and web interfaces — especially ones
				that feel intuitive, smooth, and polished. I value clean code, simplicity, and meaningful
				UX.
			</p>
		</div>

		<div>
			<h2 class="mb-4 text-2xl font-semibold text-primary dark:text-primary-dark">Tech I Like</h2>
			<ul class="list-inside list-disc space-y-1 leading-relaxed text-muted dark:text-muted-dark">
				<li>SvelteKit, Tailwind CSS</li>
				<li>React Native & iOS UI</li>
				<li>Minimalist component libraries</li>
				<li>Drizzle, PostgreSQL, Firebase</li>
				<li>Animation libraries & micro-interactions</li>
			</ul>
		</div>
	</div>
</section>

<section class="bg-background px-4 py-20 text-text dark:bg-background-dark dark:text-text-dark">
	<div class="mx-auto max-w-2xl text-center">
		<h2 class="mb-4 text-3xl font-semibold text-primary dark:text-primary-dark">Outside of Code</h2>
		<p class="text-lg leading-relaxed text-muted dark:text-muted-dark">
			I enjoy curating playlists, watching films on Letterboxd, and exploring creative interfaces.
			Whether I’m designing a UI or cooking a meal, I find joy in detail and balance.
		</p>
	</div>
</section>
