import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SITE_URL, SITE_NAME, SITE_TAGLINE, OG_IMAGE } from "@/lib/seo/config"
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"

/**
 * Inter, self-hosted by next/font. Evaluated against Geist, Manrope and Plus
 * Jakarta Sans and kept: it has the widest weight range, the best numerals for
 * product UI, and it is already wired up with zero network cost.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const DESCRIPTION =
  "Nolojia builds AI assistants and intelligent digital systems that automate the work behind your business — AI employees, automation, connected business systems and human operational support."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    "AI automation for business",
    "AI assistants",
    "AI agents for business",
    "business process automation",
    "workflow automation",
    "custom business systems",
    "AI integration",
    "operational support",
    "Nolojia",
  ],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/images/nolojia-logo.png",
  },
  alternates: { canonical: SITE_URL },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a12" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  )
}
