"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  BarChart3,
  Calendar,
  Database,
  Headset,
  Mail,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils/cn"

interface Node {
  icon: LucideIcon
  label: string
}

const NODES: Node[] = [
  { icon: Users, label: "CRM" },
  { icon: Mail, label: "Email" },
  { icon: Calendar, label: "Calendar" },
  { icon: Database, label: "Database" },
  { icon: BarChart3, label: "Reporting" },
  { icon: Headset, label: "Support" },
]

const RADIUS = 37
const CENTER = 50

function positionFor(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  }
}

/**
 * Nolojia sitting across the operational stack rather than beside it.
 * A radial hub on tablet and up; a plain stacked list on small screens where
 * a ring would collapse into unreadable overlap.
 */
export function SystemDiagram({ className }: { className?: string }) {
  const reduce = useReducedMotion()

  return (
    <div className={className}>
      {/* Ring — sm and up */}
      <div className="relative mx-auto hidden aspect-square w-full max-w-[34rem] sm:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
          focusable="false"
        >
          {NODES.map((node, i) => {
            const { x, y } = positionFor(i, NODES.length)
            return (
              <line
                key={node.label}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-brand/25"
                strokeWidth={0.4}
                strokeDasharray="1.6 1.6"
              />
            )
          })}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth={0.3}
          />
        </svg>

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-brand/25 bg-brand-soft px-5 py-4 shadow-md">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-brand-foreground" />
            </span>
            <span className="text-sm font-semibold text-brand-strong">Nolojia AI</span>
            <span className="text-[0.6875rem] text-brand-strong/70">Systems layer</span>
          </div>
        </div>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const { x, y } = positionFor(i, NODES.length)
          const Icon = node.icon
          return (
            <motion.div
              key={node.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 whitespace-nowrap rounded-xl border border-border bg-card px-3 py-2 shadow-xs">
                <Icon aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                <span className="text-[0.8125rem] font-medium text-foreground">{node.label}</span>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Stack — below sm */}
      <div className="sm:hidden">
        <div className="flex items-center gap-3 rounded-xl border border-brand/25 bg-brand-soft px-4 py-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-brand-foreground" />
          </span>
          <span className="text-sm font-semibold text-brand-strong">Nolojia AI · systems layer</span>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-2">
          {NODES.map((node) => {
            const Icon = node.icon
            return (
              <li
                key={node.label}
                className={cn(
                  "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5"
                )}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate text-[0.8125rem] font-medium text-foreground">
                  {node.label}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
