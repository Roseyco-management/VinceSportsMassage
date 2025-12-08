import { siteConfig } from "@/lib/constants"

// Local Business Schema for Homepage
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.fullName,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/vince-mcdowell.jpg`,
    logo: `${siteConfig.url}/images/logo.png`,
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postcode,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.googleReviews.rating,
      reviewCount: siteConfig.googleReviews.count,
      bestRating: 5,
      worstRating: 1,
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sports Massage & Bodywork Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sports Massage",
            description: "Deep tissue massage for athletes and active individuals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Posture Correction",
            description: "Assessment and treatment for postural imbalances",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Therapeutic Bodywork",
            description: "Comprehensive hands-on therapy for pain and mobility issues",
          },
        },
      ],
    },
  }
}

// Service Schema
export function getServiceSchema(service: {
  name: string
  description: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${siteConfig.url}/services#${service.slug}`,
    provider: {
      "@type": "HealthAndBeautyBusiness",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Place",
      name: "Northern Ireland",
    },
  }
}

// Article Schema for Blog Posts
export function getArticleSchema(article: {
  title: string
  description: string
  slug: string
  author: string
  publishedAt: string
  updatedAt: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${siteConfig.url}/blog/${article.slug}`,
    image: article.image || `${siteConfig.url}/og.jpg`,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${article.slug}`,
    },
  }
}

// Breadcrumb Schema
export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// FAQ Schema
export function getFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// Website Schema
export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

// Product Schema for PosturePrime
export function getProductSchema(product: {
  name: string
  description: string
  image: string
  price?: number
  currency?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: "PosturePrime",
    },
    offers: product.price
      ? {
          "@type": "Offer",
          price: product.price,
          priceCurrency: product.currency || "GBP",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: 1,
    },
  }
}
