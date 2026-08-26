import * as React from "react"
import { cn } from "@/lib/utils/cn"

/* ── Section ─────────────────────────────────────────────────────────────── */

type Tone = "default" | "surface" | "ink"

const toneClass: Record<Tone, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-foreground",
  ink: "bg-ink text-ink-foreground",
}

export function Section({
  as: Tag = "section",
  tone = "default",
  className,
  children,
  ...props
}: {
  as?: "section" | "div" | "footer" | "header"
  tone?: Tone
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag
      className={cn("relative py-20 sm:py-24 lg:py-28", toneClass[tone], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export function Container({
  className,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { size?: "narrow" | "default" | "wide" }) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 lg:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className
      )}
      {...props}
    />
  )
}

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */

export function Eyebrow({
  className,
  onInk = false,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { onInk?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em]",
        onInk ? "text-white/55" : "text-brand",
        className
      )}
      {...props}
    />
  )
}

/* ── Section heading ─────────────────────────────────────────────────────── */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onInk = false,
  as: Tag = "h2",
  className,
  children,
}: {
  eyebrow?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  align?: "left" | "center"
  onInk?: boolean
  as?: "h1" | "h2" | "h3"
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <Eyebrow onInk={onInk} className="mb-4">
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Tag
        className={cn(
          Tag === "h1" ? "text-display-lg" : "text-display-sm",
          "font-semibold",
          onInk ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            onInk ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  )
}

/* ── Pill / status badge ─────────────────────────────────────────────────── */

export function Pill({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "brand" | "success" | "warning" | "ink"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        tone === "neutral" && "border-border bg-surface-2 text-muted-foreground",
        tone === "brand" && "border-brand/20 bg-brand-soft text-brand-strong",
        tone === "success" && "border-success/20 bg-success-soft text-success",
        tone === "warning" && "border-warning/25 bg-warning-soft text-warning",
        tone === "ink" && "border-white/15 bg-white/5 text-white/70",
        className
      )}
      {...props}
    />
  )
}

/* ── Card surface ────────────────────────────────────────────────────────── */

export function Panel({
  className,
  onInk = false,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onInk?: boolean; interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-6 sm:p-7",
        onInk
          ? "border-white/10 bg-white/[0.04]"
          : "border-border bg-card shadow-xs",
        interactive &&
          (onInk
            ? "transition duration-300 ease-smooth hover:border-white/20 hover:bg-white/[0.07]"
            : "transition duration-300 ease-smooth hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-md"),
        className
      )}
      {...props}
    />
  )
}
