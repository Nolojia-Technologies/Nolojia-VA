import { Check } from "lucide-react"
import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { Reveal } from "@/components/site/reveal"
import { PROCESS_STEPS } from "@/lib/content/solutions"

export function ProcessSection({ tone = "default" }: { tone?: "default" | "surface" }) {
  return (
    <Section id="how-it-works" tone={tone}>
      <Container>
        <SectionHeading
          eyebrow="How Nolojia works"
          title="From manual work to intelligent systems."
          description="Four steps, in order. We do not start building until we understand where your time actually goes."
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 0.06} className="h-full">
              <div className="flex h-full flex-col bg-card p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-semibold text-brand">{step.number}</span>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border pt-5">
                  {step.detail.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-[0.8125rem] text-foreground/80">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
