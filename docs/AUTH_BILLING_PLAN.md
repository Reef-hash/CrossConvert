# Auth and Billing Plan

## Why this is required

A subscription product needs identity, payment, plan entitlements, and usage controls. Without these, premium features cannot be enforced reliably.

## Product model

CrossConvert will use account-based access with monthly subscriptions and optional credit packs for AI-heavy tools.

## Recommended monthly tiers

### Free
- Price: $0/month
- Includes: core lightweight tools, strict limits
- Example limits:
  - max file size: 25 MB
  - max monthly conversions: 300
  - no priority queue
  - limited AI features

### Pro
- Price: $12 to $19/month
- Includes: higher limits and priority processing
- Example limits:
  - max file size: 250 MB
  - max monthly conversions: 5,000
  - priority queue for cloud jobs
  - access to premium image/PDF/media tools
  - moderate AI credits per month

### Business
- Price: $39 to $79/month
- Includes: team-ready scaling
- Example limits:
  - max file size: 1 GB
  - max monthly conversions: 25,000+
  - faster queue and batch workflows
  - shared team workspace (future)
  - higher AI credit allotment

### Enterprise
- Price: custom
- Includes: SLA, SSO, private contracts, dedicated support, custom limits

## Billing strategy

Primary provider recommendation:
- Stripe Billing for subscriptions
- Stripe Customer Portal for self-serve upgrades/downgrades/cancellations
- Stripe Webhooks for entitlement sync

Why:
- fastest reliable implementation
- excellent recurring billing support
- mature ecosystem for SaaS subscriptions

## Auth strategy

Primary options:
- Clerk (fast SaaS velocity)
- Auth.js with custom backend (more control)

Recommendation for speed:
- Clerk for MVP+ and early growth
- optional migration to custom auth only if enterprise constraints demand it

## Core domain entities

- User
- Subscription
- Plan
- Entitlement
- UsageRecord
- ApiKey
- InvoiceReference

## Entitlement model

Entitlements should be capability-based, not page-based.

Examples:
- tool.use.webp_to_png
- tool.use.image_compressor
- tool.use.remove_background
- api.access.basic
- api.access.premium
- queue.priority
- export.batch_zip

Why:
- avoids brittle plan checks scattered across UI
- keeps policy logic centralized
- simplifies future feature flags and enterprise contracts

## Access control flow

1. User signs in.
2. App fetches session + entitlement snapshot.
3. UI renders tool availability badges and limits.
4. On tool execution, server-side policy check validates entitlement and usage.
5. Usage counters increment after successful completion.
6. If over limit, return upgrade path with clear messaging.

## Pricing and monetization design

- Monthly subscription as primary model.
- Credits add-on for AI/GPU-heavy operations.
- API pricing by usage units.
- Optional ads only for free tier routes where acceptable.

## Backend requirements

Required services:
- auth service
- billing service
- usage metering service
- entitlement policy service
- webhook processing service
- invoice/subscription sync jobs

Data requirements:
- immutable billing events log
- monthly usage ledger
- entitlement snapshot cache

## Rollout phases

### Phase A: Foundation
- Add sign-in/sign-up
- Add user session handling in frontend
- Add protected dashboard shell

### Phase B: Billing MVP
- Create Stripe products and monthly plans
- Implement checkout and customer portal
- Implement webhook listeners for subscription status

### Phase C: Entitlements and limits
- Add plan-to-entitlement mapping
- Enforce limits on premium tools and heavy jobs
- Add upgrade prompts and billing status UI

### Phase D: API monetization
- API key creation and revocation
- usage metering per API key
- API quota and overage policies

### Phase E: Team and enterprise
- team billing and seats
- role-based controls
- enterprise invoicing and SSO support

## Frontend integration points

- Navbar: sign in, account, plan badge
- Tool pages: availability badge, paywall states, upgrade CTA
- Dashboard: usage, plan, billing status, invoices
- Settings: API keys, billing portal, seats (future)

## Success metrics

- trial to paid conversion rate
- monthly recurring revenue
- churn rate
- upgrade rate from free to paid
- paid user retention
- average revenue per user

## Implementation guardrails

- Never trust client-only plan checks for premium execution paths.
- Keep policy decisions centralized.
- Track all billing state changes via webhook-driven source of truth.
- Keep a clear fail-safe mode if billing provider is unavailable.
