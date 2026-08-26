export interface FaqItem {
  question: string
  answer: string
}

export interface FaqSection {
  heading: string
  items: FaqItem[]
}

export const FAQ_SECTIONS: FaqSection[] = [
  {
    heading: "What Nolojia does",
    items: [
      {
        question: "What does Nolojia do?",
        answer:
          "We build AI assistants, automated workflows and connected business systems, and we provide trained human operators to run the parts of an operation that still need judgement. Most engagements combine two or more of those.",
      },
      {
        question: "What is an AI employee?",
        answer:
          "An AI assistant scoped to a specific role — executive support, sales, customer support or operations — and connected to the tools that role works in. It handles the repetitive part of the job, follows rules you define, and hands anything sensitive to a person for approval. It is not an autonomous agent making unsupervised decisions about your business.",
      },
      {
        question: "Do you still provide human virtual assistants?",
        answer:
          "Yes. Human operational support is one of our four service pillars. What changed is where people are pointed: at judgement, relationships, exception handling and accountability, with AI carrying the repetitive volume underneath.",
      },
      {
        question: "What types of businesses do you work with?",
        answer:
          "Small and mid-sized businesses and teams inside larger organisations, across services, technology, e-commerce, professional services and operations-heavy industries. The common thread is a team spending too many hours a week on work a system should be doing.",
      },
    ],
  },
  {
    heading: "Scope and delivery",
    items: [
      {
        question: "Can Nolojia automate our existing workflows?",
        answer:
          "That is usually where we start. We walk through the process with the people who run it, document the triggers, decisions and outputs, then rebuild it as an automated workflow with approval points wherever the stakes are high.",
      },
      {
        question: "Can Nolojia integrate with the tools we already use?",
        answer:
          "We build against the APIs and automation layers of the platforms you already pay for — Google Workspace, Microsoft 365, Slack, HubSpot, Salesforce, Notion, Shopify, QuickBooks, Zapier, Make and others. Each connection is configured for your setup rather than shipped as a generic connector. If something you use is not on that list, ask us.",
      },
      {
        question: "Can Nolojia build custom systems?",
        answer:
          "Yes — internal dashboards, client portals, databases, reporting and internal tools. We build systems around the way your business already works instead of forcing your process into generic software.",
      },
      {
        question: "How long does implementation take?",
        answer:
          "It depends on how many systems are involved and how clean the underlying process is. A single well-defined workflow is a much shorter engagement than a connected system spanning several tools. We scope timelines against your specific processes during discovery — we do not quote a number before we have seen the work.",
      },
    ],
  },
  {
    heading: "Security and oversight",
    items: [
      {
        question: "How does Nolojia handle security?",
        answer:
          "We use least-privilege access, connect through each platform's own authentication rather than shared credentials, keep integrations scoped to what a workflow actually needs, and keep a human in the loop on anything sensitive. Full detail is on our Security page.",
      },
      {
        question: "Where do humans stay involved?",
        answer:
          "On anything that commits your business: pricing, contracts, refunds, external communication going out for the first time, and any exception the system was not designed for. Those stop for review rather than being sent automatically.",
      },
      {
        question: "What happens to our data?",
        answer:
          "We work inside your systems wherever possible rather than copying your data somewhere new. Where a workflow needs to store something, we agree what is stored, where, and for how long before anything is built. See our Privacy Policy for the detail.",
      },
    ],
  },
]

export const FAQ_FLAT: FaqItem[] = FAQ_SECTIONS.flatMap((s) => s.items)
