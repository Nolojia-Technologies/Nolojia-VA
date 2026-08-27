import type { Metadata } from "next"
import { OG_IMAGE, SITE_NAME, SITE_URL } from "./config"

/**
 * One place that builds title, description, canonical, Open Graph and Twitter
 * metadata so every page is consistent and nothing is forgotten.
 *
 * Every page goes through here. Pages that built the same object by hand were
 * how the site ended up with 28 URLs missing og:site_name and og:locale — the
 * omission is invisible on the page and only shows up when something tries to
 * render a share card. Anything a page genuinely needs beyond this (an article
 * date, a custom share image) is an argument here, not a reason to fork.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  type = "website",
  image,
  article,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  noIndex?: boolean
  type?: "website" | "article"
  /** Overrides the default share card. Used where a page has its own artwork. */
  image?: { url: string; width?: number; height?: number; alt?: string }
  /** Article-only Open Graph fields. Implies type: "article". */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }
}): Metadata {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${SITE_NAME}`

  const ogImage = image
    ? { url: image.url, width: image.width ?? 1200, height: image.height ?? 630, alt: image.alt ?? fullTitle }
    : OG_IMAGE

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: article ? "article" : type,
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      locale: "en_US",
      images: [ogImage],
      ...(article ?? {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  }
}
