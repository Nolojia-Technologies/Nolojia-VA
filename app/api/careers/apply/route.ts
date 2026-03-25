import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { checkRateLimit, pruneStore } from "@/lib/email/rate-limit"
import { sanitize, isValidEmail, isValidPhone, isHoneypotFilled } from "@/lib/email/validate"
import { applicationAdminEmail, applicationConfirmEmail } from "@/lib/email/templates"
import { createAdminClient } from "@/lib/supabase/admin"

const EMAIL_FROM    = process.env.EMAIL_FROM    ?? "notifications@nolojia.com"
const CAREERS_EMAIL = process.env.CAREERS_EMAIL ?? "info@nolojia.com"

const ALLOWED_MIME = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB

export async function POST(request: NextRequest) {
  pruneStore()

  // ── Rate limit (3 per hour per IP) ─────────────────────────────────────────
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"

  const rl = checkRateLimit(ip, "careers-apply", { maxRequests: 3, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    console.warn(`[careers] Rate limit exceeded for IP ${ip}`)
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    )
  }

  // ── Parse multipart form data ───────────────────────────────────────────────
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  // ── Honeypot ───────────────────────────────────────────────────────────────
  const honeypot = formData.get("_hp")
  if (isHoneypotFilled(honeypot)) {
    console.warn(`[careers] Honeypot triggered from IP ${ip}`)
    return NextResponse.json({ success: true })
  }

  // ── Sanitize fields ────────────────────────────────────────────────────────
  const f = {
    jobSlug:         sanitize(formData.get("jobSlug")),
    jobTitle:        sanitize(formData.get("jobTitle")),
    fullName:        sanitize(formData.get("fullName")),
    email:           sanitize(formData.get("email")).toLowerCase(),
    phone:           sanitize(formData.get("phone")),
    location:        sanitize(formData.get("location")),
    linkedin:        sanitize(formData.get("linkedin")),
    portfolio:       sanitize(formData.get("portfolio")),
    coverLetter:     sanitize(formData.get("coverLetter")),
    yearsExperience: sanitize(formData.get("yearsExperience")),
    expectedSalary:  sanitize(formData.get("expectedSalary")),
  }

  // ── Validate required fields ───────────────────────────────────────────────
  if (!f.fullName || f.fullName.length < 2)
    return NextResponse.json({ error: "Please enter your full name." }, { status: 422 })
  if (!isValidEmail(f.email))
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 })
  if (f.phone && !isValidPhone(f.phone))
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 422 })
  if (!f.coverLetter || f.coverLetter.length < 20)
    return NextResponse.json({ error: "Please write a cover letter (at least 20 characters)." }, { status: 422 })
  if (f.coverLetter.length > 5000)
    return NextResponse.json({ error: "Cover letter is too long (max 5000 characters)." }, { status: 422 })
  if (!f.jobSlug || !f.jobTitle)
    return NextResponse.json({ error: "Invalid application target." }, { status: 422 })

  // ── File upload ────────────────────────────────────────────────────────────
  const resumeFile = formData.get("resume") as File | null
  let resumeUrl: string | null = null

  if (resumeFile && resumeFile instanceof File && resumeFile.size > 0) {
    if (!ALLOWED_MIME.includes(resumeFile.type))
      return NextResponse.json({ error: "Resume must be a PDF, DOC, or DOCX file." }, { status: 422 })
    if (resumeFile.size > MAX_FILE_SIZE)
      return NextResponse.json({ error: "Resume must be smaller than 5 MB." }, { status: 422 })

    const supabase = createAdminClient()
    if (supabase) {
      const ext      = resumeFile.name.split(".").pop()?.toLowerCase() ?? "pdf"
      const safeName = f.fullName.replace(/[^a-z0-9]/gi, "-").toLowerCase()
      const path     = `applications/${f.jobSlug}/${Date.now()}-${safeName}.${ext}`
      const bytes    = await resumeFile.arrayBuffer()

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, bytes, { contentType: resumeFile.type, upsert: false })

      if (uploadError) {
        console.error("[careers] Storage upload failed:", uploadError.message)
      } else {
        resumeUrl = uploadData.path
        console.log(`[careers] Resume uploaded: ${resumeUrl}`)
      }
    }
  }

  // ── Save to database ───────────────────────────────────────────────────────
  const supabase = createAdminClient()
  if (supabase) {
    const { error: dbError } = await supabase.from("applications").insert({
      job_slug:         f.jobSlug,
      job_title:        f.jobTitle,
      full_name:        f.fullName,
      email:            f.email,
      phone:            f.phone || null,
      location:         f.location || null,
      linkedin:         f.linkedin || null,
      portfolio:        f.portfolio || null,
      resume_url:       resumeUrl,
      cover_letter:     f.coverLetter,
      years_experience: f.yearsExperience || null,
      expected_salary:  f.expectedSalary || null,
      status:           "new",
    })
    if (dbError) {
      console.error("[careers] DB insert failed:", dbError.message)
    } else {
      console.log(`[careers] Application saved — ${f.email} → ${f.jobTitle}`)
    }
  }

  // ── Send emails ────────────────────────────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[careers] RESEND_API_KEY is not set — emails skipped")
    // Application is saved; return success so the user isn't blocked
    return NextResponse.json({ success: true })
  }

  const resend = new Resend(apiKey)

  const submittedAt =
    new Date().toLocaleString("en-US", {
      timeZone: "UTC",
      dateStyle: "full",
      timeStyle: "short",
    }) + " UTC"

  const adminTpl   = applicationAdminEmail({ ...f, resumeUrl, submittedAt })
  const confirmTpl = applicationConfirmEmail(f.fullName, f.email, f.jobTitle)

  // Send both emails; treat admin email as critical, confirm as best-effort
  const [adminResult, confirmResult] = await Promise.allSettled([
    resend.emails.send({
      from:    EMAIL_FROM,
      to:      [CAREERS_EMAIL],
      replyTo: f.email,
      subject: adminTpl.subject,
      html:    adminTpl.html,
    }),
    resend.emails.send({
      from:    EMAIL_FROM,
      to:      [f.email],
      subject: confirmTpl.subject,
      html:    confirmTpl.html,
    }),
  ])

  // Log admin email result
  if (adminResult.status === "fulfilled") {
    if (adminResult.value.error) {
      console.error(
        `[careers] Admin email FAILED — from: ${EMAIL_FROM} to: ${CAREERS_EMAIL}`,
        JSON.stringify(adminResult.value.error)
      )
    } else {
      console.log(`[careers] Admin email sent — id: ${adminResult.value.data?.id} to: ${CAREERS_EMAIL}`)
    }
  } else {
    console.error("[careers] Admin email threw:", adminResult.reason)
  }

  // Log confirm email result
  if (confirmResult.status === "fulfilled") {
    if (confirmResult.value.error) {
      console.warn(
        `[careers] Confirm email FAILED — to: ${f.email}`,
        JSON.stringify(confirmResult.value.error)
      )
    } else {
      console.log(`[careers] Confirm email sent — id: ${confirmResult.value.data?.id} to: ${f.email}`)
    }
  } else {
    console.warn("[careers] Confirm email threw:", confirmResult.reason)
  }

  console.log(`[careers] Done — ${f.email} applied for "${f.jobTitle}" from IP ${ip}`)
  return NextResponse.json({ success: true })
}
