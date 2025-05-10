# Claude CLI Bootstrap Guide: Modern SvelteKit Blog/Portfolio

This document provides comprehensive instructions for Claude CLI to assist in setting up a modern blog/portfolio using SvelteKit 2.20+, Svelte 5+, Tailwind 4+, Flowbite Svelte components, and Storybook 8.4+.

## Project Overview

Help the user create a blog/portfolio website with these specifications:

- **Framework**: SvelteKit 2.20+ with Svelte 5+
- **Styling**: Tailwind CSS 4+ via Vite plugin
- **Components**: Flowbite Svelte (native Tailwind integration)
- **Testing**: Storybook 8.4+ with proper Svelte 5 support
- **Language**: TypeScript
- **Content**: MDX support for blog posts
- **Focus**: Minimal hacks, modern versions, reusable components

## Step 1: Initialize SvelteKit Project

First, create a new SvelteKit project with the correct options:

```bash
# Use the new sv CLI to create project
npx sv@latest create [project-name]

# During setup, select:
# - TypeScript: Yes
# - Tailwind CSS: Yes
# - SvelteKit integration: Yes
# - Unit tests: Yes
# - Linting/Formatting: ESLint + Prettier
```

## Step 2: Install Dependencies

Navigate to the project and install core dependencies:

```bash
cd [project-name]

# Install Flowbite Svelte
npm install flowbite-svelte

# Install Storybook
npx storybook@latest init

# Install MDX support for blog functionality
npm install @sveltejs/adapter-auto mdsvex
npm install -D @tailwindcss/vite @tailwindcss/typography
```

## Step 3: Configure Tailwind CSS 4

Replace the default Tailwind configuration with the new Vite plugin approach:

```typescript
// vite.config.ts
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("flowbite/plugin")],
};
```

## Step 4: Configure Storybook for Svelte 5

Create proper Storybook configuration with Svelte 5 support:

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

```typescript
// .storybook/preview.ts
import type { Preview } from "@storybook/svelte";
import "../src/app.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

## Step 5: Project Structure

Set up the optimal directory structure:

```
src/
├── lib/                    # Reusable components for distribution
│   ├── components/         # Base components
│   │   ├── ui/            # Atomic UI components
│   │   ├── layout/        # Layout components
│   │   └── feature/       # Feature-specific components
│   └── index.ts           # Export all components
├── routes/                # SvelteKit routes
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Home page
│   └── blog/              # Blog routes
│       └── [slug]/        # Dynamic blog posts
├── content/               # MDX blog content
├── app.css               # Global styles
└── app.html              # HTML template
```

## Step 6: Configure MDX Support

Add MDsveX configuration to `vite.config.ts`:

```typescript
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import mdsvex from "mdsvex";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  extensions: [".svelte", ".md", ".mdx"],
  preprocessors: [mdsvex.mdsvex()],
});
```

## Step 7: Create Essential Components

Create reusable components for the blog/portfolio:

```svelte
<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
  {type}
  class="btn {variant} {size}"
  disabled={disabled}
  on:click
>
  <slot />
</button>

<style>
  .btn {
    @apply px-4 py-2 rounded transition-colors duration-200;
  }

  .primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }

  .secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }

  .danger {
    @apply bg-red-600 text-white hover:bg-red-700;
  }

  .small {
    @apply text-sm px-3 py-1;
  }

  .medium {
    @apply text-base;
  }

  .large {
    @apply text-lg px-6 py-3;
  }
</style>
```

## Step 8: Create Storybook Stories for Svelte 5

Use the modern Svelte 5 story format:

```svelte
<!-- src/lib/components/ui/Button.stories.svelte -->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { fn } from '@storybook/test';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary', 'danger'],
      },
      size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
      },
      disabled: {
        control: 'boolean',
      },
    },
    args: {
      onClick: fn(),
    },
  });
</script>

<Story name="Primary">
  <Button variant="primary">Primary Button</Button>
</Story>

<Story name="Secondary">
  <Button variant="secondary">Secondary Button</Button>
</Story>

<Story name="Disabled">
  <Button disabled>Disabled Button</Button>
</Story>
```

## Step 9: Set Up Blog Functionality

Create the blog layout and routing:

```svelte
<!-- src/routes/blog/+layout.svelte -->
<script lang="ts">
  import { page } from '$app/stores';

  $: title = $page.data.meta?.title || 'Blog';
  $: description = $page.data.meta?.description || '';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <header class="mb-8">
    <h1 class="text-4xl font-bold">{title}</h1>
  </header>

  <main>
    <slot />
  </main>
</div>
```

## Step 10: Package for Distribution

Set up your components for easy reuse across projects:

```typescript
// src/lib/index.ts
export { default as Button } from "./components/ui/Button.svelte";
export { default as Card } from "./components/ui/Card.svelte";
export { default as Header } from "./components/layout/Header.svelte";
// ... export all reusable components
```

```json
// package.json additions
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
    "prepublishOnly": "npm run package"
  }
}
```

## Common Pitfalls and Solutions

1. **ES Module vs CommonJS Issues**

   - Rename `.storybook/main.js` to `.storybook/main.cjs`
   - Use `type: "module"` in package.json

2. **Tailwind Not Working in Storybook**

   - Ensure `app.css` is imported in preview.ts
   - Include Storybook paths in Tailwind config content array

3. **SvelteKit Imports in Storybook**

   - Use `sveltekit_experimental` parameter for mocking stores
   - Avoid using SvelteKit-specific stores in components

4. **Svelte 5 Compatibility**
   - Use the new `defineMeta` pattern for stories
   - Add empty `$props` declaration if needed for Svelte 5

## Development Workflow

Provide these npm scripts for the user:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "lint": "eslint . --fix",
    "format": "prettier --write .",
    "type-check": "svelte-check"
  }
}
```

## Next Steps After Bootstrap

1. **Create Initial Components**: Start with essential UI components (Button, Card, Header, etc.)
2. **Set Up Blog Content**: Create your first MDX blog posts in the content directory
3. **Configure CI/CD**: Set up GitHub Actions for deployment to CloudFlare Pages
4. **Customize Theme**: Extend Tailwind configuration for your brand
5. **Add Advanced Features**: Implement search, tags, dark mode, etc.

## Resources for Further Development

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Svelte 5 Migration Guide](https://svelte.dev/docs/v5-migration-guide)
- [Flowbite Svelte Documentation](https://flowbite-svelte.com/)
- [Storybook Svelte Documentation](https://storybook.js.org/docs/get-started/frameworks/sveltekit)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)

This guide provides a complete foundation for creating a modern, maintainable blog/portfolio with minimal technical friction and modern best practices.
