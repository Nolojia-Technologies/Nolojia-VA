import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/header'
import { TeamMemberCard } from './team-member-card'
import { InviteForm } from './invite-form'
import { Shield, Users } from 'lucide-react'

export const metadata = { title: 'Team Management' }

const roleLabels: Record<string, string> = {
  super_admin: 'Super Admin',
  hr_manager: 'HR Manager',
  operations_manager: 'Operations Manager',
  finance_manager: 'Finance Manager',
  marketing_manager: 'Marketing Manager',
}

const roleBadgeColors: Record<string, string> = {
  super_admin: 'bg-brand-soft text-brand ring-brand/20',
  hr_manager: 'bg-success-soft text-success ring-success/25',
  operations_manager: 'bg-warning-soft text-warning ring-warning/25',
  finance_manager: 'bg-muted text-muted-foreground ring-border',
  marketing_manager: 'bg-brand-soft text-brand ring-brand/20',
}

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('admin_role')
    .eq('id', user!.id)
    .single()

  // Only super_admin can access team management
  if (profile?.admin_role !== 'super_admin') {
    redirect('/admin/dashboard')
  }

  const { data: adminUsers } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'admin')
    .order('created_at', { ascending: true })

  return (
    <div>
      <AdminHeader
        title="Team Management"
        subtitle="Manage admin team members and their access levels"
      />

      <div className="p-6 space-y-6 max-w-5xl">
        {/* Role overview */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield aria-hidden="true" size={18} className="text-brand" />
            <h2 className="font-semibold text-foreground">Access Levels</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(roleLabels).map(([role, label]) => (
              <div key={role} className="rounded-xl border border-border p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${roleBadgeColors[role]}`}>
                    {label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {role === 'super_admin' && 'Full access to all features and team management'}
                  {role === 'hr_manager' && 'Manage all applicants, jobs, and analytics'}
                  {role === 'operations_manager' && 'View operational & VA department candidates'}
                  {role === 'finance_manager' && 'View finance department candidates only'}
                  {role === 'marketing_manager' && 'View marketing & creative candidates'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Invite new admin */}
        <InviteForm />

        {/* Team members */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <Users aria-hidden="true" size={18} className="text-muted-foreground" />
            <h2 className="font-semibold text-foreground">Admin Members</h2>
            <span className="ml-auto text-xs text-muted-foreground">{adminUsers?.length ?? 0} members</span>
          </div>
          <div className="divide-y divide-border">
            {adminUsers && adminUsers.length > 0 ? (
              adminUsers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  currentUserId={user!.id}
                  roleLabels={roleLabels}
                  roleBadgeColors={roleBadgeColors}
                />
              ))
            ) : (
              <div className="py-12 text-center">
                <Users aria-hidden="true" className="w-8 h-8 text-muted-foreground/60 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No admin members yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
