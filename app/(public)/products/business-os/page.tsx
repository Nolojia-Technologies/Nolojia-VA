import { notFound } from "next/navigation"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { BusinessOsVisual } from "@/components/site/product-visuals"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { BUSINESS_OS, getProduct } from "@/lib/content/products"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Nolojia Business OS",
  description:
    "Nolojia Business OS: point of sale and school software with an offline till, M-Pesa prompts and paybill, stock, suppliers, fees, attendance and report cards.",
  path: "/products/business-os",
  keywords: [
    "POS software Kenya",
    "M-Pesa POS",
    "school management system Kenya",
    "school fees M-Pesa",
    "retail point of sale",
  ],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Business OS", href: "/products/business-os" },
]

const SYSTEMS = [
  {
    title: "Nolojia POS",
    body: "For shops, pharmacies, hardware stores, salons, cafés and wholesalers. Sell at the till, keep stock and suppliers straight, and see what the business made.",
  },
  {
    title: "Nolojia Schools",
    body: "For schools. Students and classes, fees and statements, M-Pesa fee payments matched to admission numbers, attendance, exams, report cards and texts to parents.",
  },
]

export default function BusinessOsPage() {
  const product = getProduct("business-os")
  if (!product) notFound()

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={softwareApplicationSchema({
          name: product.name,
          description: product.summary,
          path: "/products/business-os",
          category: "BusinessApplication",
          platforms: product.platforms,
        })}
      />

      <PageHero
        eyebrow="Product · Live"
        title="The system a shop or a school runs on."
        description={`${product.summary} Business OS is one of the products Nolojia builds.`}
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={BUSINESS_OS.url} external>
            Visit os.nolojia.com
          </CtaLink>
          <CtaLink href={BUSINESS_OS.askForAccount} variant="secondary" external>
            Ask for an account
          </CtaLink>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{product.maturityNote}</p>
      </PageHero>

      <Section>
        <Container>
          <BusinessOsVisual className="mx-auto max-w-3xl" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            Illustration of the till. The items and amounts are examples.
          </p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Two systems, one platform"
            title="Built for the business in front of you."
            description="Each business gets the system it needs, on the same accounts, security and M-Pesa connection."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {SYSTEMS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-border bg-card p-7">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="What it does today" title="Everything here is live." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {product.features.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-mono text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Get an account"
        title="Tell us about your business."
        description="Say which system you need and what kind of business it is. We open the account and send you the sign-in details."
        primary={{ label: "Ask for an account", href: BUSINESS_OS.askForAccount, external: true }}
        note="Already have an account? Sign in at os.nolojia.com."
      />
    </>
  )
}
