# SvelteKit Monorepo Implementation Guide

Technical implementation documentation for the vancura-2025-sveltekit monorepo.

## Architecture Overview

**NPM Workspaces Monorepo** hosting three independent SvelteKit applications with shared component library:

```
apps/design/     → vancura.design (port 5173)
apps/photos/     → vancura.photos (port 5174)
apps/dev/        → vancura.dev (port 5175)
packages/shared-ui/   → Component library + Storybook (port 6006)
packages/config/      → Shared configurations
```

## Technical Stack

- **SvelteKit 2** with **Svelte 5** (apps)
- **Vite 6** with **Tailwind CSS 4** via plugin
- **TypeScript 5** with strict checking
- **Storybook 9** for component documentation
- **ESLint 9** flat config + **Prettier 3**
- **mdsvex** for MDX content support
- **Vercel adapter 5** for deployment
- **Git LFS** for media assets

## Workspace Configuration

### Dependencies Strategy

**Root Level** (`package.json`):

- Monorepo management: `husky`, `lint-staged`, `prettier`
- Centralized formatting with workspace scripts
- Cross-app development commands

**Individual Apps** (`apps/*/package.json`):

- Full SvelteKit stack in `devDependencies`
- Dependencies: `@vancura/shared-ui`, `@vancura/config`
- Minimal duplicated dependencies (cleaned up from pre-monorepo)

**Shared UI** (`packages/shared-ui/package.json`):

- Component library as ES modules
- Storybook with `@storybook/svelte-vite` framework
- Build target: library, not SvelteKit app
- Standalone TypeScript configuration

**Config Package** (`packages/config/package.json`):

- Centralized ESLint, Prettier, Tailwind configurations
- All linting/formatting plugins as dependencies
- Imported via `@vancura/config/*` pattern

### Package Exports Configuration

**Shared UI Package Exports**:

```json
{
    "exports": {
        ".": { "svelte": "./src/lib/index.ts" },
        "./components/*": { "svelte": "./src/lib/components/*" },
        "./layouts/*": { "svelte": "./src/lib/layouts/*" },
        "./styles/*": { "default": "./src/lib/styles/*" }
    }
}
```

## Development Workflow

### Component Development

**1. Create Component**:

```bash
# Create in packages/shared-ui/src/lib/components/
touch packages/shared-ui/src/lib/components/ui/NewComponent.svelte
touch packages/shared-ui/src/lib/components/ui/NewComponent.stories.svelte
```

**2. Export Component**:

```typescript
// packages/shared-ui/src/lib/index.ts
export { default as NewComponent } from "./components/ui/NewComponent.svelte";
```

**3. Import in Apps**:

```svelte
<script>
  import { NewComponent } from '@vancura/shared-ui';
</script>
```

### CSS and Styling Strategy

**Shared Styles** (`packages/shared-ui/src/lib/styles/app.css`):

- Base Tailwind imports and global styles
- Design system tokens and custom CSS

**App-Specific CSS** (`apps/*/src/app.css`):

```css
@import "@vancura/shared-ui/styles/app.css";
/* Site-specific overrides */
```

### MDX Configuration

**Layout Resolution** (`apps/*/svelte.config.js`):

```javascript
mdsvex({
    layout: {
        blog: "../../packages/shared-ui/src/lib/layouts/blog.svelte",
    },
});
```

## Build System

### Individual App Builds

```bash
npm run build:design  # → apps/design/.svelte-kit/output/
npm run build:photos  # → apps/photos/.svelte-kit/output/
npm run build:dev     # → apps/dev/.svelte-kit/output/
```

### Shared Library Build

```bash
npm run build --workspace=@vancura/shared-ui  # → packages/shared-ui/dist/
```

### Storybook Build

```bash
npm run build-storybook --workspace=@vancura/shared-ui  # → storybook-static/
```

## Configuration Management

### ESLint Setup

