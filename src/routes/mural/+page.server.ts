import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

interface Message {
	id: number;
	author: string;
	content: string;
	created_at: string;
}

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.mural_db;
	if (!db) {
		return { messages: [] };
	}

	try {
		const result = await db
			.prepare('SELECT id, author, content, created_at FROM messages ORDER BY created_at DESC')
			.all<Message>();
		return { messages: result.results ?? [] };
	} catch (err) {
		console.error('D1 load error:', err);
		return { messages: [] };
	}
};

export const actions: Actions = {
	default: async ({ request, platform }) => {
		const db = platform?.env?.mural_db;
		if (!db) {
			return fail(500, { error: 'Database unavailable' });
		}

		const formData = await request.formData();

		const honeypot = formData.get('website') as string;
		if (honeypot) {
			return { success: true };
		}

		const author = (formData.get('name') as string)?.trim();
		const content = (formData.get('message') as string)?.trim();

		if (!author || !content) {
			return fail(400, { missing: true, error: 'Both fields are required' });
		}

		if (author.length > 50) {
			return fail(400, { error: 'Name must be 50 characters or less' });
		}

		if (content.length > 500) {
			return fail(400, { error: 'Message must be 500 characters or less' });
		}

		const recent = await db
			.prepare(
				"SELECT id FROM messages WHERE author = ?1 AND created_at > datetime('now', '-30 seconds')"
			)
			.bind(author)
			.all();

		if (recent.results && recent.results.length > 0) {
			return fail(429, { error: 'Please wait a moment before posting again' });
		}

		try {
			await db
				.prepare('INSERT INTO messages (author, content) VALUES (?1, ?2)')
				.bind(author, content)
				.run();

			if (env.RESEND_API_KEY) {
				try {
					const resend = new Resend(env.RESEND_API_KEY);
					await resend.emails.send({
						from: 'Mural Notification <mural@pedrolunet.dev>',
						to: [env.CONTACT_EMAIL || 'hello@pedrolunet.dev'],
						subject: `[Mural] New message from ${author}`,
						html: `
							<div style="font-family: sans-serif; padding: 20px;">
								<h2>New Mural Message</h2>
								<p><strong>Author:</strong> ${author}</p>
								<p><strong>Message:</strong><br/>${content.replace(/\n/g, '<br>')}</p>
							</div>
						`
					});
				} catch (e) {
					console.error('Mural email notification failed:', e);
				}
			}

			return { success: true };
		} catch (err) {
			console.error('D1 insert error:', err);
			return fail(500, { error: 'Failed to save message' });
		}
	}
};
