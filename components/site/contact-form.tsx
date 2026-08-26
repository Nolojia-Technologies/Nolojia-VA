"use client"

import * as React from "react"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { CtaButton } from "@/components/site/cta"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils/cn"

const COMPANY_SIZES = ["Just me", "2–10", "11–50", "51–200", "200+"] as const

const HELP_OPTIONS = [
  "AI employees / assistants",
  "Automating a workflow",
  "Building a business system",
  "Human + AI operational support",
  "A Nolojia product",
  "Not sure yet",
] as const

const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $2,000",
  "$2,000 – $10,000",
  "$10,000 – $50,000",
  "Over $50,000",
] as const

interface FormState {
  name: string
  email: string
  company: string
  companySize: string
  subject: string
  automate: string
  budget: string
  message: string
  _hp: string
}

const EMPTY: FormState = {
  name: "",
  email: "",
  company: "",
  companySize: "",
  subject: "",
  automate: "",
  budget: "",
  message: "",
  _hp: "",
}

type Errors = Partial<Record<keyof FormState, string>>

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 2) errors.name = "Please enter your full name."
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
    errors.email = "Please enter a valid work email address."
  if (!form.subject) errors.subject = "Please tell us what you need help with."
  if (form.automate.trim().length < 10)
    errors.automate = "A sentence or two is enough — what would you like to automate?"
  return errors
}

const fieldBase =
  "w-full rounded-xl border bg-background px-3.5 py-2.5 text-[0.9375rem] text-foreground placeholder:text-muted-foreground/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string
  label: string
  hint?: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-brand">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-normal text-muted-foreground">Optional</span>
        )}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive">
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function ContactForm() {
  const [form, setForm] = React.useState<FormState>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [serverError, setServerError] = React.useState("")

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    setStatus("loading")
    setServerError("")

    // The API expects name / email / subject / message. Everything else is
    // folded into the message body so no field is silently dropped.
    const details = [
      form.automate && `What they want to automate:\n${form.automate}`,
      form.companySize && `Company size: ${form.companySize}`,
      form.budget && `Budget: ${form.budget}`,
      form.message && `Additional information:\n${form.message}`,
    ]
      .filter(Boolean)
      .join("\n\n")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          subject: form.subject,
          message: details,
          _hp: form._hp,
        }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.")
        setStatus("error")
        track("contact_form_error", { reason: String(res.status) })
        return
      }

      setStatus("success")
      track("contact_form_submit", { subject: form.subject })
      track("consultation_request", { subject: form.subject })
    } catch {
      setServerError("Network error. Check your connection and try again.")
      setStatus("error")
      track("contact_form_error", { reason: "network" })
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success/25 bg-success-soft p-8 text-center"
      >
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 aria-hidden="true" className="h-6 w-6 text-success" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-foreground">Message sent.</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          Thanks, {form.name.split(" ")[0]}. We read every enquiry ourselves and will reply to{" "}
          <span className="font-medium text-foreground">{form.email}</span> within one business day.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(EMPTY)
            setStatus("idle")
          }}
          className="mt-6 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form._hp}
          onChange={set("_hp")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="Jane Mwangi"
            className={cn(fieldBase, errors.name ? "border-destructive" : "border-input")}
          />
        </Field>

        <Field id="email" label="Work email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="jane@company.com"
            className={cn(fieldBase, errors.email ? "border-destructive" : "border-input")}
          />
        </Field>

        <Field id="company" label="Company">
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
            placeholder="Company name"
            className={cn(fieldBase, "border-input")}
          />
        </Field>

        <Field id="companySize" label="Company size">
          <select
            id="companySize"
            name="companySize"
            value={form.companySize}
            onChange={set("companySize")}
            className={cn(fieldBase, "border-input")}
          >
            <option value="">Select&hellip;</option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="subject" label="What do you need help with?" required error={errors.subject}>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={set("subject")}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className={cn(fieldBase, errors.subject ? "border-destructive" : "border-input")}
        >
          <option value="">Select&hellip;</option>
          {HELP_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field
        id="automate"
        label="What would you like to automate?"
        required
        error={errors.automate}
        hint="The more specific you are, the more useful our first reply will be."
      >
        <textarea
          id="automate"
          name="automate"
          rows={4}
          value={form.automate}
          onChange={set("automate")}
          aria-invalid={!!errors.automate}
          aria-describedby={errors.automate ? "automate-error" : "automate-hint"}
          placeholder="Every new lead is entered into our CRM by hand and follow-ups get missed."
          className={cn(fieldBase, "resize-y", errors.automate ? "border-destructive" : "border-input")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="budget" label="Budget">
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={set("budget")}
            className={cn(fieldBase, "border-input")}
          >
            <option value="">Select&hellip;</option>
            {BUDGET_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Anything else">
          <textarea
            id="message"
            name="message"
            rows={3}
            maxLength={2000}
            value={form.message}
            onChange={set("message")}
            placeholder="Timelines, tools already in use, constraints"
            className={cn(fieldBase, "resize-y border-input")}
          />
        </Field>
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-sm text-destructive"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{serverError}</p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center">
        <CtaButton type="submit" size="lg" disabled={status === "loading"} className="sm:w-auto">
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Sending&hellip;
            </>
          ) : (
            "Build My AI System"
          )}
        </CtaButton>
        <p className="text-xs leading-relaxed text-muted-foreground">
          We reply within one business day. Your details are used to answer your enquiry and nothing
          else.
        </p>
      </div>
    </form>
  )
}
