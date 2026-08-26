'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import {
  BarChart3,
  Bell,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Shield,
  Users,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { AdminRole } from '@/types/database'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  roles: AdminRole[] | 'all'
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, roles: 'all' },
  { label: 'Job listings', href: '/admin/jobs', icon: Briefcase, roles: ['super_admin', 'hr_manager'] },
  { label: 'Applicants', href: '/admin/applicants', icon: Users, roles: 'all' },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3, roles: ['super_admin', 'hr_manager'] },
  { label: 'Notifications', href: '/admin/notifications', icon: Bell, roles: 'all' },
  { label: 'Team', href: '/admin/team', icon: Shield, roles: ['super_admin'] },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    roles: ['super_admin', 'hr_manager', 'finance_manager'],
  },
]

const ROLE_LABEL: Record<AdminRole, string> = {
  super_admin: 'Super admin',
  hr_manager: 'HR manager',
  operations_manager: 'Operations manager',
  finance_manager: 'Finance manager',
  marketing_manager: 'Marketing manager',
}

interface SidebarProps {
  adminRole: AdminRole | null
  userName: string
  userEmail: string
  unreadCount?: number
}

/**
 * Declared at module scope, not inside AdminSidebar. Defining it inline would
 * make React treat it as a new component type on every render and remount the
 * whole subtree, dropping focus mid-interaction.
 */
function SidebarContent({
  items,
  pathname,
  collapsed,
  unreadCount,
  userName,
  adminRole,
  onNavigate,
}: {
  items: NavItem[]
  pathname: string
  collapsed: boolean
  unreadCount: number
  userName: string
  adminRole: AdminRole | null
  onNavigate?: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div
        className={cn(
          'flex items-center gap-3 border-b border-white/10 px-4 py-5',
          collapsed && 'justify-center px-2'
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-sm font-bold text-brand-foreground">
          N
        </span>
        {collapsed ? null : (
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-white">Nolojia</span>
            <span className="block text-xs text-white/50">Admin</span>
          </span>
        )}
      </div>

      <nav aria-label="Admin" className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const showBadge = item.label === 'Notifications' && unreadCount > 0
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
                isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
            >
              {isActive ? (
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-brand"
                />
              ) : null}
              <Icon aria-hidden="true" size={18} className="shrink-0" />
              {collapsed ? <span className="sr-only">{item.label}</span> : (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {showBadge ? (
                <span
                  className={cn(
                    'flex items-center justify-center rounded-full bg-brand text-[0.6875rem] font-semibold text-brand-foreground',
                    collapsed
                      ? 'absolute -right-0.5 -top-0.5 h-4 w-4'
                      : 'ml-auto h-5 min-w-[1.25rem] px-1'
                  )}
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                  <span className="sr-only"> unread notifications</span>
                </span>
              ) : null}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 border-t border-white/10 p-3">
        <div className={cn('flex items-center gap-3 px-2 py-2', collapsed && 'justify-center')}>
          <span
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white"
          >
            {userName.charAt(0).toUpperCase()}
          </span>
          {collapsed ? null : (
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-white">{userName}</span>
              <span className="block truncate text-xs text-white/45">
                {adminRole ? ROLE_LABEL[adminRole] : 'Admin'}
              </span>
            </span>
          )}
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut aria-hidden="true" size={16} className="shrink-0" />
            {collapsed ? <span className="sr-only">Sign out</span> : <span>Sign out</span>}
          </button>
        </form>
      </div>
    </div>
  )
}

export function AdminSidebar({ adminRole, userName, unreadCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const toggleRef = React.useRef<HTMLButtonElement>(null)

  const items = NAV_ITEMS.filter((item) => {
    if (item.roles === 'all') return true
    if (!adminRole) return false
    return item.roles.includes(adminRole)
  })

  // Escape closes the mobile drawer and hands focus back to its toggle.
  React.useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  const shared = {
    items,
    pathname,
    unreadCount,
    userName,
    adminRole,
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-controls="admin-mobile-nav"
        aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-white shadow-lg lg:hidden"
      >
        {mobileOpen ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
      </button>

      {/* Mobile drawer. Unmounted when closed so its links never sit in the tab
          order behind an off-screen transform. */}
      {mobileOpen ? (
        <>
          <div
            aria-hidden="true"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-ink/60 lg:hidden"
          />
          <aside
            id="admin-mobile-nav"
            className="fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-ink lg:hidden"
          >
            <SidebarContent
              {...shared}
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </>
      ) : null}

      <aside
        className={cn(
          'relative hidden min-h-screen flex-col border-r border-white/10 bg-ink transition-[width] duration-300 lg:flex',
          collapsed ? 'w-16' : 'w-60'
        )}
      >
        <SidebarContent {...shared} collapsed={collapsed} />

        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-pressed={collapsed}
          className="absolute -right-3 top-20 hidden h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-ink text-white shadow-md transition-colors hover:bg-brand lg:flex"
        >
          {collapsed ? (
            <ChevronRight aria-hidden="true" size={12} />
          ) : (
            <ChevronLeft aria-hidden="true" size={12} />
          )}
        </button>
      </aside>
    </>
  )
}
