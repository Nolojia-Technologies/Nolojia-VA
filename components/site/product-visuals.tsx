import { Bell, Highlighter, Lock, StickyNote } from "lucide-react"
import { cn } from "@/lib/utils/cn"

/**
 * Product-style graphics drawn in markup rather than photographed or generated.
 * They stay sharp at any size, respond to the theme and cost nothing to load.
 */

export function PageMarksVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-md",
        className
      )}
      role="img"
      aria-label="PageMarks in use: a translucent note floating over an article, with a highlighted sentence still readable underneath it."
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
          <span className="h-2.5 w-2.5 rounded-full bg-border" />
        </div>
        <div className="flex min-w-0 flex-1 items-center rounded-lg border border-border bg-background px-2.5 py-1.5">
          <span className="truncate text-xs text-muted-foreground">
            example.com/why-you-forget-what-you-read
          </span>
        </div>
      </div>

      <div aria-hidden="true" className="relative min-w-0 p-4 sm:p-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Essay
        </p>
        <p className="mt-2 text-sm font-semibold text-foreground">Why you forget what you read</p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          A bookmark saves a location and nothing else — not why you stopped, not what you were
          thinking, not what you meant to do next.
        </p>
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
          <mark className="rounded bg-warning-soft px-0.5 text-foreground">
            The best tools disappear.
          </mark>{" "}
          They stay out of the way until the moment you reach for them, and then they are exactly
          where your hand expected them to be.
        </p>
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
          What if the page could remember you back?
        </p>

        {/* The note. Translucent on purpose — the whole point of the product is
            that the page underneath stays readable and clickable. */}
        <div className="pointer-events-none absolute bottom-4 right-3 w-40 rounded-xl border border-warning/40 bg-warning-soft/85 p-3 shadow-md backdrop-blur-[1px] sm:right-6 sm:w-48">
          <div className="flex items-center gap-1.5">
            <StickyNote className="h-3 w-3 shrink-0 text-warning" />
            <span className="text-[0.625rem] font-semibold uppercase tracking-wider text-warning">
              Note
            </span>
            <Bell className="ml-auto h-3 w-3 shrink-0 text-warning" />
          </div>
          <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-foreground">
            Contradicts the other source — check before writing this up.
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-border bg-surface px-4 py-2.5"
      >
        <span className="flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
          <Highlighter className="h-3 w-3 shrink-0" />
          Highlights kept
        </span>
        <span className="flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
          <Bell className="h-3 w-3 shrink-0" />
          Reminder set
        </span>
        <span className="flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
          <Lock className="h-3 w-3 shrink-0" />
          Stored locally
        </span>
      </div>
    </div>
  )
}

export function ArchitectureVisual({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-md",
        className
      )}
      role="img"
      aria-label="AI Architecture concept: an editable 2D floor plan alongside the same design as a 3D massing model."
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface px-4 py-3">
        <p className="text-xs font-medium text-muted-foreground">Plan · Level 01</p>
        <span className="ml-auto rounded-full border border-warning/25 bg-warning-soft px-2 py-0.5 text-[0.6875rem] font-medium text-warning">
          In development
        </span>
      </div>

      <div aria-hidden="true" className="grid gap-px bg-border sm:grid-cols-2">
        {/* 2D plan */}
        <div className="bg-background p-4">
          <svg viewBox="0 0 200 150" className="h-full w-full" role="presentation">
            <rect x="10" y="10" width="180" height="130" className="fill-surface stroke-foreground/25" strokeWidth="2" />
            <line x1="10" y1="80" x2="120" y2="80" className="stroke-foreground/25" strokeWidth="2" />
            <line x1="120" y1="10" x2="120" y2="140" className="stroke-foreground/25" strokeWidth="2" />
            <line x1="60" y1="80" x2="60" y2="140" className="stroke-foreground/25" strokeWidth="2" />
            {/* door swings */}
            <path d="M78 80 A14 14 0 0 1 92 94" className="fill-none stroke-brand" strokeWidth="1.2" />
            <path d="M120 40 A14 14 0 0 0 134 54" className="fill-none stroke-brand" strokeWidth="1.2" />
            {/* dimension line */}
            <line x1="10" y1="146" x2="190" y2="146" className="stroke-brand/50" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x="100" y="144" textAnchor="middle" className="fill-muted-foreground" fontSize="7">
              8.4 m
            </text>
            {/* selection handles */}
            {[
              [120, 10],
              [120, 75],
              [120, 140],
            ].map(([cx, cy]) => (
              <rect key={`${cx}-${cy}`} x={cx - 2.5} y={cy - 2.5} width="5" height="5" className="fill-brand" />
            ))}
          </svg>
        </div>

        {/* 3D massing */}
        <div className="bg-background p-4">
          <svg viewBox="0 0 200 150" className="h-full w-full" role="presentation">
            <polygon points="30,95 100,60 170,95 100,130" className="fill-surface-2 stroke-foreground/20" strokeWidth="1.5" />
            <polygon points="30,95 100,130 100,95 30,60" className="fill-brand/15 stroke-brand/40" strokeWidth="1.2" />
            <polygon points="170,95 100,130 100,95 170,60" className="fill-brand/25 stroke-brand/40" strokeWidth="1.2" />
            <polygon points="30,60 100,25 170,60 100,95" className="fill-brand/40 stroke-brand/50" strokeWidth="1.2" />
            <line x1="100" y1="25" x2="100" y2="95" className="stroke-brand/30" strokeWidth="0.8" strokeDasharray="3 3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
