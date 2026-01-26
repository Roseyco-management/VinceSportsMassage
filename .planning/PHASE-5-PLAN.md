# Phase 5: Automation & Scale - Detailed Implementation Plan

**Timeline**: Weeks 8-10 (15 working days)
**Effort**: 25-30 hours
**Status**: 🔜 Ready to Start
**Dependencies**: Phases 1-4 complete (all features built, analytics tracking)

---

## Overview

Phase 5 implements marketing automation, email sequences, review collection systems, and scalable processes to maximize ROI from website traffic. This phase transforms the website from a passive booking tool into an active lead nurture and conversion machine.

**Expected Impact**:
- +200-500 email leads per month
- +15-20% conversion from email nurture
- Automated review collection (10-15 new reviews/month)
- Reduced manual marketing work (save 5-10 hours/week)
- Improved client retention and repeat bookings

---

## Day 1-3: Email Automation Infrastructure (8 hours)

### Objective
Set up email automation system using Resend + n8n (or alternative) to nurture leads and convert browsers into bookings.

### Tool Selection

**Option A: Resend + n8n** (Recommended - Free tier)
- Resend: Email sending (100 emails/day free)
- n8n: Workflow automation (self-hosted free or cloud €20/month)
- Total cost: £0-20/month

**Option B: Brevo (formerly Sendinblue)** (All-in-one)
- Free tier: 300 emails/day
- Built-in automation workflows
- Total cost: £0 (free tier)

**Recommendation**: Start with **Option B (Brevo)** for simplicity, migrate to Resend + n8n later if needed.

### Implementation Steps

