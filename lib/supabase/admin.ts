import { createClient } from "@supabase/supabase-js"

/**
 * Server-only Supabase admin client using the service role key.
 * Bypasses RLS — only use in trusted server contexts (API routes).
 * Returns null if env vars are not configured.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    console.warn("[supabase/admin] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set — skipping Supabase operations.")
    return null
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
