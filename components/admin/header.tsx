import Link from 'next/link'
import { Bell } from 'lucide-react'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  unreadCount?: number
  /** Page-level actions rendered on the right of the header. */
  children?: React.ReactNode
}

/**
 * A server component: it holds no state. The search box that used to live here
 * was removed rather than restyled — it captured keystrokes and did nothing
 * with them, which is worse than not offering search at all.
 */
export function AdminHeader({ title, subtitle, unreadCount = 0, children }: AdminHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-6 py-4 pl-16 lg:pl-6">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold text-foreground">{title}</h1>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>

      <div className="ml-auto flex items-center gap-3">
        {children}
        <Link
          href="/admin/notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
        >
          <Bell aria-hidden="true" size={17} />
          <span className="sr-only">
            Notifications{unreadCount > 0 ? `, ${unreadCount} unread` : ''}
          </span>
          {unreadCount > 0 ? (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-brand px-1 text-[0.6875rem] font-semibold text-brand-foreground"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  )
}
