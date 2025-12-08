import { Metadata } from "next"
import { PosturePrimePage } from "./postureprime-page"
import { siteConfig } from "@/lib/constants"

export const metadata: Metadata = {
  title: "PosturePrime - Posture Correction Device",
  description: "PosturePrime is designed to alleviate common posture problems, providing pain relief and a daily energy boost. Experience the difference with our innovative device.",
  keywords: [
    "posture correction device",
    "PosturePrime",
    "posture training",
    "back pain relief",
    "neck pain relief",
    "posture improvement",
    "Vertex posture",
  ],
  alternates: {
    canonical: `${siteConfig.url}/postureprime`,
  },
  openGraph: {
    title: "PosturePrime - Unlock Your Best Posture Today",
    description: "PosturePrime is designed to alleviate common posture problems, providing pain relief and a daily energy boost. Therapist approved.",
    url: `${siteConfig.url}/postureprime`,
    type: "website",
  },
}

export default function Page() {
  return <PosturePrimePage />
}
