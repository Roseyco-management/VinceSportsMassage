import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "./session";
import type { User } from "@supabase/supabase-js";

/**
 * Check if a user has admin role
 *
 * @param userId - User ID to check
 * @returns true if user is admin, false otherwise
 */
export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", userId)
      .eq("role", "admin")
      .single();

    if (error) {
      // Fail secure - return false on any error
      return false;
    }

    return !!data;
  } catch (error) {
    // Fail secure - return false on exceptions
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Require admin role - throws if not admin
 *
 * Use this in admin Server Components/layouts that MUST have admin access.
 * Will throw an error if user is not authenticated or not an admin.
 *
 * @returns User object (guaranteed to be an admin)
 * @throws Error if not authenticated or not admin
 */
export async function requireAdmin(): Promise<User> {
  const user = await requireAuth();

  const isUserAdmin = await isAdmin(user.id);

  if (!isUserAdmin) {
    throw new Error("Forbidden - admin access required");
  }

  return user;
}
