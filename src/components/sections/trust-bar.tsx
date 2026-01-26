"use client"

import { motion } from "framer-motion"
import { Star, Users, Calendar, Award } from "lucide-react"
import { siteConfig } from "@/lib/constants"

const trustItems = [
  {
    icon: Star,
    value: "5.0★",
    label: "Google Rating",
    color: "text-yellow-600"
  },
  {
    icon: Users,
    value: "60+",
    label: "5-Star Reviews",
    color: "text-cyan-600"
  },
  {
    icon: Calendar,
    value: "10+",
    label: "Years Experience",
    color: "text-cyan-600"
  },
  {
    icon: Award,
    value: "Verified",
    label: "By Google",
    color: "text-green-600"
  }
]

export function TrustBar() {
  return (
    <section className="py-6 bg-white border-y border-slate-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-lg">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-600">
                    {item.label}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
