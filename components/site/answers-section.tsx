import * as React from "react"

import JsonLd from "@/components/seo/JsonLd"
import { Container, Section, SectionHeading } from "@/components/site/primitives"
import { AtAGlance, Definition, QuestionAnswer } from "@/components/site/answer-block"
import { Faq } from "@/components/site/faq"
import { faqSchema } from "@/lib/seo/structured-data"
import type { SolutionAnswers } from "@/lib/content/definitions"

/**
 * Renders the answer-first half of a solution page: the definition, the summary
 * card, the question-headed sections and the FAQ — plus the FAQPage schema
 * built from the same objects.
 *
 * Existing pages keep their own narrative sections. This is not a replacement
 * for them; it is the part a reader needs before deciding whether to read them.
 */

/** Definition + at-a-glance. Sits directly under the hero. */
export function AnswerSummary({ answers }: { answers: SolutionAnswers }) {
  return (
    <Section className="pt-10 pb-4 sm:pt-14 sm:pb-6">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Definition term={answers.term}>{answers.definition}</Definition>
          <AtAGlance rows={answers.glance} />
        </div>
      </Container>
    </Section>
  )
}

/**
 * The question-headed explanation sections.
 *
 * `detail` lines starting with a digit render as an ordered list — the
 * step-by-step shape that both readers and answer engines handle best for a
 * "how does X work" question.
 */
export function AnswerQuestions({ answers }: { answers: SolutionAnswers }) {
  return (
    <Section tone="surface">
      <Container>
        {/* Centred: the answer copy is capped at max-w-3xl for line length, and
            left-aligning that inside a full-width container leaves the page
            visibly lopsided. */}
        <div className="mx-auto max-w-3xl space-y-14">
          {answers.questions.map((q) => (
            <QuestionAnswer key={q.question} question={q.question} answer={q.answer}>
              {q.detail ? <DetailBody lines={q.detail} /> : null}
            </QuestionAnswer>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function DetailBody({ lines }: { lines: string[] }) {
  const numbered = lines.every((l) => /^\d+\.\s/.test(l))

  if (numbered) {
    return (
      <ol className="space-y-3">
        {lines.map((line, i) => (
          <li key={line} className="flex gap-3 text-base leading-relaxed text-muted-foreground">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-soft text-xs font-semibold text-brand">
              {i + 1}
            </span>
            <span>{renderEmphasis(line.replace(/^\d+\.\s*/, ""))}</span>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <>
      {lines.map((line) => (
        <p key={line} className="text-base leading-relaxed text-muted-foreground">
          {renderEmphasis(line)}
        </p>
      ))}
    </>
  )
}

/** Minimal **bold** support so the step labels can be emphasised in the copy. */
function renderEmphasis(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-foreground">
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  )
}

/**
 * FAQ list plus its schema.
 *
 * The schema is generated from the same array the list renders, so the two
 * cannot disagree — the failure mode structured data is most often criticised
 * for is describing answers a visitor cannot actually see.
 */
export function AnswerFaq({
  answers,
  idPrefix,
  title = "Common questions",
}: {
  answers: SolutionAnswers
  idPrefix: string
  title?: string
}) {
  if (answers.faqs.length === 0) return null

  return (
    <Section>
      <Container>
        <JsonLd data={faqSchema(answers.faqs)} />
        <SectionHeading align="center" eyebrow="FAQ" title={title} />
        <div className="mx-auto mt-12 max-w-3xl">
          <Faq items={answers.faqs} idPrefix={idPrefix} />
        </div>
      </Container>
    </Section>
  )
}
