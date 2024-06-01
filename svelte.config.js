import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';
// import adapter from '@sveltejs/adapter-auto';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	// prerender: {
	// 	entries: ['*']
	// },
	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<all>']
			},
			// platformProxy: {
			// 	persist: './your-custom-path'
			// },
			alias: {
				"@/*": "./src/*",
			},
		})
	}
};

export default config;