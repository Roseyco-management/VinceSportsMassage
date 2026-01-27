import { z } from "zod"

/**
 * Environment variable validation schema
 *
 * Validates all required environment variables at module load time.
 * Fails fast on app startup if misconfigured rather than at runtime.
 *
 * Pattern: Uses Zod schema validation (established in Phase 2)
 */

const envSchema = z.object({
  // Supabase configuration (required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),

  // n8n webhook authentication (required)
  N8N_WEBHOOK_SECRET: z.string().min(1),

  // Site configuration (required)
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Presentation configuration (optional with defaults)
  NEXT_PUBLIC_YOUTUBE_VIDEO_ID: z.string().default("O3jvJ8w6OOY"),
  NEXT_PUBLIC_CALENDLY_PARAMS: z
    .string()
    .default(
      "?hide_gdpr_banner=1&background_color=ffffff&text_color=1e293b&primary_color=0891b2"
    ),
})

/**
 * Validated environment variables
 *
 * All variables are validated at module load time.
 * TypeScript provides compile-time type checking.
 *
 * Usage:
 * ```ts
 * import { env } from '@/lib/env'
 * const url = env.NEXT_PUBLIC_SUPABASE_URL // fully validated, typed
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
