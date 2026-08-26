'use server'

import { revalidatePath } from 'next/cache'

import { getAdminOrStatus } from '@/lib/auth/access'
import * as applications from '@/lib/db/applications'
import * as jobs from '@/lib/db/jobs'
import * as notifications from '@/lib/db/notifications'
import * as profiles from '@/lib/db/profiles'
import {
  ADMIN_ROLES,
  APPLICATION_STATUSES,
  JOB_STATUSES,
  type AdminRole,
  type ApplicationStatus,
  type JobStatus,
  type ProfileRow,
} from '@/types/database'

/**
 * Every mutation the admin console can perform.
 *
 * These exist because D1 has no browser client — the old code mutated Supabase
 * straight from client components and leaned on RLS to decide whether the write
 * was allowed. That safety net is gone, so each action re-derives the caller's
 * identity from the Cloudflare Access token and checks it here. Nothing in this
 * file trusts an argument to tell it who is calling.
 *
 * Server actions are POST endpoints reachable by anyone who can guess the id.
 * Treat every one as a public route that happens to be typed.
 */

export type ActionResult = { ok: true } | { ok: false; error: string }

const DENIED: ActionResult = { ok: false, error: 'You do not have access to do that.' }
const UNAUTHENTICATED: ActionResult = { ok: false, error: 'Please sign in again.' }

/** Resolves the caller, or returns the failure to hand straight back to the UI. */
async function authorize(
  allowed?: readonly AdminRole[]
): Promise<{ ok: true; profile: ProfileRow } | { ok: false; result: ActionResult }> {
  const auth = await getAdminOrStatus()
  if (!auth.ok) {
    return { ok: false, result: auth.status === 401 ? UNAUTHENTICATED : DENIED }
  }
  if (allowed && (!auth.profile.admin_role || !allowed.includes(auth.profile.admin_role))) {
    return { ok: false, result: DENIED }
  }
  return { ok: true, profile: auth.profile }
}

/** Never trust a string from the client to be one of the enum values. */
const isApplicationStatus = (v: unknown): v is ApplicationStatus =>
  typeof v === 'string' && (APPLICATION_STATUSES as readonly string[]).includes(v)

const isJobStatus = (v: unknown): v is JobStatus =>
  typeof v === 'string' && (JOB_STATUSES as readonly string[]).includes(v)

const isAdminRole = (v: unknown): v is AdminRole =>
  typeof v === 'string' && (ADMIN_ROLES as readonly string[]).includes(v)

// ── Applications ────────────────────────────────────────────────────────────

export async function updateApplicationStatusAction(
  id: string,
  status: string
): Promise<ActionResult> {
  const auth = await authorize()
  if (!auth.ok) return auth.result

  if (!isApplicationStatus(status)) {
    return { ok: false, error: 'Unknown status.' }
  }

  await applications.updateApplicationStatus(id, status)
  revalidatePath(`/admin/applicants/${id}`)
  revalidatePath('/admin/applicants')
  revalidatePath('/admin/dashboard')
  return { ok: true }
}

// ── Notes ───────────────────────────────────────────────────────────────────

export async function addNoteAction(
  applicationId: string,
  content: string
): Promise<ActionResult> {
  const auth = await authorize()
  if (!auth.ok) return auth.result

  const trimmed = content.trim()
  if (!trimmed) return { ok: false, error: 'A note cannot be empty.' }
  if (trimmed.length > 5000) return { ok: false, error: 'That note is too long.' }

  await applications.addNote({
    applicationId,
    // Authorship comes from the verified session, never from the caller.
    authorId: auth.profile.id,
    authorName: auth.profile.full_name ?? auth.profile.email,
    content: trimmed,
  })

  revalidatePath(`/admin/applicants/${applicationId}`)
  return { ok: true }
}

export async function deleteNoteAction(
  noteId: string,
  applicationId: string
): Promise<ActionResult> {
  const auth = await authorize()
  if (!auth.ok) return auth.result

  // Scoped to the author in the DELETE itself, so a note belonging to someone
  // else simply does not match.
  const deleted = await applications.deleteOwnNote(noteId, auth.profile.id)
  if (!deleted) return { ok: false, error: 'You can only delete your own notes.' }

  revalidatePath(`/admin/applicants/${applicationId}`)
  return { ok: true }
}

// ── Jobs ────────────────────────────────────────────────────────────────────

const JOB_EDITORS: readonly AdminRole[] = ['super_admin', 'hr_manager']

export interface JobFormInput {
  slug?: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  status: string
}

