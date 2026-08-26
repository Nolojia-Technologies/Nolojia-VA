'use client'

import { useState } from 'react'
import { markAllNotificationsReadAction, markNotificationReadAction } from '@/app/admin/actions'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, Info, AlertCircle, UserPlus, Briefcase } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils/cn'
import type { Notification } from '@/types/database'

interface NotificationsListProps {
  notifications: Notification[]
}

const typeIcon: Record<string, React.ElementType> = {
  application: UserPlus,
  job: Briefcase,
  alert: AlertCircle,
  info: Info,
}

const typeColor: Record<string, string> = {
  application: 'text-brand bg-brand-soft',
  job: 'text-success bg-success-soft',
  alert: 'text-destructive bg-destructive/10',
  info: 'text-brand bg-brand-soft',
}

/**
 * Marking read is a server action: D1 is not reachable from the browser, and
 * the action scopes the update to the signed-in user so an id from elsewhere
 * cannot clear someone else's notification.
 */
export function NotificationsList({ notifications: initial }: NotificationsListProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState(initial)
  const [marking, setMarking] = useState(false)

  const markAllRead = async () => {
    setMarking(true)
    // Optimistic: the list is already on screen and the action is idempotent.
    setNotifications((current) => current.map((n) => ({ ...n, read: true })))
    await markAllNotificationsReadAction()
    setMarking(false)
    router.refresh()
  }

  const markRead = async (id: string) => {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    await markNotificationReadAction(id)
    router.refresh()
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-4">
      {/* Header actions */}
      {unreadCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">{unreadCount} unread</span>
          <button
            type="button"
            onClick={markAllRead}
            disabled={marking}
            className="flex items-center gap-1.5 text-sm text-brand hover:text-brand-hover font-medium transition-colors disabled:opacity-60"
          >
            <CheckCheck aria-hidden="true" size={15} />
            Mark all read
          </button>
        </div>
      )}

      {/* Notifications */}
      {notifications.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center py-16 text-center">
          <Bell aria-hidden="true" className="w-10 h-10 text-muted-foreground/60 mb-2" />
          <p className="text-sm font-medium text-muted-foreground">All caught up!</p>
          <p className="text-xs text-muted-foreground mt-1">No notifications yet</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
          {notifications.map((notif) => {
            const Icon = typeIcon[notif.type] ?? Info
            const colorClass = typeColor[notif.type] ?? typeColor.info
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-4 px-5 py-4 transition-colors',
                  !notif.read ? 'bg-brand-soft/40' : 'hover:bg-surface-2'
                )}
                onClick={() => !notif.read && markRead(notif.id)}
              >
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', colorClass)}>
                  <Icon aria-hidden="true" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm font-medium', !notif.read ? 'text-foreground' : 'text-foreground/85')}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
