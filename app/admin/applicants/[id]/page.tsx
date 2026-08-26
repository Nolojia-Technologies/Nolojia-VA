import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase,
  ExternalLink, FileText, Calendar, DollarSign,
} from 'lucide-react'
import { format } from 'date-fns'

import { AdminHeader } from '@/components/admin/header'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { requireAdmin } from '@/lib/auth/access'
import { getApplication, listNotes } from '@/lib/db/applications'
import { getJobBySlugForAdmin } from '@/lib/db/jobs'
import { ApplicantActions } from './applicant-actions'
import { NotesSection } from './notes-section'

export async function generateMetadata({ params }: { params: { id: string } }) {
  // Metadata renders before the page body, so it needs its own authorization
  // check — otherwise an unauthorised request still leaks a candidate's name
  // through the document title.
  await requireAdmin()
  const application = await getApplication(params.id)
  return { title: application?.full_name ?? 'Applicant' }
}

export default async function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const profile = await requireAdmin()

  const app = await getApplication(params.id)
  if (!app) notFound()

  const [job, notes] = await Promise.all([
    getJobBySlugForAdmin(app.job_slug),
    listNotes(params.id),
  ])

  return (
    <div>
      <AdminHeader title={app.full_name} subtitle={`Applied for ${app.job_title}`} />

      <div className="p-6 space-y-5 max-w-5xl">
        <Link href="/admin/applicants" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft aria-hidden="true" size={15} />
          Back to Applicants
        </Link>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left: Profile */}
          <div className="lg:col-span-1 space-y-4">
            {/* Candidate card */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {app.full_name.charAt(0)}
                </div>
                <h2 className="font-bold text-foreground text-lg">{app.full_name}</h2>
                {app.years_experience && (
                  <p className="text-sm text-muted-foreground mt-0.5">{app.years_experience} years experience</p>
                )}
                <div className="mt-3">
                  <ApplicationStatusBadge status={app.status} />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail aria-hidden="true" size={14} className="text-muted-foreground flex-shrink-0" />
                  <a href={`mailto:${app.email}`} className="hover:text-brand-hover truncate">{app.email}</a>
                </div>
                {app.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Phone aria-hidden="true" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span>{app.phone}</span>
                  </div>
                )}
                {app.location && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <MapPin aria-hidden="true" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span>{app.location}</span>
                  </div>
                )}
                {app.expected_salary && (
                  <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <DollarSign aria-hidden="true" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span>Expected: {app.expected_salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Calendar aria-hidden="true" size={14} className="text-muted-foreground flex-shrink-0" />
                  <span>Applied {format(new Date(app.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>

              {/* Links */}
              {(app.linkedin || app.portfolio || app.resume_key) && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  {app.linkedin && (
                    <a href={app.linkedin} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-brand hover:text-brand-hover">
                      <ExternalLink aria-hidden="true" size={14} />LinkedIn Profile
                    </a>
                  )}
                  {app.portfolio && (
                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-brand hover:text-brand-hover">
                      <ExternalLink aria-hidden="true" size={14} />Portfolio
                    </a>
                  )}
                  {app.resume_key && (
                    <a href={`/admin/applicants/${app.id}/resume`}
                       className="flex items-center gap-2 text-sm text-brand hover:text-brand-hover">
                      <FileText aria-hidden="true" size={14} />Download Resume
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Job info */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
              <h3 className="font-semibold text-foreground mb-3 text-sm">Position Applied</h3>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-soft flex items-center justify-center flex-shrink-0">
                  <Briefcase aria-hidden="true" size={15} className="text-brand" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{app.job_title}</p>
                  <p className="text-xs text-muted-foreground">
                    {job?.department ?? ''}
                    {job?.type && ` · ${job.type}`}
                    {job?.location && ` · ${job.location}`}
                  </p>
                  {job && (
                    <Link href={`/admin/jobs/${job.slug}/edit`} className="text-xs text-brand hover:text-brand-hover mt-1 inline-block">
                      View job listing →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Status actions */}
            <ApplicantActions
              applicationId={app.id}
              currentStatus={app.status}
              adminRole={profile.admin_role}
            />
          </div>

          {/* Right: Details + notes */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover letter */}
            {app.cover_letter && (
              <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
                <h3 className="font-semibold text-foreground mb-3">Cover Letter</h3>
                <div className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">
                  {app.cover_letter}
                </div>
              </div>
            )}

            {/* Quick notes (from notes column) */}
            {app.notes && (
              <div className="bg-warning-soft border border-warning/25 rounded-2xl p-5">
                <h3 className="font-semibold text-warning mb-2 text-sm">Quick Note</h3>
                <p className="text-sm text-warning">{app.notes}</p>
              </div>
            )}

            {/* Internal notes thread */}
            <NotesSection
              applicationId={app.id}
              notes={notes}
              currentUserId={profile.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
