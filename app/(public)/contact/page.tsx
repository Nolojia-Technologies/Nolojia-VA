import Link from "next/link"
import { CalendarDays, Clock, Mail, MapPin, Phone } from "lucide-react"

import { Container, Eyebrow, Section } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { ContactForm } from "@/components/site/contact-form"
import { Faq } from "@/components/site/faq"
import { PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { COMPANY } from "@/lib/content/site"
import { FAQ_SECTIONS } from "@/lib/content/faq"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/structured-data"

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you want to automate. Describe the process that eats the most time and we will tell you what can be automated, augmented or rebuilt.",
  path: "/contact",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
]

const DETAILS = [
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: COMPANY.phoneHref },
  { icon: Clock, label: "Hours", value: COMPANY.hours },
  { icon: MapPin, label: "Working", value: "Remote-first, worldwide" },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />
      <JsonLd
        data={webPageSchema({
          name: "Contact Nolojia",
          description:
            "Contact Nolojia about AI assistants, automation, business systems and human operational support.",
          path: "/contact",
        })}
      />

      <PageHero
        eyebrow="Contact"
        title="Tell us what you want to automate."
        description="The more specific you are about the process that wastes your team's time, the more useful our first reply will be. We read every enquiry ourselves."
        crumbs={CRUMBS}
      />

      <Section id="form">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <div>
              <h2 className="sr-only">Contact form</h2>
              <ContactForm />
            </div>

            <aside className="space-y-5">
              <div className="rounded-2xl border border-border bg-surface p-6">
                <Eyebrow className="mb-4">Direct</Eyebrow>
                <dl className="space-y-4">
                  {DETAILS.map((detail) => {
                    const Icon = detail.icon
                    return (
                      <div key={detail.label} className="flex items-start gap-3">
                        <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                        <div className="min-w-0">
                          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {detail.label}
                          </dt>
                          <dd className="mt-0.5 text-sm text-foreground">
                            {detail.href ? (
                              <a
                                href={detail.href}
                                className="underline-offset-4 transition-colors hover:text-brand hover:underline"
                              >
                                {detail.value}
                              </a>
                            ) : (
                              detail.value
                            )}
                          </dd>
                        </div>
                      </div>
                    )
                  })}
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <CalendarDays aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  Prefer to talk it through?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Book a 30-minute call. We will walk through your current process and tell you
                  honestly whether there is something worth building.
                </p>
                <div className="mt-5">
                  <CtaLink href="/book" variant="secondary">
                    Book a call
                  </CtaLink>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground">Other enquiries</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/careers"
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      Careers and open roles
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/security"
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      Security questions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products"
                      className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                    >
                      Product access and early involvement
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section tone="surface">
        <Container size="narrow">
          <h2 className="text-display-sm font-semibold text-foreground">
            Before you write to us
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            These four come up in almost every first conversation.
          </p>
          <Faq items={FAQ_SECTIONS[1].items} className="mt-8" idPrefix="contact-faq" />
          <div className="mt-8">
            <CtaLink href="/faq" variant="quiet">
              Read the full FAQ
            </CtaLink>
          </div>
        </Container>
      </Section>
    </>
  )
}
