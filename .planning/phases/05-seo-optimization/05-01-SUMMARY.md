---
phase: 05-seo-optimization
plan: 01
subsystem: seo
tags: [meta-tags, sitemap, image-optimization, next.js, supabase]

# Dependency graph
requires:
  - phase: 04-accessibility-remediation
    provides: Component accessibility patterns, environment config foundation
provides:
  - Complete meta tag configuration (verification tags, theme color)
  - Dynamic sitemap generation from Supabase
  - Next.js Image optimization configured for blog images
affects: [06-performance-tuning, future-seo-work]

# Tech tracking
tech-stack:
  added: []
  patterns: [nextjs-metadata-api, nextjs-viewport-api, dynamic-sitemap-generation, nextjs-image-optimization]

key-files:
  modified: [src/app/layout.tsx, src/app/sitemap.ts, next.config.ts, src/app/(marketing)/blog/[slug]/blog-post-page.tsx]

key-decisions:
  - "Meta tags use Next.js metadata API and viewport export (Next.js 16 best practices)"
  - "Sitemap fetches from Supabase using direct client (no cookies for static generation)"
  - "Image optimization configured but preserves placeholder for posts without images"

# Metrics
duration: 3 min
completed: 2026-01-27
---

# Phase 5 Plan 1: SEO Optimization Summary

**Complete meta tags with verification, dynamic sitemap from Supabase, and Next.js Image optimization configured for blog images**

## Performance

- **Duration:** 3 min
- **Started:** 2026-01-27T16:45:05Z
- **Completed:** 2026-01-27T16:48:26Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- Added Google and Twitter site verification meta tags using Next.js metadata API
- Configured theme color using viewport export (Next.js 16 recommended approach)
- Implemented dynamic sitemap generation that fetches published blog posts from Supabase
- Configured Next.js Image component with remotePatterns for Supabase Storage URLs
- Updated blog post page to use Next.js Image for featured images with LCP optimization
- Maintained placeholder emoji fallback for posts without featured images

## Task Commits

Each task was committed atomically:

1. **Task 1: Add missing meta tags to root layout** - `3371440` (feat)
2. **Task 2: Implement dynamic sitemap generation from Supabase** - `d14dc4b` (feat)
3. **Task 3: Configure Next.js Image optimization for blog images** - `7f5f5f2` (feat)

## Files Created/Modified

- `src/app/layout.tsx` - Added verification metadata and viewport export with theme color
- `src/app/sitemap.ts` - Replaced hardcoded slugs with dynamic Supabase query using direct client
- `next.config.ts` - Added images.remotePatterns configuration for Supabase Storage
- `src/app/(marketing)/blog/[slug]/blog-post-page.tsx` - Integrated Next.js Image component with conditional rendering

## Decisions Made

- **Next.js metadata API and viewport export**: Used Next.js 16 recommended patterns instead of legacy <meta> tags for better type safety, SSR support, and future compatibility
- **Direct Supabase client for sitemap**: Used direct client (not server client) to avoid dynamic rendering with cookies, allowing static sitemap generation
- **Graceful sitemap fallback**: Sitemap generation logs errors but doesn't fail if Supabase query fails (empty blog array fallback)
- **Optional featured images**: Preserved placeholder emoji for posts without images rather than requiring images (backward compatible with existing posts)
- **LCP optimization**: Used priority={true} on featured images since they're above-the-fold content for better Core Web Vitals

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**[Rule 2 - Missing Critical] Viewport export instead of themeColor in metadata**

- **Found during:** Task 1 (Build verification after adding themeColor)
- **Issue:** Next.js 16 showed deprecation warning for themeColor in metadata export, should use viewport export instead
- **Fix:** Moved themeColor to separate viewport export following Next.js 16 best practices
- **Files modified:** src/app/layout.tsx
- **Verification:** Build succeeds without warnings
- **Committed in:** 3371440 (Task 1 commit)

**[Rule 3 - Blocking] Direct Supabase client to avoid dynamic rendering**

- **Found during:** Task 2 (Build verification after Supabase integration)
- **Issue:** Using server client caused dynamic rendering due to cookies, preventing static sitemap generation
- **Fix:** Switched to direct Supabase client with env variables (no cookies needed for public blog posts)
- **Files modified:** src/app/sitemap.ts
- **Verification:** Sitemap generates statically (○ marker in build output)
- **Committed in:** d14dc4b (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (1 missing critical, 1 blocking)
**Impact on plan:** Both fixes necessary for correct implementation. No scope creep.

## Next Phase Readiness

Phase complete. Ready for Phase 6: Performance Tuning.

**Note for Phase 6**: Image optimization config is now in place. Phase 6 can focus on compression settings, bundle analysis (Framer Motion evaluation), and general Next.js performance tuning.

---
*Phase: 05-seo-optimization*
*Completed: 2026-01-27*
