import "server-only"

/**
 * Decoding helpers for the places where SQLite's type system differs from what
 * the application wants to work with.
 *
 * Everything that crosses out of lib/db should go through these, so no page
 * ever has to remember that `published` is the integer 1 rather than `true`.
 */

/** SQLite stores booleans as 0/1. */
export const toBool = (value: number | boolean | null | undefined): boolean =>
  value === 1 || value === true

/** And expects 0/1 back on the way in. */
export const fromBool = (value: boolean): 0 | 1 => (value ? 1 : 0)

/**
 * JSON columns are TEXT. A malformed value should degrade to an empty list
 * rather than throwing halfway through rendering a page.
 */
export function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string")
  }
  if (typeof value !== "string") return []
  try {
    const parsed = JSON.parse(value)
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === "string")
      : []
  } catch {
    return []
  }
}

export const fromStringArray = (value: string[]): string => JSON.stringify(value)

/** ISO 8601 UTC with milliseconds — the format the schema defaults to. */
export const nowIso = (): string => new Date().toISOString()

/** D1 has no uuid generation, so ids are minted in the application. */
export const newId = (): string => crypto.randomUUID()

/**
 * Escapes the characters LIKE treats as wildcards, so a user searching for
 * "50%" gets rows containing "50%" rather than every row in the table.
 * Pair with `ESCAPE '\'` in the query.
 */
export const escapeLike = (value: string): string =>
  value.replace(/[\\%_]/g, (c) => `\\${c}`)

/** `SELECT COUNT(*)` returns a single row with one column; unwrap it safely. */
export async function countRows(
  db: D1Database,
  sql: string,
  ...binds: unknown[]
): Promise<number> {
  const row = await db
    .prepare(sql)
    .bind(...binds)
    .first<{ n: number }>()
  return row?.n ?? 0
}

/**
 * Builds a placeholder list for an IN clause: 3 -> "?1, ?2, ?3".
 * D1 has no array binding, and interpolating values into SQL is how injection
 * happens, so the placeholders are generated and the values still bound.
 */
export function placeholders(count: number, offset = 0): string {
  return Array.from({ length: count }, (_, i) => `?${i + 1 + offset}`).join(", ")
}
