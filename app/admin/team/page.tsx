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
  super_admin: 'bg-indigo-50 text-indigo-700 ring-indigo-600/20',
  hr_manager: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  operations_manager: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  finance_manager: 'bg-cyan-50 text-cyan-700 ring-cyan-600/20',
  marketing_manager: 'bg-purple-50 text-purple-700 ring-purple-600/20',
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-indigo-600" />
            <h2 className="font-semibold text-gray-900">Access Levels</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(roleLabels).map(([role, label]) => (
              <div key={role} className="rounded-xl border border-gray-100 p-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${roleBadgeColors[role]}`}>
                    {label}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
            <Users size={18} className="text-gray-600" />
            <h2 className="font-semibold text-gray-900">Admin Members</h2>
            <span className="ml-auto text-xs text-gray-400">{adminUsers?.length ?? 0} members</span>
          </div>
          <div className="divide-y divide-gray-50">
            {adminUsers && adminUsers.length > 0 ? (
              adminUsers.map((member: any) => (
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
                <Users className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No admin members yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
