# SvelteKit Portfolio/Blog Implementation Guide

This document provides detailed implementation instructions for working with this SvelteKit portfolio/blog project.

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

## Project Configuration

### Dependencies Organization

All packages are in `devDependencies` (SvelteKit compiles at build time)

- Project is using NPM

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

[... rest of the existing content remains unchanged ...]