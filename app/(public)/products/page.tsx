import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { ProductCard } from "@/components/site/product-card"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { PRODUCTS } from "@/lib/content/products"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Products",
  description:
    "Technology built by Nolojia: PageMarks, a live browser extension for keeping notes and reading position on any page, and AI Architecture, an AI-assisted architectural design platform in development.",
  path: "/products",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
]

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Products"
        title="Technology built by Nolojia."
        description="We do not only implement technology for other businesses. We build products that solve real operational problems — including our own."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.secondary.href}>{CTA.secondary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="space-y-6">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="More products"
            title="More is in progress."
            description="We build in the open with the businesses we work with. When something is ready to use, it goes on this page — and not before."
          />
          <div className="mt-8 flex justify-center">
            <CtaLink href="/contact" variant="secondary">
              Tell us what you would use
            </CtaLink>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
