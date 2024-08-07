import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// Consult https://kit.svelte.dev/docs/integrations#preprocessors
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	vite: {
		ssr: {
			noExternal: ['three']
		}
	},
	preprocess: vitePreprocess()
};
export default config;

