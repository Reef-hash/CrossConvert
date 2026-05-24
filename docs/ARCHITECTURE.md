# CrossConvert Architecture

## Product Shape
CrossConvert is now structured as an all-in-one SaaS utility platform rather than a single converter app. The platform already models:

- image tools
- PDF tools
- video tools
- audio tools
- AI tools
- developer tools
- file utilities

WEBP to PNG remains the first fully live MVP tool, but the architecture is intentionally built so future tools can be added as catalog entries plus processors instead of requiring core rewrites.

## Why This Architecture

### 1. Registry-driven platform model
All tool pages, category pages, metadata, discovery modules, and sitemap generation flow from a central tool catalog.

Why:
- avoids hardcoded routes and duplicated SEO definitions
- makes new tools inexpensive to ship
- supports programmatic SEO and API marketplace growth

### 2. Category-first feature boundaries
The codebase is organized by capability instead of by one-off pages.

Why:
- future teams can own image, PDF, AI, or developer domains independently
- validators/processors can be shared within a category
- reduces cross-feature coupling as the platform grows

### 3. Adapter-based processing
Runtime processing uses a generic workbench and processor adapter contracts.

Why:
- browser processors, worker processors, API processors, and queue-backed processors can all sit behind the same UI contract
- the live WEBP to PNG implementation proves the architecture with a real browser adapter

### 4. Service abstraction from day one
Even before backend rollout, services are separated for analytics, billing, auth, API keys, usage, history, cloud jobs, and admin.

Why:
- preserves frontend/back-office boundaries
- avoids reworking UI code when backend systems arrive

## Current High-Level Structure

```txt
src/
  app/
    App.tsx
    pages/
    providers/
    router/

  components/
    common/
    layout/

  features/
    platform/
      catalog/
      components/
      services/
    tool-workbench/
      components/
      hooks/
      services/
      utils/
    image-tools/
      processors/
      validators/
      manifest.ts
    pdf-tools/
      manifest.ts
    video-tools/
      manifest.ts
    audio-tools/
      manifest.ts
    ai-tools/
      manifest.ts
    developer-tools/
      manifest.ts
    file-utilities/
      manifest.ts

  services/
    admin/
    analytics/
    api/
    api-keys/
    auth/
    billing/
    cloud/
    history/
    usage/

  hooks/
  config/
  types/
  styles/
  utils/

scripts/
  generate-sitemap.ts
```

## Route Architecture

Current route model:

- `/`
- `/tools`
- `/image-tools`
- `/pdf-tools`
- `/video-tools`
- `/audio-tools`
- `/ai-tools`
- `/developer-tools`
- `/file-utilities`
- `/tools/:toolSlug`

Why:
- supports category landing pages
- supports programmatic tool pages
- gives SEO-friendly URL structure for hundreds of future tools

## Tool Catalog Contract

Each tool definition currently includes:

- category
- slug
- availability status
- execution modes
- monetization model
- SEO metadata
- search aliases
- processor mapping

Why:
- a tool is now a product object, not just a page or component
- discovery, pricing, and routing all depend on the same source of truth

## Discovery System

The platform already supports architecture for:

- featured tools
- trending tools
- recent tools
- search tools
- category-filtered discovery
- recommended tools

Why:
- a large utility platform succeeds through navigation and discovery, not only by individual landing pages

## WEBP to PNG MVP Design

Live path today:

1. tool page resolves from registry
2. tool maps to `webp-to-png` processor
3. generic workbench manages upload, validation, task state, preview, progress, and download
4. image processor validates WEBP input, decodes in browser, renders to canvas, exports PNG

Why:
- this validates the generic execution model with a real production feature
- future image tools can reuse the same workbench with different processors

## Scalability Strategy

### Horizontal scalability
- add new tools by registering them in the catalog
- add processors by capability and execution mode
- lazy-load page modules for bundle control

### Backend scalability
- cloud job boundary exists through `cloudProcessingService`
- future queue orchestration can sit behind processor routing
- microservices can specialize by domain: PDF, video, audio, AI inference

### Organization scalability
- domain-specific feature folders support parallel development across teams

## Performance Plan

Current architecture supports:

- route-level lazy loading
- object URL lifecycle cleanup
- browser-side processing for lightweight tasks
- small initial JS surface for first interaction
- generated sitemap and metadata without manual duplication

Planned next steps:

- web workers for heavier browser jobs
- concurrency controls for large batch flows
- CDN-backed asset and result delivery
- queue-based long-running job orchestration

## SEO Plan

Implemented foundations:

- category pages
- tool pages
- dynamic metadata hook
- central SEO definitions in the tool/category catalog
- route registry for programmatic sitemap generation

Planned expansions:

- FAQ schema blocks per tool
- guide content pages
- internal linking blocks by intent cluster
- automated sitemap and robots output in CI

## Security Considerations

Current:

- strict client-side validation for browser tools
- no backend file upload required for WEBP to PNG MVP
- processor boundaries keep risky logic isolated

Future:

- signed uploads/downloads
- file scanning
- rate limits and abuse controls
- secure API key scopes
- plan-based feature access controls

## Monetization Preparation

Modeled in tool definitions today:

- free tier
- premium tier
- credits-based AI tools
- API-ready tools
- enterprise-ready tools
- ads eligibility

Why:
- monetization should influence tool rollout, pricing, SEO, and backend planning from the start rather than being bolted on later
