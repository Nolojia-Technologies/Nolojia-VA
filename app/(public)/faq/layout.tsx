import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Virtual Assistant FAQ – Pricing, Onboarding & How It Works | Nolojia",
  description:
    "Answers to the most common questions about hiring a Nolojia virtual assistant — pricing, onboarding, how matching works, security, and more.",
  keywords: [
    "virtual assistant FAQ",
    "hire virtual assistant questions",
    "VA pricing",
    "virtual assistant onboarding",
    "how virtual assistant works",
    "executive assistant FAQ",
  ],
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: `Virtual Assistant FAQ – Pricing, Onboarding & How It Works | ${SITE_NAME}`,
    description:
      "Answers to the most common questions about hiring a Nolojia virtual assistant — pricing, onboarding, and more.",
    url: `${SITE_URL}/faq`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Virtual Assistant FAQ | ${SITE_NAME}`,
    description:
      "Answers to the most common questions about hiring a Nolojia virtual assistant.",
  },
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
