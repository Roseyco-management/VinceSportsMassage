import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

// Initialize DOMPurify with jsdom window for server-side use
const window = new JSDOM('').window;
const purify = DOMPurify(window);

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * Uses DOMPurify with a restrictive allowlist to remove potentially
 * dangerous HTML elements and attributes. Designed for blog content
 * that needs basic formatting but must be protected against malicious scripts.
 *
 * @param dirty - Unsanitized HTML string from external source
 * @returns Clean HTML string with only allowed tags and attributes
 */
export function sanitizeHtml(dirty: string): string {
  return purify.sanitize(dirty, {
    // Allow only safe formatting tags needed for blog content
    ALLOWED_TAGS: [
      // Text formatting
      'p', 'br', 'strong', 'em', 'b', 'i', 'u',
      // Headings
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      // Lists
      'ul', 'ol', 'li',
      // Other
      'a', 'blockquote', 'code', 'pre',
    ],
    // Allow only safe attributes
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    // Prevent data- attributes that could be exploited
    ALLOW_DATA_ATTR: false,
    // Prevent dangerous protocols like javascript:
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });
}
