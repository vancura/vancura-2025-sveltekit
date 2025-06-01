# SvelteKit Portfolio/Blog Implementation Guide

This document provides detailed implementation instructions for working with this SvelteKit portfolio/blog project.

## Technical Stack

- **SvelteKit 2.21+** with **Svelte 5.33+** for the framework
- **Tailwind CSS 4.1.8** via Vite plugin for styling
- **Storybook 8.6.14** for component testing and documentation
- **TypeScript** for type safety
- **MDX** support for blog content via mdsvex
- **Inter Font** from Google Fonts for typography
- **ESLint 9.28+** with comprehensive rules for code quality
- **Prettier 3.5.3** with full plugin support for formatting
- **Yarn 4.9.1** with Plug'n'Play (PnP) for package management
- **Vercel adapter** for optimized deployment

## Project Configuration

### Dependencies Organization

All packages are in `devDependencies` as this is a SvelteKit project that compiles at build time:

- All Storybook packages (8.6.14)
- ESLint and plugins with comprehensive rules
- Prettier with plugins for Svelte, Tailwind, imports, and JSDoc
- Tailwind CSS 4.1.8 with Vite integration
- TypeScript and related tooling

### Code Quality Setup

**ESLint Configuration** (`eslint.config.js`):

- ESLint 9 flat config format (ES modules)
- Moderate TypeScript strictness
- Import sorting with perfectionist plugin
- JSDoc enforcement for functions and classes
- Security rules (with safe suppressions for component patterns)
- Code complexity limits (max 15)
- Markdown/MDX file linting enabled
- Storybook integration maintained

**Prettier Configuration** (`.prettierrc.cjs`):

- Tab width: 4 (2 for JSON/YAML/Markdown)
- Single quotes
- Trailing commas
- 120 character line width (80 for Markdown)
- Full plugin support via require.resolve() for Yarn PnP compatibility:
  - `prettier-plugin-organize-imports` - Auto-organizes imports
  - `prettier-plugin-svelte` - Formats Svelte components
  - `prettier-plugin-tailwindcss` - Sorts Tailwind classes
  - `prettier-plugin-jsdoc` - Formats JSDoc comments

### Tailwind 4 Setup

Using Tailwind 4 with the Vite plugin:

```typescript
// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

```javascript
// tailwind.config.js
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md,mdx}'],
  coreUtilities: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui' /* ... */],
      },
      colors: {
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          // ... full purple palette
          950: '#3b0764',
        },
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### MDX/Blog Setup

MDX is configured through mdsvex:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
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
    // Using Vercel adapter for optimal deployment
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
```

### PostCSS Configuration

Simple configuration for Tailwind 4:

```javascript
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

## Project Structure

```
src/
├── lib/                    # Reusable components
│   ├── components/         # UI and layout components
│   │   ├── ui/            # Button, Card, etc.
│   │   └── layout/        # Header, Footer, etc.
│   ├── layouts/           # MDX layouts
│   │   └── blog.svelte    # Blog post layout
│   └── index.ts           # Component exports
├── routes/                # SvelteKit routes
│   ├── +page.svelte      # Homepage
│   └── blog/             # Blog section
│       ├── +page.svelte  # Blog listing
│       └── [slug]/       # Dynamic blog routes
├── content/              # MDX blog content
└── app.css              # Global styles with Tailwind
```

## Component Development

### Component Patterns

Components follow consistent patterns with proper TypeScript and ESLint compliance:

```svelte
<!-- Example: Button.svelte -->
<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' | 'outline' =
    'primary';
  export let size: 'small' | 'medium' | 'large' = 'medium';
  export let disabled = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let icon = false;
  let className = '';
  export { className as class };

  // Reactive classes based on props
  $: variantClasses = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 /* ... */',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 /* ... */',
    // ...
  }[variant];

  $: sizeClasses = {
    small: 'text-xs px-2.5 py-1.5 rounded-md',
    medium: 'text-sm px-4 py-2 rounded-md',
    large: 'text-base px-6 py-3 rounded-md',
  }[size];
</script>

<button
  {type}
  {disabled}
  class="font-medium shadow-sm transition-all duration-200 {variantClasses} {sizeClasses} {className}"
  on:click
>
  <slot />
</button>
```

### Key Implementation Notes

- All `{#each}` blocks must have keys for performance: `{#each items as item (item.id)}`
- Use proper TypeScript types for all props
- Follow naming conventions (camelCase for variables, PascalCase for components)
- Security warnings about object injection in component variant patterns are safe to ignore

### Storybook Stories

Using the modern Svelte CSF format:

```svelte
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Button from './Button.svelte';

  const { Story } = defineMeta({
    title: 'UI/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
      variant: {
        control: 'select',
        options: ['primary', 'secondary', 'danger', 'outline'],
      },
    },
  });
</script>

<Story name="Default">
  <Button>Click me</Button>
</Story>
```

## Blog Implementation

### Writing Blog Posts

Create MDX files in `src/content/` with frontmatter:

```mdx
---
title: My First Blog Post
date: 2025-01-06
description: An introduction to my new blog
author: Václav Vančura
---

# Hello World

This is my first blog post with **MDX support**.

<script>import Button from '$lib/components/ui/Button.svelte';</script>

<Button variant="primary">Interactive Button</Button>
```

### Blog Layout

The blog layout (`src/lib/layouts/blog.svelte`) provides consistent styling:

