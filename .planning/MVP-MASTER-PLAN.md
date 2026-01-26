# VinceSportsMassage - Conversion Optimization Master Plan

**Project**: Website Conversion Optimization & SEO Enhancement
**Duration**: 10 Weeks (Part-Time, ~10 hours/week)
**Target**: 40-60% increase in booking conversion rate
**Budget**: £0-40/month recurring costs
**Status**: ✅ Phase 1 In Progress

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Key Decisions](#key-decisions)
4. [Phase Breakdown](#phase-breakdown)
5. [Timeline](#timeline)
6. [Cost Estimate](#cost-estimate)
7. [Success Metrics](#success-metrics)
8. [Risk Mitigation](#risk-mitigation)

---

## Project Overview

### The Problem
VinceSportsMassage.com has strong foundations (modern Next.js, 60+ 5★ reviews, professional design) but suffers from three critical conversion blockers:

1. **No transparent pricing** → users bounce before booking
2. **Zero email capture** → can't retarget interested visitors
3. **Mobile booking friction** → 30% lower mobile conversion

**Current State**: 2-3% booking conversion, 10-30 bookings/month (£650-£1,950 revenue)
**Target State**: 5-8% booking conversion, 25-80 bookings/month (£1,625-£5,200 revenue)

### The Solution
5-phase conversion optimization following proven E-E-A-T frameworks, UX best practices, and advanced SEO strategies from Resources library.

---

## Tech Stack

### Current Stack (Maintained)
- **Framework**: Next.js 16.0.7 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with CSS variables
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion 12.23.25
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel
- **Booking**: Calendly integration

### New Additions
- **Email Service**: Resend (free tier, 10k emails/month)
- **Analytics**: Google Analytics 4 (free)
- **Automation** (Optional): n8n (self-hosted or cloud)
- **Live Chat** (Optional): Crisp (£0-40/month)
- **Email Templates**: React Email

### Development Tools
- **Testing**: Playwright (E2E), Lighthouse (performance)
- **SEO**: Google Search Console, XML sitemaps
- **Monitoring**: Vercel Analytics, GA4 dashboards

---

## Key Decisions

### Decision 1: Pricing Display Strategy ✅ IMPLEMENTED
**Options Considered**:
- A) Hide pricing, force calendar interaction
- B) Show pricing after email capture
- C) Display transparent pricing upfront

**Decision**: Option C - Transparent pricing upfront

**Rationale**:
- Reduces booking abandonment by 20-30%
- Builds trust immediately
- Pre-qualifies leads
- Industry best practice for service businesses

**Implementation**:
- 4-tier pricing (£55 standard, £80 extended, packages at £150/£240)
- Displayed on homepage after services section
- Also on booking page before Calendly widget

---

### Decision 2: Email Capture Mechanism
**Options Considered**:
- A) Exit intent popup only
- B) Inline forms throughout site
- C) Multi-point strategy (popup + booking gate + blog upgrades)

**Decision**: Option C - Multi-point strategy

**Rationale**:
- Maximizes capture opportunities (3x channels)
- Non-intrusive when timed correctly
- Provides value exchange (free guide, not spam)
- Expected 200-500 leads in 6 months

**Implementation**:
- Exit intent popup with "Free Mobility Guide" offer
- Booking page email gate (enter email to see availability)
- Blog post content upgrades (downloadable guides)

---

### Decision 3: Email Service Provider
**Options Considered**:
- A) Resend (modern, free tier)
- B) SendGrid (established, complex)
- C) Mailchimp (expensive, overkill)

**Decision**: Option A - Resend

**Rationale**:
- Free tier: 10,000 emails/month (plenty for startup)
- Modern API, easy Next.js integration
- React Email template support
- No lock-in, can migrate later

**Cost**: £0/month (free tier sufficient)

---

### Decision 4: Analytics Platform
**Options Considered**:
- A) Google Analytics 4 (free, complex)
- B) Plausible (£9/month, simple)
- C) Fathom (£14/month, privacy-focused)

**Decision**: Option A - Google Analytics 4

**Rationale**:
- Free forever, no usage limits
- Industry standard, extensive features
- Integration with Google Search Console
- Conversion funnel visualization
- Already familiar to most marketers

**Cost**: £0/month

---

### Decision 5: Content Strategy Approach
**Options Considered**:
- A) Blog only (SEO focus)
- B) Service pages only (conversion focus)
- C) Combined approach (blog + service pages + case studies)

