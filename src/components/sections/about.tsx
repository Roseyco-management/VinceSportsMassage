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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-50 to-slate-100 flex items-end justify-center">
              <Image
                src="/images/Vince1.png"
                alt="Vince McDowell - Sports Massage Therapist"
                width={400}
                height={500}
                className="object-contain"
                priority
              />
            </div>
            {/* Accent shape */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-cyan-100 rounded-2xl -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wide">
              Meet {siteConfig.owner}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Your Partner in Recovery & Performance
            </h2>
            <div className="prose prose-slate max-w-none mb-8">
              <p className="text-lg text-slate-600">
                With over a decade of experience in sports massage and bodywork therapy,
                I&apos;ve helped hundreds of clients overcome pain, improve their posture,
                and achieve their physical goals.
              </p>
              <p className="text-slate-600">
                Whether you&apos;re an athlete looking to enhance performance, dealing with
                chronic pain, or simply want to move better in your daily life, I provide
                personalized treatment plans tailored to your unique needs.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {credentials.map((credential) => (
                <div key={credential} className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0" />
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
