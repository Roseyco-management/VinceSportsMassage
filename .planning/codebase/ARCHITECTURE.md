# Architecture

## System Design

**Pattern**: Next.js App Router with React Server Components (RSC)

**Architecture Style**: Component-based with hybrid rendering (Server + Client components)

## High-Level Structure

```
┌─────────────────────────────────────────────┐
│           Next.js App Router                │
│  (Server-Side Rendering + Static Generation)│
└─────────────────┬───────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
   ┌────▼────┐         ┌────▼────┐
   │ Server  │         │ Client  │
   │Components│        │Components│
   └────┬────┘         └────┬────┘
        │                   │
        │    ┌──────────────┘
        │    │
   ┌────▼────▼────┐
   │   Supabase   │
   │  (PostgreSQL)│
   └──────────────┘
```

## Component Architecture

### Server Components (Default)
- **Layout**: `src/app/layout.tsx` - Root layout with metadata
- **Pages**: `src/app/page.tsx`, `src/app/(marketing)/*/page.tsx`
- **Metadata Generators**: `src/lib/seo/metadata.ts`
- **API Routes**: `src/app/api/blog/route.ts`

**Responsibilities**:
- Data fetching from Supabase
- Metadata generation for SEO
- Static content rendering
- HTML structure

### Client Components (Marked with "use client")
- **Interactive UI**: `src/components/sections/hero.tsx`, `pricing.tsx`, etc.
- **Navigation**: `src/components/layout/header.tsx`
- **Animations**: All components using Framer Motion
- **Form Interactions**: Contact forms, booking interactions

**Responsibilities**:
- User interactions (clicks, hovers, form input)
- Animation state management
- Browser-only features (IntersectionObserver for scroll animations)
- Local component state (useState)

## Data Flow Patterns

### Static Data Flow
```
constants.ts → Components → Pages → User
```

**Implementation**:
```typescript
// src/lib/constants.ts
export const siteConfig = { ... } as const
export const services = [ ... ] as const
export const pricing = [ ... ] as const

// src/components/sections/pricing.tsx
import { pricing } from "@/lib/constants"
export function Pricing() {
  return pricing.map(plan => <Card>{plan}</Card>)
}
```

### Dynamic Data Flow (Blog)
```
n8n Workflow → API Route → Supabase → ISR → User
```

**Implementation**:
1. n8n sends webhook to `POST /api/blog`
2. API validates webhook secret
3. API inserts post to Supabase `blog_posts` table
4. API calls `revalidatePath('/blog')` for ISR
5. Next.js regenerates static pages on next request

### User Interaction Flow
```
User Action → Client Component → State Update → Re-render
```

## Routing Architecture

### App Router Structure
```
src/app/
├── layout.tsx                    # Root layout (Server Component)
├── page.tsx                      # Homepage (Server Component)
├── (marketing)/                  # Route group (no URL segment)
│   ├── services/
│   │   └── page.tsx             # /services
│   ├── blog/
│   │   ├── page.tsx             # /blog
│   │   └── [slug]/
│   │       └── page.tsx         # /blog/[slug]
│   ├── booking/
│   │   └── page.tsx             # /booking
│   └── postureprime/
│       └── page.tsx             # /postureprime
└── api/
    └── blog/
        └── route.ts             # POST /api/blog, GET /api/blog
```

**Routing Strategy**:
- **Static Routes**: Services, booking, PosturePrime pages
- **Dynamic Routes**: Blog posts with `[slug]` parameter
- **API Routes**: REST endpoints for n8n webhooks and data fetching
- **Route Groups**: `(marketing)` groups pages without affecting URL structure

## API Design

### REST Endpoints

#### POST /api/blog
**Purpose**: Webhook for n8n blog automation

**Flow**:
```
n8n → Validates webhook secret → Validates data → Generates slug
→ Checks for duplicates → Inserts to Supabase → Logs automation
→ Revalidates cache → Returns success/error
```

**Authentication**: Header-based (`x-webhook-secret`)

#### GET /api/blog
**Purpose**: Fetch blog posts with filtering

**Query Parameters**:
- `status`: Filter by published/draft/all
- `limit`: Pagination limit
- `offset`: Pagination offset

**Response**: Array of blog post summaries

## Database Schema

**Tables** (7 total):

### blog_posts
Primary content table for blog automation
- Columns: id, slug, title, excerpt, content, featured_image, meta_description, meta_keywords, author, status, published_at, created_at, updated_at, canonical_url, og_image, n8n_execution_id, auto_generated