```svelte
<script lang="ts">
  export let title: string = '';
  export let date: string = '';
  export let description: string = '';
  export let author: string = 'Václav Vančura';
</script>

<article class="mx-auto max-w-4xl px-4 py-8">
  <header class="mb-8 text-center">
    <h1 class="mb-4 text-4xl font-bold">{title}</h1>
    <!-- Date, author, description display -->
  </header>

  <div class="prose prose-lg mx-auto">
    <slot />
  </div>
</article>
```

## Development Workflow

### Commands

- `yarn dev` - Start development server at localhost:5173
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn storybook` - Start Storybook at localhost:6006
- `yarn lint` - Run ESLint with auto-fix
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking

### Code Quality Workflow

1. **Development**: ESLint runs on save with comprehensive rules
2. **Pre-commit**: Format code with Prettier
3. **Component development**: Test in Storybook
4. **Type safety**: TypeScript checking with `yarn type-check`

### Adding New Components

1. Create component in appropriate directory:

   - `src/lib/components/ui/` for UI components
   - `src/lib/components/layout/` for layout components
   - `src/lib/components/feature/` for feature-specific components

2. Export from `src/lib/index.ts` if needed globally

3. Create a `.stories.svelte` file for Storybook

4. Follow ESLint rules:
   - Add JSDoc documentation for functions
   - Use proper TypeScript types
   - Add keys to `{#each}` blocks
   - Follow naming conventions

### Creating Blog Posts

1. Add `.mdx` file to `src/content/`
2. Include frontmatter with title, date, description
3. The blog layout will be automatically applied
4. Access via `/blog/[filename]` route

## Deployment

### Vercel Deployment (Optimized)

The project uses `@sveltejs/adapter-vercel` for optimal Vercel deployment:

**Configuration files:**

- `vercel.json` - Build settings, security headers, caching rules
- `.vercelignore` - Excludes unnecessary files from deployment

**Key optimizations:**

- Node.js 20.x runtime for fast cold starts
- Security headers (XSS protection, frame options)
- Static asset caching (1 year for `/static/*`)
- API function runtime configuration
- Minimal deployment bundle

**Deployment:**

```bash
yarn build  # Test build locally
# Deploy via Vercel CLI or GitHub integration
```

**Build output:** `.svelte-kit/vercel-tmp/` contains the optimized Vercel functions.

## Troubleshooting

### ESLint Issues

- **Markdown parsing errors**: Normal for frontmatter syntax - can be ignored
- **Security warnings**: Object injection warnings for component patterns are false positives
- **`$page` deprecation**: False positive - `$page` from `$app/stores` is correct usage
- **JSDoc parameter warnings**: Sometimes occurs with destructured parameters

### Tailwind Classes Not Working

- Ensure file is included in `content` array in tailwind.config.js
- Check that Tailwind Vite plugin is loaded before SvelteKit in vite.config.ts
- Verify `@tailwind` directives are in app.css

### MDX Not Rendering

- File must have `.md` or `.mdx` extension
- Verify mdsvex is configured in svelte.config.js
- Check that frontmatter is valid YAML

### Storybook Issues

- Clear `.storybook-static` directory
- Ensure story files match pattern `*.stories.svelte`
- Check that component exports match imports

### Package Management

**Yarn 4.9.1 with Plug'n'Play (PnP):**

- All dependencies are in `devDependencies` for SvelteKit projects
- Yarn PnP enabled for faster installs and smaller node_modules
- Prettier plugins configured with `require.resolve()` for PnP compatibility
- `.pnp.cjs` and `.pnp.loader.mjs` files are auto-generated (keep them)
- Use `yarn` as the package manager (configured in packageManager field)
- Storybook 8.6.14 is stable - avoid upgrading to Storybook 9 (has breaking changes)

**PnP Configuration (`.yarnrc.yml`):**

- `pnpMode: strict` for better module resolution
- `pnpFallbackMode: dependencies-only` for plugin compatibility
- ESM loader enabled for modern JavaScript support

## Recent Changes & Cleanup

### Major Cleanup Performed (January 2025)

1. **Configuration Cleanup**:

   - Removed duplicate config files (.cjs versions)
   - Updated to ESLint 9 flat config format
   - Proper Tailwind 4 integration with Vite plugin
   - MDX support fully configured
   - Prettier plugin integration fixed for Yarn PnP

2. **Dependencies Reorganization**:

   - Moved all dev tools to devDependencies
   - Removed Flowbite (not needed for custom portfolio)
   - Removed package publishing configuration
   - Updated all packages to latest stable versions
   - Switched to Yarn 4.9.1 with Plug'n'Play

3. **Code Quality Improvements**:

   - Fixed all ESLint errors in components
   - Added proper keys to each blocks
   - Improved JSDoc documentation
   - Removed unused variables
   - Full Prettier formatting working with all plugins

4. **Vercel Optimization**:

   - Switched from `@sveltejs/adapter-auto` to `@sveltejs/adapter-vercel`
   - Added `vercel.json` with security headers and caching
   - Added `.vercelignore` for optimized deployments
   - Configured Node.js 20.x runtime

5. **Files Removed/Cleaned**:
   - `dist/` folder (build artifacts)
   - Duplicate Tailwind and PostCSS configs
   - Legacy ESLint configuration files
   - Unmaintained packages (optimize-regex, organize-attributes)
   - Enhanced `.gitignore` and `.prettierignore` with better organization

**Current State:** The project is production-ready with:

- ✅ All linting and formatting working
- ✅ Optimized Vercel deployment configuration
- ✅ Modern Yarn PnP package management
- ✅ Comprehensive code quality tools
- ✅ Clean, well-documented configuration files
