# Hosting Strategy

## Recommended Decision (Now)

Use Vercel first for the current stage.

Why this is the best immediate choice:
- frontend is Vite-based and deploys cleanly to static hosting
- GitHub integration gives automatic deploys on push
- preview deployments are fast for product iteration
- environment variable management is simple
- edge CDN delivery is strong out of the box

## Recommended Future Split (When Heavy Tools Go Live)

- Frontend: Vercel
- Backend API + workers: Railway or Render (or Fly.io)
- Object storage: Cloudflare R2 or AWS S3
- Queue: Upstash Redis / BullMQ-compatible service / managed queue

Why split later:
- video, AI, OCR, and large PDF jobs need long-running compute
- frontend hosting should remain optimized for speed and UX
- backend services should be independently scalable and cost-tuned

## Platform Stages

### Stage 1 (Current)
- Vercel-only deploy
- Browser-side WEBP to PNG processing
- no backend compute required

### Stage 2
- add backend for auth, billing, entitlement checks, and usage metering
- keep frontend on Vercel

### Stage 3
- add queue workers and cloud processing for heavy media/document/AI tools
- add storage and signed URL flows

## Vercel Production Setup

1. Import GitHub repository in Vercel.
2. Keep framework preset as Vite.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Configure environment variables:
   - `VITE_APP_ENV`
   - `VITE_APP_URL`
   - `VITE_ANALYTICS_ENABLED`
6. Deploy.
7. Add custom domain.
8. Enable preview deployments for pull requests.

## Go-Live Checklist

- project deploys successfully from `main`
- custom domain configured
- `VITE_APP_URL` matches production domain
- sitemap is generated (`dist/sitemap.xml`)
- basic analytics is enabled or intentionally disabled
- no secrets in client-side env vars
- rollback path is confirmed (previous deployment)

## Security Notes for Hosting

- do not place secret server keys in `VITE_` environment variables
- set security headers at hosting edge when possible
- enforce HTTPS only
- future backend routes must validate entitlement server-side

## Decision Summary

For this phase, Vercel is the correct host.

For the long-term all-in-one SaaS vision, keep Vercel for frontend and add a dedicated backend/worker stack as soon as heavy processing and subscription enforcement move server-side.
