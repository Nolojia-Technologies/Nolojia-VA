import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "About Nolojia – AI-Powered Virtual Assistant Company",
  description:
    "Learn how Nolojia matches founders and executives with elite, AI-equipped virtual assistants. Our mission, team, values, and 4-week onboarding guarantee.",
  keywords: [
    "about Nolojia",
    "virtual assistant company",
    "AI virtual assistant agency",
    "executive assistant company",
    "remote staffing agency",
    "VA company",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About Nolojia – AI-Powered Virtual Assistant Company`,
    description:
      "Learn how Nolojia matches founders and executives with elite, AI-equipped virtual assistants. Our mission, team, and 4-week onboarding guarantee.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About Nolojia – AI-Powered Virtual Assistant Company`,
    description:
      "Learn how Nolojia matches founders and executives with elite, AI-equipped virtual assistants.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
