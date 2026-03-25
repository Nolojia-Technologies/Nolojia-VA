import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Building2, CheckCircle2, Star, Gift } from "lucide-react"
import { getJobBySlug, getStaticJobSlugs } from "@/lib/careers/jobs"
import { SITE_URL } from "@/lib/seo/config"
import ApplicationForm from "./ApplicationForm"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getStaticJobSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJobBySlug(params.slug)
  if (!job) return { title: "Job Not Found | Nolojia" }

  return {
    title: `${job.title} | Careers at Nolojia`,
    description: job.shortDescription,
    openGraph: {
      title: `${job.title} — ${job.department} | Nolojia Careers`,
      description: job.shortDescription,
      url: `${SITE_URL}/careers/${job.slug}`,
      type: "website",
    },
    alternates: {
      canonical: `${SITE_URL}/careers/${job.slug}`,
    },
  }
}

const deptColor: Record<string, string> = {
  "VA Services": "bg-blue-100 text-blue-700 border-blue-200",
  "Creative Support": "bg-purple-100 text-purple-700 border-purple-200",
  "Growth Support": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Operations": "bg-amber-100 text-amber-700 border-amber-200",
}

export default function JobDetailPage({ params }: Props) {
  const job = getJobBySlug(params.slug)
  if (!job) notFound()

  // JSON-LD schema for Google Jobs
  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    employmentType: "FULL_TIME",
    datePosted: "2026-03-01",
    hiringOrganization: {
      "@type": "Organization",
      name: "Nolojia",
      sameAs: "https://www.nolojia.com",
      logo: `${SITE_URL}/images/og-default.jpg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "Worldwide",
      },
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Worldwide",
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        unitText: "MONTH",
      },
    },
  }

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7773E7]/10 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Breadcrumb */}
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium transition-colors mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to all roles
          </Link>

          <div className="max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${deptColor[job.department] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                {job.department}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/15 flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {job.type}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/15 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> {job.location}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/15 flex items-center gap-1.5">
                <Building2 className="w-3 h-3" /> Nolojia
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{job.title}</h1>
            <p className="text-white/60 text-lg leading-relaxed max-w-2xl">{job.shortDescription}</p>
          </div>
        </div>
      </section>

      {/* ── JOB DETAILS + FORM ───────────────────────────────────────────── */}
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 max-w-6xl mx-auto items-start">

            {/* ── LEFT: Job Details ──────────────────────────────────────── */}
            <div className="space-y-8">

              {/* About the Role */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About the Role</h2>
                <p className="text-gray-600 leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-[#2D2B7F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#2D2B7F]" />
                  </span>
                  Responsibilities
                </h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0 mt-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements + Nice to Have */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2D2B7F]" /> Requirements
                  </h2>
                  <ul className="space-y-2.5">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" /> Nice to Have
                  </h2>
                  <ul className="space-y-2.5">
                    {job.niceToHave.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2.5">
                  <span className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4 text-emerald-600" />
                  </span>
                  What We Offer
                </h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {job.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── RIGHT: Application Form (sticky) ──────────────────────── */}
            <div className="lg:sticky lg:top-24">
              <ApplicationForm jobTitle={job.title} jobSlug={job.slug} />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
