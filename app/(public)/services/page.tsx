"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookingPopup } from "@/components/ui/booking-popup"
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  CalendarDays,
  Headphones,
  BarChart3,
  Users,
  Check,
  X,
  PenLine,
  Share2,
  Layers,
  LayoutTemplate,
  Video,
  Target,
  Database,
  TrendingUp,
  Megaphone,
  Clock,
  Zap,
  Shield,
  UserCheck,
  ShoppingBag,
  Home,
  ClipboardList,
  Code2,
  PieChart,
  Search,
  MousePointer2,
  Briefcase,
  Globe,
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

// ─── Service Data ─────────────────────────────────────────────────────────────

const vaServices = [
  {
    icon: UserCheck,
    title: "Personal & Executive Assistant",
    desc: "A dedicated VA who acts as the right hand of busy executives and founders — managing every moving part of your day.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    accent: "#3B82F6",
    features: [
      "Inbox management, triage, and drafting replies",
      "Calendar ownership, scheduling, and reminders",
      "Travel booking and full itinerary management",
      "Personal errands, research, and task coordination",
      "Meeting prep, minutes, and follow-up actions",
    ],
  },
  {
    icon: ClipboardList,
    title: "Administrative Assistant",
    desc: "The back-office work that eats your day — data, documents, files, and processes — handled cleanly and consistently.",
    gradient: "from-violet-500/10 to-purple-500/10",
    accent: "#7C3AED",
    features: [
      "Data entry, spreadsheet management, and reporting",
      "Document creation, formatting, and proofreading",
      "File organization and cloud storage management",
      "Form filling, permit applications, and submissions",
      "Process documentation and standard operating procedures",
    ],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Virtual Assistant",
    desc: "Keep your online store running at full speed without touching the backend yourself.",
    gradient: "from-amber-500/10 to-orange-500/10",
    accent: "#F59E0B",
    features: [
      "Product listing creation and optimization",
      "Order processing, tracking, and follow-up",
      "Customer service and returns management",
      "Inventory monitoring and restocking alerts",
      "Review management and seller account upkeep",
    ],
  },
  {
    icon: Home,
    title: "Real Estate Virtual Assistant",
    desc: "Free up agent and broker time while leads are followed up, listings managed, and admin handled.",
    gradient: "from-green-500/10 to-teal-500/10",
    accent: "#10B981",
    features: [
      "Property research, comparables, and market reports",
      "Lead follow-up, CRM updates, and pipeline management",
      "Appointment scheduling with buyers and sellers",
      "Listing creation, updates, and MLS coordination",
      "Contract document preparation and deadline tracking",
    ],
  },
  {
    icon: Headphones,
    title: "Customer Support Assistant",
    desc: "Your customers get fast, caring, and consistent responses — without you ever touching a support ticket.",
    gradient: "from-rose-500/10 to-pink-500/10",
    accent: "#F43F5E",
    features: [
      "Multi-channel support (email, chat, phone, social)",
      "Ticket management, resolution, and escalation handling",
      "Customer onboarding and welcome communication",
      "Feedback collection and satisfaction surveys",
      "FAQ and help-centre content management",
    ],
  },
]

