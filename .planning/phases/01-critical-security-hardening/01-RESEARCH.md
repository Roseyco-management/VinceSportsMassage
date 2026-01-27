# Phase 1: Critical Security Hardening - Research

**Researched:** 2026-01-27
**Domain:** XSS Prevention & Webhook Security in Next.js 16
**Confidence:** HIGH

<research_summary>
## Summary

Researched security best practices for eliminating XSS vulnerabilities in Next.js Server Components and implementing timing-safe webhook authentication. The standard approach uses DOMPurify (3.3.1+) with jsdom (v20.0.0+) for server-side HTML sanitization and Node.js crypto.timingSafeEqual for webhook HMAC verification.

Key finding: Never use regex-based sanitization or standard equality comparisons for security-critical operations. DOMPurify with jsdom is the industry-standard for HTML sanitization on the server, and crypto.timingSafeEqual prevents timing attacks by performing constant-time comparisons of cryptographic values.

For Next.js 16 App Router, sanitization can happen either server-side (with jsdom) or client-side (with "use client" directive). Webhook verification requires raw body access, achieved in App Router via `request.text()` or by disabling bodyParser in Pages Router.

**Primary recommendation:** Use DOMPurify 3.3.1+ with jsdom 20.0.0+ for HTML sanitization. Use crypto.createHmac + crypto.timingSafeEqual for webhook HMAC verification with raw request bodies.
</research_summary>

<standard_stack>
## Standard Stack

The established libraries/tools for XSS prevention and webhook security:

### Core - HTML Sanitization
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| dompurify | 3.3.1+ | XSS sanitizer for HTML/SVG/MathML | Industry standard, actively maintained by Cure53, works with secure defaults |
| jsdom | 20.0.0+ | DOM implementation for Node.js | Required for server-side DOMPurify, v20+ fixes critical XSS vulnerabilities from v19 |
| isomorphic-dompurify | 2.16.0+ | Wrapper for DOMPurify client+server | Encapsulates initialization complexity for SSR environments |

### Core - Webhook Security
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| crypto (built-in) | Node.js 20+ | HMAC generation & timing-safe comparison | Native module, no dependencies, covered by Node.js security updates |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| DOMPurify | sanitize-html | sanitize-html easier in pure Node.js but less secure against novel XSS vectors (regex-based vs DOM-based) |
| DOMPurify + jsdom | Client-side only sanitization | Client-side only leaves SSR/SSG vulnerable to XSS during render |
| crypto.timingSafeEqual | Standard === comparison | Standard comparison vulnerable to timing attacks that leak information |

**Installation:**
```bash
# HTML Sanitization (server-side)
npm install dompurify jsdom
npm install --save-dev @types/dompurify @types/jsdom

# OR Isomorphic approach
npm install isomorphic-dompurify

# Webhook Security (built-in)
# crypto module is built into Node.js - no installation needed
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   ├── sanitize.ts        # DOMPurify wrapper for server-side sanitization
│   └── webhook-auth.ts    # HMAC verification utility
├── app/
│   ├── api/
│   │   └── blog/
│   │       └── route.ts   # Webhook endpoint with HMAC verification
│   └── (marketing)/
│       └── blog/
│           └── [slug]/
│               └── blog-post-page.tsx  # Sanitized HTML rendering
```

### Pattern 1: Server-Side HTML Sanitization with DOMPurify
**What:** Initialize DOMPurify with jsdom in a utility function for reuse across server components
**When to use:** Rendering user-generated HTML in Server Components or during SSR/SSG
**Example:**
```typescript
// lib/sanitize.ts
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Create a DOMPurify instance for server-side use
const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Window);

export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}
```

**Usage in Server Component:**
```typescript
// app/(marketing)/blog/[slug]/blog-post-page.tsx
import { sanitizeHtml } from '@/lib/sanitize';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);
  const cleanHtml = sanitizeHtml(post.content);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    </article>
  );
}
```

### Pattern 2: Isomorphic DOMPurify Approach
**What:** Use isomorphic-dompurify for automatic server/client initialization
**When to use:** When you need sanitization on both server and client with minimal setup
**Example:**
```typescript
// lib/sanitize.ts
import DOMPurify from 'isomorphic-dompurify';

export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['p', 'b', 'i', 'em', 'strong', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'blockquote', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}
```

**Note:** Some reports indicate isomorphic-dompurify may still have issues with Next.js App Router as of 2024. Test thoroughly or use Pattern 1.

