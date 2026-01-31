import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Not authenticated - redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if user is admin
  const { data: adminUser, error } = await supabase
    .from("admin_users")
    .select("role")
    .eq("id", session.user.id)
    .eq("role", "admin")
    .single();

  if (error || !adminUser) {
    // Not an admin - redirect to home with error
    const url = new URL("/", request.url);
    url.searchParams.set("error", "unauthorized");
    return NextResponse.redirect(url);
  }

  // User is authenticated and admin - allow access
  return response;
}

// Apply middleware only to /admin routes
export const config = {
  matcher: "/admin/:path*",
};
