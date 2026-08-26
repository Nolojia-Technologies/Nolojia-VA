import { LucideIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export type StatsTone = 'brand' | 'success' | 'warning' | 'destructive' | 'neutral'

const TONES: Record<StatsTone, string> = {
  brand: 'bg-brand-soft text-brand',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  destructive: 'bg-destructive/10 text-destructive',
  neutral: 'bg-muted text-muted-foreground',
}

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  /** Percentage change. Only pass a figure that was actually measured. */
  trend?: number
  trendLabel?: string
  tone?: StatsTone
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  tone = 'brand',
}: StatsCardProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', TONES[tone])}>
          <Icon aria-hidden="true" size={20} />
        </span>
        {trend !== undefined ? (
          <span
            className={cn(
              'flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium',
              isPositive ? 'bg-success-soft text-success' : 'bg-destructive/10 text-destructive'
            )}
          >
            {isPositive ? (
              <TrendingUp aria-hidden="true" size={12} />
            ) : (
              <TrendingDown aria-hidden="true" size={12} />
            )}
            {isPositive ? '+' : ''}
            {trend}%
          </span>
        ) : null}
      </div>
      <p className="text-2xl font-semibold tabular-nums text-foreground">{value}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{title}</p>
      {subtitle || trendLabel ? (
        <p className="mt-1 text-xs text-muted-foreground">{subtitle || trendLabel}</p>
      ) : null}
    </div>
  )
}
