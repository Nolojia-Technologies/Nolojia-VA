import * as React from "react"

import { cn } from "@/lib/utils/cn"

/**
 * Answer-first blocks.
 *
 * Both components exist for the same reason: a reader — human or machine —
 * should get the answer to the page's question in the first screenful, not
 * after eight sections of narrative. They are plain server components with no
 * client JavaScript, so the text is in the initial HTML.
 */

/**
 * A term and its definition, marked up as a real <dl>.
 *
 * Uses definition markup rather than a styled paragraph because that is what
 * the content is: `dt`/`dd` states the relationship between term and meaning in
 * the markup itself instead of leaving it to be inferred from position.
 */
export function Definition({
  term,
  children,
  className,
}: {
  term: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <dl
      className={cn(
        "rounded-2xl border border-brand/20 bg-brand-soft/40 p-6 sm:p-7",
        className
      )}
    >
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">{term}</dt>
      <dd className="mt-3 text-lg leading-relaxed text-foreground sm:text-xl">{children}</dd>
    </dl>
  )
}

export interface GlanceRow {
  label: string
  value: React.ReactNode
}

/**
 * "At a glance" summary — the page reduced to four or five labelled facts.
 *
 * A description list again, so each label is bound to its value rather than
 * merely sitting next to it. Readable at a skim, and unambiguous to anything
 * parsing the page for a short answer.
 */
export function AtAGlance({
  title = "At a glance",
  rows,
  className,
}: {
  title?: string
  rows: GlanceRow[]
  className?: string
}) {
  return (
    <aside
      aria-label={title}
      className={cn("rounded-2xl border border-border bg-card p-6 shadow-xs sm:p-7", className)}
    >
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-sm font-semibold text-foreground">{row.label}</dt>
            <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}

/**
 * A question as a heading, with a short direct answer underneath.
 *
 * The answer paragraph is deliberately constrained in the copy that uses it:
 * one to three sentences that stand on their own if quoted with nothing else
 * around them. Anything longer belongs in `children`, after the answer.
 */
export function QuestionAnswer({
  question,
  answer,
  children,
  headingLevel = 2,
  id,
  className,
}: {
  question: string
  answer: React.ReactNode
  children?: React.ReactNode
  headingLevel?: 2 | 3
  id?: string
  className?: string
}) {
  const Heading = (headingLevel === 2 ? "h2" : "h3") as "h2" | "h3"

  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <Heading
        className={cn(
          "font-semibold tracking-tight text-foreground",
          headingLevel === 2 ? "text-2xl sm:text-3xl" : "text-xl"
        )}
      >
        {question}
      </Heading>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-foreground/85">{answer}</p>
      {children ? <div className="mt-5 max-w-3xl space-y-4">{children}</div> : null}
    </section>
  )
}
