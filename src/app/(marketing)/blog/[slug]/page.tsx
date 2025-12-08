import { Metadata } from "next"
import { notFound } from "next/navigation"
import { BlogPostPage } from "./blog-post-page"
import { siteConfig } from "@/lib/constants"
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/seo"

// Placeholder - in production this would fetch from Supabase
const placeholderPosts: Record<string, {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  published_at: string
  read_time: number
  meta_description: string
}> = {
  "how-online-posture-coaching-works-with-vince": {
    id: "1",
    slug: "how-online-posture-coaching-works-with-vince",
    title: "How Online Posture Coaching Works (With Vince)",
    excerpt: "If you're dealing with recurring pain, poor posture, or want to improve your movement quality, online posture coaching might be the solution you need.",
    content: `
      <p>If you're dealing with recurring pain, poor posture, or want to improve your movement quality, online posture coaching might be the solution you need.</p>

      <h2>What is Online Posture Coaching?</h2>
      <p>Online posture coaching is a virtual service where I work with you one-on-one via video call to assess your posture, identify issues, and create a personalized plan to improve your alignment and reduce pain.</p>

      <h2>How Does It Work?</h2>
      <p>The process is simple and convenient:</p>
      <ol>
        <li><strong>Initial Assessment:</strong> We start with a comprehensive video consultation where I observe your posture, movement patterns, and discuss your health history.</li>
        <li><strong>Analysis:</strong> Using video analysis, I identify the root causes of your postural issues and pain patterns.</li>
        <li><strong>Custom Plan:</strong> You receive a personalized exercise and stretching program tailored to your specific needs.</li>
        <li><strong>Follow-up Sessions:</strong> Regular check-ins to monitor progress and adjust your plan as needed.</li>
      </ol>

      <h2>Benefits of Online Coaching</h2>
      <ul>
        <li>Work with me from anywhere in the world</li>
        <li>Flexible scheduling that fits your lifestyle</li>
        <li>No travel time or costs</li>
        <li>Access to recordings of your sessions</li>
        <li>Ongoing support via messaging</li>
      </ul>

      <h2>Is Online Coaching Right for You?</h2>
      <p>Online posture coaching is ideal if you:</p>
      <ul>
        <li>Can't easily access in-person services</li>
        <li>Have a busy schedule</li>
        <li>Want to work on posture from the comfort of home</li>
        <li>Are motivated to do exercises independently</li>
      </ul>

      <h2>Ready to Get Started?</h2>
      <p>Book your online posture consultation today and take the first step towards better alignment and reduced pain.</p>
    `,
    category: "Posture",
    author: "Vince McDowell",
    published_at: "2024-12-01",
    read_time: 5,
    meta_description: "Learn how online posture coaching works with Vince McDowell. Discover how virtual consultations can help you improve your posture and reduce pain from anywhere.",
  },
  "posture-correction-vs-chiropractor-whats-better": {
    id: "2",
    slug: "posture-correction-vs-chiropractor-whats-better",
    title: "Posture Correction vs Chiropractor: What's Better?",
    excerpt: "If you're dealing with back pain, stiffness, or poor posture, you might be wondering whether to see a chiropractor or work on posture correction.",
    content: `
      <p>If you're dealing with back pain, stiffness, or poor posture, you might be wondering whether to see a chiropractor or work on posture correction. Both approaches have their merits, but they work in fundamentally different ways.</p>

      <h2>What's the Difference?</h2>

      <h3>Chiropractic Care</h3>
      <p>Chiropractors focus on spinal adjustments and manipulations to correct misalignments. This is often a passive treatment where the practitioner does the work on you.</p>

      <h3>Posture Correction</h3>
      <p>Posture correction focuses on retraining your body to hold itself correctly through exercises, awareness, and movement patterns. It's a more active approach where you learn to maintain improvements yourself.</p>

      <h2>When to Choose Each</h2>

      <h3>Consider Chiropractic If:</h3>
      <ul>
        <li>You have acute spinal issues</li>
        <li>You need immediate relief from specific joint restrictions</li>
        <li>You've had a recent injury affecting spinal alignment</li>
      </ul>

      <h3>Consider Posture Correction If:</h3>
      <ul>
        <li>You have chronic postural issues</li>
        <li>Your pain keeps returning despite treatments</li>
        <li>You want long-term, sustainable results</li>
        <li>You're willing to put in the work for lasting change</li>
      </ul>

      <h2>The Best Approach?</h2>
      <p>For most people with postural issues, posture correction offers more sustainable results because it addresses the root cause—your daily habits and movement patterns. Chiropractic care can be a useful complement, but without addressing the underlying patterns, problems often return.</p>

      <h2>My Recommendation</h2>
      <p>Start with a posture assessment to understand what's actually causing your issues. From there, we can determine the best path forward, which might include posture correction alone or in combination with other treatments.</p>
    `,
    category: "Posture",
    author: "Vince McDowell",
    published_at: "2024-11-28",
    read_time: 7,
    meta_description: "Comparing posture correction vs chiropractic care. Learn which approach is better for your back pain, stiffness, and postural issues.",
  },
  "why-desk-workers-need-posture-coaching": {
    id: "3",
    slug: "why-desk-workers-need-posture-coaching",
    title: "Why Desk Workers Need Posture Coaching",
    excerpt: "Sitting at a desk all day might seem harmless — but over time, poor posture can lead to chronic pain, decreased mobility, and reduced quality of life.",
    content: `
      <p>Sitting at a desk all day might seem harmless — but over time, poor posture can lead to chronic pain, decreased mobility, and reduced quality of life. If you work at a desk, posture coaching could be one of the best investments in your health.</p>

      <h2>The Desk Worker's Dilemma</h2>
      <p>The human body wasn't designed to sit for 8+ hours a day. When we do, certain patterns develop:</p>
      <ul>
        <li><strong>Forward head posture:</strong> Your head shifts forward, straining neck muscles</li>
        <li><strong>Rounded shoulders:</strong> Chest muscles tighten while back muscles weaken</li>
        <li><strong>Hip flexor tightness:</strong> Sitting shortens these muscles, affecting your lower back</li>
        <li><strong>Core weakness:</strong> Your stabilizing muscles become inactive</li>
      </ul>

      <h2>The Consequences</h2>
      <p>These postural changes don't just affect how you look—they impact your entire body:</p>
      <ul>
        <li>Chronic neck and shoulder pain</li>
        <li>Headaches and migraines</li>
        <li>Lower back pain</li>
        <li>Reduced breathing capacity</li>
        <li>Decreased energy levels</li>
        <li>Poor digestion</li>
      </ul>

      <h2>Why Posture Coaching Works</h2>
      <p>Unlike quick fixes, posture coaching addresses the root causes of your issues:</p>
      <ol>
        <li><strong>Assessment:</strong> Understanding your specific postural patterns</li>
        <li><strong>Education:</strong> Learning why these patterns developed</li>
        <li><strong>Exercises:</strong> Targeted movements to correct imbalances</li>
        <li><strong>Habits:</strong> Building awareness for better daily posture</li>
        <li><strong>Ergonomics:</strong> Optimizing your workspace setup</li>
      </ol>

      <h2>Take Action Now</h2>
      <p>Don't wait until pain forces you to act. Proactive posture coaching can prevent issues before they become chronic. Book a consultation to assess your posture and start your journey to pain-free desk work.</p>
    `,
    category: "Wellness",
    author: "Vince McDowell",
    published_at: "2024-11-25",
    read_time: 6,
    meta_description: "Discover why desk workers need posture coaching. Learn about the consequences of poor posture from sitting and how coaching can help.",
  },
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = placeholderPosts[slug]

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.meta_description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.meta_description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.published_at,
      authors: [post.author],
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const post = placeholderPosts[slug]

  if (!post) {
    notFound()
  }

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.meta_description,
    slug: post.slug,
    author: post.author,
    publishedAt: post.published_at,
    updatedAt: post.published_at,
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${post.slug}` },
  ])

  return (
    <BlogPostPage
      post={post}
      articleSchema={articleSchema}
      breadcrumbSchema={breadcrumbSchema}
    />
  )
}

export async function generateStaticParams() {
  return Object.keys(placeholderPosts).map((slug) => ({
    slug,
  }))
}
