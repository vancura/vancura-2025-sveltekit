import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        vitePreprocess(),
        mdsvex({
            extensions: ['.md', '.mdx'],
            layout: {
                blog: '../../packages/shared-ui/src/lib/layouts/blog.svelte',
            },
        }),
    ],

    extensions: ['.svelte', '.md', '.mdx'],

    kit: {
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