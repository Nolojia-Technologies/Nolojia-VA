import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Layers, Linkedin, Puzzle, Repeat, Wallet } from "lucide-react"

import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero } from "@/components/site/sections"
import { ProcessSection } from "@/components/site/process"
import JsonLd from "@/components/seo/JsonLd"

import { PILLAR_DETAILS } from "@/lib/content/solutions"
import { COMPANY, FOUNDER } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "About",
  description:
    "Nolojia exists to make businesses more intelligent by connecting people, AI, automation and systems — so operations stop depending on someone remembering.",
  path: "/about",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]

const PROBLEMS = [
  {
    icon: Repeat,
    title: "Repetitive tasks",
    body: "The same work, done by hand, every week — because nobody has had time to make it stop.",
  },
  {
    icon: Puzzle,
    title: "Disconnected tools",
    body: "Six products that each solve one thing and none of which know about each other.",
  },
  {
    icon: Layers,
    title: "Fragmented information",
    body: "The truth about a customer spread across an inbox, a spreadsheet and someone's memory.",
  },
  {
    icon: Wallet,
    title: "Complexity that outgrows headcount",
    body: "Operational load rising faster than the team, so hiring becomes the only lever left.",
  },
]

const PRINCIPLES = [
  {
    title: "Say what is true",
    body: "No invented statistics, no borrowed logos, no certifications we do not hold. If we cannot prove it, it does not go on the website.",
  },
  {
    title: "Automate the right things",
    body: "Part of the job is telling a client which processes to leave alone. Automating a broken process only makes it fail faster.",
  },
  {
    title: "Keep a person accountable",
    body: "Software cannot own an outcome. Every engagement has someone whose name is on whether it actually worked.",
  },
  {
    title: "Build systems, not demos",
    body: "Anything we deploy has to survive contact with a real week of work — including the parts nobody planned for.",
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={webPageSchema({
          name: "About Nolojia",
          description:
            "Nolojia builds AI assistants, automation and connected business systems, supported by human operators.",
          path: "/about",
        })}
      />

      <PageHero
        eyebrow="About Nolojia"
        title="We're building the operating system for modern business."
        description="Businesses are not short of software. They are overwhelmed by repetitive tasks, disconnected tools, scattered information and operational complexity that grows faster than headcount."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/solutions">Explore Solutions</CtaLink>
          <CtaLink href="/careers" variant="secondary">
            Open roles
          </CtaLink>
        </div>
      </PageHero>

      {/* The problem */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The problem"
            title="Operations quietly become the bottleneck."
            description="It rarely arrives as a crisis. It arrives as four hours a week here, a missed follow-up there, and a founder who cannot remember the last time they worked on the business rather than in it."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROBLEMS.map((problem, i) => {
              const Icon = problem.icon
              return (
                <Reveal key={problem.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted-foreground">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{problem.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {problem.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* The mission */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <SectionHeading
              onInk
              eyebrow="The mission"
              title="Make businesses more intelligent by connecting four things that usually sit apart."
              description="People, AI, automation and systems. Most companies buy them separately and end up maintaining the gaps between them. We treat them as one problem."
            />

            <ul className="grid gap-3 self-center">
              {PILLAR_DETAILS.map((pillar, i) => (
                <Reveal as="li" key={pillar.slug} delay={i * 0.06}>
                  <Link
                    href={pillar.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <span>
                      <span className="block text-sm font-semibold text-white">{pillar.title}</span>
                      <span className="mt-0.5 block text-xs text-white/50">{pillar.tagline}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="Four things we will not trade away."
            description="These are not values on a wall. They are the reasons we sometimes talk a client out of a project."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PRINCIPLES.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-7">
                  <h3 className="text-base font-semibold text-foreground">{principle.title}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ProcessSection />

      {/* Founder */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col items-start gap-8 rounded-2xl border border-border bg-card p-7 sm:flex-row sm:items-center sm:p-9">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
              <Image
                src={FOUNDER.image}
                alt={`${FOUNDER.name}, ${FOUNDER.role} of Nolojia`}
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0">
              <Eyebrow className="mb-3">Founder</Eyebrow>
              <h2 className="text-xl font-semibold text-foreground">{FOUNDER.name}</h2>
              <p className="mt-0.5 text-sm text-brand">{FOUNDER.role}</p>
              <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                Nolojia was founded to close the gap between what technology can now do and what most
                businesses actually get from it. The company is the point, not the founder story.
              </p>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand/30 hover:bg-surface"
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Nolojia trades as {COMPANY.legalName}. Reach us at{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
