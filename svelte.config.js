import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// import adapter from '@sveltejs/adapter-cloudflare';
import adapter from '@sveltejs/adapter-static';

// 
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter: adapter(),
		paths: { assets: "", base: "/PERSONAL_PATH" },
		adapter: adapter({
			// NOT HERE!
			paths: { base: "/alerts-app" },
			fallback: 'index.html',
			precompress: false,
		}),
		// adapter: adapter({
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: 'index.html'
		// }),
		prerender:
		{
			entries: ['*']
			// default: true
		},
		alias: {
			"@/*": "./src/*",
		},
	}
};

export default config;
