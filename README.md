# Václav Vančura – Monorepo

Monorepo hosting three distinct websites: vancura.design, vancura.photos, and vancura.dev, with shared component library and modern web technologies.

## About

This monorepo contains the source code for three specialized websites:

- **vancura.design** - Design portfolio showcasing UI/UX work and design insights
- **vancura.photos** - Photography portfolio with galleries and visual storytelling
- **vancura.dev** - Development blog with technical writing and programming tutorials

All sites share a common component library and design system while maintaining their unique content focus.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5
- **Styling**: Tailwind CSS 4 via Vite plugin
- **Language**: TypeScript 5 with strict checking
- **Content**: MDX support via mdsvex
- **Components**: Storybook 9 for documentation
- **Package Manager**: NPM workspaces
- **Deployment**: Vercel monorepo
- **Assets**: Git LFS for media files

## Quick Start

```bash
# Install all dependencies
npm install

# Development servers
npm run dev:design    # vancura.design on localhost:5173
npm run dev:photos    # vancura.photos on localhost:5174
npm run dev:dev       # vancura.dev on localhost:5175
npm run dev:all       # Start all three sites

# Component development
npm run storybook     # Shared components on localhost:6006

# Production builds
npm run build         # Build all three sites
npm run build:design  # Build specific site

# Code quality
npm run lint && npm run format && npm run type-check
```

## Monorepo Structure

```
├── apps/
│   ├── design/       # vancura.design - Design portfolio
│   ├── photos/       # vancura.photos - Photography site
│   └── dev/          # vancura.dev - Development blog
├── packages/
│   ├── shared-ui/    # Component library with Storybook
│   └── config/       # Shared configurations
└── .gitattributes    # Git LFS for media assets
```

## Development Workflow

### Shared Components

- Develop in `packages/shared-ui/src/lib/components/`
- Document with Storybook stories
- Export from `packages/shared-ui/src/lib/index.ts`
- Import via `import { Component } from '@vancura/shared-ui'`

### Site-Specific Work

- Each app is independent SvelteKit project
- Custom routes, content, and styling
- Site-specific MDX content and layouts
- Individual deployment configuration

### Component Library Features

- Reusable UI components (Button, Card, Header)
- MDX layouts for consistent content presentation
- Shared Tailwind design system and CSS
- Interactive Storybook documentation

## Deployment

Each site deploys independently via Vercel:

- **vancura.design** → `apps/design/`
- **vancura.photos** → `apps/photos/`
- **vancura.dev** → `apps/dev/`

Vercel automatically handles workspace dependencies and builds.

## License

© 2025 Václav Vančura. All rights reserved.

---

📖 **Technical Documentation**: [CLAUDE.md](./CLAUDE.md)
