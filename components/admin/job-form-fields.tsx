'use client'

import * as React from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export const adminFieldClass =
  'w-full rounded-xl border border-input bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card'

export function AdminField({
  id,
  label,
  required,
  hint,
  className,
  children,
}: {
  id: string
  label: string
  required?: boolean
  hint?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-brand">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  )
}

/**
 * Module scope on purpose. Both job forms previously declared this inside their
 * component body, so React saw a brand-new component type on every keystroke,
 * remounted the row and threw focus out of the input the user was typing in.
 */
export function ListEditor({
  idPrefix,
  legend,
  items,
  onChange,
  placeholder,
}: {
  idPrefix: string
  legend: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-foreground">{legend}</legend>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <label htmlFor={`${idPrefix}-${i}`} className="sr-only">
              {legend} item {i + 1}
            </label>
            <input
              id={`${idPrefix}-${i}`}
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...items]
                next[i] = e.target.value
                onChange(next)
              }}
              placeholder={placeholder}
              className={adminFieldClass}
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label={`Remove ${legend.toLowerCase()} item ${i + 1}`}
              className={cn(
                'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors',
                'hover:border-destructive/40 hover:text-destructive'
              )}
            >
              <X aria-hidden="true" size={14} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="flex items-center gap-1.5 text-xs font-medium text-brand hover:text-brand-hover"
        >
          <Plus aria-hidden="true" size={13} />
          Add {legend.toLowerCase().replace(/s$/, '')}
        </button>
      </div>
    </fieldset>
  )
}

/**
 * Publish state is a choice between two options, so it is a radio group rather
 * than two buttons that happen to look selected.
 */
export function StatusChoice({
  value,
  onChange,
  legend = 'Publish status',
}: {
  value: 'open' | 'draft'
  onChange: (value: 'open' | 'draft') => void
  legend?: string
}) {
  const options = [
    { value: 'open' as const, label: 'Publish (open)', tone: 'bg-success-soft border-success/40 text-success' },
    { value: 'draft' as const, label: 'Save as draft', tone: 'bg-warning-soft border-warning/40 text-warning' },
  ]

  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-foreground">{legend}</legend>
      <div className="flex flex-wrap items-center gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'cursor-pointer rounded-xl border px-4 py-2 text-sm font-medium transition-colors',
              'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-card',
              value === option.value
                ? option.tone
                : 'border-border bg-card text-muted-foreground hover:bg-surface-2'
            )}
          >
            <input
              type="radio"
              name={`${legend.replace(/\s+/g, '-').toLowerCase()}`}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
