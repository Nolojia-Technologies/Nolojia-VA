import { cn } from '@/lib/utils/cn'
import type { ApplicationStatus, JobStatus } from '@/types/database'

/**
 * Status colours come from the site's tokens, so the admin console reads as the
 * same product as the marketing site and picks up a dark theme for free.
 */
const BASE =
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset'

const TONE = {
  brand: 'bg-brand-soft text-brand ring-brand/20',
  neutral: 'bg-muted text-muted-foreground ring-border',
  warning: 'bg-warning-soft text-warning ring-warning/25',
  success: 'bg-success-soft text-success ring-success/25',
  destructive: 'bg-destructive/10 text-destructive ring-destructive/25',
} as const

const APPLICATION_STATUS: Record<ApplicationStatus, { label: string; tone: keyof typeof TONE }> = {
  new: { label: 'New', tone: 'brand' },
  reviewed: { label: 'Reviewed', tone: 'neutral' },
  shortlisted: { label: 'Shortlisted', tone: 'warning' },
  hired: { label: 'Hired', tone: 'success' },
  rejected: { label: 'Rejected', tone: 'destructive' },
}

const JOB_STATUS: Record<JobStatus, { label: string; tone: keyof typeof TONE }> = {
  open: { label: 'Open', tone: 'success' },
  closed: { label: 'Closed', tone: 'neutral' },
  draft: { label: 'Draft', tone: 'warning' },
}

export function ApplicationStatusBadge({ status }: { status: ApplicationStatus }) {
  const config = APPLICATION_STATUS[status] ?? APPLICATION_STATUS.new
  return <span className={cn(BASE, TONE[config.tone])}>{config.label}</span>
}

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const config = JOB_STATUS[status] ?? JOB_STATUS.open
  return <span className={cn(BASE, TONE[config.tone])}>{config.label}</span>
}
