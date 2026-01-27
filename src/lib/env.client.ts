import { z } from "zod"

/**
 * Client-side environment variable validation
 *
 * Safe to import in Client Components ("use client").
 * Only includes NEXT_PUBLIC_* variables that are exposed to the browser.
 *
 * Pattern: Uses Zod schema validation (established in Phase 2)
 */

export const clientEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_YOUTUBE_VIDEO_ID: z.string().default("O3jvJ8w6OOY"),
  NEXT_PUBLIC_CALENDLY_PARAMS: z
    .string()
    .default(
      "?hide_gdpr_banner=1&background_color=ffffff&text_color=1e293b&primary_color=0891b2"
    ),
})

/**
 * Client-safe environment variables
 *
 * Usage in Client Components:
 * ```ts
 * import { clientEnv } from '@/lib/env.client'
 * const url = clientEnv.NEXT_PUBLIC_SUPABASE_URL
 * ```
 */
export const clientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_YOUTUBE_VIDEO_ID: process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID,
  NEXT_PUBLIC_CALENDLY_PARAMS: process.env.NEXT_PUBLIC_CALENDLY_PARAMS,
})

export type ClientEnv = z.infer<typeof clientEnvSchema>
