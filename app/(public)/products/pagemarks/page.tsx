import { notFound } from "next/navigation"
import { Info } from "lucide-react"

import { Container, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { PageMarksVisual } from "@/components/site/product-visuals"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { getProduct } from "@/lib/content/products"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "PageMarks",
  description:
    "A browser extension that puts sticky notes over any page without blocking it, then hands the page back later with your highlights and reading position.",
  path: "/products/pagemarks",
  keywords: [
    "PageMarks",
    "browser extension",
    "sticky notes on webpages",
    "web highlighter",
    "reading position",
    "research tool",
  ],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "PageMarks", href: "/products/pagemarks" },
]

/**
 * Audiences taken from how the product is actually used and described, not
 * invented personas. No user counts or ratings anywhere on this page — the
 * Chrome Web Store listing is the place a visitor can check those for real.
 */
const WHO_ITS_FOR = [
  {
    title: "Students",
    body: "Every source keeps the note that explains why it belongs in your essay, so writing it up means reading your own notes rather than re-reading the internet.",
  },
  {
    title: "Developers",
    body: "Documentation stays where you left it — not the homepage of the docs, the paragraph that actually answered the question.",
  },
  {
    title: "Researchers",
    body: "A month-long rabbit hole stays one collection with your thinking attached, instead of eighty tabs you are afraid to close.",
  },
  {
    title: "Writers and marketers",
    body: "The line that sparked the idea stays highlighted on the page, waiting, however many weeks later you come back for it.",
  },
  {
    title: "Professionals",
    body: "Close the laptop mid-task on Friday. Open it on Monday and the task, the page and the reason are all still there.",
  },
  {
    title: "Anyone who gave up on bookmarks",
    body: "A bookmark saves a location, and the location was never the part you forgot.",
  },
]

const PRIVACY = [
  {
    title: "Notes stay on your machine",
    body: "They live in your browser's own storage. There is no mechanism for us to read them.",
  },
  {
    title: "Cloud sync is optional and off",
    body: "Turn it on and your own data mirrors between your own devices over an encrypted connection. Turn it off and delete it and it is gone from our servers.",
  },
  {
    title: "No analytics, no ad code",
    body: "Not switched off — not present in the extension at all.",
  },
]

export default function PageMarksPage() {
  const product = getProduct("pagemarks")
  if (!product) notFound()

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={softwareApplicationSchema({
          name: product.name,
          description: product.summary,
          path: "/products/pagemarks",
          category: "BrowserApplication",
          installUrl: product.installUrl,
          platforms: product.platforms,
          free: true,
        })}
      />

      <PageHero
        eyebrow="Product · Live"
        title="Your browser remembers where you were. PageMarks remembers why."
        description={product.summary}
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {product.installUrl ? (
            <CtaLink href={product.installUrl} external>
              Add to Chrome
            </CtaLink>
          ) : null}
          {product.siteUrl ? (
            <CtaLink href={product.siteUrl} variant="secondary" external>
              Visit pagemarks.nolojia.site
            </CtaLink>
          ) : null}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Works in Chrome, Edge, Brave and Arc. Currently free, no card required.
        </p>
      </PageHero>

      <Section>
        <Container>
          <PageMarksVisual className="mx-auto max-w-3xl" />
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            The note stays visible while every click, scroll and keystroke passes through to the page
            underneath — which is the part every other sticky-note extension gets wrong.
          </p>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="What it does"
            title="A second brain that stays out of your way."
            description="Keep notes visible without ever blocking the page you are working on, and get every page handed back exactly as you left it."
          />

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

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Who it's for"
            title="Built for people who read for a living."
            description="Different work, same problem: the page was easy to find again, the reason was not."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHO_ITS_FOR.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading
            onInk
            eyebrow="Privacy"
            title="Your notes stay yours."
            description="PageMarks reads the pages you use it on. We don't."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {PRIVACY.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container>
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-6">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
            <div>
              <Pill tone="brand" className="mb-2">
                Availability
              </Pill>
              <p className="text-sm leading-relaxed text-muted-foreground">{product.maturityNote}</p>
            </div>
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="PageMarks"
        title="Install it and keep the next page you read."
        description="It takes about ten seconds, and there is nothing to cancel. If you would rather talk to us about using it across a team, get in touch."
        note="Free while PageMarks is built with its early users. Nothing you write is deleted if pricing returns."
        primary={
          product.installUrl
            ? { label: "Add to Chrome", href: product.installUrl, external: true }
            : undefined
        }
      />
    </>
  )
}
