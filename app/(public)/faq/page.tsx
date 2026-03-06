"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookingPopup } from "@/components/ui/booking-popup"
import { ArrowRight, ChevronDown, CalendarDays, Shield, Clock, Users, Zap } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

interface FAQItem { q: string; a: string }

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <div key={i}
          className="rounded-xl border border-gray-100 bg-white overflow-hidden hover:border-[#2D2B7F]/20 transition-colors duration-300 shadow-sm">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 text-left"
          >
            <span className="font-semibold text-gray-900 text-sm leading-relaxed pr-2">{q}</span>
            <ChevronDown className={`w-5 h-5 text-[#2D2B7F] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-gray-50 pt-4">{a}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

const faqSections = [
  {
    category: "Why Nolojia?",
    icon: Zap,
    items: [
      { q: "What makes a Nolojia assistant different from a regular virtual assistant?", a: "Nolojia assistants are dedicated, not shared — meaning you get one person who learns your business deeply and acts as a true operations partner. They're trained in AI-powered tools, follow custom playbooks built specifically for you, and are supported by a client success manager. A typical VA completes tasks. A Nolojia assistant anticipates them." },
      { q: "How do you find and vet your assistants?", a: "We recruit from the top 1% of applicants through a multi-stage process that includes skills assessments, communication evaluations, background clearances, and NDA agreements. Every assistant goes through our in-house training program — and they receive ongoing coaching, AI tool training, and monthly feedback reviews." },
      { q: "How do you ensure quality over time?", a: "Every client-assistant pairing is supported by a dedicated Client Success Manager who conducts monthly check-ins, reviews performance, and works with your assistant to create custom improvement plans. Your engagement is designed to get better, not plateau." },
    ],
  },
  {
    category: "Onboarding",
    icon: Clock,
    items: [
      { q: "How quickly can I get started?", a: "Most clients are fully paired and kicked off within 15 days or less. After your discovery call, we conduct a needs assessment within 72 hours, identify your ideal assistant match, and schedule your kickoff call. We're designed to move fast without cutting corners." },
      { q: "What does the onboarding process look like?", a: "Onboarding starts with a call where our team learns your business in depth — your tools, communication style, priorities, and pain points. We build a custom playbook for your assistant and run a structured introduction. The first two weeks focus on integration, with daily check-ins. By week four, you should feel fully handed off." },
      { q: "What do I need to prepare before starting?", a: "We recommend having a list of the tools you use and thinking about your top three recurring pain points. Plan for at least an hour of availability in the first two weeks — this upfront investment pays back tenfold as your assistant gets fully up to speed." },
    ],
  },
  {
    category: "Your Assistant",
    icon: Users,
    items: [
      { q: "What kinds of tasks can my assistant handle?", a: "Email triage and management, calendar scheduling and coordination, travel arrangements, data entry, CRM updates, research and reporting, document preparation, customer service support, social media management, vendor communication, and process documentation. If you can describe it clearly, your assistant can handle it." },
      { q: "Will I always work with the same person?", a: "Yes. You have one dedicated assistant who learns your business and works exclusively for you. We don't rotate assistants or share your time across multiple clients. Continuity is core to how we build trust." },
      { q: "What timezone will my assistant work in?", a: "We match assistants to your timezone or preferred working hours. During onboarding, we establish your communication windows and response expectations so there are no surprises. Most clients have full overlap during their core business hours." },
      { q: "What if I'm not happy with my assistant?", a: "We have a 4-week guarantee — if you're not fully integrated and satisfied within the first four weeks, we'll work with you to resolve it, including re-pairing you with a different assistant at no additional cost." },
    ],
  },
  {
    category: "Pricing & Billing",
    icon: Zap,
    items: [
      { q: "How does pricing work?", a: "We offer two core plans: Part-Time (80 hours/month) and Full-Time (160 hours/month), plus a custom Enterprise option. All plans include your dedicated assistant, client success manager, AI tools, and onboarding. Pricing is transparent and monthly — no hidden fees, no long-term lock-ins." },
      { q: "Is there a minimum commitment?", a: "No. We operate month-to-month because we believe our service should speak for itself. You can scale up, scale down, or pause — though in practice, the vast majority of clients stick around because the value compounds over time." },
      { q: "What happens if I need more hours than my plan covers?", a: "We'll give you advance notice when you're approaching your monthly limit. You can purchase additional hours at your current plan rate or upgrade to a higher tier. We don't cut your assistant off mid-task." },
    ],
  },
  {
    category: "Security & Privacy",
    icon: Shield,
    items: [
      { q: "How do you protect my data and business information?", a: "Every assistant signs a comprehensive NDA before starting any engagement. We conduct background clearances on all team members and operate under strict data privacy protocols. Tool access is managed via your own accounts with role-based permissions — we never store your credentials." },
      { q: "What devices and tools does my assistant use?", a: "Assistants use company-issued or verified personal devices with up-to-date security software. They access your tools through the accounts you authorize. We recommend using password managers like 1Password to share access securely, and can guide you through best practices during onboarding." },
      { q: "Can my assistant access sensitive financial information?", a: "Only what you explicitly authorize. We recommend granting access on a need-to-know basis and reviewing permissions during your playbook setup. Many clients share read-only access to financial dashboards for reporting, while keeping transactional access restricted." },
    ],
  },
]

export default function FAQPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ===== HERO — workspace bg ===== */}
      <section className="relative min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/workspace-overhead.png"
            alt="Modern workspace"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0E2E]/93 via-[#1A1849]/88 to-[#2D2B7F]/70" />
        </div>
        <div className="absolute top-16 right-[15%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />

        <div className="container mx-auto px-4 relative z-10 py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              FAQ
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Questions, Answered
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 leading-relaxed">
              Everything you need to know before working with Nolojia.
              Don&apos;t see your question? Book a call and ask us directly.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== QUICK STATS STRIP ===== */}
      <section className="py-8 bg-[#0F0E2E] border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-12">
            {[
              { label: "Start in 15 days or less", icon: Clock },
              { label: "93% first-match success", icon: Users },
              { label: "Top 1% of applicants", icon: Zap },
              { label: "NDA on every engagement", icon: Shield },
            ].map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                <Icon className="w-4 h-4 text-[#9996ED]" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTIONS — with side image ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        {/* Decorative image strips */}
        <div className="absolute top-0 left-0 w-[180px] h-full hidden xl:block">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50" />
        </div>

        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <div className="space-y-16">
            {faqSections.map(({ category, icon: Icon, items }, si) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#2D2B7F]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#2D2B7F]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#2D2B7F] uppercase tracking-wider">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  </div>
                </div>
                <FAQAccordion items={items} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STILL HAVE QUESTIONS — team-collaboration bg ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/team-collaboration.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>
        <div className="absolute top-10 right-[20%] w-48 h-48 bg-[#7773E7]/20 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
                Let&apos;s Talk
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Still Have Questions?</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                The best way to find out if Nolojia is right for you is to have a conversation.
                Book a free 30-minute call — no sales pressure, just honest answers.
              </p>
              <Button size="lg" onClick={() => setBookingOpen(true)}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl group">
                <CalendarDays className="w-5 h-5 mr-2" />
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Floating info cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { icon: Clock, title: "30-Minute Call", desc: "Focused, efficient, no fluff." },
                { icon: Users, title: "No Obligation", desc: "You ask, we answer. That's it." },
                { icon: Zap, title: "Same-Week Start Available", desc: "Ready to move? We are too." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="glass-dark rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#4A47C4]/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#BBB9F3]" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{title}</p>
                    <p className="text-white/50 text-xs">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
