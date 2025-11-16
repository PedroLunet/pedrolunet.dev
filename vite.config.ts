import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltePhosphorOptimize } from 'phosphor-svelte/vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), sveltePhosphorOptimize()],
	ssr: {
		// Externalize these packages from the server bundle to reduce Worker size
		// They're only used in client-side pages (about page with ssr=false)
		external: ['@iconify/svelte', 'gsap']
	}
});


