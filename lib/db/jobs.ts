import "server-only"

import { getDb } from "@/lib/cloudflare/env"
import {
  countRows,
  fromStringArray,
  newId,
  placeholders,
  toStringArray,
} from "@/lib/db/util"
import type { Job, JobRow, JobStatus } from "@/types/database"

function decode(row: JobRow): Job {
  return {
    ...row,
    requirements: toStringArray(row.requirements),
    benefits: toStringArray(row.benefits),
  }
}

/** Public: only open roles are ever exposed. Replaces the "Public can read open jobs" RLS policy. */
export async function listOpenJobs(): Promise<Job[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM jobs WHERE status = 'open' ORDER BY created_at DESC")
    .all<JobRow>()
  return results.map(decode)
}

export async function getOpenJobBySlug(slug: string): Promise<Job | null> {
  const row = await getDb()
    .prepare("SELECT * FROM jobs WHERE slug = ?1 AND status = 'open'")
    .bind(slug)
    .first<JobRow>()
  return row ? decode(row) : null
}

/** Admin: every job regardless of status. Callers must have passed requireAdmin(). */
export async function listJobsForAdmin(status?: JobStatus): Promise<Job[]> {
  const db = getDb()
  const stmt = status
    ? db
        .prepare("SELECT * FROM jobs WHERE status = ?1 ORDER BY created_at DESC")
        .bind(status)
    : db.prepare("SELECT * FROM jobs ORDER BY created_at DESC")

  const { results } = await stmt.all<JobRow>()
  return results.map(decode)
}

export async function getJobBySlugForAdmin(slug: string): Promise<Job | null> {
  const row = await getDb()
    .prepare("SELECT * FROM jobs WHERE slug = ?1")
    .bind(slug)
    .first<JobRow>()
  return row ? decode(row) : null
}

export async function listJobSummaries(): Promise<
  Pick<Job, "slug" | "title" | "department">[]
> {
  const { results } = await getDb()
    .prepare("SELECT slug, title, department FROM jobs ORDER BY title")
    .all<Pick<JobRow, "slug" | "title" | "department">>()
  return results
}

/** Application counts per job slug, in one query rather than N. */
export async function countApplicationsByJob(
  slugs: string[]
): Promise<Record<string, number>> {
  if (slugs.length === 0) return {}

  const { results } = await getDb()
    .prepare(
      `SELECT job_slug, COUNT(*) AS n FROM applications
       WHERE job_slug IN (${placeholders(slugs.length)})
       GROUP BY job_slug`
    )
    .bind(...slugs)
    .all<{ job_slug: string; n: number }>()

  return Object.fromEntries(results.map((r) => [r.job_slug, r.n]))
}

export async function countJobs(status?: JobStatus): Promise<number> {
  const db = getDb()
  return status
    ? countRows(db, "SELECT COUNT(*) AS n FROM jobs WHERE status = ?1", status)
    : countRows(db, "SELECT COUNT(*) AS n FROM jobs")
}

export interface JobInput {
  slug: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  status: JobStatus
}

export async function createJob(input: JobInput): Promise<{ id: string }> {
  const id = newId()
  await getDb()
    .prepare(
      `INSERT INTO jobs
         (id, slug, title, department, type, location, description, requirements, benefits, status)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`
    )
    .bind(
      id,
      input.slug,
      input.title,
      input.department,
      input.type,
      input.location,
      input.description,
      fromStringArray(input.requirements),
      fromStringArray(input.benefits),
      input.status
    )
    .run()
  return { id }
}

export async function updateJob(
  slug: string,
  input: Omit<JobInput, "slug">
): Promise<void> {
  await getDb()
    .prepare(
      `UPDATE jobs SET
         title = ?1, department = ?2, type = ?3, location = ?4,
         description = ?5, requirements = ?6, benefits = ?7, status = ?8
       WHERE slug = ?9`
    )
    .bind(
      input.title,
      input.department,
      input.type,
      input.location,
      input.description,
      fromStringArray(input.requirements),
      fromStringArray(input.benefits),
      input.status,
      slug
    )
    .run()
}

export async function deleteJob(slug: string): Promise<void> {
  await getDb().prepare("DELETE FROM jobs WHERE slug = ?1").bind(slug).run()
}

export async function slugExists(slug: string): Promise<boolean> {
  const row = await getDb()
    .prepare("SELECT 1 AS hit FROM jobs WHERE slug = ?1")
    .bind(slug)
    .first<{ hit: number }>()
  return row !== null
}
