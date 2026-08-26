import "server-only"

import { getDb } from "@/lib/cloudflare/env"
import { newId } from "@/lib/db/util"
import type { AdminRole, ProfileRow } from "@/types/database"

export async function getProfileByEmail(email: string): Promise<ProfileRow | null> {
  return await getDb()
    .prepare("SELECT * FROM profiles WHERE email = ?1")
    .bind(email.toLowerCase())
    .first<ProfileRow>()
}

export async function getProfileById(id: string): Promise<ProfileRow | null> {
  return await getDb()
    .prepare("SELECT * FROM profiles WHERE id = ?1")
    .bind(id)
    .first<ProfileRow>()
}

export async function listAdmins(): Promise<ProfileRow[]> {
  const { results } = await getDb()
    .prepare("SELECT * FROM profiles WHERE role = 'admin' ORDER BY created_at ASC")
    .all<ProfileRow>()
  return results
}

/**
 * Grants admin to an email address.
 *
 * With Cloudflare Access there is no signup step to hook into — a person exists
 * to this application the first time Access lets them through. So granting
 * access is an upsert on the email, and the row may well be created before its
 * owner has ever visited.
 */
export async function grantAdmin(
  email: string,
  adminRole: AdminRole
): Promise<ProfileRow> {
  const normalised = email.trim().toLowerCase()

  await getDb()
    .prepare(
      `INSERT INTO profiles (id, email, role, admin_role)
       VALUES (?1, ?2, 'admin', ?3)
       ON CONFLICT(email) DO UPDATE SET
         role = 'admin',
         admin_role = excluded.admin_role,
         updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`
    )
    .bind(newId(), normalised, adminRole)
    .run()

  const row = await getProfileByEmail(normalised)
  if (!row) throw new Error("profile upsert did not return a row")
  return row
}

export async function setAdminRole(id: string, adminRole: AdminRole): Promise<void> {
  await getDb()
    .prepare("UPDATE profiles SET admin_role = ?1 WHERE id = ?2")
    .bind(adminRole, id)
    .run()
}

/**
 * Revokes admin without deleting the row, so notes and other authored records
 * keep a resolvable author.
 */
export async function revokeAdmin(id: string): Promise<void> {
  await getDb()
    .prepare("UPDATE profiles SET role = 'client', admin_role = NULL WHERE id = ?1")
    .bind(id)
    .run()
}

export async function countSuperAdmins(): Promise<number> {
  const row = await getDb()
    .prepare("SELECT COUNT(*) AS n FROM profiles WHERE admin_role = 'super_admin'")
    .first<{ n: number }>()
  return row?.n ?? 0
}
