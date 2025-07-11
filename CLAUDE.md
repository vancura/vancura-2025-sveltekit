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
- **Vite 6** with **CSS custom properties** and vanilla CSS
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

- Centralized ESLint, Prettier configurations
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

- Base CSS custom properties and global styles
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
npm run build:design  # → apps/design/.vercel/output/
npm run build:photos  # → apps/photos/.vercel/output/
npm run build:dev     # → apps/dev/.vercel/output/
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
- **Plugin compatibility**: Optimized prettier plugin configuration
- **Build artifact exclusion**: `.prettierignore` properly excludes `.vercel`, `.svelte-kit`
- **Workspace integration**: lint-staged uses direct prettier commands for performance

### CSS Configuration

- **Design system**: CSS custom properties with comprehensive color, spacing, and typography scales
- **Component-based styling**: Semantic CSS classes for reusable components
- **Dark mode support**: CSS media queries for automatic dark mode
- **No build-time dependencies**: Pure CSS with no compilation required

## Deployment Configuration

### Vercel Monorepo Setup

**Dashboard Deployment** (Recommended):

- Import the same repository multiple times - once for each app
- Each import creates a separate Vercel project
- Configure each with different root directories and build commands

**Build Commands for Dashboard Deployment**:

```bash
# Design app
Root Directory: apps/design
Build Command: cd ../.. && pnpm install && pnpm run build:design
Output Directory: .svelte-kit

# Photos app
Root Directory: apps/photos
Build Command: cd ../.. && pnpm install && pnpm run build:photos
Output Directory: .svelte-kit

# Dev app
Root Directory: apps/dev
Build Command: cd ../.. && pnpm install && pnpm run build:dev
Output Directory: .svelte-kit
```

**Note**: The `vercel.json` file should NOT contain a `projects` array when deploying via dashboard. That configuration is only for Vercel CLI deployments.

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
- Turbo cache issues: Ensure `.vercel/**` is in turbo.json outputs for Vercel deployments

**Import Errors**:

- Verify exports in `packages/shared-ui/package.json`
- Check component export in `packages/shared-ui/src/lib/index.ts`

**CSS Import Issues**:

- Use correct path: `@vancura/shared-ui/styles/app.css`
- Ensure styles export exists in package.json
- CSS custom properties work reliably across all apps without tree-shaking issues

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

## Performance Considerations

### SvelteKit vs Astro

**Bundle Strategy Differences**:

- **SvelteKit**: Full SPA with code-splitting, ships JS for interactivity by default
- **Astro**: Zero JS by default, opt-in interactivity with islands architecture

**Current Performance Metrics**:

- Multiple JS chunks due to automatic code-splitting (normal for SvelteKit)
- ~130KB total JS bundle size (reasonable for interactive SPA)
- ~41ms total load time (excellent performance)

**Optimization Options** (if needed):

1. Disable client-side rendering for static pages: `export const csr = false`
2. Implement lazy loading for heavy components
3. Configure manual chunks in Vite for better caching
4. Use prerendering (already enabled with adapter-vercel)

**Recommendation**: Current setup performs well. Focus on features over premature optimization unless targeting specific constraints (low bandwidth, etc.)

## IDE Setup

### VS Code/Cursor Settings

Create `.vscode/settings.json` with:

```json
{
    "typescript.preferences.includePackageJsonAutoImports": "on",
    "typescript.tsdk": "./node_modules/typescript/lib",
    "eslint.workingDirectories": [
        "apps/design",
        "apps/photos",
        "apps/dev",
        "packages/shared-ui"
    ],
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
    }
}
```

### Essential Extensions

- `svelte.svelte-vscode` - Svelte language support
- `esbenp.prettier-vscode` - Code formatting
- `dbaeumer.vscode-eslint` - Linting

## Pre-commit Hook Troubleshooting

If pre-commit hooks fail with "Cannot find package '@vancura/config'":

1. The root ESLint config uses direct file import:

    ```javascript
    export { default } from "./packages/config/eslint.config.js";
    ```

2. Lint-staged runs formatting, Turborepo handles linting:
    ```json
    "lint-staged": {
        "*.{js,ts,svelte,html,css,json,md}": "prettier --write"
    }
    ```

## Common Issues & Solutions

### TypeScript Server Errors

- TypeScript is installed at root level for IDE compatibility
- Restart TS server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

### Import Resolution

- Build shared-ui first: `pnpm run build --workspace=@vancura/shared-ui`
- Check exports in `packages/shared-ui/package.json`

### ESLint Issues

- All plugins must be in `@vancura/config/package.json`
- Storybook files excluded from TypeScript parsing in shared-ui

# important-instruction-reminders

Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (\*.md) or README files. Only create documentation files if explicitly requested by the User.
