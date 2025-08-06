<script>
	import SplitText from '../../components/SplitText.svelte';
	import { ArrowRight, MapPin, GraduationCap, Code, Heart } from 'phosphor-svelte';
	import ContactForm from '../../components/Contact-form.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader } from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import Icon from '@iconify/svelte';
	import PedroLunet from '../../components/PedroLunet.svelte';

	// Skills and technologies arrays with icons
	const frontendSkills = [
		{ name: 'HTML', icon: 'simple-icons:html5' },
		{ name: 'CSS', icon: 'simple-icons:css3' },
		{ name: 'JavaScript', icon: 'simple-icons:javascript' },
		{ name: 'TypeScript', icon: 'simple-icons:typescript' },
		{ name: 'Svelte', icon: 'simple-icons:svelte' },
		{ name: 'SvelteKit', icon: 'simple-icons:svelte' },
		{ name: 'Next.js', icon: 'simple-icons:nextdotjs' },
		{ name: 'React', icon: 'simple-icons:react' },
		{ name: 'Flutter', icon: 'simple-icons:flutter' },
		{ name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss' },
		{ name: 'Drizzle ORM', icon: 'simple-icons:drizzle' }
	];

	const programmingLanguages = [
		{ name: 'PHP', icon: 'simple-icons:php' },
		{ name: 'Python', icon: 'simple-icons:python' },
		{ name: 'Java', icon: 'simple-icons:java' },
		{ name: 'C', icon: 'simple-icons:c' },
		{ name: 'C++', icon: 'simple-icons:cplusplus' }
	];

	const toolsAndLanguages = [
		{ name: 'Git', icon: 'simple-icons:git' },
		{ name: 'VS Code', icon: 'simple-icons:visualstudiocode' },
		{ name: 'Figma', icon: 'simple-icons:figma' },
		{ name: 'Node.js', icon: 'simple-icons:nodedotjs' },
		{ name: 'English (C1)', icon: 'ph:translate' },
		{ name: 'Portuguese (Native)', icon: 'ph:translate' },
		{ name: 'Spanish (Basic)', icon: 'ph:translate' }
	];
</script>

<svelte:head>
	<title>About - Pedro Lunet</title>
	<meta
		name="description"
		content="Learn more about Pedro Lunet, a web developer from Porto, Portugal, studying at FEUP."
	/>
</svelte:head>

<!-- Hero Section -->
<section
	class="text-text 3xl:px-40 3xl:py-32 flex min-h-[calc(60vh-var(--navbar-height))] flex-col items-center justify-center bg-background px-4 py-10 2xl:px-20 2xl:py-24"
>
	<div class="flex flex-col items-center justify-center text-center">
		<SplitText
			text="About Me"
			className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl 3xl:text-8xl font-bold leading-tight text-primary mb-6"
			splitType="words"
			delay={300}
			duration={2.5}
			ease="power3.out"
			from={{ opacity: 0, y: 40 }}
			to={{ opacity: 1, y: 0 }}
			threshold={0.1}
		/>
		<p class="mx-auto max-w-[600px] text-lg text-muted-foreground md:text-xl 2xl:text-2xl">
			Get to know the person behind the code
		</p>
	</div>
</section>

<!-- Main Content -->
<section class="3xl:px-40 bg-background px-4 py-16 md:px-8 2xl:px-20">
	<div class="mx-auto max-w-4xl">
		<!-- Introduction -->
		<div class="mb-16">
			<h2 class="mb-8 text-3xl font-bold text-primary sm:text-4xl 2xl:text-5xl">
				Hello, I'm Pedro
			</h2>
			<div class="grid gap-8 md:grid-cols-2 md:gap-12">
				<div>
					<p class="text-text mb-6 text-base sm:text-lg 2xl:text-xl">
						I am an Informatics and Computing Engineering student at FEUP, determined and
						enthusiastic about learning new things. I have a strong sense of responsibility and
						enjoy working in a team, and I am motivated to contribute positively in a professional
						environment.
					</p>
					<p class="text-text mb-6 text-base sm:text-lg 2xl:text-xl">
						My journey spans from full-stack development at Significa to engineering judging at F1
						In Schools. Currently in my final year, I'm passionate about creating clean, performant
						web applications and exploring modern frontend architectures.
					</p>
				</div>
				<div class="flex flex-col gap-6">
					<!-- Profile Image -->
					<div class="relative mx-auto mb-4 h-48 w-48 sm:h-56 sm:w-56 2xl:h-64 2xl:w-64">
						<div
							class="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-xl"
						></div>
						<div
							class="relative overflow-hidden rounded-full ring-4 ring-primary/10 transition-all duration-300 hover:ring-primary/20"
						>
							<PedroLunet class="h-full w-full object-cover" />
						</div>
					</div>

					<!-- Info Items -->
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-3">
							<MapPin size={24} weight="bold" class="text-primary" />
							<span class="text-text text-lg 2xl:text-xl">Porto, Portugal</span>
						</div>
						<div class="flex items-center gap-3">
							<GraduationCap size={24} weight="bold" class="text-primary" />
							<span class="text-text text-lg 2xl:text-xl">FEUP - Computer Engineering</span>
						</div>
						<div class="flex items-center gap-3">
							<Code size={24} weight="bold" class="text-primary" />
							<span class="text-text text-lg 2xl:text-xl">Full Stack Developer</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Skills & Technologies -->
		<div class="mb-16">
			<h3 class="mb-8 text-2xl font-bold text-primary sm:text-3xl 2xl:text-4xl">
				Skills & Technologies
			</h3>
			<div class="grid gap-8 md:grid-cols-3">
				<div>
					<h4 class="text-text mb-4 text-xl font-semibold 2xl:text-2xl">Frontend & Full Stack</h4>
					<div class="flex flex-wrap gap-2">
						{#each frontendSkills as skill}
							<Badge class="flex items-center gap-1.5 text-base">
								<Icon icon={skill.icon} />
								{skill.name}
							</Badge>
						{/each}
					</div>
				</div>
				<div>
					<h4 class="text-text mb-4 text-xl font-semibold 2xl:text-2xl">Programming Languages</h4>
					<div class="flex flex-wrap gap-2">
						{#each programmingLanguages as skill}
							<Badge class="flex items-center gap-1.5 text-base">
								<Icon icon={skill.icon} />
								{skill.name}
							</Badge>
						{/each}
					</div>
				</div>
				<div>
					<h4 class="text-text mb-4 text-xl font-semibold 2xl:text-2xl">Languages & Tools</h4>
					<div class="flex flex-wrap gap-2">
						{#each toolsAndLanguages as skill}
							<Badge class="flex items-center gap-1.5 text-base">
								<Icon icon={skill.icon} />
								{skill.name}
							</Badge>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- What I Love -->
		<div class="mb-16">
			<h3 class="mb-8 text-2xl font-bold text-primary sm:text-3xl 2xl:text-4xl">What Drives Me</h3>
			<div class="grid gap-6 md:grid-cols-3">
				<Card>
					<CardHeader>
						<Heart size={32} weight="bold" class="mb-4 text-primary" />
						<h4 class="text-text mb-3 text-lg font-semibold">Teamwork</h4>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							I enjoy working in teams and believe that collaboration leads to the best solutions
							and learning experiences.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<Code size={32} weight="bold" class="mb-4 text-primary" />
						<h4 class="text-text mb-3 text-lg font-semibold">Problem Solving</h4>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							I thrive on solving complex challenges and finding creative solutions to technical
							problems.
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<GraduationCap size={32} weight="bold" class="mb-4 text-primary" />
						<h4 class="text-text mb-3 text-lg font-semibold">Continuous Learning</h4>
					</CardHeader>
					<CardContent>
						<p class="text-sm text-muted-foreground">
							Determined and enthusiastic about learning new technologies and staying adaptable in a
							rapidly evolving field.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Education & Experience -->
		<div class="mb-16">
			<h3 class="mb-8 text-2xl font-bold text-primary sm:text-3xl 2xl:text-4xl">
				Experience & Education
			</h3>
			<div class="space-y-6">
				<Card>
					<CardContent>
						<div class="flex items-start justify-between">
							<div>
								<h4 class="text-text text-lg font-semibold">
									Summer Internship – Frontend Developer
								</h4>
								<p class="text-muted-foreground">Significa</p>
								<p class="mt-2 text-sm text-muted-foreground">
									Working on internal projects using Svelte and SvelteKit, deepening knowledge of
									Reactive UI Development and modern frontend architecture. Focused on maintainable
									code, routing, and component-driven design.
								</p>
							</div>
							<span class="text-sm text-primary">07/2025 - 08/2025</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div class="flex items-start justify-between">
							<div>
								<h4 class="text-text text-lg font-semibold">
									Engineering Judge – F1 In Schools 2025
								</h4>
								<p class="text-muted-foreground">F1 In Schools Regional Final</p>
								<p class="mt-2 text-sm text-muted-foreground">
									Integrated the engineering judging panel for the F1 In Schools Regional Final,
									evaluating technical designs and engineering solutions.
								</p>
							</div>
							<span class="text-sm text-primary">03/2025</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div class="flex items-start justify-between">
							<div>
								<h4 class="text-text text-lg font-semibold">
									Curricular Internship – Full Stack Developer
								</h4>
								<p class="text-muted-foreground">Significa</p>
								<p class="mt-2 text-sm text-muted-foreground">
									Developed a responsive and performant web application using Next.js, Tailwind CSS,
									and Drizzle ORM for <a href="https://dodia.pt" target="_blank">Dodia.pt</a>.
								</p>
							</div>
							<span class="text-sm text-primary">02/2025 - 06/2025</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div class="flex items-start justify-between">
							<div>
								<h4 class="text-text text-lg font-semibold">
									Informatics and Computing Engineering
								</h4>
								<p class="text-muted-foreground">
									Faculty of Engineering, University of Porto (FEUP)
								</p>
								<p class="mt-2 text-sm text-muted-foreground">
									Currently enrolled in the 3rd and final year of the Bachelor's degree. Focused on
									frontend development, web technologies, and modern software engineering practices.
								</p>
							</div>
							<span class="text-sm whitespace-nowrap text-primary">09/2023 - Present</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent>
						<div class="flex items-start justify-between">
							<div>
								<h4 class="text-text text-lg font-semibold">Electrical and Computer Engineering</h4>
								<p class="text-muted-foreground">
									Faculty of Engineering, University of Porto (FEUP)
								</p>
								<p class="mt-2 text-sm text-muted-foreground">
									Completed the first year of the Bachelor's degree before transferring to
									Informatics and Computing Engineering.
								</p>
							</div>
							<span class="text-sm whitespace-nowrap text-primary">09/2022 - 07/2023</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>

		<!-- Beyond Code -->
		<div class="mb-16">
			<h3 class="mb-8 text-2xl font-bold text-primary sm:text-3xl 2xl:text-4xl">Beyond Code</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<div>
					<h4 class="text-text mb-4 text-lg font-semibold">Sports & Activities</h4>
					<ul class="space-y-2 text-base text-muted-foreground sm:text-lg 2xl:text-xl">
						<li>• Played Roller Hockey for 8 years</li>
						<li>• Federated Bodyboard athlete for 2 years</li>
						<li>• Volunteer at VO.U Pelos Animais (2024)</li>
					</ul>
				</div>
				<div>
					<h4 class="text-text mb-4 text-lg font-semibold">Music</h4>
					<ul class="space-y-2 text-base text-muted-foreground sm:text-lg 2xl:text-xl">
						<li>• Bassist in several music projects (6+ years)</li>
						<li>• Contestant of The Voice Portugal 2022</li>
						<li>• Passionate about music production and composition</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Call to Action -->
<section class="3xl:px-40 bg-background px-4 py-20 2xl:px-20">
	<div class="mx-auto flex max-w-4xl flex-col items-center justify-center gap-y-6 text-center">
		<h2 class="text-text mb-4 text-3xl font-semibold sm:text-4xl xl:text-5xl">Let's Connect</h2>
		<p class="text-text mx-auto mb-6 max-w-2xl text-lg opacity-90 sm:text-xl xl:text-2xl">
			I'm always excited to meet new people and discuss ideas. Whether you want to collaborate on a
			project or just have a chat about web development, feel free to reach out!
		</p>
		<div class="mb-8 flex flex-col gap-4 sm:flex-row sm:gap-6">
			<Button href="/projects" variant="default" size="lg" class="group">
				{#snippet children()}
					<span class="text-lg font-medium">View My Projects</span>
					<ArrowRight size={20} weight="bold" />
				{/snippet}
			</Button>
			<Button href="https://github.com/PedroLunet" variant="outline" size="lg" class="group">
				{#snippet children()}
					<span class="text-lg font-medium">GitHub Profile</span>
					<ArrowRight size={20} weight="bold" />
				{/snippet}
			</Button>
		</div>
		<ContactForm />
	</div>
</section>
