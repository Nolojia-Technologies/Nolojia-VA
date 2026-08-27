// ─── Shared email styles ──────────────────────────────────────────────────────

const brand = {
  primary: "#2D2B7F",
  accent: "#4A47C4",
  dark: "#0F0E2E",
}

function baseLayout(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nolojia</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:${brand.dark};border-radius:12px 12px 0 0;padding:28px 32px;text-align:center;">
          <span style="color:#fff;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Nolojia</span>
          <span style="color:#9996ED;font-size:13px;display:block;margin-top:4px;">AI-Powered Virtual Assistant Services</span>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px 32px;">
          ${content}
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f8f8fc;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;border-top:1px solid #e8e8f0;">
          <p style="margin:0 0 6px;font-size:12px;color:#999;">
            Nolojia Limited &nbsp;·&nbsp; <a href="https://www.nolojia.com" style="color:${brand.primary};text-decoration:none;">nolojia.com</a>
          </p>
          <p style="margin:0;font-size:11px;color:#bbb;">
            This email was sent from the Nolojia website contact system.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;vertical-align:top;width:140px;">
      <span style="font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.5px;">${label}</span>
    </td>
    <td style="padding:8px 0;vertical-align:top;">
      <span style="font-size:14px;color:#1a1a2e;font-weight:500;">${value || "—"}</span>
    </td>
  </tr>`
}

// ─── Contact form — admin notification ───────────────────────────────────────

export interface ContactAdminData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  company?: string
  submittedAt: string
}

export function contactAdminEmail(data: ContactAdminData): { subject: string; html: string } {
  const html = baseLayout(`
    <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:${brand.dark};">New Contact Form Submission</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#666;">Received on ${data.submittedAt}</p>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", data.name)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:${brand.primary};">${data.email}</a>`)}
        ${row("Phone", data.phone || "Not provided")}
        ${data.company ? row("Company", data.company) : ""}
        ${row("Subject", data.subject)}
      </table>
    </div>

    <div style="margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
      <div style="background:#fff;border:1px solid #e8e8f0;border-left:4px solid ${brand.primary};border-radius:8px;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
      </div>
    </div>

    <a href="mailto:${data.email}" style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
      Reply to ${data.name}
    </a>
  `)

  return {
    subject: "New Contact Form Submission – Nolojia",
    html,
  }
}

// ─── Contact form — user auto-reply ──────────────────────────────────────────

export function contactReplyEmail(name: string, userEmail: string): { subject: string; html: string } {
  const html = baseLayout(`
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${brand.dark};">We&apos;ve received your message, ${name.split(" ")[0]}.</h2>

    <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 16px;">
      Thank you for contacting Nolojia. Our team has received your message and will respond to you at
      <strong>${userEmail}</strong> within one business day.
    </p>

    <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 24px;">
      In the meantime, feel free to explore how we help business owners reclaim their time:
    </p>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 12px;font-weight:700;color:${brand.dark};font-size:14px;">What happens next?</p>
      <ol style="margin:0;padding-left:18px;color:#555;font-size:14px;line-height:2;">
        <li>A member of our team reviews your message</li>
        <li>We reach out within 1 business day</li>
        <li>We schedule a free 25-minute discovery call</li>
        <li>You start delegating — and reclaiming your time</li>
      </ol>
    </div>

    <a href="https://www.nolojia.com/services" style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;margin-right:12px;">
      Explore Our Services
    </a>
    <a href="https://www.nolojia.com/book" style="display:inline-block;background:#fff;color:${brand.primary};text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;border:2px solid ${brand.primary};">
      Book a Call
    </a>

    <p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;">
      If you have an urgent matter, email us directly at
      <a href="mailto:info@nolojia.com" style="color:${brand.primary};">info@nolojia.com</a>
    </p>
  `)

  return {
    subject: "We received your message – Nolojia",
    html,
  }
}

// ─── Booking form — admin notification ───────────────────────────────────────

export interface BookingAdminData {
  name: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  notes: string
  submittedAt: string
}

