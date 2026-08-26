import * as React from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils/cn"

/**
 * The site has exactly three CTA weights. Anything else is a plain link.
 *  - primary   → "Build My AI System"
 *  - secondary → "Talk to Nolojia" / "Explore …"
 *  - quiet     → in-card link, arrow only
 */
export type CtaVariant = "primary" | "secondary" | "quiet"

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60"

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-[3.25rem] px-6 text-[0.95rem]",
}

function variantClass(variant: CtaVariant, onInk: boolean) {
  if (variant === "primary") {
    return onInk
      ? "bg-white text-ink hover:bg-white/90 shadow-lg"
      : "bg-brand text-brand-foreground hover:bg-brand-hover shadow-brand"
  }
  if (variant === "secondary") {
    return onInk
      ? "border border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10"
      : "border border-border bg-background text-foreground hover:border-brand/30 hover:bg-surface-2"
  }
  return onInk
    ? "text-white/75 hover:text-white px-0"
    : "text-brand hover:text-brand-hover px-0"
}

export interface CtaLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  variant?: CtaVariant
  size?: keyof typeof sizes
  onInk?: boolean
  withArrow?: boolean
  /**
   * Opens in a new tab with the usual rel guards, swaps the arrow for an
   * external-link glyph, and announces the new tab to screen readers.
   */
  external?: boolean
}

export function CtaLink({
  variant = "primary",
  size = "md",
  onInk = false,
  external = false,
  withArrow = variant !== "secondary" || external,
  className,
  children,
  ...props
}: CtaLinkProps) {
  const Glyph = external ? ExternalLink : ArrowRight
  return (
    <Link
      className={cn(
        base,
        variant === "quiet" ? "h-auto text-sm" : sizes[size],
        variantClass(variant, onInk),
        "group",
        className
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external ? <span className="sr-only">(opens in a new tab)</span> : null}
      {withArrow ? (
        <Glyph
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            external ? "" : "group-hover:translate-x-0.5"
          )}
        />
      ) : null}
    </Link>
  )
}

export function CtaButton({
  variant = "primary",
  size = "md",
  onInk = false,
  withArrow = false,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: CtaVariant
  size?: keyof typeof sizes
  onInk?: boolean
  withArrow?: boolean
}) {
  return (
    <button
      className={cn(base, sizes[size], variantClass(variant, onInk), "group", className)}
      {...props}
    >
      {children}
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </button>
  )
}
