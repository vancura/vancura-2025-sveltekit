# Turborepo

This project uses [Turborepo](https://turbo.build/repo) to manage and optimize scripts within the monorepo.

## How it Works

Turborepo speeds up development by caching task outputs and running tasks in parallel. The configuration is defined in `turbo.json`.

### `turbo.json`

This file defines the task pipeline for the repository.

- **`build`**: This task is configured to depend on the `build` task of its internal package dependencies (indicated by `^build`). For example, before building the `@vancura/design` app, Turborepo will ensure that its dependency, `@vancura/shared-ui`, is built first. The `outputs` array (`.svelte-kit/**`, `dist/**`) tells Turborepo which folders to cache after a successful build.

- **`lint` & `type-check`**: These tasks are set to run across all workspaces. They don't have outputs defined, so Turborepo will cache their logs.

- **`dev`**: This task has caching disabled (`"cache": false`). This is standard for development tasks that start a long-running process (like a dev server) and are not meant to be cached.

### `package.json` Scripts

The root `package.json` has been updated to use `turbo` for running scripts across the monorepo. You should run these scripts using `pnpm run <script_name>` from the root of the repository.

- `pnpm run build`: Executes the `build` script in every workspace, respecting the dependency graph defined in the `pipeline`. It will use cached artifacts if the source files haven't changed.
- `pnpm run lint`: Runs the `lint` script in all workspaces in parallel.
- `pnpm run dev`: Runs the `dev` script in all workspaces in parallel.

By using `turbo`, we ensure that only the necessary work is done, which significantly speeds up build and development cycles.
