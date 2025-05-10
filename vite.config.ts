import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit(),
  ],
  extensions: ['.svelte', '.md', '.mdx'],
  preprocessors: [mdsvex()],
});