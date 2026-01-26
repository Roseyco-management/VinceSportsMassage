# Phase 4: Analytics & Measurement - Detailed Implementation Plan

**Timeline**: Week 7 (5 working days)
**Effort**: 10-12 hours
**Status**: 🔜 Ready to Start
**Dependencies**: Phases 1-3 complete (all features built, content published)

---

## Overview

Phase 4 implements comprehensive analytics and conversion tracking to measure the success of previous phases and identify optimization opportunities. This phase establishes data-driven decision-making capabilities by tracking every step of the user journey from first visit to booking completion.

**Expected Impact**:
- Complete visibility into conversion funnel
- Data-driven optimization insights
- ROI measurement for marketing efforts
- Identification of highest-performing content
- Clear understanding of user behavior

---

## Day 1-2: Google Analytics 4 Setup (4-5 hours)

### Objective
Implement GA4 with custom events tracking every critical user interaction and conversion milestone.

### Implementation Steps

**Step 1**: Create GA4 property (30 minutes)
1. Go to [Google Analytics](https://analytics.google.com)
2. Create new GA4 property: "Vince Sports Massage"
3. Set timezone: GMT (Dublin, Edinburgh, Lisbon, London)
4. Set currency: GBP (£)
5. Note Measurement ID (G-XXXXXXXXXX)

**Step 2**: Install GA4 tracking code (1 hour)
```typescript
// src/lib/analytics/gtag.ts - NEW FILE
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID

// Initialize GA4
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Custom event tracking
type GtagEvent = {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

export const event = ({ action, category, label, value, ...otherParams }: GtagEvent) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...otherParams,
    })
  }
}

// Conversion events
export const trackBookingStarted = (service: string) => {
  event({
    action: 'booking_started',
    category: 'conversion',
    label: service,
  })
}

export const trackBookingCompleted = (service: string, value: number) => {
  event({
    action: 'booking_completed',
    category: 'conversion',
    label: service,
    value: value,
  })
}

export const trackEmailCaptured = (source: string) => {
  event({
    action: 'email_captured',
    category: 'lead',
    label: source,
  })
}

// Engagement events
export const trackServiceViewed = (serviceName: string) => {
  event({
    action: 'service_viewed',
    category: 'engagement',
    label: serviceName,
  })
}

export const trackTestimonialRead = (testimonialId: string) => {
  event({
    action: 'testimonial_read',
    category: 'engagement',
    label: testimonialId,
  })
}

export const trackCaseStudyViewed = (caseStudyTitle: string) => {
  event({
    action: 'case_study_viewed',
    category: 'engagement',
    label: caseStudyTitle,
  })
}

export const trackFaqOpened = (question: string) => {
  event({
    action: 'faq_opened',
    category: 'engagement',
    label: question,
  })
}

export const trackPhoneClicked = () => {
  event({
    action: 'phone_clicked',
    category: 'conversion',
    label: 'call_button',
  })
}

export const trackCtaClicked = (ctaLocation: string, ctaText: string) => {
  event({
    action: 'cta_clicked',
    category: 'engagement',
    label: `${ctaLocation} - ${ctaText}`,
  })
}

// Content events
export const trackBlogPostViewed = (title: string, category: string) => {
  event({
    action: 'blog_post_viewed',
    category: 'content',
    label: title,
    blog_category: category,
  })
}

export const trackScrollDepth = (percentage: number) => {
  event({
    action: 'scroll_depth',
    category: 'engagement',
    label: `${percentage}%`,
    value: percentage,
  })
}

// Form events
export const trackFormStarted = (formName: string) => {
  event({
    action: 'form_started',
    category: 'engagement',
    label: formName,
  })
}

export const trackFormCompleted = (formName: string) => {
  event({
    action: 'form_completed',
    category: 'conversion',
    label: formName,
  })
}

export const trackFormAbandoned = (formName: string, field: string) => {
  event({
    action: 'form_abandoned',
    category: 'engagement',
    label: formName,
    abandoned_field: field,
  })
}
```

**Step 3**: Add GA4 script to app (30 minutes)
```tsx
// src/app/layout.tsx
import Script from 'next/script'
import { GA_MEASUREMENT_ID } from '@/lib/analytics/gtag'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Step 4**: Add environment variable (5 minutes)
```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Step 5**: Implement event tracking in components (2-3 hours)

```tsx
// src/components/sections/pricing.tsx
'use client'

import { trackCtaClicked, trackServiceViewed } from '@/lib/analytics/gtag'
import { useEffect } from 'react'

export function Pricing() {
  useEffect(() => {
    trackServiceViewed('Pricing Section')
  }, [])

  return (
    <section>
      {pricing.map(plan => (
        <Button
          onClick={() => {
            trackCtaClicked('Pricing Section', `Book ${plan.name}`)
          }}
          asChild
        >
          <Link href="/booking">Book Now</Link>
        </Button>
      ))}
    </section>
  )
}
```

```tsx
// src/components/sections/faq.tsx
import { trackFaqOpened } from '@/lib/analytics/gtag'

export function FAQ() {
  return (
    <Accordion>
      {faqs.map(faq => (
        <AccordionItem
          onOpenChange={(isOpen) => {
            if (isOpen) trackFaqOpened(faq.question)
          }}
        >
          {/* FAQ content */}
        </AccordionItem>
      ))}
    </Accordion>
  )
}
```

```tsx
// src/app/services/[slug]/page.tsx
import { trackServiceViewed, trackCtaClicked } from '@/lib/analytics/gtag'

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug)

  useEffect(() => {
    if (service) {
      trackServiceViewed(service.name)
    }
  }, [service])

  return (
    // Service page content
  )
}
```

```tsx
// src/app/(marketing)/booking/booking-page.tsx
import { trackBookingStarted } from '@/lib/analytics/gtag'

export default function BookingPage() {
  useEffect(() => {
    trackBookingStarted('Direct booking page')
  }, [])

  return (
    // Booking page content
  )
}
```

**Phone click tracking**:
```tsx
// src/components/common/phone-button.tsx
import { trackPhoneClicked } from '@/lib/analytics/gtag'

export function PhoneButton() {
  return (
    <a
      href="tel:+447709839734"
      onClick={() => trackPhoneClicked()}
    >
      Call: 07709 839734
    </a>
  )
}
```

**Scroll depth tracking**:
```tsx
// src/components/common/scroll-tracker.tsx
'use client'

import { useEffect } from 'react'
import { trackScrollDepth } from '@/lib/analytics/gtag'

export function ScrollTracker() {
  useEffect(() => {
    let tracked25 = false
    let tracked50 = false
    let tracked75 = false
    let tracked100 = false

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage >= 25 && !tracked25) {
        trackScrollDepth(25)
        tracked25 = true
      }
      if (scrollPercentage >= 50 && !tracked50) {
        trackScrollDepth(50)
        tracked50 = true
      }
      if (scrollPercentage >= 75 && !tracked75) {
        trackScrollDepth(75)
        tracked75 = true
      }
      if (scrollPercentage >= 100 && !tracked100) {
        trackScrollDepth(100)
        tracked100 = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return null
}
```

### Testing Checklist

- [ ] GA4 tracking code fires on all pages
- [ ] Pageviews recorded correctly
- [ ] Custom events appear in GA4 DebugView
- [ ] Event parameters captured correctly
- [ ] Phone clicks tracked
- [ ] CTA clicks tracked
- [ ] Service page views tracked
- [ ] FAQ interactions tracked
- [ ] Scroll depth tracked
- [ ] No tracking in development mode

### Potential Issues & Solutions

**Issue**: Events not showing in GA4
**Solution**: Use GA4 DebugView (gtag_debug parameter) to verify events are firing. Check browser console for errors.

**Issue**: Too many events firing
**Solution**: Implement debouncing for scroll events. Use `once: true` for one-time events.

**Issue**: Tracking in development
**Solution**: Only load GA4 in production: `{process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID && ...}`

---

## Day 3: Conversion Funnel Setup (2 hours)

### Objective
Create multi-step conversion funnel in GA4 to identify drop-off points in booking journey.

### Funnel Steps

1. **Homepage View** (entry point)
2. **Service Page View** (interest)
3. **Booking Page View** (intent)
4. **Email Captured** (lead)
5. **Booking Started** (Calendly opened)
6. **Booking Completed** (confirmation)

### Implementation Steps

**Step 1**: Create funnel in GA4 (1 hour)
1. Go to GA4 → Explore
2. Create new "Funnel exploration"
3. Define steps:
   - Step 1: page_view (page_path contains "/")
   - Step 2: service_viewed
   - Step 3: page_view (page_path contains "/booking")
   - Step 4: email_captured
   - Step 5: booking_started
   - Step 6: booking_completed
4. Set as open funnel (allow entry at any step)
5. Save exploration

**Step 2**: Create conversion events (30 minutes)
1. Go to GA4 → Events
2. Mark as conversions:
   - email_captured
   - booking_started
   - booking_completed
   - phone_clicked

**Step 3**: Set up conversion goals (30 minutes)
- Primary goal: booking_completed
- Secondary goals: email_captured, phone_clicked

### Expected Funnel Metrics

| Step | Expected Completion Rate |
|------|-------------------------|
| Homepage → Service Page | 40-60% |
| Service Page → Booking Page | 30-50% |
| Booking Page → Email Captured | 15-25% |
| Email Captured → Booking Started | 50-70% |
| Booking Started → Completed | 60-80% |

### Monitoring

- Check funnel weekly
- Identify highest drop-off points
- A/B test improvements to weak steps

---

## Day 4: Google Search Console Integration (2 hours)

### Objective
Connect Google Search Console to monitor organic search performance, rankings, and technical SEO issues.

### Implementation Steps

**Step 1**: Verify domain ownership (30 minutes)
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: vincesportsmassage.com
3. Verify via DNS TXT record or HTML file upload
4. Verify all property variants (www, non-www, http, https)

**Step 2**: Submit sitemap (15 minutes)
1. Go to Sitemaps section
2. Submit: `https://vincesportsmassage.com/sitemap.xml`
3. Verify sitemap is readable

**Step 3**: Request indexing of key pages (30 minutes)
Submit for immediate indexing:
- Homepage (/)
- All service pages (/services/*)
- Case studies (/case-studies/*)
- Testimonials page (/testimonials)
- About page (/about)
- Top blog posts (/blog/*)

**Step 4**: Link GSC to GA4 (15 minutes)
1. Go to GA4 → Admin → Product Links
2. Link Google Search Console
3. Verify data flows into GA4 reports

**Step 5**: Set up email alerts (15 minutes)
Enable email notifications for:
- Manual actions
- Security issues
- Coverage issues

**Step 6**: Monitor key metrics (30 minutes)
Track weekly:
- Total impressions
- Total clicks
- Average CTR
- Average position
- Top queries
- Top pages

### Key Metrics to Monitor

| Metric | Target (3 months) | Target (6 months) |
|--------|------------------|------------------|
| Impressions | 5,000-10,000/month | 15,000-25,000/month |
| Clicks | 100-200/month | 500-1,000/month |
| Average CTR | 2-4% | 4-6% |
| Average position | 15-20 | 8-12 |
| Indexed pages | 25-30 | 40-50 |

---

## Day 5: Dashboard & Reporting Setup (2-3 hours)

### Objective
Create automated dashboards and reports for easy monitoring of key metrics without logging into multiple tools.

### Implementation Steps

**Step 1**: Create Google Looker Studio dashboard (2 hours)
1. Go to [Looker Studio](https://lookerstudio.google.com)
2. Create new report
3. Connect data sources:
   - Google Analytics 4
   - Google Search Console
4. Build dashboard with sections:

**Dashboard Sections**:

**A) Overview KPIs** (Top row)
- Total visitors (this month vs last month)
- Booking conversion rate (this month vs last month)
- Email capture rate
- Average booking value
- Total conversions (bookings + leads)

**B) Traffic Sources** (Second row)
- Pie chart: Traffic by source (organic, direct, referral, social)
- Table: Top referral sources
- Line chart: Traffic over time by source

**C) Conversion Funnel** (Third row)
- Funnel visualization (homepage → service → booking → completed)
- Conversion rate by source
- Drop-off points

**D) Top Content** (Fourth row)
- Table: Top landing pages (pageviews, avg time, bounce rate)
- Table: Top blog posts (pageviews, avg time)
- Table: Top service pages (pageviews, conversions)

**E) Search Performance** (Fifth row)
- Line chart: Impressions and clicks over time
- Table: Top queries (impressions, clicks, CTR, position)
- Table: Top pages (impressions, clicks, CTR)

**F) Device & Location** (Sixth row)
- Pie chart: Traffic by device (mobile, desktop, tablet)
- Table: Top cities/regions
- Conversion rate by device

**Step 2**: Set up automated email reports (30 minutes)
1. In Looker Studio, click "Schedule email delivery"
2. Set weekly report: Every Monday 9am
3. Recipients: Vince + stakeholders
4. Include:
   - Summary of key metrics
   - Week-over-week changes
   - Top performers
   - Areas needing attention

**Step 3**: Create monthly executive summary (30 minutes)
Template for monthly report:

```markdown
# Vince Sports Massage - Monthly Analytics Report
**Month**: [Month Year]

## Key Performance Indicators

| Metric | This Month | Last Month | Change |
|--------|-----------|------------|--------|
| Total Visitors | X | Y | +/-Z% |
| Bookings | X | Y | +/-Z% |
| Leads (Emails) | X | Y | +/-Z% |
| Conversion Rate | X% | Y% | +/-Z% |
| Revenue | £X | £Y | +/-£Z |

## Traffic Analysis

**Top Traffic Sources**:
1. Organic Search: X visitors (Y%)
2. Direct: X visitors (Y%)
3. Referral: X visitors (Y%)
4. Social: X visitors (Y%)

**Top Landing Pages**:
1. [Page URL] - X visitors
2. [Page URL] - X visitors
3. [Page URL] - X visitors

## Content Performance

**Most Viewed Services**:
1. [Service Name] - X views, Y% conversion
2. [Service Name] - X views, Y% conversion
3. [Service Name] - X views, Y% conversion

**Top Blog Posts**:
1. [Blog Title] - X views, Y min avg time
2. [Blog Title] - X views, Y min avg time
3. [Blog Title] - X views, Y min avg time

## SEO Performance

**Search Metrics**:
- Impressions: X (+/-Y% vs last month)
- Clicks: X (+/-Y% vs last month)
- Average CTR: X% (+/-Y% vs last month)
- Average Position: X (+/-Y vs last month)

**Top Queries**:
1. [Query] - X impressions, Y clicks
2. [Query] - X impressions, Y clicks
3. [Query] - X impressions, Y clicks

## Conversion Funnel

Funnel drop-off analysis:
- Homepage → Service Page: X%
- Service Page → Booking Page: X%
- Booking Page → Email Capture: X%
- Email → Booking Started: X%
- Booking Started → Completed: X%

**Biggest drop-off**: [Step] - [X%] (Action: [What we'll test])

## Device & Geographic Data

**Traffic by Device**:
- Mobile: X% (conversion: Y%)
- Desktop: X% (conversion: Y%)
- Tablet: X% (conversion: Y%)

**Top Locations**:
1. [City] - X visitors
2. [City] - X visitors
3. [City] - X visitors

## Recommendations for Next Month

1. **Optimize [Specific Page]**: Drop-off at [X%], test [Improvement]
2. **Increase content on [Topic]**: [Query] showing high impressions but low clicks
3. **A/B test [Element]**: [Metric] underperforming

---

**Prepared by**: Google Analytics 4 + Looker Studio
**Date**: [Date]
```

### Testing Checklist

- [ ] Looker Studio dashboard loads without errors
- [ ] All data sources connected
- [ ] KPIs display correctly
- [ ] Funnel visualization accurate
- [ ] Email reports scheduled
- [ ] Reports arrive on time
- [ ] Data matches GA4 directly

### Potential Issues & Solutions

**Issue**: Data doesn't match between GA4 and Looker Studio
**Solution**: Check date ranges, filters, and sampling. Refresh data connection.

**Issue**: Reports not arriving
**Solution**: Check spam folder, verify email addresses, check Looker Studio delivery settings.

**Issue**: Dashboard too slow
**Solution**: Add date range limits, reduce data granularity, use data blending carefully.

---

## Additional Tracking Implementations

### Calendly Integration Tracking

Since bookings happen via Calendly iframe, implement Calendly webhook to track booking completions:

**Step 1**: Set up Calendly webhook (1 hour)
1. Go to Calendly account → Integrations → Webhooks
2. Create webhook pointing to: `https://vincesportsmassage.com/api/calendly-webhook`
3. Subscribe to events: `invitee.created`, `invitee.canceled`

**Step 2**: Create webhook endpoint (1 hour)
```typescript
// src/app/api/calendly-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { trackBookingCompleted } from '@/lib/analytics/gtag'

export async function POST(request: NextRequest) {
  const payload = await request.json()

  if (payload.event === 'invitee.created') {
    const { event_type, email, name } = payload.payload

    // Determine service and price from event_type
    const servicePrice = getServicePrice(event_type.name)

    // Track in GA4 (server-side)
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_ID}&api_secret=${process.env.GA_API_SECRET}`, {
      method: 'POST',
      body: JSON.stringify({
        client_id: email, // Use email as client ID
        events: [{
          name: 'booking_completed',
          params: {
            service: event_type.name,
            value: servicePrice,
            currency: 'GBP',
          }
        }]
      })
    })

    // Save to database (Supabase)
    // await saveBookingToDatabase(...)

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false })
}

function getServicePrice(eventTypeName: string): number {
  const priceMap: Record<string, number> = {
    'Sports Massage & Bodywork': 55,
    'Extended Session': 80,
    // ... other services
  }
  return priceMap[eventTypeName] || 55
}
```

### Heatmap & Session Recording

**Option 1: Microsoft Clarity (Free)**
1. Sign up at [Clarity](https://clarity.microsoft.com)
2. Create project
3. Add tracking code to layout.tsx
4. Monitor heatmaps, session recordings, scroll depth

**Option 2: Hotjar (Paid - £31/month)**
- More features, better UI
- Can capture form analytics
- User feedback surveys

**Recommendation**: Start with Microsoft Clarity (free), upgrade to Hotjar if needed.

---

## Phase 4 Summary

### Total Time: 10-12 hours

**Day 1-2**: GA4 setup and event tracking (4-5 hours)
**Day 3**: Conversion funnel setup (2 hours)
**Day 4**: Google Search Console integration (2 hours)
**Day 5**: Dashboard and reporting (2-3 hours)
**Additional**: Calendly webhook, heatmap tools (1-2 hours)

### Expected Impact

| Metric | Before Phase 4 | After Phase 4 |
|--------|----------------|---------------|
| Data visibility | None | Complete funnel tracking |
| Conversion insights | Guesswork | Data-driven decisions |
| SEO monitoring | Manual | Automated alerts |
| Reporting time | Hours | Minutes (automated) |
| Optimization speed | Slow | Fast (data-driven) |

### Files Created

```
src/
├── lib/
│   └── analytics/
│       └── gtag.ts (NEW)
├── app/
│   ├── layout.tsx (MODIFIED - add GA4 script)
│   └── api/
│       └── calendly-webhook/
│           └── route.ts (NEW)
└── components/
    └── common/
        └── scroll-tracker.tsx (NEW)
```

### Environment Variables

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
GA_API_SECRET=xxxxxxxxxxxxxx # For server-side tracking
```

### Definition of Done

- [ ] GA4 property created and verified
- [ ] Tracking code installed on all pages
- [ ] Custom events firing correctly
- [ ] Conversion funnel configured
- [ ] Conversion events marked in GA4
- [ ] Google Search Console verified
- [ ] Sitemap submitted and indexed
- [ ] Looker Studio dashboard created
- [ ] Automated weekly reports scheduled
- [ ] Calendly webhook integrated
- [ ] Heatmap tool installed (Clarity/Hotjar)
- [ ] Baseline metrics documented
- [ ] Team trained on dashboard usage

### Rollback Plan

If Phase 4 introduces issues:
1. Remove GA4 script from layout.tsx (tracking stops but site works)
2. Comment out event tracking calls (reduces noise)
3. Pause webhook endpoint (disable calendly webhook)
4. Continue collecting data in background, fix issues before re-enabling

---

## Success Criteria

Phase 4 is successful when:
1. All conversion events tracked accurately
2. Funnel shows clear drop-off points
3. Weekly reports arrive on schedule
4. Dashboard provides actionable insights
5. Conversion rate improves based on data-driven changes
6. At least 1 optimization implemented based on analytics data

---

**Phase 4 Status**: 🔜 Ready to Start
**Prerequisites**: Phases 1-3 complete (all features built)
**Estimated Completion**: 1 week (5 working days)
**Business Impact**: Data-driven optimization leading to 10-20% conversion improvement
