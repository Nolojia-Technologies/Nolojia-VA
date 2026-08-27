-- ─────────────────────────────────────────────────────────────────────────────
-- Development seed data.
--
-- Applied to the LOCAL D1 copy only (npm run db:seed:local). Never run this
-- against --remote: every person and application below is invented, and the
-- point of the careers console is that the people in it are real.
--
-- Sign in as dev@localhost by putting this in .env.local:
--   DEV_ADMIN_EMAIL=dev@localhost
--
-- Re-runnable: it clears the sample rows first, so editing and re-seeding is
-- safe. It deletes by the 'seed-' id prefix, so anything you create by hand
-- through the console survives.
-- ─────────────────────────────────────────────────────────────────────────────

PRAGMA foreign_keys = ON;

DELETE FROM application_notes WHERE id LIKE 'seed-%';
DELETE FROM notifications    WHERE id LIKE 'seed-%';
DELETE FROM applications     WHERE id LIKE 'seed-%';
DELETE FROM jobs             WHERE id LIKE 'seed-%';
DELETE FROM blog_posts       WHERE id LIKE 'seed-%';
DELETE FROM profiles         WHERE id LIKE 'seed-%';

-- ── Admins ──────────────────────────────────────────────────────────────────
-- One per admin_role, so role-gated pages can be tested by switching
-- DEV_ADMIN_EMAIL rather than by editing the guard.
INSERT INTO profiles (id, email, full_name, role, admin_role) VALUES
  ('seed-admin-super',     'dev@localhost',        'Dev Super Admin',   'admin', 'super_admin'),
  ('seed-admin-hr',        'hr@localhost',         'Dev HR Manager',    'admin', 'hr_manager'),
  ('seed-admin-ops',       'ops@localhost',        'Dev Ops Manager',   'admin', 'operations_manager'),
  ('seed-admin-finance',   'finance@localhost',    'Dev Finance Lead',  'admin', 'finance_manager'),
  ('seed-admin-marketing', 'marketing@localhost',  'Dev Marketing Lead','admin', 'marketing_manager'),
  -- A non-admin, to confirm that having a row is not the same as having access.
  ('seed-client',          'client@localhost',     'Dev Client',        'client', NULL);

-- ── Jobs ────────────────────────────────────────────────────────────────────
-- Covers all three statuses so the jobs list filter has something to filter.
INSERT INTO jobs (id, slug, title, department, type, location, description, requirements, benefits, status) VALUES
  ('seed-job-ea', 'executive-assistant', 'Executive Assistant', 'Operations',
   'Full-Time', 'Remote — Worldwide',
   'Support a small number of executives with calendar, inbox and travel, working across time zones.',
   '["3+ years supporting senior leadership","Excellent written English","Comfortable owning a calendar end to end"]',
   '["Fully remote","Paid time off","Annual learning budget"]',
   'open'),

  ('seed-job-ai', 'ai-operations-specialist', 'AI Operations Specialist', 'Engineering',
   'Full-Time', 'Remote — Worldwide',
   'Build and maintain the prompt libraries and automation workflows behind client delivery.',
   '["Hands-on with LLM tooling","Scripting in Python or TypeScript","Clear technical writing"]',
   '["Fully remote","Hardware allowance"]',
   'open'),

  ('seed-job-cs', 'customer-support-specialist', 'Customer Support Specialist', 'Support',
   'Part-Time', 'Remote — Worldwide',
   'Front-line email and chat support across a portfolio of client accounts.',
   '["2+ years in customer support","Native-level written English"]',
   '["Fully remote","Flexible hours"]',
   'closed'),

  ('seed-job-draft', 'content-marketing-manager', 'Content Marketing Manager', 'Marketing',
   'Full-Time', 'Remote — Worldwide',
   'Draft posting — not yet published to the careers page.',
   '["Portfolio of published work"]',
   '["Fully remote"]',
   'draft');

-- ── Applications ────────────────────────────────────────────────────────────
-- years_experience uses the exact strings the public form submits
-- (EXPERIENCE_OPTIONS in app/(public)/careers/[slug]/ApplicationForm.tsx), so
-- the console renders the same shape locally as it does in production.
-- One per status, plus extras, so the pipeline board and every status filter
-- has rows. created_at is staggered so the analytics charts are not flat.
INSERT INTO applications
  (id, job_slug, job_title, full_name, email, phone, location, linkedin, portfolio,
   resume_key, cover_letter, years_experience, expected_salary, status, created_at)
