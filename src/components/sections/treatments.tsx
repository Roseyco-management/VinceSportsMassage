"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Target, RotateCcw, Zap, Dumbbell, Apple, Circle } from "lucide-react"

const treatments = [
  {
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    description: "Release stubborn knots and muscle tension points for immediate relief.",
    icon: Target,
  },
  {
    slug: "passive-arom",
    name: "Passive AROM",
    description: "Assisted range of motion techniques to improve flexibility and speed recovery.",
    icon: RotateCcw,
  },
  {
    slug: "recovery-boots",
    name: "Recovery Boots",
    description: "Compression therapy for enhanced circulation and faster muscle recovery.",
    icon: Zap,
  },
  {
    slug: "sports-massage",
    name: "Sports Massage",
    description: "Deep tissue work tailored for athletes and active individuals.",
    icon: Dumbbell,
  },
  {
    slug: "diet-nutrition",
    name: "Diet & Nutrition",
    description: "Nutritional guidance to support your health and recovery goals.",
    icon: Apple,
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    description: "Traditional therapy for muscle release and improved blood flow.",
    icon: Circle,
  },
]

export function Treatments() {
  return (
    <section className="py-16 md:py-24 bg-white">
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
            Treatments & Therapies
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Real Treatments. Real Relief. Real Results.
          </h2>
          <p className="text-lg text-slate-600">
            Evidence-based techniques and modern recovery tools to help you feel your best.
          </p>
        </motion.div>

        {/* Treatments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/services#${treatment.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all group cursor-pointer border-2 border-transparent hover:border-cyan-200">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-100 transition-colors">
                        <treatment.icon className="h-7 w-7 text-slate-600 group-hover:text-cyan-600 transition-colors" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-cyan-700 transition-colors">
                          {treatment.name}
                        </h3>
                        <p className="text-slate-600 text-sm">
                          {treatment.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
