import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { AdminHeader } from '@/components/admin/header'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { ApplicantActions } from './applicant-actions'
import { NotesSection } from './notes-section'
import Link from 'next/link'
import {
  ArrowLeft, Mail, Phone, MapPin, Briefcase,
  ExternalLink, FileText, Calendar, Clock, DollarSign,
} from 'lucide-react'
import { format } from 'date-fns'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data } = await supabase.from('applications').select('full_name').eq('id', params.id).single()
  return { title: data?.full_name ?? 'Applicant' }
}

export default async function ApplicantDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: app } = await supabase
    .from('applications')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!app) notFound()

  // Get job details from the jobs table
  const { data: job } = await supabase
    .from('jobs')
    .select('slug, title, department, type, location')
    .eq('slug', app.job_slug)
    .single()

  const { data: notes } = await supabase
    .from('application_notes')
    .select('id, content, created_at, author_id, author_name')
    .eq('application_id', params.id)
    .order('created_at', { ascending: true })

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, admin_role')
    .eq('id', user!.id)
    .single()

  return (
    <div>
      <AdminHeader title={app.full_name} subtitle={`Applied for ${app.job_title}`} />

      <div className="p-6 space-y-5 max-w-5xl">
        <Link href="/admin/applicants" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
          <ArrowLeft size={15} />
          Back to Applicants
        </Link>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Left: Profile */}
          <div className="lg:col-span-1 space-y-4">
            {/* Candidate card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col items-center text-center mb-5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-3">
                  {app.full_name.charAt(0)}
                </div>
                <h2 className="font-bold text-gray-900 text-lg">{app.full_name}</h2>
                {app.years_experience && (
                  <p className="text-sm text-gray-500 mt-0.5">{app.years_experience} years experience</p>
                )}
                <div className="mt-3">
                  <ApplicationStatusBadge status={app.status} />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400 flex-shrink-0" />
                  <a href={`mailto:${app.email}`} className="hover:text-indigo-600 truncate">{app.email}</a>
                </div>
                {app.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400 flex-shrink-0" />
                    <span>{app.phone}</span>
                  </div>
                )}
                {app.location && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                    <span>{app.location}</span>
                  </div>
                )}
                {app.expected_salary && (
                  <div className="flex items-center gap-2.5 text-sm text-gray-600">
                    <DollarSign size={14} className="text-gray-400 flex-shrink-0" />
                    <span>Expected: {app.expected_salary}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Calendar size={14} className="text-gray-400 flex-shrink-0" />
                  <span>Applied {format(new Date(app.created_at), 'MMM d, yyyy')}</span>
                </div>
              </div>

              {/* Links */}
              {(app.linkedin || app.portfolio || app.resume_url) && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  {app.linkedin && (
                    <a href={app.linkedin} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                      <ExternalLink size={14} />LinkedIn Profile
                    </a>
                  )}
                  {app.portfolio && (
                    <a href={app.portfolio} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                      <ExternalLink size={14} />Portfolio
                    </a>
                  )}
                  {app.resume_url && (
                    <a href={app.resume_url} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
                      <FileText size={14} />Download Resume
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Job info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Position Applied</h3>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                  <Briefcase size={15} className="text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{app.job_title}</p>
                  <p className="text-xs text-gray-500">
                    {job?.department ?? ''}
                    {job?.type && ` · ${job.type}`}
                    {job?.location && ` · ${job.location}`}
                  </p>
                  {job && (
                    <Link href={`/admin/jobs/${job.slug}/edit`} className="text-xs text-indigo-600 hover:text-indigo-700 mt-1 inline-block">
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
              adminRole={profile?.admin_role ?? null}
            />
          </div>

          {/* Right: Details + notes */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover letter */}
            {app.cover_letter && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Cover Letter</h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {app.cover_letter}
                </div>
              </div>
            )}

            {/* Quick notes (from notes column) */}
            {app.notes && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h3 className="font-semibold text-amber-900 mb-2 text-sm">Quick Note</h3>
                <p className="text-sm text-amber-800">{app.notes}</p>
              </div>
            )}

            {/* Internal notes thread */}
            <NotesSection
              applicationId={app.id}
              notes={notes ?? []}
              currentUserId={user!.id}
              currentUserName={profile?.full_name ?? 'Admin'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
