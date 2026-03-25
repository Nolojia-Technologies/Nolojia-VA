import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { JobEditForm } from './job-edit-form'
import { AdminHeader } from '@/components/admin/header'

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data } = await supabase.from('jobs').select('title').eq('slug', params.id).single()
  return { title: data?.title ? `Edit: ${data.title}` : 'Edit Job' }
}

export default async function EditJobPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  // `id` param is actually the slug
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('slug', params.id)
    .single()

  if (!job) notFound()

  const { count: applicationCount } = await supabase
    .from('applications')
    .select('*', { count: 'exact', head: true })
    .eq('job_slug', params.id)

  return (
    <div>
      <AdminHeader
        title="Edit Job Listing"
        subtitle={`${applicationCount ?? 0} application${(applicationCount ?? 0) !== 1 ? 's' : ''} received`}
      />
      <JobEditForm job={job} />
    </div>
  )
}
