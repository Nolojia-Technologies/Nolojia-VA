import { notFound } from 'next/navigation'

import { AdminHeader } from '@/components/admin/header'
import { requireAdminRole } from '@/lib/auth/access'
import { countFilteredApplications } from '@/lib/db/applications'
import { getJobBySlugForAdmin } from '@/lib/db/jobs'
import { JobEditForm } from './job-edit-form'

export async function generateMetadata({ params }: { params: { id: string } }) {
  await requireAdminRole(['super_admin', 'hr_manager'])
  const job = await getJobBySlugForAdmin(params.id)
  return { title: job?.title ? `Edit: ${job.title}` : 'Edit Job' }
}

export default async function EditJobPage({ params }: { params: { id: string } }) {
  await requireAdminRole(['super_admin', 'hr_manager'])

  // The `id` route param is actually the slug.
  const job = await getJobBySlugForAdmin(params.id)
  if (!job) notFound()

  const applicationCount = await countFilteredApplications({ jobSlug: params.id })

  return (
    <div>
      <AdminHeader
        title="Edit Job Listing"
        subtitle={`${applicationCount} application${applicationCount !== 1 ? 's' : ''} received`}
      />
      <JobEditForm job={job} />
    </div>
  )
}
