import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://kit.svelte.dev/docs/integrations#preprocessors
    // for more information about preprocessors
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md', '.mdx'],
            layout: {
                blog: './src/lib/layouts/blog.svelte',
            },
        }),
    ],

    extensions: ['.svelte', '.md', '.mdx'],

    kit: {
        adapter: adapter(),
        alias: {
            $lib: './src/lib',
            $content: './src/content',
        },
    },
};

export default config;
