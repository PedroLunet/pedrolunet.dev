<script>
	import { InstagramLogo, LinkedinLogo, GithubLogo, EnvelopeSimple } from 'phosphor-svelte';
</script>

<div
	class="z-50 flex h-fit w-full flex-col items-center justify-center gap-4 p-4 font-semibold md:flex-row"
>
	<p class="text-center text-sm text-muted-foreground">Pedro Lunet</p>

	<svg
		width="6"
		height="6"
		viewBox="0 0 6 6"
		fill="currentColor"
		aria-hidden="true"
		class="mx-2 text-muted-foreground"><circle cx="3" cy="3" r="3" /></svg
	>
	<div class="flex items-center gap-3">
		<a
			href="https://www.instagram.com/pedrolunet/"
			tabindex="-1"
			aria-label="Instagram"
			class="cursor-pointer hover:opacity-80"
		>
			<InstagramLogo size={24} class="text-muted-foreground" />
		</a>
		<a
			href="https://www.linkedin.com/in/pedrolunet/"
			tabindex="-1"
			aria-label="LinkedIn"
			class="cursor-pointer hover:opacity-80"
		>
			<LinkedinLogo size={24} class="text-muted-foreground" />
		</a>
		<a
			href="https://github.com/pedrolunet"
			tabindex="-1"
			aria-label="GitHub"
			class="cursor-pointer hover:opacity-80"
		>
			<GithubLogo size={24} class="text-muted-foreground" />
		</a>
		<a
			href="mailto:pedrolunet@gmail.com"
			tabindex="-1"
			aria-label="Email"
			class="cursor-pointer hover:opacity-80"
		>
			<EnvelopeSimple size={24} class="text-muted-foreground" />
		</a>
	</div>
</div>
