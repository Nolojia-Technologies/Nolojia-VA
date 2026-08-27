import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Check, Clock, Gift, MapPin } from "lucide-react"

import { getJobBySlug, getStaticJobSlugs } from "@/lib/careers/jobs"
import { SITE_URL } from "@/lib/seo/config"
import { pageMetadata } from "@/lib/seo/metadata"
import { breadcrumbSchema } from "@/lib/seo/structured-data"
import JsonLd from "@/components/seo/JsonLd"
import ApplicationForm from "./ApplicationForm"

import { Container, Pill, Section } from "@/components/site/primitives"
import { Breadcrumbs } from "@/components/site/breadcrumbs"

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return getStaticJobSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJobBySlug(params.slug)
  if (!job) return { title: "Job not found" }

  return pageMetadata({
    title: `${job.title} — Careers`,
    description: job.shortDescription,
    path: `/careers/${job.slug}`,
  })
}

export default function JobDetailPage({ params }: Props) {
  const job = getJobBySlug(params.slug)
  if (!job) notFound()

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
    { name: job.title, href: `/careers/${job.slug}` },
  ]

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    employmentType: job.type.toUpperCase().replace(/[\s-]+/g, "_"),
    datePosted: "2026-03-01",
    hiringOrganization: {
      "@type": "Organization",
      name: "Nolojia",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/images/nolojia-logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "Worldwide" },
    },
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: { "@type": "Country", name: "Worldwide" },
    directApply: true,
  }

  return (
    <>
      <JsonLd data={jobSchema} />
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="border-b border-border bg-background pb-12 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={crumbs} />
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Pill tone="brand">{job.department}</Pill>
              <Pill>
                <Clock aria-hidden="true" className="h-3 w-3" />
                {job.type}
              </Pill>
              <Pill>
                <MapPin aria-hidden="true" className="h-3 w-3" />
                {job.location}
              </Pill>
            </div>
            <h1 className="mt-5 text-display-sm font-semibold text-foreground">{job.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {job.shortDescription}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="surface">
        <Container size="wide">
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_28rem]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-lg font-semibold text-foreground">About the role</h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="text-lg font-semibold text-foreground">Responsibilities</h2>
                <ul className="mt-4 space-y-2.5">
                  {job.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-base font-semibold text-foreground">Requirements</h2>
                  <ul className="mt-4 space-y-2.5">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-base font-semibold text-foreground">Nice to have</h2>
                  <ul className="mt-4 space-y-2.5">
                    {job.niceToHave.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-7">
                <h2 className="flex items-center gap-2.5 text-lg font-semibold text-foreground">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-success-soft">
                    <Gift aria-hidden="true" className="h-4 w-4 text-success" />
                  </span>
                  What we offer
                </h2>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {job.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              <ApplicationForm jobTitle={job.title} jobSlug={job.slug} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
