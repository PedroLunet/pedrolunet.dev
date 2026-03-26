import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const url = new URL(event.request.url);

	// Redirect www to non-www
	if (url.hostname === 'www.pedrolunet.dev') {
		url.hostname = 'pedrolunet.dev';
		return new Response(null, {
			status: 301,
			headers: {
				location: url.toString()
			}
		});
	}

	// In production, ensure HTTPS (Cloudflare usually handles this but it's safe to have)
	if (
		url.protocol === 'http:' &&
		url.hostname !== 'localhost' &&
		!url.hostname.includes('.pages.dev')
	) {
		url.protocol = 'https:';
		return new Response(null, {
			status: 301,
			headers: {
				location: url.toString()
			}
		});
	}

	return await resolve(event);
};
