import { requireAdmin } from '@/lib/auth/access'
import {
  applicationStatusBreakdown,
  countApplications,
  listRecentApplications,
} from '@/lib/db/applications'
import { countJobs, listJobsForAdmin } from '@/lib/db/jobs'
import { countUnread, listNotifications } from '@/lib/db/notifications'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { Users, Briefcase, UserCheck, Bell, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export const metadata = { title: 'Dashboard' }

/**
 * Pipeline stages in hiring order, so the bar reads left to right as a funnel.
 * `rejected` sits at the end rather than in sequence — it is an exit from the
 * funnel, not a stage within it.
 */
const PIPELINE = [
  { label: 'New',         status: 'new',         bar: 'bg-brand',       dot: 'bg-brand' },
  { label: 'Reviewed',    status: 'reviewed',    bar: 'bg-brand/70',    dot: 'bg-brand/70' },
  { label: 'Shortlisted', status: 'shortlisted', bar: 'bg-warning',     dot: 'bg-warning' },
  { label: 'Hired',       status: 'hired',       bar: 'bg-success',     dot: 'bg-success' },
  { label: 'Rejected',    status: 'rejected',    bar: 'bg-destructive', dot: 'bg-destructive' },
] as const

export default async function DashboardPage() {
  const profile = await requireAdmin()

  const [
    totalApplications,
    activeJobs,
    newApplicants,
    hiredCount,
    recentApplications,
    recentNotifications,
    allOpenJobs,
    unreadCount,
    breakdown,
  ] = await Promise.all([
    countApplications(),
    countJobs('open'),
    countApplications('new'),
    countApplications('hired'),
    listRecentApplications(8),
    listNotifications(profile.id, 5),
    listJobsForAdmin('open'),
    countUnread(profile.id),
    applicationStatusBreakdown(),
  ])

  const openJobs = allOpenJobs.slice(0, 5)

  // The pipeline bar is proportional to the largest stage, not to the total:
  // with 40 rejected and 2 shortlisted, scaling by total makes every stage but
  // one invisible.
  const pipelineStages = PIPELINE.map((stage) => ({
    ...stage,
    count: breakdown[stage.status],
  }))
  const pipelinePeak = Math.max(...pipelineStages.map((s) => s.count), 1)
  const pipelineTotal = pipelineStages.reduce((sum, s) => sum + s.count, 0)

  const conversionRate =
    totalApplications > 0 ? ((hiredCount / totalApplications) * 100).toFixed(1) : '0'

  return (
    <div>
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back — here's what's happening at Nolojia"
        unreadCount={unreadCount ?? 0}
      />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Applications" value={totalApplications ?? 0} icon={Users} tone="brand" subtitle="All time" />
          <StatsCard title="Active Job Listings" value={activeJobs ?? 0} icon={Briefcase} tone="success" subtitle="Open positions" />
          <StatsCard title="New Applicants" value={newApplicants ?? 0} icon={Clock} tone="warning" subtitle="Awaiting review" />
          <StatsCard title="Hired" value={hiredCount ?? 0} icon={UserCheck} tone="neutral" subtitle={`${conversionRate}% conversion rate`} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Recent Applicants</h2>
              <Link href="/admin/applicants" className="text-xs text-brand hover:text-brand-hover font-medium">View all →</Link>
            </div>
            <div className="divide-y divide-border">
              {recentApplications && recentApplications.length > 0 ? (
                recentApplications.map((app) => (
                  <Link
                    key={app.id}
                    href={`/admin/applicants/${app.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-2 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {app.full_name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{app.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{app.job_title}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <ApplicationStatusBadge status={app.status} />
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(app.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Users aria-hidden="true" className="w-10 h-10 text-muted-foreground/60 mb-2" />
                  <p className="text-sm text-muted-foreground">No applications yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Open Jobs */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Open Positions</h2>
                <Link href="/admin/jobs" className="text-xs text-brand hover:text-brand-hover font-medium">Manage →</Link>
              </div>
              <div className="divide-y divide-border">
                {openJobs && openJobs.length > 0 ? (
                  openJobs.map((job) => (
                    <Link
                      key={job.id}
                      href={`/admin/jobs/${job.slug}/edit`}
                      className="flex items-center justify-between px-5 py-3 hover:bg-surface-2 transition-colors"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.department}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-success" />
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <Briefcase aria-hidden="true" className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">No open positions</p>
                  </div>
                )}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Notifications</h2>
                <Link href="/admin/notifications" className="text-xs text-brand hover:text-brand-hover font-medium">All →</Link>
              </div>
              <div className="divide-y divide-border">
                {recentNotifications && recentNotifications.length > 0 ? (
                  recentNotifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 px-5 py-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${notif.read ? 'bg-border' : 'bg-brand'}`} />
                      <div>
                        <p className="text-xs font-medium text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <Bell aria-hidden="true" className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">No notifications</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline summary */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="font-semibold text-foreground">Hiring Pipeline</h2>
            <span className="text-xs text-muted-foreground">
              {pipelineTotal} application{pipelineTotal !== 1 ? 's' : ''}
            </span>
          </div>

          {pipelineTotal === 0 ? (
            <p className="text-sm text-muted-foreground">
              No applications yet. Stages will appear here as candidates come in.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {pipelineStages.map((stage) => (
                <Link
                  key={stage.status}
                  href={`/admin/applicants?status=${stage.status}`}
                  className="group bg-surface hover:bg-muted rounded-xl px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${stage.dot}`} />
                    <span className="text-sm text-foreground/85 font-medium">{stage.label}</span>
                    <span className="ml-auto text-sm font-semibold tabular-nums text-foreground">
                      {stage.count}
                    </span>
                  </div>

                  {/* Track is decorative; the count above already states the value. */}
                  <div className="mt-2.5 h-1.5 rounded-full bg-border overflow-hidden" aria-hidden="true">
                    <div
                      className={`h-full rounded-full ${stage.bar}`}
                      style={{ width: `${Math.round((stage.count / pipelinePeak) * 100)}%` }}
                    />
                  </div>

                  <span className="sr-only">
                    {stage.count} of {pipelineTotal} applications. View them.
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
