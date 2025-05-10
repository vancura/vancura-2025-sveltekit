# Modern SvelteKit Blog/Portfolio Implementation Guide

This document provides detailed implementation instructions for working with this SvelteKit blog/portfolio project.

## Technical Stack

This project uses:

- **SvelteKit 2.20+** with **Svelte 5+** for the framework
- **Tailwind CSS 4+** via Vite plugin for styling
- **Flowbite Svelte** components for UI elements
- **Storybook 8.4+** for component testing and documentation
- **TypeScript** for type safety
- **MDX** support for blog content

## Implementation Details

### Tailwind 4 Integration

Tailwind 4 requires different configuration compared to previous versions:

1. Use `@tailwindcss/postcss` instead of direct Tailwind integration:

   ```javascript
   // postcss.config.js
   export default {
     plugins: {
       "@tailwindcss/postcss": {},
       autoprefixer: {},
     },
   };
   ```

2. Include `coreUtilities: true` in Tailwind config:

   ```javascript
   // tailwind.config.js
   export default {
     content: [
       "./src/**/*.{html,js,svelte,ts}",
       "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
     ],
     coreUtilities: true, // Enable core utilities for Tailwind 4
     presets: [require("@tailwindcss/typography")],
     theme: {
       extend: {},
     },
     plugins: [require("flowbite/plugin")],
   };
   ```

3. Use the Vite plugin for Tailwind:

   ```typescript
   // vite.config.ts
   import { sveltekit } from "@sveltejs/kit/vite";
   import { defineConfig } from "vite";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     plugins: [tailwindcss(), sveltekit()],
   });
   ```

### SvelteKit Configuration

The SvelteKit configuration uses:

```javascript
// svelte.config.js
import adapter from "@sveltejs/adapter-auto";
import { mdsvex } from "mdsvex";
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    sveltePreprocess({
      typescript: true,
      postcss: true,
    }),
    mdsvex({
      extensions: [".md", ".mdx"],
    }),
  ],

  extensions: [".svelte", ".md", ".mdx"],

  kit: {
    adapter: adapter(),
    alias: {
      $lib: "./src/lib",
      $content: "./src/content",
    },
  },
};

export default config;
```

### Component Design

Components are structured with:

1. **UI Components** (`src/lib/components/ui/`):

   - Button.svelte - A customizable button with variants and sizes
   - Card.svelte - A content container with optional title and footer

2. **Layout Components** (`src/lib/components/layout/`):

   - Header.svelte - Navigation header with customizable title and links

3. **Feature Components** (`src/lib/components/feature/`):
   - This directory is set up for future feature-specific components

### CSS Approach

Tailwind 4 supports utility classes similar to previous versions but with a more consistent implementation:

```html
<!-- Tailwind 4 with utility classes -->
<div class="max-w-4xl mx-auto px-4 py-8">
  <header class="mb-8">
    <h1 class="text-4xl font-bold">Title</h1>
  </header>
</div>
```

Key differences with Tailwind 4:

- Streamlined utility classes with the same naming conventions
- Better performance through the Vite plugin integration
- Core utilities enabled with `coreUtilities: true` in config
- Enhanced composability with modern CSS features

### Storybook Integration

Storybook is set up with modern Svelte 5 support:

```typescript
// .storybook/main.ts
import type { StorybookConfig } from "@storybook/sveltekit";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-svelte-csf",
  ],
  framework: {
    name: "@storybook/sveltekit",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

Stories use the new `defineMeta` pattern:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    // ...configuration options
  });
</script>

<Story name="Primary">
  <Button variant="primary">Primary Button</Button>
</Story>
```

### MDX Blog Support

MDX support is integrated for blog content:

1. Blog posts are stored in `src/content/`
2. Dynamic routes handle blog post rendering via `src/routes/blog/[slug]/`
3. The MDsveX preprocessor handles conversion of MDX to Svelte components

### Publishing Components

The package.json is configured for component publishing:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "svelte": "./dist/index.js"
    }
  },
  "svelte": "./dist/index.js",
  "files": ["dist"],
  "scripts": {
    "package": "svelte-package && publint",
    "prepublishOnly": "yarn package"
  }
}
```

## Troubleshooting

### Common Issues

1. **Tailwind Utility Classes Not Working**

   - Ensure Tailwind 4 is properly configured with `@tailwindcss/postcss`
   - Verify `coreUtilities: true` is set in your tailwind.config.js
   - Check that the Vite plugin for Tailwind is correctly configured

2. **MDX Content Not Rendering**

   - Ensure MDsveX is properly configured in svelte.config.js
   - Verify file extensions match the configured extensions (.md, .mdx)

3. **Build Errors**
   - Run `yarn svelte-kit sync` to refresh SvelteKit types and configuration
   - Ensure all dependencies are properly installed

### Development Commands

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn storybook` - Start Storybook
- `yarn build-storybook` - Build Storybook
- `yarn lint` - Run ESLint
- `yarn format` - Run Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn package` - Package components for distribution
