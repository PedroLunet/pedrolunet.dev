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
			} else {
				errorMsg = data.error || 'Failed to send message.';
			}
		} catch (err) {
			errorMsg = 'Network error.';
		}
		loading = false;
	}
</script>

<Drawer.Root>
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
			{#if loading}
				<span class="text-sm text-gray-500">Sending...</span>
			{/if}
			{#if success}
				<span class="text-sm text-green-600">Message sent successfully!</span>
			{/if}
			{#if errorMsg}
				<span class="text-sm text-red-600">{errorMsg}</span>
			{/if}
		</form>
		<Drawer.Footer>
			<Button type="submit" form="contact-form" disabled={loading}>Submit</Button>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
