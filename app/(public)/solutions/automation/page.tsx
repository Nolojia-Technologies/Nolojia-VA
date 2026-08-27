import { CheckCircle2 } from "lucide-react"

import { Container, Eyebrow, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { WorkflowDiagram, type WorkflowStep } from "@/components/site/workflow-diagram"
import { CtaSection, IntegrationsSection, PageHero } from "@/components/site/sections"
import { ProcessSection } from "@/components/site/process"
import JsonLd from "@/components/seo/JsonLd"
import {
  AnswerFaq,
  AnswerQuestions,
  AnswerSummary,
} from "@/components/site/answers-section"
import { AUTOMATION_ANSWERS } from "@/lib/content/definitions"

import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, solutionSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "AI Automation",
  description:
    "Turn the processes your team repeats every week into automated workflows: trigger, AI, action, verification, result — with human approval wherever it matters.",
  path: "/solutions/automation",
  keywords: ["AI automation", "workflow automation", "business process automation", "AI workflows"],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "AI Automation", href: "/solutions/automation" },
]

const ANATOMY: WorkflowStep[] = [
  { icon: "Zap", label: "Trigger", detail: "An event, a message or a schedule" },
  { icon: "Sparkles", label: "AI", detail: "Reads, classifies, decides, drafts" },
  { icon: "Send", label: "Action", detail: "Writes to the systems that matter" },
  { icon: "ShieldCheck", label: "Verification", detail: "Rules and a person on anything sensitive", human: true },
  { icon: "CheckCircle2", label: "Result", detail: "Done, logged and reviewable" },
]

const USE_CASES: { id: string; title: string; problem: string; steps: WorkflowStep[] }[] = [
  {
    id: "sales",
    title: "Lead handling",
    problem: "Enquiries arrive in three places and get answered whenever someone has a free minute.",
    steps: [
      { icon: "Inbox", label: "New lead", detail: "Form, inbox or WhatsApp" },
      { icon: "ScanSearch", label: "AI qualifies", detail: "Scored against your criteria" },
      { icon: "Database", label: "CRM updated", detail: "Record created and enriched" },
      { icon: "PenLine", label: "Reply drafted", detail: "Personalised, held for review", human: true },
      { icon: "CalendarCheck", label: "Follow-up set", detail: "Scheduled automatically" },
      { icon: "Bell", label: "Team notified", detail: "With full context attached" },
    ],
  },
  {
    id: "support",
    title: "Support triage",
    problem: "The same twenty questions consume the queue and the real problems wait behind them.",
    steps: [
      { icon: "Ticket", label: "Ticket arrives", detail: "Email, chat or form" },
      { icon: "ScanSearch", label: "AI classifies", detail: "Topic, urgency and sentiment" },
      { icon: "MailCheck", label: "Known answer sent", detail: "From your knowledge base" },
      { icon: "UserPlus", label: "Rest escalated", detail: "Routed with the full thread", human: true },
      { icon: "Database", label: "Helpdesk updated", detail: "Tagged and closed or assigned" },
    ],
  },
  {
    id: "onboarding",
    title: "Client onboarding",
    problem: "Every new client is onboarded slightly differently and something is always missed.",
    steps: [
      { icon: "UserPlus", label: "Deal won", detail: "CRM stage changes" },
      { icon: "FileSpreadsheet", label: "Workspace created", detail: "Folders, docs and tasks" },
      { icon: "PenLine", label: "Welcome pack drafted", detail: "Personalised to the engagement", human: true },
      { icon: "CalendarCheck", label: "Kickoff booked", detail: "Across both calendars" },
      { icon: "CheckCircle2", label: "Checklist tracked", detail: "Nothing silently skipped" },
    ],
  },
  {
    id: "finance",
    title: "Invoice and payment chasing",
    problem: "Invoices go out late and follow-ups depend on someone remembering.",
    steps: [
      { icon: "Receipt", label: "Work completed", detail: "Milestone or period closes" },
      { icon: "FileSpreadsheet", label: "Invoice prepared", detail: "From your billing data" },
      { icon: "ShieldCheck", label: "Reviewed", detail: "A person approves before it sends", human: true },
      { icon: "Send", label: "Sent", detail: "To the right contact" },
      { icon: "Bell", label: "Reminders scheduled", detail: "Polite, on time, automatic" },
    ],
  },
  {
    id: "marketing",
    title: "Content and campaign workflows",
    problem: "Research, drafting, scheduling and reporting live in four different places.",
    steps: [
      { icon: "ScanSearch", label: "Research collected", detail: "Sources gathered and summarised" },
      { icon: "PenLine", label: "Drafts produced", detail: "To your brief and tone" },
      { icon: "ShieldCheck", label: "Edited by a person", detail: "Always, before anything publishes", human: true },
      { icon: "Megaphone", label: "Scheduled", detail: "Across the channels you use" },
      { icon: "Database", label: "Results logged", detail: "Into one reporting view" },
    ],
  },
]

