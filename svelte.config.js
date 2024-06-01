import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	// 	prerender: {
	// 		entries: ['*']
	kit: {
		adapter: adapter(),
		alias: {
			"@/*": "./src/*",
		},
	}
};

export default config;
