# Modern SvelteKit Blog/Portfolio

A modern blog/portfolio website template built with cutting-edge web technologies.

## Overview

This project provides a foundation for creating a modern blog or portfolio website with:

- **SvelteKit 2.20+** with **Svelte 5+** for enhanced reactivity and performance
- **Tailwind CSS 4+** using the new Vite plugin architecture
- **Flowbite Svelte** components for rapid UI development
- **Storybook 8.4+** for component development and testing
- **TypeScript** for code quality and developer experience
- **MDX** support for rich content authoring
- **Inter Font** from Google Fonts for beautiful typography

## Quick Start

```bash
# Install dependencies
yarn

# Start development server
yarn dev

# Start Storybook component browser
yarn storybook
```

## Key Features

- **Modern Stack**: Uses the latest versions of SvelteKit, Svelte 5, and Tailwind 4
- **Component Library**: Includes ready-made UI components (Button, Card, Header) with Tailwind styling
- **Blog Ready**: Built-in MDX support with dynamic routing for blog posts
- **Developer Experience**: Type safety, component stories, and full build pipeline
- **Tailwind 4 Integration**: Fully implemented with utility classes instead of inline styles
- **Beautiful Typography**: Powered by Inter font (preloaded from Google Fonts)
- **Enhanced UI**: Modern styling with soft shadows, consistent color palette, and smooth transitions

## Documentation

For detailed implementation information, troubleshooting, and advanced usage, see the [Implementation Guide](./CLAUDE.md).

## Project Structure

```
src/
├── lib/                    # Reusable components for distribution
│   ├── components/         # UI and layout components
│   └── index.ts           # Component exports
├── routes/                # SvelteKit routes
├── content/               # MDX blog content
└── app.css               # Global styles
```
