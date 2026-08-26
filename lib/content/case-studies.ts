/**
 * Client stories.
 *
 * Every entry below is content the business has published about real named
 * clients — their words and their reported outcomes. Nothing here is invented,
 * and no aggregate statistics are derived from it. Detailed before/after
 * engagement write-ups are still being documented; until they exist, the
 * case studies page shows an honest placeholder rather than filler.
 */

export interface ClientStory {
  name: string
  role: string
  company: string
  industry: string
  /** Client-reported. Presented as their claim, never as a Nolojia metric. */
  timeSaved: string
  headline: string
  quote: string
  outcomes: string[]
}

export const CLIENT_STORIES: ClientStory[] = [
  {
    name: "Sarah K.",
    role: "Founder",
    company: "The 1% Woman Coach",
    industry: "Coaching",
    timeSaved: "22 hrs/week",
    headline: "My inbox went from anxiety to zero.",
    quote:
      "I used to start every Monday dreading my inbox. Within two weeks of working with my Nolojia assistant, that was completely gone. She manages everything — triage, drafts, follow-ups — and I only see what genuinely needs my attention.",
    outcomes: ["Inbox triaged daily", "Calendar conflicts eliminated", "Faster client response times"],
  },
  {
    name: "James O.",
    role: "CEO",
    company: "Meridian Consulting Group",
    industry: "Consulting",
    timeSaved: "18 hrs/week",
    headline: "My assistant knew my business in two weeks.",
    quote:
      "I was deeply skeptical about delegating. I'd tried VAs before and always ended up doing things myself anyway. This was completely different. Within two weeks, my assistant understood the nuances of my business better than some people who'd been on my team for months.",
    outcomes: ["Full calendar ownership from week one", "Research produced proactively", "Client prep always ready"],
  },
  {
    name: "Priya M.",
    role: "Co-founder",
    company: "Stackline SaaS",
    industry: "Technology",
    timeSaved: "25 hrs/week",
    headline: "Like having a whole ops team at a fraction of the cost.",
    quote:
      "The AI-assisted workflows our assistant built for us save hours every single day. What used to take our team an entire morning is done before 9am. We've scaled operations without scaling headcount.",
    outcomes: ["Four recurring workflows automated", "CRM kept up to date", "Operations scaled without new headcount"],
  },
  {
    name: "David H.",
    role: "CFO",
    company: "Auckland Flying School",
    industry: "Aviation",
    timeSaved: "15 hrs/week",
    headline: "A difference from the very first week.",
    quote:
      "Just a couple of weeks in and my assistant is making a massive difference. The scheduling alone — coordinating flights, instructors, and student bookings — would take me hours. Now it's handled.",
    outcomes: ["Complex scheduling managed end to end", "Vendor communication handled", "More time on finance work"],
  },
  {
    name: "Mitch S.",
    role: "Co-founder",
    company: "NSBA Group",
    industry: "Business services",
    timeSaved: "20 hrs/week",
    headline: "She took the initiative before I even asked.",
    quote:
      "What impressed me most wasn't what she did when I asked — it was what she did before I asked. She saw a gap in our follow-up process, flagged it, and had a solution ready. That level of proactiveness is rare.",
    outcomes: ["Follow-up process rebuilt", "Gaps flagged proactively", "New SOP documentation created"],
  },
  {
    name: "Keri F.",
    role: "Founder",
    company: "Apex Growth Partners",
    industry: "Growth consulting",
    timeSaved: "28 hrs/week",
    headline: "My company has grown because of this support.",
    quote:
      "I'm not exaggerating when I say my company has grown and is thriving thanks to the support I get from Nolojia. Having someone fully own the operational side freed me to do what I do best: sell, advise, and serve clients.",
    outcomes: ["Operational ownership handed over", "Client capacity increased", "Founder time returned to sales"],
  },
]

/**
 * Structured engagement write-ups (problem → before → what we built → after).
 * Deliberately empty: we publish these only once the numbers are verified with
 * the client. The page renders a documented placeholder while this is empty.
 */
export interface EngagementCaseStudy {
  slug: string
  client: string
  industry: string
  problem: string
  before: string
  solution: string[]
  after: string
  results: { label: string; value: string }[]
}

export const ENGAGEMENT_CASE_STUDIES: EngagementCaseStudy[] = []
