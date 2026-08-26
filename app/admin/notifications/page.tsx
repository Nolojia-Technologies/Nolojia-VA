import { AdminHeader } from '@/components/admin/header'
import { requireAdmin } from '@/lib/auth/access'
import { countUnread, listNotifications } from '@/lib/db/notifications'
import { NotificationsList } from './notifications-list'

export const metadata = { title: 'Notifications' }

export default async function NotificationsPage() {
  const profile = await requireAdmin()

  const [notifications, unreadCount] = await Promise.all([
    listNotifications(profile.id, 50),
    countUnread(profile.id),
  ])

  return (
    <div>
      <AdminHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
        unreadCount={unreadCount}
      />

      <div className="max-w-3xl p-6">
        <NotificationsList notifications={notifications} />
      </div>
    </div>
  )
}
