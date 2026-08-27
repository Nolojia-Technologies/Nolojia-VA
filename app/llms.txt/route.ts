import { COMPANY } from "@/lib/content/site"
import { PILLAR_DETAILS } from "@/lib/content/solutions"
import { PRODUCTS } from "@/lib/content/products"
import { servicePages, SITE_URL } from "@/lib/seo/config"

/**
 * /llms.txt — a machine-readable summary of what Nolojia is and where the
 * substantive pages are.
 *
 * Generated from the same content modules the pages render, rather than
 * hand-written, so it cannot drift: rename a solution or ship a product and
 * this file follows. It is a navigation aid, not a substitute for the HTML —
 * every claim here is also stated on a real page with structured data.
 *
 * Cached for a day; the inputs are build-time constants.
 */
export const revalidate = 86400

export async function GET() {
  const lines: string[] = []
  const push = (...l: string[]) => lines.push(...l)

  push(
    `# ${COMPANY.name}`,
    "",
    `> ${COMPANY.positioning}`,
    "",
    `${COMPANY.name} (legal name ${COMPANY.legalName}) is an AI technology and`,
    "business automation company. It designs and builds AI assistants,",
    "intelligent workflows and connected digital business systems, and develops",
    "its own software products.",
    "",
    `Website: ${SITE_URL}`,
    `Contact: ${COMPANY.email}`,
    `Founded: ${COMPANY.foundingYear}`,
    ""
  )

  push("## Solutions", "")
  for (const p of PILLAR_DETAILS) {
    push(`- [${p.title}](${SITE_URL}${p.href}): ${p.description}`)
  }
  push("")

  push("## Products", "")
  for (const p of PRODUCTS) {
    push(`- [${p.name}](${SITE_URL}/products/${p.slug}) — ${p.statusLabel}: ${p.tagline}`)
  }
  push("")

  push("## Services", "")
  for (const s of servicePages) {
    push(`- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.metaDescription}`)
  }
  push("")

  push(
    "## Key pages",
    "",
    `- [Solutions overview](${SITE_URL}/solutions)`,
    `- [Products overview](${SITE_URL}/products)`,
    `- [Services overview](${SITE_URL}/services)`,
    `- [About](${SITE_URL}/about): who Nolojia is and how it works`,
    `- [FAQ](${SITE_URL}/faq): direct answers to common questions`,
    `- [Case studies](${SITE_URL}/case-studies)`,
    `- [Insights](${SITE_URL}/blog): articles on AI automation and business systems`,
    `- [Security](${SITE_URL}/security): how business information is handled`,
    `- [Contact](${SITE_URL}/contact)`,
    "",
    "## Notes",
    "",
    "- Nolojia serves clients internationally and is headquartered in Kenya.",
    "- Claims on this site are limited to what Nolojia can substantiate. Where a",
    "  product is not yet publicly available it is labelled as in development.",
    `- Full page list: ${SITE_URL}/sitemap.xml`,
    ""
  )

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
