"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useBookingNudge } from "@/components/ui/booking-popup"
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Clock,
  BarChart3,
  Headphones,
  Mail,
  CalendarDays,
  Briefcase,
  Star,
  ChevronRight,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export default function HomePage() {
  const { openFullPopup } = useBookingNudge()

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-assistant.png"
            alt="Professional assistant working"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/90 via-[#1A1849]/80 to-[#2D2B7F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 via-transparent to-transparent" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-[15%] w-72 h-72 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 left-[10%] w-56 h-56 bg-[#7773E7]/15 rounded-full blur-[80px] animate-float-delayed" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-white/90 mb-8 border border-white/10"
            >
              <Zap className="w-4 h-4 text-[#9996ED]" />
              AI-Powered Operations Partner
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
            >
              Do More by{" "}
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                  Doing Less
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-[#4A47C4]/30 -z-0 rounded" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed"
            >
              Top-tier AI and virtual assistants, proven playbooks, and dedicated support —
              so you can focus on growing your business, not running it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={() => openFullPopup()}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
              >
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/60 text-white bg-white/5 hover:bg-white/15 hover:border-white/80 text-base px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-sm text-white/40 flex items-center gap-4"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> No commitments
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Start in &lt; 1 week
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Guaranteed results
              </span>
            </motion.p>
          </div>

          {/* Floating Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4"
          >
            {[
              { value: "500+", label: "Founders Helped", icon: Users },
              { value: "20hrs", label: "Saved Weekly", icon: Clock },
              { value: "4.9★", label: "Client Rating", icon: Star },
            ].map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className="glass-dark rounded-xl px-5 py-4 text-white min-w-[180px] hover:bg-white/15 transition-all duration-300 cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#4A47C4]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#BBB9F3]" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{value}</div>
                    <div className="text-xs text-white/60">{label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="border-y bg-white py-8 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold text-muted-foreground mb-6 uppercase tracking-[0.2em]">
            Trusted by forward-thinking businesses
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-12 animate-marquee whitespace-nowrap">
              {["Startups", "Agencies", "E-commerce", "Consulting Firms", "Tech Companies", "SaaS Founders", "Startups", "Agencies", "E-commerce", "Consulting Firms", "Tech Companies", "SaaS Founders"].map((label, i) => (
                <span key={`${label}-${i}`} className="text-lg font-bold text-gray-300 tracking-wide flex-shrink-0 hover:text-[#2D2B7F] transition-colors duration-300">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLEM-SOLUTION ===== */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto"
          >
            {/* Text Side */}
            <div>
              <motion.span
                variants={fadeUp}
                custom={0}
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4"
              >
                The Problem
              </motion.span>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl font-bold mb-6 leading-tight text-gray-900"
              >
                You didn&apos;t start a business to drown in{" "}
                <span className="gradient-text">emails and admin work</span>.
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground leading-relaxed mb-8">
                Every hour on scheduling, inbox management, and repetitive tasks is an hour
                stolen from your vision. Nolojia gives you back your time with skilled assistants,
                AI-powered workflows, and an operations system that scales with you.
              </motion.p>

              <motion.div variants={fadeUp} custom={3} className="space-y-4">
                {[
                  { pain: "Inbox chaos", fix: "Managed & triaged daily" },
                  { pain: "Missed appointments", fix: "Calendar fully handled" },
                  { pain: "Slow turnaround", fix: "24-hour task completion" },
                  { pain: "Scaling costs", fix: "Flexible, no overhead" },
                ].map(({ pain, fix }) => (
                  <div key={pain} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#2D2B7F]/10 flex items-center justify-center group-hover:bg-[#2D2B7F] group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="w-4 h-4 text-[#2D2B7F] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="line-through text-muted-foreground text-sm mr-3">{pain}</span>
                      <span className="font-semibold text-gray-900">{fix}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Image Side */}
            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#2D2B7F]/10">
                <Image
                  src="/images/team-collaboration.png"
                  alt="Team collaborating on business operations"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2B7F]/20 to-transparent" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">20+ Hours</p>
                    <p className="text-xs text-muted-foreground">Saved per week</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT MAKES US DIFFERENT ===== */}
      <section className="py-24 bg-[#0F0E2E] text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7773E7]/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4"
            >
              Why Nolojia
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              What Makes Us Different
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              We&apos;re not just a staffing agency. We&apos;re your operations partner.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              { icon: Users, title: "Dedicated 1:1 Support", desc: "Your own assistant who learns your business, preferences, and workflows." },
              { icon: Zap, title: "AI-Powered Efficiency", desc: "Every assistant is equipped with AI tools to deliver results faster and smarter." },
              { icon: Shield, title: "4-Week Onboarding Guarantee", desc: "Fully integrated into your operations within 4 weeks — or we make it right." },
              { icon: Clock, title: "Start in Under a Week", desc: "No lengthy onboarding. We match you and get moving fast." },
              { icon: BarChart3, title: "No Minimum Commitments", desc: "Scale up or down as your business needs change. Full flexibility." },
              { icon: Shield, title: "Enterprise-Grade Security", desc: "Bank-level encryption and strict data privacy on every engagement." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group relative bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-[#4A47C4]/50 hover:bg-white/10 transition-all duration-500 cursor-default"
              >
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

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4"
            >
              Our Process
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              From first call to fully running — here&apos;s our proven process.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-5 gap-4"
          >
            {[
              { step: "01", title: "Discovery", desc: "Free 30-min call to understand your needs.", icon: Headphones },
              { step: "02", title: "Match & Kick-off", desc: "Paired with the right assistant in days.", icon: Users },
              { step: "03", title: "Playbook Setup", desc: "Documented workflows & preferences.", icon: Briefcase },
              { step: "04", title: "Full Integration", desc: "In your tools, handling daily tasks.", icon: Zap },
              { step: "05", title: "Optimization", desc: "Evolves as your business grows.", icon: BarChart3 },
            ].map(({ step, title, desc, icon: Icon }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                custom={i}
                className="relative group"
              >
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100 hover:border-[#2D2B7F]/30 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-500">
                  <div className="text-[#2D2B7F] font-bold text-xs tracking-widest mb-3">{step}</div>
                  <div className="w-11 h-11 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#2D2B7F] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
                {i < 4 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-gray-300 -translate-y-1/2 z-10" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICES OVERVIEW ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative image */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-10 pointer-events-none hidden lg:block">
          <Image
            src="/images/workspace-overhead.png"
            alt=""
            fill
            className="object-cover rounded-bl-[80px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4"
            >
              Our Services
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              What We Handle
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every task you offload is a task you never have to think about again.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              { icon: Mail, title: "Inbox & Communications", items: ["Email triage", "Draft responses", "Follow-ups", "Newsletter management"], gradient: "from-blue-500/10 to-indigo-500/10" },
              { icon: CalendarDays, title: "Scheduling & Calendar", items: ["Meeting scheduling", "Travel coordination", "Reminders", "Calendar optimization"], gradient: "from-purple-500/10 to-pink-500/10" },
              { icon: Briefcase, title: "Business Operations", items: ["Data entry", "Research & reports", "CRM updates", "Process documentation"], gradient: "from-amber-500/10 to-orange-500/10" },
              { icon: Headphones, title: "Customer Service", items: ["24/7 support coverage", "Query resolution", "Ticket management", "Client onboarding"], gradient: "from-green-500/10 to-teal-500/10" },
            ].map(({ icon: Icon, title, items, gradient }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`bg-gradient-to-br ${gradient} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#2D2B7F]" />
                  </div>
                  <h3 className="font-semibold text-base text-gray-900">{title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/services">
              <Button variant="outline" size="lg" className="rounded-xl border-2 border-[#2D2B7F]/50 text-[#2D2B7F] font-semibold hover:bg-[#2D2B7F]/8 hover:border-[#2D2B7F]/70">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4"
            >
              Testimonials
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real results from real businesses.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "My inbox went from a source of anxiety to completely under control. I actually look forward to Monday mornings now.",
                author: "Sarah K.",
                role: "Founder, E-commerce Brand",
                rating: 5,
              },
              {
                quote: "I was skeptical about delegating, but within two weeks my assistant knew my business better than some employees. Remarkable.",
                author: "James O.",
                role: "CEO, Consulting Firm",
                rating: 5,
              },
              {
                quote: "The AI-assisted workflows save us hours every single day. It's like having a whole ops team at a fraction of the cost.",
                author: "Priya M.",
                role: "Co-founder, SaaS Startup",
                rating: 5,
              },
            ].map(({ quote, author, role, rating }, i) => (
              <motion.div
                key={author}
                variants={fadeUp}
                custom={i}
                className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-lg transition-all duration-500 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, si) => (
                    <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed flex-1 mb-6">&ldquo;{quote}&rdquo;</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D2B7F] to-[#4A47C4] flex items-center justify-center text-white font-bold text-sm">
                    {author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{author}</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        {/* Background with image and gradient */}
        <div className="absolute inset-0">
          <Image
            src="/images/workspace-overhead.png"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>

        {/* Decorative */}
        <div className="absolute top-10 right-[20%] w-48 h-48 bg-[#7773E7]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-[15%] w-36 h-36 bg-[#4A47C4]/20 rounded-full blur-[60px]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Reclaim Your Time?
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto text-white/70 leading-relaxed">
              Book a free 30-minute discovery call. No pressure, no obligations — just a conversation
              about how we can help your business run better.
            </p>
            <Button
              size="lg"
              onClick={() => openFullPopup()}
              className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
            >
              <CalendarDays className="w-5 h-5 mr-2" />
              Book Your Free Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-6 text-sm text-white/40">
              Spots are limited — we only take on clients we can truly serve.
            </p>
          </motion.div>
        </div>
      </section>

    </>
  )
}
