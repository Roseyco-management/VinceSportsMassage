# Codebase Structure

## Directory Layout

```
VinceSportsMassage/
├── .next/                          # Next.js build output (gitignored)
├── node_modules/                   # Dependencies (gitignored)
├── public/                         # Static assets
│   ├── images/                     # Image assets
│   │   ├── about/
│   │   ├── blog/
│   │   ├── branding/
│   │   ├── hero/
│   │   ├── postureprime/
│   │   ├── services/
│   │   └── testimonials/
│   └── videos/                     # Video assets
├── src/                            # Source code
│   ├── app/                        # Next.js App Router
│   │   ├── (marketing)/           # Marketing pages route group
│   │   │   ├── blog/              # Blog pages
│   │   │   │   ├── [slug]/        # Dynamic blog post pages
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── blog-post-page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── blog-list-page.tsx
│   │   │   ├── booking/           # Booking page
│   │   │   │   ├── page.tsx
│   │   │   │   └── booking-page.tsx
│   │   │   ├── postureprime/      # PosturePrime program page
│   │   │   │   ├── page.tsx
│   │   │   │   └── postureprime-page.tsx
│   │   │   └── services/          # Services page
│   │   │       ├── page.tsx
│   │   │       └── services-page.tsx
│   │   ├── api/                   # API routes
│   │   │   └── blog/
│   │   │       └── route.ts       # Blog webhook endpoint
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Homepage
│   │   ├── globals.css            # Global styles + Tailwind
│   │   ├── robots.ts              # robots.txt generator
│   │   ├── sitemap.ts             # Sitemap generator
│   │   └── favicon.ico
│   ├── components/                # React components
│   │   ├── ui/                    # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── textarea.tsx
│   │   ├── sections/              # Page section components
│   │   │   ├── index.ts          # Barrel export
│   │   │   ├── hero.tsx
│   │   │   ├── trust-bar.tsx
│   │   │   ├── stats.tsx
│   │   │   ├── about.tsx
│   │   │   ├── services-preview.tsx
│   │   │   ├── pricing.tsx
│   │   │   ├── treatments.tsx
│   │   │   ├── testimonials.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── contact.tsx
│   │   │   └── cta.tsx
│   │   ├── layout/                # Layout components
│   │   │   ├── index.ts          # Barrel export
│   │   │   ├── header.tsx
│   │   │   └── footer.tsx
│   │   ├── common/                # Shared components
│   │   │   └── scroll-progress.tsx
│   │   └── blog/                  # Blog-specific components
│   │       └── (blog components)
│   └── lib/                       # Utilities and libraries
│       ├── constants.ts           # Site configuration and data
│       ├── utils.ts               # Utility functions (cn helper)
│       ├── seo/                   # SEO utilities
│       │   ├── index.ts          # Barrel export
│       │   ├── metadata.ts       # Metadata generators
│       │   ├── json-ld.tsx       # JSON-LD component
│       │   └── schemas.ts        # Schema generators
│       └── supabase/              # Supabase integration
│           ├── client.ts         # Browser client
│           ├── server.ts         # Server client
│           └── types.ts          # Database type definitions
├── supabase/                      # Supabase configuration
│   └── migrations/                # Database migrations
├── .env.local                     # Environment variables (gitignored)
├── .gitignore
├── components.json                # shadcn/ui configuration
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── package-lock.json             # Lockfile
├── postcss.config.mjs            # PostCSS configuration
├── README.md
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## File Naming Conventions

### Components
- **UI Components**: Lowercase with hyphens (e.g., `button.tsx`, `dropdown-menu.tsx`)
- **Section Components**: Lowercase with hyphens (e.g., `hero.tsx`, `services-preview.tsx`)
- **Layout Components**: Lowercase (e.g., `header.tsx`, `footer.tsx`)
- **Page Components**: Suffixed with `-page` (e.g., `blog-list-page.tsx`, `booking-page.tsx`)

### Pages (App Router)
- **Page Files**: `page.tsx` (Next.js convention)
- **Layout Files**: `layout.tsx` (Next.js convention)
- **Route Handlers**: `route.ts` (Next.js convention)

### Configuration
- **TypeScript**: `tsconfig.json`
- **Next.js**: `next.config.ts`
- **ESLint**: `eslint.config.mjs`
- **Tailwind**: `tailwind.config.ts`
- **PostCSS**: `postcss.config.mjs`
- **shadcn/ui**: `components.json`

### Utilities
- **Library Files**: Lowercase (e.g., `utils.ts`, `constants.ts`, `metadata.ts`)

## Module Boundaries

### App Layer (`src/app/`)
**Responsibility**: Routing, pages, layouts, API routes

**Rules**:
- Can import from `src/components/`
- Can import from `src/lib/`
- Should not be imported by components
- Server Components by default

### Components Layer (`src/components/`)
**Responsibility**: Reusable UI components

**Subdirectories**:
- `ui/` - Base UI primitives (shadcn/ui)
- `sections/` - Page section compositions
- `layout/` - App layout components (Header, Footer)
- `common/` - Shared utilities (ScrollProgress)
- `blog/` - Blog-specific components

**Rules**:
- Can import from `src/lib/`
- Can import other components from same layer
- Should not import from `src/app/`
- Client Components must be marked with `"use client"`

### Library Layer (`src/lib/`)
**Responsibility**: Business logic, utilities, integrations

**Subdirectories**:
- `seo/` - SEO utilities (metadata, schemas, JSON-LD)
- `supabase/` - Database client and types

**Rules**:
- Should not import from `src/components/` or `src/app/`
- Pure functions and utilities
- Can be used by any layer

## Component Organization

### Atomic Design Influence
While not strictly following Atomic Design, the structure has similar principles:

**Atoms** → `src/components/ui/`
- Button, Input, Label, Badge, etc.
- Smallest building blocks
- Highly reusable

**Molecules** → `src/components/sections/`
- Hero, Pricing, FAQ, Contact
- Combinations of atoms
- Domain-specific

**Organisms** → `src/components/layout/`
- Header, Footer
- Complex compositions
- App-wide structures

**Templates** → `src/app/(marketing)/*/page.tsx`
- Page wrappers
- Layout structures

**Pages** → Component files like `blog-list-page.tsx`
- Full page implementations

## Barrel Exports

**Pattern**: Index files for clean imports

**Examples**:

`src/components/sections/index.ts`:
```typescript
export { Hero } from "./hero"
export { TrustBar } from "./trust-bar"
export { Stats } from "./stats"
export { About } from "./about"
export { ServicesPreview } from "./services-preview"
export { Pricing } from "./pricing"
export { Treatments } from "./treatments"
export { Testimonials } from "./testimonials"
export { FAQ } from "./faq"
export { Contact } from "./contact"
export { CTA } from "./cta"
```

**Usage**:
```typescript
import { Hero, TrustBar, Stats } from "@/components/sections"
```

## API Route Organization

**Current Structure**:
```
src/app/api/
└── blog/
    └── route.ts  # POST and GET handlers
```

**Pattern**: One `route.ts` per endpoint with HTTP method handlers

**Example**:
```typescript
export async function POST(request: Request) { ... }
export async function GET(request: Request) { ... }
```

## Static Assets Organization

### Images (`public/images/`)
**Categories**:
- `about/` - About section images
- `blog/` - Blog post images
- `branding/` - Logo, brand assets
- `hero/` - Hero section backgrounds
- `postureprime/` - PosturePrime program images
- `services/` - Service images
- `testimonials/` - Client photos

**Naming**: Descriptive kebab-case (e.g., `vince-selfie-transparent.webp`)

### Videos (`public/videos/`)
- Currently empty (hero uses YouTube embed)
- Placeholder for local video backgrounds

## Configuration Files Location

**Root Level**:
- `tsconfig.json` - TypeScript
- `next.config.ts` - Next.js
- `tailwind.config.ts` - Tailwind CSS
- `postcss.config.mjs` - PostCSS
- `eslint.config.mjs` - ESLint
- `components.json` - shadcn/ui
- `package.json` - Dependencies
- `.env.local` - Environment variables

**Rationale**: Next.js convention requires config at project root

## Import Patterns

### Path Alias Usage
All imports use `@/*` alias pointing to `src/*`:

```typescript
// ✅ Good
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/constants"
import { createClient } from "@/lib/supabase/client"

// ❌ Avoid
import { Button } from "../../components/ui/button"
import { siteConfig } from "../lib/constants"
```

## Page-Component Split

**Pattern**: Separate wrapper and implementation

**Wrapper** (`page.tsx`):
```typescript
import BlogListPage from "./blog-list-page"

export default function BlogPage() {
  return <BlogListPage />
}
```

**Implementation** (`blog-list-page.tsx`):
```typescript
"use client"

export default function BlogListPage() {
  // Full component implementation
  return (...)
}
```

**Rationale**:
- Next.js requires `page.tsx` filename
- Keeps implementation logic in descriptively-named files
- Allows easy server/client component separation

## Database Schema Location

**Types**: `src/lib/supabase/types.ts`
**Migrations**: `supabase/migrations/`

**Generated Types**: Auto-generated from Supabase schema using Supabase CLI

## Critical File Locations

| Purpose | Path |
|---------|------|
| Homepage | `src/app/page.tsx` |
| Root layout | `src/app/layout.tsx` |
| Global styles | `src/app/globals.css` |
| Site config | `src/lib/constants.ts` |
| Blog API | `src/app/api/blog/route.ts` |
| Supabase client | `src/lib/supabase/client.ts` |
| SEO schemas | `src/lib/seo/schemas.ts` |
| Header | `src/components/layout/header.tsx` |
| Footer | `src/components/layout/footer.tsx` |

## Build Output

**Location**: `.next/` directory (gitignored)

**Contents**:
- Compiled TypeScript
- Optimized JavaScript bundles
- Static HTML pages
- Server functions
- Build cache

## File Count

**Total TypeScript Files**: 53+
- App Router pages: ~10
- Components: ~30
- Utilities: ~10
- Configuration: ~5