const creativeServices = [
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Consistent, on-brand social presence across every platform — without lifting a finger.",
    gradient: "from-pink-500/10 to-rose-500/10",
    accent: "#EC4899",
    features: [
      "Content calendar planning and scheduling",
      "Platform-specific post creation (IG, LinkedIn, X, TikTok)",
      "Community engagement and replies",
      "Hashtag research and optimization",
      "Monthly performance reporting and insights",
    ],
  },
  {
    icon: PenLine,
    title: "Content Writing & Copywriting",
    desc: "Words that convert, engage, and reflect your brand voice — written by people who get it.",
    gradient: "from-indigo-500/10 to-blue-500/10",
    accent: "#6366F1",
    features: [
      "Blog posts and long-form articles",
      "Website and landing page copy",
      "Email sequences and newsletters",
      "Product descriptions and sales copy",
      "LinkedIn and thought leadership content",
    ],
  },
  {
    icon: Layers,
    title: "Graphic & Visual Design",
    desc: "Professional visuals that stop the scroll and make your brand look world-class.",
    gradient: "from-purple-500/10 to-violet-500/10",
    accent: "#8B5CF6",
    features: [
      "Social media graphics and branded templates",
      "Brand collateral (flyers, brochures, banners)",
      "Infographics and data visualizations",
      "Ad creatives and display banners",
      "Brand identity and style guide development",
    ],
  },
  {
    icon: Video,
    title: "Video & Podcast Production",
    desc: "We handle pre- and post-production so your content reaches the world polished and on time.",
    gradient: "from-orange-500/10 to-amber-500/10",
    accent: "#F97316",
    features: [
      "Video editing with captions and transitions",
      "Podcast production and show notes writing",
      "Thumbnail design and YouTube SEO optimization",
      "Content repurposing across platforms",
      "Upload scheduling and distribution management",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Presentation & Pitch Design",
    desc: "Decks that don't just inform — they persuade, impress, and close deals.",
    gradient: "from-teal-500/10 to-cyan-500/10",
    accent: "#14B8A6",
    features: [
      "Investor and sales pitch deck design",
      "Internal team and board presentations",
      "Webinar and training slide creation",
      "Reusable branded template systems",
      "Brand-consistent visual storytelling",
    ],
  },
]

