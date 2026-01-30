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
    slug: "sports-massage",
    name: "Sports Massage",
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
    slug: "rehabilitation",
    name: "Rehabilitation",
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
    slug: "deep-tissue-massage",
    name: "Deep Tissue Massage",
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
  { value: "250+", label: "Sessions Conducted" },
  { value: "50+", label: "Certifications" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "6 Days", label: "Weekly Availability" },
] as const

// Pricing for services
export const pricing = [
  {
    name: "Sports Massage & Bodywork",
    duration: "60 minutes",
    price: 55,
    description: "Personalized session tailored to your needs",
    features: [
      "Hands-on treatment",
      "Posture assessment",
      "Breathwork coaching",
      "Rehabilitation guidance"
    ],
    popular: true,
    slug: "sports-massage-bodywork"
  },
  {
    name: "Extended Session",
    duration: "90 minutes",
    price: 80,
    description: "Deep work for chronic issues",
    features: [
      "Extended treatment time",
      "Comprehensive assessment",
      "Multiple techniques"
    ],
    slug: "extended-session"
  },
  {
    name: "3-Session Package",
    duration: "60 minutes each",
    price: 150,
    savings: "Save £15",
    description: "Ideal for ongoing recovery",
    features: [
      "3 x 60-minute sessions",
      "Flexible scheduling",
      "Progress tracking"
    ],
    slug: "package-3"
  },
  {
    name: "5-Session Package",
    duration: "60 minutes each",
    price: 240,
    savings: "Save £35",
    description: "Best value for committed recovery",
    features: [
      "5 x 60-minute sessions",
      "Priority booking",
      "Personalized program"
    ],
    slug: "package-5"
  }
] as const

// FAQ data
export const faqs = [
  {
    question: "How much does a session cost?",
    answer: "A standard 60-minute Sports Massage & Bodywork session is £55. I also offer 90-minute extended sessions for £80, and package deals for ongoing treatment (3 sessions for £150 or 5 sessions for £240).",
    category: "pricing"
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Just bring yourself and any relevant medical information. Wear comfortable clothing that allows easy movement. I provide everything else including towels and treatment equipment.",
    category: "preparation"
  },
  {
    question: "What's your cancellation policy?",
    answer: "I require 24 hours notice for cancellations or rescheduling. Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee.",
    category: "booking"
  },
  {
    question: "How long is a typical session?",
    answer: "Standard sessions are 60 minutes, which includes assessment and treatment. Extended sessions are 90 minutes for more comprehensive work on chronic issues.",
    category: "session"
  },
  {
    question: "How many sessions will I need?",
    answer: "It depends on your individual needs. Some clients see improvement after one session, while chronic issues may require 4-6 sessions. During your first appointment, I'll assess your condition and recommend a personalized treatment plan.",
    category: "treatment"
  },
  {
    question: "Do I need to undress?",
    answer: "You'll be draped with towels throughout the session, and only the area being worked on will be exposed. Many clients choose to undress to their comfort level - shorts and sports bra work well. Your comfort and privacy are my priority.",
    category: "session"
  },
  {
    question: "What if I have an injury or medical condition?",
    answer: "Please let me know about any injuries, medical conditions, or concerns before your session. I'm trained to adapt treatments for various conditions, but some conditions may require medical clearance first.",
    category: "medical"
  },
  {
    question: "What payment methods do you accept?",
    answer: "I accept cash, card payments (Visa, Mastercard), and bank transfers. Payment is due at the time of service.",
    category: "payment"
  },
  {
    question: "Where are you located?",
    answer: "I'm located at 79 Woodgrange Road, Downpatrick, BT30 8JH, Northern Ireland. There's free parking available nearby.",
    category: "location"
  },
  {
    question: "Do you offer mobile/home visits?",
    answer: "Currently all sessions are at my treatment space in Downpatrick. This allows me to use specialized equipment and provides the best treatment environment.",
    category: "location"
  }
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
