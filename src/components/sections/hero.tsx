"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"
import { env } from "@/lib/env"
import { siteConfig } from "@/lib/constants"

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* YouTube Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for readability */}
        <iframe
          src={`https://www.youtube.com/embed/${env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          title="Vince Sports Massage Background Video"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ border: 'none' }}
        />

        {/* Optional: Local Video Background */}
        {/* Uncomment to use local video instead of YouTube */}
        {/*
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        */}
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-20">
        <div className="max-w-3xl">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div role="img" aria-label="5 out of 5 stars" className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <span className="text-sm font-medium text-white">
                {siteConfig.googleReviews.rating} stars • {siteConfig.googleReviews.count} reviews
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              <span className="text-white">●</span> <span className="italic">Move Better.</span><br />
              <span className="font-extrabold">Pain-Free.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Expert bodywork & posture coaching in {siteConfig.address.region}.
              Helping you recover faster, move freely, and perform at your best.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-primary-lighter text-white hover:bg-primary font-semibold"
              >
                <Link href="/booking">
                  Book Your Session
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/20 font-semibold bg-white/10"
              >
                <Link href="/services">View Services</Link>
              </Button>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 inline-flex bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-lighter/20 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-light">10+</span>
                </div>
                <div>
                  <p className="font-semibold text-white">Years</p>
                  <p className="text-sm text-gray-300">Experience</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
