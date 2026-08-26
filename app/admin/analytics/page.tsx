import { requireAdminRole } from '@/lib/auth/access'
import { countApplications, listApplications } from '@/lib/db/applications'
import { countJobs, listJobsForAdmin } from '@/lib/db/jobs'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { TrendingUp, Users, UserCheck, Briefcase, BarChart2, PieChart } from 'lucide-react'

export const metadata = { title: 'Analytics' }

const statusColors: Record<string, string> = {
  new: 'bg-brand',
  reviewed: 'bg-brand',
  shortlisted: 'bg-warning',
  hired: 'bg-success',
  rejected: 'bg-destructive',
}

const statusLabels: Record<string, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  hired: 'Hired',
  rejected: 'Rejected',
}

export default async function AnalyticsPage() {
  await requireAdminRole(['super_admin', 'hr_manager'])

  const [allApplications, allJobs, totalApps, hiredCount, openJobs] = await Promise.all([
    listApplications(),
    listJobsForAdmin(),
    countApplications(),
    countApplications('hired'),
    countJobs('open'),
  ])

  // Applications per status
  const statusBreakdown: Record<string, number> = {}
  allApplications.forEach((a) => {
    statusBreakdown[a.status] = (statusBreakdown[a.status] || 0) + 1
  })

  // Applications per job
  const jobBreakdown: Record<string, number> = {}
  allApplications.forEach((a) => {
    jobBreakdown[a.job_slug] = (jobBreakdown[a.job_slug] || 0) + 1
  })

  // Applications per department (need to join with jobs)
  const slugToDept: Record<string, string> = {}
  allJobs.forEach((j) => { slugToDept[j.slug] = j.department })
  const deptBreakdown: Record<string, number> = {}
  allApplications.forEach((a) => {
    const dept = slugToDept[a.job_slug] ?? 'General'
    deptBreakdown[dept] = (deptBreakdown[dept] || 0) + 1
  })

  // Monthly data (last 6 months)
  const monthlyData: Record<string, number> = {}
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' })
    monthlyData[key] = 0
  }
  allApplications.forEach((a) => {
    const d = new Date(a.created_at)
    const key = d.toLocaleString('default', { month: 'short', year: '2-digit' })
    if (Object.prototype.hasOwnProperty.call(monthlyData, key)) {
      monthlyData[key]++
    }
  })

  const shortlistedCount = statusBreakdown['shortlisted'] ?? 0
  const shortlistRate = totalApps && shortlistedCount ? ((shortlistedCount / totalApps) * 100).toFixed(1) : '0'
  const conversionRate = totalApps && hiredCount ? ((hiredCount / totalApps) * 100).toFixed(1) : '0'

  const maxMonthly = Math.max(...Object.values(monthlyData), 1)
  const maxDept = Math.max(...Object.values(deptBreakdown), 1)
  const maxStatus = Math.max(...Object.values(statusBreakdown), 1)

  const topJobs = allJobs
    .map((j) => ({ ...j, count: jobBreakdown[j.slug] ?? 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div>
      <AdminHeader title="Analytics" subtitle="Hiring insights and pipeline performance" />

      <div className="p-6 space-y-6">
        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Applications" value={totalApps ?? 0} icon={Users} tone="brand" />
          <StatsCard title="Hired" value={hiredCount ?? 0} icon={UserCheck} tone="success" subtitle={`${conversionRate}% conversion`} />
          <StatsCard title="Open Positions" value={openJobs ?? 0} icon={Briefcase} tone="warning" />
          <StatsCard title="Shortlist Rate" value={`${shortlistRate}%`} icon={TrendingUp} tone="neutral" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly trend */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 aria-hidden="true" size={18} className="text-brand" />
              <h2 className="font-semibold text-foreground">Applications Over Time</h2>
            </div>
            <div className="flex items-end gap-3 h-36">
              {Object.entries(monthlyData).map(([month, count]) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-muted-foreground font-medium">{count}</span>
                  <div
                    className="w-full bg-brand rounded-t-lg transition-all"
                    style={{ height: `${(count / maxMonthly) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                  />
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline funnel */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <PieChart aria-hidden="true" size={18} className="text-brand" />
              <h2 className="font-semibold text-foreground">Hiring Pipeline</h2>
            </div>
            <div className="space-y-2.5">
              {Object.entries(statusBreakdown).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
              ) : (
                Object.entries(statusBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[status] ?? 'bg-muted-foreground'}`} />
                      <span className="text-xs text-muted-foreground w-24 flex-shrink-0">{statusLabels[status] ?? status}</span>
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${statusColors[status] ?? 'bg-muted-foreground'}`}
                          style={{ width: `${(count / maxStatus) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground/85 w-6 text-right">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* By department */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h2 className="font-semibold text-foreground mb-5">Applications by Department</h2>
            <div className="space-y-3">
              {Object.entries(deptBreakdown).length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
              ) : (
                Object.entries(deptBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([dept, count]) => (
                    <div key={dept} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-36 flex-shrink-0 truncate">{dept}</span>
                      <div className="flex-1 bg-muted rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-brand transition-all"
                          style={{ width: `${(count / maxDept) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground/85 w-6 text-right">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Top jobs */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
            <h2 className="font-semibold text-foreground mb-5">Top Jobs by Applications</h2>
            <div className="space-y-3">
              {topJobs && topJobs.length > 0 ? (
                topJobs.map((job, i) => (
                  <div key={job.id} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-soft text-brand text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.department}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">{job.count}</span>
                      <span className="text-xs text-muted-foreground">apps</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
