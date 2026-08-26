import { MetadataRoute } from "next"
import { SITE_URL, servicePages, industryPages, countryPages } from "@/lib/seo/config"
import { PRODUCTS } from "@/lib/content/products"
import { PILLAR_DETAILS } from "@/lib/content/solutions"
import { getAllPostCards } from "@/lib/blog"
import { jobs } from "@/lib/careers/jobs"

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const core: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/security`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const pillars: MetadataRoute.Sitemap = PILLAR_DETAILS.map((p) => ({
    url: `${SITE_URL}${p.href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const products: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const services: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const industries: MetadataRoute.Sitemap = industryPages.map((i) => ({
    url: `${SITE_URL}/hire-virtual-assistant-for-${i.industry}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }))

  const countries: MetadataRoute.Sitemap = countryPages.map((c) => ({
    url: `${SITE_URL}/virtual-assistant-services-${c.country}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  // Dynamic content — degrades to an empty list if the database is unreachable
  // so a sitemap is always served.
  const posts = await getAllPostCards(200).catch(() => [])

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/careers/${job.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.5,
  }))

  return [
    ...core,
    ...pillars,
    ...products,
    ...services,
    ...industries,
    ...countries,
    ...blogPosts,
    ...jobPages,
  ]
}
