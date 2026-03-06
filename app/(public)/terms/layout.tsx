import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Terms of Service | Nolojia",
  description:
    "Nolojia's Terms of Service — the rules governing use of our website and virtual assistant services. Read before engaging our services.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: true, follow: false },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
