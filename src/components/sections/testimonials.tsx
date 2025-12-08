"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { siteConfig } from "@/lib/constants"

const testimonials = [
  {
    id: 1,
    name: "Matthew Martin",
    role: "First Visit",
    content: "First time visiting a bodywork therapist and I walked away feeling limber. Vince began with an assessment, had me sit down then explained his findings and what he was going to do to help fix it. Good sleep has returned to my life since then but if you were to ask me what was the highlight of the session, I'd tell you it was the wisdom I walked away with after an hour's conversation with Vince. 10/10 recommend.",
    rating: 5,
  },
  {
    id: 2,
    name: "SweetFruit4Ever",
    role: "PosturePrime User",
    content: "Vince enthusiastically shared his knowledge of physiology and movement mechanics, he is well trained and explains concepts in a way that anyone can understand, and most importantly, begin to implement immediately. I am excited to try my posture cushion and improve my posture and neck health. Vince radiates kindness and compassion. You are safe in his hands!",
    rating: 5,
  },
  {
    id: 3,
    name: "Tom Craig",
    role: "Client",
    content: "I seen Vince for the 1st appointment yesterday. I'm 60 and haven't been particularly kind to my body over the years mainly due to excessive mileage on motorcycles. I gave Vince a fairly concise description of my various aches and came away very happy with his work. I've been to other great therapists over the years and can therefore confirm Vince definitely knows his business. Really looking forward to the next session. Do yourself a favour and give him a call.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          {/* Google Reviews Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm font-medium">
              {siteConfig.googleReviews.rating} • {siteConfig.googleReviews.count} Google Reviews
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            What My Clients Say
          </h2>
          <p className="text-lg text-slate-300">
            Don&apos;t just take my word for it - hear from people who&apos;ve experienced real results.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-cyan-400 mb-4" />
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-200 mb-6">
                    &quot;{testimonial.content}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-600 flex items-center justify-center">
                      <span className="text-sm font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href={siteConfig.googleBusiness}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Read all {siteConfig.googleReviews.count} Google Reviews
          </a>
        </motion.div>
      </div>
    </section>
  )
}
