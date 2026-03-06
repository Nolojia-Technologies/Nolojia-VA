import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Client Success Stories – Virtual Assistant Results | Nolojia",
  description:
    "See how founders and executives reclaimed 20+ hours per week with Nolojia virtual assistants. Real results from real clients across the US, UK, Canada, and Australia.",
  keywords: [
    "virtual assistant success stories",
    "VA results",
    "hire virtual assistant testimonials",
    "executive assistant reviews",
    "Nolojia client results",
    "VA case studies",
  ],
  alternates: { canonical: `${SITE_URL}/success-stories` },
  openGraph: {
    title: `Client Success Stories – Virtual Assistant Results | ${SITE_NAME}`,
    description:
      "See how founders and executives reclaimed 20+ hours per week with Nolojia virtual assistants.",
    url: `${SITE_URL}/success-stories`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Client Success Stories – Virtual Assistant Results | ${SITE_NAME}`,
    description:
      "See how founders and executives reclaimed 20+ hours per week with Nolojia virtual assistants.",
  },
}

export default function SuccessStoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
