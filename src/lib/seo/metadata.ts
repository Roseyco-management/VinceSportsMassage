import { Metadata } from "next"
import { siteConfig } from "@/lib/constants"

type PageMetadata = {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  keywords,
  image,
  noIndex,
  canonical,
}: PageMetadata = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${siteConfig.name}`
    : siteConfig.fullName
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: keywords?.join(", "),
    authors: [{ name: siteConfig.owner }],
    creator: siteConfig.owner,
    publisher: siteConfig.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: canonical || siteConfig.url,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: canonical || siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  }
}

// Blog post metadata generator
export function generateBlogMetadata(post: {
  title: string
  excerpt?: string | null
  meta_description?: string | null
  slug: string
  featured_image?: string | null
  published_at?: string | null
  author?: string
}): Metadata {
  const title = post.title
  const description = post.meta_description || post.excerpt || siteConfig.description
  const image = post.featured_image || siteConfig.ogImage
  const url = `${siteConfig.url}/blog/${post.slug}`

  return {
    title: `${title} | ${siteConfig.name} Blog`,
    description,
    authors: [{ name: post.author || siteConfig.owner }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "en_GB",
      url,
      title,
      description,
      siteName: siteConfig.name,
      publishedTime: post.published_at || undefined,
      authors: [post.author || siteConfig.owner],
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

// Service page metadata
export function generateServiceMetadata(service: {
  name: string
  description: string
  slug: string
}): Metadata {
  const title = `${service.name} in Downpatrick`
  const url = `${siteConfig.url}/services#${service.slug}`

  return {
    title: `${title} | ${siteConfig.name}`,
    description: service.description,
    alternates: {
      canonical: `${siteConfig.url}/services`,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url,
      title,
      description: service.description,
      siteName: siteConfig.name,
    },
  }
}
