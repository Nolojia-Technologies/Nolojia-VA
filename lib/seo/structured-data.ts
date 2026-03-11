import { SITE_URL, SITE_NAME, ServicePage, IndustryPage, CountryPage } from "./config"
import type { BlogPost } from "@/lib/blog"

// ─── Organization Schema ──────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/nolojia-logo.png`,
    description: "AI-powered virtual assistant services for businesses. Admin, creative, and growth support.",
    foundingDate: "2023",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@nolojia.com",
      availableLanguage: "English",
    },
    sameAs: [
      "https://x.com/nolojia",
      "https://www.linkedin.com/company/93209134/",
      "https://facebook.com/nolojia",
      "https://tiktok.com/@nolojia",
    ],
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
    image: post.cover_image ?? `${SITE_URL}/images/og-default.jpg`,
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
