# Cloudflare setup

The app moved off Supabase. Data lives in **D1**, CVs in **R2**, and admin
sign-in is handled by **Cloudflare Access** rather than by any code in this
repository.

Nothing below has been run against your Cloudflare account — every command here
needs `wrangler login` first, which is interactive.

---

## 1. Create the resources

```bash
npx wrangler login

# D1
npx wrangler d1 create nolojia
# → copy the printed database_id into wrangler.jsonc

# R2 (private bucket — do NOT enable public access)
npx wrangler r2 bucket create nolojia-resumes
```

Then replace `REPLACE_WITH_ID_FROM_WRANGLER_D1_CREATE` in `wrangler.jsonc`.

## 2. Apply the schema

```bash
npx wrangler d1 migrations apply nolojia --local    # local dev copy
npx wrangler d1 migrations apply nolojia --remote   # production
```

The schema is `migrations/0001_initial.sql`. It has been validated locally:
tables, indexes, CHECK constraints, foreign-key cascade and the `updated_at`
triggers all behave.

## 3. Set up Cloudflare Access

1. Zero Trust → Access → Applications → **Add a self-hosted application**
2. Application domain: `nolojia.com`, path `admin`
3. Add a policy: *Allow* → *Emails* → list the people who should get in
4. Settings → copy the **Application Audience (AUD) Tag**

Then fill in `wrangler.jsonc` → `vars`:

```jsonc
"CF_ACCESS_TEAM_DOMAIN": "https://<your-team>.cloudflareaccess.com",
"CF_ACCESS_AUD": "<the AUD tag>"
```

Both are public identifiers, not secrets — they say *which* certificates to
trust, and the JWT signature is what actually proves anything.

**Access controls who can sign in. It does not decide what they can do.** That
comes from the `profiles` table, so a new person needs both: an Access policy
that lets them through, and an admin row here.

## 4. Create the first admin

There is no signup flow to bootstrap from, so the first row is inserted by hand.
Every later admin can be added from `/admin/team`.

```bash
npx wrangler d1 execute nolojia --remote --command="
INSERT INTO profiles (id, email, full_name, role, admin_role)
VALUES (lower(hex(randomblob(16))), 'you@nolojia.com', 'Your Name', 'admin', 'super_admin');
"
```

The email must match the one you sign in to Access with — that is the join key
between Cloudflare's identity and this application's permissions.

## 5. Secrets

Only `RESEND_API_KEY` is a real secret. It goes in the Workers secret store,
never in `wrangler.jsonc`:

```bash
npx wrangler secret put RESEND_API_KEY
```

## 6. Hosting — still outstanding

`wrangler.jsonc` has no `main` or `assets` yet, on purpose. Neither Cloudflare
adapter supports the Next version this project is on:

| Adapter | Requires | Status |
|---|---|---|
| `@opennextjs/cloudflare` 1.20.3 | `next >=15.5.24 <16 \|\| >=16.3.3` | stable |
| `vinext` 1.0.0-beta.8 | `next` 16.x | beta; Cloudflare's new default |

This repo is on Next **14.2.35**, so deploying to Workers needs a Next upgrade
first. Once that is done, uncomment the matching branch in
`lib/cloudflare/env.ts` — that file is the only adapter-specific code in the
project, deliberately.

---

## What replaced what

| Supabase | Cloudflare | Notes |
|---|---|---|
| Postgres | D1 | 6 tables ported; `uuid`→TEXT, `jsonb`→TEXT, `timestamptz`→ISO TEXT, `boolean`→INTEGER |
| Auth | Access | `/login` deleted; sign-in is Cloudflare's |
| Storage (public URL) | R2 (private) | CVs now served through an authenticated route, not a guessable URL |
| **62 RLS policies** | `lib/auth/access.ts` + `app/admin/actions.ts` | **See below** |
| Browser Supabase client | Server actions | D1 is not reachable from the browser |

### The RLS replacement is the part to review

D1 has no row-level security. Everything Postgres used to enforce is now
application code:

- `requireAdmin()` — gates every admin page; replaces the
  `EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')`
  policy that guarded most tables.
- `requireAdminRole([...])` — gates role-restricted pages. Previously this was
  enforced by hiding a nav link *and* by RLS; hiding a link is not access
  control, so this is now the only real check.
- `app/admin/actions.ts` — every mutation re-derives the caller from the Access
  token and validates enum arguments. It never trusts a parameter to say who is
  asking.
- Department scoping for HR roles is pushed into the SQL `WHERE`, not applied to
  rows already fetched.

Each page calls `requireAdmin()` for itself rather than relying on the layout: a
layout does not run for route handlers, and there is no database-level backstop
any more.
