import { notFound } from "next/navigation"
import { Metadata } from "next"
import { Check } from "lucide-react"

import { servicePages } from "@/lib/seo/config"
import { pageMetadata } from "@/lib/seo/metadata"
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { Faq } from "@/components/site/faq"
import { CtaSection, PageHero } from "@/components/site/sections"
import { CTA } from "@/lib/content/site"

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) return {}

  return pageMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    path: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ]

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.subtitle}
        crumbs={crumbs}
      >
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {service.heroDescription}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      {/* Overview */}
      <Section>
        <Container size="narrow">
          <div className="space-y-5">
            {service.overview.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Why Nolojia"
            title={`What you get with ${service.title.toLowerCase()}.`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Check aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
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
                title="What this covers."
                description="The work handled under this service — through AI, automation, a person, or a combination of the three."
              />
              <div className="mt-8">
                <CtaLink href={CTA.secondary.href} variant="secondary">
                  {CTA.secondary.label}
                </CtaLink>
              </div>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {service.tasks.map((task) => (
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

      {/* Industries */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading
            onInk
            align="center"
            eyebrow="Industries"
            title="Where this comes up most."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.industries.map((industry, i) => (
              <Reveal key={industry.name} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-base font-semibold text-white">{industry.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">
                    {industry.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="Getting started" title="How we begin." />
          <ol className="mt-12 space-y-4">
            {service.process.map((step) => (
              <li
                key={step.step}
                className="flex gap-5 rounded-2xl border border-border bg-card p-6"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-mono text-sm font-semibold text-brand">
                  {step.step}
                </span>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container size="narrow">
          <SectionHeading align="center" eyebrow="FAQ" title="Common questions." />
          <Faq
            items={service.faqs.map((f) => ({ question: f.question, answer: f.answer }))}
            className="mt-10"
            idPrefix={`service-${service.slug}`}
          />
        </Container>
      </Section>

      <CtaSection
        eyebrow={service.title}
        title="Ready to put this into a system?"
        description="Tell us what the process looks like today. We will show you what can be automated, what needs a person, and what to do first."
      />
    </>
  )
}
