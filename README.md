# Václav Vančura – Design Portfolio

Personal portfolio and blog showcasing design and development work, built with modern web technologies.

## About

This is the source code for [vancura.design](https://vancura.design), featuring:

- Portfolio showcasing design work and projects
- Technical blog with MDX support and interactive components
- Modern, performant architecture optimized for Vercel
- Component-driven development with Storybook

## Tech Stack

- **Framework**: SvelteKit
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Content**: MDX support via mdsvex
- **Component Docs**: Storybook
- **Deployment**: Vercel (optimized with adapter)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (localhost:5173)
npm run dev

# Run Storybook (localhost:6006)
npm run storybook

# Type check
npm run type-check

# Lint and format
npm run lint
npm run format

# Build for production
npm run build
npm run preview  # Preview production build
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ui/        # Reusable UI components
│   │   ├── layout/    # Layout components
│   │   └── feature/   # Feature-specific components
│   └── layouts/       # MDX layouts
├── routes/            # SvelteKit pages
├── content/           # Blog content (MDX)
└── app.css           # Global styles
```

## Features

- **Design System**: Custom color palette with Tailwind CSS
- **Type Safety**: Full TypeScript support with strict checking
- **Code Quality**: ESLint + Prettier with auto-formatting
- **Component Testing**: Storybook with interactive controls
- **Blog Platform**: MDX support for rich content
- **Performance**: Optimized builds with Vercel adapter
- **Developer Experience**: Hot reload, type checking, and linting

## License

© 2025 Václav Vančura. All rights reserved.

---

For detailed implementation guide and technical documentation, see [CLAUDE.md](./CLAUDE.md).
