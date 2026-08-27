import type { FaqItem } from "./faq"

/**
 * Answer-first copy for the solution pages.
 *
 * Kept as data next to the FAQ content rather than inline in each page, because
 * every one of these strings is used twice: once as visible text and once
 * inside JSON-LD. Reading both from one place is what keeps the structured data
 * an accurate description of the page rather than a second, drifting copy of it.
 *
 * `definition` is written to survive being quoted on its own, with no
 * surrounding page: one or two sentences, no pronouns pointing at earlier
 * paragraphs, no "we" without saying who.
 */
export interface SolutionAnswers {
  /** The term this page defines, as someone would search for it. */
  term: string
  /** One or two sentences. Must stand alone if extracted. */
  definition: string
  /** Four or five labelled facts — the page compressed to a summary card. */
  glance: { label: string; value: string }[]
  /** Question-headed sections, in the order a reader would ask them. */
  questions: { question: string; answer: string; detail?: string[] }[]
  /** Shown as a disclosure list and mirrored into FAQPage schema. */
  faqs: FaqItem[]
}

export const AI_EMPLOYEES_ANSWERS: SolutionAnswers = {
  term: "AI employee",
  definition:
    "An AI employee is an AI-powered system configured to perform a specific business role — such as executive support, sales, customer support or operations — using the company's existing tools, within rules a human defines. It handles the repetitive part of that role and passes anything sensitive to a person for approval.",
  glance: [
    {
      label: "What it is",
      value: "An AI assistant scoped to one role and connected to the tools that role works in.",
    },
    {
      label: "Who it is for",
      value:
        "Teams losing hours to inbox, scheduling, lead qualification, support triage or back-office admin.",
    },
    {
      label: "What it handles",
      value:
        "Drafting, sorting, qualifying, summarising, updating records and following defined workflows.",
    },
    {
      label: "What stays human",
      value:
        "Judgement calls, relationships, exceptions and anything you mark as requiring approval.",
    },
  ],
  questions: [
    {
      question: "What is an AI employee?",
      answer:
        "An AI employee is an AI-powered system configured to perform a specific business role using your existing tools, within rules you define.",
      detail: [
        "The difference from a general chatbot is scope. A chatbot answers whatever it is asked. An AI employee is given one job — the inbox, the pipeline, the support queue, the back office — with instructions, tone and limits written for that job, and access to the systems that job runs on.",
        "The difference from an autonomous agent is authority. An AI employee does not decide on its own what is worth doing. What it may act on, what it must draft for review, and what it must never touch are set before it goes live.",
      ],
    },
    {
      question: "What can an AI employee do?",
      answer:
        "It handles the repeatable parts of a role: drafting and sorting email, scheduling, qualifying inbound leads, triaging support requests, updating CRM records, and producing routine summaries and reports.",
      detail: [
        "The useful test is whether a task is repeatable and describable. If you can write down how a competent person would do it, it is a candidate. If the answer depends on knowing a client personally or on a judgement you would not delegate to a new hire, it is not.",
      ],
    },
    {
      question: "Can an AI employee work with the software we already use?",
      answer:
        "Yes. AI employees are connected to the tools a team already works in — email, calendar, CRM, helpdesk, databases and messaging — rather than adding another place to check.",
      detail: [
        "Where a tool has an API, it can be connected directly. Where it does not, the workflow is usually rebuilt around the parts that can be, rather than forcing an integration that will break.",
      ],
    },
    {
      question: "What is the difference between an AI assistant and an AI agent?",
      answer:
        "An AI assistant responds to requests and works within a defined scope. An AI agent plans and takes multi-step actions towards a goal with less step-by-step direction. Nolojia's AI employees sit closer to the assistant end deliberately, because bounded behaviour is auditable and unbounded behaviour is not.",
    },
  ],
  faqs: [
    {
      question: "How long does it take to deploy an AI employee?",
      answer:
        "It depends on how many systems it needs to touch and how clearly the process is already defined. A single well-understood workflow is a much shorter piece of work than a role spanning four tools with rules nobody has written down. We scope it before quoting rather than after.",
    },
    {
      question: "What happens when the AI gets something wrong?",
      answer:
        "Actions are logged, so you can see what happened and why. Most errors trace back to a rule that was ambiguous rather than a model that malfunctioned, and the fix is to tighten the rule. Anything you have marked as requiring approval never reaches a customer without a person seeing it first.",
    },
    {
      question: "Does an AI employee replace the person doing the job now?",
      answer:
        "In the engagements we run, it takes the repetitive portion of a role so the person can spend their time on the part that needs them. Where a role is almost entirely repetitive, that changes the shape of the job — which is a decision for you, and one worth making deliberately rather than discovering later.",
    },
    {
      question: "Who can see our data?",
      answer:
        "An AI employee is given access to the systems its role requires and no more. Scope is agreed before anything is connected. See the security page for how business information is handled.",
    },
  ],
}

