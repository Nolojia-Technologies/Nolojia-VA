'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react'

import {
  AdminField,
  ListEditor,
  adminFieldClass,
} from '@/components/admin/job-form-fields'
import { deleteJobAction, updateJobAction } from '@/app/admin/actions'
import { cn } from '@/lib/utils/cn'
import type { Job, JobStatus } from '@/types/database'

const departments = [
  'VA Services',
  'Creative Support',
  'Growth Support',
  'Operations',
  'Finance',
  'Marketing',
  'Engineering',
  'General',
]

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship']

const STATUS_TONE: Record<JobStatus, string> = {
  open: 'bg-success-soft border-success/40 text-success',
  closed: 'bg-muted border-input text-foreground',
  draft: 'bg-warning-soft border-warning/40 text-warning',
}

interface JobEditFormProps {
  job: Job
}

export function JobEditForm({ job }: JobEditFormProps) {
  const router = useRouter()

  const [form, setForm] = useState({
    title: job.title,
    department: job.department,
    type: job.type,
    location: job.location,
    description: job.description ?? '',
    status: job.status,
  })
  const [requirements, setRequirements] = useState<string[]>(() => (job.requirements.length ? job.requirements : ['']))
  const [benefits, setBenefits] = useState<string[]>(() => (job.benefits.length ? job.benefits : ['']))
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await updateJobAction(job.slug, {
      ...form,
      requirements,
      benefits,
    })

    if (!result.ok) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/admin/jobs')
    router.refresh()
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError('')

    const result = await deleteJobAction(job.slug)
    if (!result.ok) {
      setError(result.error)
      setDeleting(false)
      return
    }

    router.push('/admin/jobs')
    router.refresh()
  }

  return (
    <div className="max-w-3xl p-6">
      <Link
        href="/admin/jobs"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" size={15} />
        Back to jobs
      </Link>

      <form
        onSubmit={handleSave}
        className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div aria-live="polite">
          {error ? (
            <p
              role="alert"
              className="rounded-xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive"
            >
              {error}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminField
            id="job-title"
            label="Job title"
            required
            className="sm:col-span-2"
            hint={`Slug: ${job.slug} (fixed after creation)`}
          >
            <input
              id="job-title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={adminFieldClass}
            />
          </AdminField>

          <AdminField id="job-department" label="Department">
            <select
              id="job-department"
              name="department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              className={adminFieldClass}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField id="job-type" label="Job type">
            <select
              id="job-type"
              name="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className={adminFieldClass}
            >
              {jobTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </AdminField>

          <AdminField id="job-location" label="Location" className="sm:col-span-2">
            <input
              id="job-location"
              name="location"
              type="text"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className={adminFieldClass}
            />
          </AdminField>
        </div>

        <AdminField id="job-description" label="Job description">
          <textarea
            id="job-description"
            name="description"
            rows={5}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${adminFieldClass} resize-y`}
          />
        </AdminField>

        <ListEditor
          idPrefix="job-requirement"
          legend="Requirements"
          items={requirements}
          onChange={setRequirements}
          placeholder="e.g. 3+ years of experience"
        />
        <ListEditor
          idPrefix="job-benefit"
          legend="Benefits"
          items={benefits}
          onChange={setBenefits}
          placeholder="e.g. 100% remote"
        />

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-foreground">Status</legend>
          <div className="flex flex-wrap items-center gap-3">
            {(['open', 'closed', 'draft'] as const).map((s) => (
              <label
                key={s}
                className={cn(
                  'cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
                  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-card',
                  form.status === s
                    ? STATUS_TONE[s]
                    : 'border-border bg-card text-muted-foreground hover:bg-surface-2'
                )}
              >
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={form.status === s}
                  onChange={() => setForm({ ...form, status: s })}
                  className="sr-only"
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover disabled:opacity-60"
            >
              {loading ? <Loader2 aria-hidden="true" size={15} className="animate-spin" /> : null}
              Save changes
            </button>
            <Link
              href="/admin/jobs"
              className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
          </div>

          {showDeleteConfirm ? (
            <div className="flex items-center gap-2" role="group" aria-label="Confirm deletion">
              <span className="text-xs font-medium text-destructive">
                Delete &ldquo;{job.title}&rdquo; and its listing?
              </span>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="rounded-lg bg-destructive px-3 py-1.5 text-xs text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-60"
              >
                {deleting ? 'Deleting…' : 'Yes, delete'}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="rounded-lg bg-muted px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-border"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
            >
              <Trash2 aria-hidden="true" size={14} />
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
