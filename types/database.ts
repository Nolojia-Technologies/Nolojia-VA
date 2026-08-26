/**
 * Row types for the D1 schema in migrations/0001_initial.sql.
 *
 * These are hand-written rather than generated, because D1 has no type
 * generator. Keep them in step with the migration: the two files are the whole
 * contract between the database and the application.
 *
 * SQLite storage notes that leak into these types:
 *   - booleans are INTEGER 0/1        -> `SqlBool`
 *   - JSON arrays are TEXT            -> `string`, parsed by lib/db
 *   - timestamps are ISO 8601 TEXT    -> `string`
 *
 * The `*Row` types describe what comes *out of* D1. The `*Record` types are
 * what the application works with once JSON and booleans are decoded — always
 * prefer those outside lib/db.
 */

// ── Domain unions ───────────────────────────────────────────────────────────

export type AdminRole =
  | 'super_admin'
  | 'hr_manager'
  | 'operations_manager'
  | 'finance_manager'
  | 'marketing_manager'

export type UserRole = 'client' | 'assistant' | 'admin'

export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'hired' | 'rejected'

export type JobStatus = 'open' | 'closed' | 'draft'

export const ADMIN_ROLES: readonly AdminRole[] = [
  'super_admin',
  'hr_manager',
  'operations_manager',
  'finance_manager',
  'marketing_manager',
]

export const APPLICATION_STATUSES: readonly ApplicationStatus[] = [
  'new',
  'reviewed',
  'shortlisted',
  'hired',
  'rejected',
]

export const JOB_STATUSES: readonly JobStatus[] = ['open', 'closed', 'draft']

/** SQLite has no boolean type; 0 and 1 are what actually come back. */
export type SqlBool = 0 | 1

// ── Raw rows, exactly as D1 returns them ────────────────────────────────────

export interface ProfileRow {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: UserRole
  admin_role: AdminRole | null
  created_at: string
  updated_at: string
}

export interface JobRow {
  id: string
  slug: string
  title: string
  department: string
  type: string
  location: string
  description: string | null
  /** JSON array of strings. */
  requirements: string
  /** JSON array of strings. */
  benefits: string
  status: JobStatus
  created_at: string
  updated_at: string
}

export interface ApplicationRow {
  id: string
  job_slug: string
  job_title: string
  full_name: string
  email: string
  phone: string | null
  location: string | null
  linkedin: string | null
  portfolio: string | null
  /** R2 object key, not a URL. Served through an authenticated admin route. */
  resume_key: string | null
  cover_letter: string | null
  years_experience: string | null
  expected_salary: string | null
  status: ApplicationStatus
  notes: string | null
  created_at: string
}

export interface ApplicationNoteRow {
  id: string
  application_id: string
  author_id: string
  author_name: string | null
  content: string
  created_at: string
}

export interface NotificationRow {
  id: string
  user_id: string
  title: string
  message: string
  type: string
  read: SqlBool
  created_at: string
}

export interface BlogPostRow {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string | null
  category: string
  /** JSON array of strings. */
  tags: string
  author_name: string
  author_avatar: string | null
  published: SqlBool
  featured: SqlBool
  read_time_minutes: number
  meta_title: string | null
  meta_description: string | null
  published_at: string
  updated_at: string
  created_at: string
}

// ── Decoded records, what the application should actually handle ────────────

export type Profile = ProfileRow

export interface Job extends Omit<JobRow, 'requirements' | 'benefits'> {
  requirements: string[]
  benefits: string[]
}

export type Application = ApplicationRow

export type ApplicationNote = ApplicationNoteRow

export interface Notification extends Omit<NotificationRow, 'read'> {
  read: boolean
}

export interface BlogPost extends Omit<BlogPostRow, 'tags' | 'published' | 'featured'> {
  tags: string[]
  published: boolean
  featured: boolean
}
