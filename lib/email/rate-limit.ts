// Simple in-memory rate limiter for Vercel serverless functions.
// Each function instance has its own store — good enough for basic spam protection.
// For high-traffic production, replace with @upstash/ratelimit + Redis.

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

interface RateLimitOptions {
  maxRequests: number   // max submissions allowed
  windowMs: number      // time window in ms
}

export function checkRateLimit(
  ip: string,
  endpoint: string,
  options: RateLimitOptions = { maxRequests: 5, windowMs: 60 * 60 * 1000 } // 5/hour default
): { allowed: boolean; remaining: number; resetAt: number } {
  const key = `${endpoint}:${ip}`
  const now = Date.now()

  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + options.windowMs })
    return { allowed: true, remaining: options.maxRequests - 1, resetAt: now + options.windowMs }
  }

  if (entry.count >= options.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: options.maxRequests - entry.count, resetAt: entry.resetAt }
}

// Prune old entries every 100 calls to avoid memory leak in long-running instances
let pruneCounter = 0
export function pruneStore() {
  pruneCounter++
  if (pruneCounter % 100 !== 0) return
  const now = Date.now()
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key)
  }
}
