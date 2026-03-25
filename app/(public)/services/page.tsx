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
  ClipboardList,
  Code2,
  PieChart,
  Search,
  MousePointer2,
  Briefcase,
  Globe,
  Film,
  Package,
  Settings,
  DollarSign,
  Calculator,
  Activity,
  Palette,
  Monitor,
  FileText,
  Building2,
  Cpu,
  Star,
  Printer,
  BarChart2,
  LineChart,
  RefreshCw,
  CheckSquare,
  Rocket,
  Sparkles,
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

const virtualOpsServices = [
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
    title: "Administrative Support",
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
    icon: Headphones,
    title: "Customer Support (Email, Chat & Help Desk)",
    desc: "Your customers get fast, caring, and consistent responses — without you ever touching a support ticket.",
    gradient: "from-rose-500/10 to-pink-500/10",
    accent: "#F43F5E",
    features: [
      "Multi-channel support (email, live chat, help desk)",
      "Ticket management, resolution, and escalation handling",
      "Customer onboarding and welcome communication",
      "Feedback collection and satisfaction surveys",
      "FAQ and help-centre content management",
    ],
  },
  {
    icon: Database,
    title: "CRM & Data Management",
    desc: "Your CRM is only as good as the data in it. We keep it clean, current, and actionable so your team can close faster.",
    gradient: "from-cyan-500/10 to-blue-500/10",
    accent: "#06B6D4",
    features: [
      "CRM setup, migration, and ongoing data cleanup",
      "Contact and deal stage management",
      "Pipeline reporting, forecasting, and data integrity",
      "Follow-up task creation and automation sequences",
      "Integration with email, calendar, and billing tools",
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
]

const creativeServices = [
  {
    icon: Palette,
    title: "Graphic Design & Brand Identity",
    desc: "Professional visuals that stop the scroll and make your brand look world-class — from logo to full identity system.",
    gradient: "from-purple-500/10 to-violet-500/10",
    accent: "#8B5CF6",
    features: [
      "Brand identity design: logos, colour palettes, typography",
      "Social media graphics and branded templates",
      "Brand collateral: flyers, brochures, banners",
      "Ad creatives and display banners",
      "Brand style guide and asset library creation",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Design & Content",
    desc: "Consistent, on-brand social presence across every platform — content that builds audiences and drives engagement.",
    gradient: "from-pink-500/10 to-rose-500/10",
    accent: "#EC4899",
    features: [
      "Content calendar planning and scheduling",
      "Platform-specific post creation (IG, LinkedIn, X, TikTok)",
      "Community engagement and replies",
      "Hashtag research and performance optimization",
      "Monthly performance reporting and insights",
    ],
  },
  {
    icon: Film,
    title: "Motion Graphics & Animation",
    desc: "Animated content that captivates — from social reels to brand explainers and product showcase videos.",
    gradient: "from-indigo-500/10 to-blue-500/10",
    accent: "#6366F1",
    features: [
      "Social media reels and animated story content",
      "Logo and brand animation",
      "Explainer and product demo animations",
      "Motion graphics for ads and promotional content",
      "GIF creation and animated web assets",
    ],
  },
  {
    icon: Video,
    title: "Video Editing (Short-form & Ads)",
    desc: "We handle pre- and post-production so your content reaches the world polished, on-brand, and on time.",
    gradient: "from-orange-500/10 to-amber-500/10",
    accent: "#F97316",
    features: [
      "Short-form video editing with captions and transitions",
      "Ad video production for Meta, YouTube, TikTok",
      "Thumbnail design and YouTube SEO optimization",
      "Content repurposing across multiple platforms",
      "Podcast production and show notes writing",
    ],
  },
  {
    icon: LayoutTemplate,
    title: "Presentation & Pitch Deck Design",
    desc: "Decks that don't just inform — they persuade, impress, and close deals. From investor pitches to board reports.",
    gradient: "from-teal-500/10 to-cyan-500/10",
    accent: "#14B8A6",
    features: [
      "Investor and sales pitch deck design",
      "Internal team and board presentations",
      "Webinar and training slide creation",
      "Reusable branded template systems",
      "Infographics and data visualization slides",
    ],
  },
  {
    icon: Printer,
    title: "Print & Packaging Design",
    desc: "Offline collateral and packaging that makes your physical brand presence as strong as your digital one.",
    gradient: "from-emerald-500/10 to-green-500/10",
    accent: "#10B981",
    features: [
      "Product packaging design and label creation",
      "Marketing collateral: brochures, flyers, catalogues",
      "Event materials: banners, stands, signage",
      "Business card and stationery design",
      "Print-ready file preparation and production support",
    ],
  },
]

const webDevServices = [
  {
    icon: Monitor,
    title: "Website Design & Development",
    desc: "Professional websites built to convert — combining world-class design with clean, scalable code.",
    gradient: "from-sky-500/10 to-blue-500/10",
    accent: "#0EA5E9",
    features: [
      "Custom website design and development (WordPress, Next.js, Webflow)",
      "Mobile-first, responsive design for all devices",
      "SEO-optimised code structure and Core Web Vitals",
      "Website maintenance, updates, and performance audits",
      "E-commerce store setup and theme customization",
    ],
  },
  {
    icon: Target,
    title: "Landing Pages & Conversion Optimization",
    desc: "High-converting landing pages built for campaigns, lead gen, and product launches — with A/B testing support.",
    gradient: "from-orange-500/10 to-rose-500/10",
    accent: "#F97316",
    features: [
      "Campaign-specific landing page design and build",
      "Conversion rate optimization (CRO) best practices",
      "Lead capture forms and CRM integration",
      "A/B testing setup and performance tracking",
      "Fast load times and mobile optimization",
    ],
  },
  {
    icon: Code2,
    title: "Web Application Development",
    desc: "Custom web apps and internal tools built to automate your operations and scale your digital products.",
    gradient: "from-violet-500/10 to-purple-500/10",
    accent: "#7C3AED",
    features: [
      "Custom web application architecture and development",
      "Internal tools, dashboards, and admin panels",
      "API integration and third-party service connections",
      "Database design and backend development",
      "Ongoing maintenance, updates, and feature development",
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
    icon: Cpu,
    title: "SaaS Product Design & No-Code Development",
    desc: "From MVP to full product — we design SaaS interfaces and build no-code solutions that launch faster.",
    gradient: "from-cyan-500/10 to-teal-500/10",
    accent: "#06B6D4",
    features: [
      "SaaS product UI/UX design and user flow mapping",
      "No-code development: Webflow, Bubble, Framer",
      "MVP design and rapid prototyping",
      "Product onboarding flow design",
      "Design-to-development handoff documentation",
    ],
  },
]

const marketingServices = [
  {
    icon: Search,
    title: "Search Engine Optimization (SEO)",
    desc: "Data-led SEO strategy that grows your organic traffic, improves rankings, and converts visitors into customers.",
    gradient: "from-orange-500/10 to-yellow-500/10",
    accent: "#F97316",
    features: [
      "Keyword research, strategy, and on-page optimization",
      "Technical SEO audits and Core Web Vitals improvements",
      "Content strategy and SEO-optimized writing",
      "Backlink analysis and link-building outreach",
      "Monthly SEO reporting and ranking tracking",
    ],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    desc: "Full-service social media management that builds your audience, drives engagement, and grows your brand online.",
    gradient: "from-pink-500/10 to-rose-500/10",
    accent: "#EC4899",
    features: [
      "Multi-platform strategy and content calendar planning",
      "Original content creation and copywriting",
      "Community management and audience engagement",
      "Influencer and creator outreach coordination",
      "Analytics, performance reporting, and growth insights",
    ],
  },
  {
    icon: Megaphone,
    title: "Paid Advertising Support",
    desc: "Managed paid campaigns across Google, Meta, and LinkedIn — designed to maximize ROAS and grow your pipeline.",
    gradient: "from-violet-500/10 to-indigo-500/10",
    accent: "#7C3AED",
    features: [
      "Google Ads and Meta Ads campaign management",
      "LinkedIn and TikTok paid advertising",
      "Ad copywriting and creative briefs",
      "Audience targeting, segmentation, and retargeting",
      "Budget management and ROAS optimization",
    ],
  },
  {
    icon: PenLine,
    title: "Content Creation & Strategy",
    desc: "Words and content that convert, engage, and reflect your brand voice — across every channel and format.",
    gradient: "from-indigo-500/10 to-blue-500/10",
    accent: "#6366F1",
    features: [
      "Blog posts, articles, and long-form content",
      "Website and landing page copy",
      "Email sequences and newsletters",
      "LinkedIn thought leadership and social copy",
      "Content repurposing and multi-channel distribution",
    ],
  },
  {
    icon: BarChart2,
    title: "Campaign Analytics & Reporting",
    desc: "Clear, actionable reporting across all your marketing channels — so every decision is backed by real data.",
    gradient: "from-emerald-500/10 to-teal-500/10",
    accent: "#10B981",
    features: [
      "Marketing analytics setup (GA4, Meta Pixel, etc.)",
      "Cross-channel attribution and funnel reporting",
      "KPI dashboard creation and maintenance",
      "Monthly campaign performance reviews",
      "Competitor benchmarking and trend analysis",
    ],
  },
]

const financialServices = [
  {
    icon: LineChart,
    title: "Financial Analysis & Modelling",
    desc: "Expert financial analysis that keeps your numbers accurate, your reports timely, and your decisions data-driven.",
    gradient: "from-emerald-500/10 to-teal-500/10",
    accent: "#059669",
    features: [
      "Financial modelling, scenario planning, and stress testing",
      "Investor-ready financial report preparation",
      "Profitability analysis and unit economics modelling",
      "Valuation support and cap table management",
      "KPI framework design and performance tracking",
    ],
  },
  {
    icon: Calculator,
    title: "Budgeting & Forecasting",
    desc: "Accurate budgets and rolling forecasts that give leadership clarity and confidence in every financial decision.",
    gradient: "from-blue-500/10 to-indigo-500/10",
    accent: "#3B82F6",
    features: [
      "Annual budget planning and departmental allocation",
      "Rolling 12-month revenue and expense forecasting",
      "Cash flow monitoring and liquidity management",
      "Budget vs. actual variance analysis and reporting",
      "Cost optimization research and recommendations",
    ],
  },
  {
    icon: BarChart3,
    title: "Business Intelligence & Reporting",
    desc: "Turn raw data into executive-ready insights — automated dashboards and reports that drive faster decisions.",
    gradient: "from-violet-500/10 to-purple-500/10",
    accent: "#8B5CF6",
    features: [
      "BI dashboard design and implementation",
      "Automated reporting pipelines and scheduled reports",
      "Data cleaning, transformation, and quality assurance",
      "Cross-department data consolidation",
      "Executive summary reporting and board packs",
    ],
  },
  {
    icon: Activity,
    title: "Data Visualization Dashboards",
    desc: "Interactive, visually compelling dashboards that make complex data instantly understandable to any stakeholder.",
    gradient: "from-cyan-500/10 to-sky-500/10",
    accent: "#06B6D4",
    features: [
      "Custom dashboard design (Power BI, Tableau, Looker, Google Data Studio)",
      "Real-time metrics and live data integration",
      "Sales, marketing, operations, and financial dashboards",
      "Shareable, role-based access dashboards",
      "Dashboard maintenance and iterative improvements",
    ],
  },
  {
    icon: TrendingUp,
    title: "Market Research & Competitive Intelligence",
    desc: "Know your market better than your competitors do. We dig deep, synthesize, and deliver actionable insight.",
    gradient: "from-amber-500/10 to-orange-500/10",
    accent: "#F59E0B",
    features: [
      "Competitor research, benchmarking, and landscape mapping",
      "Industry trend monitoring and executive summaries",
      "Customer persona research and development",
      "Product and pricing landscape analysis",
      "Market sizing, TAM/SAM/SOM, and opportunity assessment",
    ],
  },
]

const specialisedServices = [
  {
    icon: Briefcase,
    title: "Project Management",
    desc: "Skilled project managers who keep your initiatives on track, on budget, and delivered with full stakeholder visibility.",
    gradient: "from-indigo-500/10 to-blue-500/10",
    accent: "#3B82F6",
    features: [
      "Project planning, timeline creation, and milestone tracking",
      "Agile/Scrum facilitation and sprint management",
      "Cross-team coordination and dependency management",
      "Risk identification, mitigation, and issue resolution",
      "Status reporting and executive progress updates",
    ],
  },
  {
    icon: Settings,
    title: "Operations Support",
    desc: "Remote operations professionals who design, document, and optimize the systems that run your business.",
    gradient: "from-slate-500/10 to-gray-500/10",
    accent: "#64748B",
    features: [
      "Business process mapping, documentation, and optimization",
      "Standard operating procedure (SOP) creation",
      "Tool and platform management (Notion, Monday, Asana, etc.)",
      "Vendor management and supplier coordination",
      "Operational reporting and KPI monitoring",
    ],
  },
  {
    icon: Building2,
    title: "HR & Recruitment Support",
    desc: "Streamline your talent operations — from sourcing to onboarding — without adding headcount to HR.",
    gradient: "from-rose-500/10 to-pink-500/10",
    accent: "#F43F5E",
    features: [
      "Job description writing and job board posting",
      "Candidate sourcing, screening, and interview scheduling",
      "Employee onboarding coordination and documentation",
      "HR administration: contracts, compliance, and records",
      "Performance review process management",
    ],
  },
  {
    icon: FileText,
    title: "Legal & Compliance Support",
    desc: "Skilled professionals helping you stay compliant, manage documents, and reduce legal admin burden.",
    gradient: "from-amber-500/10 to-yellow-500/10",
    accent: "#D97706",
    features: [
      "Contract review, drafting, and version management",
      "Compliance documentation and regulatory research",
      "NDA management and document repository organization",
      "Policy writing and internal governance documentation",
      "Due diligence research and legal admin support",
    ],
  },
  {
    icon: Layers,
    title: "Custom Business Roles",
    desc: "Need something that doesn't fit a standard category? We build custom remote roles around your exact operational needs.",
    gradient: "from-violet-500/10 to-fuchsia-500/10",
    accent: "#7C3AED",
    features: [
      "Role scoping and job description co-creation",
      "Specialist matching across any business function",
      "Hybrid roles spanning multiple departments",
      "Dedicated team configurations for complex projects",
      "Ongoing role refinement as your business evolves",
    ],
  },
]

// ─── Service Card Grid ────────────────────────────────────────────────────────

function ServiceGrid({
  services,
  onBook,
}: {
  services: typeof virtualOpsServices
  onBook: () => void
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={stagger}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
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
          {number} — {eyebrow}
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

// ─── Category overview data ───────────────────────────────────────────────────

const categories = [
  {
    id: "virtual-ops",
    icon: Users,
    title: "Virtual Operations Support",
    desc: "Dedicated VAs, admin specialists, customer support, and CRM experts — the operational backbone your business needs.",
    color: "from-[#2D2B7F] to-[#4A47C4]",
    count: "5 Services",
    badge: "Core",
    link: "/virtual-assistant-services",
  },
  {
    id: "creative",
    icon: Palette,
    title: "Creative & Design Services",
    desc: "Graphic design, branding, motion graphics, video editing, presentations, and print — on-brand, every time.",
    color: "from-purple-500 to-pink-600",
    count: "6 Services",
    badge: null,
    link: "/creative-design-services",
  },
  {
    id: "web-dev",
    icon: Monitor,
    title: "Product & Web Development",
    desc: "Websites, web apps, landing pages, UI/UX design, and no-code development — built to convert and scale.",
    color: "from-sky-500 to-indigo-600",
    count: "5 Services",
    badge: null,
    link: "/web-development",
  },
  {
    id: "marketing",
    icon: TrendingUp,
    title: "Marketing & Growth",
    desc: "SEO, social media management, paid ads, content strategy, and analytics — the engine behind your pipeline.",
    color: "from-emerald-500 to-teal-600",
    count: "5 Services",
    badge: null,
    link: "/digital-marketing",
  },
  {
    id: "financial",
    icon: BarChart3,
    title: "Financial & Data Services",
    desc: "Financial analysis, forecasting, business intelligence, dashboards, and market research — data that drives decisions.",
    color: "from-amber-500 to-orange-600",
    count: "5 Services",
    badge: null,
    link: "/financial-analysis",
  },
  {
    id: "specialised",
    icon: Briefcase,
    title: "Specialized Business Support",
    desc: "Project management, operations, HR, legal compliance, and custom business roles — for every function.",
    color: "from-rose-500 to-pink-600",
    count: "5 Services",
    badge: "New",
    link: "/services",
  },
]

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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-assistant.png"
            alt="AI-powered virtual assistant team at work"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/96 via-[#1A1849]/88 to-[#2D2B7F]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/70 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#4A47C4]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-[5%] w-56 h-56 bg-[#7773E7]/15 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#9996ED] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED]">
                AI-Powered Business Operations Platform
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Scale Operations with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9996ED] to-[#BBB9F3]">
                Expert Remote Teams.
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2}
              className="text-xl text-white/65 mb-8 max-w-2xl leading-relaxed">
              Nolojia helps businesses scale through AI-powered virtual teams and specialized remote professionals —
              combining operations, creative, product, marketing, and financial expertise under one roof.
            </motion.p>

            {/* Quick-nav pills */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap gap-2.5 mb-10">
              {[
                { id: "virtual-ops", label: "Virtual Ops" },
                { id: "creative", label: "Creative & Design" },
                { id: "web-dev", label: "Web & Product" },
                { id: "marketing", label: "Marketing" },
                { id: "financial", label: "Financial & Data" },
                { id: "specialised", label: "Specialised" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className="px-4 py-2 rounded-full border border-white/40 text-white text-sm font-medium bg-white/5 hover:bg-white/15 hover:border-white/70 transition-all duration-300"
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

            {/* Social proof stats */}
            <motion.div variants={fadeUp} custom={5} className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: "6", label: "Service Categories" },
                { value: "30+", label: "Specialized Roles" },
                { value: "Top 1%", label: "Vetted Professionals" },
                { value: "< 1 wk", label: "Time to Launch" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-sm text-white/50">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6-CATEGORY OVERVIEW ───────────────────────────────────────────── */}
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
              Comprehensive Remote Operations
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              One Partner. Every Function.
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nolojia delivers AI-powered remote teams across six business-critical categories —
              from day-to-day operations to creative, product, marketing, and financial support. All under one roof.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
          >
            {categories.map(({ id, icon: Icon, title, desc, color, count, badge }, i) => (
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
                    <h3 className="text-xl font-bold text-white mt-1">{title}</h3>
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
                  A Day With Your Nolojia Team
                </motion.h2>
                <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  While you focus on decisions that move the business, your remote team handles everything else —
                  across operations, creative, and growth.
                </motion.p>
                <motion.div variants={stagger} className="space-y-4">
                  {[
                    { time: "8:00 AM", icon: Mail, title: "Inbox Zero — Before You Wake Up", desc: "Your VA triaged overnight emails, drafted replies, and flagged only what needs your decision." },
                    { time: "9:30 AM", icon: CalendarDays, title: "Your Day Is Already Planned", desc: "Calendar blocked, meetings confirmed, prep materials ready. No scrambling." },
                    { time: "12:00 PM", icon: PenLine, title: "Content Live Across All Channels", desc: "Blog post published. Social posts live. Newsletter sent. All on-brand, on-time." },
                    { time: "3:00 PM", icon: Target, title: "Pipeline Growing Automatically", desc: "30 prospects added to CRM. Outreach sent. Follow-up sequences running." },
                    { time: "5:00 PM", icon: BarChart3, title: "Reports Delivered. Decisions Ready.", desc: "Financial report updated. Marketing dashboard refreshed. Everything on one screen." },
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

      {/* ── CATEGORY A: VIRTUAL OPERATIONS SUPPORT ────────────────────────── */}
      <section id="virtual-ops" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2D2B7F] via-[#4A47C4] to-transparent" />
        <div className="container mx-auto px-4">
          <PillarHeader
            number="Category A"
            eyebrow="Virtual Operations Support"
            headline="Dedicated VAs for Every Role"
            subhead="Our virtual assistants aren't generalists. Each one is trained for a specific function — giving you real expertise, not a learning curve at your expense."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-12"
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

          <ServiceGrid services={virtualOpsServices} onBook={() => setBookingOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/virtual-assistant-services">
              <Button variant="outline" className="border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white rounded-xl px-8">
                Explore Virtual Assistant Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── CATEGORY B: CREATIVE & DESIGN SERVICES ────────────────────────── */}
      <section id="creative" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-bl-[60px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <PillarHeader
            number="Category B"
            eyebrow="Creative & Design Services"
            headline="Your Brand, Built Consistently"
            subhead="Graphic design, motion graphics, video editing, and print — produced on time and on brand, without you spending hours in design tools."
          />

          <ServiceGrid services={creativeServices} onBook={() => setBookingOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/creative-design-services">
              <Button variant="outline" className="border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white rounded-xl px-8">
                Explore Creative & Design Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── CATEGORY C: PRODUCT & WEB DEVELOPMENT ─────────────────────────── */}
      <section id="web-dev" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4">
          <PillarHeader
            number="Category C"
            eyebrow="Product & Web Development"
            headline="Build Digital Products That Scale"
            subhead="From landing pages to full web applications — our development and design professionals build digital experiences that convert visitors and retain users."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-sky-500/5 to-indigo-500/5 border border-sky-500/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center">
                <Monitor className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Tech-agnostic development across all major platforms</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Whether you need a WordPress site, a Webflow landing page, a Next.js web app, or a Figma prototype —
                  our developers and designers are proficient across every modern stack and no-code platform.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-wrap gap-2">
                {["Next.js", "Webflow", "WordPress", "Figma", "Bubble"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <ServiceGrid services={webDevServices} onBook={() => setBookingOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/web-development">
              <Button variant="outline" className="border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white rounded-xl px-8">
                Explore Web & Product Development
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── CATEGORY D: MARKETING & GROWTH ────────────────────────────────── */}
      <section id="marketing" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4 relative z-10">
          <PillarHeader
            number="Category D"
            eyebrow="Marketing & Growth"
            headline="Build the Pipeline. Drive Revenue."
            subhead="SEO, social media, paid advertising, content strategy, and analytics — the full-stack marketing engine that fills your funnel and converts at scale."
          />

          <ServiceGrid services={marketingServices} onBook={() => setBookingOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/digital-marketing">
              <Button variant="outline" className="border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white rounded-xl px-8">
                Explore Digital Marketing Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── CATEGORY E: FINANCIAL & DATA SERVICES ─────────────────────────── */}
      <section id="financial" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <div className="container mx-auto px-4">
          <PillarHeader
            number="Category E"
            eyebrow="Financial & Data Services"
            headline="Data-Driven Decisions. Accurate Numbers."
            subhead="Financial analysis, forecasting, business intelligence, and market research — expert financial support without the full-time senior hire cost."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto mb-12"
          >
            <div className="bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg mb-1">Investor-ready financials. Board-quality reporting.</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our financial analysts and data professionals work with global businesses to deliver accurate models,
                  actionable dashboards, and investor-ready reports — at a fraction of the cost of a full-time CFO.
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-wrap gap-2">
                {["Excel/Sheets", "Power BI", "Tableau", "Looker", "Python"].map((tag) => (
                  <span key={tag} className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <ServiceGrid services={financialServices} onBook={() => setBookingOpen(true)} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="/financial-analysis">
              <Button variant="outline" className="border-[#2D2B7F] text-[#2D2B7F] hover:bg-[#2D2B7F] hover:text-white rounded-xl px-8">
                Explore Financial & Data Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── CATEGORY F: SPECIALIZED BUSINESS SUPPORT ──────────────────────── */}
      <section id="specialised" className="py-24 bg-gray-50 relative overflow-hidden scroll-mt-20">
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] opacity-[0.05] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-tl-[60px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <PillarHeader
            number="Category F"
            eyebrow="Specialized Business Support"
            headline="Expert Professionals for Every Function"
            subhead="Project management, operations, HR, legal compliance, and custom business roles — skilled remote professionals who plug directly into your team."
          />

          <ServiceGrid services={specialisedServices} onBook={() => setBookingOpen(true)} />
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Simple Process
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4 text-gray-900">
              How It Works
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Getting started with Nolojia is straightforward. From first call to fully operational remote team
              in days — not months.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-4 gap-0 relative">
              {/* Connector line */}
              <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#2D2B7F] via-[#4A47C4] to-[#9996ED] hidden md:block" />

              {[
                {
                  step: "01",
                  icon: CheckSquare,
                  title: "Choose Your Service or Plan",
                  desc: "Select from 6 service categories or pick a subscription plan that fits your current needs.",
                  color: "bg-[#2D2B7F]",
                },
                {
                  step: "02",
                  icon: FileText,
                  title: "Submit Your Tasks",
                  desc: "Use our simple task submission system to send requests, briefs, or ongoing workflows.",
                  color: "bg-[#3D3AAF]",
                },
                {
                  step: "03",
                  icon: Zap,
                  title: "Our Team Executes",
                  desc: "Your dedicated remote professionals — powered by AI tools — deliver with speed and precision.",
                  color: "bg-[#4A47C4]",
                },
                {
                  step: "04",
                  icon: RefreshCw,
                  title: "Review and Scale",
                  desc: "Review deliverables, give feedback, and scale your team or service mix as your business grows.",
                  color: "bg-[#5956D6]",
                },
              ].map(({ step, icon: Icon, title, desc, color }, i) => (
                <motion.div key={step} variants={fadeUp} custom={i} className="flex flex-col items-center text-center px-4 relative">
                  <div className={`relative z-10 w-20 h-20 ${color} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-[#2D2B7F]/20`}>
                    <Icon className="w-8 h-8 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-[#2D2B7F] rounded-full text-[10px] font-bold text-[#2D2B7F] flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Button size="lg" onClick={() => setBookingOpen(true)}
              className="bg-[#2D2B7F] text-white hover:bg-[#232161] text-base px-10 py-6 rounded-xl font-semibold shadow-lg shadow-[#2D2B7F]/25 group">
              Get Started Today
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* ── FLEXIBLE MONTHLY PLANS ────────────────────────────────────────── */}
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
              Subscription Plans
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">
              Flexible Monthly Plans
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/60 text-lg max-w-2xl mx-auto">
              Subscribe to a dedicated remote team — unlimited task requests, fast turnaround, and ongoing support
              across every service category. Scale up or down anytime.
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
                name: "Starter Plan",
                tier: "For growing businesses",
                tagline: "Core virtual assistant and admin support to handle your daily operations.",
                highlight: false,
                badge: null,
                features: [
                  "1 dedicated virtual assistant",
                  "Up to 80 monthly hours",
                  "VA + admin support",
                  "Standard turnaround (48hrs)",
                  "Email and chat support",
                  "Client success manager",
                  "AI-assisted tools included",
                  "Monthly performance review",
                ],
                cta: "Get Started",
              },
              {
                name: "Growth Plan",
                tier: "Most popular",
                tagline: "Multi-service support across operations, creative, and marketing — with faster delivery.",
                highlight: true,
                badge: "Most Popular",
                features: [
                  "Everything in Starter",
                  "Up to 160 monthly hours",
                  "VA + Creative + Marketing support",
                  "Priority turnaround (24hrs)",
                  "Dedicated team (VA + Designer + Specialist)",
                  "Advanced workflow automation",
                  "Weekly strategy check-ins",
                  "Access to all 6 service categories",
                ],
                cta: "Get Started",
              },
              {
                name: "Pro Plan",
                tier: "For scaling enterprises",
                tagline: "Full team access with priority delivery, a dedicated account manager, and custom integrations.",
                highlight: false,
                badge: null,
                features: [
                  "Everything in Growth",
                  "Custom monthly hours",
                  "Full remote team access",
                  "Priority delivery (same-day)",
                  "Dedicated account director",
                  "Custom AI workflow integrations",
                  "White-glove onboarding",
                  "Quarterly business reviews",
                ],
                cta: "Talk to Sales",
              },
            ].map(({ name, tier, tagline, features, highlight, badge, cta }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}
                className={`rounded-2xl p-6 border transition-all duration-300 ${highlight
                  ? "bg-white text-gray-900 border-white scale-105 shadow-2xl shadow-white/10"
                  : "bg-white/5 border-white/10 hover:border-[#4A47C4]/50 hover:bg-white/10"}`}>
                {badge && (
                  <div className="flex justify-center mb-4">
                    <span className="bg-[#2D2B7F] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {badge}
                    </span>
                  </div>
                )}
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${highlight ? "text-[#2D2B7F]" : "text-[#9996ED]"}`}>
                  {tier}
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${highlight ? "text-gray-900" : "text-white"}`}>{name}</h3>
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
                  {cta}
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
            All plans include unlimited task requests within scope. No lock-in contracts.{" "}
            <Link href="/contact" className="underline text-white/50 hover:text-white transition-colors">
              Talk to us about custom plans →
            </Link>
          </motion.p>
        </div>
      </section>

      {/* ── WHY NOLOJIA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              Why Nolojia
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4 text-gray-900">
              Your All-in-One Remote Operations Partner
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nolojia helps businesses scale operations through AI-powered virtual teams and specialized remote professionals —
              delivering expert-level output without the overhead of full-time hires.
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
                icon: Sparkles,
                title: "AI-Powered Workflows",
                desc: "Every professional on our team is equipped with AI tools that accelerate delivery, improve accuracy, and scale output — without scaling cost.",
                accent: "#2D2B7F",
              },
              {
                icon: UserCheck,
                title: "Skilled Remote Professionals",
                desc: "We hire only the top 1% of applicants — specialists, not generalists. Each professional is vetted, trained, and assigned to your specific role.",
                accent: "#4A47C4",
              },
              {
                icon: TrendingUp,
                title: "Scalable Support",
                desc: "Add a new service category, increase your hours, or build a full remote team — with no long-term contracts or penalties for scaling.",
                accent: "#059669",
              },
              {
                icon: Globe,
                title: "Global Service Delivery",
                desc: "Operating across time zones, our teams provide round-the-clock support that keeps your business moving — regardless of where you're based.",
                accent: "#0EA5E9",
              },
              {
                icon: DollarSign,
                title: "Cost-Effective Operations",
                desc: "Access senior-level expertise at a fraction of the cost of a full-time hire. No recruitment fees, no benefits, no office space — just results.",
                accent: "#F59E0B",
              },
              {
                icon: Shield,
                title: "Enterprise-Grade Trust",
                desc: "Every professional signs an NDA, passes a background check, and undergoes rigorous vetting. Your data and operations are in safe hands.",
                accent: "#F43F5E",
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div key={title} variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${accent}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: accent }} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
                  alt="Nolojia remote team"
                  width={400}
                  height={500}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-lg">We&apos;re not just a VA agency.</p>
                  <p className="text-white/70 text-sm mt-1">We&apos;re your full-stack remote operations partner.</p>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-[#2D2B7F]" />
                  <span className="text-xs font-bold text-gray-900">Top 1% of all applicants</span>
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
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">Nolojia vs. The Rest</span>
                <h2 className="text-4xl font-bold mb-3">Built Different</h2>
                <p className="text-muted-foreground text-lg">
                  Most agencies give you a body. Nolojia gives you a specialist — backed by AI tools,
                  a success manager, and a proven remote operations playbook.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left p-5 font-semibold text-gray-500 w-1/2">Feature</th>
                      <th className="p-5 font-bold text-[#2D2B7F] text-center">Nolojia</th>
                      <th className="p-5 font-medium text-gray-400 text-center">Typical Agency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "AI-powered workflows for all professionals", nolojia: true, other: false },
                      { feature: "6 service categories under one roof", nolojia: true, other: false },
                      { feature: "Dedicated team (VA + Designer + Specialist)", nolojia: true, other: false },
                      { feature: "Flexible monthly subscription plans", nolojia: true, other: false },
                      { feature: "4-week integration guarantee", nolojia: true, other: false },
                      { feature: "Operational in under 1 week", nolojia: true, other: false },
                      { feature: "No minimum contract commitment", nolojia: true, other: false },
                      { feature: "Dedicated client success manager", nolojia: true, other: false },
                      { feature: "Custom playbook built per client", nolojia: true, other: false },
                      { feature: "NDA & background check on all professionals", nolojia: true, other: true },
                      { feature: "Same professional continuity guaranteed", nolojia: true, other: false },
                      { feature: "Monthly strategy optimization calls", nolojia: true, other: false },
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

      {/* ── POSITIONING STRIP ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0F0E2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#4A47C4]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-[#7773E7]/10 rounded-full blur-[60px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-12 text-center"
          >
            {[
              { icon: Rocket, value: "30+", label: "Specialized Roles" },
              { icon: Globe, value: "Global", label: "Service Delivery" },
              { icon: Zap, value: "< 1 Week", label: "Time to Launch" },
              { icon: Star, value: "Top 1%", label: "Vetted Professionals" },
              { icon: RefreshCw, value: "No Lock-in", label: "Flexible Contracts" },
            ].map(({ icon: Icon, value, label }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-1">
                  <Icon className="w-6 h-6 text-[#9996ED]" />
                </div>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-sm text-white/50">{label}</p>
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
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Ready to Scale?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Build Your Remote Operations Team Today
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-2xl mx-auto">
              Book a free discovery call. We&apos;ll design the right team and service mix for your business —
              across any of our 6 categories. No pressure, no commitment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setBookingOpen(true)}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group">
                <CalendarDays className="w-5 h-5 mr-2" />
                Book Your Free Discovery Call
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
