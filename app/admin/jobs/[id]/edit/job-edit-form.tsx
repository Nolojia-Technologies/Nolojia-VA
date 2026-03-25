'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Loader2, Trash2, Plus, X } from 'lucide-react'

const departments = [
  'VA Services', 'Creative Support', 'Growth Support', 'Operations',
  'Finance', 'Marketing', 'Engineering', 'General',
]
const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship']

interface JobEditFormProps {
  job: any
}

export function JobEditForm({ job }: JobEditFormProps) {
  const router = useRouter()
  const supabase = createClient()
  const [form, setForm] = useState({
    title: job.title,
    department: job.department,
    type: job.type,
    location: job.location,
    description: job.description ?? '',
    status: job.status,
  })
  const [requirements, setRequirements] = useState<string[]>(
    Array.isArray(job.requirements) && job.requirements.length > 0
      ? job.requirements
      : ['']
  )
  const [benefits, setBenefits] = useState<string[]>(
    Array.isArray(job.benefits) && job.benefits.length > 0
      ? job.benefits
      : ['']
  )
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: updateError } = await supabase
      .from('jobs')
      .update({
        ...form,
        requirements: requirements.filter(r => r.trim()),
        benefits: benefits.filter(b => b.trim()),
      })
      .eq('slug', job.slug)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    router.push('/admin/jobs')
    router.refresh()
  }

  const handleDelete = async () => {
    setDeleting(true)
    const { error: deleteError } = await supabase
      .from('jobs')
      .delete()
      .eq('slug', job.slug)

    if (deleteError) {
      setError(deleteError.message)
      setDeleting(false)
      return
    }

    router.push('/admin/jobs')
    router.refresh()
  }

  const ListEditor = ({
    label,
    items,
    onChange,
    placeholder,
  }: {
    label: string
    items: string[]
    onChange: (items: string[]) => void
    placeholder: string
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              placeholder={placeholder}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-300 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <Plus size={13} />
          Add item
        </button>
      </div>
    </div>
  )

  return (
    <div className="p-6 max-w-3xl">
      <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={15} />
        Back to Jobs
      </Link>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700">{error}</div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className={inputClass}
            />
            <p className="text-xs text-gray-400 mt-1">Slug: {job.slug} (fixed after creation)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Department</label>
            <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={inputClass}>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputClass}>
              {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description</label>
          <textarea
            rows={5}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>

        <ListEditor label="Requirements" items={requirements} onChange={setRequirements} placeholder="e.g. 3+ years of experience" />
        <ListEditor label="Benefits" items={benefits} onChange={setBenefits} placeholder="e.g. 100% remote" />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <div className="flex items-center gap-3">
            {(['open', 'closed', 'draft'] as const).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setForm({ ...form, status: s })}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  form.status === s
                    ? s === 'open'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                      : s === 'closed'
                      ? 'bg-gray-100 border-gray-300 text-gray-700'
                      : 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              Save Changes
            </button>
            <Link href="/admin/jobs" className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium">Cancel</Link>
          </div>

          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
            >
              <Trash2 size={14} />
              Delete
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs text-rose-600 font-medium">Delete this job?</span>
              <button
                type="button"
                disabled={deleting}
                onClick={handleDelete}
                className="px-3 py-1.5 bg-rose-600 text-white text-xs rounded-lg hover:bg-rose-700 transition-colors"
              >
                {deleting ? 'Deleting...' : 'Yes, delete'}
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
