// Shared job data — used by careers listing page and individual job detail pages

export interface Job {
  slug: string
  title: string
  department: string
  type: string
  location: string
  shortDescription: string
  description: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  benefits: string[]
}

export const jobs: Job[] = [
  {
    slug: "executive-virtual-assistant",
    title: "Executive Virtual Assistant",
    department: "VA Services",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Support high-growth founders and executives with inbox management, calendar ownership, travel coordination, and day-to-day task execution.",
    description:
      "As an Executive Virtual Assistant at Nolojia, you'll be the right hand of a high-growth founder or executive — managing their inbox, owning their calendar, and running the operational details that keep their business moving. This is a high-trust, high-ownership role for someone who thrives on clarity, speed, and being two steps ahead.",
    responsibilities: [
      "Manage executive inboxes — triage, respond, and escalate with full context",
      "Own calendar management across multiple time zones without gaps or conflicts",
      "Coordinate travel logistics: flights, hotels, ground transport, and itineraries",
      "Prepare briefing documents, meeting agendas, and post-meeting action items",
      "Handle personal and professional administrative tasks with discretion",
      "Liaise with internal teams and external stakeholders on behalf of the executive",
      "Track deadlines, project milestones, and recurring deliverables",
    ],
    requirements: [
      "3+ years of experience as a VA or executive assistant",
      "Exceptional written and verbal communication in English",
      "Proficiency with Google Workspace, Notion, Slack, and Zoom",
      "Strong organisational skills and obsessive attention to detail",
      "Ability to work independently across multiple competing priorities",
    ],
    niceToHave: [
      "Experience with CRM tools (HubSpot, Salesforce, etc.)",
      "Familiarity with AI productivity tools and automation",
      "Background supporting startup founders or C-suite executives",
    ],
    benefits: [
      "Competitive monthly retainer — paid reliably, every month",
      "100% remote — work from anywhere in the world",
      "Access to Nolojia's full AI productivity tool stack",
      "Dedicated team support and senior mentorship",
      "Clear path to Senior VA and Team Lead roles",
      "Paid skills assessment — we respect your time",
    ],
  },
  {
    slug: "ecommerce-virtual-assistant",
    title: "E-commerce Virtual Assistant",
    department: "VA Services",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Manage day-to-day e-commerce operations for clients across Shopify, Amazon, Etsy, and other platforms.",
    description:
      "As an E-commerce Virtual Assistant at Nolojia, you'll be the operational backbone of fast-growing e-commerce brands. You'll manage product listings, process orders, handle customer service, and keep inventory data accurate — across multiple client stores simultaneously.",
    responsibilities: [
      "Create, optimise, and update product listings across Shopify, Amazon, Etsy, and similar platforms",
      "Process orders, handle returns, and resolve shipping issues promptly",
      "Monitor and manage inventory levels — flag stock issues proactively",
      "Handle customer service inquiries and resolve issues professionally",
      "Track key store metrics: conversion rates, order volume, and return rates",
      "Coordinate with suppliers and fulfilment partners as needed",
      "Produce weekly performance reports for client review",
    ],
    requirements: [
      "2+ years of experience in e-commerce operations",
      "Hands-on experience with Shopify, Amazon Seller Central, or similar platforms",
      "Strong customer service instincts and attention to order accuracy",
      "Ability to manage multiple client stores simultaneously",
      "Comfortable with data entry, inventory tracking, and spreadsheets",
    ],
    niceToHave: [
      "Experience with e-commerce analytics and performance reporting",
      "Knowledge of SEO for product listings",
      "Familiarity with fulfilment tools like ShipStation or Linnworks",
    ],
    benefits: [
      "Competitive monthly retainer — paid reliably",
      "100% remote — work from anywhere",
      "Access to Nolojia's AI productivity tool stack",
      "Exposure to multiple e-commerce brands and business models",
      "Clear path to Senior E-commerce Specialist roles",
      "Paid skills assessment",
    ],
  },
  {
    slug: "social-media-virtual-assistant",
    title: "Social Media Virtual Assistant",
    department: "Creative Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Plan, create, and schedule content across multiple social platforms while growing community engagement for our clients.",
    description:
      "As a Social Media Virtual Assistant at Nolojia, you'll be the creative engine behind our clients' online presence. You'll develop content strategies, produce engaging posts, schedule consistently, and build authentic community engagement — across Instagram, LinkedIn, Facebook, X, and beyond.",
    responsibilities: [
      "Develop monthly content calendars aligned to each client's brand voice and business goals",
      "Write compelling captions, hooks, and copy across all major social platforms",
      "Source and create graphics and visuals using Canva or client-approved design tools",
      "Schedule content using Buffer, Later, Hootsuite, or native platform tools",
      "Monitor comments and DMs — engage authentically and promptly",
      "Track performance metrics and deliver monthly analytics reports",
      "Stay current on platform algorithm changes, trends, and best practices",
    ],
    requirements: [
      "2+ years managing social media for brands or businesses",
      "Strong copywriting skills and a keen eye for visual aesthetics",
      "Experience with scheduling tools like Buffer, Later, or Hootsuite",
      "Deep understanding of platform algorithms and content best practices",
      "Ability to maintain a consistent brand voice across multiple channels",
    ],
    niceToHave: [
      "Graphic design skills (Canva or Adobe Creative Suite)",
      "Experience with paid social advertising (Meta Ads, LinkedIn Ads)",
      "Video editing or short-form video production experience",
    ],
    benefits: [
      "Competitive monthly retainer",
      "100% remote",
      "Creative freedom within brand guidelines",
      "Access to premium social media tools",
      "Opportunity to manage high-profile brand accounts",
      "Paid skills assessment",
    ],
  },
  {
    slug: "content-writer-copywriter",
    title: "Content Writer & Copywriter",
    department: "Creative Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Write compelling blog posts, website copy, email sequences, and marketing content for a diverse roster of clients.",
    description:
      "As a Content Writer & Copywriter at Nolojia, you'll produce high-quality written content that converts and connects — from long-form SEO blog articles to punchy website copy and automated email sequences. You'll work with a diverse client roster across industries, adapting your voice to match each brand while consistently delivering content that gets results.",
    responsibilities: [
      "Write SEO-optimised blog posts and long-form articles (1,000–3,000 words) that rank and convert",
      "Craft website copy, landing pages, and product descriptions that drive action",
      "Develop email sequences — welcome flows, nurture campaigns, re-engagement, and promos",
      "Write social media content and ad copy as required",
      "Conduct research to produce accurate, authoritative content across industries",
      "Adapt tone and voice precisely to each client's brand identity",
      "Revise and refine content efficiently based on structured client feedback",
    ],
    requirements: [
      "3+ years of professional copywriting or content writing experience",
      "Exceptional command of English grammar, tone, and style",
      "Ability to adapt writing voice across different brands and audiences",
      "Solid understanding of SEO fundamentals and keyword integration",
      "Strong research skills to produce accurate, expert-level content",
    ],
    niceToHave: [
      "Experience writing for B2B SaaS, e-commerce, or professional services",
      "Familiarity with Surfer SEO, Grammarly, or Hemingway Editor",
      "Email marketing experience (Mailchimp, Klaviyo, ActiveCampaign)",
    ],
    benefits: [
      "Competitive monthly retainer",
      "100% remote",
      "Diverse client roster — no two projects are the same",
      "Build a powerful portfolio while getting paid",
      "Creative freedom with structured editorial support",
      "Paid skills assessment",
    ],
  },
  {
    slug: "lead-generation-specialist",
    title: "Lead Generation Specialist",
    department: "Growth Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Build and fuel our clients' sales pipelines through targeted prospecting, personalised outreach, and systematic lead qualification.",
    description:
      "As a Lead Generation Specialist at Nolojia, you'll build and manage the top of the funnel for our clients' sales pipelines. You'll research and qualify prospects, craft personalised outreach campaigns, and manage sequences that generate real conversations — not just vanity metrics.",
    responsibilities: [
      "Build highly targeted prospect lists based on client ICP (Ideal Customer Profile)",
      "Research companies and decision-makers using LinkedIn Sales Navigator and prospecting tools",
      "Write personalised cold email sequences and strategic follow-up campaigns",
      "Manage outreach sequences using Apollo, Instantly, Lemlist, or similar tools",
      "Qualify inbound and outbound leads against client-defined criteria",
      "Maintain accurate CRM records and rigorous data hygiene",
      "Report weekly on outreach performance: open rates, reply rates, and pipeline progress",
    ],
    requirements: [
      "2+ years of experience in lead generation or sales development",
      "Proficiency with LinkedIn Sales Navigator and prospecting tools",
      "Experience writing cold outreach emails and follow-up sequences",
      "Strong data hygiene practices and CRM management skills",
      "Ability to qualify leads based on well-defined ICP criteria",
    ],
    niceToHave: [
      "Hands-on experience with Apollo, Hunter.io, or Instantly",
      "Background in B2B sales or business development",
      "Familiarity with HubSpot, Pipedrive, or similar CRM platforms",
    ],
    benefits: [
      "Competitive monthly retainer",
      "100% remote",
      "Performance-based bonuses available",
      "Access to premium prospecting tools — fully covered",
      "Opportunity to build expertise across multiple industries",
      "Paid skills assessment",
    ],
  },
  {
    slug: "client-success-manager",
    title: "Client Success Manager",
    department: "Operations",
    type: "Full-Time",
    location: "Remote — Worldwide",
    shortDescription:
      "Own the client relationship from onboarding through long-term retention, ensuring every client has a seamless Nolojia experience.",
    description:
      "As a Client Success Manager at Nolojia, you'll own the client relationship end-to-end. From onboarding through long-term retention, you'll ensure every client receives maximum value from their VA, monitor service quality proactively, and resolve any issues before they become problems. You'll be the human face of Nolojia's service quality commitment.",
    responsibilities: [
      "Onboard new clients — set expectations, introduce their VA, and establish workflows from day one",
      "Run regular check-in calls to gauge satisfaction and identify expansion opportunities",
      "Monitor VA performance and intervene early when quality issues arise",
      "Handle escalations swiftly and professionally — turning problems into loyalty moments",
      "Track client health metrics: satisfaction scores, retention rate, and account expansion",
      "Coordinate upsells and service expansions with the sales team",
      "Gather structured client feedback and relay insights to the operations team",
    ],
    requirements: [
      "3+ years in customer success, account management, or client services",
      "Outstanding communication and relationship-building skills",
      "Experience managing 15+ accounts simultaneously",
      "Proactive, solutions-first mindset with a strong bias for action",
      "Comfortable operating in a fast-paced, fully remote environment",
    ],
    niceToHave: [
      "Experience at a VA agency, BPO, or outsourcing company",
      "Familiarity with CRM and helpdesk tools (HubSpot, Intercom, Zendesk)",
      "Background in operations or project management",
    ],
    benefits: [
      "Competitive monthly salary",
      "100% remote",
      "High-impact role — you directly shape how clients experience Nolojia",
      "Direct path to Head of Client Success as we scale",
      "Strong internal support — you won't be doing this alone",
      "Paid skills assessment",
    ],
  },
]

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug)
}

export function getStaticJobSlugs(): { slug: string }[] {
  return jobs.map((j) => ({ slug: j.slug }))
}
