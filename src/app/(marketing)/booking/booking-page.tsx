"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, CheckCircle, Check } from "lucide-react"
import { siteConfig, pricing } from "@/lib/constants"

const benefits = [
  "Personalised treatment tailored to your needs",
  "Expert assessment and diagnosis",
  "Evidence-based techniques",
  "Flexible scheduling to suit you",
]

const whatToExpect = [
  {
    title: "Initial Consultation",
    description: "We'll discuss your health history, current concerns, and goals to create a personalised treatment plan.",
  },
  {
    title: "Assessment",
    description: "A thorough physical assessment to identify the root causes of your issues and determine the best approach.",
  },
  {
    title: "Treatment",
    description: "Hands-on therapy using the most appropriate techniques for your specific needs.",
  },
  {
    title: "Aftercare",
    description: "You'll receive guidance on exercises, stretches, and lifestyle adjustments to maintain your progress.",
  },
]

export function BookingPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-slate-800 text-white py-16 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-cyan-200 font-semibold text-sm uppercase tracking-wide">
              Transform Your Health Today
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Book Your Session
            </h1>
            <p className="text-lg text-cyan-100 mb-4">
              Ready to experience the benefits of personalised bodywork therapy or posture
              coaching? Book your session now and take the first step towards a healthier,
              more aligned you. Our expert {siteConfig.owner} is here to guide you.
            </p>
            <p className="text-xl font-semibold text-white">
              Bodywork therapy, Breathwork, Rehabilitation & Posture Consultation
            </p>
            <p className="text-cyan-200 mt-2">
              Available In-Person and Online
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Session Pricing
            </h2>
            <p className="text-slate-600">
              Transparent pricing with no hidden fees
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className={`h-full ${'popular' in plan && plan.popular ? 'border-2 border-cyan-500' : ''}`}>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-3xl font-bold text-slate-900">£{plan.price}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{plan.description}</p>
                    {'savings' in plan && plan.savings && (
                      <p className="text-xs font-semibold text-green-600 mb-2">{plan.savings}</p>
                    )}
                    {'features' in plan && plan.features && (
                      <ul className="space-y-1">
                        {plan.features.slice(0, 2).map((feature, i) => (
                          <li key={i} className="flex items-start text-xs">
                            <Check className="h-3 w-3 text-cyan-600 mr-1 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              What to Expect
            </h2>
            <p className="text-slate-600">
              Your first session is designed to understand your needs and create
              a personalised treatment plan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {whatToExpect.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mb-3 text-sm">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Calendly Embed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-slate-50 p-6 border-b">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">With</p>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {siteConfig.owner}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Sports Massage & Bodywork Consultation
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Calendly Widget - Responsive */}
                  <div className="min-h-[600px] md:min-h-[650px]">
                    <iframe
                      src={`${siteConfig.calendly}?hide_gdpr_banner=1&background_color=ffffff&text_color=1e293b&primary_color=0891b2`}
                      width="100%"
                      height="650"
                      frameBorder="0"
                      title="Schedule Appointment"
                      className="w-full h-[600px] md:h-[650px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Benefits */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Why Book With Us
                  </h3>
                  <div className="space-y-3">
                    {benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Phone</p>
                        <a
                          href={siteConfig.phoneHref}
                          className="font-medium text-slate-900 hover:text-cyan-600"
                        >
                          {siteConfig.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="font-medium text-slate-900 hover:text-cyan-600"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Location</p>
                        <address className="font-medium text-slate-900 not-italic">
                          {siteConfig.address.street}<br />
                          {siteConfig.address.city}, {siteConfig.address.postcode}
                        </address>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">Hours</p>
                        <p className="font-medium text-slate-900">
                          Mon - Sat: 11am - 6pm
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative h-[400px] bg-gradient-to-br from-cyan-600 via-slate-700 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Our Complementary Bodywork and Posture Coaching Services
            </h2>
            <p className="text-lg text-slate-300">
              We offer a range of specialised services designed to address your unique needs.
              From personalised bodywork therapy sessions to comprehensive posture coaching
              programmes, our goal is to help you achieve optimal health and well-being.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Book Your Appointment Today
            </h2>
            <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
              Easily schedule your bodywork or posture coaching session with our user-friendly
              calendar. Choose your preferred date and time to get started.
            </p>
            <a
              href="#top"
              className="inline-flex items-center justify-center h-12 px-8 bg-white text-cyan-700 font-semibold rounded-lg hover:bg-cyan-50 transition-colors"
            >
              Schedule Now
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