**Step 1**: Create Brevo account (30 minutes)
1. Sign up at [Brevo](https://www.brevo.com)
2. Verify email
3. Set up sender profile:
   - From name: Vince McDowell
   - From email: [email protected]
   - Reply-to: [email protected]

**Step 2**: Verify domain (1 hour)
1. Add DNS records for vincesportsmassage.com:
   - SPF record
   - DKIM record
   - DMARC record
2. Wait for verification (can take 24-48 hours)
3. Send test email to verify deliverability

**Step 3**: Create email templates (3 hours)

**Template 1: Lead Magnet Delivery**
```html
Subject: Your Free Mobility Assessment Guide

Hi {{firstName}},

Thanks for downloading the Free 5-Minute Mobility Assessment Guide!

You can access your guide here: [Download Link]

This quick assessment will help you:
✓ Identify areas of tightness and restriction
✓ Understand your movement quality
✓ Know when to seek professional help

Want personalized advice? Book a consultation and I'll create a custom treatment plan for your specific needs.

[Book Consultation - £55]

Best regards,
Vince McDowell
Sports Massage Therapist
📞 07709 839734
🌐 vincesportsmassage.com
```

**Template 2: Welcome Email (Day 1)**
```html
Subject: Welcome! Here's what you need to know about sports massage

Hi {{firstName}},

I'm Vince McDowell, and I'm excited to have you on my email list!

As a Level 5 certified sports massage therapist, I've spent 10+ years helping clients in Downpatrick overcome pain, recover from injuries, and achieve their performance goals.

Here's what you can expect from me:
✓ Practical tips for pain relief and injury prevention
✓ Exclusive offers (subscribers only)
✓ Success stories and case studies
✓ Evidence-based advice on recovery and performance

**Special Offer for New Subscribers**:
Book your first session this month and get 10% off (use code: WELCOME10)

[Book Your Session - Save 10%]

Questions? Just reply to this email!

Best regards,
Vince

P.S. Follow me on Instagram [@vincesportsmassage] for daily tips and behind-the-scenes content.
```

**Template 3: Educational Email (Day 3)**
```html
Subject: 5 Myths About Sports Massage (Debunked)

Hi {{firstName}},

There's a lot of misinformation about sports massage. Let me set the record straight:

**Myth 1: "It's only for professional athletes"**
❌ False! Anyone with an active lifestyle can benefit—from runners to office workers.

**Myth 2: "More pain = Better results"**
❌ False! Effective treatment should be therapeutic, not torturous.

**Myth 3: "One session will fix everything"**
❌ False! Chronic issues need multiple sessions for lasting change.

**Myth 4: "Massage is just for relaxation"**
❌ False! Sports massage is treatment-focused, not spa-focused.

**Myth 5: "I should only get massage when injured"**
❌ False! Regular massage prevents injuries before they happen.

Want to experience the benefits for yourself?

[Book Your Session - £55]

Best regards,
Vince
```

**Template 4: Case Study Email (Day 7)**
```html
Subject: How Sarah went from chronic knee pain to marathon PB

Hi {{firstName}},

I want to share an inspiring client story with you.

Sarah, a marathon runner, came to me with debilitating IT band syndrome. She couldn't run more than 3km without severe knee pain.

After just 4 sessions focused on:
✓ Deep tissue work on tight hip flexors
✓ Posture correction
✓ Running gait analysis

Sarah completed her marathon PAIN-FREE and set a personal best time (3:45:22).

[Read Sarah's Full Story]

Could this be you? If you're dealing with running-related pain or any sports injury, I can help.

[Book Your Assessment]

Best regards,
Vince
```

**Template 5: Special Offer Email (Day 14)**
```html
Subject: {{firstName}}, ready to book? Here's 10% off

Hi {{firstName}},

You've been learning about sports massage for 2 weeks now. Ready to experience it for yourself?

For the next 7 days, I'm offering email subscribers:
🎟️ 10% off your first session
💰 £49.50 instead of £55

Use code: FIRSTVISIT10 at booking.

This offer includes:
✓ Comprehensive posture assessment
✓ 60 minutes of hands-on treatment
✓ Personalized home exercise advice
✓ Treatment plan for your goals

Spots are limited (I only see 4-6 clients per day).

[Book Now - Save 10%]

Offer expires: [Date 7 days from now]

Best regards,
Vince

P.S. Not ready yet? No problem. I'll keep sending valuable content your way.
```

**Step 4**: Set up automation workflows (2 hours)

**Workflow 1: Lead Magnet Sequence**
```
Trigger: Email captured (tag: lead_magnet)
├─ Day 0: Send lead magnet PDF immediately
├─ Day 1: Welcome email
├─ Day 3: Educational email (5 myths)
├─ Day 7: Case study email
├─ Day 14: Special offer email
└─ Day 30: Re-engagement email
```

**Workflow 2: Pre-Booking Sequence**
```
Trigger: Email captured on booking page (tag: booking_intent)
├─ Immediately: "See real-time availability" email
├─ 2 hours later: Testimonials email (if no booking)
├─ 24 hours later: FAQ email (if no booking)
├─ 3 days later: Special offer (if no booking)
```

**Workflow 3: Post-Booking Confirmation**
```
Trigger: Calendly booking confirmed (via webhook)
├─ Immediately: Booking confirmation + calendar invite
├─ 1 day before: Reminder email (what to bring, how to prepare)
├─ 1 day after: Follow-up email (how was session?)
├─ 7 days after: Review request
├─ 30 days after: Re-booking reminder
```

**Step 5**: Integrate with website (1 hour)
```typescript
// src/lib/email/brevo.ts - NEW FILE
const BREVO_API_KEY = process.env.BREVO_API_KEY

export async function addContactToBrevo(email: string, firstName: string, source: string) {
  const response = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes: {
        FIRSTNAME: firstName,
        SOURCE: source,
      },
      listIds: [1], // Main email list
      updateEnabled: true,
    }),
  })

  return response.json()
}

export async function sendTransactionalEmail(
  to: string,
  templateId: number,
  params: Record<string, any>
) {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'api-key': BREVO_API_KEY,
    },
    body: JSON.stringify({
      to: [{ email: to }],
      templateId,
      params,
    }),
  })

  return response.json()
}
```

### Testing Checklist

- [ ] Brevo account created and verified
- [ ] Domain verified (SPF, DKIM, DMARC)
- [ ] Test email deliverability (inbox, not spam)
- [ ] All 5 email templates created
- [ ] Automation workflows configured
- [ ] Test sequences fire correctly
- [ ] Integration with website working
- [ ] Unsubscribe link present and working
- [ ] Mobile responsive email templates

### Potential Issues & Solutions

**Issue**: Emails landing in spam
**Solution**: Ensure domain verified, warm up email sending (start with 10/day, increase gradually), avoid spam trigger words, include physical address.

**Issue**: Automation not triggering
**Solution**: Check webhook connections, verify tags applied correctly, test with dummy data.

**Issue**: High unsubscribe rate
**Solution**: Review email frequency (max 2-3/week), ensure value in every email, segment lists better.

---

## Day 4-6: Review Collection Automation (6 hours)

### Objective
Implement automated review collection system to consistently gather 5-star Google reviews and testimonials.

### Implementation Steps

**Step 1**: Create review request email template (1 hour)
```html
Subject: {{firstName}}, how was your session? Share your feedback

Hi {{firstName}},

I hope you're feeling great after your recent sports massage session!

I'd love to hear about your experience. Your feedback helps me:
✓ Improve my service
✓ Help other clients like you find the right treatment
✓ Continue growing my practice in Downpatrick

If you have 60 seconds, I'd really appreciate a quick review:

[Leave a Google Review] (takes 1 minute)

**Not sure what to write?** Here are some prompts:
- How did you feel before vs after treatment?
- Did I address your specific concerns?
- Would you recommend me to friends/family?

Thank you for trusting me with your health!

Best regards,
Vince

P.S. Prefer to keep feedback private? Just reply to this email.
```

**Step 2**: Set up review funnel (2 hours)

**Automated Review Request Flow**:
```
Trigger: 7 days after booking (Calendly webhook)
├─ Send review request email
├─ Wait 3 days
├─ If no review: Send gentle reminder
├─ If review left: Send thank you email
└─ If negative feedback: Flag for personal follow-up
```

**Step 3**: Create Google Review link (30 minutes)
1. Find your Google Business Profile Place ID
2. Create short review link: `https://g.page/r/[YOUR_PLACE_ID]/review`
3. Use link shortener: `https://vincesportsmassage.com/review` → redirects to Google

```typescript
// src/app/review/route.ts - NEW FILE
import { redirect } from 'next/navigation'

export async function GET() {
  // Replace with actual Google Business Profile review link
  redirect('https://g.page/r/PLACE_ID_HERE/review')
}
```

**Step 4**: Incentivize reviews (ethically) (1 hour)

**What you CAN do**:
✅ Ask all clients for reviews
✅ Make it easy with direct links
✅ Follow up with reminder emails
✅ Thank reviewers publicly
✅ Feature reviews on website

**What you CANNOT do**:
❌ Offer discounts for reviews (against Google policy)
❌ Cherry-pick who to ask (only ask happy clients)
❌ Write fake reviews
❌ Pay for reviews

**Ethical approach**:
- Ask EVERY client 7 days post-session
- Provide easy direct link
- Include prompts to make writing easier
- Respond to all reviews (positive and negative)
- Feature reviews on website (with permission)

**Step 5**: Create testimonial collection form (1 hour)
```tsx
// src/app/testimonial/page.tsx - NEW PAGE
export default function TestimonialSubmissionPage() {
  return (
    <form onSubmit={handleSubmit}>
      <h1>Share Your Success Story</h1>
      <p>Help others by sharing your experience with Vince Sports Massage.</p>

      <label>Your Name</label>
      <input type="text" name="name" required />

      <label>Your Role/Occupation</label>
      <input type="text" name="role" placeholder="e.g., Marathon Runner" />

      <label>Condition/Issue You Came For</label>
      <input type="text" name="condition" placeholder="e.g., IT Band Syndrome" />

      <label>Number of Sessions</label>
      <input type="number" name="sessionCount" />

      <label>Your Result</label>
      <textarea
        name="result"
        placeholder="e.g., Completed marathon pain-free after 4 sessions"
      />

      <label>Your Experience (Full Testimonial)</label>
      <textarea
        name="testimonial"
        rows={6}
        required
      />

      <label>Rating</label>
      <select name="rating">
        <option value="5">⭐⭐⭐⭐⭐ (5 stars)</option>
        <option value="4">⭐⭐⭐⭐ (4 stars)</option>
      </select>

      <label>
        <input type="checkbox" name="consent" required />
        I give permission to feature this testimonial on vincesportsmassage.com
      </label>

      <button type="submit">Submit Testimonial</button>
    </form>
  )
}
```

**Step 6**: Set up review monitoring (30 minutes)
- Enable Google Business Profile email alerts
- Check Google reviews weekly
- Respond to all reviews within 24-48 hours

### Expected Results

| Metric | Before Automation | After Automation (3 months) |
|--------|------------------|---------------------------|
| New reviews/month | 0-2 | 10-15 |
| Review response rate | 0-25% | 100% |
| Average rating | 5.0 | 5.0 (maintain) |
| Total reviews | 60 | 90-105 |

---

## Day 7-9: Client Retention Automation (6 hours)

### Objective
Implement automated systems to encourage repeat bookings and increase client lifetime value.

### Implementation Steps

**Step 1**: Create re-booking email sequences (2 hours)

**Sequence 1: Post-Session Follow-Up**
```
Day 1 after session:
Subject: How are you feeling, {{firstName}}?

Day 7 after session:
Subject: Your recovery progress + next steps

Day 30 after session:
Subject: Ready for your next session?
```

**Sequence 2: Package Promotions**
```
Target: Clients with 3+ individual bookings
Email: "Save with a session package"
Offer: 5-session package (save £35)
```

**Sequence 3: Lapsed Client Re-Engagement**
```
Trigger: 90 days since last booking
Day 0: "We miss you! Here's what's new"
Day 7: Special offer (15% off return session)
Day 14: Final reminder
```

**Step 2**: Birthday/Anniversary emails (1 hour)
```html
Subject: Happy Birthday, {{firstName}}! 🎉 Here's a gift

Hi {{firstName}},

Happy Birthday! 🎂

To celebrate, I'd like to offer you a special gift:
🎁 20% off your next session
💆 Valid for the entire month of your birthday

Book anytime this month with code: BIRTHDAY20

[Book Your Birthday Session]

Hope you have an amazing day!

Best regards,
Vince
```

**Step 3**: Referral program (2 hours)

**Simple Referral System**:
```html
Subject: Know someone who needs sports massage? Refer a friend!

Hi {{firstName}},

Love your results? Share the benefit with friends and family!

**Referral Program**:
- Refer a friend → They get 10% off first session
- When they book → You get £10 credit toward your next session
- Unlimited referrals!

[Get Your Unique Referral Link]

Thank you for spreading the word!

Best regards,
Vince
```

**Implementation**:
```typescript
// src/app/api/referral/generate/route.ts
export async function POST(request: Request) {
  const { email, name } = await request.json()

  // Generate unique referral code
  const referralCode = generateCode(email)

  // Save to database
  await supabase.from('referrals').insert({
    referrer_email: email,
    referrer_name: name,
    referral_code: referralCode,
    created_at: new Date(),
  })

  // Return referral link
  return Response.json({
    referralLink: `https://vincesportsmassage.com/booking?ref=${referralCode}`,
  })
}
```

**Step 4**: Create loyalty tracking (1 hour)
```typescript
// Simple loyalty tiers
const loyaltyTiers = {
  bronze: { bookings: 3, benefit: "5% off all future sessions" },
  silver: { bookings: 6, benefit: "10% off all future sessions" },
  gold: { bookings: 10, benefit: "15% off all future sessions + priority booking" },
}

