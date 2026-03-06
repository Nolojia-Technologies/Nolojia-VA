import type { Metadata } from "next"
import { SITE_URL, SITE_NAME } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Careers – Join Nolojia as a Virtual Assistant",
  description:
    "Join Nolojia's elite network of virtual assistants. Work remotely with world-class founders and executives. Apply for admin, creative, and growth support roles.",
  keywords: [
    "virtual assistant jobs",
    "remote VA jobs",
    "work from home virtual assistant",
    "executive assistant jobs",
    "remote work opportunities",
    "Nolojia careers",
  ],
  alternates: { canonical: `${SITE_URL}/careers` },
  openGraph: {
    title: `Careers – Join Nolojia as a Virtual Assistant`,
    description:
      "Join Nolojia's elite network of virtual assistants. Work remotely with world-class founders and executives.",
    url: `${SITE_URL}/careers`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Careers – Join Nolojia | ${SITE_NAME}`,
    description:
      "Join Nolojia's elite network of virtual assistants. Work remotely with world-class founders.",
  },
}

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
