import {
  Hero,
  Stats,
  About,
  ServicesPreview,
  Treatments,
  Testimonials,
  Contact,
  CTA,
} from "@/components/sections"
import { JsonLd, getLocalBusinessSchema } from "@/lib/seo"

export default function HomePage() {
  return (
    <>
      <JsonLd data={getLocalBusinessSchema()} />
      <Hero />
      <Stats />
      <About />
      <ServicesPreview />
      <Treatments />
      <Testimonials />
      <Contact />
      <CTA />
    </>
  )
}
