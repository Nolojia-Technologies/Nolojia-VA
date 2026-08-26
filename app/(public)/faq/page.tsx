import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Faq } from "@/components/site/faq"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { FAQ_FLAT, FAQ_SECTIONS } from "@/lib/content/faq"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, faqSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Straight answers about what Nolojia does, what an AI employee is, how integrations work, how long implementation takes and how we handle security.",
  path: "/faq",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
]

export default function FaqPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd data={faqSchema(FAQ_FLAT)} />

      <PageHero
        eyebrow="FAQ"
        title="Straight answers."
        description="The questions we get asked before every engagement. If yours is not here, ask us directly — we answer these ourselves."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.secondary.href}>{CTA.secondary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      {FAQ_SECTIONS.map((section, i) => (
        <Section key={section.heading} tone={i % 2 === 1 ? "surface" : "default"}>
          <Container size="narrow">
            <SectionHeading as="h2" title={section.heading} />
            <Faq
              items={section.items}
              className="mt-8"
              idPrefix={`faq-${section.heading.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            />
          </Container>
        </Section>
      ))}

      <CtaSection
        eyebrow="Still deciding"
        title="Ask us the question that is not on this page."
        description="We would rather have a direct conversation about your actual situation than have you guess from a FAQ."
      />
    </>
  )
}
