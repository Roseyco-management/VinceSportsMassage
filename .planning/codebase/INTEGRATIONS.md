# External Integrations

## Database & Backend

### Supabase (PostgreSQL)

**Purpose**: Cloud PostgreSQL database with real-time subscriptions and authentication

**SDK Versions**:
- `@supabase/supabase-js` (^2.86.0) - JavaScript client library
- `@supabase/ssr` (^0.8.0) - Server-side rendering support for Next.js

**Environment Variables**:
```
NEXT_PUBLIC_SUPABASE_URL=https://knulsdytwindlctganjy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__kyDIrTPlP4BNq0jNx4m0w_XRHDPny9
SUPABASE_SERVICE_ROLE_KEY=sb_secret_UnOoxIiTT8e9J2EcKZzC6A_eUf9URiT
```

**Implementation**:

**Browser Client** (`src/lib/supabase/client.ts`):
```typescript
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Client** (`src/lib/supabase/server.ts`):
```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore errors from Next.js middleware
          }
        },
      },
    }
  )
}
```

**Database Tables**:
1. **blog_posts** - Blog content with auto-generation tracking
2. **automation_logs** - n8n workflow execution tracking
3. **services** - Business services (currently unused)
4. **testimonials** - Client testimonials (currently unused)
5. **contact_submissions** - Contact form data (currently unused)
6. **blog_categories** - Blog categorization (currently unused)
7. **post_categories** - Many-to-many blog/category mapping (currently unused)

**Usage**:
- **Blog API**: Creates/fetches blog posts via API routes
- **Future use**: Authentication, real-time subscriptions, testimonials management

---

## Workflow Automation

### n8n

**Purpose**: Workflow automation for blog content generation

**Environment Variables**:
```
N8N_WEBHOOK_SECRET=46ed173518444b386688b7faa77b3e3e1e36fd5aec6379a24d9397d3fed387dc
N8N_BASE_URL= (empty - not configured)
N8N_API_KEY= (empty - not configured)
```

**Integration Point**: `src/app/api/blog/route.ts`

**Webhook Endpoint**: `POST /api/blog`

**Authentication**: Header-based webhook secret validation
```typescript
const webhookSecret = headersList.get("x-webhook-secret")

if (webhookSecret !== process.env.N8N_WEBHOOK_SECRET) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

**Expected Payload**:
```typescript
{
  title: string
  content: string
  excerpt?: string
  featured_image?: string
  meta_description?: string
  meta_keywords?: string[]
  author?: string
  status?: "draft" | "published" | "scheduled"
  published_at?: string
  slug?: string
  canonical_url?: string
  og_image?: string
  executionId?: string
}
```

**Workflow**:
1. n8n generates blog content (likely using AI)
2. n8n sends webhook to `/api/blog` with blog data
3. API validates webhook secret
4. API generates slug if not provided
5. API inserts post to Supabase
6. API logs execution to `automation_logs` table
7. API revalidates Next.js cache for blog pages

**Logging**: All webhook executions are logged to `automation_logs` table with status (success/error/pending)

---

## Booking & Scheduling

### Calendly

**Purpose**: Online appointment booking and scheduling

**URL**: `https://calendly.com/vince4fitness`

**Implementation**: `src/app/(marketing)/booking/booking-page.tsx`

**Integration Type**: Embedded iframe

**Configuration**:
```typescript
<iframe
  src="https://calendly.com/vince4fitness?embed_domain=vincesportsmassage.com&embed_type=Inline&primary_color=06b6d4&text_color=1e293b&background_color=ffffff&hide_gdpr_banner=1"
  width="100%"
  height="650"
  frameBorder="0"
/>
```

**Customization**:
- **Primary Color**: Cyan (`#06b6d4`)
- **Text Color**: Dark slate (`#1e293b`)
- **Background**: White (`#ffffff`)
- **GDPR Banner**: Hidden
- **Embed Domain**: `vincesportsmassage.com`

**Features**:
- Real-time availability
- Automatic booking confirmation
- Calendar sync
- Reminder emails

**No API Integration**: No programmatic access to Calendly data

---

## Maps & Geolocation

### Google Maps

**Purpose**: Display business location on contact page

**Implementation**: `src/components/sections/contact.tsx`

**Integration Type**: Embedded iframe

**Location**:
```
Vince Sports Massage
79 Woodgrange Rd
Downpatrick, BT30 8JH
Northern Ireland
```

**Coordinates**: Latitude 54.3285, Longitude -5.7137

**Implementation**:
```typescript
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2314.8494287234567!2d-5.7137!3d54.3285!..."
  width="100%"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
```

**No API Key Required**: Uses public embed URL

---

## Reviews & Ratings

### Google Business Profile

**Purpose**: Display business reviews and ratings

**Profile URL**: `https://share.google/Sx39PAH6fBo6YtV5x`

**Integration Type**: Schema markup (no direct API)

**Rating**: 5.0 stars
**Review Count**: 62 reviews

**Implementation**: `src/lib/seo/schemas.ts`

**Schema Markup**:
```typescript
{
  "@type": "LocalBusiness",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "62"
  }
}
```

**Display**: Reviews displayed as structured data for search engines, not fetched dynamically

---

## Video Hosting

### YouTube

**Purpose**: Hero section background video

**Implementation**: `src/components/sections/hero.tsx`

**Video ID**: `O3jvJ8w6OOY`

**Integration Type**: Embedded iframe with autoplay