**Decision**: Option C - Combined approach

**Rationale**:
- Blog attracts organic traffic (top of funnel)
- Service pages convert visitors (bottom of funnel)
- Case studies build trust (social proof)
- Internal linking creates content clusters
- Follows SEO Master Playbook 2026 framework

---

### Decision 6: Mobile Booking UX ✅ IMPLEMENTED
**Options Considered**:
- A) Keep fixed 650px iframe (current issue)
- B) Make iframe responsive with CSS
- C) Replace Calendly with custom booking system

**Decision**: Option B - Responsive iframe

**Rationale**:
- Quick fix (1 hour implementation)
- No disruption to existing bookings
- Calendly handles complexity (scheduling, reminders, payments)
- Option C is future enhancement (out of scope)

**Implementation**:
- Responsive height: 600px mobile, 650px desktop
- Move "What to Expect" above iframe (reduce anxiety)
- Add pricing before booking widget

---

### Decision 7: FAQ Implementation ✅ IMPLEMENTED
**Options Considered**:
- A) Static FAQ page (separate URL)
- B) Accordion on homepage (prominent)
- C) Chatbot with AI (expensive)

**Decision**: Option B - Accordion on homepage

**Rationale**:
- Addresses objections at point of decision
- 10-15% reduction in pre-booking inquiries expected
- shadcn/ui Accordion component available
- Accessible, mobile-friendly, SEO-friendly

**Implementation**:
- 10 common questions covering pricing, preparation, medical, booking
- Placed before contact section on homepage
- Also on booking page

---

### Decision 8: Testimonial Strategy
**Options Considered**:
- A) Keep 3 generic testimonials (current)
- B) Add 10-12 specific testimonials (text)
- C) Add video testimonials (high production)

**Decision**: Option B - 10-12 specific testimonials

**Rationale**:
- Text testimonials easier to collect
- Specific results more credible ("reduced pain 50%" vs "great service")
- Can segment by client type (athlete, office worker, injury)
- Video testimonials are Phase 2+ enhancement

---

### Decision 9: Schema Markup Approach
**Options Considered**:
- A) Basic Organization schema (current)
- B) Enhanced LocalBusiness + Reviews schema
- C) Full entity optimization with Knowledge Graph

**Decision**: Option B - Enhanced schema

**Rationale**:
- LocalBusiness schema improves local search
- AggregateRating schema shows stars in SERP
- Person schema for Vince (author authority)
- Option C is advanced (Phase 4+)

---

### Decision 10: Automation Platform
**Options Considered**:
- A) Zapier (expensive, limited)
- B) n8n (free self-hosted, flexible)
- C) Custom code (time-intensive)

**Decision**: Option B - n8n (Phase 5)

**Rationale**:
- Free self-hosted or cloud trial
- 365+ integrations
- Visual workflow builder
- Recommended in Resources SEO automation guide

**Timeline**: Weeks 8-10 (Phase 5)

---

## Phase Breakdown

### ✅ Phase 1: Quick Wins (Week 1) - PARTIALLY COMPLETE
**Goal**: Fix critical conversion blockers immediately

**Completed** (2026-01-26):
- [x] Add transparent pricing section (homepage + booking page)
- [x] Create FAQ component with 10 common questions
- [x] Fix mobile booking UX (responsive Calendly iframe)
- [x] Restructure booking page (pricing → what to expect → booking)

**Remaining**:
- [ ] Implement email capture popup (exit intent)
- [ ] Add booking page email gate
- [ ] Set up Resend integration
- [ ] Create "Free Mobility Guide" PDF lead magnet

**Expected Impact**:
- Pricing transparency: -20-30% booking abandonment
- FAQ: -10-15% support inquiries
- Mobile UX: +15-25% mobile conversions
- Email capture: 50-100 leads/month

**Deliverables**:
- Pricing component (`src/components/sections/pricing.tsx`)
- FAQ component (`src/components/sections/faq.tsx`)
- Updated booking page (`src/app/(marketing)/booking/booking-page.tsx`)
- Email capture popup component
- Resend integration setup

**Time Estimate**: 20 hours total (15 hours complete, 5 hours remaining)

---

### Phase 2: Trust & Authority (Weeks 2-3) - E-E-A-T Framework
**Goal**: Implement Google E-E-A-T signals to build credibility

