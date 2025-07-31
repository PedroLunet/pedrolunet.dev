<script>
	import SplitText from '../../components/SplitText.svelte';
	import Shiny from '../../components/Shiny.svelte';
	import { MapPin } from 'phosphor-svelte';
</script>

<section
	class="flex h-[calc(90vh-var(--navbar-height))] flex-col items-start bg-background px-4 py-10 text-text dark:bg-background-dark dark:text-text-dark"
>
	<div>
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
		<p
			class="mb-6 w-full max-w-[300px] text-lg text-muted md:max-w-[350px] md:text-xl lg:max-w-[400px] dark:text-muted-dark"
		>
			I like to design clean, responsive interfaces that feel thoughtful and effortless with a
			focus on clarity and the small details that matter.
		</p>
	</div>
	<div>
		<h3
			class="w-fit border-b border-muted text-xl font-bold text-accent dark:border-muted-dark dark:text-accent-dark"
		>
			About Me
		</h3>
		<p
			class="mt-4 max-w-[300px] text-lg text-text md:max-w-[350px] lg:max-w-[400px] dark:text-text-dark"
		>
			I'm a frontend designer and developer from Porto, currently studying Informatics and Computer
			Engineering at <a href="https://www.fe.up.pt/" class="font-semibold text-accent dark:text-accent-dark hover:text-[#8c2d19] transition ">FEUP</a>. I'm still learning, and I enjoy exploring how to make digital experiences feel
			clear and intentional.
		</p>
	</div>
</section>
