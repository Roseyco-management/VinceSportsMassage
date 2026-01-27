# Framer Motion Bundle Impact Evaluation

**Date:** 2026-01-27
**Phase:** 6 - Performance Tuning
**Decision:** Keep Framer Motion

---

## Current Usage

### Component Count
Framer Motion is used in **17 files** across the codebase:

**Page Components (5):**
- `src/app/(marketing)/blog/[slug]/blog-post-page.tsx`
- `src/app/(marketing)/blog/blog-list-page.tsx`
- `src/app/(marketing)/booking/booking-page.tsx`
- `src/app/(marketing)/postureprime/postureprime-page.tsx`
- `src/app/(marketing)/services/services-page.tsx`

**Section Components (11):**
- `src/components/sections/about.tsx`
- `src/components/sections/contact.tsx`
- `src/components/sections/cta.tsx`
- `src/components/sections/faq.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/pricing.tsx`
- `src/components/sections/services-preview.tsx`
- `src/components/sections/stats.tsx`
- `src/components/sections/testimonials.tsx`
- `src/components/sections/treatments.tsx`
- `src/components/sections/trust-bar.tsx`

**Common Components (1):**
- `src/components/common/scroll-progress.tsx`

### Animation Patterns

**Scroll-triggered animations:**
- Fade in + slide up on scroll (most sections)
- Staggered animations for lists/grids
- `whileInView` with `viewport={{ once: true }}` for performance

**Interactive animations:**
- Hover effects (scale, lift on cards)
- Smooth transitions between states
- Loading states and progress indicators

**Brand-critical animations:**
- Hero section entrance animation
- Section reveal animations (premium feel)
- Smooth scroll progress indicator

---

## Bundle Impact

### Size Analysis

**Framer Motion:** ~40KB gzipped (from PROJECT.md audit)
**Version:** 12.23.25 (from package.json)

### Optimization Applied

**Tree-shaking enabled** (Phase 6, Task 1):
- `experimental.optimizePackageImports: ["lucide-react", "framer-motion"]`
- Next.js 16 will only bundle the motion components actually used
- Actual bundle impact lower than full 40KB due to tree-shaking

### Context

- Total page weight budget for marketing sites: typically 1-3MB
- 40KB is ~1.3-4% of typical budget
- Modern networks: 40KB transfers in ~50-150ms on 3G, <10ms on 4G/5G
- Animations improve perceived performance (smooth transitions feel faster)

---

## Decision Rationale

### Why Keep Framer Motion

**1. Animation Quality**
- Industry-leading animation library with excellent DX
- Smooth, hardware-accelerated animations
- No alternative provides same quality with similar ease

**2. Brand Differentiation**
- Premium massage service positioning requires polished experience
- Smooth scroll animations reinforce professional, high-quality service
- Animations are core to brand experience, not decorative

**3. Performance Impact Acceptable**
- 40KB gzipped (~1.3-4% of typical page budget)
- Tree-shaking reduces actual impact
- Excellent Core Web Vitals still achievable with this bundle size
- Animations improve perceived performance

**4. Cost of Removal Would Be High**
- Complete animation rewrite required
- CSS-only animations lack the smoothness and control
- Inferior user experience would result
- Development time not justified by minimal bundle savings

**5. Premature Optimization**
- No evidence of performance issues related to animations
- Users haven't reported slow load times
- Core Web Vitals can be excellent with 40KB animation library
- Optimize when data shows need, not speculatively

### PROJECT.md Alignment

This decision aligns with PROJECT.md Key Decisions:
> "Keep Framer Motion (no dynamic import) - Bundle size impact acceptable for animation quality, premature optimization to remove"

---

## Recommendation

**KEEP FRAMER MOTION**

### Summary
- ✅ Animation quality is brand-differentiating
- ✅ Bundle size (~40KB gzipped) is acceptable for marketing site
- ✅ Tree-shaking optimization applied to reduce impact
- ✅ No performance issues observed
- ✅ Cost of removal outweighs minimal bundle savings

### Alternative Considered
**Dynamic imports for Framer Motion:** Could lazy-load the library, but:
- Adds complexity (code splitting, loading states)
- Animations are used on nearly every page (no lazy-loading benefit)
- Tree-shaking already reduces bundle impact
- Not worth the added complexity

### Future Consideration
If performance issues arise:
1. Check Core Web Vitals first (LCP, FID, CLS)
2. Profile actual bundle impact with webpack analyzer
3. Consider dynamic imports only if animations aren't critical path
4. Only remove if data shows it's the bottleneck (unlikely)

---

**Conclusion:** Framer Motion provides excellent animation quality that aligns with the brand positioning. The bundle size is acceptable, optimizations are in place, and removal would harm user experience more than it would help performance.