**Tasks**:
1. **Expand Testimonials** (6 hours)
   - Collect 10-12 testimonials with specific results
   - Add fields: clientType, condition, result, rating
   - Create testimonial categories (athlete, office worker, injury)
   - Update testimonials component to show variety
   - Create dedicated /testimonials page

2. **Add Credentials Section** (3 hours)
   - List Vince's actual certifications (not just "50+")
   - Add issuing organizations and years
   - Create credentials grid component
   - Add to About section

3. **Enhanced Schema Markup** (4 hours)
   - LocalBusiness schema with full details
   - Person schema for Vince (author authority)
   - AggregateRating schema (5.0, 60+ reviews)
   - Review schema (top 5 reviews with quotes)
   - Deploy to `src/lib/seo/schemas.ts`

4. **Create Case Studies** (6 hours)
   - 2-3 case study pages (athlete, office worker, injury)
   - Structure: Problem → Treatment → Results → Timeline
   - Add to `/case-studies/[slug]` routes
   - Include before/after descriptions
   - Link from services pages

**Expected Impact**:
- +20-30% trust signal boost
- Richer SERP snippets (stars, ratings, reviews)
- Better local search visibility
- +40-50% conversion from case study readers

**Deliverables**:
- Updated `src/lib/constants.ts` (testimonials, credentials)
- Enhanced schema in `src/lib/seo/schemas.ts`
- Case study pages (`src/app/case-studies/`)
- Credentials component in About section

**Time Estimate**: 19 hours

---

### Phase 3: Content Strategy (Weeks 4-6) - SEO Master Playbook
**Goal**: Build topical authority and targeted landing pages

**Tasks**:
1. **Service-Specific Landing Pages** (12 hours)
   - Create 6 individual service pages:
     - `/services/sports-massage`
     - `/services/deep-tissue-massage`
     - `/services/posture-correction`
     - `/services/breathwork-coaching`
     - `/services/injury-rehabilitation`
     - `/services/cupping-therapy`
   - Each page includes: benefits, who it's for, pricing, testimonial, FAQ, CTA
   - Pre-select service in Calendly link

2. **Blog Content Plan** (10 hours)
   - Write 5 blog posts:
     - **Pillar 1**: "What is Sports Massage? Complete Guide"
     - **Pillar 2**: "How to Fix Lower Back Pain with Massage Therapy"
     - **Pillar 3**: "Pre-Workout vs Post-Workout Massage"
     - **Pillar 4**: "Common Posture Mistakes at Your Desk"
     - **Pillar 5**: "Marathon Recovery: 5-Day Protocol"
   - Internal link to 2-3 service pages per post
   - Add content upgrade CTAs (email capture)

3. **Homepage Restructure** (3 hours)
   - New order: Hero → Trust Band → Services → Pricing → Testimonials → FAQ → About → Contact
   - Add trust band: "5.0★ · 60+ Reviews · 10+ Years · Verified by Google"
   - Move pricing earlier in journey
   - Expand testimonials (5-6 instead of 3)

**Expected Impact**:
- +30-40% higher conversion on service pages vs generic
- +100-200% organic traffic over 6 months
- Better keyword targeting (long-tail)
- Internal linking creates content clusters

**Deliverables**:
- 6 service landing pages
- 5 blog posts (published and indexed)
- Restructured homepage
- Internal linking map

**Time Estimate**: 25 hours

---

### Phase 4: Analytics & Measurement (Week 7) - Data-Driven Optimization
**Goal**: Implement comprehensive conversion tracking

**Tasks**:
1. **Google Analytics 4 Setup** (4 hours)
   - Create GA4 property
   - Install tracking code in `src/app/layout.tsx`
   - Set up custom events:
     - `booking_started` (Calendly clicked)
     - `booking_completed` (thank you page)
     - `email_captured` (popup/gate/blog)
     - `service_viewed` (service page)
     - `testimonial_read` (engagement)
     - `faq_opened` (accordion interaction)
     - `phone_clicked` (CTA)

2. **Conversion Funnel Tracking** (3 hours)
   - Define funnel: Homepage → Service → Booking → Email → Calendly → Complete
   - Set up funnel visualization in GA4
   - Track drop-off points

3. **Looker Studio Dashboard** (2 hours)
   - Create dashboard with KPIs:
     - Total visitors (monthly)
     - Booking conversion rate (%)
     - Email capture rate (%)
     - Top services
     - Mobile vs desktop
     - Traffic sources

