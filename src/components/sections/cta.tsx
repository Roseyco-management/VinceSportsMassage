"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"

export function CTA() {
  return (
    <section className="py-16 md:py-24 bg-cyan-600">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <Calendar className="h-12 w-12 text-cyan-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Book Your Appointment Today
          </h2>
          <p className="text-lg text-cyan-100 mb-8">
            Take the first step towards a healthier, pain-free you. Schedule your session
            now and experience the difference professional bodywork can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-cyan-700 hover:bg-cyan-50 font-semibold"
            >
              <Link href="/booking">
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 font-semibold"
            >
              <Link href="/services">Learn More</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
