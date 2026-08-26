"use client"

import * as React from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { Check } from "lucide-react"
import { Icon, type IconName } from "@/components/site/icon"
import { cn } from "@/lib/utils/cn"

export interface WorkflowStep {
  icon: IconName
  label: string
  detail: string
  /** Marks the step where a person signs off, so the diagram stays honest. */
  human?: boolean
}

/**
 * A trigger-to-result workflow. Steps light up in sequence when the diagram
 * scrolls into view; with reduced motion every step is shown complete.
 */
export function WorkflowDiagram({
  steps,
  onInk = false,
  className,
  loop = true,
}: {
  steps: WorkflowStep[]
  onInk?: boolean
  className?: string
  loop?: boolean
}) {
  const reduce = useReducedMotion()
  const ref = React.useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: false, margin: "-15%" })
  const [active, setActive] = React.useState(reduce ? steps.length : 0)

  React.useEffect(() => {
    if (reduce || !inView) return
    setActive(0)
    let i = 0
    const id = setInterval(() => {
      i += 1
      if (i > steps.length) {
        if (!loop) {
          clearInterval(id)
          return
        }
        i = 0
      }
      setActive(i)
    }, 850)
    return () => clearInterval(id)
  }, [inView, reduce, steps.length, loop])

  return (
    <ol
      ref={ref}
      className={cn(
        "grid gap-2 sm:gap-3",
        "md:grid-flow-col md:auto-cols-fr",
        className
      )}
    >
      {steps.map((step, i) => {
        const done = i < active
        return (
          <li key={step.label} className="relative flex md:h-full md:flex-col">
            {/* Connector */}
            {i > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-[1.4375rem] top-0 h-3 w-px -translate-y-full md:left-0 md:top-[1.4375rem] md:h-px md:w-3 md:-translate-x-full md:translate-y-0",
                  done
                    ? "bg-brand"
                    : onInk
                      ? "bg-white/15"
                      : "bg-border"
                )}
              />
            ) : null}

            <motion.div
              animate={
                reduce
                  ? undefined
                  : { opacity: done ? 1 : 0.55, scale: done ? 1 : 0.995 }
              }
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border p-3.5 transition-colors duration-300 md:h-full md:flex-col md:gap-3",
                done
                  ? onInk
                    ? "border-brand/40 bg-brand/10"
                    : "border-brand/30 bg-brand-soft"
                  : onInk
                    ? "border-white/10 bg-white/[0.03]"
                    : "border-border bg-card"
              )}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                  done
                    ? "bg-brand text-brand-foreground"
                    : onInk
                      ? "bg-white/[0.07] text-white/55"
                      : "bg-surface-2 text-muted-foreground"
                )}
              >
                {done ? (
                  <Check aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Icon name={step.icon} className="h-4 w-4" />
                )}
              </span>

              <span className="min-w-0">
                <span
                  className={cn(
                    "block text-sm font-semibold",
                    onInk ? "text-white" : "text-foreground"
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[0.8125rem] leading-snug",
                    onInk ? "text-white/55" : "text-muted-foreground"
                  )}
                >
                  {step.detail}
                </span>
                {step.human ? (
                  <span
                    className={cn(
                      "mt-2 inline-flex rounded-full px-2 py-0.5 text-[0.6875rem] font-medium",
                      onInk ? "bg-white/10 text-white/70" : "bg-surface-2 text-muted-foreground"
                    )}
                  >
                    Human approval
                  </span>
                ) : null}
              </span>
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}
