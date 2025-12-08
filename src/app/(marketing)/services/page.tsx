import { Metadata } from "next"
import { ServicesPage } from "./services-page"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Sports Massage & Bodywork Services in Downpatrick",
  description: `Professional sports massage, posture correction, breathwork coaching, and bodywork therapy services in ${siteConfig.address.city}, ${siteConfig.address.region}. Book your session with ${siteConfig.owner}.`,
  keywords: [
    "sports massage Downpatrick",
    "bodywork therapy Northern Ireland",
    "posture correction",
    "trigger point therapy",
    "cupping therapy",
    "mobility coaching",
    "breathwork coaching",
    "recovery boots",
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: "Sports Massage & Bodywork Services | Vince Sports Massage",
    description: `Professional sports massage and bodywork therapy services in ${siteConfig.address.region}. Expert treatment for pain relief, injury recovery, and performance enhancement.`,
    url: `${siteConfig.url}/services`,
    type: "website",
  },
}

export default function Page() {
  return <ServicesPage />
}
