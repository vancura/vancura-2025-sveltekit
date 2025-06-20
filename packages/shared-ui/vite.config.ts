import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [svelte()],
    build: {
        lib: {
            entry: 'src/lib/index.ts',
            name: 'SharedUI',
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['svelte', 'svelte/internal'],
        },
    },
});
