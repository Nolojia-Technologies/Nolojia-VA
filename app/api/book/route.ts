import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { checkRateLimit, pruneStore } from "@/lib/email/rate-limit"
import { sanitize, validateBooking, isHoneypotFilled } from "@/lib/email/validate"
import { bookingAdminEmail, bookingReplyEmail } from "@/lib/email/templates"

const resend = new Resend(process.env.RESEND_API_KEY)

const EMAIL_FROM = process.env.EMAIL_FROM ?? "notifications@nolojia.com"
const EMAIL_TO   = process.env.EMAIL_TO   ?? "info@nolojia.com"

export async function POST(request: NextRequest) {
  pruneStore()

  // ── Rate limit (3 bookings per hour per IP) ─────────────────────────────────
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? request.headers.get("x-real-ip")
    ?? "unknown"

  const rl = checkRateLimit(ip, "book", { maxRequests: 3, windowMs: 60 * 60 * 1000 })
  if (!rl.allowed) {
    console.warn(`[book] Rate limit exceeded for IP ${ip}`)
    return NextResponse.json(
      { error: "Too many booking requests. Please try again later." },
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

  // ── Honeypot ─────────────────────────────────────────────────────────────────
  if (isHoneypotFilled(body._hp)) {
    console.warn(`[book] Honeypot triggered from IP ${ip}`)
    return NextResponse.json({ success: true })
  }

  // ── Sanitize ─────────────────────────────────────────────────────────────────
  const fields = {
    name:          sanitize(body.name),
    email:         sanitize(body.email).toLowerCase(),
    phone:         sanitize(body.phone),
    serviceType:   sanitize(body.serviceType),
    preferredDate: sanitize(body.preferredDate),
    preferredTime: sanitize(body.preferredTime),
    notes:         sanitize(body.notes),
  }

  // ── Validate ─────────────────────────────────────────────────────────────────
  const validation = validateBooking(fields)
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 422 })
  }

  const submittedAt = new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    dateStyle: "full",
    timeStyle: "short",
  }) + " UTC"

  // ── Send emails ───────────────────────────────────────────────────────────────
  try {
    const adminTemplate = bookingAdminEmail({ ...fields, submittedAt })
    const replyTemplate = bookingReplyEmail({ ...fields, submittedAt })

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
      console.error("[book] Admin email failed:", JSON.stringify(adminResult.error))
      return NextResponse.json(
        { error: "Failed to submit your booking. Please try again or email us directly at info@nolojia.com" },
        { status: 500 }
      )
    }

    if (replyResult.error) {
      console.warn("[book] Reply email failed (non-fatal):", JSON.stringify(replyResult.error))
    }

    console.log(`[book] Emails sent — admin: ${adminResult.data?.id}, reply: ${replyResult.data?.id}`)
    console.log(`[book] Booking from: ${fields.email} | Service: ${fields.serviceType} | ${fields.preferredDate} ${fields.preferredTime} | IP: ${ip}`)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[book] Email send error:", err)
    return NextResponse.json(
      { error: "Failed to submit your booking. Please try again or email us directly at info@nolojia.com" },
      { status: 500 }
    )
  }
}