const growthServices = [
  {
    icon: Target,
    title: "Lead Generation & Prospecting",
    desc: "A steady pipeline of qualified prospects — so your sales team always has someone to call.",
    gradient: "from-emerald-500/10 to-green-500/10",
    accent: "#10B981",
    features: [
      "Ideal customer profile (ICP) research and list building",
      "LinkedIn prospecting and outreach sequencing",
      "Cold email copywriting and campaign management",
      "Lead qualification, scoring, and handoff",
      "CRM data population and cleanup",
    ],
  },
  {
    icon: Database,
    title: "CRM & Sales Support",
    desc: "Your CRM is only as good as the data in it. We keep it clean, current, and actionable.",
    gradient: "from-cyan-500/10 to-blue-500/10",
    accent: "#06B6D4",
    features: [
      "CRM setup, migration, and ongoing cleanup",
      "Contact and deal stage management",
      "Sales pipeline reporting and forecasting",
      "Follow-up task creation and automation",
      "Integration with email, calendar, and billing tools",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Research & Competitive Analysis",
    desc: "Know your market better than your competitors do. We dig deep, summarize, and deliver.",
    gradient: "from-violet-500/10 to-indigo-500/10",
    accent: "#7C3AED",
    features: [
      "Competitor research and benchmarking reports",
      "Industry trend monitoring and executive summaries",
      "Customer persona research and development",
      "Product and pricing landscape analysis",
      "Market sizing and opportunity assessment",
    ],
  },
  {
    icon: Megaphone,
    title: "Outreach & Partnership Coordination",
    desc: "Building relationships at scale — from influencer campaigns to strategic partnerships.",
    gradient: "from-rose-500/10 to-pink-500/10",
    accent: "#F43F5E",
    features: [
      "Influencer and creator identification and outreach",
      "Partnership and affiliate programme management",
      "PR pitch writing and media outreach",
      "Conference, event, and speaking coordination",
      "Sponsorship research and applications",
    ],
  },
]

const specialisedServices = [
  {
    icon: Code2,
    title: "Web Design & Development",
    desc: "Professional websites and web applications built to convert — combining great design with clean, scalable code.",
    gradient: "from-sky-500/10 to-blue-500/10",
    accent: "#0EA5E9",
    features: [
      "Custom website design and development (WordPress, Webflow, Next.js)",
      "Landing page creation and conversion optimisation",
      "E-commerce store setup and theme customisation",
      "Website maintenance, updates, and performance audits",
      "SEO-optimised code structure and Core Web Vitals improvement",
    ],
  },
  {
    icon: PieChart,
    title: "Financial Analyst Support",
    desc: "Expert financial support that keeps your numbers accurate, your reports timely, and your decisions data-driven.",
    gradient: "from-emerald-500/10 to-teal-500/10",
    accent: "#059669",
    features: [
      "Financial modelling, forecasting, and scenario planning",
      "Budget tracking, variance analysis, and cash flow reporting",
      "Bookkeeping support and expense categorisation",
      "Investor-ready financial report preparation",
      "KPI dashboard creation and monthly financial summaries",
    ],
  },
  {
    icon: Search,
    title: "Digital Marketing Services",
    desc: "Data-led digital marketing that grows your audience, drives qualified traffic, and converts visitors into customers.",
    gradient: "from-orange-500/10 to-yellow-500/10",
    accent: "#F97316",
    features: [
      "SEO strategy, keyword research, and on-page optimisation",
      "Paid advertising management (Google Ads, Meta Ads)",
      "Email marketing campaigns and automation setup",
      "Analytics tracking, attribution, and performance reporting",
      "Content marketing strategy and editorial planning",
    ],
  },
  {
    icon: MousePointer2,
    title: "UI/UX Design",
    desc: "User-centred design that makes digital products intuitive, beautiful, and built to retain users long-term.",
    gradient: "from-violet-500/10 to-fuchsia-500/10",
    accent: "#8B5CF6",
    features: [
      "User research, persona development, and journey mapping",
      "Wireframing, prototyping, and interactive mockups",
      "UI component libraries and design system creation",
      "Usability testing and iterative design improvements",
      "Handoff-ready Figma files for development teams",
    ],
  },
  {
    icon: Briefcase,
    title: "Specialised Business Support",
    desc: "Skilled professionals handling the complex, specialised tasks that keep your business compliant, efficient, and growing.",
    gradient: "from-slate-500/10 to-gray-500/10",
    accent: "#64748B",
    features: [
      "Legal document review, contract management, and compliance support",
      "HR administration, recruitment coordination, and onboarding",
      "Project management, timeline coordination, and delivery tracking",
      "Procurement research, supplier management, and vendor relations",
      "Strategic research, business plan drafting, and pitch support",
    ],
  },
]

// ─── Service Card Grid ────────────────────────────────────────────────────────

function ServiceGrid({
  services,
  onBook,
  wide = false,
}: {
  services: typeof vaServices
  onBook: () => void
  wide?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={stagger}
      className={`grid md:grid-cols-2 ${wide ? "lg:grid-cols-3" : ""} gap-8 max-w-5xl ${wide ? "max-w-6xl" : ""} mx-auto`}
    >
      {services.map(({ icon: Icon, title, desc, features, gradient, accent }, i) => (
        <motion.div
          key={title}
          variants={fadeUp}
          custom={i}
          className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500"
        >
          <div className={`bg-gradient-to-br ${gradient} p-6`}>
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6" style={{ color: accent }} />
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={onBook}
              className="mt-6 text-sm font-semibold flex items-center gap-1.5 group/btn"
              style={{ color: accent }}
            >
              Get started
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

// ─── Pillar Header ────────────────────────────────────────────────────────────

function PillarHeader({
  number,
  eyebrow,
  headline,
  subhead,
}: {
  number: string
  eyebrow: string
  headline: string
  subhead: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
      className="text-center mb-16"
    >
      <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-3 mb-4">
        <span className="w-8 h-px bg-[#2D2B7F]" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F]">
          Pillar {number} — {eyebrow}
        </span>
        <span className="w-8 h-px bg-[#2D2B7F]" />
      </motion.div>
      <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4 text-gray-900">
        {headline}
      </motion.h2>
      <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
        {subhead}
      </motion.p>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-assistant.png"
            alt="Professional virtual assistant at work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 via-[#1A1849]/85 to-[#2D2B7F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#4A47C4]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-[#7773E7]/15 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Virtual Assistant Services
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Your Dedicated VA.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                Every Role. Every Task.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-white/60 mb-8 max-w-xl leading-relaxed">
              Nolojia provides skilled virtual assistants and remote professionals trained across
              four pillars — VA services, creative support, business growth, and specialised digital
              roles. One partner, every function.
            </motion.p>

            {/* Quick-nav pills */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-3 mb-10">
              {[
                { id: "va", label: "Virtual Assistant" },
                { id: "creative", label: "Creative Support" },
                { id: "growth", label: "Growth Support" },
                { id: "specialised", label: "Specialised Roles" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className="px-5 py-2.5 rounded-full border border-white/50 text-white text-sm font-semibold bg-white/5 hover:bg-white/15 hover:border-white/70 transition-all duration-300"
                >
                  {p.label}
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setBookingOpen(true)}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-8 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group">
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline"
                  className="border-2 border-white/60 text-white bg-white/5 hover:bg-white/15 hover:border-white/80 text-base px-8 py-6 rounded-xl w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 3-PILLAR OVERVIEW ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
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
              Four Pillars of Support
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              One Partner. Every Function.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our virtual assistants and remote professionals are trained specialists — not generalists.
              Whether you need dedicated VA support, a creative team, a growth engine, or specialised
              digital expertise, we have someone for that.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                id: "va",
                icon: Users,
                title: "Virtual Assistant Services",
                desc: "Dedicated VAs for executive support, admin tasks, e-commerce operations, real estate, and customer service.",
                color: "from-[#2D2B7F] to-[#4A47C4]",
                count: "5 Specializations",
                badge: "Core Service",
              },
              {
                id: "creative",
                icon: PenLine,
                title: "Creative Support",
                desc: "Social media, copywriting, design, video production, and presentations — on-brand, on-time, every time.",
                color: "from-purple-500 to-pink-600",
                count: "5 Services",
                badge: null,
              },
              {
                id: "growth",
                icon: TrendingUp,
                title: "Growth Support",
                desc: "Lead generation, CRM management, market research, and outreach — the engine behind your pipeline.",
                color: "from-emerald-500 to-teal-600",
                count: "4 Services",
                badge: null,
              },
              {
                id: "specialised",
                icon: Globe,
                title: "Digital & Specialised Roles",
                desc: "Web development, financial analysis, digital marketing, UI/UX design, and specialised business support.",
                color: "from-sky-500 to-indigo-600",
                count: "5 Services",
                badge: "New",
              },
            ].map(({ id, icon: Icon, title, desc, color, count, badge }, i) => (
              <motion.div
                key={id}
                variants={fadeUp}
                custom={i}
                className="group cursor-pointer"
                onClick={() => scrollTo(id)}
              >
                <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#2D2B7F]/8 hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                  {badge && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/30">
                        {badge}
                      </span>
                    </div>
                  )}
                  <div className={`bg-gradient-to-br ${color} p-6`}>
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-white/70 text-xs font-semibold uppercase tracking-wider">{count}</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{title}</h3>
                  </div>
                  <div className="p-6 bg-white flex-1 flex flex-col">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{desc}</p>
                    <span className="text-[#2D2B7F] text-sm font-semibold flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300">
                      View services <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHAT YOUR DAY LOOKS LIKE ──────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#2D2B7F]/15">
                <Image
                  src="/images/team-collaboration.png"
                  alt="Virtual assistant team collaborating"
                  width={600}
                  height={500}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/30 to-transparent" />
              </div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-[#2D2B7F]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">20+ Hours</p>
                    <p className="text-xs text-muted-foreground">Reclaimed every week</p>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-2 border-[#4A47C4]/20" />
              <div className="absolute -top-3 -left-3 w-12 h-12 rounded-full border-2 border-[#4A47C4]/30" />
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.span variants={fadeUp} custom={0}
                  className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
                  Imagine This
                </motion.span>
                <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4 text-gray-900">
                  A Day With Your Nolojia VA
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  While you focus on decisions that move the business, your VA handles everything else.
                </motion.p>
                <motion.div variants={stagger} className="space-y-4">
                  {[
                    { time: "8:00 AM", icon: Mail, title: "Inbox Zero — Before You Wake Up", desc: "Your VA triaged overnight emails, drafted replies, and flagged only what needs your decision." },
                    { time: "9:30 AM", icon: CalendarDays, title: "Your Day Is Already Planned", desc: "Calendar blocked, meetings confirmed, prep materials ready. No scrambling." },
                    { time: "12:00 PM", icon: PenLine, title: "Content Live Across All Channels", desc: "Blog post published. Social posts live. Newsletter sent. All on-brand, on-time." },
                    { time: "3:00 PM", icon: Target, title: "Pipeline Growing Automatically", desc: "30 prospects added to CRM. Outreach sent. Follow-up sequences running." },
                    { time: "5:00 PM", icon: Headphones, title: "Every Customer Query Resolved", desc: "Tickets closed, escalations reviewed, satisfaction survey sent." },
                  ].map(({ time, icon: Icon, title, desc }, i) => (
                    <motion.div key={title} variants={fadeUp} custom={i}
                      className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-md hover:shadow-[#2D2B7F]/5 bg-white transition-all duration-300">
                      <div className="flex-shrink-0 w-11 h-11 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2D2B7F] transition-all duration-300">
                        <Icon className="w-5 h-5 text-[#2D2B7F] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#2D2B7F] uppercase tracking-wider">{time}</span>
                        <h3 className="font-semibold text-sm mt-0.5 text-gray-900">{title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILLAR 1: VIRTUAL ASSISTANT SERVICES ──────────────────────────── */}
      <section id="va" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        {/* Subtle brand accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2D2B7F] via-[#4A47C4] to-transparent" />

        <div className="container mx-auto px-4">
          <PillarHeader
            number="01"
            eyebrow="Virtual Assistant Services"
            headline="Dedicated VAs for Every Role"
            subhead="Our VAs aren't generalists. Each one is trained for a specific function — so you get real expertise, not a learning curve at your expense."
          />

          {/* VA specialization callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-[#2D2B7F]/5 to-[#4A47C4]/5 border border-[#2D2B7F]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2D2B7F] rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">What makes a Nolojia VA different?</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every VA goes through a rigorous selection process — only the top 1% of applicants join.
                  They&apos;re equipped with AI tools, trained on your custom playbook within 4 weeks, and paired
                  with a client success manager to ensure continuity and quality.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-wrap gap-2">
                {["Top 1%", "AI-equipped", "NDA signed", "4-week guarantee"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-[#2D2B7F] bg-[#2D2B7F]/10 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <ServiceGrid services={vaServices} onBook={() => setBookingOpen(true)} />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── PILLAR 2: CREATIVE SUPPORT ────────────────────────────────────── */}
      <section id="creative" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-bl-[60px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <PillarHeader
            number="02"
            eyebrow="Creative Support"
            headline="Your Brand, Built Consistently"
            subhead="Content, design, video, and social — produced on time and on brand, without you spending a single hour in Canva or CapCut."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {creativeServices.map(({ icon: Icon, title, desc, features, gradient, accent }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`bg-gradient-to-br ${gradient} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="mt-6 text-sm font-semibold flex items-center gap-1.5 group/btn"
                    style={{ color: accent }}
                  >
                    Get started
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── PILLAR 3: GROWTH SUPPORT ──────────────────────────────────────── */}
      <section id="growth" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4">
          <PillarHeader
            number="03"
            eyebrow="Growth Support"
            headline="Build the Pipeline. Drive Revenue."
            subhead="From prospecting to partnerships — the growth-side work that fills your calendar with the right conversations and keeps revenue moving forward."
          />
          <ServiceGrid services={growthServices} onBook={() => setBookingOpen(true)} />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── PILLAR 4: DIGITAL & SPECIALISED ROLES ─────────────────────────── */}
      <section id="specialised" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-tl-[60px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <PillarHeader
            number="04"
            eyebrow="Digital & Specialised Roles"
            headline="Expert Professionals for Every Function"
            subhead="From web development to financial analysis, UI/UX design to digital marketing — access highly skilled remote professionals powered by AI-augmented workflows."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-[#2D2B7F]/5 to-[#4A47C4]/5 border border-[#2D2B7F]/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-[#2D2B7F] rounded-2xl flex items-center justify-center">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">AI-powered remote professionals at your service</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every specialist in our network is equipped with AI-augmented workflows, trained on industry
                  best practices, and integrated into your existing tech stack. Get expert-level output without
                  the overhead of a full-time senior hire.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-wrap gap-2">
                {["AI-Equipped", "Remote-Ready", "Expert-Vetted", "Flexible Scope"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-[#2D2B7F] bg-[#2D2B7F]/10 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {specialisedServices.map(({ icon: Icon, title, desc, features, gradient, accent }, i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                custom={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500"
              >
                <div className={`bg-gradient-to-br ${gradient} p-6`}>
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className="mt-6 text-sm font-semibold flex items-center gap-1.5 group/btn"
                    style={{ color: accent }}
                  >
                    Get started
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── PLANS ─────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover opacity-[0.04]" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#7773E7]/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Plans
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Choose Your Level of Support
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              No minimum commitments. Your dedicated VA starts in under a week. Scale across any pillar as you grow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {[
              {
                name: "Part-Time VA",
                hours: "80 hrs / month",
                tagline: "One dedicated VA for your core tasks. The perfect starting point.",
                features: [
                  "1 dedicated virtual assistant",
                  "VA services or creative support",
                  "Up to 80 monthly hours",
                  "Client success manager",
                  "4-week onboarding guarantee",
                  "AI-assisted tools included",
                ],
                highlight: false,
              },
              {
                name: "Full-Time VA",
                hours: "160 hrs / month",
                tagline: "Your VA is a full-time team member — across VA and creative support.",
                features: [
                  "Everything in Part-Time",
                  "Full 160 monthly hours",
                  "VA + creative support",
                  "Priority response time",
                  "Advanced workflow automation",
                  "Monthly strategy check-ins",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                hours: "Custom",
                tagline: "A full team of VAs across VA, creative, and growth — at scale.",
                features: [
                  "Everything in Full-Time",
                  "VA + creative + growth support",
                  "Dedicated team configuration",
                  "Dedicated account director",
                  "Custom AI integrations",
                  "White-glove onboarding",
                ],
                highlight: false,
              },
            ].map(({ name, hours, tagline, features, highlight }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}
                className={`rounded-2xl p-6 border transition-all duration-300 ${highlight
                  ? "bg-white text-gray-900 border-white scale-105 shadow-2xl shadow-white/10"
                  : "bg-white/5 border-white/10 hover:border-[#4A47C4]/50 hover:bg-white/10"}`}>
                {highlight && (
                  <div className="flex justify-center mb-4">
                    <span className="bg-[#2D2B7F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-1 ${highlight ? "text-gray-900" : "text-white"}`}>{name}</h3>
                <div className={`text-2xl font-bold mb-2 ${highlight ? "text-[#2D2B7F]" : "text-[#9996ED]"}`}>{hours}</div>
                <p className={`text-sm mb-6 leading-relaxed ${highlight ? "text-muted-foreground" : "text-white/50"}`}>{tagline}</p>
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${highlight ? "text-gray-600" : "text-white/60"}`}>
                      <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${highlight ? "text-[#2D2B7F]" : "text-[#9996ED]"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button onClick={() => setBookingOpen(true)}
                  className={`w-full rounded-xl font-semibold ${highlight
                    ? "bg-[#2D2B7F] text-white hover:bg-[#232161]"
                    : "bg-white/10 text-white hover:bg-white/25 border-2 border-white/40 hover:border-white/60"}`}>
                  Book a Call
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-white/30 text-sm mt-10"
          >
            All plans customisable across admin, creative, and growth pillars.{" "}
            <Link href="/contact" className="underline text-white/50 hover:text-white transition-colors">
              Get in touch to discuss →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="hidden lg:block sticky top-28"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-[#2D2B7F]/10">
                <Image
                  src="/images/team-collaboration.png"
                  alt="Nolojia VA team"
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">We&apos;re not just a VA agency.</p>
                  <p className="text-white/70 text-sm mt-1">We&apos;re your full-stack operations partner.</p>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#2D2B7F]" />
                  <span className="text-xs font-bold text-gray-900">Top 1% of VA applicants</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-10">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">Why Us</span>
                <h2 className="text-4xl font-bold mb-3">Nolojia vs. The Rest</h2>
                <p className="text-muted-foreground text-lg">
                  Most VA agencies give you a body. We give you a specialist — backed by AI tools,
                  a success manager, and a proven playbook.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left p-5 font-semibold text-gray-500 w-1/2">Feature</th>
                      <th className="p-5 font-bold text-[#2D2B7F] text-center">Nolojia</th>
                      <th className="p-5 font-medium text-gray-400 text-center">Typical VA Agency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Specialist VAs (not generalists)", nolojia: true, other: false },
                      { feature: "VA + Creative + Growth under one roof", nolojia: true, other: false },
                      { feature: "AI-powered tools for every VA", nolojia: true, other: false },
                      { feature: "4-week integration guarantee", nolojia: true, other: false },
                      { feature: "Start in under 1 week", nolojia: true, other: false },
                      { feature: "No minimum contract commitment", nolojia: true, other: false },
                      { feature: "Dedicated client success manager", nolojia: true, other: false },
                      { feature: "Custom playbook built per client", nolojia: true, other: false },
                      { feature: "NDA & background check on all VAs", nolojia: true, other: true },
                      { feature: "Same VA continuity guaranteed", nolojia: true, other: false },
                      { feature: "Monthly strategy optimization", nolojia: true, other: false },
                    ].map(({ feature, nolojia, other }, i) => (
                      <tr key={feature} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="p-5 text-gray-700">{feature}</td>
                        <td className="p-5 text-center">
                          {nolojia ? <Check className="w-5 h-5 text-[#2D2B7F] mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                        </td>
                        <td className="p-5 text-center">
                          {other ? <Check className="w-5 h-5 text-gray-400 mx-auto" /> : <X className="w-4 h-4 text-gray-300 mx-auto" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY NOLOJIA WORKS ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#0F0E2E] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#4A47C4]/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#7773E7]/10 rounded-full blur-[80px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Built Different
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Why Nolojia VAs Outperform
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              Hiring a VA elsewhere means hiring a person. Hiring from Nolojia means getting
              a person, a system, and a team — all working for you.
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
              { icon: UserCheck, title: "Dedicated 1:1 VA", desc: "Your own assistant who learns your business, tools, preferences, and voice — deeply." },
              { icon: Zap, title: "AI-Augmented Output", desc: "Every VA uses AI tools to work faster, smarter, and more accurately than a solo hire." },
              { icon: Shield, title: "4-Week Integration Guarantee", desc: "Fully embedded in your stack and workflow within 4 weeks — or we make it right, free." },
              { icon: Clock, title: "Operational in Under a Week", desc: "No lengthy hiring process. We match, brief, and launch your VA in days." },
              { icon: BarChart3, title: "Scale Up or Down Anytime", desc: "Change your hours, add a pillar, or upgrade your plan — no penalties, ever." },
              { icon: Shield, title: "Enterprise-Grade Trust", desc: "Every VA signs an NDA, passes a background check, and undergoes rigorous vetting." },
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
              Ready to Hire Your Dedicated VA?
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Book a free discovery call. We&apos;ll find the right VA and the right mix of support
              for your business — no pressure, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setBookingOpen(true)}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group">
                <CalendarDays className="w-5 h-5 mr-2" />
                Book Your Free Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href="/contact">
                <Button size="lg" variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-base px-8 py-6 rounded-xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
