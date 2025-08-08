<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Download, Eye } from 'phosphor-svelte';
</script>

<svelte:head>
	<title>CV - Pedro Lunet</title>
	<meta name="description" content="Download or view Pedro Lunet's CV and resume" />
</svelte:head>

<div class="container mx-auto max-w-4xl space-y-8">
	<div class="space-y-4 text-center">
		<h1 class="text-4xl font-bold tracking-tight">My CV</h1>
		<p class="text-lg text-muted-foreground">
			Download or view my curriculum vitae to learn more about my experience and skills.
		</p>
	</div>

	<Card class="mx-auto max-w-2xl">
		<CardHeader class="text-center">
			<CardTitle>Curriculum Vitae</CardTitle>
			<CardDescription>
				Complete overview of my professional experience, education, and skills
			</CardDescription>
		</CardHeader>
		<CardContent class="space-y-4">
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/pedro-lunet-cv.pdf" target="_blank" class="flex items-center gap-2">
					<Eye size={20} />
					View CV
				</Button>
				<Button
					href="/pedro-lunet-cv.pdf"
					download="Pedro-Lunet-CV.pdf"
					variant="outline"
					class="flex items-center gap-2"
				>
					<Download size={20} />
					Download PDF
				</Button>
			</div>

			<!-- Optional: Embed PDF viewer for larger screens -->
			<div class="mt-8 hidden lg:block">
				<div class="h-150 overflow-hidden rounded-lg border">
					<iframe
						src="/pedro-lunet-cv.pdf"
						width="100%"
						height="100%"
						class="border-0"
						title="Pedro Lunet CV"
					></iframe>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
