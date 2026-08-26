import { NextResponse } from 'next/server'

import { getCloudflareEnv } from '@/lib/cloudflare/env'

/**
 * Signing out means ending the Cloudflare Access session, not clearing a cookie
 * of our own — this application no longer issues one. Access exposes a logout
 * endpoint on the team domain that revokes the session and clears
 * CF_Authorization across every application in the account.
 */
export async function POST(request: Request) {
  // NextResponse.redirect needs an absolute URL, so the fallback is resolved
  // against the incoming request rather than assumed.
  let target = new URL('/', request.url).toString()

  try {
    const { CF_ACCESS_TEAM_DOMAIN } = getCloudflareEnv()
    if (CF_ACCESS_TEAM_DOMAIN) {
      target = `${CF_ACCESS_TEAM_DOMAIN}/cdn-cgi/access/logout`
    }
  } catch {
    // Bindings unavailable — fall back to the home page rather than 500 on a
    // sign-out, which is the one action that must never leave someone stuck.
  }

  return NextResponse.redirect(target, { status: 303 })
}
