import { FileText, Quote } from "lucide-react"

import { Container, Eyebrow, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { CLIENT_STORIES, ENGAGEMENT_CASE_STUDIES } from "@/lib/content/case-studies"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Case Studies",
  description:
    "What changed for the businesses Nolojia works with — in their own words. We publish what clients tell us and nothing we have not verified.",
  path: "/case-studies",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/case-studies" },
]

export default function CaseStudiesPage() {
  const hasEngagements = ENGAGEMENT_CASE_STUDIES.length > 0

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Case studies"
        title="Real problems. Real systems. Better operations."
        description="Below are the businesses we work with, in their own words. Everything on this page came from a client — we do not publish figures we have not confirmed with them."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="/solutions" variant="secondary">
            Explore Solutions
          </CtaLink>
        </div>
      </PageHero>

      {/* Structured write-ups — only rendered when we actually have them */}
      <Section>
        <Container>
          {hasEngagements ? (
            <div className="space-y-6">
              {ENGAGEMENT_CASE_STUDIES.map((study) => (
                <article
                  key={study.slug}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                  <Pill tone="brand">{study.industry}</Pill>
                  <h2 className="mt-4 text-xl font-semibold text-foreground">{study.client}</h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {study.problem}
                  </p>
                  <dl className="mt-6 grid gap-5 sm:grid-cols-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Before
                      </dt>
                      <dd className="mt-1.5 text-sm text-foreground/85">{study.before}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        What we built
                      </dt>
                      <dd className="mt-1.5 text-sm text-foreground/85">
                        <ul className="space-y-1">
                          {study.solution.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        After
                      </dt>
                      <dd className="mt-1.5 text-sm text-foreground/85">{study.after}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 sm:p-10">
              <div className="flex max-w-2xl items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <Eyebrow className="mb-3">In progress</Eyebrow>
                  <h2 className="text-xl font-semibold text-foreground">
                    We&rsquo;re documenting the businesses already building with Nolojia.
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    Full engagement write-ups — the problem, the before state, what we built and the
                    measured result — are being prepared with the clients concerned. They go up here
                    once those clients have signed off on the numbers, and not before. In the
                    meantime, the stories below are their own accounts of the work.
                  </p>
                  <div className="mt-6">
                    <CtaLink href={CTA.secondary.href} variant="secondary">
                      Ask us about a similar engagement
                    </CtaLink>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Client stories */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="In their words"
            title="What clients say about the work."
            description="Time saved is what each client reported to us. It is their figure, presented as their claim."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_STORIES.map((story, i) => (
              <Reveal key={story.company} delay={i * 0.05}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <Quote aria-hidden="true" className="h-5 w-5 text-brand/40" />
                  <blockquote className="mt-4 flex-1">
                    <p className="text-[0.9375rem] font-semibold text-foreground">{story.headline}</p>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </blockquote>

                  <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
                    {story.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex items-start gap-2 text-[0.8125rem] text-foreground/80"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <figcaption className="mt-5 border-t border-border pt-4">
                    <p className="text-sm font-medium text-foreground">{story.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.role}, {story.company} · {story.industry}
                    </p>
                    <Pill className="mt-3">Client-reported: {story.timeSaved} saved</Pill>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We do not publish aggregate statistics — no client counts, average ratings or percentage
            improvements — because we have not independently verified them. When we can, we will.
          </p>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Your operation"
        title="Want a system like this?"
        description="Tell us what your week actually looks like. We will show you which parts of it belong to a system rather than a person."
      />
    </>
  )
}
