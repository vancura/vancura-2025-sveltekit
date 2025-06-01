import adapter from '@sveltejs/adapter-vercel';
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
        // Using Vercel adapter for optimal deployment on Vercel
        adapter: adapter({
            runtime: 'nodejs20.x',
            regions: ['iad1'],
            split: false,
        }),
        alias: {
            $lib: './src/lib',
            $content: './src/content',
        },
    },
};

export default config;
