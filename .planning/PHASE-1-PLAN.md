# PHASE 1: Quick Wins - Detailed Implementation Plan

**Duration**: Week 1 (5 working days)
**Goal**: Fix critical conversion blockers immediately
**Estimated Hours**: 20 hours total
**Status**: 🟡 75% Complete

---

## Phase Overview

**What We're Building**:
1. ✅ Transparent pricing display (COMPLETE)
2. ✅ FAQ section with 10 common questions (COMPLETE)
3. ✅ Mobile booking UX improvements (COMPLETE)
4. ⏳ Email capture popup (exit intent)
5. ⏳ Booking page email gate
6. ⏳ Resend email integration
7. ⏳ Lead magnet PDF creation

**Expected Outcomes**:
- 20-30% reduction in booking abandonment (pricing transparency)
- 10-15% fewer support inquiries (FAQ)
- 15-25% improvement in mobile conversions
- 50-100 email leads captured per month

---

## Day 1: Email Capture Popup Component (4 hours) ⏳

### Morning (2 hours)
**Task**: Design and build exit intent popup

**Deliverables**:
- Create `src/components/forms/email-capture-popup.tsx`
- Implement exit intent detection (mouse leave viewport)
- Design popup UI (modal with form)
- Add localStorage to show once per session

**Code to Write**:
```tsx
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailCapturePopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    // Check if already shown
    const hasShown = localStorage.getItem("email-popup-shown")
    if (hasShown) return

    // Exit intent detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        localStorage.setItem("email-popup-shown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Send to Resend API
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
          >
            {/* Popup content */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Testing**:
- [ ] Popup appears on exit intent
- [ ] Doesn't show twice (localStorage check)
- [ ] Form validation works
- [ ] Close button functional
- [ ] Accessible (keyboard navigation)

### Afternoon (2 hours)
**Task**: Integrate popup into layout

**Files to Modify**:
- `src/app/layout.tsx` - Add EmailCapturePopup component

**Testing**:
- [ ] Popup works on all pages
- [ ] Doesn't interfere with navigation
- [ ] Mobile responsive
- [ ] No flash of unstyled content

**Potential Issues**:
- Exit intent too sensitive → Adjust Y threshold
- LocalStorage not working → Add error handling
- Popup blocks content → Adjust z-index

---

## Day 2: Resend Email Integration (3 hours) ⏳

### Morning (2 hours)
**Task**: Set up Resend account and API integration

**Steps**:
1. Create Resend account (https://resend.com)
2. Verify domain (vincesportsmassage.com)
3. Get API key
4. Add to environment variables

**Environment Variables**:
```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=vince@vincesportsmassage.com
```

**Deliverables**:
- Create `src/lib/email/resend-client.ts`
- Create email templates

**Code to Write**:
```typescript
import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendWelcomeEmail(email: string, name: string) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: 'Your Free Mobility Assessment Guide',
    html: `<h1>Welcome ${name}!</h1>...`
  })

  if (error) throw error
  return data
}
```

**Testing**:
- [ ] Test email sends successfully
- [ ] Email appears in inbox (not spam)
- [ ] Verify SPF/DKIM records
- [ ] Error handling works

### Afternoon (1 hour)
**Task**: Create API route for email capture

**Deliverables**:
- Create `src/app/api/email-capture/route.ts`

**Code to Write**:
```typescript
import { NextResponse } from 'next/server'
import { sendWelcomeEmail } from '@/lib/email/resend-client'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const { email, name, source } = await request.json()

  // Validate
  if (!email || !name) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Save to database
  const supabase = createClient()
  const { error: dbError } = await supabase
    .from('email_subscribers')
    .insert({ email, name, source, subscribed_at: new Date() })

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  // Send welcome email
  await sendWelcomeEmail(email, name)

  return NextResponse.json({ success: true })
}
```

**Database Migration**:
```sql
-- Create email_subscribers table
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  source TEXT, -- 'exit-popup', 'booking-gate', 'blog-upgrade'
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
```

**Testing**:
- [ ] API route accepts POST requests
- [ ] Email saved to Supabase
- [ ] Welcome email sent
- [ ] Error responses correct

---

## Day 3: Lead Magnet PDF Creation (3 hours) ⏳

### Morning (2 hours)
**Task**: Create "Free 5-Minute Mobility Assessment Guide" PDF

**Content Outline**:
1. Cover page with branding
2. Introduction (why mobility matters)
3. 5 quick tests:
   - Shoulder mobility test
   - Hip flexor test
   - Ankle mobility test
   - Spinal rotation test
   - Core stability test
4. Scoring guide
5. Next steps (book assessment with Vince)

**Tools**:
- Canva (free design tool)
- Or Google Docs → Export PDF

**Deliverables**:
- PDF file (`public/downloads/mobility-guide.pdf`)
- 5-10 pages, professionally designed
- Vince Sports Massage branding
- Clear call-to-action at end

**Testing**:
- [ ] PDF downloads correctly
- [ ] Mobile-friendly viewing
- [ ] File size < 2MB
- [ ] All links work

### Afternoon (1 hour)
**Task**: Update email template with PDF attachment

**Files to Modify**:
- `src/lib/email/resend-client.ts`

**Code Change**:
```typescript
export async function sendWelcomeEmail(email: string, name: string) {
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: 'Your Free Mobility Assessment Guide',
    attachments: [
      {
        filename: 'mobility-guide.pdf',
        path: './public/downloads/mobility-guide.pdf'
      }
    ],
    html: WelcomeEmailTemplate({ name })
  })

  return data
}
```

**Testing**:
- [ ] PDF attachment receives correctly
- [ ] Email doesn't go to spam
- [ ] File opens on all devices

---

## Day 4: Booking Page Email Gate (3 hours) ⏳

### Morning (2 hours)
**Task**: Add email capture before Calendly widget

**Deliverables**:
- Create `src/components/forms/booking-email-gate.tsx`
- Conditional rendering of Calendly

**Code to Write**:
```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

