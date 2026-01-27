import { z } from "zod"
import { clientEnv, clientEnvSchema } from "./env.client"

/**
 * Server-side environment variable validation
 *
 * Validates server-side secrets at module load time.
 * Fails fast on app startup if misconfigured rather than at runtime.
 *
 * Pattern: Uses Zod schema validation (established in Phase 2)
 *
 * IMPORTANT: Only import this file in Server Components, API routes, or server actions.
 * For Client Components, use '@/lib/env.client' instead.
 */

// Server-side environment variables (only available in Server Components and API routes)
const serverEnvSchema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  N8N_WEBHOOK_SECRET: z.string().min(1),
})

// Full environment schema (server-side only)
const envSchema = clientEnvSchema.merge(serverEnvSchema)

/**
 * Full environment variables (server-side only)
 *
 * Includes server-side secrets. Only use in:
 * - Server Components (no "use client")
 * - API routes
 * - Server actions
 *
 * Usage in Server Components/API routes:
 * ```ts
 * import { env } from '@/lib/env'
 * const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY // server-only
 * const url = env.NEXT_PUBLIC_SUPABASE_URL // also available here
 * ```
 */
export const env = envSchema.parse({
  // Server-side environment variables
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  N8N_WEBHOOK_SECRET: process.env.N8N_WEBHOOK_SECRET,

  // Client-side environment variables (NEXT_PUBLIC_*)
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_YOUTUBE_VIDEO_ID: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID,
  NEXT_PUBLIC_CALENDLY_PARAMS: process.env.NEXT_PUBLIC_CALENDLY_PARAMS,
})

/**
 * Environment variable type (inferred from schema)
 */
export type Env = z.infer<typeof envSchema>

// Re-export client env for convenience (server-side code can import from either file)
export { clientEnv } from "./env.client"
