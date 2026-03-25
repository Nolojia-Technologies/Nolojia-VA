import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { JobStatusBadge } from '@/components/admin/status-badge'
import Link from 'next/link'
import { Plus, Briefcase, Users, Edit } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const metadata = { title: 'Job Listings' }

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { status?: string; department?: string }
}) {
  const supabase = createClient()

  let query = supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (searchParams.status) {
    query = query.eq('status', searchParams.status)
  }
  if (searchParams.department) {
    query = query.eq('department', searchParams.department)
  }

  const { data: jobs } = await query

  // Get application counts per job slug
  const jobSlugs = jobs?.map((j: any) => j.slug) ?? []
  const { data: appCounts } = await supabase
    .from('applications')
    .select('job_slug')
    .in('job_slug', jobSlugs)

  const countMap: Record<string, number> = {}
  appCounts?.forEach((a: any) => {
    countMap[a.job_slug] = (countMap[a.job_slug] || 0) + 1
  })

  const statusFilters = ['all', 'open', 'closed', 'draft']

  return (
    <div>
      <AdminHeader title="Job Listings" subtitle="Manage open positions and hiring pipelines" />

      <div className="p-6 space-y-5">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {statusFilters.map((s) => (
              <Link
                key={s}
                href={s === 'all' ? '/admin/jobs' : `/admin/jobs?status=${s}`}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  (s === 'all' && !searchParams.status) || searchParams.status === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </div>
          <Link
            href="/admin/jobs/new"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} />
            New Job
          </Link>
        </div>

        {/* Jobs Grid */}
        {jobs && jobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job: any) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <Briefcase size={18} className="text-indigo-600" />
                  </div>
                  <JobStatusBadge status={job.status} />
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-xs text-gray-500 mb-3">
                  {job.department} · {job.type} · {job.location}
                </p>

                {job.description && (
                  <p className="text-xs text-gray-600 line-clamp-2 flex-1 mb-4">
                    {job.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5">
                    <Users size={13} />
                    <span>{countMap[job.slug] ?? 0} applicant{(countMap[job.slug] ?? 0) !== 1 ? 's' : ''}</span>
                  </div>
                  <span>{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/jobs/${job.slug}/edit`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition-colors"
                  >
                    <Edit size={13} />
                    Edit
                  </Link>
                  <Link
                    href={`/admin/applicants?job=${job.slug}`}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium transition-colors"
                  >
                    <Users size={13} />
                    View Applicants
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 text-center">
            <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="text-base font-semibold text-gray-700">No job listings yet</h3>
            <p className="text-sm text-gray-500 mt-1 mb-5">Create your first job listing to start receiving applications</p>
            <Link
              href="/admin/jobs/new"
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus size={16} />
              Create Job Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
