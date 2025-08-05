<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';

	let name = '';
	let email = '';
	let message = '';
	let loading = false;
	let success = false;
	let errorMsg = '';
	let drawerOpen = false;

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		errorMsg = '';
		success = false;
		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, message })
			});
			const data = await res.json();
			if (data.success) {
				success = true;
				name = '';
				email = '';
				message = '';
				// Show success message briefly before closing
				setTimeout(() => {
					drawerOpen = false;
					success = false;
				}, 1500);
			} else {
				errorMsg = data.error || 'Failed to send message.';
			}
		} catch (err) {
			errorMsg = 'Network error.';
		}
		loading = false;
	}
</script>

<Drawer.Root bind:open={drawerOpen}>
	<Drawer.Trigger><Button variant="outline" size="lg">Contact Me</Button></Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Contact Me</Drawer.Title>
			<Drawer.Description>I'd love to hear from you!</Drawer.Description>
		</Drawer.Header>
		<form id="contact-form" class="flex flex-col gap-4 px-4" on:submit={handleSubmit}>
			<Input type="text" placeholder="Your Name" bind:value={name} required class="w-full" />
			<Input type="email" placeholder="Your Email" bind:value={email} required class="w-full" />
			<Textarea placeholder="Your Message" bind:value={message} required class="h-32 w-full" />
			{#if errorMsg}
				<span class="text-sm text-red-600">{errorMsg}</span>
			{/if}
		</form>
		<Drawer.Footer>
			<Button type="submit" form="contact-form" disabled={loading || success}>
				{#if loading}
					<svg
						class="mr-2 -ml-1 h-4 w-4 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Sending...
				{:else if success}
					<svg
						class="mr-2 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					Sent!
				{:else}
					Submit
				{/if}
			</Button>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