// Email when tier unlocked
async function checkLoyaltyTier(clientEmail: string, totalBookings: number) {
  if (totalBookings === 3) {
    await sendEmail(clientEmail, 'loyalty_bronze_unlocked')
  }
  if (totalBookings === 6) {
    await sendEmail(clientEmail, 'loyalty_silver_unlocked')
  }
  if (totalBookings === 10) {
    await sendEmail(clientEmail, 'loyalty_gold_unlocked')
  }
}
```

### Expected Results

| Metric | Before Automation | After Automation (6 months) |
|--------|------------------|---------------------------|
| Repeat booking rate | 20-30% | 40-50% |
| Average bookings/client | 1.5 | 3-4 |
| Referral bookings/month | 0-1 | 3-5 |
| Client lifetime value | £82.50 (1.5 sessions) | £165-220 (3-4 sessions) |

---

## Day 10-12: n8n Workflow Automation (Advanced) (6 hours)

### Objective
Set up n8n to orchestrate complex automation workflows connecting multiple tools (Calendly, Brevo, Supabase, Google Sheets).

### Why n8n?

n8n allows you to:
- Connect tools without code
- Create complex conditional workflows
- Run on schedule (cron jobs)
- Self-host (free) or cloud-host (€20/month)

### Implementation Steps

**Step 1**: Deploy n8n (2 hours)

**Option A: n8n Cloud** (Easiest - €20/month)
1. Sign up at [n8n.cloud](https://n8n.cloud)
2. Create workspace
3. Ready to use

**Option B: Self-Hosted** (Free but requires server)
1. Deploy to Railway, Heroku, or DigitalOcean
2. Set environment variables
3. Access via custom URL

**Recommendation**: Start with n8n Cloud for simplicity.

**Step 2**: Create key workflows (3 hours)

**Workflow 1: New Booking → Welcome Sequence**
```
Trigger: Calendly Webhook (booking created)
├─ Extract: client email, name, service, date
├─ Add to Brevo: Email list
├─ Save to Supabase: Bookings table
├─ Send Slack notification: "New booking: [Name] - [Service]"
├─ Add to Google Sheet: Booking log
└─ Wait 24 hours → Send pre-appointment reminder
```

**Workflow 2: Review Collection Automation**
```
Trigger: Cron (runs daily at 9am)
├─ Query Supabase: Bookings 7 days ago
├─ For each booking:
│   ├─ Check if review requested already
│   ├─ If not: Send review request email
│   └─ Mark as "review_requested" in database
└─ Log results to Google Sheets
```

**Workflow 3: Content Publishing Automation**
```
Trigger: Manual or scheduled
├─ Fetch latest blog post from CMS
├─ Share to Instagram (via API)
├─ Share to Facebook (via API)
├─ Send email to subscribers: "New blog post"
├─ Add to content calendar (Google Sheets)
└─ Log success/failure
```

**Workflow 4: Lead Scoring & Segmentation**
```
Trigger: Daily at midnight
├─ Query all leads from Supabase
├─ Calculate lead score:
│   ├─ +10 points: Visited booking page
│   ├─ +15 points: Started booking (opened Calendly)
│   ├─ +5 points: Viewed case study
│   ├─ +5 points: Opened email
│   ├─ +20 points: Clicked email CTA
├─ Segment by score:
│   ├─ Hot (30+ points): Add to "Ready to Book" campaign
│   ├─ Warm (15-29 points): Add to "Nurture" campaign
│   └─ Cold (0-14 points): Add to "Education" campaign
└─ Update Brevo contact lists
```

**Workflow 5: Monthly Reporting Automation**
```
Trigger: 1st of every month at 9am
├─ Fetch GA4 data (last month):
│   ├─ Total visitors
│   ├─ Conversions
│   ├─ Top pages
├─ Fetch Calendly data (last month):
│   ├─ Total bookings
│   ├─ Revenue
├─ Fetch Brevo data (last month):
│   ├─ Email subscribers
│   ├─ Open rate
│   ├─ Click rate
├─ Compile into Google Sheets report
├─ Generate summary email
└─ Send to Vince + stakeholders
```

**Step 3**: Test workflows (1 hour)
- Trigger each workflow manually
- Verify data flows correctly
- Check error handling
- Monitor execution logs

### Testing Checklist

- [ ] n8n deployed and accessible
- [ ] Calendly webhook connected
- [ ] Brevo API connected
- [ ] Supabase connected
- [ ] All 5 workflows created
- [ ] Test executions successful
- [ ] Error notifications working
- [ ] Workflows scheduled correctly

### Potential Issues & Solutions

**Issue**: Workflow fails silently
**Solution**: Add error handling nodes, enable error notifications via email/Slack.

**Issue**: API rate limits exceeded
**Solution**: Add delays between API calls, implement queuing for bulk operations.

**Issue**: Webhook not triggering
**Solution**: Check webhook URL, verify payload format, check firewall/security settings.

---

## Day 13-15: Content Distribution Automation (5 hours)

### Objective
Automate social media content distribution to maintain consistent presence without manual posting.

### Implementation Steps

**Step 1**: Set up social media scheduling (2 hours)

**Option 1: Buffer** (Free tier: 3 channels, 10 posts each)
**Option 2: Later** (Free tier: 30 posts/month)
**Option 3: Meta Business Suite** (Free, Facebook + Instagram)

**Recommendation**: Start with **Meta Business Suite** (free) + **Buffer** (free tier).

**Content Calendar Template**:
```
Monday: Educational tip (e.g., "How to prevent runner's knee")
Wednesday: Client success story (with permission)
Friday: Behind-the-scenes or personal post
Sunday: Motivational quote + CTA
```

**Step 2**: Create content bank (2 hours)

**Content Types**:
1. **Educational Posts** (20 posts)
   - Common injuries and prevention
   - Self-care tips
   - Stretching guides
   - Recovery advice

2. **Social Proof** (10 posts)
   - Client testimonials
   - Before/after stories
   - 5-star review screenshots

3. **Behind-the-Scenes** (10 posts)
   - Treatment room
   - Equipment/techniques
   - Day in the life

4. **Promotional** (5 posts)
   - Session packages
   - Special offers
   - New services

**Step 3**: Automate blog → social (1 hour)

Using n8n or Zapier:
```
Trigger: New blog post published
├─ Extract: Title, excerpt, image, URL
├─ Generate social posts:
│   ├─ Instagram caption (shorter)
│   ├─ Facebook post (longer)
│   └─ LinkedIn post (professional)
├─ Schedule posts to Buffer
└─ Notify when scheduled
```

### Expected Results

| Metric | Before Automation | After Automation |
|--------|------------------|------------------|
| Posts per week | 0-2 (inconsistent) | 4-5 (consistent) |
| Time spent on social | 3-5 hours/week | 30 minutes/week |
| Social media reach | Low | 2-3x increase |
| Traffic from social | Minimal | 5-10% of total |

---

## Phase 5 Summary

### Total Time: 25-30 hours

**Day 1-3**: Email automation infrastructure (8 hours)
**Day 4-6**: Review collection automation (6 hours)
**Day 7-9**: Client retention automation (6 hours)
**Day 10-12**: n8n workflow automation (6 hours)
**Day 13-15**: Content distribution automation (5 hours)

### Expected Impact

| Metric | Before Phase 5 | After Phase 5 (6 months) | Improvement |
|--------|----------------|-------------------------|-------------|
| Email list size | 0 | 200-500 | N/A |
| Email → Booking conversion | N/A | 15-20% | N/A |
| New reviews/month | 0-2 | 10-15 | +500-700% |
| Repeat booking rate | 20-30% | 40-50% | +60-100% |
| Manual marketing time | 10-15 hours/week | 2-3 hours/week | -80% |
| Client lifetime value | £82.50 | £165-220 | +100-150% |

### Tools & Costs

| Tool | Purpose | Cost |
|------|---------|------|
| Brevo | Email automation | £0 (free tier) |
| n8n Cloud | Workflow automation | £0-20/month |
| Buffer | Social scheduling | £0 (free tier) |
| Meta Business Suite | FB + IG scheduling | £0 |
| **Total Monthly Cost** | | **£0-20** |

### Files Created

```
src/
├── lib/
│   └── email/
│       └── brevo.ts (NEW)
├── app/
│   ├── api/
│   │   ├── calendly-webhook/
│   │   │   └── route.ts (MODIFIED)
│   │   └── referral/
│   │       └── generate/
│   │           └── route.ts (NEW)
│   ├── review/
│   │   └── route.ts (NEW - redirect to Google)
│   └── testimonial/
│       └── page.tsx (NEW - submission form)
└── database/
    └── migrations/
        └── 005_referrals_loyalty.sql (NEW)
