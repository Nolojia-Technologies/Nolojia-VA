'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminHeader } from '@/components/admin/header'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const departments = [
  'VA Services', 'Creative Support', 'Growth Support', 'Operations',
  'Finance', 'Marketing', 'Engineering', 'General',
]

const jobTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship']

export default function NewJobPage() {
  const router = useRouter()
  const supabase = createClient()

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

  const slugify = (text: string) =>
    text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const slug = slugify(form.title)
    const filteredReqs = requirements.filter(r => r.trim())
    const filteredBenefits = benefits.filter(b => b.trim())

    const { error: insertError } = await supabase
      .from('jobs')
      .insert({
        slug,
        ...form,
        requirements: filteredReqs,
        benefits: filteredBenefits,
      })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
      return
    }

    router.push('/admin/jobs')
    router.refresh()
  }

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"

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
              className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-rose-500 hover:border-rose-300 transition-colors mt-0.5"
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
    <div>
      <AdminHeader title="Create Job Listing" subtitle="Post a new open position" />

      <div className="p-6 max-w-3xl">
        <Link href="/admin/jobs" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft size={15} />
          Back to Jobs
        </Link>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 text-sm text-rose-700">{error}</div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span className="text-rose-500">*</span></label>
              <input
                type="text"
                required
                placeholder="e.g. Executive Virtual Assistant"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className={inputClass}
              />
              {form.title && (
                <p className="text-xs text-gray-400 mt-1">Slug: {slugify(form.title)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Department <span className="text-rose-500">*</span></label>
              <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className={inputClass}>
                {departments.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Type <span className="text-rose-500">*</span></label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} className={inputClass}>
                {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                type="text"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Job Description <span className="text-rose-500">*</span></label>
            <textarea
              required
              rows={5}
              placeholder="Describe the role and why someone should join Nolojia..."
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className={`${inputClass} resize-none`}
            />
          </div>

          <ListEditor
            label="Requirements"
            items={requirements}
            onChange={setRequirements}
            placeholder="e.g. 3+ years of experience as a VA"
          />

          <ListEditor
            label="Benefits"
            items={benefits}
            onChange={setBenefits}
            placeholder="e.g. 100% remote — work from anywhere"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Publish Status</label>
            <div className="flex items-center gap-3">
              {(['open', 'draft'] as const).map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, status: s })}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    form.status === s
                      ? s === 'open'
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'bg-amber-50 border-amber-300 text-amber-700'
                      : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {s === 'open' ? 'Publish (Open)' : 'Save as Draft'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-sm"
            >
              {loading && <Loader2 size={15} className="animate-spin" />}
              {form.status === 'open' ? 'Publish Job' : 'Save Draft'}
            </button>
            <Link href="/admin/jobs" className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 font-medium">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
