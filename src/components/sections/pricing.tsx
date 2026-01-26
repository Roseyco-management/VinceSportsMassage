"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { pricing } from "@/lib/constants"
import Link from "next/link"

export function Pricing() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wide">
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Transparent, Fair Pricing
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No hidden fees. No surprises. Just quality care at honest prices.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricing.map((plan, index) => (
            <motion.div
              key={plan.slug}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
              }}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2 }
              }}
            >
              <Card className={`p-6 h-full flex flex-col relative ${'popular' in plan && plan.popular ? 'border-2 border-cyan-500 shadow-xl' : ''}`}>
                {'popular' in plan && plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-600">
                    Most Popular
                  </Badge>
                )}

                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-slate-900">£{plan.price}</span>
                    <span className="text-slate-600 ml-2">/ {plan.duration}</span>
                  </div>

                  {'savings' in plan && plan.savings && (
                    <p className="text-sm font-semibold text-green-600 mb-3">
                      {plan.savings}
                    </p>
                  )}

                  <p className="text-slate-600 mb-6">
                    {plan.description}
                  </p>

                  {'features' in plan && plan.features && (
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="h-5 w-5 text-cyan-600 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button
                  asChild
                  className={`w-full ${'popular' in plan && plan.popular ? 'bg-cyan-600 hover:bg-cyan-700' : ''}`}
                  variant={'popular' in plan && plan.popular ? 'default' : 'outline'}
                >
                  <Link href="/booking">Book Now</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-slate-600">
            All prices include VAT. Payment accepted: Cash, Card, Bank Transfer
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Not sure which session is right for you?{" "}
            <Link href="/booking" className="text-cyan-600 hover:underline">
              Book a free 15-minute consultation call
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
