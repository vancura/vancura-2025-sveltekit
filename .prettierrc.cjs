// @ts-check

/** @type {import('prettier').Config} */
module.exports = {
    // Plugins for enhanced formatting (load via require for Yarn PnP compatibility)
    plugins: [
        require.resolve('prettier-plugin-organize-imports'),
        require.resolve('prettier-plugin-svelte'),
        require.resolve('prettier-plugin-tailwindcss'),
        require.resolve('prettier-plugin-jsdoc'),
    ],

    // Basic formatting options
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    useTabs: false,
    trailingComma: 'es5',
    printWidth: 120,
    endOfLine: 'lf',

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
            },
        },
    ],
};