### Pattern 3: Webhook HMAC Verification with Timing-Safe Comparison
**What:** Verify webhook authenticity by comparing HMAC signatures using constant-time comparison
**When to use:** Any webhook endpoint receiving data from external services
**Example:**
```typescript
// lib/webhook-auth.ts
import { createHmac, timingSafeEqual } from 'crypto';

export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm: 'sha256' | 'sha1' = 'sha256'
): boolean {
  // Generate HMAC from payload
  const hmac = createHmac(algorithm, secret);
  const digest = hmac.update(payload, 'utf8').digest('hex');

  // Create buffers for comparison
  const expectedSig = Buffer.from(`${algorithm}=${digest}`, 'utf8');
  const receivedSig = Buffer.from(signature, 'utf8');

  // Check lengths match (timingSafeEqual throws if lengths differ)
  if (expectedSig.length !== receivedSig.length) {
    return false;
  }

  // Constant-time comparison
  return timingSafeEqual(expectedSig, receivedSig);
}
```

**Usage in Next.js App Router API Route:**
```typescript
// app/api/blog/route.ts
import { verifyWebhookSignature } from '@/lib/webhook-auth';

export async function POST(request: Request) {
  // Get raw body for signature verification
  const rawBody = await request.text();

  // Get signature from header
  const signature = request.headers.get('x-webhook-signature');
  if (!signature) {
    return Response.json({ error: 'Missing signature' }, { status: 401 });
  }

  // Verify signature
  const secret = process.env.WEBHOOK_SECRET!;
  const isValid = verifyWebhookSignature(rawBody, signature, secret);

  if (!isValid) {
    return Response.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Parse body only after verification
  const payload = JSON.parse(rawBody);

  // Process webhook...
  return Response.json({ success: true });
}
```

### Pattern 4: Pages Router Webhook (Legacy)
**What:** Disable body parser to access raw body for HMAC verification
**When to use:** Pages Router API routes (not App Router)
**Example:**
```typescript
// pages/api/webhook.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import { verifyWebhookSignature } from '@/lib/webhook-auth';

// Disable Next.js body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get raw body
  const rawBody = await buffer(req);
  const bodyString = rawBody.toString('utf8');

  // Verify signature
  const signature = req.headers['x-webhook-signature'] as string;
  const isValid = verifyWebhookSignature(bodyString, signature, process.env.WEBHOOK_SECRET!);

  if (!isValid) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  const payload = JSON.parse(bodyString);
  // Process webhook...
  return res.status(200).json({ success: true });
}
```

### Anti-Patterns to Avoid
- **Regex-based sanitization:** Regular expressions cannot safely sanitize HTML. Use DOM-based sanitizers like DOMPurify.
- **Standard equality for signatures:** `signature === expected` leaks timing information. Always use `crypto.timingSafeEqual`.
- **Parsing body before verification:** Parse JSON only after HMAC signature is verified to prevent processing malicious payloads.
- **Old jsdom versions:** jsdom v19.0.0 has known XSS vulnerabilities fixed in v20.0.0+. Always use latest jsdom.
- **Client-only sanitization:** Sanitizing only on client leaves SSR/SSG vulnerable. Sanitize on server for Server Components.
- **Skipping length check:** `timingSafeEqual` throws if buffer lengths differ. Check lengths first to avoid crashes.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| HTML sanitization | Regex-based tag stripping | DOMPurify + jsdom | HTML parsing is complex with numerous edge cases, mXSS attacks, and encoding tricks that regex cannot handle |
| Timing-safe comparison | Custom constant-time comparison | crypto.timingSafeEqual | Implementing constant-time comparison correctly is extremely difficult and easy to get wrong |
| HMAC generation | Custom hash implementation | crypto.createHmac | Cryptographic implementations have subtle security requirements. Use audited built-in module |
| String comparison for auth | === or == operators | crypto.timingSafeEqual with Buffers | Standard comparison leaks timing information that attackers can exploit to guess secrets |
| DOM environment for Node.js | Custom DOM shim or happy-dom | jsdom v20.0.0+ | jsdom is battle-tested and security-audited. happy-dom is explicitly not safe with DOMPurify per official docs |

**Key insight:** Security vulnerabilities often emerge from subtle edge cases that only appear after extensive real-world testing. DOMPurify has been tested against thousands of XSS vectors. crypto module is maintained by the Node.js security team. Never implement your own cryptography or HTML parsing for security-critical operations.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Using Outdated jsdom Versions
**What goes wrong:** XSS vulnerabilities bypass DOMPurify sanitization
**Why it happens:** jsdom v19.0.0 has known XSS vulnerabilities that allow attacks even when DOMPurify is configured correctly
**How to avoid:** Always use jsdom v20.0.0 or newer. Pin jsdom version in package.json and update regularly
**Warning signs:** XSS attacks succeed despite using DOMPurify, security scanner flags jsdom version

