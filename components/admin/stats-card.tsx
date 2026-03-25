import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'violet'
}

const colorMap = {
  indigo: {
    icon: 'bg-indigo-100 text-indigo-600',
    badge: 'bg-indigo-50',
  },
  emerald: {
    icon: 'bg-emerald-100 text-emerald-600',
    badge: 'bg-emerald-50',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-600',
    badge: 'bg-amber-50',
  },
  rose: {
    icon: 'bg-rose-100 text-rose-600',
    badge: 'bg-rose-50',
  },
  violet: {
    icon: 'bg-violet-100 text-violet-600',
    badge: 'bg-violet-50',
  },
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  color = 'indigo',
}: StatsCardProps) {
  const colors = colorMap[color]
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colors.icon)}>
          <Icon size={20} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg',
            isPositive ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
          )}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {isPositive ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{title}</p>
        {(subtitle || trendLabel) && (
          <p className="text-xs text-gray-400 mt-1">{subtitle || trendLabel}</p>
        )}
      </div>
    </div>
  )
}