**Configuration**:
```typescript
<iframe
  src="https://www.youtube.com/embed/O3jvJ8w6OOY?autoplay=1&mute=1&loop=1&playlist=O3jvJ8w6OOY&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1"
  allow="autoplay; encrypted-media"
  allowFullScreen
  className="absolute top-1/2 left-1/2 w-[300%] h-[300%]"
/>
```

**Parameters**:
- `autoplay=1` - Auto-play on load
- `mute=1` - Muted by default (required for autoplay)
- `loop=1` - Continuous loop
- `playlist=O3jvJ8w6OOY` - Enables looping
- `controls=0` - Hide player controls
- `showinfo=0` - Hide video info
- `rel=0` - Disable related videos
- `modestbranding=1` - Minimal YouTube branding
- `playsinline=1` - iOS inline playback
- `enablejsapi=1` - Enable JavaScript API

---

## Social Media Sharing

### Facebook, Twitter, LinkedIn

**Purpose**: Share blog posts on social media

**Implementation**: `src/app/(marketing)/blog/[slug]/blog-post-page.tsx`

**Share URLs**:
```typescript
const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`
const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
```

**No API Integration**: Uses standard social platform sharing URLs

---

## Animation & UI Libraries

### Framer Motion

**Purpose**: Animation library for scroll-triggered and interactive animations

**Version**: ^12.23.25

**Usage**:
- Page section animations (`whileInView`)
- Hover effects (`whileHover`)
- Staggered animations (delay based on index)
- Scroll progress indicator

**Example** (`src/components/sections/pricing.tsx`):
```typescript
<motion.div
  initial={{ opacity: 0, y: 30, scale: 0.95 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 0.5,
    delay: index * 0.08,
    ease: [0.25, 0.46, 0.45, 0.94],
  }}
  whileHover={{ scale: 1.02, y: -4 }}
>
  {children}
</motion.div>
```

### Radix UI

**Purpose**: Unstyled, accessible UI primitive components

**Components Used**:
- Accordion (FAQ section)
- Avatar (testimonials)
- Dialog/Sheet (mobile menu)
- Dropdown Menu (navigation)
- Navigation Menu (header)
- Scroll Area (long content)
- Separator (dividers)

**Version**: Multiple packages, all ^1.x or ^2.x

**Integration**: Wrapped by shadcn/ui components in `src/components/ui/`

### Lucide React

**Purpose**: SVG icon library

**Version**: ^0.555.0

**Icons Used**:
- ArrowRight (CTAs)
- Star (ratings)
- Calendar (booking)
- CheckCircle (features)
- Hand, User, Wind, Activity (service icons)
- Menu, X (mobile nav)
- Phone, Mail, MapPin (contact)

---

## Email Services

### Contact Email

**Email**: `vince4fitness@gmail.com`

**Implementation**: Mailto links and contact form submissions

**Current Setup**: Manual email handling (no automated sending)

**Potential Integration**: Contact form submissions stored in Supabase `contact_submissions` table

**No Email API**: No SendGrid, Resend, or other email service integrated

---

## SEO & Analytics

### Schema.org Structured Data

**Purpose**: Improve search engine understanding and rich snippets

**Implementation**: `src/lib/seo/schemas.ts` and `src/lib/seo/json-ld.tsx`

**Schemas Implemented**:
1. **LocalBusiness** (HealthAndBeautyBusiness type)
2. **Service** (for each service offering)
3. **Article** (blog posts)
4. **BreadcrumbList** (navigation)
5. **FAQPage** (FAQ section)
6. **WebSite** (site-wide)
7. **Product** (PosturePrime)
8. **AggregateRating** (reviews)

**Format**: JSON-LD embedded in HTML

**No Analytics Tracking**: No Google Analytics, Plausible, or other analytics service integrated

---

## Missing Integrations

### Payment Processing
**Status**: Not integrated
**Mentioned in FAQ**: Cash, card (Visa/Mastercard), bank transfers
**Processing**: Manual at time of service

### Email Marketing
**Status**: Not integrated
**Potential**: Mailchimp, ConvertKit, Klaviyo for newsletter

### Analytics
**Status**: Not integrated
**Potential**: Google Analytics 4, Plausible, Fathom

### CRM
**Status**: Not integrated
**Potential**: HubSpot, Pipedrive for client management

### Live Chat
**Status**: Not integrated
**Potential**: Intercom, Crisp, Tawk.to for real-time support

---

## Integration Summary

| Service | Type | Purpose | Status |
|---------|------|---------|--------|
| Supabase | Database | PostgreSQL backend | ✅ Active |
| n8n | Automation | Blog generation | ✅ Active |
| Calendly | SaaS | Appointment booking | ✅ Active |
| Google Maps | Embed | Location display | ✅ Active |
| Google Business | Schema | Reviews/ratings | ✅ Active |
| YouTube | Embed | Hero background | ✅ Active |
| Framer Motion | Library | Animations | ✅ Active |
| Radix UI | Library | UI primitives | ✅ Active |
| Social Sharing | URLs | Share buttons | ✅ Active |
| Payment Gateway | API | Payments | ❌ Not integrated |
| Email Service | API | Automated emails | ❌ Not integrated |
| Analytics | API | Tracking | ❌ Not integrated |
| Live Chat | Widget | Support | ❌ Not integrated |
| Email Marketing | API | Newsletter | ❌ Not integrated |

---

## API Keys & Credentials Location

**Environment Variables File**: `.env.local` (gitignored)

**Required Variables**:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# n8n
N8N_WEBHOOK_SECRET=
N8N_BASE_URL= (optional)
N8N_API_KEY= (optional)

# Site
NEXT_PUBLIC_SITE_URL=
```

**Security Note**: Service role key provides admin access to Supabase - should never be exposed to client