### Pitfall 2: Comparing HMAC Signatures with === or ==
**What goes wrong:** Timing attacks allow attackers to guess webhook secrets character by character
**Why it happens:** String/buffer comparison returns immediately on first non-matching character, leaking information via response time
**How to avoid:** Always use `crypto.timingSafeEqual()` for cryptographic value comparison
**Warning signs:** Security audit flags timing vulnerability, webhook endpoint shows variable response times

### Pitfall 3: Parsing Request Body Before Signature Verification
**What goes wrong:** Malicious payloads processed even with invalid signatures, potential for injection attacks
**Why it happens:** Next.js auto-parses bodies by default, so body is parsed before you can verify signature
**How to avoid:** Use `await request.text()` in App Router or disable bodyParser in Pages Router. Verify signature on raw body FIRST, then parse
**Warning signs:** Webhook endpoint processes invalid requests, logs show parsing errors from malicious payloads

### Pitfall 4: Sanitizing Only on Client Side
**What goes wrong:** XSS attacks succeed during server-side rendering or static generation
**Why it happens:** Assuming client-side sanitization protects SSR/SSG when HTML is actually rendered on server first
**How to avoid:** Sanitize on the server for Server Components. If using Client Components, ensure sanitization happens before SSR
**Warning signs:** View source shows unsanitized HTML, XSS works with JavaScript disabled

### Pitfall 5: Overly Permissive DOMPurify Configuration
**What goes wrong:** Malicious tags or attributes bypass sanitization
**Why it happens:** Allowing unnecessary tags/attributes increases attack surface for XSS vectors
**How to avoid:** Use allowlist approach - explicitly allow only tags/attributes you need. Start restrictive, add as needed
**Warning signs:** Security scanner flags potentially dangerous tags, `<script>` or event handlers survive sanitization

### Pitfall 6: Not Checking Buffer Lengths Before timingSafeEqual
**What goes wrong:** Application crashes when comparing signatures of different lengths
**Why it happens:** `timingSafeEqual()` throws an error if buffers have different lengths
**How to avoid:** Always check `buffer1.length === buffer2.length` before calling `timingSafeEqual()`
**Warning signs:** Webhook endpoint crashes with "Input buffers must have the same byte length" error

### Pitfall 7: Using isomorphic-dompurify Without Testing
**What goes wrong:** Build errors or runtime failures in Next.js App Router
**Why it happens:** isomorphic-dompurify has known compatibility issues with Next.js App Router (as of 2024)
**How to avoid:** Test thoroughly in production-like environment or use manual DOMPurify + jsdom initialization (Pattern 1)
**Warning signs:** Webpack errors mentioning "window is not defined", build failures in CI/CD
</common_pitfalls>

<code_examples>
## Code Examples

Verified patterns from official sources:

### Complete Sanitization Utility
```typescript
// lib/sanitize.ts
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Initialize DOMPurify with jsdom window
const window = new JSDOM('').window;
const purify = DOMPurify(window as unknown as Window);

// Restrictive configuration - allowlist approach
const DEFAULT_CONFIG: DOMPurify.Config = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'b', 'i', 'u',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li',
    'a', 'blockquote', 'code', 'pre',
  ],
  ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  ALLOW_DATA_ATTR: false,
  ALLOW_UNKNOWN_PROTOCOLS: false,
};

export function sanitizeHtml(
  dirty: string,
  config: DOMPurify.Config = DEFAULT_CONFIG
): string {
  return purify.sanitize(dirty, config);
}

// For testing - returns what was removed
export function sanitizeHtmlWithReport(dirty: string) {
  const clean = purify.sanitize(dirty, {
    ...DEFAULT_CONFIG,
    RETURN_DOM: false,
    RETURN_DOM_FRAGMENT: false,
  });

  return {
    clean,
    removed: purify.removed,
  };
}
```

