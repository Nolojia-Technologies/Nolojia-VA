import Link from "next/link"
import {
  ArrowRight,
  BrainCircuit,
  Handshake,
  MessagesSquare,
  Scale,
  ShieldAlert,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"

import { Container, Eyebrow, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { AssistantConsole } from "@/components/site/assistant-console"
import { WorkflowDiagram, type WorkflowStep } from "@/components/site/workflow-diagram"
import { SystemDiagram } from "@/components/site/system-diagram"
import { AIEmployeeCard } from "@/components/site/ai-employee-card"
import { ProductCard } from "@/components/site/product-card"
import { ProcessSection } from "@/components/site/process"
import { Faq } from "@/components/site/faq"
import {
  CapabilityStrip,
  CtaSection,
  IntegrationsSection,
  SecuritySection,
  SolutionCategoriesSection,
} from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { AI_EMPLOYEES } from "@/lib/content/ai-employees"
import { PRODUCTS } from "@/lib/content/products"
import { PILLAR_DETAILS } from "@/lib/content/solutions"
import { FAQ_FLAT } from "@/lib/content/faq"
import { CLIENT_STORIES } from "@/lib/content/case-studies"
import { CTA, FOUNDER } from "@/lib/content/site"
import { faqSchema } from "@/lib/seo/structured-data"
import { pageMetadata } from "@/lib/seo/metadata"

export const metadata = pageMetadata({
  title: "AI that works for your business",
  description:
    "Nolojia builds AI assistants, intelligent automation and connected business systems — plus the human operational support that keeps them accountable.",
  path: "/",
  keywords: [
    "AI automation",
    "AI assistants for business",
    "business process automation",
    "custom business systems",
    "AI integration partner",
  ],
})

const LEAD_WORKFLOW: WorkflowStep[] = [
  { icon: "Inbox", label: "New lead", detail: "Form, inbox or WhatsApp" },
  { icon: "ScanSearch", label: "AI qualifies", detail: "Scored against your criteria" },
  { icon: "Database", label: "CRM updated", detail: "Record created and enriched" },
  { icon: "PenLine", label: "Email drafted", detail: "Personalised, ready to review", human: true },
  { icon: "CalendarCheck", label: "Follow-up set", detail: "Scheduled automatically" },
  { icon: "Bell", label: "Team notified", detail: "With the full context attached" },
]

const HUMAN_WORK = [
  { icon: Scale, title: "Judgement", body: "Deciding what to do when the situation was not in the script." },
  { icon: MessagesSquare, title: "Relationships", body: "The conversations that keep a client or supplier on side." },
  { icon: ShieldAlert, title: "Exception handling", body: "Catching the case the workflow was never designed for." },
  { icon: Handshake, title: "Accountability", body: "Someone whose name is on the outcome, not just the task." },
]

const AI_WORK = [
  "High-volume, repetitive tasks",
  "Structured data entry and updates",
  "Drafting from a known pattern",
  "Routing, tagging and classification",
  "Monitoring and reminders",
  "Round-the-clock coverage",
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(FAQ_FLAT.slice(0, 6))} />

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink mask-fade" />
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/2 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]"
        />

        <Container size="wide" className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <Pill tone="ink">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" />
                AI · Automation · Business systems
              </Pill>

              <h1 className="mt-6 text-display-lg font-semibold text-white">
                AI that works for your business.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/65">
                Nolojia builds AI assistants and intelligent digital systems that automate the work
                behind your business.
              </p>

              <p className="mt-5 text-sm font-medium text-white/45">
                AI Assistants · Automation · Business Systems · Human Support
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CtaLink href={CTA.primary.href} size="lg" onInk>
                  {CTA.primary.label}
                </CtaLink>
                <CtaLink href="/solutions" variant="secondary" size="lg" onInk>
                  Explore Solutions
                </CtaLink>
              </div>

              <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
                {PILLAR_DETAILS.map((pillar) => (
                  <div key={pillar.slug}>
                    <dt className="text-[0.8125rem] font-semibold text-white">{pillar.title}</dt>
                    <dd className="mt-1 text-xs leading-snug text-white/45">{pillar.tagline}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:pl-4">
              <AssistantConsole />
              <p className="mt-4 text-center text-xs text-white/35">
                One request in. Six actions out — with a person reviewing anything that commits you.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CapabilityStrip />

      {/* ══ AI WORKFORCE ══════════════════════════════════════════════════ */}
      <Section id="ai-workforce">
        <Container>
          <SectionHeading
            eyebrow="AI employees"
            title="Meet your AI workforce."
            description="Give your business intelligent assistants that handle repetitive work, coordinate tasks and help your team move faster."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {AI_EMPLOYEES.map((employee, i) => (
              <Reveal key={employee.id} delay={i * 0.06}>
                <AIEmployeeCard
                  employee={employee}
                  href={`/solutions/ai-employees#${employee.id}`}
                  className="h-full"
                />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <CtaLink href="/solutions/ai-employees" variant="quiet">
              See how AI employees are deployed
            </CtaLink>
          </div>
        </Container>
      </Section>

      {/* ══ AUTOMATION ════════════════════════════════════════════════════ */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading
            onInk
            eyebrow="AI automation"
            title="Turn repetitive work into automated workflows."
            description="Nolojia connects the tools your business already uses and turns repeatable processes into workflows that run on their own — with a person signing off wherever it matters."
          />

          <div className="mt-12">
            <WorkflowDiagram steps={LEAD_WORKFLOW} onInk />
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <CtaLink href="/solutions/automation" onInk>
              Automate a Workflow
            </CtaLink>
            <p className="text-sm text-white/45">
              The same pattern applies to onboarding, invoicing, reporting and support triage.
            </p>
          </div>
        </Container>
      </Section>

      {/* ══ BUSINESS SYSTEMS ══════════════════════════════════════════════ */}
      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="Business systems"
                title="Connect your people, tools and data."
                description="Most businesses do not have a software problem. They have a joins problem — the CRM does not talk to the inbox, the spreadsheet does not talk to the database, and someone re-types the same information four times a week."
              />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Nolojia builds the layer that sits across the stack: shared data, connected tools and
                reporting your team will actually open — rather than another isolated automation
                nobody maintains.
              </p>
              <div className="mt-8">
                <CtaLink href="/solutions/business-systems" variant="secondary">
                  Explore business systems
                </CtaLink>
              </div>
            </div>

            <SystemDiagram />
          </div>
        </Container>
      </Section>

      {/* ══ HUMAN + AI ════════════════════════════════════════════════════ */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Human + AI"
            title="AI handles the work. Humans handle what matters."
            description="This is not a choice between people and software. The businesses that get the most out of AI are the ones that put people where people are genuinely better."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-border bg-card p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <BrainCircuit aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold text-foreground">What AI carries</h3>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {AI_WORK.map((item) => (
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
                  <h3 className="text-lg font-semibold text-foreground">What people carry</h3>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {HUMAN_WORK.map((item) => {
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

          <div className="mt-10 rounded-2xl border border-brand/20 bg-brand-soft p-6 sm:p-7">
            <p className="text-base font-medium text-brand-strong sm:text-lg">
              AI + humans, not AI instead of humans. Our operators run on the same systems we build
              for you, so nothing falls between the two.
            </p>
            <div className="mt-5">
              <CtaLink href="/solutions/human-ai" variant="quiet">
                How Human + AI support works
              </CtaLink>
            </div>
          </div>
        </Container>
      </Section>

      <SolutionCategoriesSection />

      {/* ══ PRODUCTS ══════════════════════════════════════════════════════ */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Products"
            title="Technology built by Nolojia."
            description="We do not only implement technology for other businesses. We build products that solve operational problems of our own."
          />

          <div className="mt-12 space-y-6">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.slug} delay={i * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <CtaLink href="/products" variant="quiet">
              See all Nolojia products
            </CtaLink>
          </div>
        </Container>
      </Section>

      <ProcessSection tone="surface" />

      <IntegrationsSection />

      {/* ══ CLIENT STORIES ════════════════════════════════════════════════ */}
      <Section tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Client stories"
            title="Real problems. Real systems. Better operations."
            description="These are our clients' own words about their engagements. Time saved is what they reported to us — we do not publish numbers we have not verified with them."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CLIENT_STORIES.slice(0, 3).map((story, i) => (
              <Reveal key={story.company} delay={i * 0.06}>
                <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-6">
                  <blockquote className="flex-1">
                    <p className="text-[0.9375rem] font-semibold text-foreground">
                      {story.headline}
                    </p>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-muted-foreground">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <p className="text-sm font-medium text-foreground">{story.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {story.role}, {story.company}
                    </p>
                    <Pill className="mt-3">Client-reported: {story.timeSaved} saved</Pill>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <CtaLink href="/case-studies" variant="quiet">
              Read all client stories
            </CtaLink>
          </div>
        </Container>
      </Section>

      <SecuritySection />

      {/* ══ ABOUT ═════════════════════════════════════════════════════════ */}
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="About Nolojia"
                title="We're building the operating system for modern business."
                description="Businesses are not short of software. They are overwhelmed by repetitive tasks, disconnected tools, scattered information and operational complexity that grows faster than headcount."
              />
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
                Nolojia exists to make businesses more intelligent by connecting four things that
                usually sit apart: people, AI, automation and systems. That is the whole company.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <CtaLink href="/about" variant="secondary">
                  About Nolojia
                </CtaLink>
                <CtaLink href="/careers" variant="quiet">
                  Open roles
                </CtaLink>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-7">
              <Eyebrow className="mb-4">The ecosystem</Eyebrow>
              <ul className="space-y-3">
                {PILLAR_DETAILS.map((pillar) => (
                  <li key={pillar.slug}>
                    <Link
                      href={pillar.href}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-brand/25"
                    >
                      <span className="text-sm font-medium text-foreground">{pillar.title}</span>
                      <ArrowRight
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-brand"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Founded by{" "}
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  {FOUNDER.name}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════ */}
      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="FAQ"
            title="Straight answers."
            description="The questions we get asked before every engagement."
          />
          <Faq items={FAQ_FLAT.slice(0, 6)} className="mt-10" idPrefix="home-faq" />
          <div className="mt-8 text-center">
            <CtaLink href="/faq" variant="quiet">
              Read the full FAQ
            </CtaLink>
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  )
}
