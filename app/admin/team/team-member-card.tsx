'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { setAdminRoleAction } from '@/app/admin/actions'
import { Loader2, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'
import type { AdminRole, ProfileRow } from '@/types/database'
import { cn } from '@/lib/utils/cn'

interface TeamMemberCardProps {
  member: ProfileRow
  currentUserId: string
  roleLabels: Record<string, string>
  roleBadgeColors: Record<string, string>
}

const adminRoles: AdminRole[] = ['super_admin', 'hr_manager', 'operations_manager', 'finance_manager', 'marketing_manager']

export function TeamMemberCard({ member, currentUserId, roleLabels, roleBadgeColors }: TeamMemberCardProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState('')
  const isCurrentUser = member.id === currentUserId

  const updateRole = async (newRole: AdminRole) => {
    setUpdating(true)
    setOpen(false)
    setError('')

    const result = await setAdminRoleAction(member.id, newRole)
    if (!result.ok) setError(result.error)

    router.refresh()
    setUpdating(false)
  }

  const currentRole = member.admin_role as AdminRole | null

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-surface-2 transition-colors">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-strong flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {(member.full_name || member.email).charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground truncate">
            {member.full_name || member.email}
          </p>
          {isCurrentUser && (
            <span className="text-xs text-muted-foreground">(you)</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground truncate">{member.email}</p>
      </div>

      {/* Role badge + editor */}
      <div className="flex items-center gap-3">
        <span aria-live="polite">
          {error ? (
            <span role="alert" className="text-xs text-destructive">
              {error}
            </span>
          ) : null}
        </span>
        <span className="hidden sm:block text-xs text-muted-foreground">
          Joined {format(new Date(member.created_at), 'MMM d, yyyy')}
        </span>

        {/* Role selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => !isCurrentUser && setOpen(!open)}
            disabled={isCurrentUser || updating}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-label={`Change role for ${member.full_name || member.email}`}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
              currentRole ? roleBadgeColors[currentRole] : 'bg-surface text-muted-foreground ring-border',
              !isCurrentUser && 'hover:opacity-80 cursor-pointer',
              isCurrentUser && 'cursor-default'
            )}
          >
            {updating ? (
              <Loader2 aria-hidden="true" size={10} className="animate-spin" />
            ) : null}
            {currentRole ? roleLabels[currentRole] : 'No role'}
            {!isCurrentUser && <ChevronDown aria-hidden="true" size={11} />}
          </button>

          {open && !isCurrentUser && (
            <>
              <div
                aria-hidden="true"
                className="fixed inset-0 z-10"
                onClick={() => setOpen(false)}
              />
              <div
                role="menu"
                className="absolute right-0 top-8 z-20 min-w-44 rounded-xl border border-border bg-card py-1 shadow-lg"
              >
                {adminRoles.map(role => (
                  <button
                    key={role}
                    type="button"
                    role="menuitemradio"
                    aria-checked={currentRole === role}
                    onClick={() => updateRole(role)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-xs hover:bg-surface-2 transition-colors',
                      currentRole === role ? 'font-semibold text-brand' : 'text-foreground/85'
                    )}
                  >
                    {roleLabels[role]}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
