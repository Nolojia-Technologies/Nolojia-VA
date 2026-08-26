import { SITE_URL, SITE_NAME, ServicePage, IndustryPage, CountryPage } from "./config"
import type { BlogPost } from "@/lib/blog"

// ─── Organization Schema ──────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Nolojia Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/images/nolojia-logo.png`,
    description:
      "Nolojia builds AI assistants, intelligent automation and digital business systems that help companies operate more efficiently.",
    foundingDate: "2023",
    founder: { "@type": "Person", name: "Shaun Daniel Machua" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@nolojia.com",
      telephone: "+254793903930",
      availableLanguage: "English",
    },
    // Only accounts we can actually point at.
    sameAs: ["https://www.linkedin.com/company/93209134/"],
  }
}

// ─── Solution / offering schema ───────────────────────────────────────────────

export function solutionSchema(input: {
  name: string
  description: string
  path: string
  serviceType: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    serviceType: input.serviceType,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
    },
  }
}

// ─── Product schema ───────────────────────────────────────────────────────────

export function softwareApplicationSchema(input: {
  name: string
  description: string
  path: string
  category: string
  /** Omitted entirely when the product is not yet released. */
  released?: boolean
  /** Only set when the product can genuinely be installed today. */
  installUrl?: string
  /** Real platforms. Defaults to "Web" when the product is a web app. */
  platforms?: string[]
  /** Free-of-charge offer. Only pass when that is actually the case today. */
  free?: boolean
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    applicationCategory: input.category,
    operatingSystem: input.platforms?.length ? input.platforms.join(", ") : "Web",
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(input.installUrl ? { installUrl: input.installUrl } : {}),
    // No aggregateRating anywhere: inventing one is both untrue and a penalty.
    ...(input.free
      ? { offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } }
      : {}),
    ...(input.released === false ? { releaseNotes: "In development — not publicly available." } : {}),
  }
}

// ─── Generic web page schema ──────────────────────────────────────────────────

export function webPageSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  }
}

// ─── Website Schema ───────────────────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

// ─── Service Page Schema ──────────────────────────────────────────────────────

export function serviceSchema(service: ServicePage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: service.title,
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/book`,
    },
  }
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────

export function breadcrumbSchema(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  }
}

// ─── Blog Post Schema ─────────────────────────────────────────────────────────

export function blogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image ?? `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/nolojia-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  }
}

// ─── Local Business / Industry Page Schema ────────────────────────────────────

export function industryServiceSchema(industry: IndustryPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Virtual Assistant Services for ${industry.name}`,
    description: industry.metaDescription,
    url: `${SITE_URL}/hire-virtual-assistant-for-${industry.industry}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: "Virtual Assistant",
    audience: {
      "@type": "BusinessAudience",
      audienceType: industry.name,
    },
    areaServed: "Worldwide",
  }
}

// ─── Local SEO Country Schema ─────────────────────────────────────────────────

export function countryServiceSchema(country: CountryPage) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Virtual Assistant Services in ${country.name}`,
    description: country.metaDescription,
    url: `${SITE_URL}/virtual-assistant-services-${country.country}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: "Virtual Assistant",
    areaServed: {
      "@type": "Country",
      name: country.name,
    },
  }
}
