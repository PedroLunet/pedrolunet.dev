import { error } from '@sveltejs/kit';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	try {
		// Path to your CV in the static folder
		const cvPath = join(process.cwd(), 'static', 'pedro-lunet-cv.pdf');
		const pdfBuffer = readFileSync(cvPath);

		// Check if download parameter is present
		const shouldDownload = url.searchParams.get('download') === 'true';

		return new Response(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': shouldDownload
					? 'attachment; filename="Pedro-Lunet-CV.pdf"'
					: 'inline; filename="Pedro-Lunet-CV.pdf"',
				'Content-Length': pdfBuffer.length.toString()
			}
		});
	} catch (err) {
		console.error('Error serving CV:', err);
		throw error(404, 'CV not found');
	}
};
