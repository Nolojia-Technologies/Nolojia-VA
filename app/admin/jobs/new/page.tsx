import { AdminHeader } from '@/components/admin/header'
import { requireAdminRole } from '@/lib/auth/access'
import { NewJobForm } from './new-job-form'

export const metadata = { title: 'Create job listing' }

/**
 * This page used to be a client component, which meant it could not call a
 * guard at all — every other page under /admin/jobs required
 * ['super_admin','hr_manager'] and this one required nothing. createJobAction
 * still refused the write, so nothing could be created that shouldn't be, but
 * a finance or marketing manager was shown the whole form and only found out
 * on submit. Splitting it puts the check where its siblings keep theirs.
 */
export default async function NewJobPage() {
  await requireAdminRole(['super_admin', 'hr_manager'])

  return (
    <div>
      <AdminHeader title="Create job listing" subtitle="Post a new open position" />
      <NewJobForm />
    </div>
  )
}
