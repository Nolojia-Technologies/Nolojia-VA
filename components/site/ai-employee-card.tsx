"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { Icon } from "@/components/site/icon"
import Link from "next/link"
import type { AIEmployee } from "@/lib/content/ai-employees"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils/cn"

export function AIEmployeeCard({
  employee,
  href,
  className,
}: {
  employee: AIEmployee
  href: string
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-xs transition-colors duration-300 hover:border-brand/25 hover:shadow-md sm:p-7",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
          <Icon name={employee.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-foreground">{employee.name}</h3>
          <p className="mt-0.5 text-sm text-brand">{employee.role}</p>
        </div>
      </div>

      <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted-foreground">
        {employee.summary}
      </p>

      <div className="mt-6">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          Handles
        </p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {employee.handles.map((item) => (
            <li key={item} className="flex items-start gap-2 text-[0.875rem] text-foreground/85">
              <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 rounded-xl border border-border bg-surface px-4 py-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Where a person steps in: </span>
        {employee.humanInTheLoop}
      </p>

      <Link
        href={href}
        onClick={() => track("cta_click", { label: employee.cta, location: "ai-employee-card" })}
        className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
      >
        {employee.cta}
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </Link>
    </motion.article>
  )
}
