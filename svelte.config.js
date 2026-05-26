import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			platformProxy: {
				configPath: 'wrangler.jsonc',
				environment: undefined
			}
		})
	},
	preprocess: [mdsvex()],
	extensions: ['.svelte', '.svx']
};

export default config;
