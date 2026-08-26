import { CheckCircle2, Clock, MessageSquare, Users } from "lucide-react"

import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"
import { BookingLauncher } from "./BookingLauncher"

import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Book a call",
  description:
    "Book a 30-minute call with Nolojia. We will walk through your current process and tell you honestly what is worth automating — no pitch.",
  path: "/book",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Book a call", href: "/book" },
]

const EXPECT = [
  { icon: Clock, text: "30 minutes, focused on your actual process" },
  { icon: Users, text: "You speak to the people who would do the work" },
  { icon: MessageSquare, text: "We will say if automation is not the answer" },
  { icon: CheckCircle2, text: "No obligation and no follow-up sequence" },
]

const AGENDA = [
  {
    title: "What your week looks like",
    body: "Where the hours go, which tasks repeat, and which ones people dread.",
  },
  {
    title: "What is already in place",
    body: "The tools you pay for, what they are actually used for, and where the joins are missing.",
  },
  {
    title: "What is worth doing first",
    body: "A shortlist, in order, with an honest view of what each one would take.",
  },
]

export default function BookPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={webPageSchema({
          name: "Book a call with Nolojia",
          description: "Book a 30-minute discovery call about AI, automation and business systems.",
          path: "/book",
        })}
      />

      <PageHero
        eyebrow="Discovery call"
        title="Thirty minutes on your actual operation."
        description="No pitch and no pressure. An honest conversation about your business, where the time goes, and whether there is something here worth building."
        crumbs={CRUMBS}
      >
        <ul className="mt-8 space-y-3">
          {EXPECT.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-[0.9375rem] text-foreground/85">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
              {text}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <BookingLauncher />
          <CtaLink href="/contact" variant="secondary" size="lg">
            Write to us instead
          </CtaLink>
        </div>
      </PageHero>

      <Section tone="surface">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Agenda"
            title="What we will cover."
            description="Three questions. If the answers point somewhere other than Nolojia, we will say so."
          />
          <ol className="mt-10 space-y-4">
            {AGENDA.map((item, i) => (
              <li key={item.title} className="flex gap-5 rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft font-mono text-sm font-semibold text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6">
            <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">
              Prefer to describe it in writing first? The contact form asks the same questions and
              gets you a considered reply rather than a scheduling link.
            </p>
            <div className="mt-5">
              <CtaLink href={CTA.primary.href} variant="secondary">
                {CTA.primary.label}
              </CtaLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
