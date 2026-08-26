import Link from "next/link"
import { AlertTriangle, KeyRound, Lock, Plug, ScrollText, UserRoundCheck } from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { COMPANY } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Security & Privacy",
  description:
    "How Nolojia handles authentication, access control, encryption, integrations, data and human oversight — including what we do not claim.",
  path: "/security",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Security", href: "/security" },
]

const PRACTICES = [
  {
    icon: KeyRound,
    title: "Authentication",
    body: "We connect to your systems through each platform's own sign-in and authorisation flow. We do not ask for or store shared account passwords, and access granted to Nolojia can be revoked by you at any time from your own admin console.",
  },
  {
    icon: Lock,
    title: "Access control",
    body: "Every integration is granted the narrowest scope its workflow needs — read-only where reading is enough, write access only where the process requires it. Access is reviewed when a workflow changes and removed when an engagement ends.",
  },
  {
    icon: Lock,
    title: "Encryption",
    body: "Connections between Nolojia systems and your platforms run over encrypted channels (TLS). Credentials and API keys are held as managed secrets in the hosting environment rather than in application code or repositories.",
  },
  {
    icon: Plug,
    title: "Controlled integrations",
    body: "Each connection is deliberate and documented: which system, which scope, which workflow it serves. We do not leave connections in place because they were convenient during a build.",
  },
  {
    icon: ScrollText,
    title: "Data protection",
    body: "We work inside your systems wherever possible rather than copying your data into new places. Where a workflow must store something, we agree what is stored, where it lives and how long it is kept before we build it.",
  },
  {
    icon: UserRoundCheck,
    title: "Human oversight",
    body: "Actions that commit your business stop for a person: pricing, contracts, refunds, first-time external communication, and anything the workflow was not designed to handle. AI drafts; a human releases.",
  },
]

const RESPONSIBLE_AI = [
  {
    title: "Scoped, not autonomous",
    body: "Assistants are configured for a defined role with explicit limits. We do not deploy AI that makes unsupervised commercial decisions on your behalf.",
  },
  {
    title: "Reviewable",
    body: "Actions taken by a workflow are logged so that when something goes wrong you can see what happened and correct the rule rather than guess.",
  },
  {
    title: "Honest about failure",
    body: "AI systems make mistakes. We design for that — approval steps, escalation paths and a person accountable for the outcome — rather than pretending it does not happen.",
  },
  {
    title: "Your data is yours",
    body: "We do not sell, share or repurpose your business data. It is used to run the workflows you asked for.",
  },
]

export default function SecurityPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={webPageSchema({
          name: "Security & Privacy",
          description:
            "Nolojia's security practices covering authentication, access control, encryption, integrations, data handling and human oversight.",
          path: "/security",
        })}
      />

      <PageHero
        eyebrow="Security"
        title="Built with business security in mind."
        description="AI that touches your inbox, your CRM and your customers has to be governed. This page says exactly how we handle that — and what we do not claim."
        crumbs={CRUMBS}
      />

      <Section>
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {PRACTICES.map((practice, i) => {
              const Icon = practice.icon
              return (
                <Reveal key={practice.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border bg-card p-6 sm:p-7">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-base font-semibold text-foreground">{practice.title}</h2>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                      {practice.body}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* What we do not claim — deliberately prominent */}
      <Section tone="surface">
        <Container>
          <div className="rounded-2xl border border-warning/25 bg-warning-soft p-7 sm:p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-warning" />
              <div className="max-w-2xl">
                <h2 className="text-lg font-semibold text-foreground">What we do not claim</h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground/80">
                  Nolojia does not currently hold SOC 2, ISO 27001, HIPAA or PCI DSS certification,
                  and we will never imply otherwise on this website. Plenty of companies decorate a
                  security page with badges they have not earned. We would rather you know where we
                  stand.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground/80">
                  If your procurement process requires a specific framework, tell us at the first
                  conversation. We will be straight with you about which of your controls we can meet
                  today and which we cannot.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Responsible AI"
            title="How we use AI on your business."
            description="Security is not only about who can access what. With AI systems it is also about what the system is permitted to decide."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {RESPONSIBLE_AI.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading
            align="center"
            eyebrow="Reporting"
            title="Found a security issue?"
            description="If you believe you have found a vulnerability in a Nolojia product or system, tell us before you tell anyone else and we will work with you on it."
          />
          <div className="mt-8 flex flex-col items-center gap-4">
            <CtaLink href={`mailto:${COMPANY.email}?subject=Security%20report`} variant="secondary">
              {COMPANY.email}
            </CtaLink>
            <p className="text-sm text-muted-foreground">
              See also our{" "}
              <Link href="/privacy" className="font-medium text-brand underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="font-medium text-brand underline-offset-4 hover:underline">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>

      <CtaSection
        eyebrow="Security"
        title="Have security questions before you start?"
        description="Ask them now rather than at contract stage. We would rather lose a deal on honesty than win one on a claim we cannot back."
      />
    </>
  )
}
