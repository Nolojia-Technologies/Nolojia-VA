import type { IconName } from "@/components/site/icon"

export interface AIEmployee {
  id: string
  icon: IconName
  name: string
  role: string
  summary: string
  handles: string[]
  /** A representative exchange rendered in the product UI mock. */
  sample: {
    prompt: string
    reply: string
    actions: { label: string; detail: string }[]
  }
  /** Where a person stays in the loop. Stated plainly, never hidden. */
  humanInTheLoop: string
  cta: string
}

export const AI_EMPLOYEES: AIEmployee[] = [
  {
    id: "executive",
    icon: "Briefcase",
    name: "Executive AI Assistant",
    role: "Keeps the day running",
    summary:
      "Triages your inbox, protects your calendar and makes sure the follow-up you promised actually happens.",
    handles: ["Email", "Calendar", "Meetings", "Research", "Follow-ups", "Travel coordination"],
    sample: {
      prompt: "Prepare tomorrow's meeting schedule.",
      reply:
        "Done. I reviewed tomorrow's calendar, moved the one conflicting appointment, drafted an agenda for each meeting and notified the participants.",
      actions: [
        { label: "Calendar", detail: "Moved 11:00 vendor call to 15:30" },
        { label: "Docs", detail: "Agenda drafted for 3 meetings" },
        { label: "Email", detail: "4 participants notified" },
      ],
    },
    humanInTheLoop:
      "Anything that changes a commitment to a client, or leaves your organisation for the first time, is queued for your approval.",
    cta: "Explore Executive AI",
  },
  {
    id: "sales",
    icon: "Target",
    name: "Sales AI",
    role: "Never lets a lead go cold",
    summary:
      "Qualifies inbound leads against your criteria, keeps the CRM accurate and runs the follow-up sequence on time.",
    handles: [
      "Lead qualification",
      "Follow-ups",
      "CRM updates",
      "Outreach",
      "Meeting scheduling",
      "Pipeline management",
    ],
    sample: {
      prompt: "New enquiry from a 40-person logistics company.",
      reply:
        "Qualified against your ICP — good fit. I created the CRM record, drafted a personalised reply and put a follow-up on the calendar for Thursday.",
      actions: [
        { label: "CRM", detail: "Deal created · stage: Qualified" },
        { label: "Email", detail: "Personalised reply drafted" },
        { label: "Task", detail: "Follow-up scheduled Thu 09:00" },
      ],
    },
    humanInTheLoop:
      "Pricing, discounts and proposals are drafted for a person to review — never sent automatically.",
    cta: "Explore Sales AI",
  },
  {
    id: "support",
    icon: "LifeBuoy",
    name: "Customer Support AI",
    role: "Answers fast, escalates well",
    summary:
      "Handles the questions your team answers every week, and routes everything else to the right person with context attached.",
    handles: ["Customer questions", "Support requests", "FAQs", "Ticket routing", "Onboarding", "Escalations"],
    sample: {
      prompt: "Customer asks why their invoice looks different this month.",
      reply:
        "Answered from your billing knowledge base, attached the itemised breakdown and flagged the ticket for finance because the amount changed by more than 20%.",
      actions: [
        { label: "Ticket", detail: "Replied · resolution time 40s" },
        { label: "Routing", detail: "Flagged to finance for review" },
        { label: "KB", detail: "Gap logged for a new article" },
      ],
    },
    humanInTheLoop:
      "Refunds, complaints and anything outside the knowledge base go to a person with the full thread attached.",
    cta: "Explore Support AI",
  },
  {
    id: "operations",
    icon: "Settings2",
    name: "Operations AI",
    role: "Keeps the back office moving",
    summary:
      "Handles the structured, high-volume work that quietly consumes your team — data, documents, reporting and coordination.",
    handles: [
      "Data entry",
      "Reports",
      "Documentation",
      "Internal workflows",
      "Task coordination",
      "Process management",
    ],
    sample: {
      prompt: "Close out this week's operations report.",
      reply:
        "Pulled the numbers from your database and project tool, built the weekly report, highlighted the two metrics that moved more than 10% and shared it with the ops channel.",
      actions: [
        { label: "Data", detail: "142 records reconciled" },
        { label: "Report", detail: "Weekly summary generated" },
        { label: "Slack", detail: "Posted to #operations" },
      ],
    },
    humanInTheLoop:
      "Anything that writes to a system of record follows a rule set you define, and exceptions stop for review.",
    cta: "Explore Operations AI",
  },
]
