"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, User, Clock } from "lucide-react"
import { CTA } from "@/components/sections"

// Placeholder blog posts - these will come from Supabase
const placeholderPosts = [
  {
    id: "1",
    slug: "how-online-posture-coaching-works-with-vince",
    title: "How Online Posture Coaching Works (With Vince)",
    excerpt: "If you're dealing with recurring pain, poor posture, or want to improve your movement quality, online posture coaching might be the solution you need.",
    category: "Posture",
    author: "Vince McDowell",
    published_at: "2024-12-01",
    read_time: 5,
  },
  {
    id: "2",
    slug: "posture-correction-vs-chiropractor-whats-better",
    title: "Posture Correction vs Chiropractor: What's Better?",
    excerpt: "If you're dealing with back pain, stiffness, or poor posture, you might be wondering whether to see a chiropractor or work on posture correction.",
    category: "Posture",
    author: "Vince McDowell",
    published_at: "2024-11-28",
    read_time: 7,
  },
  {
    id: "3",
    slug: "why-desk-workers-need-posture-coaching",
    title: "Why Desk Workers Need Posture Coaching",
    excerpt: "Sitting at a desk all day might seem harmless — but over time, poor posture can lead to chronic pain, decreased mobility, and reduced quality of life.",
    category: "Wellness",
    author: "Vince McDowell",
    published_at: "2024-11-25",
    read_time: 6,
  },
]

const categories = [
  { name: "All", slug: "all" },
  { name: "Sports Massage", slug: "sports-massage" },
  { name: "Posture", slug: "posture" },
  { name: "Recovery", slug: "recovery" },
  { name: "Wellness", slug: "wellness" },
  { name: "Mobility", slug: "mobility" },
]

export function BlogListPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary-light font-semibold text-sm uppercase tracking-wide">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Health, Recovery & Wellness Insights
            </h1>
            <p className="text-lg text-slate-300">
              Welcome to the blog page, your go-to resource for expert insights on bodywork
              therapy, posture, recovery, and holistic well-being. Explore our articles!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1">
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={category.slug === "all" ? "default" : "outline"}
                    size="sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </motion.div>

              {/* Posts Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Latest Blog Posts</h2>
                  <p className="text-slate-600">Explore our insights on health and recovery.</p>
                </div>
                <Button variant="outline" size="sm">
                  Read More
                </Button>
              </div>

              {/* Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {placeholderPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow group">
                        <CardContent className="p-0">
                          {/* Image Placeholder */}
                          <div className="aspect-video bg-slate-100 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                              <span className="text-4xl">📝</span>
                            </div>
                          </div>

                          <div className="p-6">
                            <Badge variant="secondary" className="mb-3">
                              {post.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.published_at).toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {post.read_time} min read
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Posts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-80 space-y-6"
            >
              {/* Categories */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => (
                      <Link
                        key={category.slug}
                        href={`/blog?category=${category.slug}`}
                        className="flex items-center justify-between py-2 text-slate-600 hover:text-primary transition-colors"
                      >
                        <span>{category.name}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter / CTA */}
              <Card className="bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to Feel Better?
                  </h3>
                  <p className="text-primary-muted text-sm mb-4">
                    Book your session today and start your journey to better health.
                  </p>
                  <Button asChild className="w-full bg-white text-primary-dark hover:bg-primary-subtle">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Recent Posts
                  </h3>
                  <div className="space-y-4">
                    {placeholderPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(post.published_at).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.aside>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
