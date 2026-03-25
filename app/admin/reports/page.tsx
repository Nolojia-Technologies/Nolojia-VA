import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { FileText, TrendingUp, Calendar } from 'lucide-react'
import Link from 'next/link'
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns'

export const metadata = { title: 'Reports' }

export default async function ReportsPage() {
  const supabase = createClient()

  const now = new Date()
  const thisMonthStart = startOfMonth(now).toISOString()
  const thisMonthEnd = endOfMonth(now).toISOString()
  const lastMonthStart = startOfMonth(subMonths(now, 1)).toISOString()
  const lastMonthEnd = endOfMonth(subMonths(now, 1)).toISOString()

  const [
    { count: thisMonthApps },
    { count: lastMonthApps },
    { count: thisMonthHired },
    { count: totalJobs },
    { data: recentHires },
  ] = await Promise.all([
    supabase.from('applications').select('*', { count: 'exact', head: true })
      .gte('created_at', thisMonthStart).lte('created_at', thisMonthEnd),
    supabase.from('applications').select('*', { count: 'exact', head: true })
      .gte('created_at', lastMonthStart).lte('created_at', lastMonthEnd),
    supabase.from('applications').select('*', { count: 'exact', head: true })
      .eq('status', 'hired'),
    supabase.from('jobs').select('*', { count: 'exact', head: true }),
    supabase.from('applications')
      .select('full_name, email, job_title, job_slug, created_at')
      .eq('status', 'hired')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  const growthPct = lastMonthApps
    ? (((thisMonthApps ?? 0) - (lastMonthApps ?? 0)) / lastMonthApps * 100).toFixed(0)
    : null

  const reportCards = [
    {
      title: 'This Month\'s Applications',
      description: `${format(now, 'MMMM yyyy')} — ${thisMonthApps ?? 0} applications received`,
      icon: FileText,
      color: 'text-indigo-600 bg-indigo-50',
      href: '/admin/applicants',
    },
    {
      title: 'Hired Candidates',
      description: `${thisMonthHired ?? 0} total hires`,
      icon: TrendingUp,
      color: 'text-emerald-600 bg-emerald-50',
      href: '/admin/applicants?status=hired',
    },
    {
      title: 'Pipeline Analytics',
      description: `Across ${totalJobs ?? 0} job listings`,
      icon: Calendar,
      color: 'text-amber-600 bg-amber-50',
      href: '/admin/analytics',
    },
  ]

  return (
    <div>
      <AdminHeader title="Reports" subtitle="Hiring summaries and key metrics" />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{thisMonthApps ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Applications this month</p>
            {growthPct !== null && (
              <p className={`text-xs mt-1 font-medium ${Number(growthPct) >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {Number(growthPct) >= 0 ? '+' : ''}{growthPct}% vs last month
              </p>
            )}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{thisMonthHired ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Total hires</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-gray-900">{lastMonthApps ?? 0}</p>
            <p className="text-sm text-gray-500 mt-1">Last month applications</p>
          </div>
        </div>

        {/* Report links */}
        <div className="grid sm:grid-cols-3 gap-4">
          {reportCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-gray-500">{card.description}</p>
                <p className="text-xs text-indigo-600 mt-2 group-hover:underline">View →</p>
              </Link>
            )
          })}
        </div>

        {/* Recent hires */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Hires</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentHires && recentHires.length > 0 ? (
              recentHires.map((hire: any) => (
                <div key={hire.email + hire.created_at} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {hire.full_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{hire.full_name}</p>
                    <p className="text-xs text-gray-400">{hire.job_title}</p>
                  </div>
                  <span className="text-xs text-gray-400">{format(new Date(hire.created_at), 'MMM d, yyyy')}</span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-gray-400">No hires yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
