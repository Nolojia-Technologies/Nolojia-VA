/**
 * Single source of truth for company facts used across the marketing site.
 * Everything here must be verifiable — no invented clients, metrics or claims.
 */

export const COMPANY = {
  name: "Nolojia",
  legalName: "Nolojia Limited",
  foundingYear: "2023",
  positioning:
    "Nolojia builds AI assistants, intelligent automation and digital business systems that help companies operate more efficiently.",
  shortDescription:
    "AI assistants, automation and business systems that take repetitive work off your team.",
  email: "info@nolojia.com",
  supportEmail: "support@nolojia.com",
  phone: "+254 793 903930",
  phoneHref: "tel:+254793903930",
  hours: "Mon–Fri, 9:00–18:00 EAT",
} as const

/** Only accounts we can point at. Nothing invented. */
export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/93209134/" },
] as const

export const FOUNDER = {
  name: "Shaun Daniel Machua",
  role: "Founder & CEO",
  image: "/images/founder-shaun.jpg",
  linkedin: "https://www.linkedin.com/in/shaun-daniel-machua-44a528216",
} as const

/** The four things Nolojia sells. Used by nav, footer, cards and schema. */
export const PILLARS = [
  { label: "AI Employees", href: "/solutions/ai-employees" },
  { label: "AI Automation", href: "/solutions/automation" },
  { label: "Business Systems", href: "/solutions/business-systems" },
  { label: "Human + AI Support", href: "/solutions/human-ai" },
] as const

/** Consistent CTA hierarchy across the entire site. */
export const CTA = {
  primary: { label: "Build My AI System", href: "/contact" },
  secondary: { label: "Talk to Nolojia", href: "/contact#form" },
  explore: { label: "Explore Solutions", href: "/solutions" },
} as const
