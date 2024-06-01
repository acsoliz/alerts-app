import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		outDir: 'build',
		rollupOptions: {
			input: {
				main: './src/routes/login/+page.svelte'
			},
			onwarn: (warning, handler) => {
				console.log('delete to devploy. Build warning::::', warning);
				handler(warning);
			},
			output: {
				// Opcionalmente puedes agregar un hook de salida para depuración
				intro: `console.log('Build starting...');`,
				outro: `console.log('Build finished.');`
			}
		}
	}
});
