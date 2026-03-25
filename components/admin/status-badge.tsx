import { cn } from '@/lib/utils/cn'
import type { ApplicationStatus, JobStatus } from '@/types/database'

const applicationStatusConfig: Record<ApplicationStatus, { label: string; className: string }> = {
  new: { label: 'New', className: 'bg-blue-50 text-blue-700 ring-blue-600/20' },
  reviewed: { label: 'Reviewed', className: 'bg-purple-50 text-purple-700 ring-purple-600/20' },
  shortlisted: { label: 'Shortlisted', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
  hired: { label: 'Hired', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  rejected: { label: 'Rejected', className: 'bg-rose-50 text-rose-700 ring-rose-600/20' },
}

const jobStatusConfig: Record<JobStatus, { label: string; className: string }> = {
  open: { label: 'Open', className: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20' },
  closed: { label: 'Closed', className: 'bg-gray-50 text-gray-700 ring-gray-600/20' },
  draft: { label: 'Draft', className: 'bg-amber-50 text-amber-700 ring-amber-600/20' },
}

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus
}

interface JobStatusBadgeProps {
  status: JobStatus
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const config = applicationStatusConfig[status] ?? applicationStatusConfig.new
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
      config.className
    )}>
      {config.label}
    </span>
  )
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  const config = jobStatusConfig[status] ?? jobStatusConfig.open
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
      config.className
    )}>
      {config.label}
    </span>
  )
}
