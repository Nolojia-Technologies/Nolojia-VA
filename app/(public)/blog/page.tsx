"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useBookingNudge } from "@/components/ui/booking-popup"
import { ArrowRight, Clock, Calendar, Tag, CalendarDays } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const posts = [
  {
    slug: "#",
    category: "Productivity",
    title: "The Founder's Guide to Inbox Zero (And Why It's Not What You Think)",
    excerpt: "Inbox zero isn't about obsessively deleting emails. It's about building a system that means you never have to think about your inbox again. Here's how our clients do it.",
    readTime: "6 min read",
    date: "Feb 28, 2025",
    featured: true,
    image: "/images/workspace-overhead.png",
  },
  {
    slug: "#",
    category: "AI & Automation",
    title: "5 AI Workflows Every Founder Should Have Running By Next Week",
    excerpt: "The assistants on our platform use these exact workflows every day. We're sharing them so you can either implement them yourself — or hand them off to someone who will.",
    readTime: "8 min read",
    date: "Feb 14, 2025",
    featured: false,
    image: "/images/team-collaboration.png",
  },
  {
    slug: "#",
    category: "Delegation",
    title: "How to Delegate Without Losing Control: A Framework for First-Time Delegators",
    excerpt: "The biggest fear around hiring an assistant is that things will fall through the cracks. This playbook eliminates that fear with a simple system that keeps you informed without keeping you involved.",
    readTime: "10 min read",
    date: "Feb 3, 2025",
    featured: false,
    image: "/images/hero-assistant.png",
  },
  {
    slug: "#",
    category: "Operations",
    title: "Why Your Calendar Is the Real Problem (And How to Fix It in 48 Hours)",
    excerpt: "Most founders treat their calendar like a to-do list. The best operators treat it like a strategy document. Here's the difference — and how to cross over.",
    readTime: "5 min read",
    date: "Jan 22, 2025",
    featured: false,
    image: "/images/workspace-overhead.png",
  },
  {
    slug: "#",
    category: "Hiring",
    title: "Virtual Assistant vs. Executive Assistant: Which Does Your Business Actually Need?",
    excerpt: "The terms get used interchangeably, but they're meaningfully different. Understanding the distinction could save you thousands — and a lot of frustration.",
    readTime: "7 min read",
    date: "Jan 10, 2025",
    featured: false,
    image: "/images/team-collaboration.png",
  },
  {
    slug: "#",
    category: "AI & Automation",
    title: "The Hidden Cost of Doing It Yourself: How to Calculate What Your Time Is Actually Worth",
    excerpt: "Before you dismiss the cost of an assistant, run this calculation. Most founders are shocked to discover they're doing $3,000/week worth of work that costs $500/month to offload.",
    readTime: "4 min read",
    date: "Dec 19, 2024",
    featured: false,
    image: "/images/hero-assistant.png",
  },
]

const categories = ["All", "Productivity", "AI & Automation", "Delegation", "Operations", "Hiring"]

export default function BlogPage() {
  const { openFullPopup } = useBookingNudge()
  const [activeCategory, setActiveCategory] = useState("All")

  const filtered = activeCategory === "All" ? posts : posts.filter(p => p.category === activeCategory)
  const [featured, ...rest] = filtered

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/workspace-overhead.png" alt="Nolojia Blog" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/93 via-[#1A1849]/88 to-[#2D2B7F]/70" />
        </div>
        <div className="absolute top-16 right-[15%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />

        <div className="container mx-auto px-4 relative z-10 py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Insights & Resources
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              The Nolojia Blog
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 leading-relaxed">
              Practical guides, productivity frameworks, and real stories to help you
              build a business that runs without you being in everything.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="sticky top-16 md:top-20 z-30 bg-white border-b shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                  ? "bg-[#2D2B7F] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POSTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Featured post */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-12"
            >
              <Link href={featured.slug}>
                <div className="group grid lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2D2B7F]/5 transition-all duration-500">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <Image src={featured.image} alt={featured.title} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F0E2E]/20" />
                    <span className="absolute top-4 left-4 bg-[#2D2B7F] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-[#2D2B7F]/10 text-[#2D2B7F] text-xs font-bold px-3 py-1 rounded-full">
                        {featured.category}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#2D2B7F] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {rest.map((post, i) => (
              <motion.div key={post.title} variants={fadeUp} custom={i}>
                <Link href={post.slug}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={post.image} alt={post.title} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/30 to-transparent" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-3 h-3 text-[#2D2B7F]" />
                        <span className="text-xs font-bold text-[#2D2B7F]">{post.category}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 flex-1 group-hover:text-[#2D2B7F] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-gray-50">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== NEWSLETTER + CTA ===== */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/team-collaboration.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/93 to-[#2D2B7F]/88" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">Newsletter</span>
              <h2 className="text-3xl font-bold text-white mb-4">
                Get the Weekly Playbook
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                One email, every Tuesday. Practical tips on delegation, productivity, and AI tools that your team can start using immediately.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-white/40"
                />
                <Button className="bg-white text-[#2D2B7F] hover:bg-white/90 rounded-xl font-semibold px-5">
                  Subscribe
                </Button>
              </div>
              <p className="text-white/30 text-xs mt-3">No spam. Unsubscribe anytime.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <p className="text-white/40 text-sm mb-4">Ready to stop reading and start delegating?</p>
              <Button size="lg" onClick={openFullPopup}
                className="bg-white text-[#2D2B7F] hover:bg-white/90 px-8 py-6 rounded-xl font-semibold group">
                <CalendarDays className="w-5 h-5 mr-2" />
                Book a Free Discovery Call
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
