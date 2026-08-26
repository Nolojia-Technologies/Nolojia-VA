"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { BookingPopup } from "@/components/ui/booking-popup"
import { CtaButton } from "@/components/site/cta"
import { track } from "@/lib/analytics"

export function BookingLauncher() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <CtaButton
        size="lg"
        onClick={() => {
          setOpen(true)
          track("consultation_request", { location: "book-page" })
        }}
      >
        <CalendarDays aria-hidden="true" className="h-4 w-4" />
        Pick a time
      </CtaButton>
      <BookingPopup isOpen={open} onClose={() => setOpen(false)} />
    </>
  )
}
