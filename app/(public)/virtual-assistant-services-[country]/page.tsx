import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronRight, Globe } from "lucide-react"
import { countryPages, servicePages, SITE_URL } from "@/lib/seo/config"
import { countryServiceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"
import BookingCTA from "@/components/seo/BookingCTA"

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return countryPages.map((p) => ({ country: p.country }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>
}): Promise<Metadata> {
  const { country } = await params
  const page = countryPages.find((p) => p.country === country)
  if (!page) return {}

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}/virtual-assistant-services-${page.country}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/virtual-assistant-services-${page.country}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  }
}

// ─── Country-specific FAQs ────────────────────────────────────────────────────

function getCountryFaqs(page: (typeof countryPages)[number]) {
  return [
    {
      question: `How much does a virtual assistant cost in ${page.name}?`,
      answer: `Nolojia offers flexible plans starting from part-time to full-time dedicated VA support. All pricing is in ${page.currency} and significantly lower than the total cost of employing a local assistant. Book a discovery call for a tailored quote based on your specific requirements.`,
    },
    {
      question: `What time zone do your virtual assistants work in for ${page.name} clients?`,
      answer: `Our VAs serving ${page.name} work in ${page.timezone} to ensure full alignment with your business hours. Real-time collaboration, same-day responses, and live support are all standard.`,
    },
    {
      question: `Can your ${page.name} virtual assistant service start immediately?`,
      answer: `Yes. Most ${page.name} clients have their dedicated VA operational within 5–7 business days of their discovery call. We handle matching, onboarding, and integration — you're focused on business, not admin.`,
    },
    {
      question: `Is my business data safe with a Nolojia virtual assistant?`,
      answer: `Absolutely. All assistants sign comprehensive NDAs and operate under strict data handling protocols. For ${page.name} clients, we specifically address local privacy compliance requirements during onboarding.`,
    },
    {
      question: `What types of businesses in ${page.name} use Nolojia?`,
      answer: `We serve ${page.name} businesses across professional services, e-commerce, real estate, SaaS, marketing agencies, coaching and consulting, law firms, and more. If your business generates operational tasks that don't require your direct expertise, a VA can handle them.`,
    },
  ]
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>
}) {
  const { country } = await params
  const page = countryPages.find((p) => p.country === country)
  if (!page) notFound()

  const faqs = getCountryFaqs(page)

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: `VA Services in ${page.name}`, href: `/virtual-assistant-services-${page.country}` },
  ]

  // Featured services to show
  const featuredServices = servicePages.slice(0, 6)

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={countryServiceSchema(page)} />
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F0E2E] via-[#1a1850] to-[#2D2B7F] text-white pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
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
                  <span className="text-white/80">{crumb.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <Globe className="w-4 h-4" />
            {page.flag} {page.name}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{page.headline}</h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">{page.subheadline}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <BookingCTA label="Book a Free Call" size="lg" variant="white" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors text-base"
            >
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Timezone / currency badge */}
          <div className="flex gap-6 mt-10 pt-8 border-t border-white/10">
            <div>
              <p className="text-xs text-white/40 mb-1">Time Zone Coverage</p>
              <p className="text-sm font-semibold text-white/80">{page.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-1">Pricing Currency</p>
              <p className="text-sm font-semibold text-white/80">{page.currency}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-5">
            {page.intro.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
            <p className="text-gray-600 leading-relaxed">{page.marketContext}</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-3 text-center">
            Why {page.name} Businesses Choose Nolojia
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Tailored specifically for the {page.name} market, with the support structures local businesses need.
          </p>
          <div className="space-y-4">
            {page.benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-4 bg-white rounded-xl border border-gray-100 p-5">
                <CheckCircle2 className="w-5 h-5 text-[#2D2B7F] flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4 text-center">
            Our VA Services Available in {page.name}
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            The full Nolojia service stack — available to {page.name} businesses from day one.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-gray-50 hover:bg-[#2D2B7F]/5 border border-gray-200 hover:border-[#2D2B7F]/30 rounded-2xl p-6 transition-all duration-200"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-[#2D2B7F] mb-2 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{service.subtitle}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D2B7F] group-hover:gap-2 transition-all">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#2D2B7F] font-semibold hover:text-[#4A47C4] transition-colors"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4 text-center">
            Virtual Assistant FAQs for {page.name} Businesses
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Common questions from {page.name} business owners before getting started.
          </p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#2D2B7F] to-[#4A47C4] text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-4xl mb-4">{page.flag}</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hire a Virtual Assistant in {page.name} Today
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Book a free 25-minute discovery call. We&apos;ll understand your business, match you with the right VA, and have you operational this week.
          </p>
          <BookingCTA label="Book a Free Discovery Call" size="lg" variant="white" />
          <p className="text-white/40 text-sm mt-5">No contracts &middot; Start this week &middot; 4-week guarantee</p>
        </div>
      </section>
    </>
  )
}
