"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Minus, Plus } from "lucide-react"
import type { FaqItem } from "@/lib/content/faq"
import { cn } from "@/lib/utils/cn"

/**
 * Disclosure list. Native buttons, real aria wiring, one panel per question —
 * keyboard and screen-reader usable without any ARIA gymnastics.
 */
export function Faq({
  items,
  idPrefix = "faq",
  className,
}: {
  items: FaqItem[]
  idPrefix?: string
  className?: string
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = React.useState<number | null>(null)

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${idPrefix}-button-${i}`
        const panelId = `${idPrefix}-panel-${i}`
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-brand"
              >
                <span className="text-[0.9375rem] font-semibold text-foreground sm:text-base">
                  {item.question}
                </span>
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground">
                  {isOpen ? (
                    <Minus aria-hidden="true" className="h-3.5 w-3.5" />
                  ) : (
                    <Plus aria-hidden="true" className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            </h3>
            {/*
              Always mounted, collapsed with height rather than unmounted.
              These answers are the whole point of the page for an answer
              engine, and FAQPage schema may only describe content that is
              actually on the page — mounting them on click meant the markup
              promised answers the HTML did not contain.
            */}
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={reduce ? { duration: 0 } : { duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-3xl pb-6 pr-10 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
