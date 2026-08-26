import { AdminSidebar } from '@/components/admin/sidebar'
import { requireAdmin } from '@/lib/auth/access'
import { countUnread } from '@/lib/db/notifications'

export const metadata = {
  title: {
    template: '%s | Nolojia Admin',
    default: 'Admin Dashboard | Nolojia',
  },
  robots: { index: false, follow: false },
}

/**
 * Authorization runs here *and* in every page underneath.
 *
 * A layout is not a security boundary in the App Router — it does not run for
 * route handlers, and a page can be requested in ways that do not re-render its
 * layout. With Postgres RLS gone there is no backstop, so each page calls
 * requireAdmin() for itself. This check is the convenience, not the guarantee.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await requireAdmin()
  const unreadCount = await countUnread(profile.id)

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar
        adminRole={profile.admin_role}
        userName={profile.full_name || profile.email}
        userEmail={profile.email}
        unreadCount={unreadCount}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <main id="admin-main" className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
