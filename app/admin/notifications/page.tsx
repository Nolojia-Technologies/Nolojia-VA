import { createClient } from '@/lib/supabase/server'
import { AdminHeader } from '@/components/admin/header'
import { Bell, CheckCheck } from 'lucide-react'
import { NotificationsList } from './notifications-list'

export const metadata = { title: 'Notifications' }

export default async function NotificationsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(50)

  const { count: unreadCount } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user!.id)
    .eq('read', false)

  return (
    <div>
      <AdminHeader
        title="Notifications"
        subtitle={`${unreadCount ?? 0} unread notification${(unreadCount ?? 0) !== 1 ? 's' : ''}`}
        unreadCount={unreadCount ?? 0}
      />

      <div className="p-6 max-w-3xl">
        <NotificationsList
          notifications={notifications ?? []}
          userId={user!.id}
        />
      </div>
    </div>
  )
}
