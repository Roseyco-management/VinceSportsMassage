"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  ChevronRight,
} from "lucide-react"
import { JsonLd } from "@/lib/seo"
import { siteConfig } from "@/lib/constants"

interface BlogPostPageProps {
  post: {
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
  }
  articleSchema: Record<string, unknown>
  breadcrumbSchema: Record<string, unknown>
}

export function BlogPostPage({
  post,
  articleSchema,
  breadcrumbSchema,
}: BlogPostPageProps) {
  const shareUrl = `${siteConfig.url}/blog/${post.slug}`
  const shareTitle = encodeURIComponent(post.title)

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />

      <article className="pb-16">
        {/* Header */}
        <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-slate-300 truncate">{post.title}</span>
              </nav>

              <Badge className="mb-4 bg-primary-lighter/20 text-primary-light hover:bg-primary-lighter/30">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <p className="text-lg text-slate-300 mb-8">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 max-w-3xl mx-auto lg:mx-0"
            >
              {/* Featured Image Placeholder */}
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 mb-8">
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-6xl">📝</span>
                </div>
              </div>

              {/* Article Content - content is sanitized on server before rendering */}
              <div
                className="prose prose-slate prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-slate-900
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-slate-600 prose-p:leading-relaxed
                  prose-li:text-slate-600
                  prose-strong:text-slate-900
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Share */}
              <div className="border-t border-b py-6 my-8">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Share2 className="h-5 w-5" />
                    <span className="font-medium">Share this article</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-muted hover:text-primary transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-muted hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-primary-muted hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Author Box */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-muted flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">👤</span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Written by</p>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {post.author}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Sports Massage Therapist & Posture Specialist with over 10 years of experience
                        helping clients move better and live pain-free.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Back Link */}
              <Button variant="outline" asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
            </motion.div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full lg:w-80 space-y-6"
            >
              {/* CTA Card */}
              <Card className="bg-primary text-white sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Feel Better?
                  </h3>
                  <p className="text-primary-muted text-sm mb-4">
                    Book a consultation with Vince and start your journey to better
                    posture and reduced pain.
                  </p>
                  <Button asChild className="w-full bg-white text-primary-dark hover:bg-primary-subtle">
                    <Link href="/booking">Book Your Session</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts would go here */}
            </motion.aside>
          </div>
        </div>
      </article>
    </>
  )
}
