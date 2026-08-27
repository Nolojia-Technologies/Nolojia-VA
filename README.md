# Nolojia

Marketing site and admin console for Nolojia, built on Next.js and running on
Cloudflare.

## Stack

| Layer | What |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS with CSS-custom-property design tokens |
| Database | Cloudflare **D1** (SQLite) |
| File storage | Cloudflare **R2**, private bucket |
| Admin sign-in | Cloudflare **Access** — there is no login page in this repo |
| Email | Resend |
| Animation | Framer Motion |

There is no Supabase, no auth code, and no session cookie of our own. Identity
arrives as a signed Access JWT and is verified in `lib/auth/access.ts`.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # only RESEND_API_KEY is a real secret
npm run dev
```

The public site runs without any Cloudflare resources. To run the admin console
locally as well:

```bash
npm run db:reset:local   # local D1 schema + sample data
```

and set `DEV_ADMIN_EMAIL=dev@localhost` in `.env.local`. That gives you a real
local D1 and R2 via wrangler, with one seeded admin per role so role gating can
be tested. Both the local binding hook and the sign-in bypass are compiled out
of production builds — see `docs/cloudflare-setup.md`.

Without that setup the console fails closed — `/admin/*` redirects to
`/?access=denied` and the CV download route answers 401. That is the intended
behaviour, not a misconfiguration.

To bring the console up **in production**, follow
**[docs/cloudflare-setup.md](docs/cloudflare-setup.md)**. It covers creating D1
and R2, applying the schema, configuring Access, and inserting the first admin
row. Every command there needs `wrangler login`, which is interactive.

## Layout

```
app/
  (marketing pages)/       public site
  admin/                   admin console — every page calls requireAdmin()
  admin/actions.ts         every mutation; re-derives the caller from the token
  api/                     route handlers (careers intake, logout)
components/
  site/                    marketing sections, CTAs, product visuals
  admin/                   console chrome: sidebar, header, badges, forms
lib/
  auth/access.ts           Cloudflare Access JWT verification
  cloudflare/env.ts        the only adapter-specific file — see below
  db/                      D1 queries, one module per table
  storage/resumes.ts       R2 upload; returns a key, never a URL
  content/                 site copy as typed data
  seo/                     metadata, sitemap and schema config
migrations/                D1 schema (0001_initial.sql)
docs/cloudflare-setup.md   the runbook
docs/archive/              pre-migration planning docs; nothing there is current
```

## Scripts

```bash
npm run dev              # dev server
npm run build            # production build
npm run lint             # eslint
npm run db:migrate:local # apply D1 migrations to the local copy
npm run db:migrate       # apply D1 migrations to production
npm run db:seed:local    # load sample data into the local copy
npm run db:reset:local   # migrate + seed in one step
npm run db:studio "SQL"  # run one statement against the local D1 copy
```

## Deployment — one decision still open

`wrangler.jsonc` declares the D1 and R2 bindings but deliberately has no `main`
or `assets`. Neither Cloudflare adapter supports the Next version this project
is on:

| Adapter | Requires | Status |
|---|---|---|
| `@opennextjs/cloudflare` | `next >=15.5.24 <16 \|\| >=16.3.3` | stable |
| `vinext` | `next` 16.x | beta; Cloudflare's current default |

This repo is on Next **14.2.35**, so deploying to Workers means upgrading Next
first. `lib/cloudflare/env.ts` is the only file that knows which adapter is in
use — both branches are written and commented out, so switching it on is a
one-file change once the version is settled.

## Two rules this codebase holds to

**No secrets in the frontend.** `RESEND_API_KEY` lives in the Workers secret
store. `CF_ACCESS_TEAM_DOMAIN` and `CF_ACCESS_AUD` are in `wrangler.jsonc`
because they are public identifiers — they name which certificates to trust, and
the JWT signature is what proves anything. Every data, auth and storage module
carries `import "server-only"`.

**No invented facts in the copy.** Client names, revenue, statistics,
testimonials, partnerships, awards, certifications and compliance claims appear
on the site only if they are real and verifiable. `/case-studies` renders an
honest empty state rather than fabricated numbers.

## Licence

Proprietary — all rights reserved.
