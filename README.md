# Ratniel Kokane — Portfolio

A Next.js portfolio for Ratniel Kokane. The homepage combines a server-rendered content skeleton with a progressively enhanced, scroll-linked space scene.

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
- `src/components/` — navigation, homepage sections, and the isolated visual experience
- `src/content/` — editable site, work, and project content

Update user-facing copy in `src/content/`. The homepage is composed in `src/app/page.tsx`.

The fixed, scroll-linked visual layer lives under `src/components/experience/`. Its hero artwork is stored in `public/images/black-hole-hero.jpg`. The experience is loaded client-side, remains independent of the page content, and falls back to a static scene when reduced motion is requested or WebGL is unavailable.

## Keeping this README current

When a change alters the project structure, setup steps, or available scripts, update this README in the same change. Keep the structure and development instructions representative of the repository as it grows.

## Checks

```bash
pnpm lint
pnpm build
```
