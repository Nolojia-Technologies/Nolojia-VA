"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  Users,
  Zap,
  Shield,
  Heart,
  Globe,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Star,
} from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
}

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const openRoles = [
  {
    title: "Executive Virtual Assistant",
    department: "VA Services",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Support high-growth founders and executives with inbox management, calendar ownership, travel coordination, and day-to-day task execution. You'll be the right hand of a busy leader.",
    requirements: [
      "3+ years of experience as a VA or executive assistant",
      "Exceptional written and verbal communication in English",
      "Proficiency with tools like Google Workspace, Notion, Slack, and Zoom",
      "Strong organizational skills and attention to detail",
      "Ability to work independently and manage competing priorities",
    ],
    niceToHave: [
      "Experience with CRM tools (HubSpot, Salesforce, etc.)",
      "Familiarity with AI productivity tools",
      "Background supporting startup founders or C-suite executives",
    ],
  },
  {
    title: "E-commerce Virtual Assistant",
    department: "VA Services",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Manage day-to-day e-commerce operations for clients — from product listings and order processing to customer service and inventory tracking across platforms like Shopify, Amazon, and Etsy.",
    requirements: [
      "2+ years of experience in e-commerce operations",
      "Hands-on experience with Shopify, Amazon Seller Central, or similar platforms",
      "Strong customer service skills and attention to order accuracy",
      "Ability to manage multiple client stores simultaneously",
      "Comfortable with data entry and inventory management",
    ],
    niceToHave: [
      "Experience with e-commerce analytics and reporting",
      "Knowledge of SEO for product listings",
      "Familiarity with fulfilment tools like ShipStation or Linnworks",
    ],
  },
  {
    title: "Social Media Virtual Assistant",
    department: "Creative Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Plan, create, and schedule content across multiple social platforms for our clients. You'll manage community engagement, track performance, and help brands grow their presence consistently.",
    requirements: [
      "2+ years managing social media for brands or businesses",
      "Strong copywriting skills and a keen eye for aesthetics",
      "Experience with scheduling tools like Buffer, Later, or Hootsuite",
      "Understanding of platform algorithms and content best practices",
      "Ability to maintain a consistent brand voice across channels",
    ],
    niceToHave: [
      "Graphic design skills (Canva or Adobe tools)",
      "Experience with paid social advertising",
      "Video editing or short-form video production experience",
    ],
  },
  {
    title: "Content Writer & Copywriter",
    department: "Creative Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Write compelling blog posts, website copy, email sequences, and marketing content for a range of clients. You'll work closely with client briefs to produce content that converts and connects.",
    requirements: [
      "3+ years of professional copywriting or content writing experience",
      "Exceptional command of English grammar, tone, and style",
      "Ability to adapt writing voice for different brands and audiences",
      "Experience with SEO fundamentals and keyword integration",
      "Strong research skills to produce accurate, authoritative content",
    ],
    niceToHave: [
      "Experience writing for B2B SaaS, e-commerce, or professional services",
      "Familiarity with tools like Surfer SEO, Grammarly, or Hemingway",
      "Email marketing experience (Mailchimp, Klaviyo, ActiveCampaign)",
    ],
  },
  {
    title: "Lead Generation Specialist",
    department: "Growth Support",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Research, identify, and qualify prospects for our clients' sales pipelines. You'll build targeted lists, craft outreach messages, and manage sequences that generate real conversations.",
    requirements: [
      "2+ years of experience in lead generation or sales development",
      "Proficiency with LinkedIn Sales Navigator and prospecting tools",
      "Experience writing cold outreach emails and follow-up sequences",
      "Strong data hygiene practices and CRM management skills",
      "Ability to qualify leads based on client-defined ICP criteria",
    ],
    niceToHave: [
      "Experience with tools like Apollo, Hunter.io, or Instantly",
      "Background in B2B sales or business development",
      "Familiarity with CRM platforms like HubSpot or Pipedrive",
    ],
  },
  {
    title: "Client Success Manager",
    department: "Operations",
    type: "Full-Time",
    location: "Remote — Worldwide",
    description:
      "Own the client relationship from onboarding through retention. You'll ensure every client has a seamless experience, their VA is performing at the highest level, and any issues are resolved proactively.",
    requirements: [
      "3+ years in customer success, account management, or client services",
      "Outstanding communication and relationship-building skills",
      "Experience managing multiple accounts simultaneously",
      "Proactive problem-solving approach and a bias for action",
      "Comfort working in a fast-paced, remote environment",
    ],
    niceToHave: [
      "Experience at a VA agency, BPO, or outsourcing company",
      "Familiarity with CRM and helpdesk tools",
      "Background in operations or project management",
    ],
  },
]

