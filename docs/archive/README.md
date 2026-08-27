# Archive — nothing here is current

These files describe the original scaffold: a Supabase-backed SaaS platform with
14 Postgres tables, RLS policies, a signup/login flow, and a phased roadmap
towards a client dashboard, booking system and real-time messaging.

None of that is how the project works now. Supabase was removed entirely — the
database is Cloudflare D1, files live in R2, and admin sign-in is Cloudflare
Access rather than any code in this repository. The `/login` route, the
middleware and the Supabase clients were deleted.

**Do not follow the setup instructions in these documents.** They will have you
provision a stack the application no longer talks to. The current runbook is
[`docs/cloudflare-setup.md`](../cloudflare-setup.md), and the current overview is
the root [`README.md`](../../README.md).

They are kept only as a record of what was originally planned, in case a piece
of that roadmap is worth picking back up.
