import { Metadata } from "next"
import { BlogListPage } from "./blog-list-page"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Blog - Health, Recovery & Wellness Insights",
  description: `Expert insights on bodywork therapy, posture, recovery, and holistic well-being from ${siteConfig.owner}. Explore articles on sports massage, mobility, and health.`,
  keywords: [
    "sports massage blog",
    "posture tips",
    "recovery advice",
    "wellness articles",
    "bodywork therapy insights",
    "health blog",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blog | Vince Sports Massage",
    description: "Expert insights on bodywork therapy, posture, recovery, and holistic well-being.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
}

export default function Page() {
  return <BlogListPage />
}
