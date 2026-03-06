import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Virtual Assistant Services – Admin, Creative & Growth | Nolojia",
  description:
    "Hire dedicated virtual assistants for admin support, creative content, and business growth. AI-equipped VAs for founders and executives. Start this week — no contracts.",
  keywords: [
    "virtual assistant services",
    "hire virtual assistant",
    "admin support services",
    "creative support services",
    "business growth support",
    "AI virtual assistant",
    "executive assistant services",
    "remote assistant",
  ],
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: `Virtual Assistant Services – Admin, Creative & Growth | ${SITE_NAME}`,
    description:
      "Hire dedicated virtual assistants for admin support, creative content, and business growth. AI-equipped VAs for founders and executives.",
    url: `${SITE_URL}/services`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Virtual Assistant Services – Admin, Creative & Growth | ${SITE_NAME}`,
    description:
      "Hire dedicated virtual assistants for admin support, creative content, and business growth. AI-equipped VAs.",
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
