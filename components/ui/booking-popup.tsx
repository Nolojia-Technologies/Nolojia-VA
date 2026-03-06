"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, ArrowRight } from "lucide-react"

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"]

function getNextDays(count: number) {
  const days = []
  const today = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
      full: d.toISOString(),
    })
  }
  return days
}

interface BookingPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedTime, setSelectedTime] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [step, setStep] = useState<"schedule" | "details" | "confirmed">("schedule")
  const days = getNextDays(5)

  const handleBook = () => {
    if (step === "schedule" && selectedTime !== null) {
      setStep("details")
    } else if (step === "details" && name && email) {
      setStep("confirmed")
    }
  }

  const resetAndClose = () => {
    setStep("schedule")
    setSelectedTime(null)
    setName("")
    setEmail("")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle backdrop — no blur, just a light dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-[100]"
            onClick={resetAndClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-36 right-4 z-[101] w-[95vw] max-w-[400px] max-h-[calc(100vh-10rem)] overflow-y-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] p-6 text-white">
                <button
                  onClick={resetAndClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Nolojia</h3>
                    <p className="text-sm text-white/80">AI Operations Partner</p>
                  </div>
                </div>
                <p className="font-semibold text-lg">Book your 1:1 Discovery Session</p>
                <p className="text-sm text-white/70 mt-1">
                  500+ founders have reclaimed over 20 hours back every week
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                {step === "schedule" && (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      Book now to see WHAT to hand off first and exactly HOW to hand it off without it failing.
                    </p>

                    {/* Urgency */}
                    <div className="flex items-center justify-between bg-red-50 rounded-lg px-4 py-2.5 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                        </span>
                        <span className="text-sm font-medium text-red-700">Only few slots are left</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-red-600 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        25 min
                      </div>
                    </div>

                    {/* Date Selection */}
                    <div className="flex gap-2 mb-5">
                      {days.map((d, i) => (
                        <button
                          key={d.full}
                          onClick={() => setSelectedDate(i)}
                          className={`flex-1 flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 ${selectedDate === i
                              ? "border-[#2D2B7F] bg-[#2D2B7F]/5 text-[#2D2B7F]"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                        >
                          <span className="text-xs font-medium">{d.day}</span>
                          <span className="text-lg font-bold">{d.date}</span>
                          <span className="text-[10px] uppercase">{d.month}</span>
                        </button>
                      ))}
                    </div>

                    {/* Time Slots */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {timeSlots.map((time, i) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(i)}
                          className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${selectedTime === i
                              ? "border-[#2D2B7F] bg-[#2D2B7F] text-white shadow-md"
                              : "border-gray-200 hover:border-[#2D2B7F]/50 text-gray-600"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === "details" && (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      You selected <strong>{days[selectedDate].day}, {days[selectedDate].month} {days[selectedDate].date}</strong> at <strong>{timeSlots[selectedTime!]}</strong>
                    </p>
                    <div className="space-y-3 mb-5">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm"
                      />
                    </div>
                  </>
                )}

                {step === "confirmed" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Booked!</h4>
                    <p className="text-sm text-gray-500">
                      Check your email ({email}) for confirmation details. We&apos;ll see you on{" "}
                      {days[selectedDate].day}, {days[selectedDate].month} {days[selectedDate].date} at{" "}
                      {timeSlots[selectedTime!]}.
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                {step !== "confirmed" ? (
                  <button
                    onClick={handleBook}
                    disabled={step === "schedule" ? selectedTime === null : !name || !email}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] hover:from-[#232161] hover:to-[#3B39A6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#2D2B7F]/25"
                  >
                    <Calendar className="w-4 h-4" />
                    {step === "schedule" ? "Book Your 25-Min Call" : "Confirm Booking"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={resetAndClose}
                    className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] transition-all duration-200"
                  >
                    Done
                  </button>
                )}

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-4">
                  Powered by <span className="font-semibold text-[#2D2B7F]">Nolojia</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ===== Subtle corner nudge popup (non-modal, non-blocking) =====
export function BookingNudge({ isVisible, onClose, onBook }: { isVisible: boolean; onClose: () => void; onBook: () => void }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-[100]"
            onClick={onClose}
          />
          <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-36 right-4 z-[101] w-[95vw] max-w-[400px] max-h-[calc(100vh-10rem)] overflow-y-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/15 border border-gray-100 overflow-hidden">
            {/* Mini header */}
            <div className="bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] px-4 py-3 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Nolojia</p>
                  <p className="text-[10px] text-white/70">AI Operations Partner</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="font-semibold text-sm text-gray-900 mb-1">
                Book your 1:1 Discovery Session
              </p>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                500+ founders save 20+ hours/week. See what you can hand off first.
              </p>

              {/* Urgency */}
              <div className="flex items-center gap-1.5 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <span className="text-xs font-medium text-red-600">Only few slots left</span>
              </div>

              <button
                onClick={onBook}
                className="w-full py-2.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] hover:from-[#232161] hover:to-[#3B39A6] transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#2D2B7F]/20"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Your 25-Min Call
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Floating trigger button for the popup — positioned higher
export function BookingTrigger({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: "spring", damping: 15 }}
      onClick={onClick}
      className="fixed bottom-20 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] text-white shadow-xl shadow-[#2D2B7F]/30 hover:shadow-2xl hover:shadow-[#2D2B7F]/40 transition-all duration-300 flex items-center justify-center group"
    >
      <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
    </motion.button>
  )
}

// ===== Hook to manage random nudge re-appearance =====
export function useBookingNudge() {
  const [nudgeVisible, setNudgeVisible] = useState(false)
  const [fullPopupOpen, setFullPopupOpen] = useState(false)

  const scheduleNextNudge = useCallback(() => {
    // Random interval between 25-55 seconds
    const delay = (25 + Math.random() * 30) * 1000
    const timer = setTimeout(() => {
      // Only show if full popup isn't open
      if (!fullPopupOpen) {
        setNudgeVisible(true)
      }
    }, delay)
    return timer
  }, [fullPopupOpen])

  useEffect(() => {
    // First nudge after 8 seconds
    const initialTimer = setTimeout(() => {
      setNudgeVisible(true)
    }, 8000)

    return () => clearTimeout(initialTimer)
  }, [])

  // Schedule next nudge whenever the current one is dismissed (user closed it)
  useEffect(() => {
    if (!nudgeVisible && !fullPopupOpen) {
      const timer = scheduleNextNudge()
      return () => clearTimeout(timer)
    }
  }, [nudgeVisible, fullPopupOpen, scheduleNextNudge])



  const dismissNudge = () => setNudgeVisible(false)

  const openFullPopup = () => {
    setNudgeVisible(false)
    setFullPopupOpen(true)
  }

  const closeFullPopup = () => {
    setFullPopupOpen(false)
  }

  return {
    nudgeVisible,
    fullPopupOpen,
    dismissNudge,
    openFullPopup,
    closeFullPopup,
  }
}
