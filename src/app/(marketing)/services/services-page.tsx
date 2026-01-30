"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowRight,
  Hand,
  User,
  Wind,
  Activity,
  MoveHorizontal,
  Layers,
  Dumbbell,
  Target,
  RotateCcw,
  Zap,
  Circle,
  Apple,
  CheckCircle,
} from "lucide-react"
import { CTA } from "@/components/sections"

const services = [
  {
    slug: "sports-massage",
    name: "Sports Massage",
    shortDescription: "Comprehensive hands-on therapy to address pain, tension, and mobility issues.",
    description: "Sports massage combines various manual therapy techniques to address the root causes of pain and dysfunction. This holistic approach targets muscles, fascia, and connective tissues to restore proper function and relieve chronic discomfort.",
    benefits: [
      "Relief from chronic pain and tension",
      "Improved range of motion",
      "Enhanced body awareness",
      "Faster recovery from injuries",
    ],
    icon: Hand,
    image: "/images/services/vince-back-massage.png",
    featured: true,
  },
  {
    slug: "posture-correction",
    name: "Posture Correction",
    shortDescription: "Realign your body and fix postural imbalances for lasting relief.",
    description: "Poor posture is often the hidden cause of pain, headaches, and reduced mobility. Through assessment and targeted interventions, we identify and correct postural imbalances to provide lasting relief and improved function.",
    benefits: [
      "Reduced back and neck pain",
      "Improved breathing capacity",
      "Better balance and coordination",
      "Prevention of future issues",
    ],
    icon: User,
    image: "/images/services/vince-posture-coaching.png",
    featured: true,
  },
  {
    slug: "breathwork-coaching",
    name: "Breathwork Coaching",
    shortDescription: "Optimize your breathing patterns for better performance and recovery.",
    description: "Breathing is fundamental to everything we do. Poor breathing patterns can contribute to pain, stress, and reduced performance. Learn to breathe optimally for enhanced recovery, stress management, and peak performance.",
    benefits: [
      "Reduced stress and anxiety",
      "Improved core stability",
      "Enhanced athletic performance",
      "Better sleep quality",
    ],
    icon: Wind,
    image: "/images/services/vince-training-session.png",
    featured: true,
  },
  {
    slug: "rehabilitation",
    name: "Rehabilitation",
    shortDescription: "Targeted treatment plans for injury recovery and rehabilitation.",
    description: "Whether recovering from surgery, injury, or managing a chronic condition, rehabilitation provides structured treatment plans to restore function. We work with you to create a path back to full activity.",
    benefits: [
      "Structured recovery plans",
      "Reduced healing time",
      "Prevention of re-injury",
      "Return to full function",
    ],
    icon: Activity,
    image: "/images/services/Screenshot_4.png",
    featured: true,
  },
  {
    slug: "mobility-coaching",
    name: "Mobility Coaching",
    shortDescription: "Improve your range of motion and movement quality.",
    description: "Mobility is the foundation of movement. Through targeted exercises and hands-on techniques, we improve your joint range of motion and movement quality for better performance in daily life and sport.",
    benefits: [
      "Increased flexibility",
      "Better movement quality",
      "Reduced injury risk",
      "Enhanced athletic performance",
    ],
    icon: MoveHorizontal,
    featured: false,
  },
  {
    slug: "fascia-coaching",
    name: "Fascia Coaching",
    shortDescription: "Release fascial restrictions for improved flexibility and reduced pain.",
    description: "Fascia is the connective tissue that surrounds every muscle and organ in your body. When restricted, it can cause pain and limit movement. Fascial release techniques restore flexibility and reduce chronic pain.",
    benefits: [
      "Release of fascial adhesions",
      "Improved tissue hydration",
      "Better force transmission",
      "Reduced chronic pain",
    ],
    icon: Layers,
    featured: false,
  },
  {
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
    shortDescription: "Deep tissue work for athletes and active individuals.",
    description: "Deep tissue massage is designed for active individuals looking to enhance performance, speed recovery, and prevent injury. Using deep tissue techniques, we target muscle groups specific to your activity.",
    benefits: [
      "Faster muscle recovery",
      "Reduced muscle soreness",
      "Improved flexibility",
      "Enhanced performance",
    ],
    icon: Dumbbell,
    featured: false,
  },
  {
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    shortDescription: "Release stubborn knots and muscle tension points.",
    description: "Trigger points are hyperirritable spots in muscle tissue that cause local and referred pain. Through precise pressure and release techniques, we eliminate these painful knots for immediate relief.",
    benefits: [
      "Immediate pain relief",
      "Reduced referred pain",
      "Improved muscle function",
      "Better range of motion",
    ],
    icon: Target,
    featured: false,
  },
  {
    slug: "passive-arom",
    name: "Passive AROM",
    shortDescription: "Assisted range of motion techniques for flexibility and recovery.",
    description: "Passive Assisted Range of Motion combines therapist-assisted movement with active engagement to improve joint mobility. This gentle approach is ideal for those recovering from injury or with limited mobility.",
    benefits: [
      "Improved joint mobility",
      "Gentle for sensitive areas",
      "Enhanced neural control",
      "Faster recovery",
    ],
    icon: RotateCcw,
    featured: false,
  },
  {
    slug: "recovery-boots",
    name: "Recovery Boots",
    shortDescription: "Compression therapy for enhanced circulation and faster recovery.",
    description: "Normatec compression boots use dynamic air compression to enhance blood flow and speed recovery. Perfect for athletes and anyone looking to reduce muscle soreness and improve circulation.",
    benefits: [
      "Reduced muscle soreness",
      "Enhanced circulation",
      "Faster recovery",
      "Reduced swelling",
    ],
    icon: Zap,
    featured: false,
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    shortDescription: "Traditional therapy for muscle release and blood flow improvement.",
    description: "Cupping therapy uses suction to lift and separate tissue layers, promoting blood flow and releasing muscle tension. This ancient technique provides unique benefits for muscle recovery and pain relief.",
    benefits: [
      "Improved blood circulation",
      "Release of muscle tension",
      "Reduced inflammation",
      "Enhanced healing",
    ],
    icon: Circle,
    featured: false,
  },
  {
    slug: "diet-nutrition",
    name: "Diet & Nutrition",
    shortDescription: "Nutritional guidance to support your health and recovery goals.",
    description: "Nutrition plays a crucial role in recovery and performance. Receive personalized guidance on how to fuel your body for optimal healing, energy, and long-term health.",
    benefits: [
      "Personalized nutrition advice",
      "Enhanced recovery",
      "Improved energy levels",
      "Better body composition",
    ],
    icon: Apple,
    featured: false,
  },
]

