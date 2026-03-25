-- ============================================================
-- Nolojia — Careers System Migration
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── 1. Jobs table ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT        UNIQUE NOT NULL,
  title       TEXT        NOT NULL,
  department  TEXT        NOT NULL,
  type        TEXT        NOT NULL DEFAULT 'Full-Time',
  location    TEXT        NOT NULL DEFAULT 'Remote — Worldwide',
  description TEXT,
  requirements  JSONB     NOT NULL DEFAULT '[]',
  benefits      JSONB     NOT NULL DEFAULT '[]',
  status      TEXT        NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'draft')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 2. Applications table ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  job_slug         TEXT        NOT NULL,
  job_title        TEXT        NOT NULL,
  full_name        TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  phone            TEXT,
  location         TEXT,
  linkedin         TEXT,
  portfolio        TEXT,
  resume_url       TEXT,
  cover_letter     TEXT,
  years_experience TEXT,
  expected_salary  TEXT,
  status           TEXT        NOT NULL DEFAULT 'new'
                               CHECK (status IN ('new', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  notes            TEXT,                     -- internal HR notes
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 3. Indexes ─────────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_applications_job_slug ON applications(job_slug);
CREATE INDEX IF NOT EXISTS idx_applications_status   ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_email    ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created  ON applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_jobs_status           ON jobs(status);

-- ── 4. Row-Level Security ──────────────────────────────────────────────────────

-- Jobs: publicly readable (open roles only), admin can write
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Applications: service role only (inserted via API with service key)
-- Regular anon users cannot read, insert, or update applications directly
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- No public policies — all access via service role key in API routes

-- ── 5. Storage bucket ─────────────────────────────────────────────────────────
-- Run the following in Supabase Dashboard → Storage → New bucket
-- OR via the SQL Editor:

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes',
  'resumes',
  false,                -- private bucket
  5242880,             -- 5 MB limit
  ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Storage policy: service role can upload (via API), no public access
-- Note: service role bypasses RLS, so no explicit policy needed for uploads.
-- Add a policy if you want admins to download via the Supabase dashboard:

CREATE POLICY "Authenticated admins can view resumes"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');

-- ── 6. Seed initial jobs (optional) ───────────────────────────────────────────
-- These match the static jobs in lib/careers/jobs.ts
-- Uncomment if you want jobs managed from the database

/*
INSERT INTO jobs (slug, title, department, type, location, description, status) VALUES
  ('executive-virtual-assistant', 'Executive Virtual Assistant', 'VA Services', 'Full-Time', 'Remote — Worldwide', 'Support high-growth founders and executives.', 'open'),
  ('ecommerce-virtual-assistant', 'E-commerce Virtual Assistant', 'VA Services', 'Full-Time', 'Remote — Worldwide', 'Manage day-to-day e-commerce operations.', 'open'),
  ('social-media-virtual-assistant', 'Social Media Virtual Assistant', 'Creative Support', 'Full-Time', 'Remote — Worldwide', 'Plan, create, and schedule social content.', 'open'),
  ('content-writer-copywriter', 'Content Writer & Copywriter', 'Creative Support', 'Full-Time', 'Remote — Worldwide', 'Write compelling content for diverse clients.', 'open'),
  ('lead-generation-specialist', 'Lead Generation Specialist', 'Growth Support', 'Full-Time', 'Remote — Worldwide', 'Build and fuel client sales pipelines.', 'open'),
  ('client-success-manager', 'Client Success Manager', 'Operations', 'Full-Time', 'Remote — Worldwide', 'Own client relationships from onboarding to retention.', 'open')
ON CONFLICT (slug) DO NOTHING;
*/

-- ── 7. Helper function: updated_at auto-update ────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
