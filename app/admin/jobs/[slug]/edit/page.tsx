import { notFound } from 'next/navigation'

import { AdminHeader } from '@/components/admin/header'
import { requireAdminRole } from '@/lib/auth/access'
import { countFilteredApplications } from '@/lib/db/applications'
import { getJobBySlugForAdmin } from '@/lib/db/jobs'
import { JobEditForm } from './job-edit-form'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  await requireAdminRole(['super_admin', 'hr_manager'])
  const job = await getJobBySlugForAdmin(params.slug)
  return { title: job?.title ? `Edit: ${job.title}` : 'Edit Job' }
}

export default async function EditJobPage({ params }: { params: { slug: string } }) {
  await requireAdminRole(['super_admin', 'hr_manager'])

  const job = await getJobBySlugForAdmin(params.slug)
  if (!job) notFound()

  const applicationCount = await countFilteredApplications({ jobSlug: params.slug })

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
