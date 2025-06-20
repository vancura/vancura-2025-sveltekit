# Václav Vančura – Monorepo

Monorepo hosting three distinct websites: vancura.design, vancura.photos, and vancura.dev, built with modern web technologies and shared components.

## About

This monorepo contains the source code for three websites:

- **vancura.design** - Design portfolio showcasing design work and projects
- **vancura.photos** - Photography portfolio with galleries and visual content  
- **vancura.dev** - Development blog with technical writing and programming insights

All sites share a common component library and design system while maintaining their unique content and focus.

## Tech Stack

- **Framework**: SvelteKit 2 with Svelte 5
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Content**: MDX support via mdsvex
- **Component Docs**: Storybook 9
- **Package Manager**: NPM with workspaces
- **Deployment**: Vercel (monorepo optimized)
- **Media**: Git LFS for large assets

## Quick Start

```bash
# Install dependencies for all workspaces
npm install

# Start development servers
npm run dev:design    # localhost:5173 - Design site
npm run dev:photos    # localhost:5174 - Photos site  
npm run dev:dev       # localhost:5175 - Dev blog
npm run dev:all       # Start all three sites

# Run shared Storybook (localhost:6006)
npm run storybook

# Build all sites
npm run build

# Lint and format all workspaces
npm run lint
npm run format

# Type check all workspaces
npm run type-check
```

## Monorepo Structure

```
apps/
├── design/           # vancura.design site
├── photos/           # vancura.photos site
└── dev/              # vancura.dev site
packages/
├── shared-ui/        # Shared components and Storybook
└── config/           # Shared configurations
```

## Individual Sites

### vancura.design
Design portfolio featuring UI/UX work, case studies, and design insights.

### vancura.photos  
Photography portfolio with galleries, photo essays, and visual storytelling.

### vancura.dev
Technical blog covering development topics, tutorials, and programming insights.

## Shared Components

All sites use shared components from `@vancura/shared-ui`:
- UI components (Button, Card, etc.)
- Layout components (Header, Navigation)
- MDX layouts for content
- Design system and styles

## Development Workflow

1. **Shared Components**: Develop in `packages/shared-ui` with Storybook
2. **Site-Specific**: Work in individual `apps/*` directories
3. **Testing**: Use Storybook for component testing
4. **Deployment**: Each site deploys independently via Vercel monorepo

## License

© 2025 Václav Vančura. All rights reserved.

---

For detailed implementation guide and technical documentation, see [CLAUDE.md](./CLAUDE.md).
