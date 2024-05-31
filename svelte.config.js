import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	// kit: {
	// 	adapter: adapter(),
	// 	prerender: {
	// 		entries: ['*']
	// 	},
	// 	alias: {
	// 		"@/*": "./src/*",
	// 	},
	// }
	kit: {
		adapter: adapter(),
		target: '#svelte',
		vite: {
			resolve: {
				alias: {
					$routes: '/src/routes'
				}
			}
		}
	}
};

export default config;
