'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  Bell,  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileText,
  Menu,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { AdminRole } from '@/types/database'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  roles: AdminRole[] | 'all'
  badge?: number
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    roles: 'all',
  },
  {
    label: 'Job Listings',
    href: '/admin/jobs',
    icon: Briefcase,
    roles: ['super_admin', 'hr_manager'],
  },
  {
    label: 'Applicants',
    href: '/admin/applicants',
    icon: Users,
    roles: 'all',
  },
  {
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    roles: ['super_admin', 'hr_manager'],
  },
  {
    label: 'Notifications',
    href: '/admin/notifications',
    icon: Bell,
    roles: 'all',
  },
  {
    label: 'Team',
    href: '/admin/team',
    icon: Shield,
    roles: ['super_admin'],
  },
  {
    label: 'Reports',
    href: '/admin/reports',
    icon: FileText,
    roles: ['super_admin', 'hr_manager', 'finance_manager'] as AdminRole[],
  },
]

interface SidebarProps {
  adminRole: AdminRole | null
  userName: string
  userEmail: string
  unreadCount?: number
}

export function AdminSidebar({ adminRole, userName, unreadCount = 0 }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const visibleItems = NAV_ITEMS.filter(item => {
    if (item.roles === 'all') return true
    if (!adminRole) return false
    return item.roles.includes(adminRole)
  })

  const roleLabel: Record<AdminRole, string> = {
    super_admin: 'Super Admin',
    hr_manager: 'HR Manager',
    operations_manager: 'Operations Manager',
    finance_manager: 'Finance Manager',
    marketing_manager: 'Marketing Manager',
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-white/10',
        collapsed && 'justify-center px-2'
      )}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm">Nolojia</p>
            <p className="text-indigo-300 text-xs">Admin Panel</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {visibleItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                isActive
                  ? 'bg-indigo-500/20 text-white'
                  : 'text-indigo-200 hover:bg-white/5 hover:text-white',
                collapsed && 'justify-center px-2'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-indigo-400 rounded-r-full" />
              )}
              <Icon className={cn(
                'w-4.5 h-4.5 flex-shrink-0 transition-colors',
                isActive ? 'text-indigo-300' : 'text-indigo-400 group-hover:text-indigo-300'
              )} size={18} />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {!collapsed && item.label === 'Notifications' && unreadCount > 0 && (
                <span className="ml-auto bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
              {collapsed && item.label === 'Notifications' && unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User profile */}
      <div className={cn(
        'border-t border-white/10 p-3 space-y-2',
      )}>
        <div className={cn(
          'flex items-center gap-3 px-2 py-2',
          collapsed && 'justify-center'
        )}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-white text-xs font-medium truncate">{userName}</p>
              <p className="text-indigo-400 text-xs truncate">{adminRole ? roleLabel[adminRole] : 'Admin'}</p>
            </div>
          )}
        </div>

        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className={cn(
              'flex items-center gap-3 w-full px-3 py-2 rounded-xl text-indigo-300 hover:text-white hover:bg-white/5 transition-all text-sm',
              collapsed && 'justify-center px-2'
            )}
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign out</span>}
          </button>
        </form>
      </div>

      {/* Collapse toggle (desktop) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#2D2B7F] border border-white/20 rounded-full items-center justify-center text-white hover:bg-indigo-600 transition-colors shadow-lg"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#2D2B7F] rounded-lg flex items-center justify-center text-white shadow-lg"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside className={cn(
        'lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-[#0F0E2E] border-r border-white/10 transform transition-transform duration-300',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col relative transition-all duration-300 bg-[#0F0E2E] border-r border-white/10 min-h-screen',
        collapsed ? 'w-16' : 'w-60'
      )}>
        <SidebarContent />
      </aside>
    </>
  )
}
