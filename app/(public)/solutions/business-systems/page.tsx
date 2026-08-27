import {
  BarChart3,
  Boxes,
  Database,
  LayoutDashboard,
  MonitorSmartphone,
  Plug,
  Wrench,
} from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { SystemDiagram } from "@/components/site/system-diagram"
import { CtaSection, IntegrationsSection, PageHero, SecuritySection } from "@/components/site/sections"
import { ProcessSection } from "@/components/site/process"
import JsonLd from "@/components/seo/JsonLd"

import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, solutionSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Business Systems",
  description:
    "Internal dashboards, client portals, databases, reporting and custom tools — built around how your business works, connected to the software you use.",
  path: "/solutions/business-systems",
  keywords: ["custom business systems", "internal tools", "client portal", "systems integration"],
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Solutions", href: "/solutions" },
  { name: "Business Systems", href: "/solutions/business-systems" },
]

const BUILDS = [
  {
    icon: LayoutDashboard,
    title: "Internal dashboards",
    body: "One screen that answers the questions your team currently answers by opening four tabs and a spreadsheet.",
  },
  {
    icon: Boxes,
    title: "Workflow systems",
    body: "The process itself, made explicit: stages, owners, deadlines and handoffs that do not depend on someone remembering.",
  },
  {
    icon: Database,
    title: "Databases",
    body: "A proper store for the information your business runs on, instead of five spreadsheets that disagree with each other.",
  },
  {
    icon: MonitorSmartphone,
    title: "Business portals",
    body: "A place for clients, partners or staff to see what they need without emailing someone to ask for it.",
  },
  {
    icon: Wrench,
    title: "Custom internal tools",
    body: "The small application that removes an hour a day of manual work — the one no off-the-shelf product will ever build for you.",
  },
  {
    icon: BarChart3,
    title: "Reporting",
    body: "Numbers assembled automatically from the systems that hold them, delivered where your team already looks.",
  },
]

const SIGNALS = [
  "The same information is entered into more than one system by hand.",
  "Reporting means exporting to a spreadsheet every week.",
  "Your process lives in someone's head or a document nobody opens.",
  "Two teams keep separate versions of the same list.",
  "A tool you pay for is used at ten percent because it does not fit how you work.",
]

export default function BusinessSystemsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={solutionSchema({
          name: "Business Systems",
          description:
            "Design and build of internal dashboards, portals, databases, reporting and custom internal tools integrated with a business's existing software.",
          path: "/solutions/business-systems",
          serviceType: "Custom software and systems integration",
        })}
      />

      <PageHero
        eyebrow="Business systems"
        title="Connect your people, tools and data."
        description="Nolojia builds systems around the way your business already works, instead of forcing your business into generic software."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={CTA.primary.href}>{CTA.primary.label}</CtaLink>
          <CtaLink href="#what-we-build" variant="secondary">
            What we build
          </CtaLink>
        </div>
      </PageHero>

      <Section>
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeading
                eyebrow="The systems layer"
                title="Nolojia sits across the stack, not beside it."
                description="An isolated automation solves one task. A system solves the joins — so the CRM, the inbox, the calendar, the database and the reporting all describe the same reality."
              />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                That is the difference between saving a few minutes and changing how the operation
                runs.
              </p>
            </div>
            <SystemDiagram />
          </div>
        </Container>
      </Section>

      <Section id="what-we-build" tone="surface">
        <Container>
          <SectionHeading
            eyebrow="What we build"
            title="Systems shaped like your business."
            description="Most engagements combine two or three of these. We build the smallest thing that fixes the problem, then extend it."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BUILDS.map((item, i) => {
              const Icon = item.icon
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="Signals"
              title="You probably need a system if…"
              description="These are the symptoms we hear most often in a first conversation. Any two of them usually means the tools are fine and the joins are missing."
            />
            <ul className="space-y-3">
              {SIGNALS.map((signal, i) => (
                <Reveal as="li" key={signal} delay={i * 0.05}>
                  <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
                    <Plug aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <p className="text-[0.9375rem] leading-relaxed text-foreground/85">{signal}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <IntegrationsSection onInk />

      <ProcessSection tone="surface" />

      <SecuritySection />

      <CtaSection
        eyebrow="Business systems"
        title="What is your business missing a system for?"
        description="Describe where the information falls apart. We will map the current state and design the smallest system that fixes it."
      />
    </>
  )
}