4. **A/B Testing Framework** (1 hour)
   - Set up Vercel Edge Middleware for split testing
   - Prepare test variants:
     - CTA text ("Book Now" vs "Schedule Appointment")
     - Pricing placement (before vs after services)
     - Email popup timing (exit vs 30s vs 50% scroll)

**Expected Impact**:
- Complete visibility into conversion funnel
- Identify highest-impact optimization opportunities
- Data-driven decision making
- +5-10% conversion from A/B test wins

**Deliverables**:
- GA4 tracking implementation
- Conversion funnel configured
- Looker Studio dashboard
- A/B testing infrastructure

**Time Estimate**: 10 hours

---

### Phase 5: Automation & Scale (Weeks 8-10) - Marketing Automation
**Goal**: Automate lead nurture and client communication

**Tasks**:
1. **Email Nurture Sequences** (8 hours)
   - **Sequence 1: Lead Nurture** (Email capture → Booking)
     - Day 1: Welcome + Free mobility guide PDF
     - Day 3: "Common Myths About Sports Massage"
     - Day 7: Client success story + 10% off
     - Day 14: "Ready to book? Here's what to expect"

   - **Sequence 2: Post-Booking**
     - Day 0: Booking confirmation + calendar invite
     - Day -1: "Your appointment is tomorrow" + what to bring
     - Day +1: "How was your session?" + review request
     - Day +7: "Ready for next session?" + package offer

   - **Sequence 3: Re-Engagement**
     - 3 months after last booking: "We miss you!" + special offer

2. **n8n Workflow Setup** (10 hours)
   - Install n8n (self-hosted or cloud trial)
   - Create workflows:
     - Email capture → Add to Resend list
     - Booking complete → Post-booking sequence
     - Review request → Google Business Profile
     - Monthly analytics report
   - Integrate with Supabase, Resend, Calendly webhooks

3. **Automated Review Requests** (3 hours)
   - Trigger 24 hours after session
   - Personalized email with review link
   - Track review submission in database
   - Follow-up if no review after 7 days

4. **Performance Monitoring** (4 hours)
   - Set up uptime monitoring (UptimeRobot)
   - Configure Vercel Analytics alerts
   - Weekly conversion report automation
   - Monthly SEO rank tracking

**Expected Impact**:
- 200-500 email subscribers in 6 months
- +20-30% booking rate from nurtured leads
- Automated review collection (target 10+ reviews/month)
- Time saved: 5-10 hours/week on manual follow-ups

**Deliverables**:
- Email templates in React Email
- n8n workflows configured
- Resend integration complete
- Automated review system

**Time Estimate**: 25 hours

---

## Timeline

### Gantt Chart Overview

```
Week 1  [████████████████████] Phase 1: Quick Wins (PARTIAL ✅)
Week 2  [░░░░░░░░░░░░░░░░░░░░] Phase 2: Trust & Authority (Part 1)
Week 3  [░░░░░░░░░░░░░░░░░░░░] Phase 2: Trust & Authority (Part 2)
Week 4  [░░░░░░░░░░░░░░░░░░░░] Phase 3: Content Strategy (Service Pages)
Week 5  [░░░░░░░░░░░░░░░░░░░░] Phase 3: Content Strategy (Blog Posts)
Week 6  [░░░░░░░░░░░░░░░░░░░░] Phase 3: Content Strategy (Restructure)
Week 7  [░░░░░░░░░░░░░░░░░░░░] Phase 4: Analytics & Measurement
Week 8  [░░░░░░░░░░░░░░░░░░░░] Phase 5: Automation (Email Sequences)
Week 9  [░░░░░░░░░░░░░░░░░░░░] Phase 5: Automation (n8n Workflows)
Week 10 [░░░░░░░░░░░░░░░░░░░░] Phase 5: Automation (Monitoring)
```

### Weekly Breakdown

| Week | Phase | Key Deliverables | Hours |
|------|-------|------------------|-------|
| 1 | Phase 1 | Pricing, FAQ, Mobile UX, Email Capture | 20 |
| 2 | Phase 2 | Testimonials, Credentials, Schema | 10 |
| 3 | Phase 2 | Case Studies, Review Deployment | 9 |
| 4 | Phase 3 | 3 Service Landing Pages | 8 |
| 5 | Phase 3 | 3 More Service Pages + 2 Blog Posts | 10 |
| 6 | Phase 3 | 3 Blog Posts + Homepage Restructure | 7 |
| 7 | Phase 4 | GA4, Funnels, Dashboard, A/B Tests | 10 |
| 8 | Phase 5 | Email Sequences + Templates | 8 |
| 9 | Phase 5 | n8n Workflows + Integrations | 10 |
| 10 | Phase 5 | Review Automation + Monitoring | 7 |

