import "server-only"

import { getDb } from "@/lib/cloudflare/env"
import { countRows, newId, toBool } from "@/lib/db/util"
import type { Notification, NotificationRow } from "@/types/database"

const decode = (row: NotificationRow): Notification => ({
  ...row,
  read: toBool(row.read),
})

export async function listNotifications(
  userId: string,
  limit = 50
): Promise<Notification[]> {
  const { results } = await getDb()
    .prepare(
      "SELECT * FROM notifications WHERE user_id = ?1 ORDER BY created_at DESC LIMIT ?2"
    )
    .bind(userId, limit)
    .all<NotificationRow>()
  return results.map(decode)
}

export async function countUnread(userId: string): Promise<number> {
  return countRows(
    getDb(),
    "SELECT COUNT(*) AS n FROM notifications WHERE user_id = ?1 AND read = 0",
    userId
  )
}

/** Scoped to the owner, so a stray id cannot mark someone else's notification read. */
export async function markRead(id: string, userId: string): Promise<void> {
  await getDb()
    .prepare("UPDATE notifications SET read = 1 WHERE id = ?1 AND user_id = ?2")
    .bind(id, userId)
    .run()
}

export async function markAllRead(userId: string): Promise<void> {
  await getDb()
    .prepare("UPDATE notifications SET read = 1 WHERE user_id = ?1 AND read = 0")
    .bind(userId)
    .run()
}

export async function createNotification(input: {
  userId: string
  title: string
  message: string
  type: string
}): Promise<void> {
  await getDb()
    .prepare(
      `INSERT INTO notifications (id, user_id, title, message, type)
       VALUES (?1, ?2, ?3, ?4, ?5)`
    )
    .bind(newId(), input.userId, input.title, input.message, input.type)
    .run()
}

/**
 * Fans a notification out to every admin — used when a new application lands.
 * One batch rather than a write per admin.
 */
export async function notifyAllAdmins(input: {
  title: string
  message: string
  type: string
}): Promise<void> {
  const db = getDb()
  const { results } = await db
    .prepare("SELECT id FROM profiles WHERE role = 'admin'")
    .all<{ id: string }>()

  if (results.length === 0) return

  await db.batch(
    results.map((admin) =>
      db
        .prepare(
          `INSERT INTO notifications (id, user_id, title, message, type)
           VALUES (?1, ?2, ?3, ?4, ?5)`
        )
        .bind(newId(), admin.id, input.title, input.message, input.type)
    )
  )
}
