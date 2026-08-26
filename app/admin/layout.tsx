import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/sidebar'
import type { AdminRole } from '@/types/database'

export const metadata = {
  title: {
    template: '%s | Nolojia Admin',
    default: 'Admin Dashboard | Nolojia',
  },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/admin/dashboard')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email, role, admin_role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    redirect('/?access=denied')
  }

  // Count unread notifications
  const { count: unreadCount } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('read', false)

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <AdminSidebar
        adminRole={profile.admin_role as AdminRole | null}
        userName={profile.full_name || profile.email}
        userEmail={profile.email}
        unreadCount={unreadCount ?? 0}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
