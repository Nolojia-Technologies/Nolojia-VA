'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'

import {
  AdminField,
  ListEditor,
  StatusChoice,
  adminFieldClass,
} from '@/components/admin/job-form-fields'
import { createJobAction } from '@/app/admin/actions'

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

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export function NewJobForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    department: 'VA Services',
    type: 'Full-Time',
    location: 'Remote — Worldwide',
    description: '',
    status: 'open' as 'open' | 'draft',
  })
  const [requirements, setRequirements] = useState<string[]>([''])
  const [benefits, setBenefits] = useState<string[]>([''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // The slug is derived on the server, so two people creating the same role
    // cannot race each other into a duplicate.
    const result = await createJobAction({ ...form, requirements, benefits })

    if (!result.ok) {
      setError(result.error)
      setLoading(false)
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
          onSubmit={handleSubmit}
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
              hint={form.title ? `Slug: ${slugify(form.title)}` : undefined}
            >
              <input
                id="job-title"
                name="title"
                type="text"
                required
                placeholder="e.g. Executive Virtual Assistant"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={adminFieldClass}
              />
            </AdminField>

            <AdminField id="job-department" label="Department" required>
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

            <AdminField id="job-type" label="Job type" required>
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

          <AdminField id="job-description" label="Job description" required>
            <textarea
              id="job-description"
              name="description"
              required
              rows={5}
              placeholder="Describe the role and why someone should join Nolojia..."
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
            placeholder="e.g. 3+ years of experience as a VA"
          />

          <ListEditor
            idPrefix="job-benefit"
            legend="Benefits"
            items={benefits}
            onChange={setBenefits}
            placeholder="e.g. 100% remote — work from anywhere"
          />

          <StatusChoice
            value={form.status}
            onChange={(status) => setForm({ ...form, status })}
          />

          <div className="flex items-center gap-3 border-t border-border pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-sm transition-colors hover:bg-brand-hover disabled:opacity-60"
            >
              {loading ? <Loader2 aria-hidden="true" size={15} className="animate-spin" /> : null}
              {form.status === 'open' ? 'Publish job' : 'Save draft'}
            </button>
            <Link
              href="/admin/jobs"
              className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  )
}