export function ServicesPage() {
  const featuredServices = services.filter((s) => s.featured)
  const otherServices = services.filter((s) => !s.featured)

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary-light font-semibold text-sm uppercase tracking-wide">
              Our Services
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Therapeutic Bodywork Services in Downpatrick
            </h1>
            <p className="text-lg text-slate-300 mb-8">
              From sports massage to posture correction, we offer a comprehensive range of
              treatments designed to help you move better, feel better, and live pain-free.
            </p>
            <Button asChild size="lg" className="bg-primary-lighter hover:bg-primary">
              <Link href="/booking">
                Book Your Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              Core Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              Specialised Treatments
            </h2>
            <p className="text-lg text-slate-600">
              Our core services address the most common issues we see in clients.
            </p>
          </motion.div>

          <div className="space-y-16">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Service Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                    {service.image ? (
                      <Image
                        src={service.image}
                        alt={service.name}
                        width={600}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <service.icon className="h-24 w-24 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="w-14 h-14 rounded-xl bg-primary-muted flex items-center justify-center mb-4">
                    <service.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                    {service.name}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  <Button asChild>
                    <Link href="/booking">Book This Service</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Grid */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">
              Additional Treatments
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
              More Ways to Help You
            </h2>
            <p className="text-lg text-slate-600">
              Complementary services to enhance your treatment and recovery.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service, index) => (
              <motion.div
                key={service.slug}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary-muted flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {service.shortDescription}
                    </p>
                    <div className="space-y-1 mb-4">
                      {service.benefits.slice(0, 2).map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-slate-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/booking">Book Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}
