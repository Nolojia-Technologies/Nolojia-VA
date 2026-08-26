"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AlertCircle, ArrowRight, Calendar, CheckCircle2, Loader2, X } from "lucide-react"

import { CtaButton } from "@/components/site/cta"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils/cn"

/**
 * Time request dialog.
 *
 * This is deliberately a *request*, not a booking: Nolojia has no live calendar
 * integration, so the form collects a preferred slot, emails the team and says
 * plainly that the time is confirmed by reply. Nothing here claims a slot has
 * been reserved.
 */

const NEEDS = [
  "AI employees / assistants",
  "Automating a workflow",
  "Building a business system",
  "Human + AI operational support",
  "A Nolojia product",
  "Not sure yet",
]

const TIME_OPTIONS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const fieldBase =
  "w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"

function todayStr() {
  const now = new Date()
  const offset = now.getTimezoneOffset()
  return new Date(now.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function longDate(value: string) {
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return value
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function shortDate(value: string) {
  const [y, m, d] = value.split("-").map(Number)
  if (!y || !m || !d) return value
  return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  })
}

const EMPTY = { name: "", email: "", phone: "", need: "", notes: "", _hp: "" }

export function BookingPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const reduce = useReducedMotion()
  const [step, setStep] = React.useState<"when" | "who" | "sent">("when")
  const [date, setDate] = React.useState(todayStr)
  const [time, setTime] = React.useState("")
  const [form, setForm] = React.useState(EMPTY)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const dialogRef = React.useRef<HTMLDivElement>(null)
  const openerRef = React.useRef<HTMLElement | null>(null)
  const titleId = React.useId()

  const set =
    (field: keyof typeof EMPTY) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      setError("")
    }

  const close = React.useCallback(() => {
    onClose()
    openerRef.current?.focus()
  }, [onClose])

  // Remember who opened the dialog, move focus in, and lock the page behind it.
  React.useEffect(() => {
    if (!isOpen) return
    openerRef.current = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const t = setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    }, 40)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  // Escape closes; Tab stays inside.
  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== "Tab") return
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (!nodes || nodes.length === 0) return
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, close])

  // Clear the wizard shortly after close so reopening starts fresh, without the
  // fields visibly resetting under the user as the dialog goes away.
  React.useEffect(() => {
    if (isOpen) return
    const t = setTimeout(() => {
      setStep("when")
      setDate(todayStr())
      setTime("")
      setForm(EMPTY)
      setError("")
    }, 250)
    return () => clearTimeout(t)
  }, [isOpen])

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) || !form.need) {
      setError("Please add your name, a valid email and what you need help with.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phone: form.phone.trim(),
          serviceType: form.need,
          preferredDate: longDate(date),
          preferredTime: time,
          notes: form.notes.trim(),
          _hp: form._hp,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }

      track("consultation_request", { step: "submitted" })
      setStep("sent")
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Unmounted outright when closed. An exit animation here would mean keeping a
  // full-viewport overlay in the DOM after close, and anything that leaves it
  // mounted swallows every click on the page behind it — not worth a fade.
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={close}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-border bg-card shadow-lg sm:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-foreground">
              Request a time
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              A 30-minute call about your actual process. We confirm the slot by email.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close dialog"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          {step === "when" ? (
            <div className="space-y-5">
              <div>
                <label htmlFor="booking-date" className="block text-sm font-medium text-foreground">
                  Preferred date
                </label>
                <input
                  id="booking-date"
                  name="preferredDate"
                  type="date"
                  value={date}
                  min={todayStr()}
                  onChange={(e) => setDate(e.target.value)}
                  className={cn(fieldBase, "mt-1.5")}
                />
              </div>

              <fieldset>
                <legend className="block text-sm font-medium text-foreground">
                  Preferred time
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                    Your local time
                  </span>
                </legend>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {TIME_OPTIONS.map((option) => {
                    const selected = time === option
                    return (
                      <button
                        key={option}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTime(option)}
                        className={cn(
                          "rounded-lg border px-2 py-2.5 text-sm font-medium transition-colors",
                          selected
                            ? "border-brand bg-brand text-brand-foreground"
                            : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
                        )}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <CtaButton
                type="button"
                size="lg"
                disabled={!date || !time}
                onClick={() => setStep("who")}
                className="w-full"
              >
                Continue
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </CtaButton>
            </div>
          ) : null}

          {step === "who" ? (
            <form onSubmit={submit} className="space-y-4" noValidate>
              <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground">
                Requesting{" "}
                <strong className="font-medium text-foreground">{shortDate(date)}</strong> at{" "}
                <strong className="font-medium text-foreground">{time}</strong>.{" "}
                <button
                  type="button"
                  onClick={() => setStep("when")}
                  className="font-medium text-brand underline-offset-4 hover:underline"
                >
                  Change
                </button>
              </p>

              <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
                <label htmlFor="booking-hp">Company website</label>
                <input
                  id="booking-hp"
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form._hp}
                  onChange={set("_hp")}
                />
              </div>

              <div>
                <label htmlFor="booking-name" className="block text-sm font-medium text-foreground">
                  Full name
                  <span aria-hidden="true" className="ml-0.5 text-brand">
                    *
                  </span>
                </label>
                <input
                  id="booking-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={set("name")}
                  className={cn(fieldBase, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="booking-email" className="block text-sm font-medium text-foreground">
                  Work email
                  <span aria-hidden="true" className="ml-0.5 text-brand">
                    *
                  </span>
                </label>
                <input
                  id="booking-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={set("email")}
                  className={cn(fieldBase, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="block text-sm font-medium text-foreground">
                  Phone
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
                </label>
                <input
                  id="booking-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  className={cn(fieldBase, "mt-1.5")}
                />
              </div>

              <div>
                <label htmlFor="booking-need" className="block text-sm font-medium text-foreground">
                  What do you need help with?
                  <span aria-hidden="true" className="ml-0.5 text-brand">
                    *
                  </span>
                </label>
                <select
                  id="booking-need"
                  name="serviceType"
                  value={form.need}
                  onChange={set("need")}
                  className={cn(fieldBase, "mt-1.5")}
                >
                  <option value="">Select one</option>
                  {NEEDS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="booking-notes" className="block text-sm font-medium text-foreground">
                  Anything we should read first?
                  <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
                </label>
                <textarea
                  id="booking-notes"
                  name="notes"
                  rows={3}
                  maxLength={2000}
                  value={form.notes}
                  onChange={set("notes")}
                  className={cn(fieldBase, "mt-1.5 resize-y")}
                />
              </div>

              <div aria-live="polite">
                {error ? (
                  <p
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive"
                  >
                    <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
                    {error}
                  </p>
                ) : null}
              </div>

              <CtaButton type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
                    Sending&hellip;
                  </>
                ) : (
                  <>
                    <Calendar aria-hidden="true" className="h-4 w-4" />
                    Send request
                  </>
                )}
              </CtaButton>

              <p className="text-center text-xs leading-relaxed text-muted-foreground">
                We reply with a confirmation and a calendar invite. Nothing is booked until we do.
              </p>
            </form>
          ) : null}

          {step === "sent" ? (
            <div className="py-4 text-center">
              <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
                <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-success" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-foreground">Request sent</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                You asked for{" "}
                <strong className="text-foreground">{shortDate(date)}</strong> at{" "}
                <strong className="text-foreground">{time}</strong>. We will confirm or suggest
                the nearest alternative by email to{" "}
                <strong className="text-foreground">{form.email}</strong>.
              </p>
              <div className="mt-7">
                <CtaButton type="button" size="lg" variant="secondary" onClick={close} className="w-full">
                  Done
                </CtaButton>
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  )
}
