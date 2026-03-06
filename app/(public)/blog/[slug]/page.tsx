import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog"
import { blogPostSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import { SITE_URL } from "@/lib/seo/config"
import JsonLd from "@/components/seo/JsonLd"
import BookingCTA from "@/components/seo/BookingCTA"

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const title = post.meta_title ?? post.title
  const description = post.meta_description ?? post.excerpt
  const image = post.cover_image ?? `${SITE_URL}/images/og-default.jpg`

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      authors: [post.author_name],
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const related = await getRelatedPosts(post.slug, post.category, 3)

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]

  const formattedDate = new Date(post.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F0E2E] via-[#1a1850] to-[#2D2B7F] text-white pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-8">
            {crumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                {i < crumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-white/80 transition-colors">
                    {crumb.name}
                  </Link>
                ) : (
                  <span className="text-white/70 line-clamp-1">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3 mb-5">
            <span className="bg-[#4A47C4]/30 border border-[#4A47C4]/40 text-white/90 text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">{post.title}</h1>
          <p className="text-white/60 text-lg leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/50">
            <div className="flex items-center gap-2">
              {post.author_avatar ? (
                <Image
                  src={post.author_avatar}
                  alt={post.author_name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#4A47C4]/40 flex items-center justify-center text-xs font-bold text-white">
                  {post.author_name[0]}
                </div>
              )}
              <span>{post.author_name}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time_minutes} min read
            </span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="bg-gray-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="relative h-64 md:h-96 -mt-1 rounded-b-2xl overflow-hidden shadow-xl">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-[#0F0E2E]
              prose-h2:text-2xl prose-h3:text-xl
              prose-a:text-[#2D2B7F] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900
              prose-blockquote:border-l-[#2D2B7F] prose-blockquote:text-gray-600
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author bio */}
          <div className="flex items-start gap-4 mt-10 pt-8 border-t border-gray-100">
            {post.author_avatar ? (
              <Image
                src={post.author_avatar}
                alt={post.author_name}
                width={48}
                height={48}
                className="rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#2D2B7F]/10 flex items-center justify-center text-lg font-bold text-[#2D2B7F] flex-shrink-0">
                {post.author_name[0]}
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900">{post.author_name}</p>
              <p className="text-sm text-gray-500">Nolojia Team</p>
            </div>
          </div>
        </div>
      </article>

      {/* Mid-article CTA */}
      <section className="py-12 bg-[#0F0E2E]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-bold text-white text-lg mb-1">Ready to hand off your workload?</p>
              <p className="text-white/55 text-sm">500+ founders have reclaimed 20+ hours a week with Nolojia.</p>
            </div>
            <BookingCTA label="Book a Free Call" size="md" variant="white" className="flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl font-bold text-[#0F0E2E] mb-8">More from the Nolojia Blog</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((relPost) => (
                <Link key={relPost.slug} href={`/blog/${relPost.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    {relPost.cover_image && (
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={relPost.cover_image}
                          alt={relPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <span className="text-xs font-bold text-[#2D2B7F]">{relPost.category}</span>
                      <h3 className="font-bold text-gray-900 mt-2 mb-2 leading-snug group-hover:text-[#2D2B7F] transition-colors text-sm">
                        {relPost.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{relPost.read_time_minutes} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nav */}
      <section className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl flex justify-between">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#2D2B7F] font-semibold hover:text-[#4A47C4] transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <Link href="/services" className="inline-flex items-center gap-2 text-[#2D2B7F] font-semibold hover:text-[#4A47C4] transition-colors text-sm">
            Our Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