**Total**: 99 hours over 10 weeks (~10 hours/week)

---

## Cost Estimate

### Monthly Recurring Costs

| Service | Tier | Cost | Notes |
|---------|------|------|-------|
| **Resend** | Free | £0 | 10,000 emails/month (sufficient) |
| **Google Analytics 4** | Free | £0 | Unlimited events and reports |
| **Vercel** | Hobby | £0 | Existing (unchanged) |
| **Supabase** | Free | £0 | 500MB database (sufficient) |
| **Domain** | N/A | £0 | Existing (unchanged) |
| **Calendly** | N/A | £0 | Existing (unchanged) |
| **n8n** | Self-hosted | £0 | Or £20/month cloud (optional) |
| **Crisp Live Chat** | Free/Paid | £0-40 | Optional (Phase 5+) |

**Total Monthly Cost**: £0-60/month (depending on optional services)

### One-Time Costs
- None (all free tiers or existing services)

### Cost Comparison: Before vs After
- **Before**: Existing £0/month (Vercel free tier)
- **After**: £0-60/month (with optional live chat and n8n cloud)
- **Increase**: £0-60/month

### ROI Calculation
- Additional monthly cost: £30/month (midpoint)
- Expected revenue increase: £975-£3,250/month (2.5x lift)
- ROI: 3,250% - 10,833%
- Payback period: < 1 day

---

## Success Metrics

### Conversion Metrics (Primary)
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Booking Conversion Rate** | 2-3% | 5-8% | GA4 funnel |
| **Email Capture Rate** | 0% | 15-25% | GA4 events |
| **Mobile Conversion** | 1.5-2% | 3-5% | GA4 segments |
| **Avg Booking Value** | £55 | £65 | Calendly data |

### Traffic Metrics (Secondary)
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Organic Traffic** | 500-1,000/mo | 1,000-2,000/mo | GA4 |
| **Direct Traffic** | 100-200/mo | 200-400/mo | GA4 |
| **Page Load Time** | <2s | <2s (maintain) | Lighthouse |
| **Bounce Rate** | 60-70% | <50% | GA4 |

### Business Metrics (Outcomes)
| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| **Monthly Bookings** | 10-30 | 25-80 | Calendly |
| **Monthly Revenue** | £650-£1,950 | £1,625-£5,200 | Calendly |
| **Email List Size** | 0 | 200-500 (6mo) | Resend |
| **Google Reviews** | 60 | 100+ (6mo) | Google Business |

### Leading Indicators (Weekly)
- Homepage → Service page click-through: >20%
- Service page → Booking page: >30%
- Booking page → Calendly open: >50%
- FAQ accordion opens: >40% of visitors
- Email popup conversion: >5%

---

## Risk Mitigation

### Critical Risks

**Risk 1: Email Popup Annoys Users**
- **Likelihood**: Medium
- **Impact**: Medium (increased bounce rate)
- **Mitigation**:
  - A/B test timing (exit intent vs 30s delay vs 50% scroll)
  - Easy dismiss button (no dark patterns)
  - Show once per session (localStorage)
  - Monitor bounce rate closely
- **Rollback Plan**: Disable popup if bounce rate increases >10%

**Risk 2: Pricing Transparency Reduces Bookings**
- **Likelihood**: Low
- **Impact**: High (revenue loss)
- **Mitigation**:
  - A/B test placement (before vs after services)
  - Monitor conversion closely in first week
  - Have competitor pricing research ready
- **Rollback Plan**: Move pricing to booking page only if conversion drops

**Risk 3: Content Creation Bottleneck**
- **Likelihood**: High
- **Impact**: Medium (delayed launch)
- **Mitigation**:
  - Start with 3 blog posts instead of 5
  - Use AI for first drafts (human edit)
  - Batch content creation days
- **Rollback Plan**: Scale back to 3 service pages + 3 blog posts

**Risk 4: GA4 Tracking Errors**
- **Likelihood**: Medium
- **Impact**: Low (data quality)
- **Mitigation**:
  - Use GA4 DebugView during setup
  - Test all events in staging
  - Verify data flowing after 24 hours