VALUES
  ('seed-app-1', 'executive-assistant', 'Executive Assistant',
   'Sample Applicant One', 'applicant1@example.com', '+254700000001', 'Nairobi, Kenya',
   'https://example.com/in/sample-one', NULL, NULL,
   'Sample cover letter. This row exists so the applicants list has something to render locally.',
   '5–8 years', 'USD 1,800/mo', 'new',        strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-1 day')),

  ('seed-app-2', 'executive-assistant', 'Executive Assistant',
   'Sample Applicant Two', 'applicant2@example.com', '+254700000002', 'Mombasa, Kenya',
   NULL, 'https://example.com/portfolio', NULL,
   'Sample cover letter for a candidate that has been reviewed but not yet shortlisted.',
   '3–5 years', 'USD 1,500/mo', 'reviewed',   strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-4 days')),

  ('seed-app-3', 'ai-operations-specialist', 'AI Operations Specialist',
   'Sample Applicant Three', 'applicant3@example.com', NULL, 'Kampala, Uganda',
   NULL, NULL, NULL,
   'Sample cover letter for a shortlisted candidate, used to check the notes panel.',
   '8+ years', 'USD 2,600/mo', 'shortlisted', strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-9 days')),

  ('seed-app-4', 'ai-operations-specialist', 'AI Operations Specialist',
   'Sample Applicant Four', 'applicant4@example.com', NULL, 'Lagos, Nigeria',
   NULL, NULL, NULL,
   'Sample cover letter for a rejected candidate.',
   'Under 1 year', NULL, 'rejected',              strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-16 days')),

  ('seed-app-5', 'customer-support-specialist', 'Customer Support Specialist',
   'Sample Applicant Five', 'applicant5@example.com', NULL, 'Accra, Ghana',
   NULL, NULL, NULL,
   'Sample cover letter for a hired candidate, so the funnel has a completed path.',
   '3–5 years', 'USD 1,200/mo', 'hired',      strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')),

  ('seed-app-6', 'customer-support-specialist', 'Customer Support Specialist',
   'Sample Applicant Six', 'applicant6@example.com', NULL, 'Kigali, Rwanda',
   NULL, NULL, NULL,
   'Sample cover letter. A second new application, so the unread count is not 1.',
   '2–3 years', NULL, 'new',                  strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-2 hours'));

-- ── Notes ───────────────────────────────────────────────────────────────────
-- Two authors, so "delete your own note only" can be exercised without
-- editing the database by hand.
INSERT INTO application_notes (id, application_id, author_id, author_name, content) VALUES
  ('seed-note-1', 'seed-app-3', 'seed-admin-super', 'Dev Super Admin',
   'Strong technical answers. Worth a second interview.'),
  ('seed-note-2', 'seed-app-3', 'seed-admin-hr', 'Dev HR Manager',
   'Availability confirmed for a call next week.');

-- ── Notifications ───────────────────────────────────────────────────────────
INSERT INTO notifications (id, user_id, title, message, type, read) VALUES
  ('seed-notif-1', 'seed-admin-super', 'New application',
   'Sample Applicant Six applied for Customer Support Specialist', 'application', 0),
  ('seed-notif-2', 'seed-admin-super', 'New application',
   'Sample Applicant One applied for Executive Assistant', 'application', 0),
  ('seed-notif-3', 'seed-admin-super', 'Application shortlisted',
   'Sample Applicant Three moved to shortlisted', 'application', 1);

-- ── Blog ────────────────────────────────────────────────────────────────────
-- One published, one draft, so /blog and the admin view differ.
INSERT INTO blog_posts
  (id, slug, title, excerpt, content, category, tags, author_name, published, featured,
   read_time_minutes, meta_title, meta_description)
VALUES
  ('seed-post-1', 'sample-published-post', 'Sample Published Post',
   'A seeded post so the blog index and a post page have something to render locally.',
   '## Sample heading

This is seeded development content. It is not real editorial and should never reach production.',
   'Operations', '["sample","development"]', 'Nolojia Team', 1, 1, 4,
   'Sample Published Post', 'A seeded post used to render the blog locally during development.'),

  ('seed-post-2', 'sample-draft-post', 'Sample Draft Post',
   'An unpublished post, so the published filter has something to exclude.',
   'Seeded draft content.',
   'Operations', '["sample"]', 'Nolojia Team', 0, 0, 2,
   NULL, NULL);
