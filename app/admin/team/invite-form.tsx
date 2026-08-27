'use client'

import { useState } from 'react'
import { grantAdminAction } from '@/app/admin/actions'
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

    const result = await grantAdminAction(email, adminRole)
    if (result.ok) {
      setSuccess(true)
      setEmail('')
      router.refresh()
    } else {
      setError(result.error)
    }

    setLoading(false)
  }

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus aria-hidden="true" size={18} className="text-brand" />
        <h2 className="font-semibold text-foreground">Grant admin access</h2>
      </div>

      {/*
        Stated before the click, not only in the success message. Nothing here
        emails anyone: this writes a row saying what the person may do once they
        are in. Cloudflare Access decides whether they get in at all, and that
        is a separate change in the Zero Trust dashboard.
      */}
      <p className="mb-4 text-sm text-muted-foreground">
        This sets what someone may do in the console. It does not send an email,
        and it does not let them sign in — add them to the Cloudflare Access
        policy for that.
      </p>

      <div aria-live="polite">
        {success ? (
          <p className="mb-4 flex items-center gap-2 rounded-xl border border-success/25 bg-success-soft px-4 py-3 text-sm text-success">
            <Check aria-hidden="true" size={15} className="shrink-0" />
            Access granted. They also need adding to the Cloudflare Access policy before they can sign in.
          </p>
        ) : null}

        {error ? (
          <p
            role="alert"
            className="mb-4 rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </p>
        ) : null}
      </div>

      <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="invite-email" className="sr-only">
          Email address to grant access to
        </label>
        <input
          id="invite-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="colleague@example.com"
          className="flex-1 px-3.5 py-2.5 rounded-xl border border-border text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
        />
        <label htmlFor="invite-role" className="sr-only">
          Role to grant
        </label>
        <select
          id="invite-role"
          name="adminRole"
          value={adminRole}
          onChange={e => setAdminRole(e.target.value as AdminRole)}
          className="px-3.5 py-2.5 rounded-xl border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-card"
        >
          {adminRoles.map(r => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover disabled:opacity-60 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
        >
          {loading ? <Loader2 aria-hidden="true" size={15} className="animate-spin" /> : <UserPlus aria-hidden="true" size={15} />}
          Grant access
        </button>
      </form>
    </div>
  )
}
