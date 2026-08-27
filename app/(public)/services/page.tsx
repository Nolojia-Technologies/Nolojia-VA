import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero, SolutionCategoriesSection } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { servicePages, industryPages, countryPages } from "@/lib/seo/config"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Every Nolojia service in one place — AI assistants, automation, research, data, marketing and technical support, plus the industries and regions we serve.",
  path: "/services",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
]

function LinkGrid({
  items,
  columns = 3,
}: {
  items: { href: string; label: string; description?: string }[]
  columns?: 2 | 3
}) {
  return (
    <ul
      className={`mt-8 grid gap-3 sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item.href} delay={i * 0.03}>
          <Link
            href={item.href}
            className="group flex h-full items-start justify-between gap-4 rounded-xl border border-border bg-card px-5 py-4 transition duration-300 ease-smooth hover:border-brand/25 hover:shadow-sm"
          >
            <span className="min-w-0">
              <span className="block text-sm font-medium text-foreground">{item.label}</span>
              {item.description ? (
                <span className="mt-1 block text-[0.8125rem] leading-snug text-muted-foreground">
                  {item.description}
                </span>
              ) : null}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </Link>
        </Reveal>
      ))}
    </ul>
  )
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Services"
        title="Every service, in one index."
        description="If you already know what you need, start here. If you are working out what to change, start with Solutions instead."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/solutions">Explore Solutions</CtaLink>
          <CtaLink href={CTA.secondary.href} variant="secondary">
            {CTA.secondary.label}
          </CtaLink>
        </div>
      </PageHero>

      <SolutionCategoriesSection />

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Detailed service pages."
            description="Each page covers scope, process and the questions we get asked about that service specifically."
          />
          <LinkGrid
            items={servicePages.map((s) => ({
              href: `/services/${s.slug}`,
              label: s.title,
              description: s.subtitle,
            }))}
          />
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Built for how your industry works."
            description="Operational bottlenecks look different in a law firm and an e-commerce brand. These pages cover the specifics."
          />
          <LinkGrid
            items={industryPages.map((i) => ({
              href: `/hire-virtual-assistant-for-${i.industry}`,
              label: i.name,
            }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Regions"
            title="Working with teams worldwide."
            description="Nolojia is remote-first. These pages cover working arrangements, time zones and expectations by region."
          />
          <LinkGrid
            columns={2}
            items={countryPages.map((c) => ({
              href: `/virtual-assistant-services-${c.country}`,
              label: c.name,
            }))}
          />
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