export function bookingAdminEmail(data: BookingAdminData): { subject: string; html: string } {
  const html = baseLayout(`
    <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:${brand.dark};">New Service Booking Request</h2>
    <p style="margin:0 0 24px;font-size:14px;color:#666;">Submitted on ${data.submittedAt}</p>

    <div style="background:#fff5f5;border:1px solid #fde8e8;border-radius:10px;padding:14px 20px;margin-bottom:20px;display:flex;align-items:center;">
      <span style="font-size:13px;font-weight:600;color:#c0392b;">⚡ Action required — respond within 1 business day</span>
    </div>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", data.name)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:${brand.primary};">${data.email}</a>`)}
        ${row("Phone", data.phone || "Not provided")}
        ${row("Service", data.serviceType)}
        ${row("Date", data.preferredDate)}
        ${row("Time", data.preferredTime)}
      </table>
    </div>

    ${data.notes ? `
    <div style="margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Additional Notes</p>
      <div style="background:#fff;border:1px solid #e8e8f0;border-left:4px solid ${brand.accent};border-radius:8px;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.notes)}</p>
      </div>
    </div>` : ""}

    <a href="mailto:${data.email}" style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
      Contact ${data.name}
    </a>
  `)

  return {
    subject: "New Service Booking – Nolojia",
    html,
  }
}

// ─── Booking form — customer confirmation ─────────────────────────────────────

export function bookingReplyEmail(data: BookingAdminData): { subject: string; html: string } {
  const html = baseLayout(`
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${brand.dark};">Booking request received, ${data.name.split(" ")[0]}!</h2>

    <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 24px;">
      Thank you for your interest in Nolojia&apos;s <strong>${data.serviceType}</strong> service.
      We&apos;ve received your booking request and our team will be in touch at
      <strong>${data.email}</strong> within one business day to confirm your appointment.
    </p>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 14px;font-weight:700;color:${brand.dark};font-size:14px;">Your Booking Summary</p>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Service", data.serviceType)}
        ${row("Requested Date", data.preferredDate)}
        ${row("Requested Time", data.preferredTime)}
        ${data.phone ? row("Your Phone", data.phone) : ""}
      </table>
    </div>

    <p style="font-size:14px;color:#666;line-height:1.7;margin:0 0 24px;">
      <strong>Please note:</strong> This is a booking <em>request</em>. Your session is confirmed once you receive a follow-up email from our team.
    </p>

    <a href="https://www.nolojia.com/services" style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;margin-right:12px;">
      Explore Our Services
    </a>

    <p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;">
      Questions? Email us at
      <a href="mailto:info@nolojia.com" style="color:${brand.primary};">info@nolojia.com</a>
    </p>
  `)

  return {
    subject: "Booking request received – Nolojia",
    html,
  }
}

// ─── Careers application — admin notification ────────────────────────────────

export interface ApplicationAdminData {
  jobSlug: string
  jobTitle: string
  fullName: string
  email: string
  phone: string
  location: string
  linkedin: string
  portfolio: string
  coverLetter: string
  yearsExperience: string
  expectedSalary: string
  /** Link to the application in the admin console. The CV is downloaded from
   *  there, behind Access — it is no longer a public URL that can be pasted
   *  into an email. */
  adminUrl: string
  hasResume: boolean
  submittedAt: string
}

export function applicationAdminEmail(data: ApplicationAdminData): { subject: string; html: string } {
  const html = baseLayout(`
    <h2 style="margin:0 0 4px;font-size:22px;font-weight:700;color:${brand.dark};">New Job Application Received</h2>
    <p style="margin:0 0 6px;font-size:14px;color:#666;">Role: <strong>${escapeHtml(data.jobTitle)}</strong></p>
    <p style="margin:0 0 24px;font-size:13px;color:#999;">Submitted on ${data.submittedAt}</p>

    <div style="background:#f0f0fa;border:1px solid #d8d8f0;border-radius:10px;padding:14px 20px;margin-bottom:20px;">
      <span style="font-size:13px;font-weight:600;color:${brand.primary};">⚡ Review this application in the admin console, or reply directly to the applicant.</span>
    </div>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
      <table style="width:100%;border-collapse:collapse;">
        ${row("Name", data.fullName)}
        ${row("Email", `<a href="mailto:${data.email}" style="color:${brand.primary};">${data.email}</a>`)}
        ${row("Phone", data.phone || "Not provided")}
        ${row("Location", data.location || "Not provided")}
        ${data.linkedin ? row("LinkedIn", `<a href="${escapeHtml(data.linkedin)}" style="color:${brand.primary};">${escapeHtml(data.linkedin)}</a>`) : ""}
        ${data.portfolio ? row("Portfolio", `<a href="${escapeHtml(data.portfolio)}" style="color:${brand.primary};">${escapeHtml(data.portfolio)}</a>`) : ""}
        ${data.yearsExperience ? row("Experience", data.yearsExperience) : ""}
        ${data.expectedSalary ? row("Exp. Salary", data.expectedSalary) : ""}
        ${data.hasResume
          ? row("CV", `<span style="color:#2e7d32;font-weight:600;">✓ Attached</span> <span style="color:#999;font-size:12px;">— download it from the console</span>`)
          : row("CV", "Not provided")}
      </table>
    </div>

    <div style="margin-bottom:28px;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.5px;">Cover Letter</p>
      <div style="background:#fff;border:1px solid #e8e8f0;border-left:4px solid ${brand.primary};border-radius:8px;padding:16px 20px;">
        <p style="margin:0;font-size:14px;color:#333;line-height:1.8;white-space:pre-wrap;">${escapeHtml(data.coverLetter)}</p>
      </div>
    </div>

    <a href="${escapeHtml(data.adminUrl)}"
       style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;margin-right:12px;">
      Open in console
    </a>

    <a href="mailto:${data.email}?subject=Re: Your application for ${encodeURIComponent(data.jobTitle)} at Nolojia"
       style="display:inline-block;background:#fff;border:1px solid ${brand.primary};color:${brand.primary};text-decoration:none;font-size:14px;font-weight:600;padding:11px 23px;border-radius:8px;">
      Reply to ${escapeHtml(data.fullName.split(" ")[0])}
    </a>
  `)

  return {
    subject: `New Application: ${data.jobTitle} — ${data.fullName}`,
    html,
  }
}

// ─── Careers application — applicant confirmation ─────────────────────────────

export function applicationConfirmEmail(
  name: string,
  userEmail: string,
  jobTitle: string
): { subject: string; html: string } {
  const firstName = name.split(" ")[0]

  const html = baseLayout(`
    <h2 style="margin:0 0 16px;font-size:22px;font-weight:700;color:${brand.dark};">Application received, ${escapeHtml(firstName)}!</h2>

    <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 12px;">
      Thank you for applying to the <strong>${escapeHtml(jobTitle)}</strong> role at Nolojia.
      We've received your application and our team will review it personally.
    </p>

    <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 28px;">
      We'll get back to you at <strong>${userEmail}</strong> within <strong>5 business days</strong>.
    </p>

    <div style="background:#f8f8fc;border-radius:10px;padding:20px 24px;margin-bottom:28px;">
      <p style="margin:0 0 14px;font-weight:700;color:${brand.dark};font-size:14px;">What happens next?</p>
      <ol style="margin:0;padding-left:18px;color:#555;font-size:14px;line-height:2.2;">
        <li>Our team personally reviews every application — no bots here</li>
        <li>If there's a match, we'll invite you to a <strong>20-minute intro call</strong></li>
        <li>You'll complete a short, <strong>paid skills assessment</strong> (under 2 hours)</li>
        <li>If it's a great fit, we move to an offer — <strong>within 48 hours</strong></li>
      </ol>
    </div>

    <p style="font-size:14px;color:#666;line-height:1.7;margin:0 0 28px;">
      In the meantime, feel free to explore how we operate and what our team looks like:
    </p>

    <a href="https://www.nolojia.com/about"
       style="display:inline-block;background:${brand.primary};color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;margin-right:12px;">
      About Nolojia
    </a>
    <a href="https://www.nolojia.com/careers"
       style="display:inline-block;background:#fff;color:${brand.primary};text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;border:2px solid ${brand.primary};">
      View All Roles
    </a>

    <p style="font-size:13px;color:#999;margin:28px 0 0;line-height:1.6;">
      Questions? Email us at
      <a href="mailto:info@nolojia.com" style="color:${brand.primary};">info@nolojia.com</a>
    </p>
  `)

  return {
    subject: `Application received — ${jobTitle} at Nolojia`,
    html,
  }
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
