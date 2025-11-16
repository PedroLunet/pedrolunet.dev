import type { RequestHandler } from '@sveltejs/kit';
import { Resend } from 'resend';
import { env } from '$env/dynamic/private';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { name, email, message } = await request.json();

		// Validate input
		if (!name || !email || !message) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'All fields are required'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Invalid email format'
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const resendApiKey = env.RESEND_API_KEY;
		if (!resendApiKey) {
			console.error('RESEND_API_KEY is not configured');
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email service is not configured'
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const resend = new Resend(resendApiKey);

		// Send email using Resend
		const result = await resend.emails.send({
			from: 'Contact Form <onboarding@resend.dev>',
			to: [env.CONTACT_EMAIL || 'pedrolunet@gmail.com'],
			replyTo: email,
			subject: `Contact Form: Message from ${name}`,
			html: `
				<h2>New Contact Form Submission</h2>
				<p><strong>Name:</strong> ${name}</p>
				<p><strong>Email:</strong> ${email}</p>
				<p><strong>Message:</strong></p>
				<p>${message.replace(/\n/g, '<br>')}</p>
			`
		});

		if (result.error) {
			console.error('Resend error details:', JSON.stringify(result.error, null, 2));
			return new Response(
				JSON.stringify({
					success: false,
					error: `Failed to send email: ${result.error.message || JSON.stringify(result.error)}`
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		console.log('Email sent successfully:', result.data);
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Message sent successfully'
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		console.error('Contact form error:', error);
		return new Response(
			JSON.stringify({
				success: false,
				error: 'An unexpected error occurred'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
