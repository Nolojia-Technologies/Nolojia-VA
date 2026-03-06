"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookingPopup } from "@/components/ui/booking-popup"
import {
  ArrowRight, Mail, Phone, MapPin, Clock,
  CalendarDays, MessageSquare, Send, CheckCircle2,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: "", message: "" })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/workspace-overhead.png" alt="Contact Nolojia" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/93 via-[#1A1849]/88 to-[#2D2B7F]/70" />
        </div>
        <div className="absolute top-16 right-[15%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />

        <div className="container mx-auto px-4 relative z-10 py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Get In Touch
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let&apos;s Start a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                Conversation
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 leading-relaxed">
              Whether you have a question, want to learn more, or are ready to get started —
              we&apos;re here and happy to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover rounded-bl-[60px]" />
        </div>

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12">

            {/* Left — contact info */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
              className="space-y-6"
            >
              {/* Book a call card */}
              <motion.div variants={fadeUp} custom={0}
                className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image src="/images/team-collaboration.png" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0F0E2E]/90 to-[#2D2B7F]/85" />
                <div className="relative z-10 p-6">
                  <CalendarDays className="w-8 h-8 text-[#9996ED] mb-3" />
                  <h3 className="font-bold text-xl text-white mb-2">Book a Discovery Call</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    The fastest way to find out if Nolojia is right for you. Free, 30 minutes, no obligation.
                  </p>
                  <Button onClick={() => setBookingOpen(true)}
                    className="bg-white text-[#2D2B7F] hover:bg-white/90 rounded-xl font-semibold group w-full">
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>

              {/* Contact details */}
              <motion.div variants={fadeUp} custom={1} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
                {[
                  { icon: Mail, label: "Email Us", value: "hello@nolojia.com", desc: "We reply within 24 hours" },
                  { icon: Phone, label: "Call Us", value: "+1 (800) NOLOJIA", desc: "Mon–Fri, 9am–6pm EST" },
                  { icon: MapPin, label: "Headquarters", value: "Global Operations", desc: "Serving clients in 6+ countries" },
                  { icon: Clock, label: "Response Time", value: "Under 24 hours", desc: "For all inquiries" },
                ].map(({ icon: Icon, label, value, desc }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2D2B7F]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                      <p className="font-semibold text-gray-900 text-sm">{value}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Response promise */}
              <motion.div variants={fadeUp} custom={2}
                className="bg-[#2D2B7F]/5 border border-[#2D2B7F]/10 rounded-2xl p-5">
                <MessageSquare className="w-6 h-6 text-[#2D2B7F] mb-2" />
                <p className="text-sm text-gray-700 leading-relaxed">
                  <span className="font-semibold">We read every message.</span> You&apos;ll hear from a real person on our team — not a bot — within one business day.
                </p>
              </motion.div>
            </motion.div>

            {/* Right — contact form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Thanks for reaching out. A member of our team will be in touch within one business day.
                  </p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", subject: "", message: "" }) }}
                    variant="outline" className="rounded-xl border-2 border-[#2D2B7F]/50 text-[#2D2B7F] font-semibold hover:bg-[#2D2B7F]/8 hover:border-[#2D2B7F]/70">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
                    <p className="text-muted-foreground text-sm">Fill out the form and we&apos;ll be in touch shortly.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name *</label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Jane Smith"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Work Email *</label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          placeholder="jane@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Company / Business Name</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Subject *</label>
                      <select
                        required
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all bg-white"
                      >
                        <option value="">Select a topic...</option>
                        <option value="general">General Inquiry</option>
                        <option value="services">Services & Plans</option>
                        <option value="pricing">Pricing Question</option>
                        <option value="partnership">Partnership Opportunity</option>
                        <option value="support">Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Tell us what's on your mind..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2D2B7F] focus:ring-2 focus:ring-[#2D2B7F]/10 transition-all resize-none"
                      />
                    </div>
                    <Button type="submit" size="lg"
                      className="w-full bg-[#2D2B7F] hover:bg-[#232161] text-white rounded-xl font-semibold group">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form you agree to our{" "}
                      <a href="/privacy" className="text-[#2D2B7F] hover:underline">Privacy Policy</a>.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== QUICK CTA ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl font-bold text-white mb-3">Prefer to Talk?</h2>
            <p className="text-white/60 mb-8">Skip the form — book a call directly and let&apos;s have a real conversation.</p>
            <Button size="lg" onClick={() => setBookingOpen(true)}
              className="bg-white text-[#2D2B7F] hover:bg-white/90 px-8 py-6 rounded-xl font-semibold group">
              <CalendarDays className="w-5 h-5 mr-2" />
              Book a Free Discovery Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
