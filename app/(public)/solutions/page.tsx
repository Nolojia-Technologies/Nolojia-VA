import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { Icon } from "@/components/site/icon"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { ProcessSection } from "@/components/site/process"
import {
  CtaSection,
  IntegrationsSection,
  PageHero,
  SecuritySection,
  SolutionCategoriesSection,
} from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { PILLAR_DETAILS } from "@/lib/content/solutions"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Solutions",
  description:
    "Four ways Nolojia puts AI to work: AI employees, automated workflows, connected business systems, and human operational support that keeps it all accountable.",
  path: "/solutions",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
]

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Solutions"
        title="Four ways to put AI to work."
        description="Most engagements combine more than one. We start with whichever gives your team its time back fastest."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="#pillars" variant="secondary">
            See the four pillars
          </CtaLink>
        </div>
      </PageHero>

      <Section id="pillars">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            {PILLAR_DETAILS.map((pillar, i) => (
                <Reveal key={pillar.slug} delay={i * 0.06}>
                  <Link
                    href={pillar.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-xs transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md sm:p-8"
                  >
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                      <Icon name={pillar.icon} className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-xl font-semibold text-foreground">{pillar.title}</h2>
                    <p className="mt-1 text-sm font-medium text-brand">{pillar.tagline}</p>
                    <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                    <ul className="mt-6 space-y-2 border-t border-border pt-5">
                      {pillar.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                          <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Explore {pillar.title}
                      <ArrowRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <SolutionCategoriesSection />

      <ProcessSection />

      <IntegrationsSection onInk />

      <SecuritySection />

      <Section>
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Long-tail services"
            title="Looking for a specific service?"
            description="We keep detailed pages for individual services and industries — useful if you know exactly what you need before you talk to us."
          />
          <div className="mt-8 flex justify-center">
            <CtaLink href="/services" variant="secondary">
              Browse services A–Z
            </CtaLink>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
