import Link from "next/link"
import { Container, Section } from "@/components/site/primitives"
import { Icon, type IconName } from "@/components/site/icon"
import { PageHero } from "@/components/site/sections"
import type { Crumb } from "@/components/site/breadcrumbs"

export interface LegalSection {
  /** Used as the in-page anchor, e.g. #cookies. */
  id: string
  icon: IconName
  title: string
  content: { subtitle: string; text: string }[]
}

/**
 * Shared shell for Privacy and Terms so both legal pages stay identical in
 * structure, typography and anchor behaviour.
 */
export function LegalPage({
  title,
  intro,
  effective,
  updated,
  sections,
  crumbs,
  contactEmail,
}: {
  title: string
  intro: React.ReactNode
  effective: string
  updated: string
  sections: LegalSection[]
  crumbs: Crumb[]
  contactEmail: string
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} crumbs={crumbs}>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{intro}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective {effective} · Last updated {updated}
        </p>
      </PageHero>

      <Section>
        <Container size="narrow">
          {/* Contents */}
          <nav aria-label="On this page" className="rounded-2xl border border-border bg-surface p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              On this page
            </h2>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    <span className="mr-2 font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-12 space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                    <Icon name={section.icon} className="h-4 w-4" />
                  </span>
                  <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
                </div>
                <div className="mt-6 space-y-6">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="text-[0.9375rem] font-semibold text-foreground">
                        {item.subtitle}
                      </h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-14 border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
            Questions?{" "}
            <Link
              href="/contact"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Contact us
            </Link>{" "}
            or email{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {contactEmail}
            </a>
            . See also our{" "}
            <Link
              href="/security"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Security page
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  )
}
