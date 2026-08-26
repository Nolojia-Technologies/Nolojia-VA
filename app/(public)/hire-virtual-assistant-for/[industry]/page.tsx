import { notFound } from "next/navigation"
import { Metadata } from "next"
import { AlertCircle, Check, Zap } from "lucide-react"

import { industryPages, OG_IMAGE, SITE_URL } from "@/lib/seo/config"
import { industryServiceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { Faq } from "@/components/site/faq"
import { CtaSection, PageHero } from "@/components/site/sections"
import { CTA } from "@/lib/content/site"

export function generateStaticParams() {
  return industryPages.map((p) => ({ industry: p.industry }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>
}): Promise<Metadata> {
  const { industry } = await params
  const page = industryPages.find((p) => p.industry === industry)
  if (!page) return {}

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}/hire-virtual-assistant-for-${page.industry}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/hire-virtual-assistant-for-${page.industry}`,
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

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry } = await params
  const page = industryPages.find((p) => p.industry === industry)
  if (!page) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: page.name, href: `/hire-virtual-assistant-for-${page.industry}` },
  ]

  return (
    <>
      <JsonLd data={industryServiceSchema(page)} />
      <JsonLd data={faqSchema(page.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow={`${page.name} operations`}
        title={page.headline}
        description={page.subheadline}
        crumbs={crumbs}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      {/* Intro */}
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

      {/* Pain points */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="The problem"
            title={`Where ${page.name.toLowerCase()} operations break down.`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.painPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-warning-soft text-warning">
                    <AlertCircle aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tasks */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Scope"
                title="What we take on."
                description={`The work we handle for ${page.name.toLowerCase()} — through AI, automation, a person, or a combination.`}
              />
              <div className="mt-8">
                <CtaLink href={CTA.secondary.href} variant="secondary">
                  {CTA.secondary.label}
                </CtaLink>
              </div>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {page.tasks.map((task) => (
                <li
                  key={task}
                  className="flex items-start gap-2.5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/85"
                >
                  <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Automations */}
      {page.automations.length > 0 ? (
        <Section tone="ink" className="overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
          <Container className="relative">
            <SectionHeading
              onInk
              align="center"
              eyebrow="Automation"
              title={`Workflows we build for ${page.name.toLowerCase()}.`}
              description="Beyond manual execution: processes rebuilt so they run on their own, with a person approving anything that commits you."
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2">
              {page.automations.map((automation) => (
                <li
                  key={automation}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <Zap aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-sm leading-relaxed text-white/75">{automation}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title={`Questions from ${page.name.toLowerCase()} clients.`}
          />
          <Faq items={page.faqs} className="mt-10" idPrefix={`industry-${page.industry}`} />
        </Container>
      </Section>

      <CtaSection
        eyebrow={page.name}
        title={`Ready to fix ${page.name.toLowerCase()} operations?`}
        description="Tell us what your week actually looks like. We will show you which parts belong to a system rather than a person."
      />
    </>
  )
}
