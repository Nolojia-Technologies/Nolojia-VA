import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Book a Free Discovery Call – Virtual Assistant Services | Nolojia",
  description:
    "Book your free 30-minute discovery call with Nolojia. No pitch, no pressure — just an honest conversation about your business needs and how we can help.",
  keywords: [
    "book virtual assistant",
    "hire virtual assistant",
    "free discovery call",
    "virtual assistant consultation",
    "book executive assistant",
  ],
  alternates: { canonical: `${SITE_URL}/book` },
  openGraph: {
    title: `Book a Free Discovery Call | ${SITE_NAME}`,
    description:
      "Book your free 30-minute discovery call with Nolojia. No pitch, no pressure — just an honest conversation.",
    url: `${SITE_URL}/book`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Book a Free Discovery Call | ${SITE_NAME}`,
    description:
      "Book your free 30-minute discovery call with Nolojia. No pitch, no pressure.",
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
