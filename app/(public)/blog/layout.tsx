import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Blog – Productivity, Delegation & AI Automation Guides | Nolojia",
  description:
    "Practical guides on delegation, productivity, AI automation, and business operations for founders and executives. Updated weekly by the Nolojia team.",
  keywords: [
    "virtual assistant blog",
    "productivity guides",
    "delegation tips",
    "AI automation guides",
    "business operations tips",
    "founder productivity",
    "executive assistant tips",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: `Blog – Productivity, Delegation & AI Automation Guides | ${SITE_NAME}`,
    description:
      "Practical guides on delegation, productivity, and AI automation for founders and executives.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog – Productivity & Delegation Guides | ${SITE_NAME}`,
    description:
      "Practical guides on delegation, productivity, and AI automation for founders and executives.",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
