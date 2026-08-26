"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Clock, MapPin } from "lucide-react"
import type { Job } from "@/lib/careers/jobs"
import { Pill } from "@/components/site/primitives"
import { cn } from "@/lib/utils/cn"

function RoleCard({ role }: { role: Job }) {
  const [open, setOpen] = React.useState(false)
  const panelId = `role-${role.slug}`

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xs transition-colors duration-300 hover:border-brand/25">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-start justify-between gap-4 p-6 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap gap-2">
              <Pill tone="brand">{role.department}</Pill>
              <Pill>
                <Clock aria-hidden="true" className="h-3 w-3" />
                {role.type}
              </Pill>
              <Pill>
                <MapPin aria-hidden="true" className="h-3 w-3" />
                {role.location}
              </Pill>
            </span>
            <span className="mt-3 block text-lg font-semibold text-foreground">{role.title}</span>
            <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">
              {role.shortDescription}
            </span>
          </span>
          <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground">
            <ChevronDown
              aria-hidden="true"
              className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
            />
          </span>
        </button>
      </h3>

      {open ? (
        <div id={panelId} className="border-t border-border px-6 pb-6 pt-5">
          <p className="text-sm leading-relaxed text-muted-foreground">{role.description}</p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Requirements
              </h4>
              <ul className="mt-3 space-y-2">
                {role.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Nice to have
              </h4>
              <ul className="mt-3 space-y-2">
                {role.niceToHave.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-border"
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/careers/${role.slug}`}
            className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            Apply for this role
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export function RoleList({ roles }: { roles: Job[] }) {
  const departments = React.useMemo(
    () => ["All", ...Array.from(new Set(roles.map((r) => r.department)))],
    [roles]
  )
  const [filter, setFilter] = React.useState("All")
  const filtered = filter === "All" ? roles : roles.filter((r) => r.department === filter)

  return (
    <div>
      <div
        role="group"
        aria-label="Filter roles by department"
        className="flex flex-wrap justify-center gap-2"
      >
        {departments.map((dept) => (
          <button
            key={dept}
            type="button"
            aria-pressed={filter === dept}
            onClick={() => setFilter(dept)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
              filter === dept
                ? "bg-brand text-brand-foreground"
                : "border border-border bg-card text-muted-foreground hover:border-brand/30 hover:text-foreground"
            )}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center text-sm text-muted-foreground">
            No open roles in this department right now.
          </p>
        ) : (
          filtered.map((role) => <RoleCard key={role.slug} role={role} />)
        )}
      </div>
    </div>
  )
}
