# Václav Vančura – Monorepo

Monorepo hosting three distinct websites with shared component library.

## Sites

- **[vancura.design](https://vancura.design)** - Design portfolio
- **[vancura.photos](https://vancura.photos)** - Photography portfolio
- **[vancura.dev](https://vancura.dev)** - Development blog

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm run dev:all       # All three sites
pnpm run storybook     # Component library

# Or start individual sites
pnpm run dev:design    # localhost:5173
pnpm run dev:photos    # localhost:5174
pnpm run dev:dev       # localhost:5175
```

## Structure

```text
├── apps/
│   ├── design/       # vancura.design
│   ├── photos/       # vancura.photos
│   └── dev/          # vancura.dev
├── packages/
│   ├── shared-ui/    # Component library
│   └── config/       # Shared configurations
```

## Tech Stack

- SvelteKit 2 + Svelte 5
- TypeScript, CSS custom properties
- pnpm workspaces + Turborepo
- Vercel deployment

## Development

```bash
# Package management
pnpm add <package> --filter @vancura/design

# Code quality
pnpm run lint
pnpm run format
pnpm run type-check

# Production build
pnpm run build
```

---

**Technical Documentation**: [CLAUDE.md](./CLAUDE.md)
