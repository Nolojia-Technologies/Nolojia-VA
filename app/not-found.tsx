import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { Container, Section } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { PILLARS } from "@/lib/content/site"
import { PRODUCTS } from "@/lib/content/products"

/**
 * 404.
 *
 * Next's default is a bare line of text with no way out, which turns every
 * mistyped or retired URL into a dead end. This one names what happened and
 * offers the routes someone was most likely heading for.
 *
 * noindex because a 404 should never be indexed, and `follow` so the links out
 * of it still pass a crawler back into the real site.
 */
export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist. Here are the main sections of the Nolojia site.",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section className="pt-24 sm:pt-32">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          The link may be out of date, or the address may have a typo in it. Everything
          below still works.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink href="/">Go to the homepage</CtaLink>
          <CtaLink href="/contact" variant="secondary">
            Contact Nolojia
          </CtaLink>
        </div>

        <nav aria-label="Main sections" className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Solutions
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PILLARS.map((pillar) => (
              <li key={pillar.href}>
                <Link
                  href={pillar.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/30 hover:text-brand"
                >
                  {pillar.label}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Products
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRODUCTS.map((product) => (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/30 hover:text-brand"
                >
                  <span>
                    {product.name}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {product.statusLabel}
                    </span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Elsewhere
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {[
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Case studies", href: "/case-studies" },
              { label: "Insights", href: "/blog" },
              { label: "FAQ", href: "/faq" },
              { label: "Careers", href: "/careers" },
              { label: "Security", href: "/security" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </Section>
  )
}
