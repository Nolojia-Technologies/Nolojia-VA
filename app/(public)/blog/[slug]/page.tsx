import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Clock } from "lucide-react"

import { getPostBySlug, getRelatedPosts, getAllPublishedSlugs } from "@/lib/blog"
import { blogPostSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import { SITE_URL } from "@/lib/seo/config"
import JsonLd from "@/components/seo/JsonLd"

import { Container, Pill, Section } from "@/components/site/primitives"
import { Breadcrumbs } from "@/components/site/breadcrumbs"
import { CtaSection } from "@/components/site/sections"

export async function generateStaticParams() {
  const slugs = await getAllPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

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
  const image = post.cover_image ?? `${SITE_URL}/opengraph-image`

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
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}

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
    { name: "Insights", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ]

  const formattedDate = new Date(post.published_at).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <>
      <JsonLd data={blogPostSchema(post)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <article>
        <header className="border-b border-border bg-background pb-10 pt-10 sm:pt-14">
          <Container size="narrow">
            <Breadcrumbs items={crumbs} />
            <Pill tone="brand">{post.category}</Pill>
            <h1 className="mt-5 text-display-sm font-semibold text-foreground">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                {post.author_avatar ? (
                  <Image
                    src={post.author_avatar}
                    alt=""
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand"
                  >
                    {post.author_name[0]}
                  </span>
                )}
                <span className="text-foreground">{post.author_name}</span>
              </span>
              <time dateTime={post.published_at}>{formattedDate}</time>
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                {post.read_time_minutes} min read
              </span>
            </div>
          </Container>
        </header>

        {post.cover_image ? (
          <Container size="narrow" className="pt-10">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-border sm:h-80">
              <Image
                src={post.cover_image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          </Container>
        ) : null}

        <Section className="pb-16 pt-12 sm:pb-20 sm:pt-14">
          <Container size="narrow">
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags.length > 0 ? (
              <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>#{tag}</Pill>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-10 flex items-center justify-between border-t border-border pt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                All insights
              </Link>
              <Link
                href="/solutions"
                className="text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                Explore Solutions &rarr;
              </Link>
            </div>
          </Container>
        </Section>
      </article>

      {related.length > 0 ? (
        <Section tone="surface" className="py-16">
          <Container>
            <h2 className="text-xl font-semibold text-foreground">More from Nolojia</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => (
                <article
                  key={rel.slug}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
                >
                  {rel.cover_image ? (
                    <div className="relative h-36">
                      <Image
                        src={rel.cover_image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-semibold text-brand">{rel.category}</span>
                    <h3 className="mt-2 flex-1 text-[0.9375rem] font-semibold leading-snug text-foreground">
                      <Link href={`/blog/${rel.slug}`} className="after:absolute after:inset-0">
                        {rel.title}
                      </Link>
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock aria-hidden="true" className="h-3 w-3" />
                      {rel.read_time_minutes} min read
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection />
    </>
  )
}
