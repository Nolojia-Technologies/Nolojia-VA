'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateApplicationStatusAction } from '@/app/admin/actions'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { Loader2, CheckCircle, Star, XCircle, UserCheck } from 'lucide-react'
import type { ApplicationStatus } from '@/types/database'

interface ApplicantActionsProps {
  applicationId: string
  currentStatus: ApplicationStatus
  adminRole: string | null
}

const statusActions: { status: ApplicationStatus; label: string; icon: React.ElementType; className: string }[] = [
  { status: 'reviewed', label: 'Mark Reviewed', icon: CheckCircle, className: 'bg-brand-soft text-brand hover:bg-brand-soft border-brand/25' },
  { status: 'shortlisted', label: 'Shortlist', icon: Star, className: 'bg-warning-soft text-warning hover:bg-warning-soft border-warning/25' },
  { status: 'hired', label: 'Mark Hired', icon: UserCheck, className: 'bg-success-soft text-success hover:bg-success-soft border-success/25' },
  { status: 'rejected', label: 'Reject', icon: XCircle, className: 'bg-destructive/10 text-destructive hover:bg-destructive/10 border-destructive/25' },
]

export function ApplicantActions({ applicationId, currentStatus }: ApplicantActionsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<ApplicationStatus | null>(null)
  const [error, setError] = useState('')

  const updateStatus = async (newStatus: ApplicationStatus) => {
    setLoading(newStatus)
    setError('')

    const result = await updateApplicationStatusAction(applicationId, newStatus)
    if (result.ok) {
      router.refresh()
    } else {
      setError(result.error)
    }
    setLoading(null)
  }

  const availableActions = statusActions.filter(a => a.status !== currentStatus)

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
      <h3 className="font-semibold text-foreground mb-3 text-sm">Update Status</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-muted-foreground">Current:</span>
        <ApplicationStatusBadge status={currentStatus} />
      </div>

      <div aria-live="polite">
        {error ? (
          <p role="alert" className="mb-3 text-xs text-destructive">
            {error}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        {availableActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              type="button"
              key={action.status}
              onClick={() => updateStatus(action.status)}
              disabled={loading !== null}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors disabled:opacity-60 ${action.className}`}
            >
              {loading === action.status ? (
                <Loader2 aria-hidden="true" size={14} className="animate-spin" />
              ) : (
                <Icon aria-hidden="true" size={14} />
              )}
              {action.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
