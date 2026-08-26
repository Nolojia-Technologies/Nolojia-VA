import { Globe, Heart, Shield, Sparkles, Users, Zap } from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { Reveal } from "@/components/site/reveal"
import { PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"
import { RoleList } from "./RoleList"

import { jobs } from "@/lib/careers/jobs"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Careers",
  description:
    "Open roles at Nolojia. Remote-first, worldwide, across operations, creative and growth support — building AI systems that take repetitive work off businesses.",
  path: "/careers",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Careers", href: "/careers" },
]

const CAREERS_EMAIL = "careers@nolojia.com"

const WHY = [
  {
    icon: Globe,
    title: "Remote, worldwide",
    body: "Work from wherever you are. We care about output, not which timezone you opened your laptop in.",
  },
  {
    icon: Zap,
    title: "AI-first by default",
    body: "Everyone here works with AI tooling. You will learn it properly rather than being told to figure it out.",
  },
  {
    icon: Users,
    title: "Work that lands",
    body: "You see the effect on the businesses you support. Nothing here disappears into a process nobody reads.",
  },
  {
    icon: Heart,
    title: "No micromanagement",
    body: "Clear expectations, real support, and the room to do the job the way it should be done.",
  },
  {
    icon: Shield,
    title: "Stability and growth",
    body: "Consistent work, fair pay, and a route into more senior responsibility as the company grows.",
  },
  {
    icon: Sparkles,
    title: "High standards",
    body: "We hire carefully and hold a real bar. Working alongside people who care makes everyone better.",
  },
]

const VALUES = [
  {
    number: "01",
    title: "Ownership",
    body: "We take responsibility for outcomes, not just tasks. If something is broken, we fix it. If something can be better, we improve it.",
  },
  {
    number: "02",
    title: "Client obsession",
    body: "Every decision passes one filter: does this make the client's operation genuinely better?",
  },
  {
    number: "03",
    title: "Radical reliability",
    body: "We do what we said, when we said. Deadlines are not suggestions when someone's business depends on them.",
  },
  {
    number: "04",
    title: "Honest by default",
    body: "We tell clients when automation is the wrong answer, and we tell each other when work is not good enough yet.",
  },
]

const PROCESS = [
  {
    step: "01",
    title: "Application",
    body: "Apply on the role page. Every application is read by a person.",
  },
  {
    step: "02",
    title: "Intro call",
    body: "A 20-minute conversation about your experience and what you are looking for.",
  },
  {
    step: "03",
    title: "Practical task",
    body: "A short, paid task relevant to the role — under two hours of your time.",
  },
  {
    step: "04",
    title: "Offer and onboarding",
    body: "If it is a match we move quickly, and you get a proper onboarding rather than a login and good luck.",
  },
]

export default function CareersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Careers"
        title="Build the systems businesses actually run on."
        description="Nolojia is remote-first and hiring across operations, creative and growth support. We want people who take ownership, move fast and care whether the work landed."
        crumbs={CRUMBS}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="#open-roles">See open roles</CtaLink>
          <CtaLink
            href={`mailto:${CAREERS_EMAIL}?subject=General%20application`}
            variant="secondary"
          >
            Send a general application
          </CtaLink>
        </div>
      </PageHero>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Life at Nolojia"
            title="Why people stay."
            description="A remote-first company that believes good work deserves good support, fair pay and the freedom to do it properly."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((item, i) => {
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

      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink opacity-60 mask-fade" />
        <Container className="relative">
          <SectionHeading onInk eyebrow="Our values" title="What we stand for." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <Reveal key={value.number} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span className="font-mono text-sm font-semibold text-brand">{value.number}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="open-roles" tone="surface" className="scroll-mt-20">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Open positions"
            title="Find your role."
            description="All roles are fully remote and open worldwide. Expand any role for the full detail and apply directly."
          />
          <div className="mt-12">
            <RoleList roles={jobs} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Our process"
            title="How we hire."
            description="Straightforward, respectful and quick. We do not run five rounds of interviews."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <span className="font-mono text-sm font-semibold text-brand">{step.step}</span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-grid-ink mask-fade" />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-display-sm font-semibold text-white">
              Don&rsquo;t see the right role?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">
              Send your CV and a note about what you do well. We keep good applications on file and
              get in touch when something opens.
            </p>
            <div className="mt-8 flex justify-center">
              <CtaLink
                href={`mailto:${CAREERS_EMAIL}?subject=General%20application`}
                size="lg"
                onInk
              >
                Send a general application
              </CtaLink>
            </div>
            <p className="mt-6 text-sm text-white/40">
              We respond to every application within five business days.
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