export function BookingEmailGate({
  children
}: {
  children: React.ReactNode
}) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Send to API
    await fetch('/api/email-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source: 'booking-gate' })
    })

    setIsUnlocked(true)
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div className="bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-300">
      <div className="max-w-md mx-auto text-center">
        <Lock className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Enter Your Details to View Availability
        </h3>
        <p className="text-slate-600 mb-6">
          Quick and easy. See real-time availability and book your session.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
        </form>
      </div>
    </div>
  )
}
```

### Afternoon (1 hour)
**Task**: Integrate email gate into booking page

**Files to Modify**:
- `src/app/(marketing)/booking/booking-page.tsx`

**Code Change**:
```tsx
<BookingEmailGate>
  <iframe src={calendlyUrl} ... />
</BookingEmailGate>
```

**Testing**:
- [ ] Email gate shows before Calendly
- [ ] Form submission unlocks widget
- [ ] Email saved to database
- [ ] Validation works correctly
- [ ] Can't bypass with DevTools

---

## Day 5: Testing & Polish (3 hours) ⏳

### Morning (2 hours)
**Task**: End-to-end testing of all Phase 1 features

**Test Scenarios**:

**1. Pricing Section**:
- [ ] Loads on homepage
- [ ] All 4 pricing tiers visible
- [ ] Hover animations smooth
- [ ] Mobile responsive
- [ ] "Book Now" CTAs work

**2. FAQ Section**:
- [ ] All 10 questions present
- [ ] Accordion opens/closes smoothly
- [ ] Staggered animations work
- [ ] Mobile responsive
- [ ] Search engine indexable

**3. Mobile Booking UX**:
- [ ] Pricing shows before Calendly
- [ ] "What to Expect" above widget
- [ ] Iframe responsive (600px mobile, 650px desktop)
- [ ] No excessive scrolling
- [ ] Contact info visible

**4. Email Capture Popup**:
- [ ] Appears on exit intent
- [ ] Shows once per session
- [ ] Form validation works
- [ ] Welcome email sends
- [ ] PDF attachment arrives

**5. Booking Email Gate**:
- [ ] Shows before Calendly
- [ ] Form submission unlocks
- [ ] Email saved to database
- [ ] Can't bypass easily

### Afternoon (1 hour)
**Task**: Performance testing and optimization

**Lighthouse Audit**:
- [ ] Performance score: >90
- [ ] Accessibility: >95
- [ ] Best Practices: >90
- [ ] SEO: >95

**Performance Checks**:
- [ ] Page load time: < 2 seconds
- [ ] Largest Contentful Paint: < 2.5s
- [ ] First Input Delay: < 100ms
- [ ] Cumulative Layout Shift: < 0.1

**Optimization Tasks**:
- [ ] Compress images if needed
- [ ] Lazy load Calendly iframe
- [ ] Preload critical fonts
- [ ] Enable caching headers

---

## Day 6-10: Buffer & Documentation (4 hours)

### Documentation (2 hours)
**Task**: Document all Phase 1 changes

**Deliverables**:
- Update `README.md` with setup instructions
- Document environment variables
- Create email template guide
- Write user guide for Vince

**Files to Create**:
- `docs/EMAIL-SETUP.md` - Resend configuration
- `docs/DATABASE-SCHEMA.md` - Email subscribers table
- `docs/LEAD-MAGNETS.md` - How to update PDF

### Buffer Time (2 hours)
**Purpose**: Handle unexpected issues

**Common Issues**:
- Email deliverability problems
- Database migration errors
- Popup timing issues
- Mobile responsiveness bugs

---

## Deliverables Checklist

### Components Created
- [x] `src/components/sections/pricing.tsx` (COMPLETE)
- [x] `src/components/sections/faq.tsx` (COMPLETE)
- [x] `src/components/sections/trust-bar.tsx` (COMPLETE)
- [x] `src/components/common/scroll-progress.tsx` (COMPLETE)
- [ ] `src/components/forms/email-capture-popup.tsx`
- [ ] `src/components/forms/booking-email-gate.tsx`

### Backend/API
- [ ] `src/lib/email/resend-client.ts`
- [ ] `src/app/api/email-capture/route.ts`
- [ ] Database migration (email_subscribers table)

### Content
- [ ] Mobility Assessment Guide PDF
- [ ] Welcome email template
- [ ] Email gate copy

### Pages Modified
- [x] `src/app/page.tsx` (COMPLETE)
- [x] `src/app/(marketing)/booking/booking-page.tsx` (COMPLETE)
- [ ] `src/app/layout.tsx` (add email popup)

### Environment Variables
- [ ] `RESEND_API_KEY`
- [ ] `RESEND_FROM_EMAIL`

---

## Files Created/Modified

### New Files (7)
1. ✅ `src/components/sections/pricing.tsx`
2. ✅ `src/components/sections/faq.tsx`
3. ✅ `src/components/sections/trust-bar.tsx`
4. ✅ `src/components/common/scroll-progress.tsx`
5. ⏳ `src/components/forms/email-capture-popup.tsx`
6. ⏳ `src/components/forms/booking-email-gate.tsx`
7. ⏳ `src/lib/email/resend-client.ts`
8. ⏳ `src/app/api/email-capture/route.ts`
9. ⏳ `public/downloads/mobility-guide.pdf`

### Modified Files (5)
1. ✅ `src/lib/constants.ts` (pricing data, FAQ data)
2. ✅ `src/components/sections/index.ts`
3. ✅ `src/app/page.tsx`
4. ✅ `src/app/(marketing)/booking/booking-page.tsx`
5. ⏳ `src/app/layout.tsx`
6. ⏳ `.env.local`

---

## Database Changes

### New Tables
```sql
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  source TEXT CHECK (source IN ('exit-popup', 'booking-gate', 'blog-upgrade')),
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX idx_email_subscribers_source ON email_subscribers(source);
```

---

## Testing Checklist

### Unit Tests
- [ ] Email capture form validation
- [ ] API route error handling
- [ ] Resend client error handling
- [ ] Email gate unlock logic

### Integration Tests
- [ ] Email capture → Database → Email send flow
- [ ] Booking gate → Unlock → Calendly display
- [ ] Exit popup → Form submit → Welcome email

### E2E Tests
- [ ] User visits homepage → exit popup → submit → receive email
- [ ] User visits booking → enter details → see Calendly → book
- [ ] Mobile user → all features work

### Manual Testing
- [ ] Test on Chrome, Firefox, Safari
- [ ] Test on iOS, Android
- [ ] Test with slow 3G connection
- [ ] Test with screen reader

---

## Potential Issues & Solutions

### Issue 1: Exit Intent Too Sensitive
**Problem**: Popup appears when moving to browser tabs
**Solution**: Adjust Y threshold to -50px instead of 0

### Issue 2: Email Goes to Spam
**Problem**: Welcome emails land in spam folder
**Solution**:
- Verify SPF, DKIM, DMARC records
- Use Resend's verified domain
- Avoid spammy words in subject line
- Test with mail-tester.com

### Issue 3: LocalStorage Not Working
**Problem**: Popup shows multiple times
**Solution**:
- Add error handling for localStorage
- Fall back to sessionStorage
- Check browser privacy settings

### Issue 4: Database Connection Errors
**Problem**: Email not saving to Supabase
**Solution**:
- Check Supabase connection string
- Verify table exists
- Add retry logic
- Log errors to console

### Issue 5: PDF Too Large
**Problem**: Email with attachment bounces
**Solution**:
- Compress PDF to < 2MB
- Or host PDF and send link instead
- Optimize images in PDF

---

## Definition of Done

Phase 1 is complete when ALL of the following are true:

### Functionality
- [ ] Pricing section displays on homepage and booking page
- [ ] FAQ accordion works smoothly with all 10 questions
- [ ] Mobile booking UX is improved (responsive iframe)
- [ ] Email capture popup appears on exit intent
- [ ] Booking page email gate unlocks Calendly
- [ ] Emails send successfully via Resend
- [ ] PDF lead magnet downloads correctly

### Quality
- [ ] Lighthouse performance score > 90
- [ ] No console errors
- [ ] Mobile responsive (tested on iOS and Android)
- [ ] Accessible (keyboard navigation works)
- [ ] Cross-browser tested (Chrome, Safari, Firefox)

### Data
- [ ] Email subscribers table created
- [ ] At least 5 test emails captured
- [ ] Welcome emails landing in inbox (not spam)
- [ ] Database queries optimized

### Documentation
- [ ] README updated with setup instructions
- [ ] Environment variables documented
- [ ] Email templates documented
- [ ] User guide for Vince created

### Metrics
- [ ] Booking conversion rate improved by at least 10%
- [ ] Mobile bounce rate decreased
- [ ] At least 10 email subscribers in first week

---

## Rollback Plan

If Phase 1 causes issues:

### Immediate Rollback (< 5 minutes)
```bash
# Revert to previous deployment
vercel rollback
```

### Selective Rollback
- **Email popup causing issues**: Comment out in `layout.tsx`
- **Booking gate problematic**: Remove `<BookingEmailGate>` wrapper
- **Pricing hurting conversion**: Move to booking page only

### Data Rollback
```sql
-- Remove test email subscribers
DELETE FROM email_subscribers WHERE created_at > '2026-01-26';
```

---

## Next Steps After Phase 1

1. **Monitor Metrics** (Week 2):
   - Daily check of booking conversion rate
   - Weekly email list growth
   - Mobile vs desktop conversion rates

2. **Gather Feedback**:
   - Ask Vince for observations
   - Check user complaints
   - Review GA4 funnel data

3. **Optimize Based on Data**:
   - A/B test email popup timing
   - Test booking gate vs no gate
   - Refine FAQ content

4. **Prepare for Phase 2**:
   - Collect testimonials from clients
   - Document Vince's certifications
   - Plan first case study

---

**Phase 1 Status**: 🟡 75% Complete (Days 1-5 remaining)
**Estimated Completion**: 2026-02-02
**Next Review**: 2026-02-03 (after 1 week of data)
