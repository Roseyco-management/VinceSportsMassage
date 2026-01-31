import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Server-side session management utilities
 *
 * IMPORTANT: These functions are for Server Components and Server Actions only.
 * Do not use in Client Components - use createClient from @/lib/supabase/client instead.
 */

/**
 * Get the current session from Supabase Auth
 *
 * @returns Session object or null if not authenticated
 */
export async function getSession() {
  try {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    // Fail gracefully - return null instead of throwing
    console.error("Error getting session:", error);
    return null;
  }
}

/**
 * Get the current authenticated user
 *
 * @returns User object or null if not authenticated
 */
export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Require authentication - throws if not authenticated
 *
 * Use this in Server Components/layouts that MUST have authentication.
 * Will throw an error if user is not authenticated.
 *
 * @returns User object (guaranteed non-null)
 * @throws Error if not authenticated
 */
export async function requireAuth(): Promise<User> {
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized - authentication required");
  }

  return user;
}
