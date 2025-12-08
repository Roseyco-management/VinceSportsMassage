"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react"
import { siteConfig } from "@/lib/constants"

export function Contact() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-600 font-semibold text-sm uppercase tracking-wide">
              Get In Touch
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Book your session today and take the first step towards moving better,
              feeling better, and living pain-free.
            </p>

            {/* Contact Cards */}
            <div className="space-y-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="font-semibold text-slate-900 hover:text-cyan-600 transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-semibold text-slate-900 hover:text-cyan-600 transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Location</p>
                    <address className="font-semibold text-slate-900 not-italic">
                      {siteConfig.address.street}, {siteConfig.address.city}, {siteConfig.address.postcode}
                    </address>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Opening Hours</p>
                    <p className="font-semibold text-slate-900">
                      Mon - Sat: 11am - 6pm
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button asChild size="lg">
              <Link href="/booking">
                Book Your Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square lg:aspect-auto lg:h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-200">
              {/* Google Maps Embed */}
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2329.5!2d${siteConfig.geo.longitude}!3d${siteConfig.geo.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDE5JzQyLjYiTiA1wrA0Mic0OS4zIlc!5e0!3m2!1sen!2suk!4v1234567890`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vince Sports Massage Location"
                className="absolute inset-0"
              />
              {/* Fallback if map doesn't load */}
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 -z-10">
                <div className="text-center p-8">
                  <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-500">Map loading...</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
