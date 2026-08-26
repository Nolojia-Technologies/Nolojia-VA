'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ApplicationStatusBadge } from '@/components/admin/status-badge'
import { Loader2, CheckCircle, Star, XCircle, UserCheck } from 'lucide-react'
import type { ApplicationStatus } from '@/types/database'

interface ApplicantActionsProps {
  applicationId: string
  currentStatus: ApplicationStatus
  adminRole: string | null
}

const statusActions: { status: ApplicationStatus; label: string; icon: React.ElementType; className: string }[] = [
  { status: 'reviewed', label: 'Mark Reviewed', icon: CheckCircle, className: 'bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200' },
  { status: 'shortlisted', label: 'Shortlist', icon: Star, className: 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-amber-200' },
  { status: 'hired', label: 'Mark Hired', icon: UserCheck, className: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200' },
  { status: 'rejected', label: 'Reject', icon: XCircle, className: 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200' },
]

export function ApplicantActions({ applicationId, currentStatus }: ApplicantActionsProps) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState<ApplicationStatus | null>(null)
  const [error, setError] = useState('')

  const updateStatus = async (newStatus: ApplicationStatus) => {
    setLoading(newStatus)
    setError('')

    const { error: updateError } = await supabase
      .from('applications')
      .update({ status: newStatus })
      .eq('id', applicationId)

    if (updateError) {
      setError(updateError.message)
    } else {
      router.refresh()
    }
    setLoading(null)
  }

  const availableActions = statusActions.filter(a => a.status !== currentStatus)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="font-semibold text-gray-900 mb-3 text-sm">Update Status</h3>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500">Current:</span>
        <ApplicationStatusBadge status={currentStatus} />
      </div>

      {error && <p className="text-xs text-rose-600 mb-3">{error}</p>}

      <div className="space-y-2">
        {availableActions.map((action) => {
          const Icon = action.icon
          return (
            <button
              key={action.status}
              onClick={() => updateStatus(action.status)}
              disabled={loading !== null}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors disabled:opacity-60 ${action.className}`}
            >
              {loading === action.status ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Icon size={14} />
              )}
              {action.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
