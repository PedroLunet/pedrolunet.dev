<script>
	import SplitText from '../components/SplitText.svelte';
	import Shiny from '../components/Shiny.svelte';
	import { ArrowRight, MapPin } from 'phosphor-svelte';
</script>

<section
	class="text-text flex min-h-[calc(80vh-var(--navbar-height))] flex-col bg-background px-4 py-10 md:flex-row md:items-start md:justify-around md:gap-x-8"
>
	<div>
		<div class="flex h-fit flex-col items-start justify-center">
			<SplitText
				text="Pedro Lunet"
				className=" text-3xl font-bold md:text-5xl leading-tight text-primary"
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
				className="text-2xl font-bold **:md:text-4xl leading-tight text-text"
				splitType="words"
				delay={60}
				duration={0.8}
				ease="power3.out"
				from={{ opacity: 0, y: 40 }}
				to={{ opacity: 1, y: 0 }}
				threshold={0.1}
			/>
			<div class="text-text mt-4 mb-4 flex items-center gap-1">
				<MapPin size={18} weight="bold" class="text-muted-foreground" />
				<Shiny text="Porto, Portugal" className="text-lg md:text-xl" speed={5} />
			</div>
		</div>
		<p
			class="mb-6 w-full max-w-[300px] text-base text-muted-foreground md:max-w-[350px] md:text-lg lg:max-w-[400px]"
		>
			I like to design clean, responsive interfaces that feel thoughtful and effortless with a focus
			on clarity and the small details that matter.
		</p>
	</div>
	<div>
		<div class="mt-5 flex flex-col items-end justify-center">
			<h3 class="w-fit border-b border-muted-foreground text-xl font-bold text-primary/60">
				About Me
			</h3>
			<p class="text-text mt-4 max-w-[300px] text-end text-base md:max-w-[350px] lg:max-w-[400px]">
				I'm a frontend designer and developer from Porto, currently studying Informatics and
				Computer Engineering at <a
					href="https://www.fe.up.pt/"
					class="font-semibold text-muted-foreground transition hover:text-[#8c2d19]">FEUP</a
				>. I’m always learning and enjoy exploring how to make digital experiences feel clear and
				intentional.
			</p>
			<a href="/about" class="group relative mt-2 inline-flex items-center gap-2 overflow-hidden">
				<span class="text-text relative z-10 font-extralight">Get to know me!</span>
				<ArrowRight
					size={20}
					weight="bold"
					class="relative z-10 text-primary transition-transform duration-300 group-hover:-translate-x-1"
				/>
				<span
					class="absolute bottom-0 left-0 h-[1px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
					style="width:calc(100% - 28px)"
				></span>
			</a>
		</div>
		<div class="mt-5 flex flex-col justify-center md:items-end">
			<h3 class="w-fit border-b border-muted-foreground text-xl font-bold text-primary/60">
				My Work
			</h3>
			<p
				class="text-text mt-4 max-w-[300px] text-base md:max-w-[350px] md:text-end lg:max-w-[400px]"
			>
				You’ll find most of my work on GitHub. It's mostly university projects, both solo and in
				groups. It’s where I’ve been learning by doing, experimenting, and trying to get things just
				right.
			</p>
			<a
				href="/portefolio"
				class="group relative mt-2 inline-flex items-center gap-2 overflow-hidden"
			>
				<span class="relative">
					<span class="text-text relative z-10 font-extralight">See my projects!</span>
					<span
						class="absolute right-0 bottom-0 left-0 h-[1px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
					></span>
				</span>
				<ArrowRight
					size={20}
					weight="bold"
					class="relative z-10 text-primary transition-transform duration-300 group-hover:-translate-x-1"
				/>
			</a>
		</div>
	</div>
</section>
<section class="my-5 px-6 py-20">
	<div class="mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
		<h2 class="text-text mb-4 text-3xl font-semibold">Let’s Talk</h2>
		<p class="text-text mb-6 text-lg opacity-90">
			Want to work together or just say hi? I’d love to hear from you.
		</p>
		<a
			href="/contact"
			class="rounded-2xl border border-primary px-6 py-2 text-primary transition hover:bg-accent/10"
		>
			Contact Me
		</a>
	</div>
</section>
