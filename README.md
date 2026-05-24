# CrossConvert

CrossConvert is a startup-grade all-in-one SaaS utility platform for image, PDF, video, audio, AI, developer, and file utilities.

WEBP to PNG remains the first live MVP tool, but the platform is now architected for a much larger toolbox with category pages, dynamic tool registration, programmatic SEO, discovery systems, backend-ready services, and monetization hooks.

## Current Platform Scope

- Category architecture for image, PDF, video, audio, AI, developer, and file utilities.
- Dynamic route model for `/tools/:toolSlug` and category pages.
- Tool catalog registry powering metadata, search, recommendations, trending, and recent tools.
- Generic workbench runtime for file-based tools.
- Live browser-side WEBP to PNG processing.
- Backend-ready service placeholders for auth, billing, API keys, cloud jobs, usage, history, analytics, and admin.
- Programmatic sitemap generation.

## Tech Stack

- React
- React Router
- Vite
- TypeScript
- Tailwind CSS
- ESLint (flat config)

## Project Docs

- docs/README.md
- docs/ARCHITECTURE.md
- docs/IMPLEMENTATION_STATUS.md
- docs/AUTH_BILLING_PLAN.md
- docs/ROADMAP.md
- docs/FUTURE_IMPROVEMENTS.md
- docs/SEO_STRATEGY.md
- docs/PERFORMANCE_PLAN.md

## Setup Instructions

1. Install Node.js 20+.
2. Copy environment file:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Install dependencies:

```bash
npm install
```

## Run Instructions

```bash
npm run dev
```

App starts at http://localhost:5173 by default.

## Build Instructions

```bash
npm run typecheck
npm run lint
npm run build
```

`npm run build` also generates `dist/sitemap.xml` from the platform route registry.

## Preview Production Build

```bash
npm run preview
```

## Sitemap Generation Only

```bash
npm run sitemap
```

## Deployment Instructions (Vercel)

1. Push the repository to GitHub.
2. In Vercel, import the project from GitHub.
3. Configure build settings:
- Framework preset: Vite
- Build command: npm run build
- Output directory: dist
4. Add environment variables from `.env.example` as needed.
5. Deploy.

Recommended environment variables:

- `VITE_APP_ENV`
- `VITE_APP_URL`
- `VITE_ANALYTICS_ENABLED`

Optional CLI deployment:

```bash
npm i -g vercel
vercel
vercel --prod
```

## Architecture Highlights

- Tool catalog is the source of truth for routes, metadata, discovery, and monetization hooks.
- File tools use a shared workbench and processor-adapter contract.
- Category modules already exist for image, PDF, video, audio, AI, developer, and file utilities.
- Service abstraction is ready for auth, billing, API marketplace, history, analytics, admin, and cloud processing.

## Platform Direction

Planned tool families include:

- image converters and optimizers
- PDF workflows
- video and audio processing
- AI enhancement and extraction
- developer utilities
- premium/API products

The architecture is intentionally optimized so those additions mostly require new tool definitions and processors rather than core rewrites.
