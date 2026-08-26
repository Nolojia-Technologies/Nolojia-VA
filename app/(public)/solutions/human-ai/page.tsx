import {
  BrainCircuit,
  Handshake,
  MessagesSquare,
  Scale,
  ShieldAlert,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"

import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero } from "@/components/site/sections"
import { ProcessSection } from "@/components/site/process"
import JsonLd from "@/components/seo/JsonLd"

import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, solutionSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Human + AI Support",
  description:
    "Trained operators handling judgement, relationships, exceptions and accountability — running on the same AI systems Nolojia builds for you.",
  path: "/solutions/human-ai",
  keywords: ["human in the loop AI", "operational support", "virtual assistant", "managed operations"],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Human + AI Support", href: "/solutions/human-ai" },
]

const HUMAN_STRENGTHS = [
  {
    icon: Scale,
    title: "Judgement",
    body: "Deciding what to do when the situation was not in the script — and knowing when the rule should be broken.",
  },
  {
    icon: MessagesSquare,
    title: "Communication",
    body: "The conversation that needs a tone no prompt will reliably produce, with a client who can tell the difference.",
  },
  {
    icon: Handshake,
    title: "Relationships",
    body: "Being a name your customers and suppliers recognise, rather than a queue they submit to.",
  },
  {
    icon: Sparkles,
    title: "Creativity",
    body: "Noticing the better way to do it, not just executing the way it has always been done.",
  },
  {
    icon: ShieldAlert,
    title: "Exception handling",
    body: "Catching the case the workflow was never designed for before it becomes a problem.",
  },
  {
    icon: UserRoundCheck,
    title: "Accountability",
    body: "Someone whose name is on the outcome. Software cannot own a result; a person can.",
  },
]

const AI_STRENGTHS = [
  "High volume, every day, without fatigue",
  "The same output at 3am as at 3pm",
  "Structured data entry and reconciliation",
  "Drafting from an established pattern",
  "Classification, routing and tagging",
  "Monitoring, reminders and escalation timers",
]

const MODEL = [
  {
    step: "AI carries the volume",
    body: "The repetitive, structured, high-frequency work runs through automated workflows and AI assistants.",
  },
  {
    step: "Rules decide what stops",
    body: "Anything that commits the business, or that the system was not designed for, is held rather than sent.",
  },
  {
    step: "A person picks it up",
    body: "Our operator reviews it with the full context already assembled — no hunting through threads.",
  },
  {
    step: "The system learns from it",
    body: "Recurring exceptions become new rules, so the same interruption does not keep costing a person's attention.",
  },
]

export default function HumanAIPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={solutionSchema({
          name: "Human + AI Support",
          description:
            "Trained human operators handling judgement, communication, exception handling and accountability alongside Nolojia's AI systems.",
          path: "/solutions/human-ai",
          serviceType: "Managed operational support",
        })}
      />

      <PageHero
        eyebrow="Human + AI"
        title="AI handles the work. Humans handle what matters."
        description="This is not a choice between people and software. It is a question of where each one is genuinely better — and building the handoff between them properly."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href={CTA.secondary.href} variant="secondary">
            {CTA.secondary.label}
          </CtaLink>
        </div>
      </PageHero>

      {/* Split */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The split"
            title="Two different kinds of work."
            description="Trouble starts when a business hands one kind to the other. AI is poor at judgement; people are wasted on volume."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <BrainCircuit aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">AI is better at</h3>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {AI_STRENGTHS.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-foreground/85"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-foreground">
                    <UserRoundCheck aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">People are better at</h3>
                </div>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2">
                  {HUMAN_STRENGTHS.map((item) => {
                    const Icon = item.icon
                    return (
                      <li key={item.title}>
                        <div className="flex items-center gap-2">
                          <Icon aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        </div>
                        <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* The model */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading
            onInk
            eyebrow="The model"
            title="How the handoff actually works."
            description="The point is not that a human is available somewhere. It is that the system knows exactly when to stop and who to hand to."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MODEL.map((item, i) => (
              <Reveal as="li" key={item.step} delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-mono text-sm font-semibold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white">{item.step}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Operators */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Our operators"
                title="People who run on the same systems we build."
                description="Human support at Nolojia is not a separate service bolted on beside the technology. Operators work inside the same workflows, with the same logs and the same visibility."
              />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                That is what stops work falling into the gap between &ldquo;the automation handles
                it&rdquo; and &ldquo;someone will pick it up&rdquo;.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/services" variant="secondary">
                  Browse operational services
                </CtaLink>
                <CtaLink href="/case-studies" variant="quiet">
                  Read client stories
                </CtaLink>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-7">
              <Eyebrow className="mb-4">What operators own</Eyebrow>
              <ul className="space-y-4">
                {[
                  {
                    title: "Everything the rules held back",
                    body: "Approvals, exceptions and anything outside the workflow's design.",
                  },
                  {
                    title: "The relationships",
                    body: "Client, supplier and internal communication that needs a person behind it.",
                  },
                  {
                    title: "Quality of the system itself",
                    body: "Spotting where the automation is drifting and getting it corrected.",
                  },
                  {
                    title: "The outcome",
                    body: "Not the ticket count — whether the operation actually ran properly this week.",
                  },
                ].map((item) => (
                  <li key={item.title} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <ProcessSection />

      <CtaSection
        eyebrow="Human + AI"
        title="Where does your operation need a person?"
        description="Tell us what is running today. We will show you which parts a system should carry and which parts should stay with someone accountable."
      />
    </>
  )
}
