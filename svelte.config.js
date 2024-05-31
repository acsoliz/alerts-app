import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';
import path from 'path'; // Importar el módulo path

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['*']
		},
		alias: {
			"@/*": path.resolve('src') // Utilizando el módulo path para resolver la ruta
		},
	}
};

export default config;
