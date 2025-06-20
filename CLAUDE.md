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

- Monorepo management only: `husky`, `lint-staged`
- Workspace scripts for cross-app commands

**Individual Apps** (`apps/*/package.json`):

- Full SvelteKit stack in `devDependencies`
- Dependency on `@vancura/shared-ui`
- Independent build/dev configurations

**Shared UI** (`packages/shared-ui/package.json`):

- Component library as ES modules
- Storybook with `@storybook/svelte-vite` framework
- Build target: library, not SvelteKit app

**Config Package** (`packages/config/package.json`):

- Centralized ESLint, Prettier, Tailwind configs
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
- **Flat config format** (ESLint 9)
- **Cross-workspace linting**: `npm run lint` runs on all packages

### TypeScript Configuration

- **Per-app tsconfig**: Extends `.svelte-kit/tsconfig.json`
- **Workspace awareness**: Monorepo TypeScript resolution
- **Strict checking**: Enabled across all packages

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

**Storybook Problems**:

- Use `@storybook/svelte-vite` framework (not sveltekit)
- Check story files match pattern in `.storybook/main.ts`
