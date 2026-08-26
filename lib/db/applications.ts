import "server-only"

import { getDb } from "@/lib/cloudflare/env"
import { countRows, escapeLike, newId, placeholders } from "@/lib/db/util"
import type {
  Application,
  ApplicationNote,
  ApplicationStatus,
} from "@/types/database"

/**
 * Applications were service-role-only in Postgres — no RLS policy granted the
 * anon role any access at all. The equivalent here is that nothing in this
 * module is reachable from a public page: every caller sits behind
 * requireAdmin(), except createApplication which is the public careers form.
 */

export interface ApplicationFilters {
  status?: ApplicationStatus
  /** Restricts to jobs in these departments — used to scope HR roles. */
  departments?: string[]
  /** Matches name or email. */
  search?: string
  /** A single job listing. */
  jobSlug?: string
}

/**
 * Builds the shared WHERE clause so the list query and its count can never
 * disagree about what is being filtered — which is how you end up paginating
 * over one result set and counting another.
 */
function buildFilter(filters: ApplicationFilters): { sql: string; binds: unknown[] } {
  const where: string[] = []
  const binds: unknown[] = []

  if (filters.status) {
    binds.push(filters.status)
    where.push(`status = ?${binds.length}`)
  }

  if (filters.jobSlug) {
    binds.push(filters.jobSlug)
    where.push(`job_slug = ?${binds.length}`)
  }

  if (filters.departments?.length) {
    const start = binds.length
    binds.push(...filters.departments)
    where.push(
      `job_slug IN (SELECT slug FROM jobs WHERE department IN (${placeholders(
        filters.departments.length,
        start
      )}))`
    )
  }

  if (filters.search?.trim()) {
    const term = `%${escapeLike(filters.search.trim())}%`
    binds.push(term, term)
    where.push(
      `(full_name LIKE ?${binds.length - 1} ESCAPE '\\' OR email LIKE ?${binds.length} ESCAPE '\\')`
    )
  }

  return { sql: where.length ? ` WHERE ${where.join(" AND ")}` : "", binds }
}

/** Total matching a filter. Uses the same WHERE as the list, by construction. */
export async function countFilteredApplications(
  filters: ApplicationFilters = {}
): Promise<number> {
  const { sql, binds } = buildFilter(filters)
  return countRows(getDb(), `SELECT COUNT(*) AS n FROM applications${sql}`, ...binds)
}

export async function listApplications(
  filters: ApplicationFilters = {},
  page?: { limit: number; offset: number }
): Promise<Application[]> {
  const { sql: whereSql, binds } = buildFilter(filters)

  let sql = `SELECT * FROM applications${whereSql} ORDER BY created_at DESC`
  if (page) {
    binds.push(page.limit, page.offset)
    sql += ` LIMIT ?${binds.length - 1} OFFSET ?${binds.length}`
  }

  const { results } = await getDb()
    .prepare(sql)
    .bind(...binds)
    .all<Application>()
  return results
}

export async function getApplication(id: string): Promise<Application | null> {
  return await getDb()
    .prepare("SELECT * FROM applications WHERE id = ?1")
    .bind(id)
    .first<Application>()
}

export async function listRecentApplications(limit = 8): Promise<Application[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM applications ORDER BY created_at DESC LIMIT ?1")
    .bind(limit)
    .all<Application>()
  return results
}

export async function listRecentHires(limit = 10): Promise<Application[]> {
  const { results } = await getDb()
    .prepare(
      "SELECT * FROM applications WHERE status = 'hired' ORDER BY created_at DESC LIMIT ?1"
    )
    .bind(limit)
    .all<Application>()
  return results
}

export async function countApplications(status?: ApplicationStatus): Promise<number> {
  const db = getDb()
  return status
    ? countRows(db, "SELECT COUNT(*) AS n FROM applications WHERE status = ?1", status)
    : countRows(db, "SELECT COUNT(*) AS n FROM applications")
}

/** Applications created on or after an ISO timestamp — used by the reports page. */
export async function countApplicationsSince(sinceIso: string): Promise<number> {
  return countRows(
    getDb(),
    "SELECT COUNT(*) AS n FROM applications WHERE created_at >= ?1",
    sinceIso
  )
}

export async function countApplicationsBetween(
  fromIso: string,
  toIso: string
): Promise<number> {
  return countRows(
    getDb(),
    "SELECT COUNT(*) AS n FROM applications WHERE created_at >= ?1 AND created_at < ?2",
    fromIso,
    toIso
  )
}

/** Status totals in one pass, for the analytics page. */
export async function applicationStatusBreakdown(): Promise<
  Record<ApplicationStatus, number>
> {
  const { results } = await getDb()
    .prepare("SELECT status, COUNT(*) AS n FROM applications GROUP BY status")
    .all<{ status: ApplicationStatus; n: number }>()

  const totals: Record<ApplicationStatus, number> = {
    new: 0,
    reviewed: 0,
    shortlisted: 0,
    hired: 0,
    rejected: 0,
  }
  for (const row of results) totals[row.status] = row.n
  return totals
}

export interface NewApplication {
  jobSlug: string
  jobTitle: string
  fullName: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
  portfolio?: string
  resumeKey: string | null
  coverLetter: string
  yearsExperience?: string
  expectedSalary?: string
}

/** The only write in this module reachable from a public route. */
export async function createApplication(input: NewApplication): Promise<{ id: string }> {
  const id = newId()
  await getDb()
    .prepare(
      `INSERT INTO applications
         (id, job_slug, job_title, full_name, email, phone, location, linkedin,
          portfolio, resume_key, cover_letter, years_experience, expected_salary)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`
    )
    .bind(
      id,
      input.jobSlug,
      input.jobTitle,
      input.fullName,
      input.email,
      input.phone ?? null,
      input.location ?? null,
      input.linkedin ?? null,
      input.portfolio ?? null,
      input.resumeKey,
      input.coverLetter,
      input.yearsExperience ?? null,
      input.expectedSalary ?? null
    )
    .run()
  return { id }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<void> {
  await getDb()
    .prepare("UPDATE applications SET status = ?1 WHERE id = ?2")
    .bind(status, id)
    .run()
}

// ── Notes ───────────────────────────────────────────────────────────────────

export async function listNotes(applicationId: string): Promise<ApplicationNote[]> {
  const { results } = await getDb()
    .prepare(
      "SELECT * FROM application_notes WHERE application_id = ?1 ORDER BY created_at ASC"
    )
    .bind(applicationId)
    .all<ApplicationNote>()
  return results
}

export async function addNote(input: {
  applicationId: string
  authorId: string
  authorName: string | null
  content: string
}): Promise<ApplicationNote> {
  const id = newId()
  await getDb()
    .prepare(
      `INSERT INTO application_notes (id, application_id, author_id, author_name, content)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
    .bind(id, input.applicationId, input.authorId, input.authorName, input.content)
    .run()

  const row = await getDb()
    .prepare("SELECT * FROM application_notes WHERE id = ?1")
    .bind(id)
    .first<ApplicationNote>()

  if (!row) throw new Error("note insert did not return a row")
  return row
}

/**
 * Deletes a note only if the caller wrote it. The author check is part of the
 * statement rather than a separate read, so there is no window between checking
 * and deleting — this is what the old `USING (author_id = auth.uid())` RLS
 * policy did.
 */
export async function deleteOwnNote(noteId: string, authorId: string): Promise<boolean> {
  const result = await getDb()
    .prepare("DELETE FROM application_notes WHERE id = ?1 AND author_id = ?2")
    .bind(noteId, authorId)
    .run()
  return (result.meta.changes ?? 0) > 0
}
