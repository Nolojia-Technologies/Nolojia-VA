import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { checkRateLimit, pruneStore } from "@/lib/email/rate-limit"
import { sanitize, validateContact, isHoneypotFilled } from "@/lib/email/validate"
import { contactAdminEmail, contactReplyEmail } from "@/lib/email/templates"

// Lazily constructed so a missing key is a clean 503 rather than a crash at
// module load. The key never leaves the server.
function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

const EMAIL_FROM = process.env.EMAIL_FROM ?? "notifications@nolojia.com"
const EMAIL_TO   = process.env.EMAIL_TO   ?? "info@nolojia.com"

export async function POST(request: NextRequest) {
  pruneStore()

  // ── Rate limit (5 submissions per hour per IP) ──────────────────────────────
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown"

  const rl = checkRateLimit(ip, "contact", { maxRequests: 5, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    console.warn(`[contact] Rate limit exceeded for IP ${ip}`)
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    )
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  // ── Honeypot (spam protection) ───────────────────────────────────────────────
  if (isHoneypotFilled(body._hp)) {
    console.warn(`[contact] Honeypot triggered from IP ${ip}`)
    // Return 200 to not reveal detection to bots
    return NextResponse.json({ success: true })
  }

  // ── Sanitize ─────────────────────────────────────────────────────────────────
  const fields = {
    name:     sanitize(body.name),
    email:    sanitize(body.email).toLowerCase(),
    phone:    sanitize(body.phone),
    subject:  sanitize(body.subject),
    message:  sanitize(body.message),
    company:  sanitize(body.company),
    honeypot: sanitize(body._hp),
  }

  // ── Validate ─────────────────────────────────────────────────────────────────
  const validation = validateContact(fields)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 422 })
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "short",
  }) + " UTC"

  const resend = getResend()
  if (!resend) {
    console.error("[email] RESEND_API_KEY is not set — cannot send.")
    return NextResponse.json(
      { error: "We could not send your message right now. Please email info@nolojia.com directly." },
      { status: 503 }
    )
  }

  // ── Send emails ───────────────────────────────────────────────────────────────
  try {
    const adminTemplate = contactAdminEmail({ ...fields, submittedAt })
    const replyTemplate = contactReplyEmail(fields.name, fields.email)

    const [adminResult, replyResult] = await Promise.all([
      resend.emails.send({
        from: EMAIL_FROM,
        to: [EMAIL_TO],
        replyTo: fields.email,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
      }),
      resend.emails.send({
        from: EMAIL_FROM,
        to: [fields.email],
        subject: replyTemplate.subject,
        html: replyTemplate.html,
      }),
    ])

    if (adminResult.error) {
      console.error("[contact] Admin email failed:", JSON.stringify(adminResult.error))
      return NextResponse.json(
        { error: "Failed to send your message. Please try again or email us directly at info@nolojia.com" },
        { status: 500 }
      )
    }

    if (replyResult.error) {
      console.warn("[contact] Reply email failed (non-fatal):", JSON.stringify(replyResult.error))
    }

    console.log(`[contact] Emails sent — admin: ${adminResult.data?.id}, reply: ${replyResult.data?.id}`)
    console.log(`[contact] Submission from: ${fields.email} | Subject: ${fields.subject} | IP: ${ip}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[contact] Email send error:", err)
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or email us directly at info@nolojia.com" },
      { status: 500 }
    )
  }
}
