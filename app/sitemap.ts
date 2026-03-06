import { MetadataRoute } from "next"
import { SITE_URL, servicePages, industryPages, countryPages } from "@/lib/seo/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/success-stories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]

  const servicePageUrls: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const industryPageUrls: MetadataRoute.Sitemap = industryPages.map((i) => ({
    url: `${SITE_URL}/hire-virtual-assistant-for-${i.industry}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  const countryPageUrls: MetadataRoute.Sitemap = countryPages.map((c) => ({
    url: `${SITE_URL}/virtual-assistant-services-${c.country}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [...staticPages, ...servicePageUrls, ...industryPageUrls, ...countryPageUrls]
}
