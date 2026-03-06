"use client"

import { useBookingNudge } from "@/components/ui/booking-popup"
import { ArrowRight } from "lucide-react"

interface BookingCTAProps {
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "outline" | "white"
  className?: string
}

export default function BookingCTA({
  label = "Book a Free Call",
  size = "md",
  variant = "primary",
  className = "",
}: BookingCTAProps) {
  const { openFullPopup } = useBookingNudge()

  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  }

  const variantClasses = {
    primary: "bg-[#2D2B7F] hover:bg-[#232161] text-white shadow-lg shadow-[#2D2B7F]/25",
    outline: "border-2 border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white",
    white: "bg-white text-[#2D2B7F] hover:bg-white/90 shadow-lg",
  }

  return (
    <button
      onClick={openFullPopup}
      className={`inline-flex items-center gap-2 rounded-xl font-bold transition-all duration-200 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  )
}