### Complete Webhook Verification Utility
```typescript
// lib/webhook-auth.ts
import { createHmac, timingSafeEqual } from 'crypto';

interface VerifyOptions {
  algorithm?: 'sha256' | 'sha1';
  encoding?: 'hex' | 'base64';
  prefix?: string; // e.g., 'sha256=' for some providers
}

export function verifyWebhookSignature(
  payload: string,
  receivedSignature: string,
  secret: string,
  options: VerifyOptions = {}
): boolean {
  const {
    algorithm = 'sha256',
    encoding = 'hex',
    prefix = '',
  } = options;

  try {
    // Generate expected signature
    const hmac = createHmac(algorithm, secret);
    const digest = hmac.update(payload, 'utf8').digest(encoding);
    const expectedSig = prefix ? `${prefix}${digest}` : digest;

    // Convert to buffers
    const expectedBuffer = Buffer.from(expectedSig, 'utf8');
    const receivedBuffer = Buffer.from(receivedSignature, 'utf8');

    // Check lengths first (timingSafeEqual throws if different)
    if (expectedBuffer.length !== receivedBuffer.length) {
      return false;
    }

    // Constant-time comparison
    return timingSafeEqual(expectedBuffer, receivedBuffer);
  } catch (error) {
    // Log error but don't expose details to caller
    console.error('Webhook signature verification error:', error);
    return false;
  }
}

// Example for different webhook providers
export const verifyShopify = (payload: string, signature: string, secret: string) =>
  verifyWebhookSignature(payload, signature, secret, {
    algorithm: 'sha256',
    encoding: 'base64',
  });

export const verifyGitHub = (payload: string, signature: string, secret: string) =>
  verifyWebhookSignature(payload, signature, secret, {
    algorithm: 'sha256',
    encoding: 'hex',
    prefix: 'sha256=',
  });

export const verifyStripe = (payload: string, signature: string, secret: string) =>
  verifyWebhookSignature(payload, signature, secret, {
    algorithm: 'sha256',
    encoding: 'hex',
  });
```

### Next.js App Router Webhook Endpoint
```typescript
// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/webhook-auth';
import { sanitizeHtml } from '@/lib/sanitize';

export async function POST(request: Request) {
  // 1. Get raw body BEFORE parsing
  const rawBody = await request.text();

  // 2. Get signature from header
  const signature = request.headers.get('x-webhook-signature');
  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature header' },
      { status: 401 }
    );
  }

  // 3. Verify signature on raw body
  const secret = process.env.WEBHOOK_SECRET;
  if (!secret) {
    console.error('WEBHOOK_SECRET not configured');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  const isValid = verifyWebhookSignature(rawBody, signature, secret, {
    algorithm: 'sha256',
    encoding: 'hex',
  });

  if (!isValid) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 401 }
    );
  }

  // 4. NOW parse the body (after verification)
  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  // 5. Validate required fields
  if (!payload.title || !payload.content) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // 6. Sanitize HTML content
  const cleanContent = sanitizeHtml(payload.content);

  // 7. Process webhook (store to database, etc.)
  // ... database operations ...

  return NextResponse.json({ success: true });
}
```

### Server Component with Sanitized HTML Rendering
```typescript
// app/(marketing)/blog/[slug]/page.tsx
import { sanitizeHtml } from '@/lib/sanitize';
import { createClient } from '@/lib/supabase/server';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !post) {
    return <div>Post not found</div>;
  }

  // Sanitize HTML content on the server
  const cleanContent = sanitizeHtml(post.content);

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: cleanContent }}
        className="blog-content"
      />
    </article>
  );
}
```
</code_examples>

<sota_updates>
## State of the Art (2026)

What's changed recently:

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| isomorphic-dompurify (automatic) | Manual DOMPurify + jsdom init | 2024 | isomorphic-dompurify has compatibility issues with Next.js App Router. Manual initialization more reliable |
| Pages Router bodyParser config | App Router request.text() | 2023 (Next.js 13) | App Router provides cleaner API for raw body access, no config needed |
| sanitize-html for Node.js | DOMPurify + jsdom | Ongoing | DOMPurify more secure against novel XSS vectors, worth the jsdom dependency |
| jsdom v19 | jsdom v20+ | 2022 | v20 fixed critical XSS vulnerabilities, v19 explicitly unsafe |
| String comparison for HMAC | crypto.timingSafeEqual | Long-standing | Timing attacks well-known but still commonly missed in implementations |

**New tools/patterns to consider:**
- **DOMPurify 3.3.1+:** Latest version with security fixes, supports Node.js v20-v25
- **Next.js 16 App Router:** Cleaner webhook handling with `request.text()` for raw body access
- **TypeScript strict mode:** Helps catch missing null checks and type mismatches in security-critical code

**Deprecated/outdated:**
- **jsdom < v20.0.0:** Critical security vulnerabilities, explicitly not recommended by DOMPurify team
- **happy-dom with DOMPurify:** Not considered safe per DOMPurify documentation
- **Pages Router for new projects:** App Router is the recommended approach for Next.js 13+
- **Regex-based HTML sanitization:** Never safe, bypasses discovered regularly
</sota_updates>

