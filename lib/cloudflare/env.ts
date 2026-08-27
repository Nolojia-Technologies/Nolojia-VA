import "server-only"

/**
 * The one place that knows how Cloudflare bindings reach the application.
 *
 * This is deliberately the only adapter-specific file in the codebase. The
 * whole data layer is written against the plain `D1Database` and `R2Bucket`
 * interfaces, so swapping the Next.js adapter is a change here and nowhere
 * else.
 *
 * Neither Cloudflare adapter supports Next 14, which is what this project is
 * on today:
 *   @opennextjs/cloudflare  requires next >=15.5.24 <16 || >=16.3.3
 *   vinext                  requires next 16.x (1.0.0-beta at time of writing)
 *
 * Once Next is upgraded, uncomment the matching branch below.
 */

export interface CloudflareEnv {
  DB: D1Database
  RESUMES: R2Bucket
  CF_ACCESS_TEAM_DOMAIN: string
  CF_ACCESS_AUD: string
}

const ADAPTER_MISSING =
  "Cloudflare bindings are not available. Next.js must be upgraded and a Workers " +
  "adapter installed before D1 and R2 can be reached — see lib/cloudflare/env.ts."

// Object holder rather than a bare binding so this stays const while both
// adapter branches below are still commented out.
const cache: { env: CloudflareEnv | null } = { env: null }

/**
 * Local development bindings, published on globalThis by instrumentation.ts.
 *
 * globalThis rather than this module's own cache because Next compiles the
 * instrumentation hook into a separate bundle from the server components that
 * read the bindings — two module instances, one global.
 */
const DEV_BINDINGS = Symbol.for("nolojia.dev.cloudflare-bindings")

type DevGlobal = { [DEV_BINDINGS]?: CloudflareEnv }

/**
 * Called only by instrumentation.ts, only in `next dev`.
 *
 * The guard is written as `!== "development"` on purpose: Next inlines
 * NODE_ENV at build time, so in a production build this reads
 * `if ("production" !== "development") throw` — a constant the bundler folds,
 * removing the ability to install bindings at all rather than merely
 * discouraging it.
 */
export function setDevBindings(env: CloudflareEnv): void {
  if (process.env.NODE_ENV !== "development") {
    throw new Error("setDevBindings is a development-only hook.")
  }
  ;(globalThis as DevGlobal)[DEV_BINDINGS] = env
}

function readDevBindings(): CloudflareEnv | null {
  if (process.env.NODE_ENV !== "development") return null
  return (globalThis as DevGlobal)[DEV_BINDINGS] ?? null
}

export function getCloudflareEnv(): CloudflareEnv {
  if (cache.env) return cache.env

  // Not cached: `next dev` reloads modules on edit, and the proxy is rebuilt
  // with them. Reading the global each time costs nothing and avoids handing
  // back a disposed binding.
  const dev = readDevBindings()
  if (dev) return dev

  // ── @opennextjs/cloudflare (Next 15) ──────────────────────────────────────
  // import { getCloudflareContext } from "@opennextjs/cloudflare"
  // cache.env = getCloudflareContext().env as unknown as CloudflareEnv
  // return cache.env

  // ── vinext (Next 16) ──────────────────────────────────────────────────────
  // import { env } from "cloudflare:workers"
  // cache.env = env as unknown as CloudflareEnv
  // return cache.env

  throw new Error(ADAPTER_MISSING)
}

/**
 * True when bindings can actually be reached. Callers that must degrade
 * gracefully — public pages that render an empty state rather than a 500 —
 * check this instead of catching the throw.
 */
export function hasCloudflareEnv(): boolean {
  try {
    getCloudflareEnv()
    return true
  } catch {
    return false
  }
}

export function getDb(): D1Database {
  return getCloudflareEnv().DB
}

export function getResumeBucket(): R2Bucket {
  return getCloudflareEnv().RESUMES
}
