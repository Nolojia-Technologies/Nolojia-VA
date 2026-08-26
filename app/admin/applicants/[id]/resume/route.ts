import { NextResponse } from 'next/server'

import { getAdminOrStatus } from '@/lib/auth/access'
import { getApplication } from '@/lib/db/applications'
import { getResume } from '@/lib/storage/resumes'

/**
 * Serves a candidate's CV to an authenticated admin.
 *
 * Under Supabase this was a public storage URL stored on the row, which meant
 * anyone holding the link could read a stranger's CV forever. Here the bucket
 * is private and the object key never leaves the server: the caller is
 * re-authorized on every download, and the key is looked up from the
 * application rather than accepted from the URL — so this route cannot be used
 * to read an arbitrary object out of the bucket.
 *
 * A layout does not protect a route handler, so this does its own check.
 */
export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const auth = await getAdminOrStatus()
  if (!auth.ok) {
    return NextResponse.json(
      { error: auth.status === 401 ? 'Not signed in.' : 'Not permitted.' },
      { status: auth.status }
    )
  }

  const application = await getApplication(params.id)
  if (!application?.resume_key) {
    return NextResponse.json({ error: 'No CV on file.' }, { status: 404 })
  }

  const object = await getResume(application.resume_key)
  if (!object) {
    return NextResponse.json({ error: 'That file is no longer stored.' }, { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  // Personal data: never let a shared cache hold on to it.
  headers.set('cache-control', 'private, no-store')
  if (!headers.has('content-disposition')) {
    headers.set('content-disposition', 'attachment')
  }

  return new NextResponse(object.body, { headers })
}
