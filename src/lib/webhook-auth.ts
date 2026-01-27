import { timingSafeEqual } from 'crypto';

/**
 * Verifies webhook secret using constant-time comparison to prevent timing attacks.
 *
 * Timing attacks can leak information about secret content by measuring response times.
 * Standard string comparison (===, !==) returns immediately on first non-matching character,
 * allowing attackers to guess secrets character-by-character.
 *
 * This function uses crypto.timingSafeEqual which always takes the same time regardless
 * of where strings differ, preventing timing-based secret extraction.
 *
 * @param receivedSecret - Secret from webhook request
 * @param expectedSecret - Secret from environment variable
 * @returns true if secrets match, false otherwise
 */
export function verifyWebhookSecret(
  receivedSecret: string,
  expectedSecret: string
): boolean {
  try {
    // Convert strings to UTF-8 buffers
    const receivedBuffer = Buffer.from(receivedSecret, 'utf8');
    const expectedBuffer = Buffer.from(expectedSecret, 'utf8');

    // Check lengths match (timingSafeEqual throws if different)
    if (receivedBuffer.length !== expectedBuffer.length) {
      return false;
    }

    // Constant-time comparison - takes same time regardless of where strings differ
    return timingSafeEqual(receivedBuffer, expectedBuffer);
  } catch (error) {
    // Log error but don't expose details to caller
    console.error('Webhook verification error:', error);
    return false;
  }
}
