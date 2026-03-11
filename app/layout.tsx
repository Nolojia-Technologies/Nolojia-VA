import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SITE_URL, SITE_NAME, SITE_TAGLINE, DEFAULT_OG_IMAGE } from "@/lib/seo/config"
import { organizationSchema, websiteSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Hire dedicated virtual assistants for admin, creative, and growth support. Nolojia's AI-equipped VAs help founders and executives reclaim 20+ hours a week. No contracts. Start this week.",
  keywords: [
    "virtual assistant services",
    "hire virtual assistant",
    "AI virtual assistant",
    "executive assistant",
    "admin support",
    "business operations support",
    "remote virtual assistant",
    "Nolojia",
  ],
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
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description:
      "Hire dedicated virtual assistants for admin, creative, and growth support. AI-equipped VAs. No contracts. Start this week.",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} – ${SITE_TAGLINE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@nolojia",
    creator: "@nolojia",
    title: `${SITE_NAME} – ${SITE_TAGLINE}`,
    description:
      "Hire dedicated virtual assistants for admin, creative, and growth support. AI-equipped VAs. No contracts. Start this week.",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/images/nolojia-logo.png",
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add Google Search Console verification token here when ready:
    // google: "your-verification-token",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to key domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.variable}>
        {/* Sitewide JSON-LD: Organization + Website schemas */}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        {children}
      </body>
    </html>
  )
}