function RoleCard({ role }: { role: typeof openRoles[0] }) {
  const [open, setOpen] = useState(false)

  const deptColor: Record<string, string> = {
    "VA Services": "bg-blue-100 text-blue-700",
    "Creative Support": "bg-purple-100 text-purple-700",
    "Growth Support": "bg-emerald-100 text-emerald-700",
    "Operations": "bg-amber-100 text-amber-700",
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Role header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 flex items-start justify-between gap-4 group"
      >
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${deptColor[role.department] ?? "bg-gray-100 text-gray-600"}`}>
              {role.department}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {role.type}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {role.location}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#2D2B7F] transition-colors">
            {role.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
            {role.description}
          </p>
        </div>
        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-[#2D2B7F]/10 flex items-center justify-center transition-colors mt-1">
          {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      {/* Expanded details */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-5">
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{role.description}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D2B7F]" /> Requirements
              </h4>
              <ul className="space-y-2">
                {role.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0 mt-1.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-900 mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Nice to Have
              </h4>
              <ul className="space-y-2">
                {role.niceToHave.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={`mailto:careers@nolojia.com?subject=Application: ${encodeURIComponent(role.title)}`}
            className="inline-flex items-center gap-2 bg-[#2D2B7F] hover:bg-[#232161] text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-[#2D2B7F]/20 group"
          >
            Apply for this role
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      )}
    </div>
  )
}

export default function CareersPage() {
  const [filter, setFilter] = useState("All")
  const departments = ["All", "VA Services", "Creative Support", "Growth Support", "Operations"]
  const filtered = filter === "All" ? openRoles : openRoles.filter((r) => r.department === filter)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-collaboration.png"
            alt="Nolojia team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/96 via-[#1A1849]/88 to-[#2D2B7F]/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/70 via-transparent to-transparent" />
        </div>
        <div className="absolute top-16 right-[8%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[90px]" />
        <div className="absolute bottom-10 left-[5%] w-48 h-48 bg-[#7773E7]/15 rounded-full blur-[70px]" />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              We&apos;re Hiring
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Join the Team Behind{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                500+ Businesses
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
              We&apos;re building the world&apos;s most reliable virtual assistant company — and we need
              exceptional people who take ownership, move fast, and genuinely care about client results.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => document.getElementById("open-roles")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
              >
                See Open Roles
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <a href="mailto:careers@nolojia.com">
                <Button size="lg" variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl w-full sm:w-auto">
                  Send a General Application
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY NOLOJIA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Life at Nolojia
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Why People Choose Us
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We&apos;re a remote-first company that believes great work deserves great support, fair pay,
              and the freedom to do your best from wherever you are in the world.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                icon: Globe,
                title: "100% Remote",
                desc: "Work from anywhere in the world. We care about output, not where you open your laptop.",
              },
              {
                icon: Zap,
                title: "AI-First Environment",
                desc: "We equip every team member with AI tools to work faster and smarter — and invest in your growth.",
              },
              {
                icon: Users,
                title: "Meaningful Work",
                desc: "You'll directly impact the businesses and lives of the founders and teams you support.",
              },
              {
                icon: Heart,
                title: "Supportive Culture",
                desc: "No micromanaging. We trust you, back you up, and celebrate wins together — as a real team.",
              },
              {
                icon: Shield,
                title: "Stability & Growth",
                desc: "Competitive pay, consistent clients, and clear paths to senior roles as we scale.",
              },
              {
                icon: Star,
                title: "Top 1% Standard",
                desc: "You'll work alongside the best VAs and specialists in the industry — it makes you better.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                  <Icon className="w-6 h-6 text-[#2D2B7F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR VALUES ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4A47C4]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7773E7]/10 rounded-full blur-[80px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="max-w-4xl mx-auto"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Our Values
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-12">
              What We Stand For
            </motion.h2>
            <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6">
              {[
                { number: "01", title: "Ownership", desc: "We take full responsibility for outcomes — not just tasks. If something is broken, we fix it. If something can be better, we improve it." },
                { number: "02", title: "Client Obsession", desc: "The client's success is our success. Every decision we make is filtered through one question: does this make our clients' lives better?" },
                { number: "03", title: "Radical Reliability", desc: "We do what we say, when we say it. Deadlines aren't suggestions. Our clients depend on us and we never let them down." },
                { number: "04", title: "Continuous Growth", desc: "We're always learning — new tools, new skills, new ways to serve. Complacency has no place here." },
              ].map(({ number, title, desc }, i) => (
                <motion.div key={number} variants={fadeUp} custom={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#4A47C4]/40 hover:bg-white/8 transition-all duration-300">
                  <span className="text-[#4A47C4] font-bold text-xs tracking-widest mb-3 block">{number}</span>
                  <h3 className="text-xl font-bold mb-2">{title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OPEN ROLES ────────────────────────────────────────────────────── */}
      <section id="open-roles" className="py-24 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Open Positions
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Find Your Role
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              All roles are fully remote and open to candidates worldwide. Click any role to see full details and apply.
            </motion.p>
          </motion.div>

          {/* Department filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setFilter(dept)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  filter === dept
                    ? "bg-[#2D2B7F] text-white shadow-md shadow-[#2D2B7F]/20"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-[#2D2B7F]/30 hover:text-[#2D2B7F]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {filtered.map((role, i) => (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <RoleCard role={role} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HIRING PROCESS ────────────────────────────────────────────────── */}
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
              How We Hire
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-xl mx-auto">
              Straightforward, respectful, and fast. We don&apos;t waste your time.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { step: "01", icon: Briefcase, title: "Application", desc: "Submit your application via email or the role form. We review every application personally." },
              { step: "02", icon: Users, title: "Intro Call", desc: "A 20-minute video call to get to know you, your experience, and what you're looking for." },
              { step: "03", icon: Zap, title: "Skills Assessment", desc: "A short, paid practical task relevant to the role. We respect your time — it takes under 2 hours." },
              { step: "04", icon: CheckCircle2, title: "Offer & Onboarding", desc: "If it's a match, we move fast. Offer within 48 hours, onboarding within the week." },
            ].map(({ step, icon: Icon, title, desc }, i) => (
              <motion.div key={step} variants={fadeUp} custom={i}
                className="group bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-lg hover:shadow-[#2D2B7F]/5 transition-all duration-500">
                <span className="text-[#2D2B7F] font-bold text-xs tracking-widest mb-3 block">{step}</span>
                <div className="w-11 h-11 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2D2B7F] transition-all duration-300">
                  <Icon className="w-5 h-5 text-[#2D2B7F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover" />
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Don&apos;t See a Perfect Fit?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              We&apos;re always looking for exceptional talent. Send us your CV and a note about
              what you bring — we&apos;ll be in touch when the right opportunity opens.
            </p>
            <a href="mailto:careers@nolojia.com?subject=General Application — Nolojia">
              <Button
                size="lg"
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group"
              >
                Send a General Application
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <p className="mt-6 text-white/30 text-sm">
              We respond to every application within 5 business days.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
