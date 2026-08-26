import type { Metadata } from "next"
import { OG_IMAGE, SITE_NAME, SITE_URL } from "./config"

/**
 * One place that builds title, description, canonical, Open Graph and Twitter
 * metadata so every page is consistent and nothing is forgotten.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  type = "website",
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
  type?: "website" | "article"
}): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  }
}
