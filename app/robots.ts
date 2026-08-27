import { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo/config"

/**
 * robots.txt
 *
 * One permissive rule for everyone. AI crawlers are deliberately not singled
 * out: being readable by answer engines is the point, and a wildcard already
 * covers them — an explicit allow-list would only go stale as new agents
 * appear.
 *
 * The disallows are the genuinely non-public surfaces. Nothing that affects
 * rendering is blocked: CSS, JS, fonts and images all live under /_next/static
 * and stay crawlable, because blocking them makes Google render the site
 * without styles and judge it accordingly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/", // Cloudflare Access sits in front of this anyway
          "/api/", // form intake and route handlers, no indexable content
          "/_next/data/", // RSC payloads; the HTML they belong to is crawlable
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
