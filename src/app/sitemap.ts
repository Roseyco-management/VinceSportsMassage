import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/constants"
import { createClient } from "@supabase/supabase-js"
import { env } from "@/lib/env"
import { logger } from "@/lib/logger"

const staticPaths = [
  "",
  "/services",
  "/booking",
  "/postureprime",
  "/blog",
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "daily" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/services" || path === "/booking" ? 0.9 : 0.8,
  }))

  // Dynamically fetch blog posts from Supabase
  let blogPages: MetadataRoute.Sitemap = []

  try {
    // Use direct Supabase client (not server client) to avoid dynamic rendering
    // Sitemap generation doesn't need user authentication
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )

    const { data: blogPosts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("status", "published")

    if (error) {
      logger.error("Failed to fetch blog posts for sitemap", { error: error.message })
      // Fall back to empty array - don't fail sitemap generation
      blogPages = []
    } else if (blogPosts) {
      blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    }
  } catch (error) {
    logger.error("Unexpected error fetching blog posts for sitemap", {
      error: error instanceof Error ? error.message : "Unknown error",
    })
    // Fall back to empty array - don't fail sitemap generation
    blogPages = []
  }

  return [...staticPages, ...blogPages]
}
