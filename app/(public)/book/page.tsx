"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { BookingPopup } from "@/components/ui/booking-popup"
import { CheckCircle2, Clock, Users, Zap, Star, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function BookPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  // Auto-open the booking popup when landing on this page
  useEffect(() => {
    const timer = setTimeout(() => setBookingOpen(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-assistant.png" alt="Book a discovery call" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/92 via-[#1A1849]/85 to-[#2D2B7F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/50 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[10%] w-80 h-80 bg-[#4A47C4]/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 left-[5%] w-56 h-56 bg-[#7773E7]/15 rounded-full blur-[80px] animate-float-delayed" />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

            {/* Left — copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.span variants={fadeUp} custom={0}
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
                Free Discovery Call
              </motion.span>
              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                30 Minutes That Could Change How You Work
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 leading-relaxed mb-8">
                No pitch, no pressure. Just an honest conversation about your business, your challenges,
                and whether Nolojia is the right fit.
              </motion.p>

              {/* What to expect */}
              <motion.div variants={fadeUp} custom={3} className="space-y-4 mb-8">
                {[
                  { icon: Clock, text: "30 minutes, focused and efficient" },
                  { icon: Users, text: "Speak directly with our operations team" },
                  { icon: Zap, text: "Walk away with clarity, whether you sign up or not" },
                  { icon: CheckCircle2, text: "Zero obligation — seriously" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-white/70">
                    <div className="w-8 h-8 bg-[#4A47C4]/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#BBB9F3]" />
                    </div>
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} custom={4}>
                <Button
                  size="lg"
                  onClick={() => setBookingOpen(true)}
                  className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
                >
                  <CalendarDays className="w-5 h-5 mr-2" />
                  Pick a Time That Works For You
                </Button>
              </motion.div>
            </motion.div>

            {/* Right — social proof + testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-4"
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "500+", label: "Founders Helped" },
                  { value: "93%", label: "First-Match" },
                  { value: "4.9★", label: "Client Rating" },
                ].map(({ value, label }) => (
                  <div key={label} className="glass-dark rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              {[
                { quote: "The discovery call alone gave me clarity I'd been chasing for months. I signed up that same day.", author: "James O.", role: "CEO, Consulting Firm", initial: "J" },
                { quote: "I expected a sales pitch. Instead, I got a genuinely helpful conversation. That's when I knew this was different.", author: "Priya M.", role: "Co-founder, Stackline SaaS", initial: "P" },
              ].map(({ quote, author, role, initial }) => (
                <div key={author} className="glass-dark rounded-2xl p-5">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2D2B7F] to-[#4A47C4] flex items-center justify-center text-white font-bold text-xs">
                      {initial}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-xs">{author}</p>
                      <p className="text-white/40 text-xs">{role}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Guarantee note */}
              <div className="glass-dark rounded-2xl p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#9996ED] flex-shrink-0 mt-0.5" />
                <p className="text-white/60 text-xs leading-relaxed">
                  <span className="text-white font-semibold">Our 4-week guarantee: </span>
                  Fully integrated into your operations within 4 weeks — or we re-pair you at no cost.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
