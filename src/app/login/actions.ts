"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { logger } from "@/lib/logger";

const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginAction(
  formData: FormData
): Promise<{ error?: string }> {
  try {
    // Extract and validate input
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      return { error: "Invalid input" };
    }

    const { email: validEmail, password: validPassword } = validation.data;

    // Create Supabase client and attempt authentication
    const supabase = await createClient();

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: validEmail,
      password: validPassword,
    });

    if (authError || !authData.user) {
      logger.warn("Login failed", { email: validEmail, reason: "invalid credentials" });
      return { error: "Invalid credentials" };
    }

    // Check if user has admin role
    const { data: adminUser, error: adminError } = await supabase
      .from("admin_users")
      .select("role")
      .eq("id", authData.user.id)
      .eq("role", "admin")
      .single();

    if (adminError || !adminUser) {
      // User is authenticated but not an admin - sign them out
      await supabase.auth.signOut();
      logger.warn("Unauthorized login attempt", {
        email: validEmail,
        userId: authData.user.id,
        reason: "not admin",
      });
      return { error: "Unauthorized - admin access only" };
    }

    // Success - redirect to admin dashboard
    logger.info("Admin login successful", {
      email: validEmail,
      userId: authData.user.id,
    });

    redirect("/admin");
  } catch (error) {
    // Catch unexpected errors
    logger.error("Login failed with unexpected error", { error });
    return { error: "Login failed. Please try again." };
  }
}
