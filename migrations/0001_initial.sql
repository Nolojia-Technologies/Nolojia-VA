-- ============================================================================
-- Nolojia — initial D1 schema
--
-- Ported from the Supabase Postgres migrations. SQLite has no uuid, jsonb,
-- text[], timestamptz or boolean types, so:
--   uuid        -> TEXT, generated with crypto.randomUUID() in the application
--   jsonb/text[]-> TEXT holding JSON, parsed at the edge of the data layer
--   timestamptz -> TEXT holding ISO 8601 UTC, which is what the UI already parses
--   boolean     -> INTEGER 0/1
--
-- There is no row-level security in D1. Every policy that used to live in
-- Postgres is now an authorization check in lib/db and lib/auth — see
-- docs/authorization.md for the mapping.
-- ============================================================================

PRAGMA foreign_keys = ON;

-- ── Profiles ────────────────────────────────────────────────────────────────
-- Identity now comes from Cloudflare Access, which authenticates by email.
-- This table no longer stores credentials; it exists purely to say what a
-- given email is allowed to do.
CREATE TABLE IF NOT EXISTS profiles (
  id          TEXT PRIMARY KEY,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT,
  avatar_url  TEXT,
  role        TEXT NOT NULL DEFAULT 'client'
              CHECK (role IN ('client', 'assistant', 'admin')),
  admin_role  TEXT
              CHECK (admin_role IS NULL OR admin_role IN (
                'super_admin', 'hr_manager', 'operations_manager',
                'finance_manager', 'marketing_manager'
              )),
  created_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at  TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role  ON profiles(role);

-- ── Jobs ────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id           TEXT PRIMARY KEY,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  department   TEXT NOT NULL,
  type         TEXT NOT NULL DEFAULT 'Full-Time',
  location     TEXT NOT NULL DEFAULT 'Remote — Worldwide',
  description  TEXT,
  -- JSON arrays of strings
  requirements TEXT NOT NULL DEFAULT '[]',
  benefits     TEXT NOT NULL DEFAULT '[]',
  status       TEXT NOT NULL DEFAULT 'open'
               CHECK (status IN ('open', 'closed', 'draft')),
  created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);

-- ── Applications ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id               TEXT PRIMARY KEY,
  job_slug         TEXT NOT NULL,
  job_title        TEXT NOT NULL,
  full_name        TEXT NOT NULL,
  email            TEXT NOT NULL,
  phone            TEXT,
  location         TEXT,
  linkedin         TEXT,
  portfolio        TEXT,
  -- R2 object key, not a public URL. Downloads go through a signed admin route.
  resume_key       TEXT,
  cover_letter     TEXT,
  years_experience TEXT,
  expected_salary  TEXT,
  status           TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  notes            TEXT,
  created_at       TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_applications_job_slug ON applications(job_slug);
CREATE INDEX IF NOT EXISTS idx_applications_status   ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email    ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created  ON applications(created_at DESC);

-- ── Application notes ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS application_notes (
  id             TEXT NOT NULL PRIMARY KEY,
  application_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  author_id      TEXT NOT NULL,
  -- Denormalised so the list renders without a join.
  author_name    TEXT,
  content        TEXT NOT NULL,
  created_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_application_notes_application_id
  ON application_notes(application_id);

-- ── Notifications ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         TEXT NOT NULL PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  message    TEXT NOT NULL,
  type       TEXT NOT NULL,
  read       INTEGER NOT NULL DEFAULT 0 CHECK (read IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_unread
  ON notifications(user_id, read, created_at DESC);

-- ── Blog posts ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id                TEXT PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  excerpt           TEXT NOT NULL,
  content           TEXT NOT NULL,
  cover_image       TEXT,
  category          TEXT NOT NULL,
  -- JSON array of strings
  tags              TEXT NOT NULL DEFAULT '[]',
  author_name       TEXT NOT NULL DEFAULT 'Nolojia Team',
  author_avatar     TEXT,
  published         INTEGER NOT NULL DEFAULT 0 CHECK (published IN (0, 1)),
  featured          INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  read_time_minutes INTEGER NOT NULL DEFAULT 5,
  meta_title        TEXT,
  meta_description  TEXT,
  published_at      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  created_at        TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_published
  ON blog_posts(published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category
  ON blog_posts(category, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured
  ON blog_posts(featured, published_at DESC);

-- ── updated_at triggers ─────────────────────────────────────────────────────
-- SQLite has no ON UPDATE clause, so each table that tracks updated_at needs a
-- trigger. The WHEN guard stops the trigger recursing into itself.
CREATE TRIGGER IF NOT EXISTS profiles_updated_at
AFTER UPDATE ON profiles FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE profiles SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS jobs_updated_at
AFTER UPDATE ON jobs FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE jobs SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS blog_posts_updated_at
AFTER UPDATE ON blog_posts FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE blog_posts SET updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = NEW.id;
END;
