"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookingPopup } from "@/components/ui/booking-popup"
import {
  ArrowRight, Users, Clock, Star, Heart, MessageSquare,
  Shield, Zap, Eye, CalendarDays, Check, X,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ===== HERO — team-collaboration bg ===== */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-collaboration.png"
            alt="Our team collaborating"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/92 via-[#1A1849]/85 to-[#2D2B7F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/70 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[15%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-16 left-[10%] w-48 h-48 bg-[#7773E7]/15 rounded-full blur-[80px] animate-float-delayed" />

        <div className="container mx-auto px-4 relative z-10 py-28 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Free Time and Peace of Mind —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                For Every Founder
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-white/60 leading-relaxed max-w-2xl mx-auto">
              We built Nolojia because we watched too many talented founders drown in tasks
              that had nothing to do with their vision. We decided to fix that.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== KEY METRICS — image strip behind ===== */}
      <section className="py-16 bg-white border-b relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center"
          >
            {[
              { value: "500+", label: "Founders Helped", icon: Users, desc: "Across 20+ industries and 6 countries" },
              { value: "93%", label: "First-Match Success", icon: Star, desc: "Clients paired right the first time" },
              { value: "20hrs", label: "Saved Per Week", icon: Clock, desc: "Average time reclaimed per client" },
            ].map(({ value, label, icon: Icon, desc }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i} className="group">
                <div className="w-16 h-16 bg-[#2D2B7F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                  <Icon className="w-7 h-7 text-[#2D2B7F] group-hover:text-white transition-colors" />
                </div>
                <div className="text-4xl font-bold text-[#2D2B7F] mb-1">{value}</div>
                <div className="font-semibold text-gray-900 mb-1">{label}</div>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== OUR STORY — workspace image right ===== */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text + Timeline */}
            <div>
              <motion.span variants={fadeUp} custom={0}
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
                How We Started
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-6 text-gray-900 leading-tight">
                So, What&apos;s Our Story?
              </motion.h2>
              <motion.div variants={fadeUp} custom={2}
                className="space-y-4 text-muted-foreground text-lg leading-relaxed mb-10">
                <p>
                  Nolojia was born from a simple observation: the best founders we knew weren&apos;t failing
                  because of bad ideas. They were failing because they couldn&apos;t get out from under the
                  operational weight of running a business.
                </p>
                <p>
                  So we built a different kind of operation — one that pairs world-class assistants with
                  AI-powered tools and proven playbooks, creating a system that learns your business
                  and scales with it.
                </p>
              </motion.div>

              {/* Timeline */}
              <motion.div variants={fadeUp} custom={3}>
                {[
                  { year: "2018", title: "The Idea", desc: "Watching founders struggle sparked the concept for a smarter assistant service." },
                  { year: "2020", title: "First Clients", desc: "93% of our first cohort matched with the right assistant on the very first pairing." },
                  { year: "2022", title: "AI Integration", desc: "AI-powered tools doubled the output of every assistant on our platform." },
                  { year: "2025", title: "500+ Founders", desc: "Nolojia now powers operations across 6 countries and 20+ industries." },
                ].map(({ year, title, desc }, i, arr) => (
                  <div key={year} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#2D2B7F]/10 border-2 border-[#2D2B7F]/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2D2B7F] font-bold text-xs">{year}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-0.5 h-10 bg-[#2D2B7F]/10 my-1" />}
                    </div>
                    <div className="pt-2 pb-6">
                      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image with floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#2D2B7F]/15">
                <Image
                  src="/images/workspace-overhead.png"
                  alt="Nolojia workspace"
                  width={600}
                  height={550}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/40 to-transparent" />
              </div>
              {/* Floating card bottom-left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Star className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">93% Match Rate</p>
                    <p className="text-xs text-muted-foreground">First-time pairing</p>
                  </div>
                </div>
              </motion.div>
              {/* Floating card top-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#2D2B7F]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">500+ Founders</p>
                    <p className="text-xs text-muted-foreground">Trust Nolojia</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== CORE VALUES — dark bg with hero image watermark ===== */}
      <section className="py-24 bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover opacity-[0.04]" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7773E7]/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              What Drives Us
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">Our Core Values</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              These aren&apos;t slogans on a wall. They&apos;re how we make every decision, every day.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: MessageSquare, title: "Communication Mastery", desc: "We say the hard things when needed — with clients, our team, and in every interaction we manage on your behalf." },
              { icon: Users, title: "We Know Our People", desc: "Every assistant is more than a resource. We invest deeply in their strengths, growth, and the right match." },
              { icon: Zap, title: "Proactive Leadership", desc: "We don't wait to be asked. Great assistants anticipate, act, and stay two steps ahead." },
              { icon: Shield, title: "Honesty & Integrity", desc: "We tell the truth, even when it costs us. Trust is the foundation of every client relationship." },
              { icon: Heart, title: "Making Client Magic", desc: "We're not satisfied with good enough. We push for the moment a client says, 'I don't know how I worked without you.'" },
              { icon: Eye, title: "Relentless Attention to Detail", desc: "The small things are the big things. We build systems to make sure nothing falls through the cracks." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#4A47C4]/50 hover:bg-white/10 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4A47C4]/30 to-[#7773E7]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-[#BBB9F3]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TEAM — workspace bg ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-tl-[60px]" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              The Team
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">The People Behind Nolojia</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Operators, builders, and people-people who care deeply about doing great work.
            </motion.p>
          </motion.div>

          {/* Wide team photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl overflow-hidden shadow-xl shadow-[#2D2B7F]/10 mb-12"
          >
            <Image
              src="/images/team-collaboration.png"
              alt="The Nolojia team"
              width={1200}
              height={400}
              className="w-full h-64 object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/50 via-transparent to-[#0F0E2E]/50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-dark rounded-2xl px-8 py-4 text-center">
                <p className="text-white font-bold text-lg">A global team, united by one mission.</p>
                <p className="text-white/60 text-sm mt-1">Helping founders do more by doing less.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Alex N.", title: "Founder & CEO", initial: "A", color: "from-[#2D2B7F] to-[#4A47C4]" },
              { name: "Robin M.", title: "Chief of Operations", initial: "R", color: "from-[#4A47C4] to-[#7773E7]" },
              { name: "Priya S.", title: "Head of Client Success", initial: "P", color: "from-[#7773E7] to-[#9996ED]" },
              { name: "James T.", title: "Head of AI & Automation", initial: "J", color: "from-[#2D2B7F] to-[#4A47C4]" },
              { name: "Chloe A.", title: "Senior Executive Assistant", initial: "C", color: "from-[#4A47C4] to-[#7773E7]" },
              { name: "David O.", title: "Business Development", initial: "D", color: "from-[#7773E7] to-[#9996ED]" },
              { name: "Sofia L.", title: "Lead Trainer", initial: "S", color: "from-[#2D2B7F] to-[#4A47C4]" },
              { name: "Marcus B.", title: "Product & Systems", initial: "M", color: "from-[#4A47C4] to-[#7773E7]" },
            ].map(({ name, title, initial, color }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i} className="group text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#2D2B7F]/20`}>
                  {initial}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== COMPARISON — collaboration image ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-[40%] hidden lg:block">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              The Difference
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">Why Founders Choose Nolojia</motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-white"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-5 font-semibold text-gray-500 w-1/2">What to Expect</th>
                  <th className="p-5 font-bold text-[#2D2B7F] text-center">Nolojia</th>
                  <th className="p-5 font-medium text-gray-400 text-center">Freelance VA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Vetted, trained, dedicated assistant", nolojia: true, other: false },
                  { feature: "AI tools layered on top of every task", nolojia: true, other: false },
                  { feature: "Client success manager included", nolojia: true, other: false },
                  { feature: "Custom workflow playbook built for you", nolojia: true, other: false },
                  { feature: "Guaranteed 4-week full integration", nolojia: true, other: false },
                  { feature: "Backup coverage if assistant is unavailable", nolojia: true, other: false },
                  { feature: "No minimum contract", nolojia: true, other: false },
                  { feature: "Human assistance available", nolojia: true, other: true },
                ].map(({ feature, nolojia, other }, i) => (
                  <tr key={feature} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                    <td className="p-5 text-gray-700">{feature}</td>
                    <td className="p-5 text-center">{nolojia ? <Check className="w-5 h-5 text-[#2D2B7F] mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                    <td className="p-5 text-center">{other ? <Check className="w-5 h-5 text-gray-400 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA — hero-assistant bg ===== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>
        <div className="absolute top-10 right-[20%] w-48 h-48 bg-[#7773E7]/20 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Let&apos;s Build Something Together</h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Book a free 30-minute discovery call and let&apos;s talk about transforming your daily operations.
            </p>
            <Button size="lg" onClick={() => setBookingOpen(true)}
              className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group">
              <CalendarDays className="w-5 h-5 mr-2" />
              Book Your Free Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
