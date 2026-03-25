import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { StatsCard } from '@/components/admin/stats-card'
import { TrendingUp, Users, UserCheck, Briefcase, BarChart2, PieChart } from 'lucide-react'

export const metadata = { title: 'Analytics' }

const statusColors: Record<string, string> = {
  new: 'bg-blue-500',
  reviewed: 'bg-purple-500',
  shortlisted: 'bg-amber-500',
  hired: 'bg-emerald-500',
  rejected: 'bg-rose-500',
}

const statusLabels: Record<string, string> = {
  new: 'New',
  reviewed: 'Reviewed',
  shortlisted: 'Shortlisted',
  hired: 'Hired',
  rejected: 'Rejected',
}

export default async function AnalyticsPage() {
  const supabase = createClient()

  const [
    { data: allApplications },
    { data: allJobs },
    { count: totalApps },
    { count: hiredCount },
    { count: openJobs },
  ] = await Promise.all([
    supabase.from('applications').select('status, job_slug, created_at'),
    supabase.from('jobs').select('id, slug, title, department, status'),
    supabase.from('applications').select('*', { count: 'exact', head: true }),
    supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'hired'),
    supabase.from('jobs').select('*', { count: 'exact', head: true }).eq('status', 'open'),
  ])

  // Applications per status
  const statusBreakdown: Record<string, number> = {}
  allApplications?.forEach((a: any) => {
    statusBreakdown[a.status] = (statusBreakdown[a.status] || 0) + 1
  })

  // Applications per job
  const jobBreakdown: Record<string, number> = {}
  allApplications?.forEach((a: any) => {
    jobBreakdown[a.job_slug] = (jobBreakdown[a.job_slug] || 0) + 1
  })

  // Applications per department (need to join with jobs)
  const slugToDept: Record<string, string> = {}
  allJobs?.forEach((j: any) => { slugToDept[j.slug] = j.department })
  const deptBreakdown: Record<string, number> = {}
  allApplications?.forEach((a: any) => {
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
  allApplications?.forEach((a: any) => {
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
    ?.map((j: any) => ({ ...j, count: jobBreakdown[j.slug] ?? 0 }))
    .sort((a: any, b: any) => b.count - a.count)
    .slice(0, 5)

  return (
    <div>
      <AdminHeader title="Analytics" subtitle="Hiring insights and pipeline performance" />

      <div className="p-6 space-y-6">
        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="Total Applications" value={totalApps ?? 0} icon={Users} color="indigo" />
          <StatsCard title="Hired" value={hiredCount ?? 0} icon={UserCheck} color="emerald" subtitle={`${conversionRate}% conversion`} />
          <StatsCard title="Open Positions" value={openJobs ?? 0} icon={Briefcase} color="amber" />
          <StatsCard title="Shortlist Rate" value={`${shortlistRate}%`} icon={TrendingUp} color="violet" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Monthly trend */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <BarChart2 size={18} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-900">Applications Over Time</h2>
            </div>
            <div className="flex items-end gap-3 h-36">
              {Object.entries(monthlyData).map(([month, count]) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs text-gray-500 font-medium">{count}</span>
                  <div
                    className="w-full bg-indigo-500 rounded-t-lg transition-all"
                    style={{ height: `${(count / maxMonthly) * 100}%`, minHeight: count > 0 ? '4px' : '0' }}
                  />
                  <span className="text-xs text-gray-400 whitespace-nowrap">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline funnel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-5">
              <PieChart size={18} className="text-indigo-600" />
              <h2 className="font-semibold text-gray-900">Hiring Pipeline</h2>
            </div>
            <div className="space-y-2.5">
              {Object.entries(statusBreakdown).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No data yet</p>
              ) : (
                Object.entries(statusBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([status, count]) => (
                    <div key={status} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusColors[status] ?? 'bg-gray-400'}`} />
                      <span className="text-xs text-gray-600 w-24 flex-shrink-0">{statusLabels[status] ?? status}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${statusColors[status] ?? 'bg-gray-400'}`}
                          style={{ width: `${(count / maxStatus) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-6 text-right">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* By department */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-5">Applications by Department</h2>
            <div className="space-y-3">
              {Object.entries(deptBreakdown).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">No data yet</p>
              ) : (
                Object.entries(deptBreakdown)
                  .sort(([, a], [, b]) => b - a)
                  .map(([dept, count]) => (
                    <div key={dept} className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 w-36 flex-shrink-0 truncate">{dept}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-indigo-500 transition-all"
                          style={{ width: `${(count / maxDept) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-6 text-right">{count}</span>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Top jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-5">Top Jobs by Applications</h2>
            <div className="space-y-3">
              {topJobs && topJobs.length > 0 ? (
                topJobs.map((job: any, i: number) => (
                  <div key={job.id} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{job.title}</p>
                      <p className="text-xs text-gray-400">{job.department}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-gray-900">{job.count}</span>
                      <span className="text-xs text-gray-400">apps</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-8">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
