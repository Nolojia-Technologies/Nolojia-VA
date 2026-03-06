import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronRight } from "lucide-react"
import { servicePages, SITE_URL } from "@/lib/seo/config"
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"
import BookingCTA from "@/components/seo/BookingCTA"

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) return {}

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `${SITE_URL}/services/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${SITE_URL}/services/${service.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ]

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={serviceSchema(service)} />
      <JsonLd data={faqSchema(service.faqs)} />
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
            <span className="w-2 h-2 rounded-full bg-[#4A47C4]" />
            Nolojia Service
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{service.title}</h1>
          <p className="text-xl text-white/70 mb-4 leading-relaxed">{service.subtitle}</p>
          <p className="text-base text-white/55 max-w-2xl leading-relaxed">{service.heroDescription}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <BookingCTA label="Book a Free Discovery Call" size="lg" variant="white" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors text-base"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-5">
            {service.overview.map((paragraph, i) => (
              <p key={i} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-3 text-center">
            Why Choose Nolojia for {service.title}?
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            Every client engagement is backed by our 4-week integration guarantee and dedicated account management.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#2D2B7F]/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 text-[#2D2B7F]" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4">
                What Your Assistant Will Handle
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                A comprehensive overview of tasks your dedicated Nolojia assistant manages from day one.
              </p>
              <BookingCTA label="Start This Week" size="md" variant="primary" />
            </div>
            <ul className="space-y-3">
              {service.tasks.map((task) => (
                <li key={task} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#2D2B7F] flex-shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-[#0F0E2E] text-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Industries We Serve</h2>
          <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
            Our assistants have deep experience across the industries where {service.title.toLowerCase()} matters most.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {service.industries.map((industry) => (
              <div key={industry.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <h3 className="font-bold text-white mb-2">{industry.name}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4 text-center">How We Get Started</h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            From your first call to active execution — we move fast.
          </p>
          <div className="space-y-6">
            {service.process.map((step, i) => (
              <div key={step.step} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#2D2B7F]/10 border border-[#2D2B7F]/20 flex items-center justify-center">
                  <span className="text-[#2D2B7F] font-bold text-lg">{step.step}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{step.description}</p>
                </div>
                {i < service.process.length - 1 && (
                  <div className="hidden md:block self-end mb-6 text-gray-200">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Everything you need to know before getting started.
          </p>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started with {service.title}?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Book a free 25-minute discovery call. We&apos;ll map your tasks, match you with the right assistant, and have you operational this week.
          </p>
          <BookingCTA label="Book Your Free Discovery Call" size="lg" variant="white" />
          <p className="text-white/40 text-sm mt-5">No contracts &middot; Start this week &middot; 4-week guarantee</p>
        </div>
      </section>
    </>
  )
}