const GOOD_CANDIDATES = [
  "It happens at least weekly.",
  "The steps are the same most times.",
  "The information already lives in a system.",
  "A mistake is recoverable, not catastrophic.",
]

const BAD_CANDIDATES = [
  "It happens twice a year.",
  "Every instance is genuinely different.",
  "The inputs only exist in someone's head.",
  "Getting it wrong loses a client or breaks the law.",
]

export default function AutomationPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={solutionSchema({
          name: "AI Automation",
          description:
            "Design and deployment of automated business workflows combining rules and AI, with human approval steps on sensitive actions.",
          path: "/solutions/automation",
          serviceType: "Business process automation",
        })}
      />

      <PageHero
        eyebrow="AI automation"
        title="Automate the work between your tools."
        description="Most wasted hours are not inside one application. They are in the gaps between them — copying, re-typing, chasing and checking."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>Automate My Workflow</CtaLink>
          <CtaLink href="#use-cases" variant="secondary">
            See real workflows
          </CtaLink>
        </div>
      </PageHero>

      <AnswerSummary answers={AUTOMATION_ANSWERS} />
      <AnswerQuestions answers={AUTOMATION_ANSWERS} />

      {/* Anatomy */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Anatomy"
            title="Every Nolojia workflow has the same five parts."
            description="Once you can see the shape, you can spot the candidates in your own business."
          />
          <div className="mt-12">
            <WorkflowDiagram steps={ANATOMY} />
          </div>
        </Container>
      </Section>

      {/* Use cases */}
      <Section id="use-cases" tone="surface">
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="Workflows we build most often."
            description="Each one starts as a process a team already runs by hand. We do not invent new work for you to supervise."
          />

          <div className="mt-12 space-y-6">
            {USE_CASES.map((useCase, i) => (
              <Reveal key={useCase.id} delay={i * 0.05}>
                <section
                  id={useCase.id}
                  className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                  <h3 className="text-lg font-semibold text-foreground">{useCase.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">Before: </span>
                    {useCase.problem}
                  </p>
                  <div className="mt-6">
                    <WorkflowDiagram steps={useCase.steps} />
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What automates well */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Judgement call"
            title="Not everything should be automated."
            description="Part of our job is telling you which processes to leave alone. Automating a broken process just makes it fail faster."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-2xl border border-brand/20 bg-brand-soft p-7">
                <Eyebrow className="mb-4">Good candidate</Eyebrow>
                <ul className="space-y-3">
                  {GOOD_CANDIDATES.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-brand-strong">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <Eyebrow className="mb-4 text-muted-foreground">Leave it alone</Eyebrow>
                <ul className="space-y-3">
                  {BAD_CANDIDATES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.9375rem] text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <IntegrationsSection onInk />

      <ProcessSection tone="surface" />

      <AnswerFaq answers={AUTOMATION_ANSWERS} idPrefix="automation-faq" />

      <CtaSection
        eyebrow="AI automation"
        title="What would you automate first?"
        description="Describe the process that eats the most time. We will map it, tell you what is automatable and what is not, and quote against the real work."
      />
    </>
  )
}
