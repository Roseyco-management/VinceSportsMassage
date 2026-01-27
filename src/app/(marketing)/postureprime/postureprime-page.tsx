"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Star, ExternalLink } from "lucide-react"

const commonIssues = [
  "Back pain and stiffness",
  "Neck strain and tension",
  "Headaches from poor posture",
  "Rounded shoulders",
  "Forward head posture",
]

const benefits = [
  {
    title: "Pain Relief",
    description: "Experience relief from chronic pain caused by poor posture",
  },
  {
    title: "Enhanced Energy",
    description: "Improved posture leads to better breathing and more energy",
  },
  {
    title: "Better Confidence",
    description: "Stand taller and feel more confident in your daily life",
  },
  {
    title: "Improved Well-being",
    description: "Overall improvement in physical and mental well-being",
  },
]

const features = [
  "Natural Head-to-Spine Alignment System",
  "Ergonomic, Lightweight, and Discreet Design",
  "Trusted by Therapists and Practitioners Worldwide",
]

const weightLevels = [
  { weight: "1kg", color: "bg-primary-light", description: "Beginner level" },
  { weight: "2kg", color: "bg-primary-lighter", description: "Intermediate level" },
  { weight: "3kg", color: "bg-primary", description: "Advanced level" },
]

export function PosturePrimePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Embed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900 shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/ZU1r_qAmiy0?si=bHfp7OU2dCZmyVi-"
                  title="PosturePrime - How to Use the Vertex"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                <span className="text-primary">Unlock</span> Your{" "}
                <span className="italic">Best</span> Posture Today
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                PosturePrime is designed to alleviate common posture problems,
                providing pain relief and a daily energy boost. Experience the
                difference with our innovative device and reclaim your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary-dark">
                  Order Now
                </Button>
                <Button size="lg" variant="outline">
                  <Link href="/booking">Book Online Posture Consultation</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Issues Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Common Issues
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">
                Recognizing Posture Problems
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Poor posture can lead to a variety of health issues, including back pain,
                neck stiffness, and headaches. PosturePrime helps correct these problems
                by providing support and promoting proper alignment. Improve your daily
                life with better posture and increased comfort. Start feeling better today!
              </p>
              <Button variant="outline">
                Shop Now!
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Signs of Poor Posture
                  </h3>
                  <div className="space-y-3">
                    {commonIssues.map((issue) => (
                      <div key={issue} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-slate-700">{issue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Feature Section */}
      <section className="py-16 md:py-24 bg-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Content */}
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                      Experience True Postural Alignment with PosturePrime™
                    </h2>
                    <p className="text-slate-600 mb-6">
                      PosturePrime™ is a revolutionary system designed to retrain your posture
                      naturally, starting from the head — not the shoulders. Our unique head-loading
                      technique promotes proper spinal alignment, rebuilding strength, balance, and
                      confidence in your everyday movement. Easy to integrate into your daily
                      routine, PosturePrime™ helps you restore your natural posture for lasting relief
                      and a healthier, more energized life.
                    </p>
                    <div className="space-y-2 mb-6">
                      {features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Therapist Approved Badge */}
                    <div className="inline-flex items-center gap-2 bg-primary-muted text-cyan-800 px-4 py-2 rounded-full text-sm font-medium w-fit">
                      <CheckCircle className="h-4 w-4" />
                      Therapist Approved
                    </div>
                  </div>

                  {/* Product Image Placeholder */}
                  <div className="bg-gradient-to-br from-slate-200 to-slate-300 min-h-[400px] flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary-muted flex items-center justify-center">
                        <span className="text-4xl">📦</span>
                      </div>
                      <p className="text-slate-600 font-medium">Vertex PosturePrime</p>
                      <p className="text-slate-500 text-sm">Product Image</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Discover the Life-Changing Benefits of Using PosturePrime Daily
            </h2>
            <p className="text-lg text-slate-600">
              PosturePrime offers a multitude of benefits that extend beyond just physical
              appearance. Experience relief from chronic pain, enhanced energy levels, and a
              significant improvement in your overall well-being. Embrace a healthier, more
              confident you with PosturePrime. It&apos;s more than a device; it&apos;s a lifestyle upgrade.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary-muted flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Breathing and Posture Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Breathing Impacts Posture
            </h2>
            <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-6"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-xl text-slate-700 leading-relaxed">
                Breathing isn&apos;t just about oxygen. The way we breathe affects spinal alignment,
                nervous system regulation, and even the way we stand or sit. When we breathe
                properly, our posture naturally improves, tension melts away, and our body
                finds its natural balance.
              </p>
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/TX7sbQkG-4w?start=164"
                  title="Breathing for Better Posture"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Breathing and Nervous System Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center space-y-8">
              {/* Caption */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Discover how breath impacts your nervous system in real time
                </h3>
                <div className="w-12 h-1 bg-primary rounded-full mx-auto"></div>
              </div>

              {/* Video Container */}
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/G7GE4skZhyc?start=409"
                  title="Breathing and Alignment Demonstration"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weight Levels Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Posture Assessment Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary-muted to-primary-muted">
                <Image
                  src="/images/postureprime/vince-posture-assessment.png"
                  alt="Vince conducting a posture assessment session"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Strengthen Your Posture at Your Own Pace
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Take full control of your posture correction with PosturePrime&apos;s adjustable
                weight system. Designed for progressive strength and optimal spine alignment,
                at a pace that suits your body best.
              </p>
              <div className="space-y-4 mb-8">
                {weightLevels.map((level) => (
                  <div key={level.weight} className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${level.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                      {level.weight}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{level.weight} Weight</p>
                      <p className="text-sm text-slate-600">{level.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary-dark">
                Order Now
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div role="img" aria-label="5 out of 5 stars" className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-slate-700 italic mb-6">
              &quot;Using PosturePrime has transformed my daily routine. I feel more
              aligned and energetic throughout the day. It&apos;s a game-changer for
              anyone struggling with posture issues!&quot;
            </blockquote>
            <cite className="text-slate-900 font-semibold not-italic">
              Emily Johnson
            </cite>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Posture?
            </h2>
            <p className="text-primary-muted mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have improved their posture
              and quality of life with PosturePrime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary-dark hover:bg-primary-subtle">
                Order PosturePrime
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/booking">Book Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
