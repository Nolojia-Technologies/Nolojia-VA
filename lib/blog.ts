import "server-only"

import { getDb } from "@/lib/cloudflare/env"
import { toBool, toStringArray } from "@/lib/db/util"
import type { BlogPostRow } from "@/types/database"

/**
 * Blog reads, backed by D1.
 *
 * Every query fails soft and returns an empty result. The blog is public
 * content on a marketing site: an unavailable database should render "no posts
 * yet", not a 500. This also keeps the public pages building before the
 * Cloudflare bindings are wired up.
 *
 * Only published posts are ever returned, which is what the
 * "Public can read published posts" RLS policy used to guarantee.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  cover_image: string | null
  category: string
  tags: string[]
  author_name: string
  author_avatar: string | null
  published_at: string
  updated_at: string
  read_time_minutes: number
  featured: boolean
  meta_title: string | null
  meta_description: string | null
}

export interface BlogPostCard {
  id: string
  slug: string
  title: string
  excerpt: string
  cover_image: string | null
  category: string
  tags: string[]
  author_name: string
  author_avatar: string | null
  published_at: string
  read_time_minutes: number
  featured: boolean
}

const CARD_FIELDS =
  "id, slug, title, excerpt, cover_image, category, tags, author_name, author_avatar, published_at, read_time_minutes, featured"

type CardRow = Pick<
  BlogPostRow,
  | "id"
  | "slug"
  | "title"
  | "excerpt"
  | "cover_image"
  | "category"
  | "tags"
  | "author_name"
  | "author_avatar"
  | "published_at"
  | "read_time_minutes"
  | "featured"
>

const toCard = (row: CardRow): BlogPostCard => ({
  ...row,
  tags: toStringArray(row.tags),
  featured: toBool(row.featured),
})

const toPost = (row: BlogPostRow): BlogPost => ({
  ...row,
  tags: toStringArray(row.tags),
  featured: toBool(row.featured),
})

/** Every read goes through here so one missing-binding check covers them all. */
async function safely<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error("[blog]", (error as Error).message)
    return fallback
  }
}

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getAllPostCards(limit = 50): Promise<BlogPostCard[]> {
  return safely(async () => {
    const { results } = await getDb()
      .prepare(
        `SELECT ${CARD_FIELDS} FROM blog_posts
         WHERE published = 1 ORDER BY published_at DESC LIMIT ?1`
      )
      .bind(limit)
      .all<CardRow>()
    return results.map(toCard)
  }, [])
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return safely(async () => {
    const row = await getDb()
      .prepare("SELECT * FROM blog_posts WHERE slug = ?1 AND published = 1")
      .bind(slug)
      .first<BlogPostRow>()
    return row ? toPost(row) : null
  }, null)
}

export async function getPostsByCategory(
  category: string,
  limit = 20
): Promise<BlogPostCard[]> {
  return safely(async () => {
    const { results } = await getDb()
      .prepare(
        `SELECT ${CARD_FIELDS} FROM blog_posts
         WHERE published = 1 AND category = ?1
         ORDER BY published_at DESC LIMIT ?2`
      )
      .bind(category, limit)
      .all<CardRow>()
    return results.map(toCard)
  }, [])
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostCard[]> {
  return safely(async () => {
    const { results } = await getDb()
      .prepare(
        `SELECT ${CARD_FIELDS} FROM blog_posts
         WHERE published = 1 AND featured = 1
         ORDER BY published_at DESC LIMIT ?1`
      )
      .bind(limit)
      .all<CardRow>()
    return results.map(toCard)
  }, [])
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPostCard[]> {
  return safely(async () => {
    const { results } = await getDb()
      .prepare(
        `SELECT ${CARD_FIELDS} FROM blog_posts
         WHERE published = 1 AND category = ?1 AND slug != ?2
         ORDER BY published_at DESC LIMIT ?3`
      )
      .bind(category, currentSlug, limit)
      .all<CardRow>()
    return results.map(toCard)
  }, [])
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  return safely(async () => {
    const { results } = await getDb()
      .prepare("SELECT slug FROM blog_posts WHERE published = 1")
      .all<{ slug: string }>()
    return results.map((row) => row.slug)
  }, [])
}