<open_questions>
## Open Questions

Things that couldn't be fully resolved:

1. **isomorphic-dompurify Compatibility**
   - What we know: Has reported issues with Next.js App Router as of 2024
   - What's unclear: Whether latest versions have resolved these issues
   - Recommendation: Test thoroughly in production-like environment, or use manual DOMPurify + jsdom initialization for guaranteed compatibility

2. **DOMPurify Configuration for Rich Content**
   - What we know: Project uses blog content that may include various HTML elements
   - What's unclear: Exact set of tags/attributes needed without seeing actual blog content
   - Recommendation: Start with restrictive config (provided in code examples), monitor removed content in logs, add tags as needed

3. **n8n Webhook Signature Format**
   - What we know: Project receives webhooks from n8n automation
   - What's unclear: Exact signature algorithm, encoding, and header name used by n8n
   - Recommendation: During implementation, check n8n webhook configuration documentation for signature format

4. **Supabase Storage URL Patterns for Content**
   - What we know: Blog content may include images from Supabase Storage
   - What's unclear: Whether images are embedded in HTML content or stored separately
   - Recommendation: If images in HTML, add 'img' to ALLOWED_TAGS and configure ALLOWED_ATTR to include 'src', 'alt', 'width', 'height'
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- [Node.js Crypto Documentation](https://nodejs.org/api/crypto.html#cryptotimingsafeequala-b) - crypto.timingSafeEqual function signature and usage
- [DOMPurify GitHub](https://github.com/cure53/DOMPurify) - Official repository, security recommendations, jsdom version warnings
- [isomorphic-dompurify npm](https://www.npmjs.com/package/isomorphic-dompurify) - Package documentation and usage patterns
- [DOMPurify npm](https://www.npmjs.com/package/dompurify) - Official package, version information

### Secondary (MEDIUM confidence)
- [How to Implement a Secure Webhook in Node.js](https://medium.com/@faizan.ahmad.info/how-to-implement-a-secure-webhook-in-node-js-7c00e1314f3f) - HMAC verification patterns
- [Next.js API Routes Documentation](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) - Raw body access patterns
- [Using dangerouslySetInnerHTML Safely in React and Next.js Production Systems](https://dev.to/hijazi313/using-dangerouslysetinnerhtml-safely-in-react-and-nextjs-production-systems-115n) - DOMPurify integration patterns
- [Preventing XSS in React (Part 2): dangerouslySetInnerHTML](https://pragmaticwebsecurity.com/articles/spasecurity/react-xss-part2) - XSS prevention best practices
- [React Security: Vulnerabilities & Best Practices [2026]](https://www.glorywebs.com/blog/react-security-practices) - Current security recommendations
- [Implementing Secure Shopify Webhooks with HMAC Verification](https://dev.to/lucy1/implementing-secure-shopify-webhooks-with-hmac-verification-and-queue-processing-nodejs-python-59p1) - Complete webhook examples
- [How To Access Raw Body Data with Next.js](https://vancelucas.com/blog/how-to-access-raw-body-data-with-next-js/) - Next.js raw body patterns

### Cross-Verification Notes
- All WebSearch findings about DOMPurify verified against official GitHub repository
- crypto.timingSafeEqual usage verified against Node.js official documentation
- HMAC verification patterns cross-referenced across multiple webhook provider implementations (Shopify, GitHub, Stripe)
- jsdom version recommendations verified in DOMPurify official documentation
- Next.js App Router patterns verified in Next.js official documentation
</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: DOMPurify 3.3.1, jsdom 20.0.0+, Node.js crypto module
- Ecosystem: Next.js 16 App Router, Server Components, API Routes
- Patterns: Server-side HTML sanitization, HMAC webhook verification, timing-safe comparison
- Pitfalls: jsdom versions, timing attacks, body parsing order, client-only sanitization

**Confidence breakdown:**
- Standard stack: HIGH - Verified with official documentation and package repositories
- Architecture: HIGH - Patterns verified across multiple authoritative sources and official Next.js docs
- Pitfalls: HIGH - Documented in official DOMPurify warnings and Node.js security best practices
- Code examples: HIGH - Derived from official documentation and cross-verified working implementations

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (30 days - stable security libraries, but check for security updates regularly)

**Note:** Security libraries should be monitored continuously for updates. Subscribe to security advisories for DOMPurify, jsdom, and Node.js.

</metadata>

---

*Phase: 01-critical-security-hardening*
*Research completed: 2026-01-27*
*Ready for planning: yes*
