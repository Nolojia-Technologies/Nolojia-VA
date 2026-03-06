import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"

export const metadata: Metadata = {
  title: "Privacy Policy | Nolojia",
  description:
    "Nolojia's Privacy Policy — how we collect, use, and protect your personal data. We take privacy seriously. Read our full policy here.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: false },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
