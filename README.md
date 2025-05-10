# Modern SvelteKit Blog/Portfolio

A modern blog/portfolio website built with SvelteKit 2.20+, Svelte 5+, Tailwind CSS 4+, Flowbite Svelte components, and Storybook 8.4+.

## Features

- **Framework**: SvelteKit 2.20+ with Svelte 5+
- **Styling**: Tailwind CSS 4+ via Vite plugin
- **Components**: Flowbite Svelte (native Tailwind integration)
- **Testing**: Storybook 8.4+ with proper Svelte 5 support
- **Language**: TypeScript
- **Content**: MDX support for blog posts

## Getting Started

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Start Storybook
yarn storybook

# Build for production
yarn build

# Preview production build
yarn preview
```

## Project Structure

```
src/
├── lib/                    # Reusable components for distribution
│   ├── components/         # Base components
│   │   ├── ui/            # Atomic UI components
│   │   ├── layout/        # Layout components
│   │   └── feature/       # Feature-specific components
│   └── index.ts           # Export all components
├── routes/                # SvelteKit routes
│   ├── +layout.svelte     # Root layout
│   ├── +page.svelte       # Home page
│   └── blog/              # Blog routes
│       └── [slug]/        # Dynamic blog posts
├── content/               # MDX blog content
├── app.css               # Global styles
└── app.html              # HTML template
```

## Development Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn storybook` - Start Storybook
- `yarn build-storybook` - Build Storybook
- `yarn lint` - Run ESLint
- `yarn format` - Run Prettier
- `yarn type-check` - Run TypeScript type checking
- `yarn package` - Package components for distribution