- **Root config**: References `@vancura/config/eslint`
- **Flat config format** (ESLint 9) with modern plugin architecture
- **Cross-workspace linting**: `npm run lint` runs on all packages
- **Shared-UI specific**: Custom config excludes Storybook files from TypeScript parsing
- **Plugin centralization**: All plugins defined in `@vancura/config` package

### TypeScript Configuration

- **Apps**: Extend `.svelte-kit/tsconfig.json` for SvelteKit integration
- **Shared-UI**: Standalone config for library builds (no SvelteKit dependency)
- **Workspace awareness**: Monorepo TypeScript resolution with proper project references
- **Strict checking**: Enabled across all packages with nullish coalescing fixes

### Prettier Configuration

- **Centralized formatting**: Root-level `prettier` command with proper ignore patterns
- **Plugin compatibility**: Resolved conflicts between tailwindcss and jsdoc plugins
- **Build artifact exclusion**: `.prettierignore` properly excludes `.vercel`, `.svelte-kit`
- **Workspace integration**: lint-staged uses direct prettier commands for performance

### Tailwind Configuration

- **Shared base config**: `packages/config/tailwind.config.js`
- **Per-app extension**: Apps can customize themes
- **Content scanning**: Configured for monorepo structure

## Deployment Configuration

### Vercel Monorepo Setup

```json
{
    "projects": [
        { "name": "vancura-design", "source": "apps/design" },
        { "name": "vancura-photos", "source": "apps/photos" },
        { "name": "vancura-dev", "source": "apps/dev" }
    ]
}
```

### Domain Mapping

- `vancura.design` → `apps/design/`
- `vancura.photos` → `apps/photos/`
- `vancura.dev` → `apps/dev/`

## Git LFS Configuration

**Media Assets** (`.gitattributes`):

```
*.jpg *.jpeg *.png *.gif *.webp *.svg filter=lfs
*.mp4 *.mov *.avi *.webm filter=lfs
*.woff *.woff2 *.ttf *.otf filter=lfs
*.pdf *.zip *.rar *.7z filter=lfs
```

## Common Commands

### Development

```bash
npm run dev:design && npm run dev:photos && npm run dev:dev  # All sites
npm run storybook     # Component library documentation
```

### Build & Deploy

```bash
npm run build         # Build all three sites
npm run preview       # Preview production builds
```

### Code Quality

```bash
npm run lint && npm run format && npm run type-check  # All workspaces
npm run lint --workspace=@vancura/design              # Specific workspace
```

### Workspace Management

```bash
npm install <package> --workspace=@vancura/design     # Add dependency
npm run <script> --workspace=@vancura/shared-ui       # Run workspace script
```

## Troubleshooting

### Common Issues

**Build Failures**:

- Ensure shared-ui builds before apps: `npm run build --workspace=@vancura/shared-ui`
- Check workspace dependency resolution in `package.json`

**Import Errors**:

- Verify exports in `packages/shared-ui/package.json`
- Check component export in `packages/shared-ui/src/lib/index.ts`

**CSS Import Issues**:

- Use correct path: `@vancura/shared-ui/styles/app.css`
- Ensure styles export exists in package.json

**ESLint Configuration Issues**:

- Missing plugins: Ensure all ESLint plugins are in `@vancura/config/package.json`
- Storybook parsing errors: Storybook files excluded from TypeScript project in shared-ui
- React warnings: Suppressed with `react.version: 'detect'` in ESLint settings

**Prettier/Formatting Issues**:

- Build directories formatted: Use root-level format script to respect `.prettierignore`
- Plugin conflicts: Removed `prettier-plugin-jsdoc` to fix infinite recursion
- Workspace formatting: Use centralized prettier command from root

**Storybook Problems**:

- Use `@storybook/svelte-vite` framework (not sveltekit)
- Check story files match pattern in `.storybook/main.ts`
- Ensure TypeScript config includes Storybook files when needed

**Pre-commit Hook Failures**:

- Verify lint-staged configuration in root `package.json`
- Check that all required plugins are installed in centralized config
- Ensure formatting and linting commands work independently
