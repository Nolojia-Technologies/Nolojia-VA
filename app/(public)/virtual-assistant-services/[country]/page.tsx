import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Check, Clock, Globe } from "lucide-react"

import { countryPages, OG_IMAGE, SITE_URL } from "@/lib/seo/config"
import { countryServiceSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"

import { Container, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero } from "@/components/site/sections"
import { CTA } from "@/lib/content/site"

export function generateStaticParams() {
  return countryPages.map((p) => ({ country: p.country }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const page = countryPages.find((p) => p.country === country)
  if (!page) return {}

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}/virtual-assistant-services-${page.country}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/virtual-assistant-services-${page.country}`,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [OG_IMAGE.url],
    },
  }
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const page = countryPages.find((p) => p.country === country)
  if (!page) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: page.name, href: `/virtual-assistant-services-${page.country}` },
  ]

  return (
    <>
      <JsonLd data={countryServiceSchema(page)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={`${page.name} · Remote support`}
        title={page.headline}
        description={page.subheadline}
        crumbs={crumbs}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <Pill>
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            {page.timezone}
          </Pill>
          <Pill>
            <Globe aria-hidden="true" className="h-3.5 w-3.5" />
            Billed in {page.currency}
          </Pill>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      <Section>
        <Container size="narrow">
          <div className="space-y-5">
            {page.intro.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Market context"
                title={`Working with teams in ${page.name}.`}
              />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {page.marketContext}
              </p>
              <div className="mt-8">
                <CtaLink href={CTA.secondary.href} variant="secondary">
                  {CTA.secondary.label}
                </CtaLink>
              </div>
            </div>

            <ul className="space-y-3">
              {page.benefits.map((benefit, i) => (
                <Reveal as="li" key={benefit} delay={i * 0.05}>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <p className="text-[0.9375rem] leading-relaxed text-foreground/85">{benefit}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow={page.name}
        title={`Working with a team in ${page.name}?`}
        description="Tell us what your operation looks like and which hours you need covered. We will tell you honestly what we can support."
      />
    </>
  )
}