function validateJob(input: JobFormInput): string | null {
  if (input.title.trim().length < 2) return 'Please enter a job title.'
  if (!input.department.trim()) return 'Please choose a department.'
  if (!isJobStatus(input.status)) return 'Unknown status.'
  return null
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export async function createJobAction(input: JobFormInput): Promise<ActionResult> {
  const auth = await authorize(JOB_EDITORS)
  if (!auth.ok) return auth.result

  const invalid = validateJob(input)
  if (invalid) return { ok: false, error: invalid }

  const slug = slugify(input.title)
  if (!slug) return { ok: false, error: 'That title does not produce a usable URL.' }
  if (await jobs.slugExists(slug)) {
    return { ok: false, error: 'A job with that title already exists.' }
  }

  await jobs.createJob({
    slug,
    title: input.title.trim(),
    department: input.department,
    type: input.type,
    location: input.location,
    description: input.description,
    requirements: input.requirements.filter((r) => r.trim()),
    benefits: input.benefits.filter((b) => b.trim()),
    status: input.status as JobStatus,
  })

  revalidatePath('/admin/jobs')
  revalidatePath('/careers')
  return { ok: true }
}

export async function updateJobAction(
  slug: string,
  input: JobFormInput
): Promise<ActionResult> {
  const auth = await authorize(JOB_EDITORS)
  if (!auth.ok) return auth.result

  const invalid = validateJob(input)
  if (invalid) return { ok: false, error: invalid }

  await jobs.updateJob(slug, {
    title: input.title.trim(),
    department: input.department,
    type: input.type,
    location: input.location,
    description: input.description,
    requirements: input.requirements.filter((r) => r.trim()),
    benefits: input.benefits.filter((b) => b.trim()),
    status: input.status as JobStatus,
  })

  revalidatePath('/admin/jobs')
  revalidatePath(`/careers/${slug}`)
  revalidatePath('/careers')
  return { ok: true }
}

export async function deleteJobAction(slug: string): Promise<ActionResult> {
  const auth = await authorize(JOB_EDITORS)
  if (!auth.ok) return auth.result

  await jobs.deleteJob(slug)
  revalidatePath('/admin/jobs')
  revalidatePath('/careers')
  return { ok: true }
}

// ── Team ────────────────────────────────────────────────────────────────────

const TEAM_MANAGERS: readonly AdminRole[] = ['super_admin']

export async function grantAdminAction(
  email: string,
  adminRole: string
): Promise<ActionResult> {
  const auth = await authorize(TEAM_MANAGERS)
  if (!auth.ok) return auth.result

  const normalised = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalised)) {
    return { ok: false, error: 'Please enter a valid email address.' }
  }
  if (!isAdminRole(adminRole)) return { ok: false, error: 'Unknown role.' }

  await profiles.grantAdmin(normalised, adminRole)
  revalidatePath('/admin/team')
  return { ok: true }
}

export async function setAdminRoleAction(
  id: string,
  adminRole: string
): Promise<ActionResult> {
  const auth = await authorize(TEAM_MANAGERS)
  if (!auth.ok) return auth.result

  if (!isAdminRole(adminRole)) return { ok: false, error: 'Unknown role.' }

  // Demoting yourself out of super_admin when you are the last one leaves the
  // account with nobody who can manage the team.
  if (id === auth.profile.id && adminRole !== 'super_admin') {
    const remaining = await profiles.countSuperAdmins()
    if (remaining <= 1) {
      return { ok: false, error: 'You are the only super admin — promote someone else first.' }
    }
  }

  await profiles.setAdminRole(id, adminRole)
  revalidatePath('/admin/team')
  return { ok: true }
}

export async function revokeAdminAction(id: string): Promise<ActionResult> {
  const auth = await authorize(TEAM_MANAGERS)
  if (!auth.ok) return auth.result

  if (id === auth.profile.id) {
    return { ok: false, error: 'You cannot remove your own access.' }
  }

  await profiles.revokeAdmin(id)
  revalidatePath('/admin/team')
  return { ok: true }
}

// ── Notifications ───────────────────────────────────────────────────────────

export async function markNotificationReadAction(id: string): Promise<ActionResult> {
  const auth = await authorize()
  if (!auth.ok) return auth.result

  await notifications.markRead(id, auth.profile.id)
  revalidatePath('/admin/notifications')
  return { ok: true }
}

export async function markAllNotificationsReadAction(): Promise<ActionResult> {
  const auth = await authorize()
  if (!auth.ok) return auth.result

  await notifications.markAllRead(auth.profile.id)
  revalidatePath('/admin/notifications')
  revalidatePath('/admin/dashboard')
  return { ok: true }
}
