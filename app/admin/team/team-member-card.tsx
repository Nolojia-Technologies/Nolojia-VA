'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Loader2, MoreVertical, ChevronDown } from 'lucide-react'
import { format } from 'date-fns'
import type { AdminRole } from '@/types/database'
import { cn } from '@/lib/utils/cn'

interface TeamMemberCardProps {
  member: any
  currentUserId: string
  roleLabels: Record<string, string>
  roleBadgeColors: Record<string, string>
}

const adminRoles: AdminRole[] = ['super_admin', 'hr_manager', 'operations_manager', 'finance_manager', 'marketing_manager']

export function TeamMemberCard({ member, currentUserId, roleLabels, roleBadgeColors }: TeamMemberCardProps) {
  const router = useRouter()
  const supabase = createClient()
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const isCurrentUser = member.id === currentUserId

  const updateRole = async (newRole: AdminRole) => {
    setUpdating(true)
    setOpen(false)
    await supabase
      .from('profiles')
      .update({ admin_role: newRole })
      .eq('id', member.id)
    router.refresh()
    setUpdating(false)
  }

  const currentRole = member.admin_role as AdminRole | null

  return (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
        {(member.full_name || member.email).charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-900 truncate">
            {member.full_name || member.email}
          </p>
          {isCurrentUser && (
            <span className="text-xs text-gray-400">(you)</span>
          )}
        </div>
        <p className="text-xs text-gray-400 truncate">{member.email}</p>
      </div>

      {/* Role badge + editor */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-xs text-gray-400">
          Joined {format(new Date(member.created_at), 'MMM d, yyyy')}
        </span>

        {/* Role selector */}
        <div className="relative">
          <button
            onClick={() => !isCurrentUser && setOpen(!open)}
            disabled={isCurrentUser || updating}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset transition-colors',
              currentRole ? roleBadgeColors[currentRole] : 'bg-gray-50 text-gray-500 ring-gray-200',
              !isCurrentUser && 'hover:opacity-80 cursor-pointer',
              isCurrentUser && 'cursor-default'
            )}
          >
            {updating ? (
              <Loader2 size={10} className="animate-spin" />
            ) : null}
            {currentRole ? roleLabels[currentRole] : 'No role'}
            {!isCurrentUser && <ChevronDown size={11} />}
          </button>

          {open && !isCurrentUser && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-8 z-20 bg-white rounded-xl border border-gray-200 shadow-lg py-1 min-w-44">
                {adminRoles.map(role => (
                  <button
                    key={role}
                    onClick={() => updateRole(role)}
                    className={cn(
                      'w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors',
                      currentRole === role ? 'font-semibold text-indigo-600' : 'text-gray-700'
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
