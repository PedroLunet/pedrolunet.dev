<script>
	import SplitText from '../components/SplitText.svelte';
	import Shiny from '../components/Shiny.svelte';
	import { ArrowRight, MapPin } from 'phosphor-svelte';
	import ContactForm from '../components/Contact-form.svelte';
</script>

<section
	class="text-text flex min-h-[calc(70vh-var(--navbar-height))] flex-col gap-y-12 bg-background px-4 py-10 md:flex-row md:items-start md:justify-center md:gap-x-16 2xl:gap-x-32 2xl:px-20 2xl:py-24 3xl:px-40 3xl:py-32"
>
	<div class="flex flex-1 flex-col items-start justify-center xl:items-center xl:text-center">
		<SplitText
			text="Pedro Lunet"
			className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-8xl font-bold leading-tight text-primary"
			splitType="words"
			delay={500}
			duration={3.5}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>
		<SplitText
			text="Web Developer"
			className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 3xl:text-6xl font-bold leading-tight text-text mt-2"
			splitType="words"
			delay={500}
			duration={3.5}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>
		<div class="text-text mt-6 mb-6 flex items-center justify-center gap-2 xl:justify-center">
			<MapPin size={22} weight="bold" class="text-muted-foreground" />
			<Shiny text="Porto, Portugal" className="text-lg md:text-xl 2xl:text-2xl" speed={5} />
		</div>
		<p
			class="mx-auto mb-8 w-full max-w-[350px] text-base text-muted-foreground sm:max-w-[400px] sm:text-lg md:max-w-[500px] md:text-xl 2xl:max-w-[600px] 2xl:text-2xl"
		>
			I like to design clean, responsive interfaces that feel thoughtful and effortless with a focus
			on clarity and the small details that matter.
		</p>
	</div>
	<div class="flex flex-1 flex-col justify-center gap-y-12 xl:items-center xl:text-center">
		<div class="flex flex-col items-end justify-center xl:items-center xl:text-center">
			<h3
				class="w-fit border-b border-muted-foreground text-2xl font-bold text-primary/60 sm:text-3xl 2xl:text-4xl"
			>
				About Me
			</h3>
			<p
				class="text-text mt-6 max-w-[350px] text-end text-base sm:max-w-[400px] sm:text-lg md:max-w-[500px] md:text-xl xl:max-w-[600px] xl:text-center 2xl:text-2xl"
			>
				I'm a frontend designer and developer from Porto, currently studying Informatics and
				Computer Engineering at <a
					href="https://www.fe.up.pt/"
					class="font-semibold text-muted-foreground transition hover:text-[#8c2d19]">FEUP</a
				>. I’m always learning and enjoy exploring how to make digital experiences feel clear and
				intentional.
			</p>
			<a href="/about" class="group relative mt-4 inline-flex items-center gap-3 overflow-hidden">
				<span class="text-text relative z-10 text-lg font-extralight 2xl:text-xl"
					>Get to know me!</span
				>
				<ArrowRight
					size={24}
					weight="bold"
					class="relative z-10 text-primary transition-transform duration-300 group-hover:-translate-x-1"
				/>
				<span
					class="absolute bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
					style="width:calc(100% - 32px)"
				></span>
			</a>
		</div>
		<div class="flex flex-col justify-center xl:items-center xl:text-center md:items-end">
			<h3
				class="w-fit border-b border-muted-foreground text-2xl font-bold text-primary/60 sm:text-3xl 2xl:text-4xl"
			>
				My Work
			</h3>
			<p
				class="text-text mt-6 max-w-[350px] text-end text-base sm:max-w-[400px] sm:text-lg md:max-w-[500px] md:text-xl xl:max-w-[600px] xl:text-center 2xl:text-2xl"
			>
				You’ll find most of my work on GitHub. It's mostly university projects, both solo and in
				groups. It’s where I’ve been learning by doing, experimenting, and trying to get things just
				right.
			</p>
			<a
				href="/portefolio"
				class="group relative mt-4 inline-flex items-center gap-3 overflow-hidden"
			>
				<span class="relative">
					<span class="text-text relative z-10 text-lg font-extralight 2xl:text-xl"
						>See my projects!</span
					>
					<span
						class="absolute right-0 bottom-0 left-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
					></span>
				</span>
				<ArrowRight
					size={24}
					weight="bold"
					class="relative z-10 text-primary transition-transform duration-300 group-hover:-translate-x-1"
				/>
			</a>
		</div>
	</div>
</section>
<section class="my-10 px-6 py-20 xl:px-0 xl:py-32">
	<div class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-6 text-center">
		<h2 class="text-text mb-4 text-3xl font-semibold sm:text-4xl xl:text-5xl">Let’s Talk</h2>
		<p class="text-text mx-auto mb-6 max-w-2xl text-lg opacity-90 sm:text-xl xl:text-2xl">
			Want to work together or just say hi? I’d love to hear from you.
		</p>
		<ContactForm />
	</div>
</section>
