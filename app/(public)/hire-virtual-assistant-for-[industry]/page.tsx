import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ArrowRight, ChevronRight, Zap } from "lucide-react"
import { industryPages, SITE_URL } from "@/lib/seo/config"
import { industryServiceSchema, faqSchema, breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"
import BookingCTA from "@/components/seo/BookingCTA"

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return industryPages.map((p) => ({ industry: p.industry }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>
}): Promise<Metadata> {
  const { industry } = await params
  const page = industryPages.find((p) => p.industry === industry)
  if (!page) return {}

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `${SITE_URL}/hire-virtual-assistant-for-${page.industry}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE_URL}/hire-virtual-assistant-for-${page.industry}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry } = await params
  const page = industryPages.find((p) => p.industry === industry)
  if (!page) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: page.headline, href: `/hire-virtual-assistant-for-${page.industry}` },
  ]

  return (
    <>
      {/* Structured Data */}
      <JsonLd data={industryServiceSchema(page)} />
      <JsonLd data={faqSchema(page.faqs)} />
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
            {page.name} VA Services
          </div>

          {/* Stats */}
          {page.stats.length > 0 && (
            <div className="flex gap-6 mb-8">
              {page.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/55">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{page.headline}</h1>
          <p className="text-xl text-white/70 mb-10 leading-relaxed max-w-2xl">{page.subheadline}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <BookingCTA label="Book a Free Call" size="lg" variant="white" />
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold transition-colors text-base"
            >
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
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
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-3 text-center">
            The {page.name} Operations Challenge
          </h2>
          <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
            These are the exact problems our {page.name.toLowerCase()} clients come to us with. We&apos;ve solved all of them.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {page.painPoints.map((point) => (
              <div key={point.title} className="bg-white rounded-2xl border border-red-100 p-6">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                  <span className="text-red-500 font-bold text-sm">!</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{point.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{point.description}</p>
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
                What Your VA Will Handle
              </h2>
              <p className="text-gray-500 mb-8 leading-relaxed">
                A comprehensive list of tasks our {page.name.toLowerCase()} virtual assistants take off your plate from day one.
              </p>
              <BookingCTA label="Hire Your VA This Week" size="md" variant="primary" />
            </div>
            <ul className="space-y-3">
              {page.tasks.map((task) => (
                <li key={task} className="flex items-start gap-3 text-gray-700">
                  <CheckCircle2 className="w-5 h-5 text-[#2D2B7F] flex-shrink-0 mt-0.5" />
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Automations */}
      {page.automations.length > 0 && (
        <section className="py-20 bg-[#0F0E2E] text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center gap-3 justify-center mb-4">
              <Zap className="w-6 h-6 text-[#4A47C4]" />
              <h2 className="text-3xl font-bold">Automations We Build for {page.name}</h2>
            </div>
            <p className="text-white/60 text-center mb-12 max-w-xl mx-auto">
              Beyond manual execution, we design and implement automation systems that run 24/7 without your team.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {page.automations.map((automation) => (
                <div key={automation} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                  <Zap className="w-4 h-4 text-[#4A47C4] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{automation}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#0F0E2E] mb-4 text-center">
            Common Questions from {page.name} Clients
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Answers to the questions we hear most from {page.name.toLowerCase()} businesses.
          </p>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
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
            Hire Your {page.name} Virtual Assistant Today
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Book a free 25-minute call. We&apos;ll understand your {page.name.toLowerCase()} operations and match you with the right VA — ready to start this week.
          </p>
          <BookingCTA label="Book a Free Discovery Call" size="lg" variant="white" />
          <p className="text-white/40 text-sm mt-5">No contracts &middot; Start this week &middot; 4-week guarantee</p>
        </div>
      </section>
    </>
  )
}
