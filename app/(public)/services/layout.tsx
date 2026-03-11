import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Virtual Assistant & Remote Team Services – Admin, Creative, Growth & Digital | Nolojia",
  description:
    "Hire dedicated virtual assistants and remote professionals for admin support, creative content, business growth, web development, digital marketing, UI/UX, and financial analysis. AI-powered teams for founders and executives. Start this week — no contracts.",
  keywords: [
    "virtual assistant services",
    "hire virtual assistant",
    "remote teams",
    "AI assistants",
    "business operations support",
    "customer support outsourcing",
    "digital operations",
    "admin support services",
    "creative support services",
    "business growth support",
    "AI virtual assistant",
    "executive assistant services",
    "remote assistant",
    "web design and development",
    "digital marketing services",
    "UI UX design services",
    "financial analyst support",
    "social media management",
    "graphic design services",
    "specialised business support",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `Virtual Assistant & Remote Team Services – Admin, Creative, Growth & Digital | ${SITE_NAME}`,
    description:
      "Hire dedicated virtual assistants and remote professionals for admin support, creative content, business growth, web development, digital marketing, and more. AI-powered teams for founders and executives.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Virtual Assistant & Remote Team Services | ${SITE_NAME}`,
    description:
      "AI-powered virtual assistants and remote professionals for every business function. Hire VAs, designers, developers, marketers, and more — no contracts.",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
