import { createClient } from "@/lib/supabase/server"

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

// ─── Queries ──────────────────────────────────────────────────────────────────

export async function getAllPostCards(limit = 50): Promise<BlogPostCard[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select(CARD_FIELDS)
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching blog posts:", error)
      return []
    }
    return (data ?? []) as BlogPostCard[]
  } catch {
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error) return null
    return data as BlogPost
  } catch {
    return null
  }
}

export async function getPostsByCategory(category: string, limit = 20): Promise<BlogPostCard[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select(CARD_FIELDS)
      .eq("published", true)
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) return []
    return (data ?? []) as BlogPostCard[]
  } catch {
    return []
  }
}

export async function getFeaturedPosts(limit = 3): Promise<BlogPostCard[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select(CARD_FIELDS)
      .eq("published", true)
      .eq("featured", true)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) return []
    return (data ?? []) as BlogPostCard[]
  } catch {
    return []
  }
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3
): Promise<BlogPostCard[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select(CARD_FIELDS)
      .eq("published", true)
      .eq("category", category)
      .neq("slug", currentSlug)
      .order("published_at", { ascending: false })
      .limit(limit)

    if (error) return []
    return (data ?? []) as BlogPostCard[]
  } catch {
    return []
  }
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("published", true)

    if (error) return []
    return (data ?? []).map((row: { slug: string }) => row.slug)
  } catch {
    return []
  }
}
