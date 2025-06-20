import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),
    kit: {
        files: {
            lib: 'src/lib',
        },
    },
};

export default config;
