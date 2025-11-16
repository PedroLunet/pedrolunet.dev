import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { name, email, message } = await request.json();

	// Note: nodemailer doesn't work on Cloudflare Pages
	// You'll need to integrate with an email service like:
	// - Resend (https://resend.com)
	// - SendGrid API
	// - Mailgun API
	// - Or use Cloudflare Email Workers
	
	return new Response(
		JSON.stringify({ 
			success: false, 
			error: 'Email service needs to be configured for Cloudflare Pages. Please use Resend, SendGrid, or another compatible service.' 
		}),
		{ status: 501 }
	);
};
