# Vince Sports Massage - Website Rebuild Project

## Project Overview
Rebuilding vincesportsmassage.com from WordPress/10Web to Next.js with modern stack.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: Supabase (PostgreSQL)
- **Automation**: n8n for blog post generation
- **Hosting**: Netlify (planned)
- **Booking**: Calendly embed

---

## Phase 1: Marketing Website ✅ COMPLETE

### Pages Built
- [x] Homepage (`/`) - Hero with YouTube video background, About, Services Preview, Testimonials, CTA
- [x] Services (`/services`) - 12 services with detailed info and benefits
- [x] Booking (`/booking`) - Calendly integration
- [x] PosturePrime (`/postureprime`) - Program landing page
- [x] Blog (`/blog`) - Blog listing from Supabase
- [x] Blog Post (`/blog/[slug]`) - Individual post pages

### Features Implemented
- [x] SEO: JSON-LD structured data (LocalBusiness, Service, Article schemas)
- [x] Dynamic sitemap.ts and robots.txt
- [x] n8n webhook API endpoint (`/api/blog`) for automated blog posts
- [x] Responsive design
- [x] Framer Motion animations
- [x] Google Reviews badge (5.0 stars, 62 reviews)

### Database (Supabase)
- [x] Schema created and migrated
- Tables: `blog_posts`, `blog_categories`, `post_categories`, `services`, `testimonials`, `contact_submissions`, `automation_logs`

### Environment Variables Configured
```
NEXT_PUBLIC_SUPABASE_URL=https://knulsdytwindlctganjy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable__kyDIrTPlP4BNq0jNx4m0w_XRHDPny9
SUPABASE_SERVICE_ROLE_KEY=sb_secret_UnOoxIiTT8e9J2EcKZzC6A_eUf9URiT
N8N_WEBHOOK_SECRET=46ed173518444b386688b7faa77b3e3e1e36fd5aec6379a24d9397d3fed387dc
NEXT_PUBLIC_SITE_URL=https://vincesportsmassage.com
```

---

## Assets Still Needed (Before Deployment)

### Images to Extract from WordPress
Located at: vincesportsmassage.com/wp-admin > Media Library
Download from hosting: `/wp-content/uploads/`

**Required Images:**
- [ ] Service images (therapeutic bodywork, posture correction, etc.)
- [ ] Testimonial client photos (or use avatars)
- [ ] PosturePrime page images
- [ ] Blog featured images (if any existing posts)
- [ ] Logo/favicon
- [ ] OG image for social sharing (1200x630)

**Already Added:**
- [x] `/public/images/Vince1.png` - Vince portrait (transparent background) - used in About section

**Video:**
- [x] Hero background: YouTube embed (https://youtu.be/O3jvJ8w6OOY)

See `/public/images/IMAGE_CHECKLIST.md` for full list.

---

## Phase 2: Admin Dashboard 🔜 NEXT

### Planned Features
- Blog post management (create, edit, delete, publish/unpublish)
- View automation logs from n8n
- SEO monitoring dashboard
- Booking analytics (if Calendly API available)
- Testimonial management

### Resources Available
- TailAdmin Pro templates in `/baileybarry/resources`
- Shadcn UI dashboard components

---

## Phase 3: Client Dashboard 🔜 FUTURE

### Planned Features
- Client login/authentication (Supabase Auth)
- Booking management (view/cancel appointments)
- Treatment plans and history
- Resources/exercises library
- Progress tracking

---

## Business Details

**Business**: Vince Sports Massage
**Owner**: Vince McDowell
**Address**: 79 Woodgrange Rd, Downpatrick BT30 8JH, Northern Ireland
**Phone**: 07709 839734
**Hours**: Mon-Sat 11am-6pm
**Calendly**: https://calendly.com/vince4fitness
**Google Business**: https://share.google/Sx39PAH6fBo6YtV5x
**Reviews**: 5.0 stars (62 reviews)

---

## How to Run

```bash
cd /Users/baileybarry/VinceSportsMassage
npm run dev
```
Opens at: http://localhost:3000

## How to Build
```bash
npm run build
```

---

## n8n Integration

**Webhook Endpoint**: `POST /api/blog`

**Headers Required**:
```
x-webhook-secret: 46ed173518444b386688b7faa77b3e3e1e36fd5aec6379a24d9397d3fed387dc
Content-Type: application/json
```

**Payload Example**:
```json
{
  "title": "Blog Post Title",
  "content": "<p>HTML content here</p>",
  "excerpt": "Short description",
  "imageUrl": "https://...",
  "metaDescription": "SEO description",
  "keywords": ["keyword1", "keyword2"],
  "author": "Vince McDowell",
  "publish": true,
  "executionId": "n8n-execution-id"
}
```

---

## Deployment Checklist

- [ ] Add remaining images
- [ ] Update n8n workflow with new API endpoint
- [ ] Deploy to Netlify
- [ ] Configure custom domain (vincesportsmassage.com)
- [ ] Set environment variables in Netlify
- [ ] Test blog automation end-to-end
- [ ] Submit sitemap to Google Search Console

---

*Last Updated: December 4, 2025*
