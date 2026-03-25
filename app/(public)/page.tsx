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
  CalendarDays,
  Briefcase,
  Star,
  ChevronRight,
  Linkedin,
  TrendingUp,
  Palette,
  Code2,
  DollarSign,
  MessageSquare,
  Globe,
  AlertCircle,
  XCircle,
  Target,
  Layers,
  Award,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

export default function HomePage() {
  const { openFullPopup } = useBookingNudge()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-assistant.png"
            alt="Professional business operations team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 via-[#1A1849]/85 to-[#2D2B7F]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[12%] w-80 h-80 bg-[#4A47C4]/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-16 left-[8%] w-60 h-60 bg-[#7773E7]/15 rounded-full blur-[90px]" />

        <div className="container mx-auto px-4 relative z-10 py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-5 py-2 text-sm font-medium text-white/90 mb-8 border border-white/15"
            >
              <Zap className="w-4 h-4 text-[#9996ED]" />
              AI-Powered Operations Partner
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-[4.5rem] font-bold tracking-tight text-white mb-6 leading-[1.08]"
            >
              Scale Your Business
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#C4C2F8]">
                Without Scaling
              </span>{" "}
              Your Workload
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-white/65 mb-10 max-w-2xl leading-relaxed"
            >
              Nolojia provides AI-powered virtual teams and operational support to help businesses
              run more efficiently, reduce workload, and focus on growth.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button
                size="lg"
                onClick={() => openFullPopup()}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
              >
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white bg-white/5 hover:bg-white/12 hover:border-white/75 text-base px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  Explore Services
                </Button>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm text-white/60 font-medium">4.9 / 5</span>
              </div>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-sm text-white/55 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9996ED]" />
                Trusted by growing businesses
              </span>
              <div className="w-px h-4 bg-white/20" />
              <span className="text-sm text-white/55 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#9996ED]" />
                Global remote support
              </span>
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4"
          >
            {[
              { value: "500+", label: "Businesses Supported", icon: Users },
              { value: "20hrs", label: "Saved Per Week", icon: Clock },
              { value: "4.9★", label: "Client Satisfaction", icon: Star },
            ].map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.15 }}
                className="glass-dark rounded-xl px-5 py-4 text-white min-w-[190px] hover:bg-white/12 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#4A47C4]/30 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#BBB9F3]" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">{value}</div>
                    <div className="text-xs text-white/55">{label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BAR ────────────────────────────────────────────────────────── */}
      <section className="border-y bg-white py-7 overflow-hidden">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-semibold text-muted-foreground mb-5 uppercase tracking-[0.2em]">
            Companies like yours are scaling with remote teams
          </p>
          <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-14 animate-marquee whitespace-nowrap">
              {[
                "Startups", "Agencies", "E-commerce Brands", "Consulting Firms",
                "Tech Companies", "SaaS Founders", "Real Estate Firms", "Law Firms",
                "Startups", "Agencies", "E-commerce Brands", "Consulting Firms",
                "Tech Companies", "SaaS Founders", "Real Estate Firms", "Law Firms",
              ].map((label, i) => (
                <span key={`${label}-${i}`} className="text-base font-bold text-gray-300 tracking-wide flex-shrink-0 hover:text-[#2D2B7F] transition-colors duration-300">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              The Challenge
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
              Running a Business Shouldn&apos;t<br className="hidden md:block" /> Feel Overwhelming
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Many businesses struggle not because of strategy, but because of{" "}
              <strong className="text-gray-700">operational overload</strong>.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14"
          >
            {[
              {
                icon: Layers,
                title: "Too Many Operational Tasks",
                desc: "Founders spend 60%+ of their week on admin work instead of strategy and growth.",
                color: "bg-red-50 border-red-100",
                iconColor: "bg-red-100 text-red-600",
              },
              {
                icon: Clock,
                title: "Slow Execution",
                desc: "Without dedicated support, tasks pile up, deadlines slip, and clients notice.",
                color: "bg-orange-50 border-orange-100",
                iconColor: "bg-orange-100 text-orange-600",
              },
              {
                icon: AlertCircle,
                title: "Overloaded Internal Teams",
                desc: "Your best people are buried in repetitive work instead of high-impact projects.",
                color: "bg-amber-50 border-amber-100",
                iconColor: "bg-amber-100 text-amber-600",
              },
              {
                icon: XCircle,
                title: "Missed Opportunities",
                desc: "Lack of bandwidth means deals, partnerships, and growth moments get left behind.",
                color: "bg-rose-50 border-rose-100",
                iconColor: "bg-rose-100 text-rose-600",
              },
            ].map(({ icon: Icon, title, desc, color, iconColor }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className={`rounded-2xl p-6 border ${color} hover:shadow-md transition-all duration-300`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-base">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-[#0F0E2E] rounded-2xl px-8 py-10 max-w-3xl mx-auto"
          >
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              The solution isn&apos;t working more hours.{" "}
              <span className="text-white font-semibold">
                It&apos;s building a smarter operation.
              </span>
            </p>
            <Button
              onClick={() => openFullPopup()}
              className="bg-white text-[#2D2B7F] hover:bg-white/90 font-semibold px-7 py-3 rounded-xl group"
            >
              See How We Help
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── SOLUTION SECTION ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center mb-16"
          >
            <div>
              <motion.span variants={fadeUp} custom={0}
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
                The Solution
              </motion.span>
              <motion.h2 variants={fadeUp} custom={1}
                className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
                A Smarter Way to<br />Run Your Business
              </motion.h2>
              <motion.p variants={fadeUp} custom={2}
                className="text-lg text-muted-foreground leading-relaxed mb-8">
                Nolojia combines skilled remote professionals with AI-powered workflows to handle
                your operations efficiently — so you can focus entirely on growth.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="space-y-3">
                {[
                  "Dedicated professionals matched to your business",
                  "AI-enhanced workflows for faster, smarter execution",
                  "Seamless integration into your existing tools",
                  "Scalable capacity as your business grows",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#2D2B7F] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUp} custom={2} className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#2D2B7F]/10">
                <Image
                  src="/images/team-collaboration.png"
                  alt="Nolojia remote team in action"
                  width={600}
                  height={440}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2B7F]/20 to-transparent rounded-2xl" />
              </div>
              <div className="absolute -bottom-5 -left-5 glass rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">20+ Hours</p>
                    <p className="text-xs text-muted-foreground">Reclaimed per week</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 6 Categories */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: Users, label: "Virtual Assistants", desc: "Executive support, admin, scheduling, and inbox management." },
              { icon: Headphones, label: "Customer Support Teams", desc: "Responsive, professional support across channels 24/7." },
              { icon: Palette, label: "Design & Creative Services", desc: "Graphics, branding, video, and social media visuals." },
              { icon: TrendingUp, label: "Marketing & Growth Support", desc: "Content, SEO, lead generation, and social media growth." },
              { icon: Code2, label: "Web & Product Development", desc: "Websites, apps, automations, and digital infrastructure." },
              { icon: DollarSign, label: "Financial & Data Support", desc: "Bookkeeping, reporting, analysis, and financial admin." },
            ].map(({ icon: Icon, label, desc }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#2D2B7F]/25 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-400">
                <div className="w-12 h-12 bg-[#2D2B7F]/8 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#2D2B7F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Our Process
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              From first conversation to fully running — four steps is all it takes.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-5"
          >
            {[
              { step: "01", icon: Target, title: "Choose Your Service", desc: "Select a service or plan that fits your business needs and goals." },
              { step: "02", icon: Briefcase, title: "Submit Your Tasks", desc: "Delegate work through your preferred tools — Slack, Notion, email, or our portal." },
              { step: "03", icon: Zap, title: "We Execute", desc: "Your dedicated team handles execution with speed, accuracy, and care." },
              { step: "04", icon: BarChart3, title: "Review & Scale", desc: "Review results, refine workflows, and scale your support as you grow." },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div key={step} variants={fadeUp} custom={i} className="relative group">
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100 hover:border-[#2D2B7F]/30 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-400">
                  <div className="text-[#2D2B7F] font-bold text-xs tracking-widest mb-4">{step}</div>
                  <div className="w-11 h-11 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                    <Icon className="w-5 h-5 text-[#2D2B7F] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-base mb-2 text-gray-900">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
                {i < 3 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-3 w-5 h-5 text-gray-300 -translate-y-1/2 z-10" />
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => openFullPopup()}
              className="bg-[#2D2B7F] hover:bg-[#232161] text-white font-semibold px-8 py-3 rounded-xl group shadow-lg shadow-[#2D2B7F]/20"
            >
              Start Today — Book a Free Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7773E7]/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Why Nolojia
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-bold mb-4">
              Why CEOs Choose Nolojia
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/55 text-lg max-w-2xl mx-auto">
              We&apos;re not a staffing platform. We&apos;re your operations partner.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16"
          >
            {[
              { icon: Layers, title: "Reduce Operational Workload", desc: "Delegate repetitive tasks and free up 20+ hours per week for what actually drives your business forward." },
              { icon: Zap, title: "AI-Supported Workflows", desc: "Every specialist is equipped with AI tools that deliver results faster, smarter, and with greater accuracy." },
              { icon: Globe, title: "Global Skilled Professionals", desc: "Access a vetted network of top-tier remote talent across operations, creative, tech, and finance." },
              { icon: TrendingUp, title: "Scale Without Hiring", desc: "Add capacity when you need it without the overhead, HR headaches, or long onboarding cycles of full-time hires." },
              { icon: Target, title: "Focus on Strategy & Growth", desc: "When operations run themselves, you can lead, sell, and build rather than manage day-to-day execution." },
              { icon: Award, title: "Proven, Reliable Delivery", desc: "Consistent quality, clear accountability, and a team that treats your business as their own." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#4A47C4]/50 hover:bg-white/8 transition-all duration-400">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4A47C4]/30 to-[#7773E7]/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#BBB9F3]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10"
          >
            {[
              { value: "500+", label: "Businesses Supported" },
              { value: "20hrs", label: "Saved Per Week" },
              { value: "4.9 / 5", label: "Client Satisfaction" },
              { value: "<7 days", label: "Time to Onboard" },
            ].map(({ value, label }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i}
                className="bg-white/5 px-8 py-7 text-center hover:bg-white/8 transition-colors">
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-white/45">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES SNAPSHOT ────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Our Services
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Everything Your Business Needs
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              One partner. Every function. Fully handled.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12"
          >
            {[
              {
                icon: Users,
                title: "Virtual Assistant Services",
                items: ["Executive support", "Inbox & calendar management", "Research & data entry"],
                href: "/services#virtual-ops",
                gradient: "from-blue-500/10 to-indigo-500/10",
              },
              {
                icon: Headphones,
                title: "Customer Support",
                items: ["Multi-channel support", "Ticket management", "Client onboarding"],
                href: "/services#virtual-ops",
                gradient: "from-violet-500/10 to-purple-500/10",
              },
              {
                icon: TrendingUp,
                title: "Digital Marketing",
                items: ["SEO & content", "Social media growth", "Lead generation"],
                href: "/services#marketing",
                gradient: "from-emerald-500/10 to-teal-500/10",
              },
              {
                icon: Palette,
                title: "Graphic Design",
                items: ["Brand identity", "Social media visuals", "Presentations & decks"],
                href: "/services#creative",
                gradient: "from-pink-500/10 to-rose-500/10",
              },
              {
                icon: Code2,
                title: "Web Development",
                items: ["Website design & build", "E-commerce stores", "Automations & integrations"],
                href: "/services#web-dev",
                gradient: "from-amber-500/10 to-orange-500/10",
              },
              {
                icon: DollarSign,
                title: "Financial Analysis",
                items: ["Bookkeeping support", "Financial reporting", "Budget tracking"],
                href: "/services#financial",
                gradient: "from-sky-500/10 to-cyan-500/10",
              },
            ].map(({ icon: Icon, title, items, href, gradient }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-400">
                <div className={`bg-gradient-to-br ${gradient} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[#2D2B7F]" />
                  </div>
                  <h3 className="font-bold text-base text-gray-900">{title}</h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2.5 mb-5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={href}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-[#2D2B7F] hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/services">
              <Button variant="outline" size="lg"
                className="rounded-xl border-2 border-[#2D2B7F]/40 text-[#2D2B7F] font-semibold hover:bg-[#2D2B7F]/5 hover:border-[#2D2B7F]/70">
                View All Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Client Results
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              What Our Clients Say
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Real results from real business owners.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                quote: "My inbox went from a source of anxiety to completely under control. I actually look forward to Monday mornings now. The ROI is undeniable.",
                author: "Sarah K.",
                role: "Founder, E-commerce Brand",
                result: "20hrs saved weekly",
              },
              {
                quote: "I was skeptical about delegating, but within two weeks my assistant knew my business better than some full-time employees. Remarkable quality.",
                author: "James O.",
                role: "CEO, Consulting Firm",
                result: "40% cost reduction",
              },
              {
                quote: "The AI-assisted workflows save us hours every single day. It's like having a complete ops team at a fraction of the cost of one hire.",
                author: "Priya M.",
                role: "Co-founder, SaaS Startup",
                result: "3x faster execution",
              },
            ].map(({ quote, author, role, result }, i) => (
              <motion.div key={author} variants={fadeUp} custom={i}
                className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-400 flex flex-col">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                    {result}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed flex-1 mb-6 text-sm">&ldquo;{quote}&rdquo;</p>
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

      {/* ── PRICING / MODEL ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Pricing
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Flexible Plans for Growing Businesses
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Monthly subscriptions, scalable support, and dedicated teams — no long-term contracts.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 mb-10"
          >
            {[
              {
                tier: "Starter",
                tagline: "For solopreneurs & small teams",
                features: [
                  "1 dedicated specialist",
                  "Core admin & operations",
                  "Up to 40 tasks/month",
                  "Email & chat support",
                  "Weekly progress report",
                ],
                cta: "Book a Consultation",
                highlight: false,
              },
              {
                tier: "Growth",
                tagline: "For scaling businesses",
                features: [
                  "2–3 dedicated specialists",
                  "Multi-service support",
                  "Unlimited task requests",
                  "Priority support & Slack",
                  "Dedicated account manager",
                  "Bi-weekly strategy call",
                ],
                cta: "Book a Consultation",
                highlight: true,
                badge: "Most Popular",
              },
              {
                tier: "Pro",
                tagline: "For high-growth operations",
                features: [
                  "Full operations team",
                  "All services included",
                  "Unlimited tasks & capacity",
                  "24/7 priority support",
                  "AI workflow buildout",
                  "Monthly executive review",
                ],
                cta: "Book a Consultation",
                highlight: false,
              },
            ].map(({ tier, tagline, features, cta, highlight, badge }) => (
              <motion.div
                key={tier}
                variants={fadeUp}
                custom={0}
                className={`relative rounded-2xl overflow-hidden border transition-all duration-400 ${
                  highlight
                    ? "bg-[#2D2B7F] border-[#4A47C4] shadow-2xl shadow-[#2D2B7F]/30 scale-[1.02]"
                    : "bg-white border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5"
                }`}
              >
                {badge && (
                  <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 bg-white/20 text-white rounded-full border border-white/30">
                    {badge}
                  </div>
                )}
                <div className="p-7">
                  <h3 className={`text-xl font-bold mb-1 ${highlight ? "text-white" : "text-gray-900"}`}>{tier}</h3>
                  <p className={`text-sm mb-7 ${highlight ? "text-white/60" : "text-muted-foreground"}`}>{tagline}</p>
                  <ul className="space-y-3 mb-8">
                    {features.map((f) => (
                      <li key={f} className={`flex items-center gap-2.5 text-sm ${highlight ? "text-white/80" : "text-gray-600"}`}>
                        <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${highlight ? "text-white/70" : "text-[#2D2B7F]"}`} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => openFullPopup()}
                    className={`w-full font-semibold py-3 rounded-xl ${
                      highlight
                        ? "bg-white text-[#2D2B7F] hover:bg-white/90 shadow-lg"
                        : "bg-[#2D2B7F] text-white hover:bg-[#232161] shadow-md shadow-[#2D2B7F]/20"
                    }`}
                  >
                    {cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-sm text-muted-foreground"
          >
            All plans are monthly. Cancel or adjust anytime. Custom enterprise plans available.{" "}
            <button onClick={() => openFullPopup()} className="text-[#2D2B7F] font-semibold hover:underline">
              Book a consultation for custom pricing →
            </button>
          </motion.p>
        </div>
      </section>

      {/* ── FOUNDER SECTION ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-10 left-[10%] w-64 h-64 bg-[#4A47C4]/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row items-center gap-10 bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-[#2D2B7F]/5">
              <div className="relative flex-shrink-0">
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-2xl overflow-hidden shadow-lg relative">
                  <Image
                    src="/images/founder-shaun.jpg"
                    alt="Shaun Daniel Machua — Founder & CEO, Nolojia"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#4A47C4]/20 to-[#7773E7]/10 rounded-xl -z-10" />
              </div>
              <div className="text-center md:text-left flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-3">Our Founder</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Shaun Daniel Machua</h3>
                <p className="text-[#2D2B7F] font-semibold text-sm mb-4">Founder &amp; CEO</p>
                <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                  Shaun founded Nolojia with a clear mission: help entrepreneurs and growing
                  businesses achieve more by offloading operations to expert professionals and
                  AI-powered workflows — so they can focus entirely on what matters.
                </p>
                <a
                  href="https://www.linkedin.com/in/shaun-daniel-machua-44a528216"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#004182] transition-all duration-300 hover:shadow-lg hover:shadow-[#0A66C2]/25 group"
                >
                  <Linkedin className="w-4 h-4" />
                  Connect on LinkedIn
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/97 to-[#2D2B7F]/92" />
        </div>
        <div className="absolute top-12 right-[18%] w-52 h-52 bg-[#7773E7]/20 rounded-full blur-[90px]" />
        <div className="absolute bottom-12 left-[12%] w-40 h-40 bg-[#4A47C4]/20 rounded-full blur-[70px]" />

        <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-5">
              Get Started Today
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 leading-tight">
              Focus on Growth.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#C4C2F8]">
                We Handle
              </span>{" "}
              the Operations.
            </h2>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              Let Nolojia support your business with the systems, people, and tools needed
              to scale efficiently — without adding overhead or losing control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => openFullPopup()}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
              >
                <CalendarDays className="w-5 h-5 mr-2" />
                Book a Free Consultation
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/50 text-white bg-white/5 hover:bg-white/12 hover:border-white/75 text-base px-8 py-6 rounded-xl w-full sm:w-auto"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
            <p className="mt-7 text-sm text-white/35">
              No commitments · Start in under a week · Spots are limited
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