### automation_logs
Tracks n8n workflow execution results
- Columns: id, workflow_name, execution_id, status (success/error/pending), payload, result, created_at

### services
Business service catalog (currently unused - uses constants.ts instead)
- Columns: id, name, slug, description, short_description, image, price_from, duration_minutes, display_order, is_active

### testimonials, contact_submissions, blog_categories, post_categories
Supporting tables for future features

## State Management

**Philosophy**: No global state management library

**Approach**:
- **Server state**: Supabase database queries
- **UI state**: React useState in client components
- **Configuration**: Static constants with `as const`
- **URL state**: Next.js router for navigation

**Example** (`src/components/layout/header.tsx`):
```typescript
const [isOpen, setIsOpen] = useState(false) // Mobile menu toggle
```

## Caching Strategy

### Incremental Static Regeneration (ISR)
```typescript
// After blog post creation
revalidatePath('/blog')              // Regenerate blog list
revalidatePath(`/blog/${data.slug}`) // Regenerate individual post
```

### Supabase Client Caching
```typescript
// Lazy initialization to avoid multiple instances
let supabase: SupabaseClient | null = null

function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(url, key)
  }
  return supabase
}
```

## Integration Points

### External Services
1. **Supabase** - Database and authentication (potential)
2. **n8n** - Workflow automation for blog generation
3. **Calendly** - Appointment booking (embedded iframe)
4. **Google Maps** - Location display (embedded iframe)
5. **YouTube** - Hero background video (embedded iframe)
6. **Google Business** - Review integration (via schema markup)

### Authentication Flow
**Current**: No authentication implemented
**Setup**: Supabase client configured for future use

## SEO Architecture

### Metadata Generation
```typescript
// src/lib/seo/metadata.ts
export function generateMetadata(page: PageMetadata): Metadata {
  return {
    title: `${page.title} | ${siteConfig.name}`,
    description: page.description,
    openGraph: { ... },
    twitter: { ... }
  }
}
```

### Structured Data (JSON-LD)
```typescript
// src/lib/seo/schemas.ts
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    // ...
  }
}
```

**Schemas Implemented**:
- LocalBusiness (HealthAndBeautyBusiness)
- Service
- Article (for blog posts)
- BreadcrumbList
- FAQPage
- WebSite
- Product
- AggregateRating

## Error Handling

### API Routes
```typescript
try {
  // Validation
  if (!valid) {
    return NextResponse.json({ error: "..." }, { status: 400 })
  }

  // Database operation
  const { data, error } = await db.from("...").insert(...)

  if (error) {
    // Log to database
    await db.from("automation_logs").insert({ status: "error", ... })
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, data })
} catch (error) {
  console.error("Unexpected error:", error)
  return NextResponse.json({ error: "Internal server error" }, { status: 500 })
}
```

### Client Components
```typescript
// Graceful fallback for map loading
{isMapLoaded ? (
  <iframe src="google-maps-url" />
) : (
  <div>Loading map...</div>
)}
```

## Performance Optimizations

1. **Server Components by Default** - Reduces JavaScript bundle sent to client
2. **Code Splitting** - Automatic by Next.js per route
3. **Image Optimization** - Next.js Image component for automatic optimization
4. **Lazy Supabase Client** - Single instance initialization
5. **Static Generation** - Most pages are statically generated at build time
6. **ISR** - Blog pages regenerated on-demand after updates

## Critical Paths

### Blog Creation Path
```
n8n Workflow → POST /api/blog → Webhook Validation → Data Validation
→ Slug Generation → Duplicate Check → Supabase Insert → Automation Logging
→ Cache Revalidation → Response
```

**File**: `src/app/api/blog/route.ts`

### Page Load Path
```
User Request → Next.js Router → Server Component Render
→ Supabase Data Fetch (if needed) → HTML Generation
→ Client Component Hydration → Framer Motion Animations
```

## Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| App Router over Pages Router | Modern Next.js architecture with Server Components |
| No state management library | Simple app doesn't need Redux/Zustand complexity |
| Supabase over custom API | Rapid development, built-in auth for future |
| Constants file for config | Simple data doesn't need database queries |
| Radix UI primitives | Unstyled, accessible components with full control |
| Framer Motion animations | Declarative, smooth animations without CSS complexity |
| n8n webhook automation | Decoupled content generation from main app |
