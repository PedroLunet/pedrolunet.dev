<script>
	import SplitText from '../../components/SplitText.svelte';
	import Shiny from '../../components/Shiny.svelte';
	import { MapPin } from 'phosphor-svelte';
</script>

<section
	class="flex h-[calc(90vh-var(--navbar-height))] flex-col items-start bg-background px-4 py-10 text-text dark:bg-background-dark dark:text-text-dark"
>
	<div class="flex h-fit flex-col items-start justify-center">
		<SplitText
			text="Pedro Lunet"
			className=" text-3xl font-bold md:text-5xl leading-tight text-accent dark:text-accent-dark"
			splitType="words"
			delay={60}
			duration={0.8}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>
		<SplitText
			text="Web Developer"
			className="text-2xl font-bold **:md:text-4xl leading-tight text-text dark:text-text-dark"
			splitType="words"
			delay={60}
			duration={0.8}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>
		<div class="mt-4 mb-4 flex items-center gap-1 text-text dark:text-text-dark">
			<MapPin size={18} weight="bold" class="text-accent dark:text-accent-dark" />
			<Shiny text="Porto, Portugal" className="text-lg md:text-xl" speed={5} />
		</div>
	</div>
	<p class="mb-6 w-full max-w-[400px] text-lg text-muted md:text-xl dark:text-muted-dark">
		I like to design clean, responsive interfaces that feel quiet, thoughtful, and effortless. I
		care about clarity, simplicity, and the small details that make things feel right.
	</p>
</section>
