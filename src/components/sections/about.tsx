"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { siteConfig } from "@/lib/constants"

const credentials = [
  "Level 5 Sports Massage Therapist",
  "Certified Posture Specialist",
  "Breathwork Coach",
  "10+ Years Experience",
]

export function About() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Vince Portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
              className="aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary-subtle to-slate-100 flex items-end justify-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <Image
                src="/images/Vince1.png"
                alt="Vince McDowell - Sports Massage Therapist"
                width={500}
                height={667}
                className="object-contain"
                priority
              />
            </motion.div>
            {/* Accent shape */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary-muted rounded-2xl -z-10"
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Meet Vince McDowell
            </h2>
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-lg text-slate-600">
                Vince McDowell is a Bodywork Specialist, Personal Trainer, and Posture
                Specialist based in Northern Ireland. With over a decade of experience,
                he combines hands-on bodywork therapy, posture correction, and breathwork
                coaching to help clients move better, feel stronger, and live pain-free.
              </p>
              <p className="text-slate-600">
                Whether you&apos;re recovering from injury or seeking long-term posture and
                breathing improvements, Vince provides modern, personalised care that
                delivers results.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {credentials.map((credential) => (
                <div key={credential} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-slate-700">{credential}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link href="/booking">Book a Consultation</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
