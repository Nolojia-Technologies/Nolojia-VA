import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import Link from 'next/link'
import { Users, Search, Filter, Calendar, MapPin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import type { AdminRole, ApplicationStatus } from '@/types/database'

export const metadata = { title: 'Applicants' }

// Department access by admin role (match actual department names used in jobs table)
const roleAllowedDepartments: Record<AdminRole, string[] | null> = {
  super_admin: null,
  hr_manager: null,
  operations_manager: ['Operations', 'VA Services', 'General'],
  finance_manager: ['Finance', 'General'],
  marketing_manager: ['Marketing', 'Creative Support', 'General'],
}

const statusOptions: ApplicationStatus[] = ['new', 'reviewed', 'shortlisted', 'hired', 'rejected']

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: { status?: string; job?: string; q?: string; page?: string }
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('admin_role')
    .eq('id', user!.id)
    .single()

  const adminRole = profile?.admin_role as AdminRole | null
  const allowedDepts = adminRole ? roleAllowedDepartments[adminRole] : null

  const page = parseInt(searchParams.page ?? '1')
  const pageSize = 25
  const offset = (page - 1) * pageSize

  let query = supabase
    .from('applications')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1)

  if (searchParams.status && (statusOptions as string[]).includes(searchParams.status)) {
    query = query.eq('status', searchParams.status as ApplicationStatus)
  }
  if (searchParams.job) query = query.eq('job_slug', searchParams.job)

  const { data: applications, count } = await query

  // Role-based department filter — look up each app's job department
  let filtered = applications ?? []
  const departmentMap: Record<string, string> = {}

  if (allowedDepts || filtered.length > 0) {
    const slugs = [...new Set(filtered.map((a) => a.job_slug))]
    if (slugs.length > 0) {
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('slug, department')
        .in('slug', slugs)
      jobsData?.forEach((j) => { departmentMap[j.slug] = j.department })
    }

    if (allowedDepts) {
      filtered = filtered.filter((a) =>
        allowedDepts.includes(departmentMap[a.job_slug] ?? '')
      )
    }
  }

  // Search filter
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase()
    filtered = filtered.filter((a) =>
      a.full_name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)
    )
  }

  // Jobs for filter dropdown
  const { data: jobs } = await supabase
    .from('jobs')
    .select('slug, title, department')
    .order('title')

  const filteredJobs = allowedDepts
    ? jobs?.filter((j) => allowedDepts.includes(j.department))
    : jobs

  return (
    <div>
      <AdminHeader
        title="Applicant Tracking"
        subtitle={`${count ?? 0} total applicant${(count ?? 0) !== 1 ? 's' : ''}`}
      />

      <div className="p-6 space-y-5">
        {/* Filters */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-4 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <form className="flex items-center gap-2 bg-surface rounded-xl px-3 py-2.5 flex-1" method="GET">
              <Search aria-hidden="true" size={15} className="text-muted-foreground flex-shrink-0" />
              <label htmlFor="applicant-search" className="sr-only">
                Search applicants by name or email
              </label>
              <input
                id="applicant-search"
                name="q"
                type="search"
                defaultValue={searchParams.q}
                placeholder="Search by name or email..."
                className="bg-transparent text-sm text-foreground/85 placeholder:text-muted-foreground/70 outline-none w-full"
              />
              {searchParams.status && <input type="hidden" name="status" value={searchParams.status} />}
              {searchParams.job && <input type="hidden" name="job" value={searchParams.job} />}
            </form>

            {/* Status filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
              <Link
                href={buildUrl(searchParams, { status: undefined })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  !searchParams.status ? 'bg-brand text-white' : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                All
              </Link>
              {statusOptions.map(s => (
                <Link
                  key={s}
                  href={buildUrl(searchParams, { status: s })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    searchParams.status === s ? 'bg-brand text-white' : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Link>
              ))}
            </div>
          </div>

          {/* Job filter */}
          {filteredJobs && filteredJobs.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Filter aria-hidden="true" size={12} /> Role:
              </span>
              <Link
                href={buildUrl(searchParams, { job: undefined })}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                  !searchParams.job ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground hover:bg-border'
                }`}
              >
                All roles
              </Link>
              {filteredJobs.map((job) => (
                <Link
                  key={job.slug}
                  href={buildUrl(searchParams, { job: job.slug })}
                  className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                    searchParams.job === job.slug ? 'bg-brand-soft text-brand' : 'bg-muted text-muted-foreground hover:bg-border'
                  }`}
                >
                  {job.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          {filtered.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-5 py-3">Candidate</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden md:table-cell">Role Applied</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Experience</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden xl:table-cell">Location</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-3 hidden lg:table-cell">Applied</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((app) => (
                    <tr key={app.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                            {app.full_name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{app.full_name}</p>
                            <p className="text-xs text-muted-foreground">{app.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <p className="text-sm text-foreground/85">{app.job_title}</p>
                        <p className="text-xs text-muted-foreground">{departmentMap[app.job_slug] ?? ''}</p>
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {app.years_experience ? `${app.years_experience} yrs` : '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden xl:table-cell">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {app.location ? (<><MapPin aria-hidden="true" size={11} />{app.location}</>) : '—'}
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <ApplicationStatusBadge status={app.status} />
                      </td>
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar aria-hidden="true" size={11} />
                          {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <Link href={`/admin/applicants/${app.id}`} className="text-xs text-brand hover:text-brand-hover font-medium">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users aria-hidden="true" className="w-10 h-10 text-muted-foreground/60 mb-2" />
              <p className="text-sm font-medium text-muted-foreground">No applicants found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {count && count > pageSize && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {offset + 1}–{Math.min(offset + pageSize, count)} of {count}</span>
            <div className="flex items-center gap-2">
              {page > 1 && (
                <Link href={buildUrl(searchParams, { page: String(page - 1) })} className="px-3 py-1.5 bg-card border border-border rounded-lg hover:bg-surface-2 text-xs">Previous</Link>
              )}
              {offset + pageSize < count && (
                <Link href={buildUrl(searchParams, { page: String(page + 1) })} className="px-3 py-1.5 bg-card border border-border rounded-lg hover:bg-surface-2 text-xs">Next</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function buildUrl(current: Record<string, string | undefined>, overrides: Record<string, string | undefined>) {
  const params = new URLSearchParams()
  const merged = { ...current, ...overrides }
  for (const [k, v] of Object.entries(merged)) {
    if (v !== undefined && v !== '') params.set(k, v)
  }
  const qs = params.toString()
  return `/admin/applicants${qs ? `?${qs}` : ''}`
}
