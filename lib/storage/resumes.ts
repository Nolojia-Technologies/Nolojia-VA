import "server-only"

import { getResumeBucket } from "@/lib/cloudflare/env"

/**
 * CV storage in R2.
 *
 * The bucket is private and has no public URL. That is a deliberate change from
 * the Supabase setup, where the row stored a `resume_url`: a candidate's CV is
 * personal data, and a guessable or leaked URL should not be enough to read it.
 * Applications store the object *key*, and the file is served back only through
 * an authenticated admin route that re-checks the caller.
 */

const ALLOWED_TYPES = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "docx",
  ],
])

export const MAX_RESUME_BYTES = 5 * 1024 * 1024

export type ResumeUploadResult =
  | { ok: true; key: string }
  | { ok: false; error: string }

/** Strips anything that could escape the key namespace or confuse a download header. */
function safeName(name: string): string {
  return name
    .replace(/[^\w.\- ]+/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 80)
}

export async function uploadResume(
  file: File,
  applicantEmail: string
): Promise<ResumeUploadResult> {
  const extension = ALLOWED_TYPES.get(file.type)
  if (!extension) {
    return { ok: false, error: "Please upload a PDF, DOC or DOCX file." }
  }
  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: "That file is larger than 5 MB." }
  }
  if (file.size === 0) {
    return { ok: false, error: "That file is empty." }
  }

  // Date prefix keeps the bucket browsable; the uuid stops one applicant
  // guessing another's key from their own.
  const today = new Date().toISOString().slice(0, 10)
  const key = `resumes/${today}/${crypto.randomUUID()}-${safeName(file.name)}`

  try {
    await getResumeBucket().put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type,
        // Always download; never render a candidate-supplied file inline.
        contentDisposition: `attachment; filename="${safeName(file.name)}"`,
      },
      customMetadata: {
        applicantEmail,
        uploadedAt: new Date().toISOString(),
      },
    })
    return { ok: true, key }
  } catch (error) {
    console.error("[resumes] upload failed:", (error as Error).message)
    return { ok: false, error: "Could not store the file. Please try again." }
  }
}

/** Returns the object for an authenticated download, or null when it is gone. */
export async function getResume(key: string): Promise<R2ObjectBody | null> {
  try {
    return await getResumeBucket().get(key)
  } catch (error) {
    console.error("[resumes] read failed:", (error as Error).message)
    return null
  }
}

export async function deleteResume(key: string): Promise<void> {
  try {
    await getResumeBucket().delete(key)
  } catch (error) {
    console.error("[resumes] delete failed:", (error as Error).message)
  }
}
