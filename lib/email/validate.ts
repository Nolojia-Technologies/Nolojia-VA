// Server-side input validation and sanitization

export function sanitize(value: unknown): string {
  if (typeof value !== "string") return ""
  return value
    .trim()
    .slice(0, 5000) // hard cap length
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // strip control chars
}

export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
  return re.test(email) && email.length <= 254
}

export function isValidPhone(phone: string): boolean {
  if (!phone) return true // optional
  return /^[\d\s\+\-\(\)\.]{7,20}$/.test(phone)
}

// Honeypot check — bots fill hidden fields, humans leave them blank
export function isHoneypotFilled(honeypot: unknown): boolean {
  return typeof honeypot === "string" && honeypot.length > 0
}

export interface ContactFields {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  company?: string
  honeypot?: string
}

export interface BookingFields {
  name: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  notes: string
  honeypot?: string
}

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string }

export function validateContact(fields: ContactFields): ValidationResult {
  if (!fields.name || fields.name.length < 2) return { ok: false, error: "Please enter your full name." }
  if (!isValidEmail(fields.email)) return { ok: false, error: "Please enter a valid email address." }
  if (fields.phone && !isValidPhone(fields.phone)) return { ok: false, error: "Please enter a valid phone number." }
  if (!fields.subject) return { ok: false, error: "Please select a subject." }
  if (!fields.message || fields.message.length < 10) return { ok: false, error: "Message must be at least 10 characters." }
  if (fields.message.length > 4000) return { ok: false, error: "Message is too long (max 4000 characters)." }
  return { ok: true }
}

export function validateBooking(fields: BookingFields): ValidationResult {
  if (!fields.name || fields.name.length < 2) return { ok: false, error: "Please enter your full name." }
  if (!isValidEmail(fields.email)) return { ok: false, error: "Please enter a valid email address." }
  if (fields.phone && !isValidPhone(fields.phone)) return { ok: false, error: "Please enter a valid phone number." }
  if (!fields.serviceType) return { ok: false, error: "Please select a service type." }
  if (!fields.preferredDate) return { ok: false, error: "Please select a preferred date." }
  if (!fields.preferredTime) return { ok: false, error: "Please select a preferred time." }
  if (fields.notes && fields.notes.length > 2000) return { ok: false, error: "Notes are too long (max 2000 characters)." }
  return { ok: true }
}
