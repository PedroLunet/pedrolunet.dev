import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

const GMAIL_USER = env.GMAIL_USER;
const GMAIL_PASS = env.GMAIL_PASS;

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, message } = await request.json();

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: GMAIL_USER,
			pass: GMAIL_PASS
		}
	});

	try {
		await transporter.sendMail({
			from: email,
			to: GMAIL_USER,
			subject: `Contact Form Submission from ${name}`,
			text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
		});
		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ success: false, error: String(error) }), { status: 500 });
	}
};
