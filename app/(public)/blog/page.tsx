import Image from "next/image"
import Link from "next/link"
import { Clock, PenSquare } from "lucide-react"

import { Container, Eyebrow, Pill, Section } from "@/components/site/primitives"
import { CtaLink } from "@/components/site/cta"
import { CtaSection, PageHero } from "@/components/site/sections"
import JsonLd from "@/components/seo/JsonLd"

import { getAllPostCards, type BlogPostCard } from "@/lib/blog"
import { CTA } from "@/lib/content/site"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"

export const revalidate = 600

export const metadata = pageMetadata({
  title: "Insights",
  description:
    "Writing from Nolojia on AI automation, AI agents, business operations and the systems that let small teams run like larger ones.",
  path: "/blog",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Insights", href: "/blog" },
]

/** Topics we publish under. Shown as intent, not as fake article counts. */
const TOPICS = [
  "AI Automation",
  "AI Agents",
  "Business Operations",
  "Productivity",
  "Executive Operations",
  "AI Strategy",
  "Technology",
]

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function PostCard({ post, featured = false }: { post: BlogPostCard; featured?: boolean }) {
  return (
    <article
      className={
        featured
          ? "group overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition duration-300 ease-smooth hover:border-brand/25 hover:shadow-md lg:grid lg:grid-cols-2"
          : "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"
      }
    >
      {post.cover_image ? (
        <div className={featured ? "relative h-56 lg:h-full" : "relative h-44"}>
          <Image
            src={post.cover_image}
            alt=""
            fill
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            className="object-cover"
          />
        </div>
      ) : null}

      <div className={featured ? "flex flex-col justify-center p-7 sm:p-9" : "flex flex-1 flex-col p-6"}>
        <Pill tone="brand" className="self-start">
          {post.category}
        </Pill>
        <h2
          className={
            featured
              ? "mt-4 text-2xl font-semibold text-foreground"
              : "mt-4 text-lg font-semibold text-foreground"
          }
        >
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{post.author_name}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock aria-hidden="true" className="h-3 w-3" />
            {post.read_time_minutes} min read
          </span>
        </div>
      </div>
    </article>
  )
}

export default async function BlogPage() {
  const posts = await getAllPostCards(30)
  const [featured, ...rest] = posts

  return (
    <>
      <JsonLd data={breadcrumbSchema(CRUMBS)} />

      <PageHero
        eyebrow="Insights"
        title="Notes on making businesses run better."
        description="Practical writing on AI, automation and operations — from the work we actually do, not from a content calendar."
        crumbs={CRUMBS}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {TOPICS.map((topic) => (
            <li key={topic}>
              <Pill>{topic}</Pill>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section>
        <Container>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 sm:p-10">
              <div className="flex max-w-2xl items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <PenSquare aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <Eyebrow className="mb-3">Coming soon</Eyebrow>
                  <h2 className="text-xl font-semibold text-foreground">
                    Nothing published here yet.
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">
                    We would rather leave this page empty than fill it with articles written to
                    occupy space. Writing goes up when we have something worth saying about the work
                    we are doing. If there is a topic you want covered, tell us and we will write it.
                  </p>
                  <div className="mt-6">
                    <CtaLink href={CTA.secondary.href} variant="secondary">
                      Suggest a topic
                    </CtaLink>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {featured ? (
                <div className="relative">
                  <PostCard post={featured} featured />
                </div>
              ) : null}

              {rest.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <div key={post.slug} className="relative">
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </Section>

      <CtaSection
        eyebrow="Insights"
        title="Would rather talk than read?"
        description="Tell us what your operation looks like today and we will give you a straight answer about what to change first."
      />
    </>
  )
}