```

### Database Schema

```sql
-- Referrals table
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_email TEXT NOT NULL,
  referrer_name TEXT,
  referral_code TEXT UNIQUE NOT NULL,
  referred_email TEXT,
  referred_name TEXT,
  booking_completed BOOLEAN DEFAULT false,
  credit_issued BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

-- Loyalty tracking table
CREATE TABLE loyalty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_email TEXT UNIQUE NOT NULL,
  total_bookings INTEGER DEFAULT 0,
  current_tier TEXT, -- bronze, silver, gold
  tier_unlocked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### Environment Variables

```bash
# Email
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxx

# n8n (if self-hosted)
N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/...

# Referrals
REFERRAL_CREDIT_AMOUNT=10 # £10 credit per referral
```

### Definition of Done

- [ ] Brevo account set up and verified
- [ ] Domain verified for email sending
- [ ] 5 email templates created
- [ ] Email automation sequences configured
- [ ] Review request automation working
- [ ] Google review link created
- [ ] Testimonial submission form created
- [ ] Re-booking email sequences set up
- [ ] Referral program implemented
- [ ] Loyalty tiers defined and automated
- [ ] n8n deployed (cloud or self-hosted)
- [ ] 5 key n8n workflows created and tested
- [ ] Social media accounts connected
- [ ] Content calendar planned (30 days ahead)
- [ ] Blog → social automation working
- [ ] All automations tested end-to-end

