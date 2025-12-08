import { Metadata } from "next"
import { BookingPage } from "./booking-page"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Book Your Session",
  description: `Book your sports massage, bodywork therapy, or posture coaching session with ${siteConfig.owner} in ${siteConfig.address.city}, ${siteConfig.address.region}. Easy online booking available.`,
  keywords: [
    "book sports massage",
    "book bodywork therapy",
    "massage appointment Downpatrick",
    "posture coaching booking",
    "sports massage near me",
  ],
  alternates: {
    canonical: `${siteConfig.url}/booking`,
  },
  openGraph: {
    title: "Book Your Session | Vince Sports Massage",
    description: `Ready to feel better? Book your appointment with ${siteConfig.owner} today. Online booking available for sports massage, posture correction, and more.`,
    url: `${siteConfig.url}/booking`,
    type: "website",
  },
}

export default function Page() {
  return <BookingPage />
}
