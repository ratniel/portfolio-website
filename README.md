# Ratniel Kokane — Portfolio

A static Next.js portfolio skeleton for Ratniel Kokane. The homepage is built with the App Router, TypeScript, React Server Components, and Tailwind CSS v4.

## Requirements

- Node.js
- pnpm (version pinned in `package.json`)

Use pnpm for dependency installation and project scripts. The project uses the default Node.js runtime.

## Getting started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — App Router page, layout, and global styles
- `src/components/` — navigation and homepage sections
- `src/content/` — editable site, work, and project content

Update user-facing copy in `src/content/`. The homepage is composed in `src/app/page.tsx`.

## Keeping this README current

When a change alters the project structure, setup steps, or available scripts, update this README in the same change. Keep the structure and development instructions representative of the repository as it grows.

## Checks

```bash
pnpm lint
pnpm build
```
