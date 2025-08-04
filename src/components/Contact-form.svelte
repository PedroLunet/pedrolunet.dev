<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
</script>

<Drawer.Root>
	<Drawer.Trigger><Button variant="outline" size="lg">Contact Me</Button></Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Contact Me</Drawer.Title>
			<Drawer.Description>I'd love to hear from you!</Drawer.Description>
		</Drawer.Header>
		<form class="flex flex-col gap-4 px-4">
			<Input type="text" placeholder="Your Name" required class="w-full" />
			<Input type="email" placeholder="Your Email" required class="w-full" />
			<Textarea placeholder="Your Message" required class="h-32 w-full" />
		</form>
		<Drawer.Footer>
			<Button>Submit</Button>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
