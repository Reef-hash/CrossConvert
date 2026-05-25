# Performance Plan

## Current Performance Strategy
- lazy-load route pages
- keep browser-first MVP processing local for minimal round-trip latency
- use object URLs instead of base64 payloads
- revoke object URLs to avoid memory leaks
- keep tool discovery data in lightweight in-memory registries

## Why This Matters
Large utility platforms fail when every tool page carries the full weight of every future feature. CrossConvert avoids that by treating catalog data, page composition, and runtime processors as separate concerns.

## Browser Execution Strategy
- keep lightweight image utilities in-browser when practical
- move CPU-heavy operations to workers before moving them to backend jobs
- reserve cloud/queue paths for large or long-running workflows

## Bundle Strategy
- route-level code splitting
- modular feature folders for domain-based loading
- future tool-specific lazy processors for larger utilities
- Option 3 plan: when tool count grows significantly, split tool catalogs/manifests by domain and lazy-load route-scoped metadata

## Future Scaling Strategy
- worker pool for image and lightweight media operations
- resumable large-file uploads for video and PDF pipelines
- edge/CDN delivery for result assets
- job polling or websocket updates for long-running backend tasks
- observability for per-tool performance budgets
- Option 3 trigger: execute catalog partitioning and on-demand metadata loading once catalog size reaches ~120+ tools or route chunk growth starts hurting navigation smoothness

## Default UX Performance Standards (Required)
- lazy-load new route pages by default
- provide a skeleton fallback for route and section loading states
- use pagination for searchable or browsable lists that can grow over time
- add caching for expensive local computations and discovery lookups

These standards are now part of the default implementation baseline for new pages and feature modules.
