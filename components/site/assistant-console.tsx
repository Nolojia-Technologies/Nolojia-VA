"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  Calendar,
  Check,
  Database,
  Inbox,
  PenLine,
  Send,
  Sparkles,
  Tags,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"

/**
 * Hero visual: one incoming request fanning out into several completed actions.
 * Built in markup rather than shipped as an image so it stays crisp, themeable
 * and weightless. Reduced motion renders the finished state immediately.
 */

const ACTIONS = [
  { icon: Tags, label: "Request classified", detail: "Sales enquiry · high intent" },
  { icon: PenLine, label: "Response drafted", detail: "Personalised reply ready for review" },
  { icon: Database, label: "CRM updated", detail: "Deal created · stage: Qualified" },
  { icon: Calendar, label: "Meeting scheduled", detail: "Thursday 09:00 · 30 min" },
  { icon: Users, label: "Team notified", detail: "Posted to #sales with context" },
] as const

const REPLY =
  "Handled. I classified the enquiry, drafted a reply for your review, created the deal in your CRM, booked a slot and let the team know."

export function AssistantConsole({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [step, setStep] = React.useState(reduce ? ACTIONS.length + 2 : 0)

  React.useEffect(() => {
    if (reduce) return
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1400),
      ...ACTIONS.map((_, i) => setTimeout(() => setStep(3 + i), 2100 + i * 520)),
    ]
    return () => timers.forEach(clearTimeout)
  }, [reduce])

  const visibleActions = Math.max(0, step - 2)

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-ink-2/90 shadow-lg backdrop-blur",
        className
      )}
      role="img"
      aria-label="Nolojia assistant handling one incoming request: it classifies the request, drafts a response, updates the CRM, schedules a meeting and notifies the team."
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <p className="text-xs font-medium text-white/55">Nolojia · Operations</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[0.6875rem] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
          Connected
        </span>
      </div>

      <div aria-hidden="true" className="space-y-4 p-4 sm:p-5">
        {/* Incoming request */}
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <Inbox className="h-3.5 w-3.5 text-white/50" />
          </span>
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-white/35">
              Incoming
            </p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">
              &ldquo;We&rsquo;re a 40-person logistics company looking at your automation work — can
              we talk this week?&rdquo;
            </p>
          </div>
        </div>

        {/* Assistant reply */}
        <div className="flex gap-3">
          <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[0.6875rem] font-medium uppercase tracking-wider text-white/35">
              Nolojia AI
            </p>
            <div className="mt-1 min-h-[2.5rem] text-sm leading-relaxed text-white/70">
              {step === 1 ? (
                <span className="inline-flex gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-white/40"
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </span>
              ) : step >= 2 ? (
                <motion.span
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  {REPLY}
                </motion.span>
              ) : null}
            </div>
          </div>
        </div>

        {/* Fan-out of completed actions */}
        <ul className="space-y-1.5 border-t border-white/10 pt-4">
          <AnimatePresence initial={false}>
            {ACTIONS.slice(0, visibleActions).map((action, i) => {
              const Icon = action.icon
              return (
                <motion.li
                  key={action.label}
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                    <Icon className="h-3.5 w-3.5 text-white/60" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[0.8125rem] font-medium text-white/85">
                      {action.label}
                    </span>
                    <span className="block truncate text-xs text-white/40">{action.detail}</span>
                  </span>
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <Check className="h-3 w-3 text-emerald-400" />
                  </span>
                  <span className="sr-only">{i + 1}</span>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </ul>

        {/* Footer bar */}
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
          <span className="flex-1 truncate text-xs text-white/30">
            Ask Nolojia to handle something&hellip;
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06]">
            <Send className="h-3 w-3 text-white/40" />
          </span>
        </div>
      </div>
    </div>
  )
}