export const AUTOMATION_ANSWERS: SolutionAnswers = {
  term: "AI automation",
  definition:
    "AI automation is the use of software and AI models to carry out defined business workflows end to end — a trigger starts the process, AI interprets the information, connected tools perform the action, and the result is verified or escalated to a person.",
  glance: [
    {
      label: "What it is",
      value: "Workflows that run themselves, with AI handling the steps that need interpretation.",
    },
    {
      label: "Who it is for",
      value: "Businesses repeating the same multi-step process by hand every week.",
    },
    {
      label: "What it automates",
      value: "Email handling, CRM updates, reporting, onboarding, intake, routing and follow-up.",
    },
    {
      label: "What it does not",
      value:
        "Processes nobody has agreed on yet. Automating an unclear process makes it fail faster.",
    },
  ],
  questions: [
    {
      question: "What is AI automation?",
      answer:
        "AI automation is the use of software and AI models to carry out defined business workflows end to end, with human review at the points where it matters.",
      detail: [
        "Traditional automation follows fixed rules: if this field equals that value, do this. It breaks the moment reality is untidy — a message phrased unusually, an attachment in the wrong format, a request that spans two categories.",
        "AI automation adds a step that can interpret. The rules still decide what is allowed to happen; the model decides what the incoming thing actually is. That combination handles the messy middle that pure rules could not.",
      ],
    },
    {
      question: "How does AI automation work?",
      answer:
        "Every workflow has the same five parts: a trigger, AI interpretation, an action taken in a connected tool, a verification step, and a result that is either completed or escalated to a person.",
      detail: [
        "1. **Trigger** — an email arrives, a form is submitted, a record changes, or a schedule fires.",
        "2. **Interpretation** — the model reads the input and decides what it is: which category, which customer, which priority, what is being asked.",
        "3. **Action** — the connected tool does the thing: a record is updated, a reply is drafted, a task is created, a document is generated.",
        "4. **Verification** — the result is checked against the rules for that workflow.",
        "5. **Result** — it completes, or it is escalated to a person with the context already assembled.",
      ],
    },
    {
      question: "What business tasks can AI automate?",
      answer:
        "The strongest candidates are high-volume, well-defined and low-ambiguity: inbound enquiry routing, lead qualification, CRM data entry, invoice and document handling, recurring reports, onboarding sequences and support triage.",
    },
    {
      question: "What should not be automated?",
      answer:
        "Anything where being wrong is expensive and hard to reverse, anything requiring a relationship, and any process the business has not actually agreed on. Automating a process nobody agrees on does not settle the disagreement — it just produces the wrong answer faster and at scale.",
    },
  ],
  faqs: [
    {
      question: "How is this different from tools like Zapier?",
      answer:
        "Rule-based connectors are excellent at moving structured data between systems, and we use that approach where it fits. The difference is the interpretation step: when the input is unstructured — an email in someone's own words, a document in an unexpected format — rules alone cannot classify it reliably, and that is where a model earns its place.",
    },
    {
      question: "What happens when a workflow fails?",
      answer:
        "It escalates to a person rather than failing silently, with the context already gathered so the handoff is useful. A workflow that cannot explain why it stopped is a workflow that will be switched off within a month.",
    },
    {
      question: "How much does AI automation cost?",
      answer:
        "It depends on the number of workflows, the systems involved and how much of the process is already documented. We scope the work first and quote against that scope, because a single well-defined workflow and a redesign of an entire operation are not the same project.",
    },
    {
      question: "Do we need to replace our existing software?",
      answer:
        "Usually not. Most of the value comes from connecting what you already pay for. Replacing a tool is a decision worth making on its own merits, not as a side effect of an automation project.",
    },
  ],
}

