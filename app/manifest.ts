import type { MetadataRoute } from "next"
import { COMPANY } from "@/lib/content/site"
import { SITE_NAME } from "@/lib/seo/config"

/**
 * Web app manifest.
 *
 * Deliberately minimal. This is a marketing site, not an installable app, so
 * there is no service worker and `display` stays "browser" — declaring
 * "standalone" would invite an install prompt for something that has no
 * offline behaviour to offer.
 *
 * It exists so Android and Windows have a proper name, icon and theme colour
 * when someone pins the site, rather than guessing from the favicon.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — AI Assistants, Automation & Business Systems`,
    short_name: SITE_NAME,
    description: COMPANY.positioning,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#4846c3",
    icons: [
      {
        src: "/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  }
}
