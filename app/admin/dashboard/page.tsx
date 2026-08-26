import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { Users, Briefcase, UserCheck, Bell, Clock } from 'lucide-react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { count: totalApplications },
    { count: activeJobs },
    { count: newApplicants },
    { count: hiredCount },
    { data: recentApplications },
    { data: recentNotifications },
    { data: openJobs },
  ] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'hired'),
    supabase.from('applications')
      .select('id, full_name, email, job_title, job_slug, status, created_at')
      .order('created_at', { ascending: false })
      .limit(8),
    supabase.from('notifications')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('jobs')
      .select('id, slug, title, department, status')
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  const { count: unreadCount } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('read', false)

  const conversionRate = totalApplications && hiredCount
    ? ((hiredCount / totalApplications) * 100).toFixed(1)
    : '0'

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
          <h2 className="font-semibold text-foreground mb-4">Hiring Pipeline</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              { label: 'New', status: 'new', color: 'bg-brand' },
              { label: 'Reviewed', status: 'reviewed', color: 'bg-brand' },
              { label: 'Shortlisted', status: 'shortlisted', color: 'bg-warning' },
              { label: 'Hired', status: 'hired', color: 'bg-success' },
              { label: 'Rejected', status: 'rejected', color: 'bg-destructive' },
            ].map((stage) => (
              <Link
                key={stage.status}
                href={`/admin/applicants?status=${stage.status}`}
                className="flex items-center gap-2 bg-surface hover:bg-muted rounded-xl px-4 py-2.5 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <span className="text-sm text-foreground/85 font-medium">{stage.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
