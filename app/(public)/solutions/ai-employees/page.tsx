import { Check, Cog, Plug, Rocket, ShieldCheck, UserRoundCheck } from "lucide-react"

import { Container, Eyebrow, Pill, Section, SectionHeading } from "@/components/site/primitives"
import { Icon } from "@/components/site/icon"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, IntegrationsSection, PageHero } from "@/components/site/sections"
import { ProcessSection } from "@/components/site/process"
import JsonLd from "@/components/seo/JsonLd"
import {
  AnswerFaq,
  AnswerQuestions,
  AnswerSummary,
} from "@/components/site/answers-section"
import { AI_EMPLOYEES_ANSWERS } from "@/lib/content/definitions"

import { AI_EMPLOYEES } from "@/lib/content/ai-employees"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, solutionSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "AI Employees",
  description:
    "Deploy AI assistants scoped to a role — executive support, sales, customer support and operations — connected to the tools your team already works in.",
  path: "/solutions/ai-employees",
  keywords: ["AI employees", "AI assistants for business", "AI agents", "AI executive assistant"],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "AI Employees", href: "/solutions/ai-employees" },
]

const WHAT_IT_IS = [
  {
    title: "Scoped to a role",
    body: "An AI employee is configured for one job — inbox, pipeline, support queue, back office — with instructions, tone and rules written for that role rather than a generic chatbot prompt.",
  },
  {
    title: "Connected to your tools",
    body: "It works inside the systems you already use: your inbox, calendar, CRM, helpdesk, database and messaging. No new place for your team to check.",
  },
  {
    title: "Bounded by rules you set",
    body: "What it may do on its own, what it must draft for review, and what it must never touch are decided before it goes live — and are changeable afterwards.",
  },
  {
    title: "Reviewable after the fact",
    body: "Actions are logged. When something goes wrong you can see what happened, why, and fix the rule rather than guess.",
  },
]

const DEPLOYMENT = [
  {
    icon: Plug,
    title: "Connect",
    body: "We connect the assistant to the systems its role needs, with the narrowest permissions that let the job get done.",
  },
  {
    icon: Cog,
    title: "Configure",
    body: "We write the role: what it handles, in what tone, against which rules, and where it must stop and ask a person.",
  },
  {
    icon: Rocket,
    title: "Run in shadow",
    body: "It drafts and proposes before it acts, so your team can correct it on real work rather than on a demo.",
  },
  {
    icon: ShieldCheck,
    title: "Go live",
    body: "Once its output is consistently right, the safe actions are released to run automatically. The rest keeps its approval step.",
  },
]

export default function AIEmployeesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={solutionSchema({
          name: "AI Employees",
          description:
            "AI assistants configured for executive, sales, customer support and operations roles, connected to a business's existing tools.",
          path: "/solutions/ai-employees",
          serviceType: "AI assistant deployment",
        })}
      />

      <PageHero
        eyebrow="AI employees"
        title="Your next employee doesn't need a desk."
        description="Deploy AI assistants that work alongside your team and handle repetitive operational work around the clock."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="#profiles" variant="secondary">
            See the four roles
          </CtaLink>
        </div>
      </PageHero>

      <AnswerSummary answers={AI_EMPLOYEES_ANSWERS} />
      <AnswerQuestions answers={AI_EMPLOYEES_ANSWERS} />

      {/* What an AI employee actually is */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What it is"
            title="Not a chatbot. Not an autonomous agent."
            description="An AI employee is a configured assistant with a defined job, real access to your systems, and clear limits on what it may do without a person."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {WHAT_IT_IS.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">To be direct: </span>
              we do not deploy AI that makes unsupervised commercial decisions about your business.
              Anything that commits you — pricing, contracts, refunds, a first message to a new
              customer — is drafted and held for a person.
            </p>
          </div>
        </Container>
      </Section>

      {/* Role profiles */}
      <Section id="profiles" tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Profiles"
            title="Four roles we deploy today."
            description="Each one comes with a defined scope, an integration set and a documented point where a person takes over."
          />

          <div className="mt-12 space-y-6">
            {AI_EMPLOYEES.map((employee, i) => (
                <Reveal key={employee.id} delay={i * 0.05}>
                  <article
                    id={employee.id}
                    className="scroll-mt-24 overflow-hidden rounded-2xl border border-border bg-card lg:grid lg:grid-cols-[1.1fr_1fr]"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start gap-4">
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                          <Icon name={employee.icon} className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{employee.name}</h3>
                          <p className="mt-0.5 text-sm text-brand">{employee.role}</p>
                        </div>
                      </div>

                      <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {employee.summary}
                      </p>

                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {employee.handles.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-foreground/85">
                            <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                            {h}
                          </li>
                        ))}
                      </ul>

                      <p className="mt-6 flex gap-2.5 rounded-xl border border-border bg-surface p-4 text-[0.8125rem] leading-relaxed text-muted-foreground">
                        <UserRoundCheck
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-foreground"
                        />
                        <span>
                          <span className="font-medium text-foreground">Human in the loop: </span>
                          {employee.humanInTheLoop}
                        </span>
                      </p>
                    </div>

                    {/* Sample exchange rendered as product UI */}
                    <div className="border-t border-border bg-surface p-6 sm:p-8 lg:border-l lg:border-t-0">
                      <Eyebrow className="mb-4">Example</Eyebrow>
                      <div className="rounded-xl border border-border bg-background p-4">
                        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
                          You
                        </p>
                        <p className="mt-1 text-sm text-foreground">
                          &ldquo;{employee.sample.prompt}&rdquo;
                        </p>

                        <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-wider text-brand">
                          {employee.name}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {employee.sample.reply}
                        </p>

                        <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                          {employee.sample.actions.map((action) => (
                            <li
                              key={action.label}
                              className="flex items-center gap-3 rounded-lg bg-surface px-3 py-2"
                            >
                              <Pill className="shrink-0">{action.label}</Pill>
                              <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-muted-foreground">
                                {action.detail}
                              </span>
                              <Check
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-success"
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="mt-3 text-xs text-muted-foreground">
                        Illustrative example of the role&rsquo;s scope, not a recording of a
                        customer session.
                      </p>
                    </div>
                  </article>
                </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Deployment */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading
            onInk
            eyebrow="Deployment"
            title="How an AI employee goes live."
            description="Nothing is switched on because it looked good in a demo. It earns each permission on your real work first."
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DEPLOYMENT.map((step, i) => {
              const Icon = step.icon
              return (
                <Reveal as="li" key={step.title} delay={i * 0.06} className="h-full">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.07] text-white/70">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/55">{step.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </Container>
      </Section>

      <IntegrationsSection />

      <ProcessSection tone="surface" />

      <AnswerFaq answers={AI_EMPLOYEES_ANSWERS} idPrefix="ai-employees-faq" />

      <CtaSection
        eyebrow="AI employees"
        title="Which role would you hand over first?"
        description="Tell us where the repetitive work piles up. We will tell you honestly whether an AI employee is the right answer for it."
      />
    </>
  )
}
