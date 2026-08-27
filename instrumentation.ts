/**
 * Local development bindings.
 *
 * In production the Cloudflare adapter hands D1 and R2 to the application; see
 * lib/cloudflare/env.ts. In `next dev` there is no adapter and no Worker, so
 * without this hook `/admin` cannot render at all — every page throws before it
 * reaches a query.
 *
 * `getPlatformProxy()` is wrangler's own answer to this: it reads
 * wrangler.jsonc and returns the same binding objects a Worker would get,
 * backed by the local SQLite and filesystem state under .wrangler/. The
 * queries the console runs against it are real D1 queries, not a stand-in.
 *
 * `register()` runs once at server start, before the first request, which is
 * what lets getCloudflareEnv() stay synchronous.
 *
 * Nothing here survives a production build: the whole body is behind a
 * NODE_ENV check that Next folds to a constant, and `wrangler` is imported
 * dynamically so it never enters the bundle graph.
 */
export async function register() {
  // The hook also runs for the edge runtime, where wrangler cannot load.
  if (process.env.NEXT_RUNTIME !== "nodejs") return
  if (process.env.NODE_ENV !== "development") return

  const { getPlatformProxy } = await import("wrangler")
  const { setDevBindings } = await import("@/lib/cloudflare/env")

  try {
    const { env } = await getPlatformProxy({ configPath: "wrangler.jsonc" })

    setDevBindings(env as unknown as Parameters<typeof setDevBindings>[0])

    console.log(
      "\x1b[36m[dev]\x1b[0m Cloudflare bindings ready — D1 and R2 served from .wrangler/state"
    )

    if (!process.env.DEV_ADMIN_EMAIL) {
      console.log(
        "\x1b[36m[dev]\x1b[0m /admin will still refuse you: set DEV_ADMIN_EMAIL in .env.local"
      )
    }
  } catch (error) {
    // A missing local database is the normal first-run state, not a crash.
    // The public site does not need bindings; only /admin does.
    console.warn(
      "\x1b[33m[dev]\x1b[0m Cloudflare bindings unavailable — /admin will fail closed.\n" +
        `      ${(error as Error).message}\n` +
        "      Run: npm run db:migrate:local && npm run db:seed:local"
    )
  }
}
