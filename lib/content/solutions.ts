import type { IconName } from "@/components/site/icon"

/* ── The four pillars ───────────────────────────────────────────────────── */

export interface Pillar {
  slug: string
  href: string
  icon: IconName
  title: string
  tagline: string
  description: string
  highlights: string[]
}

export const PILLAR_DETAILS: Pillar[] = [
  {
    slug: "ai-employees",
    href: "/solutions/ai-employees",
    icon: "Bot",
    title: "AI Employees",
    tagline: "Assistants that work alongside your team",
    description:
      "Configured AI assistants that handle email, scheduling, lead qualification, support requests and internal admin inside the tools you already use.",
    highlights: [
      "Scoped to a role, not a generic chatbot",
      "Connected to your inbox, calendar and CRM",
      "Every action logged and reviewable",
    ],
  },
  {
    slug: "automation",
    href: "/solutions/automation",
    icon: "Workflow",
    title: "AI Automation",
    tagline: "Repetitive processes, handled reliably",
    description:
      "We map the processes your team repeats every week and rebuild them as automated workflows with AI where judgement is needed and rules where it is not.",
    highlights: [
      "Trigger → AI → action → verification",
      "Human approval on anything sensitive",
      "Runs on a schedule or on an event",
    ],
  },
  {
    slug: "business-systems",
    href: "/solutions/business-systems",
    icon: "Boxes",
    title: "Business Systems",
    tagline: "Connected tools instead of scattered ones",
    description:
      "Internal dashboards, client portals, databases and reporting built around how your business actually works — connected to the software you already pay for.",
    highlights: [
      "Custom internal tools and portals",
      "One source of truth across systems",
      "Reporting your team will actually open",
    ],
  },
  {
    slug: "human-ai",
    href: "/solutions/human-ai",
    icon: "UserRoundCheck",
    title: "Human + AI Support",
    tagline: "People where people still matter",
    description:
      "Trained operators who run the parts of your operation that need judgement, relationships and accountability — supported by the same AI systems we build for you.",
    highlights: [
      "Exception handling and escalations",
      "Client and supplier communication",
      "Ownership of outcomes, not just tasks",
    ],
  },
]

/* ── Operational categories (what we actually take on) ──────────────────── */

export interface SolutionCategory {
  slug: string
  icon: IconName
  title: string
  description: string
  capabilities: string[]
  href: string
}

export const SOLUTION_CATEGORIES: SolutionCategory[] = [
  {
    slug: "executive-operations",
    icon: "Mail",
    title: "Executive Operations",
    description:
      "Keep an executive's day running: inbox triage, scheduling, prep and follow-through.",
    capabilities: ["Email", "Calendar", "Meetings", "Research", "Reports", "Follow-ups"],
    href: "/solutions/ai-employees#executive",
  },
  {
    slug: "sales",
    icon: "Target",
    title: "Sales",
    description:
      "Capture every lead, qualify it consistently and make sure nothing goes cold in the CRM.",
    capabilities: ["Lead capture", "Qualification", "Outreach", "CRM hygiene", "Follow-ups", "Scheduling"],
    href: "/solutions/ai-employees#sales",
  },
  {
    slug: "marketing",
    icon: "Megaphone",
    title: "Marketing",
    description:
      "Support the work around campaigns — research, drafting, coordination and reporting.",
    capabilities: ["Research", "Content workflows", "Campaign support", "Social media", "Analytics"],
    href: "/solutions/automation#marketing",
  },
  {
    slug: "customer-support",
    icon: "Headset",
    title: "Customer Support",
    description:
      "Answer the repeatable questions instantly and route everything else to the right person.",
    capabilities: ["Customer questions", "Tickets", "Knowledge base", "Onboarding", "Escalation"],
    href: "/solutions/ai-employees#support",
  },
  {
    slug: "administration",
    icon: "ClipboardList",
    title: "Administration",
    description:
      "Take structured, repetitive admin off your team so the work stops queueing up.",
    capabilities: ["Data entry", "Documents", "Reporting", "Scheduling", "Workflow coordination"],
    href: "/solutions/ai-employees#operations",
  },
  {
    slug: "finance-operations",
    icon: "Receipt",
    title: "Finance Operations",
    description:
      "Keep invoicing, expenses and reminders moving on time, with a person reviewing the exceptions.",
    capabilities: ["Invoice workflows", "Expense organisation", "Payment reminders", "Reporting"],
    href: "/solutions/automation#finance",
  },
]

/* ── How Nolojia works ──────────────────────────────────────────────────── */

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We map your business, workflows, bottlenecks and goals — and work out where the time actually goes.",
    detail: [
      "Process walkthrough with the people doing the work",
      "Tool and data inventory",
      "A shortlist of what is worth automating first",
    ],
  },
  {
    number: "02",
    title: "Design",
    description:
      "We decide what should be automated, what needs an AI assistant, and what should stay with a person.",
    detail: [
      "Workflow design with clear triggers and outcomes",
      "Assistant scope, tone and guardrails",
      "Approval points wherever the stakes are high",
    ],
  },
  {
    number: "03",
    title: "Deploy",
    description:
      "We connect your systems, configure the workflows and put your AI workforce to work in production.",
    detail: [
      "Integration and access setup with least privilege",
      "Assistant configuration and testing",
      "Team walkthrough and handover documentation",
    ],
  },
  {
    number: "04",
    title: "Optimise",
    description:
      "We monitor how the system performs, fix what breaks and extend it as your operation changes.",
    detail: [
      "Run reviews on real output, not dashboards alone",
      "Tighten prompts, rules and routing",
      "Add the next workflow once the first is stable",
    ],
  },
] as const
