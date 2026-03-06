import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Contact Nolojia – Get in Touch or Book a Discovery Call",
  description:
    "Contact Nolojia to ask about virtual assistant services, book a free discovery call, or get answers to your questions. We respond within one business day.",
  keywords: [
    "contact Nolojia",
    "hire virtual assistant",
    "book virtual assistant",
    "virtual assistant inquiry",
    "executive assistant contact",
  ],
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact Nolojia – Book a Free Discovery Call`,
    description:
      "Contact Nolojia to ask about virtual assistant services or book a free discovery call. We respond within one business day.",
    url: `${SITE_URL}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact Nolojia – Book a Free Discovery Call`,
    description:
      "Contact Nolojia to ask about virtual assistant services or book a free discovery call.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
