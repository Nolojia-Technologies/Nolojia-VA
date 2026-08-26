import { CtaLink } from "@/components/site/cta"

interface BookingCTAProps {
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "outline" | "white"
  className?: string
  href?: string
}

/**
 * Shared CTA for the programmatic SEO pages.
 *
 * Previously this opened a booking popup that was never mounted on those
 * routes, so the button did nothing. It now navigates to the contact page,
 * which is where the conversion actually happens.
 */
export default function BookingCTA({
  label = "Build My AI System",
  size = "md",
  variant = "primary",
  className,
  href = "/contact",
}: BookingCTAProps) {
  return (
    <CtaLink
      href={href}
      size={size === "lg" ? "lg" : "md"}
      variant={variant === "outline" ? "secondary" : "primary"}
      onInk={variant === "white"}
      className={className}
    >
      {label}
    </CtaLink>
  )
}
