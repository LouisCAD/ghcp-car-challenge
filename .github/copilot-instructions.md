# Copilot Instructions — Météo des Neiges

## Project Overview

This is a **static** ski-resort weather dashboard ("Météo des Neiges") for resorts near Geneva.
It is deployed to **GitHub Pages** via a GitHub Actions workflow on every push to `main`.
Use the web tools available to you to reasearch APIs that provide weather data for ski resorts, and implement the app according to the conventions and tech stack described below.
If tools are missing or you have questions about the requirements, ask the user for clarification before proceeding.

## Tech Stack (do NOT change)

| Layer        | Technology                                       | Notes                                                                    |
|--------------|--------------------------------------------------|--------------------------------------------------------------------------|
| Framework    | **React 19**                                     | Functional components with hooks only; no class components               |
| Language     | **TypeScript** (strict)                          | All source files must be `.ts` / `.tsx`                                  |
| Build tool   | **Vite 7** (`@vitejs/plugin-react`)              | Config in `vite.config.ts`                                               |
| Styling      | **Tailwind CSS v4** (`@tailwindcss/vite` plugin) | Utility-first; imported via `@import "tailwindcss"` in `src/index.css`   |
| Routing      | **React Router v7** (`react-router-dom`)         | `BrowserRouter` with `basename="/toto"`                                  |
| Data fetching| **TanStack React Query v5**                      | All async data must go through `useQuery` / `useMutation`                |
| Maps         | **Leaflet + react-leaflet v5**                   | For the interactive resort map                                           |
| Linting      | **ESLint 9** flat config (`eslint.config.js`)    | With `typescript-eslint`, `react-hooks`, and `react-refresh` plugins     |
| CI/CD        | **GitHub Actions** → GitHub Pages                | Workflow at `.github/workflows/deploy.yml`                               |

> **Important:** Do not add new frameworks, UI libraries (e.g. Material UI, Chakra), or state-management libraries (e.g. Redux, Zustand). The current stack is intentional.

## Project Structure

```
src/
├── App.tsx              # Root component (router + query provider)
├── main.tsx             # Entry point
├── index.css            # Global styles (Tailwind import)
├── env.d.ts             # Vite env type declarations
├── assets/              # Static assets (images, SVGs)
├── components/          # Reusable UI components
├── data/                # Static data (resort list in resorts.ts)
│   └── resorts.ts       # Resort definitions with coordinates and metadata
├── pages/               # Route-level page components
├── services/            # API service modules
└── types/               # Shared TypeScript interfaces
    └── index.ts
```

## Weather APIs

> When adding new data sources, prefer **free, no-auth APIs** to keep the app deployable without secrets.

## Build & Run Commands

```bash
npm ci              # Install dependencies (use ci, not install, for reproducibility)
npm run dev         # Start Vite dev server
npm run build       # TypeScript check + Vite production build → dist/
npm run lint        # Run ESLint
npm run preview     # Preview production build locally
```

## Key Conventions

### TypeScript
- Enable strict mode. All variables, parameters, and return types should be explicitly typed or correctly inferred.
- Shared types live in `src/types/index.ts`.
- Use `type` imports (`import type { ... }`) when importing only types.

### React Components
- Use **function declarations** (`export default function ComponentName()`) — not arrow-function default exports.
- Keep components in their own file; file name must match the component name (PascalCase).
- Hooks at the top of the component body; early returns after hooks.

### Styling
- Use **Tailwind utility classes** directly on JSX elements. No CSS modules, no `styled-components`, no inline `style` objects.
- Use the Tailwind `@layer base` directive in `index.css` for global overrides only.

### Data Fetching
- All API calls go through service modules in `src/services/`.
- Components consume data via `useQuery` from `@tanstack/react-query` — never call `fetch` directly in components.
- Handle loading and error states explicitly in the UI.

### Routing
- The app uses a **base path** of `/<repo name>` (matching the GitHub Pages repo name). This is configured in both `vite.config.ts` (`base: '/<repo name>/'`) and `App.tsx` (`<BrowserRouter basename="/<repo name>">`).
- If the repository is renamed, both values must be updated in sync.

### Environment Variables
- Vite exposes env vars prefixed with `VITE_` to client code.
- Declare them in `src/env.d.ts` for type safety.
- **Never commit real API keys.** The `.env` file is listed in `.gitignore` for local use only.

## GitHub Pages Deployment

### Prerequisites

1. The GitHub repository must have **GitHub Pages** enabled.
   Go to **Settings → Pages** and set the **Source** to **GitHub Actions** (not "Deploy from a branch").
2. The Vite config (`vite.config.ts`) must set `base` to the repository name:
   ```ts
   export default defineConfig({
     plugins: [react(), tailwindcss()],
     base: '/<repo name>/',
   })
   ```
3. The React Router `BrowserRouter` in `App.tsx` must use the same base path:
   ```tsx
   <BrowserRouter basename="/<repo name>">
   ```
4. If the repository is renamed, **both** values above must be updated to match.

### How the deployment works

- On every push to `main` (or manual trigger via `workflow_dispatch`), the GitHub Actions workflow:
  1. Checks out the code.
  2. Sets up Node.js 20 with npm caching.
  3. Installs dependencies with `npm ci` (deterministic, lockfile-based).
  4. Runs `npm run build` (TypeScript check + Vite production build → `dist/`).
  5. Uploads the `dist/` folder as a Pages artifact.
  6. Deploys the artifact to the `github-pages` environment.
- **Concurrency** is configured so that a new push cancels any in-progress deployment.
- The build **must** succeed without errors. Always run `npm run build` locally before pushing.

### SPA routing on GitHub Pages

### Workflow file

Create the file `.github/workflows/deploy.yml` with the following exact content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Checklist before your first deploy

- [ ] GitHub Pages source is set to **GitHub Actions** in repo settings.
- [ ] `vite.config.ts` has `base: '/toto/'`.
- [ ] `App.tsx` has `<BrowserRouter basename="/toto">`.
- [ ] `npm run build` succeeds locally with no errors.
- [ ] No secrets or API keys are committed (`.env` is in `.gitignore`).
- [ ] The workflow file exists at `.github/workflows/deploy.yml`.

## Common Pitfalls to Avoid

1. **Don't use `npm install` in CI** — use `npm ci` for deterministic builds.
2. **Don't forget the base path** — assets and routes break on GitHub Pages without the correct `base` in Vite and `basename` in the router.
3. **Don't add server-side code** — this is a purely static SPA. No API routes, no SSR, no Node.js server.
4. **Don't use `require()`** — the project is ESM (`"type": "module"` in `package.json`).
5. **Don't create `.css` files per component** — use Tailwind classes instead.
6. **Leaflet CSS** — Leaflet requires its CSS to be loaded. If map styles break, ensure the Leaflet CSS import is present.
7. **SPA routing on GitHub Pages** — GitHub Pages doesn't support client-side routing natively. If 404s occur on refresh, a `404.html` redirect hack or hash routing may be needed.
8. **Open-Meteo rate limits** — Keep `refetchOnWindowFocus: false` and use reasonable `staleTime` values in React Query to avoid excessive API calls.

## Security

- No secrets in source code or committed files.
- External API responses should be treated as untrusted — sanitize before rendering raw HTML (though React escapes by default via JSX).
- Use `rel="noopener"` on all external `target="_blank"` links.
- Keep dependencies up to date; run `npm audit` periodically.

## Locale

- The UI language is **French**. Labels, weather descriptions, and page content are in French.
- Timezone for weather data: `Europe/Zurich`.
