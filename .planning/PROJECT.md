# VinceSportsMassage Performance & SEO Optimization

## What This Is

A comprehensive technical remediation project for the VinceSportsMassage Next.js website, addressing all 23 technical concerns identified in the codebase audit. This includes critical security vulnerabilities (XSS, timing attacks), data validation gaps, accessibility issues, SEO improvements, performance optimizations, code quality enhancements, and type safety fixes.

## Core Value

Eliminate the HIGH severity XSS vulnerability and harden API security to protect users and data integrity. Everything else supports this—but user security and data protection cannot be compromised.

## Requirements

### Validated

- ✓ Next.js 16 App Router with Server Components architecture — existing
- ✓ TypeScript strict mode enabled — existing
- ✓ Supabase PostgreSQL database integration — existing
- ✓ n8n workflow automation for blog generation — existing
- ✓ Radix UI + Tailwind CSS component system — existing
- ✓ Framer Motion animations throughout — existing
- ✓ Schema.org structured data for SEO — existing
- ✓ 53+ TypeScript files with feature-based organization — existing

### Active

**Security (4 issues - 1 HIGH, 3 MEDIUM)**
- [ ] Sanitize blog HTML rendering with DOMPurify to eliminate XSS vulnerability
- [ ] Implement timing-safe webhook secret validation using crypto.timingSafeEqual()
- [ ] Add comprehensive input validation with Zod schema for API routes
- [ ] Validate environment variables with proper error handling

**Data Validation (3 issues - 2 MEDIUM, 1 LOW)**
- [ ] Implement Zod schema validation for blog post payloads
- [ ] Add structured logging for API errors (replace console.error)
- [ ] Wrap cache revalidation in try-catch with error logging

**Code Quality (4 issues - 1 MEDIUM, 3 LOW)**
- [ ] Extract hardcoded values to environment variables (Calendly URL, YouTube ID, contact info)
- [ ] Remove commented/dead code from components
- [ ] Replace Date.now() slug generation with crypto-random UUIDs
- [ ] Implement structured logging abstraction

**Accessibility (3 issues - 1 MEDIUM, 2 LOW)**
- [ ] Add ARIA labels for star ratings and interactive elements
- [ ] Wrap emoji content with proper role and aria-label attributes
- [ ] Implement focus management for mobile menu navigation

**SEO (3 issues - 1 MEDIUM, 2 LOW)**
- [ ] Add missing meta tags (Twitter verification, Google verification, theme color)
- [ ] Verify robots.txt and sitemap.xml generation
- [ ] Use Next.js Image component with explicit dimensions for blog post images

**Performance (3 issues - 3 LOW)**
- [ ] Evaluate Framer Motion bundle impact and consider dynamic imports
- [ ] Configure Next.js image optimization with remotePatterns for Supabase
- [ ] Add compression and optimization settings to next.config.ts

**Type Safety (2 issues - 2 LOW)**
- [ ] Create TypeScript interfaces for all API payloads
- [ ] Remove non-null assertions from Supabase client initialization

**Testing Infrastructure (1 issue - 1 MEDIUM)**
- [ ] Set up Vitest with React Testing Library for critical paths
- [ ] Add tests for blog API webhook (security-critical)
- [ ] Add tests for slug generation and validation logic

### Out of Scope

- **New features** — No email capture, live chat, analytics, or functionality additions. This is pure remediation.
- **Design changes** — No visual or UX modifications. Maintain current look and feel.
- **Content strategy** — No blog content creation, copywriting, or marketing material changes.
- **Deployment infrastructure** — No hosting changes, CI/CD pipelines, or DevOps work beyond what's needed for fixes.
- **Third-party integrations** — No new services (payment gateways, email marketing, CRM). Fix existing integrations only.

## Context

**Codebase State:**
- Modern Next.js 16 + React 19 + TypeScript stack with clean architecture
- 7 Supabase database tables (blog_posts actively used, others unused)
- n8n automation generates blog content via webhook
- Calendly booking, Google Maps, YouTube embeds for third-party services
- Zero test coverage currently
- 23 documented technical issues across 8 categories

**Critical Security Context:**
- Blog content rendered with `dangerouslySetInnerHTML` at `src/app/(marketing)/blog/[slug]/blog-post-page.tsx:138`
- Webhook secret comparison at `src/app/api/blog/route.ts:38` vulnerable to timing attacks
- No input validation beyond checking title/content presence
- Environment variables use non-null assertions without validation

**Performance Context:**
- Framer Motion library adds ~40KB gzipped to bundle
- No image optimization configured for Supabase Storage URLs
- Minimal Next.js configuration (many optimizations missing)

**Accessibility Context:**
- Star ratings lack ARIA labels for screen readers
- Emoji content has no alt text or semantic markup
- Mobile menu doesn't manage focus state properly

## Constraints

- **Zero Breaking Changes**: Site must remain fully operational throughout. No downtime, no regressions, no functionality loss.
- **Maintain Design**: All fixes must preserve current visual design and user experience. Technical changes only.
- **Brownfield Architecture**: Work within existing Next.js App Router structure. Don't restructure the codebase.
- **Environment Compatibility**: Must work with current Vercel deployment, Supabase cloud, n8n webhooks.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use DOMPurify for HTML sanitization | Industry-standard library, actively maintained, works client and server-side | ✅ Implemented (Phase 1) |
| Implement timing-safe comparison with crypto module | Built-in Node.js crypto prevents timing attacks without external dependencies | ✅ Implemented (Phase 1) |
| Use Zod for input validation | Type-safe validation with TypeScript integration, better DX than manual checks | — Pending (Phase 2) |
| Add Vitest for testing (not Jest) | Faster than Jest, native ESM support, better Next.js integration | — Pending (Phase 8) |
| Extract hardcoded values to .env | Enables environment-specific configuration (staging vs production) | — Pending (Phase 3) |
| Keep Framer Motion (no dynamic import) | Bundle size impact acceptable for animation quality, premature optimization to remove | — Pending (Phase 6) |

---
*Last updated: 2026-01-27 after Phase 1 completion*
