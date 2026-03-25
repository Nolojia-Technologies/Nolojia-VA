'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { UserPlus, Loader2, Check } from 'lucide-react'
import type { AdminRole } from '@/types/database'

const adminRoles: { value: AdminRole; label: string }[] = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'hr_manager', label: 'HR Manager' },
  { value: 'operations_manager', label: 'Operations Manager' },
  { value: 'finance_manager', label: 'Finance Manager' },
  { value: 'marketing_manager', label: 'Marketing Manager' },
]

export function InviteForm() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [adminRole, setAdminRole] = useState<AdminRole>('hr_manager')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')
    setSuccess(false)

    // Invite via Supabase Auth
    const { error: inviteError } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { role: 'admin', admin_role: adminRole },
    })

    if (inviteError) {
      // Fallback: Check if user exists and update their role
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email.trim())
        .single()

      if (existingProfile) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'admin', admin_role: adminRole })
          .eq('id', existingProfile.id)

        if (updateError) {
          setError(updateError.message)
        } else {
          setSuccess(true)
          setEmail('')
          router.refresh()
        }
      } else {
        setError(inviteError.message)
      }
    } else {
      setSuccess(true)
      setEmail('')
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus size={18} className="text-indigo-600" />
        <h2 className="font-semibold text-gray-900">Invite Admin Member</h2>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 mb-4">
          <Check size={15} />
          Invitation sent! The user will receive an email to set up their account.
        </div>
      )}

      {error && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="colleague@example.com"
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <select
          value={adminRole}
          onChange={e => setAdminRole(e.target.value as AdminRole)}
          className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
        >
          {adminRoles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
        >
          {loading ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
          Send Invite
        </button>
      </form>
    </div>
  )
}
