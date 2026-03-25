'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Bell, CheckCheck, Dot, Info, AlertCircle, UserPlus, Briefcase } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils/cn'

interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
}

interface NotificationsListProps {
  notifications: Notification[]
  userId: string
}

const typeIcon: Record<string, React.ElementType> = {
  application: UserPlus,
  job: Briefcase,
  alert: AlertCircle,
  info: Info,
}

const typeColor: Record<string, string> = {
  application: 'text-indigo-500 bg-indigo-50',
  job: 'text-emerald-500 bg-emerald-50',
  alert: 'text-rose-500 bg-rose-50',
  info: 'text-blue-500 bg-blue-50',
}

export function NotificationsList({ notifications: initial, userId }: NotificationsListProps) {
  const router = useRouter()
  const supabase = createClient()
  const [notifications, setNotifications] = useState(initial)
  const [marking, setMarking] = useState(false)

  const markAllRead = async () => {
    setMarking(true)
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)

    setNotifications(notifications.map(n => ({ ...n, read: true })))
    setMarking(false)
    router.refresh()
  }

  const markRead = async (id: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)

    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-4">
      {/* Header actions */}
      {unreadCount > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">{unreadCount} unread</span>
          <button
            onClick={markAllRead}
            disabled={marking}
            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-700 font-medium transition-colors disabled:opacity-60"
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        </div>
      )}

      {/* Notifications */}
      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 text-center">
          <Bell className="w-10 h-10 text-gray-300 mb-2" />
          <p className="text-sm font-medium text-gray-600">All caught up!</p>
          <p className="text-xs text-gray-400 mt-1">No notifications yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
          {notifications.map((notif) => {
            const Icon = typeIcon[notif.type] ?? Info
            const colorClass = typeColor[notif.type] ?? typeColor.info
            return (
              <div
                key={notif.id}
                className={cn(
                  'flex items-start gap-4 px-5 py-4 transition-colors',
                  !notif.read ? 'bg-indigo-50/30' : 'hover:bg-gray-50/50'
                )}
                onClick={() => !notif.read && markRead(notif.id)}
              >
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', colorClass)}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={cn('text-sm font-medium', !notif.read ? 'text-gray-900' : 'text-gray-700')}>
                      {notif.title}
                    </p>
                    {!notif.read && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1.5">
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
