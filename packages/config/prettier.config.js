/** @type {import('prettier').Config} */
export default {
    // Basic formatting options
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    useTabs: false,
    trailingComma: 'es5',
    printWidth: 120,
    endOfLine: 'lf',
    plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
    // File-specific overrides
    overrides: [
        // Markdown and MDX files
        {
            files: ['*.md', '*.mdx'],
            options: {
                parser: 'markdown',
                proseWrap: 'preserve',
                printWidth: 80,
                tabWidth: 2,
            },
        },
        // JSON files
        {
            files: ['*.json', '*.jsonc'],
            options: {
                tabWidth: 2,
                parser: 'json',
            },
        },
        // YAML files
        {
            files: ['*.yml', '*.yaml'],
            options: {
                tabWidth: 2,
                parser: 'yaml',
            },
        },
        // Svelte files
        {
            files: ['*.svelte'],
            options: {
                parser: 'svelte',
                svelteStrictMode: false,
                svelteAllowShorthand: true,
                svelteIndentScriptAndStyle: true,
                printWidth: 2000,
            },
        },
    ],
};
