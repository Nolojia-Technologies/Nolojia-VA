import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "AI-Powered Remote Business Services – Virtual Assistants, Creative, Web, Marketing & Financial Support | Nolojia",
  description:
    "Nolojia helps businesses scale operations through AI-powered virtual teams and specialized remote professionals. Virtual assistants, creative design, web development, digital marketing, financial analysis, and specialized business support — all under one roof. No contracts. Start this week.",
  keywords: [
    // Primary keywords
    "virtual assistant services",
    "AI-powered operations",
    "remote business support",
    "outsourced business services",
    "remote teams",
    "hire virtual assistant",
    // Service category keywords
    "creative design services",
    "motion graphics services",
    "UI UX design services",
    "web development services",
    "digital marketing support",
    "financial analysis services",
    "business intelligence services",
    // Secondary keywords
    "social media management",
    "graphic design services",
    "content creation services",
    "SEO services",
    "paid advertising management",
    "CRM management",
    "project management support",
    "operations support",
    // Positioning keywords
    "AI virtual assistant",
    "executive assistant services",
    "remote assistant",
    "outsourced operations",
    "remote professional services",
    "scalable business support",
    "global virtual teams",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `AI-Powered Remote Business Services – Virtual Assistants, Creative, Web, Marketing & More | ${SITE_NAME}`,
    description:
      "Scale your business with Nolojia's AI-powered remote teams. Virtual assistants, creative design, web development, digital marketing, financial analysis, and specialized support — 6 service categories, one trusted partner.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `AI-Powered Remote Business Operations | ${SITE_NAME}`,
    description:
      "Virtual assistants, creative design, web development, digital marketing, financial analysis, and specialized business support. AI-powered teams, no contracts, start this week.",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