- **Rollback Plan**: Fix tracking issues within first week

**Risk 5: Email Deliverability Issues**
- **Likelihood**: Low
- **Impact**: Medium (nurture failure)
- **Mitigation**:
  - Set up SPF, DKIM, DMARC records
  - Use Resend verified domain
  - Monitor bounce rates
  - Test emails to multiple providers
- **Rollback Plan**: Switch to SendGrid if issues persist

**Risk 6: n8n Workflow Failures**
- **Likelihood**: Medium (new tool)
- **Impact**: Medium (automation stops)
- **Mitigation**:
  - Extensive testing in development
  - Error handling in all workflows
  - Email alerts on workflow failures
  - Manual backup process documented
- **Rollback Plan**: Run sequences manually while debugging

---

## Go/No-Go Gates

### Gate 1: After Phase 1 (Week 1)
**Criteria**:
- [ ] Booking conversion rate improved by at least 10%
- [ ] Mobile booking UX receives positive feedback
- [ ] No increase in bounce rate
- [ ] Email capture popup functional

**Decision**: Proceed to Phase 2 if ≥3 criteria met

---

### Gate 2: After Phase 2 (Week 3)
**Criteria**:
- [ ] 10+ testimonials collected and deployed
- [ ] Schema markup showing in Google SERP
- [ ] Case studies published
- [ ] No technical issues from schema changes

**Decision**: Proceed to Phase 3 if all criteria met

---

### Gate 3: After Phase 3 (Week 6)
**Criteria**:
- [ ] 6 service pages live and indexed
- [ ] 5 blog posts published
- [ ] Organic traffic increased by at least 20%
- [ ] Internal linking implemented

**Decision**: Proceed to Phase 4 if ≥3 criteria met

---

### Gate 4: After Phase 4 (Week 7)
**Criteria**:
- [ ] GA4 tracking all events correctly
- [ ] Conversion funnel showing accurate data
- [ ] Dashboard accessible and useful
- [ ] Booking conversion rate ≥4%

**Decision**: Proceed to Phase 5 if all criteria met

---

### Gate 5: After Phase 5 (Week 10)
**Criteria**:
- [ ] Email sequences sending successfully
- [ ] n8n workflows stable for 1 week
- [ ] 50+ email subscribers captured
- [ ] Overall booking conversion rate ≥5%

**Decision**: Project complete if all criteria met, else extend Phase 5

---

## Trade-offs Made

### Scope Trade-offs
- **Custom booking system** → Keep Calendly (faster to market)
- **Video testimonials** → Text testimonials (lower production cost)
- **Professional photography** → Use existing images (budget constraint)
- **Paid advertising** → Organic SEO only (higher ROI long-term)
- **Client portal** → Future phase (not MVP critical)

### Technical Trade-offs
- **Resend free tier** → SendGrid enterprise (cost vs features)
- **Self-hosted n8n** → n8n Cloud (complexity vs reliability)
- **GA4** → Plausible (free vs privacy-focused)
- **Static blog** → WordPress (performance vs ease of use)

### Content Trade-offs
- **5 blog posts** → 10 blog posts (time constraint)
- **6 service pages** → 12 service pages (diminishing returns)
- **2-3 case studies** → 10 case studies (collection time)

---

## Next Steps

### Immediate (This Week)
1. ✅ Complete Phase 1 remaining tasks:
   - [ ] Implement email capture popup
   - [ ] Add booking page email gate
   - [ ] Set up Resend account
   - [ ] Create "Free Mobility Guide" PDF

2. ✅ Review Phase 1 results:
   - [ ] Check booking conversion rate change
   - [ ] Gather user feedback on pricing display
   - [ ] Monitor mobile booking completion

### Short-term (Next 2 Weeks)
3. Begin Phase 2 (Trust & Authority):
   - [ ] Collect testimonials from past clients
   - [ ] Document Vince's certifications
   - [ ] Write first case study

### Long-term (Next 10 Weeks)
4. Execute full 10-week plan
5. Monitor KPIs weekly
6. Adjust based on data
7. Scale what works

---

**Plan Status**: 🟢 ACTIVE
**Last Updated**: 2026-01-26
**Next Review**: After Phase 1 completion (estimated 2026-02-02)
**Owner**: Development Team
**Stakeholder**: Vince McDowell
