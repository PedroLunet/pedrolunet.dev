import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

interface Message {
	id: number;
	author: string;
	content: string;
	created_at: string;
}

const demoMessages: Message[] = [
	{
		id: 1,
		author: 'Pedro Lunet',
		content: "Welcome to the mural! Leave a message and it'll show up here.",
		created_at: 'just now'
	},
	{
		id: 2,
		author: 'Visitor',
		content: 'Love the site! The animations are super smooth.',
		created_at: '2m ago'
	},
	{
		id: 3,
		author: 'Design Friend',
		content: "That orange accent is *chef's kiss*. Great palette choice.",
		created_at: '5m ago'
	},
	{
		id: 4,
		author: 'Random Dev',
		content: 'Inspiring work, Pedro. Keep pushing pixels!',
		created_at: '12m ago'
	}
];

export const load: PageServerLoad = async () => {
	return {
		messages: demoMessages
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const message = formData.get('message') as string;

		if (!name || !message) {
			return fail(400, { missing: true, error: 'Both fields are required' });
		}

		if (name.length > 50) {
			return fail(400, { error: 'Name must be 50 characters or less' });
		}

		if (message.length > 500) {
			return fail(400, { error: 'Message must be 500 characters or less' });
		}

		return { success: true };
	}
};
