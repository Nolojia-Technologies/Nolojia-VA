import Link from 'next/link'
import { FileText, TrendingUp, Calendar } from 'lucide-react'
import { format, subMonths, startOfMonth, endOfMonth } from 'date-fns'

import { AdminHeader } from '@/components/admin/header'
import { requireAdminRole } from '@/lib/auth/access'
import {
  countApplications,
  countApplicationsBetween,
  listRecentHires,
} from '@/lib/db/applications'
import { countJobs } from '@/lib/db/jobs'

export const metadata = { title: 'Reports' }

export default async function ReportsPage() {
  await requireAdminRole(['super_admin', 'hr_manager', 'finance_manager'])

  const now = new Date()
  const thisMonthStart = startOfMonth(now).toISOString()
  const thisMonthEnd = endOfMonth(now).toISOString()
  const lastMonthStart = startOfMonth(subMonths(now, 1)).toISOString()
  const lastMonthEnd = endOfMonth(subMonths(now, 1)).toISOString()

  const [thisMonthApps, lastMonthApps, thisMonthHired, totalJobs, recentHires] =
    await Promise.all([
      countApplicationsBetween(thisMonthStart, thisMonthEnd),
      countApplicationsBetween(lastMonthStart, lastMonthEnd),
      countApplications('hired'),
      countJobs(),
      listRecentHires(10),
    ])

  const growthPct = lastMonthApps
    ? (((thisMonthApps ?? 0) - (lastMonthApps ?? 0)) / lastMonthApps * 100).toFixed(0)
    : null

  const reportCards = [
    {
      title: 'This Month\'s Applications',
      description: `${format(now, 'MMMM yyyy')} — ${thisMonthApps ?? 0} applications received`,
      icon: FileText,
      color: 'text-brand bg-brand-soft',
      href: '/admin/applicants',
    },
    {
      title: 'Hired Candidates',
      description: `${thisMonthHired ?? 0} total hires`,
      icon: TrendingUp,
      color: 'text-success bg-success-soft',
      href: '/admin/applicants?status=hired',
    },
    {
      title: 'Pipeline Analytics',
      description: `Across ${totalJobs ?? 0} job listings`,
      icon: Calendar,
      color: 'text-warning bg-warning-soft',
      href: '/admin/analytics',
    },
  ]

  return (
    <div>
      <AdminHeader title="Reports" subtitle="Hiring summaries and key metrics" />

      <div className="p-6 space-y-6 max-w-4xl">
        {/* Summary */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{thisMonthApps ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Applications this month</p>
            {growthPct !== null && (
              <p className={`text-xs mt-1 font-medium ${Number(growthPct) >= 0 ? 'text-success' : 'text-destructive'}`}>
                {Number(growthPct) >= 0 ? '+' : ''}{growthPct}% vs last month
              </p>
            )}
          </div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{thisMonthHired ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Total hires</p>
          </div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 text-center">
            <p className="text-3xl font-bold text-foreground">{lastMonthApps ?? 0}</p>
            <p className="text-sm text-muted-foreground mt-1">Last month applications</p>
          </div>
        </div>

        <h2 className="sr-only">Reports</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {reportCards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.title}
                href={card.href}
                className="bg-card rounded-2xl border border-border shadow-sm p-5 hover:shadow-md transition-shadow group"
              >
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                  <Icon aria-hidden="true" size={20} />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{card.title}</h3>
                <p className="text-xs text-muted-foreground">{card.description}</p>
                <p className="text-xs text-brand mt-2 group-hover:underline">View →</p>
              </Link>
            )
          })}
        </div>

        {/* Recent hires */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Hires</h2>
          </div>
          <div className="divide-y divide-border">
            {recentHires && recentHires.length > 0 ? (
              recentHires.map((hire) => (
                <div key={hire.email + hire.created_at} className="flex items-center gap-4 px-5 py-3.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-success to-success flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {hire.full_name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{hire.full_name}</p>
                    <p className="text-xs text-muted-foreground">{hire.job_title}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{format(new Date(hire.created_at), 'MMM d, yyyy')}</span>
                </div>
              ))
            ) : (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">No hires yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
