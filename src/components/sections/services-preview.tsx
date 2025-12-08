"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Hand, User, Wind, Activity } from "lucide-react"

const featuredServices = [
  {
    slug: "therapeutic-bodywork",
    name: "Therapeutic Bodywork",
    description: "Comprehensive hands-on therapy to address pain, tension, and mobility issues through targeted techniques.",
    icon: Hand,
  },
  {
    slug: "posture-correction",
    name: "Posture Correction",
    description: "Realign your body and fix postural imbalances for lasting relief from chronic pain and discomfort.",
    icon: User,
  },
  {
    slug: "breathwork-coaching",
    name: "Breathwork Coaching",
    description: "Optimize your breathing patterns for better performance, reduced stress, and faster recovery.",
    icon: Wind,
  },
  {
    slug: "remediation",
    name: "Remediation",
    description: "Targeted treatment plans for injury recovery and rehabilitation to get you back to full function.",
    icon: Activity,
  },
]

export function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wide">
            What I Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Making You Move Better, Feel Better, and Live Your Life
          </h2>
          <p className="text-lg text-slate-600">
            Personalized treatments designed to address your specific needs and help you achieve your health goals.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                    <service.icon className="h-6 w-6 text-cyan-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <Link
                    href={`/services#${service.slug}`}
                    className="inline-flex items-center text-cyan-600 text-sm font-medium hover:text-cyan-700"
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