export const BUSINESS_SYSTEMS_ANSWERS: SolutionAnswers = {
  term: "Business system",
  definition:
    "A business system is a connected set of tools, data and workflows built around how a specific company actually operates — internal dashboards, client portals, databases and reporting that share one source of truth instead of sitting in separate applications.",
  glance: [
    {
      label: "What it is",
      value: "Connected tools and data built around one operation, not a shelf of separate apps.",
    },
    {
      label: "Who it is for",
      value:
        "Businesses whose information lives in spreadsheets, inboxes and four tools that disagree.",
    },
    {
      label: "What it includes",
      value: "Internal dashboards, client portals, databases, reporting and custom internal tools.",
    },
    {
      label: "What it replaces",
      value: "Manual reconciliation between systems, and the reports nobody trusts.",
    },
  ],
  questions: [
    {
      question: "What is a business system?",
      answer:
        "A business system is a connected set of tools, data and workflows built around how a specific company operates, so that information entered once is available everywhere it is needed.",
      detail: [
        "The distinction that matters is between software tools and a system. A tool does one job well and knows nothing about the rest of your operation. A system is what you get when those jobs are joined up: the same customer record behind the quote, the project, the invoice and the report.",
        "Most businesses do not lack tools. They lack the connective tissue between them, which is why the same information gets typed in three times and the three copies stop agreeing.",
      ],
    },
    {
      question: "How is a business system different from buying more software?",
      answer:
        "Buying software adds capability. Building a system adds coherence. More tools without connection increases the number of places where your data can disagree with itself.",
    },
    {
      question: "How do you know you need one?",
      answer:
        "The usual signs are: the same data typed into more than one place, reports assembled by hand, questions about the business that take days to answer, and a spreadsheet that has quietly become critical infrastructure.",
    },
    {
      question: "Can a system be built around the tools we already use?",
      answer:
        "Usually yes, and that is normally the cheaper path. The work is connecting what you have and building only the parts that genuinely do not exist yet, rather than replacing a stack that mostly works.",
    },
  ],
  faqs: [
    {
      question: "Will we own what you build?",
      answer:
        "Ownership and access are agreed in writing before the work starts. A system you cannot maintain, export or hand to someone else is a liability regardless of how well it runs today.",
    },
    {
      question: "What happens if our process changes?",
      answer:
        "It will. Systems are built so the parts most likely to change — rules, thresholds, templates, routing — are configuration rather than code, so a change in how you work does not require a rebuild.",
    },
    {
      question: "How long does a build take?",
      answer:
        "It depends on how many systems are involved and how clearly the current process is understood. Discovery usually shows that part of what was asked for is not needed and part of what is needed was not asked for, which is why we scope before quoting.",
    },
    {
      question: "How is business data protected?",
      answer:
        "Access is scoped to what each role requires, credentials are held in managed secret storage rather than in code, and the security page sets out how business information is handled.",
    },
  ],
}

export const HUMAN_AI_ANSWERS: SolutionAnswers = {
  term: "Human + AI support",
  definition:
    "Human + AI support is an operating model in which AI systems handle high-volume repeatable work while trained people handle judgement, relationships, exceptions and accountability — both working from the same tools and the same information.",
  glance: [
    {
      label: "What it is",
      value: "Trained operators and AI systems running one operation together, not in parallel.",
    },
    {
      label: "Who it is for",
      value: "Operations where some of the work is repeatable and some genuinely is not.",
    },
    {
      label: "AI handles",
      value: "Volume, classification, summarising, drafting and defined workflows.",
    },
    {
      label: "People handle",
      value: "Judgement, relationships, exceptions, escalations and accountability.",
    },
  ],
  questions: [
    {
      question: "What is the difference between an AI assistant and a human assistant?",
      answer:
        "An AI assistant is consistent, immediate and unlimited in volume, but only within the scope it was given. A human assistant exercises judgement, handles the situations nobody anticipated, and can be held accountable for a decision.",
      detail: [
        "AI is good at repetitive work, classification, summarisation, structured workflows and processing information at a volume no person would want to.",
        "People are good at judgement, relationships, exceptions, empathy, complex decisions and accountability. Those are not gaps waiting to be closed by a better model — they are a different kind of work.",
      ],
    },
    {
      question: "How does Nolojia combine AI and human support?",
      answer:
        "The same operation runs on both. AI systems take the repeatable volume, trained operators take the work that needs a person, and the handoff between them is defined in advance rather than improvised.",
      detail: [
        "The handoff is the part that usually goes wrong elsewhere. If a person only finds out something needs them when a customer complains, the model was not the problem — the escalation path was.",
      ],
    },
    {
      question: "Does Nolojia provide human virtual assistants?",
      answer:
        "Yes. Trained operators run the parts of an operation that need judgement, relationships and accountability, working from the same systems we build.",
    },
  ],
  faqs: [
    {
      question: "Can we start with people and add AI later?",
      answer:
        "Yes, and it is often the better order. Running a process with a person first shows you what the rules actually are — which is exactly what you need before automating any of it.",
    },
    {
      question: "Who is accountable when work is shared between AI and people?",
      answer:
        "A person is. Automation changes who does the work, not who answers for it, and any engagement where that is left vague is one worth fixing before it starts.",
    },
    {
      question: "How do you decide what a person should keep?",
      answer:
        "By looking at what happens when it goes wrong. Work where an error is cheap and reversible is a good candidate for automation; work where an error costs a relationship or is hard to undo stays with a person, whatever the volume.",
    },
  ],
}
