// Site configuration
export const siteConfig = {
  name: "Vince Sports Massage",
  fullName: "Vince | Sports Massage, Bodywork Therapist & Posture Specialist",
  description: "Helping you move better, feel better, and stay pain-free through expert bodywork and posture care in Northern Ireland.",
  url: "https://vincesportsmassage.com",
  ogImage: "https://vincesportsmassage.com/og.jpg",
  owner: "Vince McDowell",

  // Contact
  phone: "07709 839734",
  phoneHref: "tel:+447709839734",
  email: "vince4fitness@gmail.com",

  // Location
  address: {
    street: "79 Woodgrange Rd",
    city: "Downpatrick",
    postcode: "BT30 8JH",
    region: "Northern Ireland",
    country: "GB",
  },

  // Coordinates (approximate for Downpatrick)
  geo: {
    latitude: 54.3285,
    longitude: -5.7137,
  },

  // Hours
  hours: {
    monday: "11:00-18:00",
    tuesday: "11:00-18:00",
    wednesday: "11:00-18:00",
    thursday: "11:00-18:00",
    friday: "11:00-18:00",
    saturday: "11:00-18:00",
    sunday: "Closed",
  },
  openingHoursSpecification: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "11:00", closes: "18:00" },
  ],

  // Social & External
  calendly: "https://calendly.com/vince4fitness",
  googleBusiness: "https://share.google/Sx39PAH6fBo6YtV5x",
  googleReviews: {
    rating: 5.0,
    count: 62,
  },

  // Social media (add when available)
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  },
} as const

// Navigation links
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Your Session" },
  { href: "/postureprime", label: "PosturePrime" },
  { href: "/blog", label: "Blog" },
] as const

// Services data
export const services = [
  {
    slug: "therapeutic-bodywork",
    name: "Therapeutic Bodywork",
    shortDescription: "Comprehensive hands-on therapy to address pain, tension, and mobility issues.",
    icon: "Hands",
  },
  {
    slug: "posture-correction",
    name: "Posture Correction",
    shortDescription: "Realign your body and fix postural imbalances for lasting relief.",
    icon: "User",
  },
  {
    slug: "breathwork-coaching",
    name: "Breathwork Coaching",
    shortDescription: "Optimize your breathing patterns for better performance and recovery.",
    icon: "Wind",
  },
  {
    slug: "remediation",
    name: "Remediation",
    shortDescription: "Targeted treatment plans for injury recovery and rehabilitation.",
    icon: "Activity",
  },
  {
    slug: "mobility-coaching",
    name: "Mobility Coaching",
    shortDescription: "Improve your range of motion and movement quality.",
    icon: "Move",
  },
  {
    slug: "fascia-coaching",
    name: "Fascia Coaching",
    shortDescription: "Release fascial restrictions for improved flexibility and reduced pain.",
    icon: "Layers",
  },
  {
    slug: "sports-massage",
    name: "Sports Massage",
    shortDescription: "Deep tissue work for athletes and active individuals.",
    icon: "Dumbbell",
  },
  {
    slug: "trigger-point-therapy",
    name: "Trigger Point Therapy",
    shortDescription: "Release stubborn knots and muscle tension points.",
    icon: "Target",
  },
  {
    slug: "passive-arom",
    name: "Passive AROM",
    shortDescription: "Assisted range of motion techniques for flexibility and recovery.",
    icon: "RotateCcw",
  },
  {
    slug: "recovery-boots",
    name: "Recovery Boots",
    shortDescription: "Compression therapy for enhanced circulation and faster recovery.",
    icon: "Zap",
  },
  {
    slug: "cupping-therapy",
    name: "Cupping Therapy",
    shortDescription: "Traditional therapy for muscle release and blood flow improvement.",
    icon: "Circle",
  },
  {
    slug: "diet-nutrition",
    name: "Diet & Nutrition",
    shortDescription: "Nutritional guidance to support your health and recovery goals.",
    icon: "Apple",
  },
] as const

// Stats for homepage
export const stats = [
  { value: "500+", label: "Clients Helped" },
  { value: "10+", label: "Years Experience" },
  { value: "5.0", label: "Google Rating" },
  { value: "62", label: "Reviews" },
] as const

// Brand colors
export const colors = {
  primary: "#0891b2", // Cyan/teal blue from the site
  primaryDark: "#0e7490",
  secondary: "#1e3a5f", // Dark navy
  accent: "#06b6d4",
  background: "#ffffff",
  foreground: "#0f172a",
} as const
