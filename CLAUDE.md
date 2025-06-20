# SvelteKit Monorepo Implementation Guide

This document provides detailed implementation instructions for working with this SvelteKit monorepo hosting three websites: vancura.design, vancura.photos, and vancura.dev.

## Technical Stack

- **SvelteKit 2** with **Svelte 5**
- **Tailwind CSS 4** via Vite plugin
- **Storybook 9** for component documentation
- **TypeScript 5** for type safety
- **MDX** support via mdsvex
- **ESLint 9** with flat config
- **Prettier 3** with Svelte/Tailwind plugins
- **Vercel adapter 5** for deployment
- **Vite 6** as build tool
- **Git LFS** for media asset management

## Project Configuration

### Monorepo Structure

This is an NPM workspaces monorepo with the following structure:

- **`apps/`** - Contains the three individual websites
  - `apps/design/` - vancura.design portfolio site
  - `apps/photos/` - vancura.photos photography site
  - `apps/dev/` - vancura.dev development blog
- **`packages/`** - Contains shared packages
  - `packages/shared-ui/` - Shared components and Storybook
  - `packages/config/` - Shared configuration files

### Dependencies Organization

- Root level: Only monorepo management tools (husky, lint-staged)
- Each app: Full SvelteKit dependencies (compiled at build time)
- Shared packages: Only necessary dependencies for their function
- All packages are in `devDependencies` (SvelteKit compiles at build time)
- Project uses NPM workspaces for dependency management

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

**Shared Configuration Strategy**:
- Configuration files are centralized in `packages/config/`
- Each app references shared configs via `@vancura/config/*` imports
- Tailwind, ESLint, Prettier, TypeScript, and PostCSS configs are shared
- Individual apps can extend shared configs as needed

## Development Workflow

### Starting Development

```bash
# Install all dependencies
npm install

# Start individual sites
npm run dev:design    # Port 5173
npm run dev:photos    # Port 5174  
npm run dev:dev       # Port 5175

# Start all sites simultaneously
npm run dev:all

# Start shared Storybook
npm run storybook     # Port 6006
```

### Working with Shared Components

1. **Develop components** in `packages/shared-ui/src/lib/components/`
2. **Document components** with Storybook stories
3. **Export components** from `packages/shared-ui/src/lib/index.ts`
4. **Import in apps** via `import { Component } from '@vancura/shared-ui'`

### Site-Specific Development

Each app in `apps/` is a complete SvelteKit project with:
- Own routes and pages
- Custom content and MDX files
- Site-specific styles (importing from shared-ui)
- Individual build and deployment configuration

### Deployment Strategy

- **Vercel Monorepo**: Each app deploys as separate Vercel project
- **Domain Mapping**: 
  - vancura.design → apps/design
  - vancura.photos → apps/photos  
  - vancura.dev → apps/dev
- **Shared Dependencies**: Vercel handles workspace resolution automatically

### Code Quality Commands

```bash
# Run across all workspaces
npm run lint          # ESLint all packages
npm run format        # Prettier all packages
npm run type-check    # TypeScript check all packages

# Run for specific workspace
npm run lint --workspace=@vancura/design
npm run build --workspace=@vancura/photos
```


## Git LFS Configuration

Media files are managed with Git LFS:

- Images: jpg, jpeg, png, gif, webp, svg, ico
- Videos: mp4, mov, avi, webm
- Audio: mp3, wav, flac
- Fonts: woff, woff2, ttf, otf
- Documents: pdf, zip, rar, 7z

## Component Library Management

### Shared UI Package (`@vancura/shared-ui`)

- **Components**: Reusable UI components (Button, Card, etc.)
- **Layouts**: MDX layouts for content pages
- **Styles**: Global CSS and Tailwind base styles
- **Storybook**: Component documentation and testing

### Adding New Components

1. Create component in `packages/shared-ui/src/lib/components/`
2. Create Storybook story alongside component
3. Export from `packages/shared-ui/src/lib/index.ts`
4. Document usage in Storybook
5. Import in apps as needed

### Site Customization

While components are shared, each site can:
- Override styles with site-specific CSS
- Create site-specific component variants
- Customize Tailwind theme per site
- Add site-specific layouts and pages

## Vercel Deployment Configuration

The `vercel.json` configures monorepo deployment:
- Each app deploys to separate Vercel project
- Domain mapping handled via Vercel dashboard
- Shared security headers and caching rules
- Workspace dependencies resolved automatically

## Important Commands Reference

```bash
# Monorepo Management
npm run dev:all       # Start all sites
npm run build         # Build all sites
npm run storybook     # Shared component docs

# Individual Sites  
npm run dev:design    # Design portfolio
npm run dev:photos    # Photography site
npm run dev:dev       # Development blog

# Quality Assurance
npm run lint          # Lint all workspaces
npm run format        # Format all workspaces  
npm run type-check    # Type check all workspaces
```Configuration in `.gitattributes` automatically tracks these file types.