### Success Criteria

Phase 5 is successful when:
1. Email list grows by 50+ subscribers in first month
2. At least 5 new Google reviews in first month from automation
3. Repeat booking rate increases by 10% within 3 months
4. Manual marketing work reduced to <3 hours/week
5. At least 2 referral bookings in first 3 months
6. All workflows run without errors for 1 week straight

### Maintenance Schedule

**Daily** (5 minutes):
- Check n8n execution logs for errors
- Monitor Brevo deliverability dashboard

**Weekly** (30 minutes):
- Review Google reviews and respond
- Check email campaign performance
- Queue social media content for next week

**Monthly** (2 hours):
- Review automation performance metrics
- Update email templates based on data
- Add new blog posts to content bank
- Generate monthly report
- Plan next month's campaigns

---

## Rollback Plan

If Phase 5 introduces issues:
1. Pause email automation (unsubscribe link always works)
2. Disable n8n workflows temporarily
3. Switch to manual review requests
4. Continue collecting data in background
5. Fix issues before re-enabling automation

---

## Next Steps After Phase 5

With all 5 phases complete:
1. **Monitor & Optimize**: Review analytics weekly, optimize based on data
2. **Content Expansion**: Add more blog posts (2-4/month ongoing)
3. **Paid Advertising**: Consider Google Ads or Facebook Ads (budget: £300-500/month)
4. **Video Content**: Create YouTube channel for educational content
5. **Advanced Personalization**: Segment email lists by client type, service interest
6. **Community Building**: Host workshops, webinars, or local events
7. **Partnership Development**: Partner with gyms, running clubs, sports teams

---

**Phase 5 Status**: 🔜 Ready to Start
**Prerequisites**: Phases 1-4 complete (website built, analytics tracking)
**Estimated Completion**: 2-3 weeks (15 working days)
**Business Impact**: 80% reduction in manual marketing work, 100-150% increase in client lifetime value
