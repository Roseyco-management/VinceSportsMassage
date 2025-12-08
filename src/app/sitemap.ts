import { MetadataRoute } from "next"
import { siteConfig } from "@/lib/constants"

// In production, this would fetch from Supabase
const staticPaths = [
  "",
  "/services",
  "/booking",
  "/postureprime",
  "/blog",
]

// Placeholder blog slugs - in production would fetch from DB
const blogSlugs = [
  "how-online-posture-coaching-works-with-vince",
  "posture-correction-vs-chiropractor-whats-better",
  "why-desk-workers-need-posture-coaching",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  // Static pages
  const staticPages = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/blog" ? "daily" as const : "monthly" as const,
    priority: path === "" ? 1 : path === "/services" || path === "/booking" ? 0.9 : 0.8,
  }))

  // Blog posts
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages]
}
