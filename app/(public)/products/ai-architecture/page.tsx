import { notFound } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { Container, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { ArchitectureVisual } from "@/components/site/product-visuals"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { getProduct } from "@/lib/content/products"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "AI Architecture",
  description:
    "An AI-assisted architectural design platform in development at Nolojia: real architectural geometry, editable 2D plans, editable 3D models and photorealistic rendering.",
  path: "/products/ai-architecture",
  keywords: ["AI architecture software", "AI architectural design", "generative design", "BIM AI"],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "AI Architecture", href: "/products/ai-architecture" },
]

const PREMISE = [
  {
    title: "The problem with AI images of buildings",
    body: "A generated image looks like architecture. You cannot dimension it, cost it, build from it or change one wall without regenerating everything. It is a mood board that pretends to be a drawing.",
  },
  {
    title: "What we are building instead",
    body: "AI assisting a design that exists as real geometry underneath — so the output is a model and a set of plans you can keep working in, not a picture you have to redraw by hand.",
  },
]

export default function AIArchitecturePage() {
  const product = getProduct("ai-architecture")
  if (!product) notFound()

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={softwareApplicationSchema({
          name: product.name,
          description: product.summary,
          path: "/products/ai-architecture",
          category: "DesignApplication",
          released: false,
        })}
      />

      <PageHero
        eyebrow="Product"
        badge="In development"
        title="AI-assisted architectural design that produces real geometry."
        description={product.summary}
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact?product=ai-architecture">Register interest</CtaLink>
          <CtaLink href="/products" variant="secondary">
            All products
          </CtaLink>
        </div>
      </PageHero>

      {/* Honest status, high on the page */}
      <Section className="py-12 sm:py-14">
        <Container>
          <div className="flex items-start gap-3 rounded-2xl border border-warning/25 bg-warning-soft p-6">
            <AlertTriangle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
            <div>
              <Pill tone="warning" className="mb-2">
                Status
              </Pill>
              <p className="text-sm leading-relaxed text-foreground/80">{product.maturityNote}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Everything described on this page is what the product is being built to do. Nothing
                here is a claim about capability available to customers today.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <ArchitectureVisual className="mx-auto max-w-3xl" />
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Concept illustration: an editable plan and the same design as a massing model.
          </p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="The premise"
            title="A render is not a drawing."
            description="This product exists because of one distinction that most AI design tools ignore."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {PREMISE.map((item, i) => (
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
          <SectionHeading
            eyebrow="What it is being built to do"
            title="Four capabilities, in development."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
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
        eyebrow="Early involvement"
        title="Working in architecture or development?"
        description="We are talking to studios and developers who want a say in how this is built. Tell us what your current process actually looks like."
      />
    </>
  )
}
