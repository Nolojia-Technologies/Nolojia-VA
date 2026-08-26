"use client"

import * as React from "react"
import { CheckCircle2, Upload, Loader2, AlertCircle, X } from "lucide-react"

import { CtaButton } from "@/components/site/cta"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils/cn"

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const MAX_COVER_LETTER = 5000

const EXPERIENCE_OPTIONS = [
  "Under 1 year",
  "1–2 years",
  "2–3 years",
  "3–5 years",
  "5–8 years",
  "8+ years",
]

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

interface Props {
  jobTitle: string
  jobSlug: string
}

interface FormState {
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  yearsExperience: string
  expectedSalary: string
  coverLetter: string
  _hp: string
}

const EMPTY: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  portfolio: "",
  yearsExperience: "",
  expectedSalary: "",
  coverLetter: "",
  _hp: "",
}

type Errors = Partial<Record<keyof FormState | "resume", string>>

export default function ApplicationForm({ jobTitle, jobSlug }: Props) {
  const [form, setForm] = React.useState<FormState>(EMPTY)
  const [errors, setErrors] = React.useState<Errors>({})
  const [resumeFile, setResumeFile] = React.useState<File | null>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle")
  const [serverError, setServerError] = React.useState("")

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const successRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (status === "success") successRef.current?.focus()
  }, [status])

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev))
    }

  function validateAndSetFile(file: File | null) {
    if (!file) {
      setResumeFile(null)
      return
    }
    if (!ALLOWED_MIME.includes(file.type)) {
      setResumeFile(null)
      setErrors((prev) => ({ ...prev, resume: "Please upload a PDF, DOC or DOCX file." }))
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setResumeFile(null)
      setErrors((prev) => ({ ...prev, resume: "That file is larger than 5 MB." }))
      return
    }
    setResumeFile(file)
    setErrors((prev) => ({ ...prev, resume: undefined }))
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setIsDragging(false)
    validateAndSetFile(e.dataTransfer.files?.[0] ?? null)
    // Clear the input so picking the same file again still fires onChange.
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removeFile() {
    setResumeFile(null)
    setErrors((prev) => ({ ...prev, resume: undefined }))
    if (fileInputRef.current) fileInputRef.current.value = ""
    fileInputRef.current?.focus()
  }

  function validate(): Errors {
    const found: Errors = {}
    if (form.fullName.trim().length < 2) found.fullName = "Please enter your full name."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      found.email = "Please enter a valid email address."
    if (form.coverLetter.trim().length < 20)
      found.coverLetter = "A short paragraph is enough — at least 20 characters."
    if (!resumeFile) found.resume = "Please attach your CV as a PDF, DOC or DOCX."
    return found
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0]
      document.getElementById(first === "resume" ? "resume" : first)?.focus()
      return
    }

    setStatus("loading")
    setServerError("")

    const body = new FormData()
    body.append("jobSlug", jobSlug)
    body.append("jobTitle", jobTitle)
    body.append("fullName", form.fullName.trim())
    body.append("email", form.email.trim().toLowerCase())
    body.append("phone", form.phone.trim())
    body.append("location", form.location.trim())
    body.append("linkedin", form.linkedin.trim())
    body.append("portfolio", form.portfolio.trim())
    body.append("coverLetter", form.coverLetter.trim())
    body.append("yearsExperience", form.yearsExperience)
    body.append("expectedSalary", form.expectedSalary.trim())
    body.append("_hp", form._hp)
    body.append("resume", resumeFile as File)

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body })
      const data = (await res.json().catch(() => ({}))) as { error?: string }

      if (!res.ok) {
        setStatus("error")
        setServerError(data.error ?? "Something went wrong. Please try again.")
        return
      }

      track("job_application_submit", { job: jobSlug })
      setStatus("success")
    } catch {
      setStatus("error")
      setServerError("Network error. Please check your connection and try again.")
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm focus-visible:outline-none"
      >
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-soft">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7 text-success" />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-foreground">Application received</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Your application for <strong className="text-foreground">{jobTitle}</strong> is in. A person
          reads every one — we will be in touch within five business days.
        </p>
      </div>
    )
  }

  const fileDescribedBy = errors.resume ? "resume-error" : "resume-hint"

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-surface px-6 py-5">
        <h2 className="text-base font-semibold text-foreground">Apply for this role</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{jobTitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6" noValidate>
        {/* Spam trap. Hidden from people, left empty by them, filled by bots. */}
        <div aria-hidden="true" className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
          <label htmlFor="company_website">Company website</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form._hp}
            onChange={set("_hp")}
          />
        </div>

        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={form.fullName}
            onChange={set("fullName")}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={cn(fieldBase, errors.fullName ? "border-destructive" : "border-input")}
          />
        </Field>

        <Field id="email" label="Email address" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={set("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(fieldBase, errors.email ? "border-destructive" : "border-input")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="phone" label="Phone">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={set("phone")}
              className={cn(fieldBase, "border-input")}
            />
          </Field>
          <Field id="location" label="Location">
            <input
              id="location"
              name="location"
              type="text"
              autoComplete="address-level2"
              placeholder="City, country"
              value={form.location}
              onChange={set("location")}
              className={cn(fieldBase, "border-input")}
            />
          </Field>
        </div>

        <Field id="linkedin" label="LinkedIn profile">
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            inputMode="url"
            placeholder="https://linkedin.com/in/…"
            value={form.linkedin}
            onChange={set("linkedin")}
            className={cn(fieldBase, "border-input")}
          />
        </Field>

        <Field id="portfolio" label="Portfolio or website">
          <input
            id="portfolio"
            name="portfolio"
            type="url"
            inputMode="url"
            placeholder="https://…"
            value={form.portfolio}
            onChange={set("portfolio")}
            className={cn(fieldBase, "border-input")}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="yearsExperience" label="Years of experience">
            <select
              id="yearsExperience"
              name="yearsExperience"
              value={form.yearsExperience}
              onChange={set("yearsExperience")}
              className={cn(fieldBase, "border-input")}
            >
              <option value="">Select</option>
              {EXPERIENCE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
          <Field id="expectedSalary" label="Expected pay">
            <input
              id="expectedSalary"
              name="expectedSalary"
              type="text"
              placeholder="e.g. $1,500 / month"
              value={form.expectedSalary}
              onChange={set("expectedSalary")}
              className={cn(fieldBase, "border-input")}
            />
          </Field>
        </div>

        {/* Resume. The visible control is the file input's own label, so it is
            focusable, activates on Enter/Space and announces as a file picker;
            the surrounding div only adds drag-and-drop for pointer users. */}
        <div>
          <span className="block text-sm font-medium text-foreground">
            CV or resume
            <span aria-hidden="true" className="ml-0.5 text-brand">
              *
            </span>
          </span>

          <input
            ref={fileInputRef}
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => validateAndSetFile(e.target.files?.[0] ?? null)}
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={fileDescribedBy}
            className="peer sr-only"
          />

          {resumeFile ? (
            <div className="mt-1.5 flex items-center gap-3 rounded-xl border border-brand/25 bg-brand-soft px-4 py-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand/10">
                <Upload aria-hidden="true" className="h-4 w-4 text-brand" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {resumeFile.name}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {(resumeFile.size / 1024).toFixed(0)} KB
                </span>
              </span>
              <button
                type="button"
                onClick={removeFile}
                aria-label={`Remove ${resumeFile.name}`}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setIsDragging(false)
              }}
              onDrop={handleDrop}
              className="mt-1.5 rounded-xl peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-card"
            >
              <label
                htmlFor="resume"
                className={cn(
                  "flex cursor-pointer select-none flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors",
                  isDragging
                    ? "border-brand bg-brand-soft"
                    : errors.resume
                      ? "border-destructive/50 bg-destructive/5"
                      : "border-border hover:border-brand/50 hover:bg-surface"
                )}
              >
                <Upload
                  aria-hidden="true"
                  className={cn("h-5 w-5", isDragging ? "text-brand" : "text-muted-foreground")}
                />
                <span className="text-sm text-muted-foreground">
                  <span className="font-medium text-brand">Choose a file</span> or drag it here
                </span>
              </label>
            </div>
          )}

          {errors.resume ? (
            <p
              id="resume-error"
              className="mt-1.5 flex items-center gap-1.5 text-xs text-destructive"
            >
              <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
              {errors.resume}
            </p>
          ) : (
            <p id="resume-hint" className="mt-1.5 text-xs text-muted-foreground">
              PDF, DOC or DOCX, up to 5 MB.
            </p>
          )}
        </div>

        <Field
          id="coverLetter"
          label="Cover letter"
          required
          error={errors.coverLetter}
          hint={`${form.coverLetter.length} / ${MAX_COVER_LETTER} characters`}
        >
          <textarea
            id="coverLetter"
            name="coverLetter"
            rows={5}
            maxLength={MAX_COVER_LETTER}
            value={form.coverLetter}
            onChange={set("coverLetter")}
            placeholder="Why this role, what you have done that is relevant, and how you work."
            aria-invalid={errors.coverLetter ? true : undefined}
            aria-describedby={errors.coverLetter ? "coverLetter-error" : "coverLetter-hint"}
            className={cn(
              fieldBase,
              "resize-y",
              errors.coverLetter ? "border-destructive" : "border-input"
            )}
          />
        </Field>

        <div aria-live="polite">
          {status === "error" && serverError ? (
            <p
              role="alert"
              className="flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive"
            >
              <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
              {serverError}
            </p>
          ) : null}
        </div>

        <CtaButton type="submit" size="lg" disabled={status === "loading"} className="w-full">
          {status === "loading" ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Submitting&hellip;
            </>
          ) : (
            "Submit application"
          )}
        </CtaButton>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          By submitting you agree that Nolojia may store and process your details to assess your
          application. We do not share them with third parties.
        </p>
      </form>
    </div>
  )
}
