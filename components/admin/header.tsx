'use client'

import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface AdminHeaderProps {
  title: string
  subtitle?: string
  unreadCount?: number
}

export function AdminHeader({ title, subtitle, unreadCount = 0 }: AdminHeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 w-64">
          <Search size={15} className="text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none w-full"
          />
        </div>

        {/* Notifications */}
        <Link
          href="/admin/notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Bell size={17} className="text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  )
}
