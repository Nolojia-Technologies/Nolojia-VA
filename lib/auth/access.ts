import "server-only"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { createRemoteJWKSet, jwtVerify } from "jose"

import { getCloudflareEnv, getDb } from "@/lib/cloudflare/env"
import type { AdminRole, ProfileRow } from "@/types/database"

/**
 * Authentication via Cloudflare Access.
 *
 * Access sits in front of /admin at the edge and refuses anyone who has not
 * signed in with an approved identity, so in normal operation a request that
 * reaches this code has already been authenticated. We verify the JWT anyway:
 * edge policies protect the hostname, and a Worker can also be reached on its
 * *.workers.dev address where no Access policy applies. Verifying here means
 * authentication does not depend on a dashboard setting staying correct.
 *
 * Access proves *who* the caller is. It says nothing about what they may do —
 * that is the profiles table, checked in requireAdmin/requireAdminRole below.
 */

/** Set by Access on every proxied request. Preferred over the cookie, which is not guaranteed. */
const ASSERTION_HEADER = "cf-access-jwt-assertion"

export interface AccessIdentity {
  /** Verified email from the Access token. */
  email: string
  /** Access subject identifier — stable per user, per application. */
  sub: string
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null

function getJwks(teamDomain: string) {
  if (!jwks) {
    jwks = createRemoteJWKSet(new URL(`${teamDomain}/cdn-cgi/access/certs`))
  }
  return jwks
}

/**
 * Development-only stand-in for an Access token.
 *
 * There is no Access in front of localhost, so without this the console cannot
 * be opened locally at all. It is gated twice: NODE_ENV must be development
 * (Next inlines this, so a production build folds the whole function to
 * `return null` and drops the rest), and DEV_ADMIN_EMAIL must be set by hand —
 * an absent variable is not a bypass.
 *
 * It grants an identity, not authority. The email still has to match an admin
 * row in `profiles`, exactly as a real Access token would.
 */
let devIdentityAnnounced = false

function devIdentity(): AccessIdentity | null {
  if (process.env.NODE_ENV !== "development") return null

  const email = process.env.DEV_ADMIN_EMAIL?.trim().toLowerCase()
  if (!email) return null

  if (!devIdentityAnnounced) {
    devIdentityAnnounced = true
    console.warn(
      `\x1b[33m[dev]\x1b[0m Access verification bypassed — signed in as ${email}. ` +
        "Development only."
    )
  }

  return { email, sub: `dev|${email}` }
}

/**
 * Verifies the Access token on the current request.
 * Returns null when there is no token or it does not verify — never throws for
 * an unauthenticated caller, so callers decide between redirect and 401.
 */
export async function getAccessIdentity(): Promise<AccessIdentity | null> {
  const dev = devIdentity()
  if (dev) return dev

  const token = headers().get(ASSERTION_HEADER)
  if (!token) return null

  const { CF_ACCESS_TEAM_DOMAIN, CF_ACCESS_AUD } = getCloudflareEnv()
  if (!CF_ACCESS_TEAM_DOMAIN || !CF_ACCESS_AUD) {
    // Refuse to treat an unconfigured deployment as authenticated. Failing
    // closed here is the difference between "not set up yet" and "wide open".
    console.error("[access] CF_ACCESS_TEAM_DOMAIN or CF_ACCESS_AUD is not set")
    return null
  }

  try {
    const { payload } = await jwtVerify(token, getJwks(CF_ACCESS_TEAM_DOMAIN), {
      issuer: CF_ACCESS_TEAM_DOMAIN,
      audience: CF_ACCESS_AUD,
    })

    const email = typeof payload.email === "string" ? payload.email : null
    if (!email || !payload.sub) return null

    return { email: email.toLowerCase(), sub: payload.sub }
  } catch (error) {
    console.warn("[access] token rejected:", (error as Error).message)
    return null
  }
}

/**
 * The signed-in user's profile row, or null.
 *
 * Access authenticates by email, so email is the join key between Cloudflare's
 * identity and this application's authorization data.
 */
export async function getCurrentProfile(): Promise<ProfileRow | null> {
  const identity = await getAccessIdentity()
  if (!identity) return null

  return await getDb()
    .prepare("SELECT * FROM profiles WHERE email = ?1")
    .bind(identity.email)
    .first<ProfileRow>()
}

/**
 * Gate for every /admin page.
 *
 * Replaces the Postgres RLS policies that used to read
 * `EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')`.
 * D1 has no RLS, so this check has to run in the application — and it has to
 * run on every page, not just in the layout, because a layout does not gate a
 * route handler.
 */
export async function requireAdmin(): Promise<ProfileRow> {
  const profile = await getCurrentProfile()

  if (!profile) {
    // Authenticated by Access but unknown here, or not authenticated at all.
    redirect("/?access=denied")
  }

  if (profile.role !== "admin") {
    redirect("/?access=denied")
  }

  return profile
}

/**
 * Gate for pages that only some admin roles may see.
 *
 * Previously this was enforced twice — once by hiding the nav item, once by
 * RLS. Hiding a link is not access control, and RLS is gone, so this is now
 * the only thing standing between a role and a page it should not read.
 */
export async function requireAdminRole(allowed: readonly AdminRole[]): Promise<ProfileRow> {
  const profile = await requireAdmin()

  if (!profile.admin_role || !allowed.includes(profile.admin_role)) {
    redirect("/admin/dashboard?denied=1")
  }

  return profile
}

/** Non-redirecting variant for route handlers, which should answer 401/403. */
export async function getAdminOrStatus(): Promise<
  { ok: true; profile: ProfileRow } | { ok: false; status: 401 | 403 }
> {
  const identity = await getAccessIdentity()
  if (!identity) return { ok: false, status: 401 }

  const profile = await getDb()
    .prepare("SELECT * FROM profiles WHERE email = ?1")
    .bind(identity.email)
    .first<ProfileRow>()

  if (!profile || profile.role !== "admin") return { ok: false, status: 403 }

  return { ok: true, profile }
}
