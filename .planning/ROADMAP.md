# Roadmap: VinceSportsMassage Performance & SEO Optimization

## Overview

A comprehensive technical remediation journey that systematically addresses 23 security vulnerabilities, validation gaps, accessibility issues, and performance optimizations across the Next.js website. Starting with critical security hardening (XSS elimination, timing attack prevention), progressing through input validation and configuration management, then accessibility and SEO improvements, performance tuning, type safety enhancements, and concluding with testing infrastructure to prevent regressions.

## Domain Expertise

None

## Phases

- [x] **Phase 1: Critical Security Hardening** - Eliminate XSS vulnerability and timing attack vectors
- [x] **Phase 2: Input Validation & Error Handling** - Implement Zod schemas and structured logging
- [x] **Phase 3: Environment & Configuration Management** - Extract hardcoded values and validate environment variables
- [x] **Phase 4: Accessibility Remediation** - Add ARIA labels and focus management
- [x] **Phase 5: SEO Optimization** - Complete meta tags and image optimization
- [x] **Phase 6: Performance Tuning** - Configure Next.js optimizations and evaluate bundle size
- [x] **Phase 7: Type Safety Enhancement** - Add TypeScript interfaces and remove unsafe assertions
- [ ] **Phase 8: Testing Infrastructure** - Set up Vitest and cover critical security paths

## Phase Details

### Phase 1: Critical Security Hardening
**Goal**: Eliminate the HIGH severity XSS vulnerability in blog rendering and prevent timing attacks on webhook authentication
**Depends on**: Nothing (first phase)
**Research**: ✅ Complete (2026-01-27)
**Research topics**: DOMPurify implementation for Next.js Server Components, crypto.timingSafeEqual usage patterns
**Plans**: 2 plans (2 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 01-01-PLAN.md: HTML Sanitization with DOMPurify (28 min) — ✅ Complete 2026-01-27
- [x] 01-02-PLAN.md: Webhook Authentication Hardening (1 min) — ✅ Complete 2026-01-27

### Phase 2: Input Validation & Error Handling
**Goal**: Implement comprehensive Zod schema validation for API routes and replace console.error with structured logging
**Depends on**: Phase 1
**Research**: Likely (validation library integration)
**Research topics**: Zod schema patterns for Next.js API routes, structured logging libraries for production
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 02-01-PLAN.md: Input Validation & Structured Logging (3 min) — ✅ Complete 2026-01-27

### Phase 3: Environment & Configuration Management
**Goal**: Extract all hardcoded values to environment variables and implement proper validation with error handling
**Depends on**: Phase 2
**Research**: Unlikely (standard environment variable patterns)
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 03-01-PLAN.md: Environment Validation & Configuration Extraction (3 min) — ✅ Complete 2026-01-27

### Phase 4: Accessibility Remediation
**Goal**: Add ARIA labels for star ratings and emoji content, implement focus management for mobile menu
**Depends on**: Phase 3
**Research**: Unlikely (established ARIA patterns)
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 04-01-PLAN.md: ARIA Labels & Focus Management (1 min) — ✅ Complete 2026-01-27

### Phase 5: SEO Optimization
**Goal**: Add missing meta tags, verify robots.txt/sitemap generation, configure Next.js Image for blog post images
**Depends on**: Phase 4
**Research**: Unlikely (Next.js built-in features)
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 05-01-PLAN.md: SEO Meta Tags, Dynamic Sitemap, and Image Optimization (3 min) — ✅ Complete 2026-01-27

### Phase 6: Performance Tuning
**Goal**: Configure Next.js image optimization with remotePatterns for Supabase, add compression settings, evaluate Framer Motion bundle impact
**Depends on**: Phase 5
**Research**: Unlikely (Next.js configuration patterns)
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 06-01-PLAN.md: Compiler Optimizations and Framer Motion Evaluation (2 min) — ✅ Complete 2026-01-27

### Phase 7: Type Safety Enhancement
**Goal**: Create TypeScript interfaces for all API payloads and remove non-null assertions from Supabase client
**Depends on**: Phase 6
**Research**: Unlikely (standard TypeScript patterns)
**Plans**: 1 plan (1 complete, 0 pending)
**Status**: ✅ Complete (2026-01-27)

Plans:
- [x] 07-01-PLAN.md: API Response Type Interfaces (2 min) — ✅ Complete 2026-01-27

### Phase 8: Testing Infrastructure
**Goal**: Set up Vitest with React Testing Library and add tests for blog API webhook and slug generation
**Depends on**: Phase 7
**Research**: Likely (testing framework setup)
**Research topics**: Vitest configuration for Next.js 16 App Router, React Testing Library best practices for Server Components
**Plans**: TBD

Plans:
- [ ] TBD during phase planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Critical Security Hardening | 2/2 | Complete | 2026-01-27 |
| 2. Input Validation & Error Handling | 1/1 | Complete | 2026-01-27 |
| 3. Environment & Configuration Management | 1/1 | Complete | 2026-01-27 |
| 4. Accessibility Remediation | 1/1 | Complete | 2026-01-27 |
| 5. SEO Optimization | 1/1 | Complete | 2026-01-27 |
| 6. Performance Tuning | 1/1 | Complete | 2026-01-27 |
| 7. Type Safety Enhancement | 1/1 | Complete | 2026-01-27 |
| 8. Testing Infrastructure | 0/TBD | Not started | - |
