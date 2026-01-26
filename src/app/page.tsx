import {
  Hero,
  TrustBar,
  Stats,
  About,
  ServicesPreview,
  Pricing,
  Treatments,
  Testimonials,
  FAQ,
  Contact,
  CTA,
} from "@/components/sections"
import { ScrollProgress } from "@/components/common/scroll-progress"
import { JsonLd, getLocalBusinessSchema } from "@/lib/seo"

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <JsonLd data={getLocalBusinessSchema()} />
      <Hero />
      <TrustBar />
      <Stats />
      <About />
      <ServicesPreview />
      <Pricing />
      <Treatments />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
    </>
  )
}
