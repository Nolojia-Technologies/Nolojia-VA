import * as React from "react"
import Link from "next/link"
import { ArrowRight, Check, ShieldCheck } from "lucide-react"
import { Container, Eyebrow, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Breadcrumbs, type Crumb } from "@/components/site/breadcrumbs"
import { Reveal } from "@/components/site/reveal"
import { Icon } from "@/components/site/icon"
import { INTEGRATION_GROUPS } from "@/lib/content/integrations"
import { SOLUTION_CATEGORIES } from "@/lib/content/solutions"
import { CTA } from "@/lib/content/site"
import { cn } from "@/lib/utils/cn"

/* ── Capability strip ────────────────────────────────────────────────────────
   Stands in for a customer logo wall. We do not have permission to publish
   client logos, so we state what Nolojia does instead of inventing proof. */

export function CapabilityStrip({ onInk = false }: { onInk?: boolean }) {
  const capabilities = ["AI Automation", "Business Operations", "Custom Systems", "Human Support"]
  return (
    <div
      className={cn(
        "border-y",
        onInk ? "border-white/10 bg-ink-2" : "border-border bg-surface"
      )}
    >
      <Container className="py-8">
        <p
          className={cn(
            "text-center text-xs font-semibold uppercase tracking-[0.16em]",
            onInk ? "text-white/40" : "text-muted-foreground"
          )}
        >
          What Nolojia works on
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {capabilities.map((c) => (
            <li
              key={c}
              className={cn(
                "text-sm font-semibold sm:text-base",
                onInk ? "text-white/70" : "text-foreground/70"
              )}
            >
              {c}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

/* ── Solutions grid ─────────────────────────────────────────────────────── */

export function SolutionCategoriesSection() {
  return (
    <Section id="solutions" tone="surface">
      <Container>
        <SectionHeading
          eyebrow="Where we work"
          title="The operations we take on."
          description="Each area starts with the work your team repeats most. We only list what Nolojia can actually deliver."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTION_CATEGORIES.map((category, i) => (
              <Reveal key={category.slug} delay={i * 0.05}>
                <Link
                  href={category.href}
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                    <Icon name={category.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-foreground">{category.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {category.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="rounded-md border border-border bg-surface px-2 py-1 text-[0.75rem] text-muted-foreground"
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Explore
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
  )
}

/* ── Integrations ───────────────────────────────────────────────────────── */

export function IntegrationsSection({ onInk = false }: { onInk?: boolean }) {
  return (
    <Section tone={onInk ? "ink" : "default"}>
      <Container>
        <SectionHeading
          onInk={onInk}
          align="center"
          eyebrow="Integrations"
          title="Works with the tools your business already uses."
          description="We build against the platforms you already pay for. Every connection is configured for your setup rather than shipped as a generic connector."
        />

        <div className="mt-12 space-y-8">
          {INTEGRATION_GROUPS.map((group) => (
            <div key={group.heading}>
              <p
                className={cn(
                  "text-center text-xs font-semibold uppercase tracking-[0.14em]",
                  onInk ? "text-white/35" : "text-muted-foreground"
                )}
              >
                {group.heading}
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {group.tools.map((tool) => (
                  <li
                    key={tool}
                    className={cn(
                      "rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                      onInk
                        ? "border-white/10 bg-white/[0.04] text-white/75 hover:border-white/20"
                        : "border-border bg-card text-foreground/80 hover:border-brand/25"
                    )}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p
          className={cn(
            "mt-10 text-center text-sm",
            onInk ? "text-white/55" : "text-muted-foreground"
          )}
        >
          Need something else?{" "}
          <Link
            href="/contact"
            className={cn(
              "font-semibold underline-offset-4 hover:underline",
              onInk ? "text-white" : "text-brand"
            )}
          >
            Talk to us
          </Link>
          .
        </p>
      </Container>
    </Section>
  )
}

/* ── Security summary ───────────────────────────────────────────────────── */

const SECURITY_POINTS = [
  {
    title: "Authentication you control",
    body: "We connect through each platform's own sign-in and permissions rather than shared passwords, and access is revocable by you at any time.",
  },
  {
    title: "Least-privilege access",
    body: "An integration gets the narrowest scope its workflow needs — read where reading is enough, write only where the process requires it.",
  },
  {
    title: "Encryption in transit",
    body: "Connections to your systems run over encrypted channels, and credentials are stored as secrets rather than in application code.",
  },
  {
    title: "Controlled integrations",
    body: "Every connection is deliberate and documented. Nothing is wired in because it was convenient during a build.",
  },
  {
    title: "Data kept where it lives",
    body: "We work inside your systems wherever possible. Where a workflow must store something, we agree what, where and for how long before building.",
  },
  {
    title: "Human oversight",
    body: "Anything that commits your business — pricing, contracts, refunds, first-time external messages — stops for a person to approve.",
  },
]

export function SecuritySection() {
  return (
    <Section tone="surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={
                <>
                  <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                  Security
                </>
              }
              title="Built with business security in mind."
              description="AI that touches your inbox, your CRM and your customers has to be governed. Here is how we handle it."
            />
            <div className="mt-8">
              <CtaLink href="/security" variant="secondary">
                Security &amp; Privacy
              </CtaLink>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Nolojia does not hold SOC 2, ISO 27001 or HIPAA certification, and we do not claim
              otherwise. If your procurement process requires a specific framework, tell us early
              and we will be straight with you about what we can meet.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {SECURITY_POINTS.map((point, i) => (
              <Reveal as="li" key={point.title} delay={i * 0.04}>
                <div className="h-full rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start gap-2.5">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <h3 className="text-[0.9375rem] font-semibold text-foreground">{point.title}</h3>
                  </div>
                  <p className="mt-2.5 pl-[1.625rem] text-sm leading-relaxed text-muted-foreground">
                    {point.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}

/* ── Final CTA ──────────────────────────────────────────────────────────── */

interface CtaSectionAction {
  label: string
  href: string
  external?: boolean
}

export function CtaSection({
  title = "Ready to put AI to work?",
  description = "Tell us what is slowing your business down. We will help you identify what can be automated, augmented or rebuilt.",
  eyebrow = "Get started",
  primary,
  note = "No obligation. We will tell you if automation is not the right answer.",
}: {
  title?: string
  description?: string
  eyebrow?: string
  /** Overrides the default "Build My AI System" button on product pages. */
  primary?: CtaSectionAction
  note?: string
}) {
  const lead = primary ?? { label: CTA.primary.label, href: CTA.primary.href }
  return (
    <Section tone="ink" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid-ink mask-fade" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-[28rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]"
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow onInk className="justify-center">
            {eyebrow}
          </Eyebrow>
          <h2 className="mt-4 text-display-md font-semibold text-white">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
            {description}
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <CtaLink href={lead.href} size="lg" onInk external={lead.external}>
              {lead.label}
            </CtaLink>
            <CtaLink href={CTA.secondary.href} variant="secondary" size="lg" onInk>
              {CTA.secondary.label}
            </CtaLink>
          </div>
          <p className="mt-6 text-sm text-white/40">{note}</p>
        </div>
      </Container>
    </Section>
  )
}

/* ── Page hero used by every inner page ─────────────────────────────────── */

export function PageHero({
  eyebrow,
  title,
  description,
  badge,
  crumbs,
  children,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  badge?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div aria-hidden="true" className="absolute inset-0 bg-grid mask-fade opacity-40" />
      <Container className="relative">
        <div className="max-w-3xl">
          {crumbs ? <Breadcrumbs items={crumbs} /> : null}
          {badge ? (
            <Pill tone="warning" className="mb-5">
              {badge}
            </Pill>
          ) : null}
          {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
          <h1 className="text-display-md font-semibold text-foreground">{title}</h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </section>
  )
}
