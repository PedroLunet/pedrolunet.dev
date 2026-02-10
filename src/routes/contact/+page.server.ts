import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const message = formData.get('message') as string;

		if (!name || !email || !message) {
			return fail(400, {
				missing: true,
				error: 'All fields are required',
				values: { name, email, message }
			});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, {
				invalidEmail: true,
				error: 'Invalid email format',
				values: { name, email, message }
			});
		}

		if (!env.RESEND_API_KEY) {
			console.error('RESEND_API_KEY missing');
			return fail(500, { error: 'Server misconfiguration', values: { name, email, message } });
		}

		const resend = new Resend(env.RESEND_API_KEY);

		try {
			const result = await resend.emails.send({
				from: 'Portfolio Contact <onboarding@resend.dev>',
				to: [env.CONTACT_EMAIL || 'hello@pedrolunet.dev'],
				replyTo: email,
				subject: `[Portfolio] Message from ${name}`,
				html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>New Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>
          </div>
        `
			});

			if (result.error) {
				console.error('Resend Error:', result.error);
				return fail(500, { error: 'Failed to send email', values: { name, email, message } });
			}

			return { success: true };
		} catch (err) {
			console.error('Unexpected Error:', err);
			return fail(500, { error: 'Internal Server Error', values: { name, email, message } });
		}
	}
};
