"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar, Clock, ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react"

// ─── Booking Popup ─────────────────────────────────────────────────────────────

interface BookingPopupProps {
  isOpen: boolean
  onClose: () => void
}

const SERVICE_OPTIONS = [
  "Virtual Assistant Services",
  "Executive / Personal Assistant",
  "Administrative Assistant",
  "E-commerce VA",
  "Real Estate VA",
  "Customer Support VA",
  "Social Media Management",
  "Content & Copywriting",
  "Graphic Design",
  "Lead Generation",
  "CRM & Sales Support",
  "AI & Automation Consulting",
  "Other / Not Sure Yet",
]

const TIME_OPTIONS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM",
  "3:00 PM", "4:00 PM", "5:00 PM",
]

function getTodayStr() {
  return new Date().toISOString().split("T")[0]
}

const EMPTY_DETAILS = {
  name: "", email: "", phone: "", serviceType: "", notes: "", _hp: "",
}

export function BookingPopup({ isOpen, onClose }: BookingPopupProps) {
  const [step, setStep] = useState<"schedule" | "details" | "confirmed" | "error">("schedule")
  const [selectedDate, setSelectedDate] = useState(getTodayStr())
  const [selectedTime, setSelectedTime] = useState("")
  const [details, setDetails] = useState(EMPTY_DETAILS)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setDetails(d => ({ ...d, [field]: e.target.value }))

  async function handleConfirm() {
    if (!details.name || !details.email || !details.serviceType) return
    setLoading(true)
    setErrorMsg("")

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          email: details.email,
          phone: details.phone,
          serviceType: details.serviceType,
          preferredDate: new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }),
          preferredTime: selectedTime,
          notes: details.notes,
          _hp: details._hp,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        setStep("error")
        return
      }

      setStep("confirmed")
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.")
      setStep("error")
    } finally {
      setLoading(false)
    }
  }

  const resetAndClose = () => {
    setStep("schedule")
    setSelectedDate(getTodayStr())
    setSelectedTime("")
    setDetails(EMPTY_DETAILS)
    setErrorMsg("")
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/25 z-[100]"
            onClick={resetAndClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-36 right-4 z-[101] w-[95vw] max-w-[420px] max-h-[calc(100vh-10rem)] overflow-y-auto"
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

                {/* STEP 1 — Schedule */}
                {step === "schedule" && (
                  <>
                    <div className="flex items-center justify-between bg-red-50 rounded-lg px-4 py-2.5 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                        </span>
                        <span className="text-sm font-medium text-red-700">Only a few slots left this week</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-red-600 font-semibold">
                        <Clock className="w-3.5 h-3.5" />
                        25 min
                      </div>
                    </div>

                    <div className="space-y-4 mb-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          min={getTodayStr()}
                          onChange={e => setSelectedDate(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Preferred Time</label>
                        <div className="grid grid-cols-3 gap-2">
                          {TIME_OPTIONS.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2.5 px-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                                selectedTime === time
                                  ? "border-[#2D2B7F] bg-[#2D2B7F] text-white shadow-md"
                                  : "border-gray-200 hover:border-[#2D2B7F]/50 text-gray-600"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep("details")}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] hover:from-[#232161] hover:to-[#3B39A6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#2D2B7F]/25"
                    >
                      <Calendar className="w-4 h-4" />
                      Continue
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </>
                )}

                {/* STEP 2 — Details */}
                {step === "details" && (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      You selected <strong>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</strong> at <strong>{selectedTime}</strong>
                    </p>

                    {/* Honeypot */}
                    <input
                      type="text"
                      name="_hp"
                      value={details._hp}
                      onChange={set("_hp")}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                    />

                    <div className="space-y-3 mb-5">
                      <input
                        type="text"
                        placeholder="Your full name *"
                        value={details.name}
                        onChange={set("name")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm"
                      />
                      <input
                        type="email"
                        placeholder="Your email *"
                        value={details.email}
                        onChange={set("email")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm"
                      />
                      <input
                        type="tel"
                        placeholder="Phone number (optional)"
                        value={details.phone}
                        onChange={set("phone")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm"
                      />
                      <select
                        value={details.serviceType}
                        onChange={set("serviceType")}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm bg-white"
                      >
                        <option value="">Select service type *</option>
                        {SERVICE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <textarea
                        placeholder="Additional notes (optional)"
                        value={details.notes}
                        onChange={set("notes")}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/20 outline-none transition-all text-sm resize-none"
                      />
                    </div>

                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setStep("schedule")}
                        className="px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirm}
                        disabled={loading || !details.name || !details.email || !details.serviceType}
                        className="flex-1 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] hover:from-[#232161] hover:to-[#3B39A6] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#2D2B7F]/25"
                      >
                        {loading ? (
                          <><Loader2 className="w-4 h-4 animate-spin" />Booking...</>
                        ) : (
                          <><Calendar className="w-4 h-4" />Confirm Booking</>
                        )}
                      </button>
                    </div>
                  </>
                )}

                {/* STEP 3 — Confirmed */}
                {step === "confirmed" && (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">You&apos;re Booked!</h4>
                    <p className="text-sm text-gray-500 mb-1">
                      Booking request confirmed for <strong>{new Date(selectedDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</strong> at <strong>{selectedTime}</strong>.
                    </p>
                    <p className="text-sm text-gray-400 mb-6">
                      Check <strong>{details.email}</strong> — a confirmation email is on its way.
                    </p>
                    <button
                      onClick={resetAndClose}
                      className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#2D2B7F] to-[#4A47C4] transition-all duration-200"
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* Error state */}
                {step === "error" && (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-7 h-7 text-red-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Something went wrong</h4>
                    <p className="text-sm text-gray-500 mb-5">{errorMsg}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setStep("details")}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                      >
                        Try Again
                      </button>
                      <a
                        href="mailto:hello@nolojia.com"
                        className="flex-1 py-3 rounded-xl bg-[#2D2B7F] text-white text-sm font-semibold text-center hover:bg-[#232161] transition-colors"
                      >
                        Email Us
                      </a>
                    </div>
                  </div>
                )}

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

// ─── Booking Nudge ─────────────────────────────────────────────────────────────

export function BookingNudge({ isVisible, onClose, onBook }: { isVisible: boolean; onClose: () => void; onBook: () => void }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
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

              <div className="p-4">
                <p className="font-semibold text-sm text-gray-900 mb-1">Book your 1:1 Discovery Session</p>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  500+ founders save 20+ hours/week. See what you can hand off first.
                </p>
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

// ─── Floating Trigger ─────────────────────────────────────────────────────────

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

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useBookingNudge() {
  const [nudgeVisible, setNudgeVisible] = useState(false)
  const [fullPopupOpen, setFullPopupOpen] = useState(false)

  const scheduleNextNudge = useCallback(() => {
    const delay = (25 + Math.random() * 30) * 1000
    const timer = setTimeout(() => {
      if (!fullPopupOpen) setNudgeVisible(true)
    }, delay)
    return timer
  }, [fullPopupOpen])

  useEffect(() => {
    const initialTimer = setTimeout(() => setNudgeVisible(true), 8000)
    return () => clearTimeout(initialTimer)
  }, [])

  useEffect(() => {
    if (!nudgeVisible && !fullPopupOpen) {
      const timer = scheduleNextNudge()
      return () => clearTimeout(timer)
    }
  }, [nudgeVisible, fullPopupOpen, scheduleNextNudge])

  const dismissNudge = () => setNudgeVisible(false)
  const openFullPopup = () => { setNudgeVisible(false); setFullPopupOpen(true) }
  const closeFullPopup = () => setFullPopupOpen(false)

  return { nudgeVisible, fullPopupOpen, dismissNudge, openFullPopup, closeFullPopup }
}
