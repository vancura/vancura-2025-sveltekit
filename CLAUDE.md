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

   - **Button.svelte** - A customizable button with multiple variants, sizes, and states

     - **Props**:
       - `variant`: 'primary' | 'secondary' | 'danger' | 'outline' (default: 'primary')
       - `size`: 'small' | 'medium' | 'large' (default: 'medium')
       - `disabled`: boolean (default: false)
       - `type`: 'button' | 'submit' | 'reset' (default: 'button')
       - `icon`: boolean (default: false) - Adds flex alignment for button with icons
       - `class`: string - Additional CSS classes

   - **Card.svelte** - A content container with customizable variants, headers, and footers
     - **Props**:
       - `title`: string - Optional card title displayed in the header
       - `elevated`: boolean - Adds shadow for an elevated appearance (default: false)
       - `variant`: 'default' | 'primary' | 'secondary' (default: 'default')
       - `hasFooter`: boolean - Whether to display the footer section (default: true)
       - `class`: string - Additional CSS classes
     - **Slots**:
       - Default slot: Card content
       - `footer`: Optional footer content

2. **Layout Components** (`src/lib/components/layout/`):

   - **Header.svelte** - Responsive navigation header with mobile support
     - **Props**:
       - `title`: string - Site title/logo text (default: 'My Portfolio')
       - `navItems`: Array of `{label: string, url: string}` objects for navigation links
       - `theme`: 'light' | 'dark' | 'transparent' - Color theme (default: 'light')
       - `sticky`: boolean - Whether header sticks to top while scrolling (default: false)
       - `class`: string - Additional CSS classes

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

Stories use the new `defineMeta` pattern with comprehensive examples for each component:

#### Button Component Stories

```svelte
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
        options: ['primary', 'secondary', 'danger', 'outline'],
        description: 'Button style variant',
      },
      size: {
        control: 'select',
        options: ['small', 'medium', 'large'],
        description: 'Button size',
      },
      // Additional controls with descriptions
    },
  });
</script>

<!-- Multiple stories showcasing variants -->
<Story name="Variants">
  <div class="flex flex-wrap gap-4">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="outline">Outline</Button>
  </div>
</Story>

<!-- Stories for sizes, states, icons, etc. -->
```

#### Card Component Stories

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Card from './Card.svelte';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'Card title displayed in the header',
      },
      variant: {
        control: 'select',
        options: ['default', 'primary', 'secondary'],
        description: 'Card style variant',
      },
      // Additional controls with descriptions
    },
  });
</script>

<!-- Multiple stories showcasing variants -->
<Story name="Variants">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
    <Card title="Default Variant" variant="default">
      <p class="mb-4">Default card style</p>
      <Button variant="outline" size="small">Learn More</Button>
      <svelte:fragment slot="footer">Default footer</svelte:fragment>
    </Card>
    <!-- More card variants -->
  </div>
</Story>

<!-- Stories for elevation, header/footer options, etc. -->
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
