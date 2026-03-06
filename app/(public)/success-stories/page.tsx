"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BookingPopup } from "@/components/ui/booking-popup"
import { ArrowRight, Star, Clock, TrendingUp, Users, CalendarDays, Quote, BarChart3 } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

const stories = [
  { name: "Sarah K.", role: "Founder", company: "The 1% Woman Coach", initial: "S", industry: "Coaching", timeSaved: "22 hrs/week", rating: 5,
    headline: "My inbox went from anxiety to zero.",
    quote: "I used to start every Monday dreading my inbox. Within two weeks of working with my Nolojia assistant, that was completely gone. She manages everything — triage, drafts, follow-ups — and I only see what genuinely needs my attention.",
    results: ["Inbox fully managed daily", "Calendar conflicts eliminated", "Client response time cut by 80%"] },
  { name: "James O.", role: "CEO", company: "Meridian Consulting Group", initial: "J", industry: "Consulting", timeSaved: "18 hrs/week", rating: 5,
    headline: "My assistant knew my business in two weeks.",
    quote: "I was deeply skeptical about delegating. I'd tried VAs before and always ended up doing things myself anyway. This was completely different. Within two weeks, my assistant understood the nuances of my business better than some people who'd been on my team for months.",
    results: ["Full calendar ownership from week one", "Research produced proactively", "Client prep materials always ready"] },
  { name: "Priya M.", role: "Co-founder", company: "Stackline SaaS", initial: "P", industry: "Technology", timeSaved: "25 hrs/week", rating: 5,
    headline: "Like having a whole ops team at a fraction of the cost.",
    quote: "The AI-assisted workflows our assistant built for us save hours every single day. What used to take our team an entire morning is done before 9am. We've scaled operations without scaling headcount.",
    results: ["Automated 4 recurring workflows", "CRM kept fully up to date", "Team bandwidth freed up by 40%"] },
  { name: "David H.", role: "CFO", company: "Auckland Flying School", initial: "D", industry: "Aviation", timeSaved: "15 hrs/week", rating: 5,
    headline: "A massive difference from the very first week.",
    quote: "Just a couple of weeks in and my assistant is making a massive difference. The scheduling alone — coordinating flights, instructors, and student bookings — would take me hours. Now it's handled.",
    results: ["Complex scheduling fully managed", "Vendor communication handled", "Financial focus time tripled"] },
  { name: "Mitch S.", role: "Co-founder", company: "NSBA Group", initial: "M", industry: "Business Services", timeSaved: "20 hrs/week", rating: 5,
    headline: "She took the initiative before I even asked.",
    quote: "What impressed me most wasn't what she did when I asked — it was what she did before I asked. She saw a gap in our follow-up process, flagged it, and had a solution ready. That level of proactiveness is rare.",
    results: ["Proactive process improvements", "Follow-up rate increased to 100%", "New SOP documentation built"] },
  { name: "Keri F.", role: "Founder", company: "Apex Growth Partners", initial: "K", industry: "Growth Consulting", timeSaved: "28 hrs/week", rating: 5,
    headline: "My company has grown because of this support.",
    quote: "I'm not exaggerating when I say my company has grown and is thriving thanks to the support I get from Nolojia. Having someone fully own the operational side freed me to do what I do best: sell, advise, and serve clients.",
    results: ["Revenue grew 35% in first 6 months", "Client capacity doubled", "Zero missed deliverables"] },
]

export default function SuccessStoriesPage() {
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
      {/* ===== HERO — team-collaboration bg ===== */}
      <section className="relative min-h-[65vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/team-collaboration.png"
            alt="Client success stories"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/90 via-[#1A1849]/82 to-[#2D2B7F]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E2E]/60 via-transparent to-transparent" />
        </div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-16 left-[15%] w-48 h-48 bg-[#7773E7]/15 rounded-full blur-[80px] animate-float-delayed" />

        <div className="container mx-auto px-4 relative z-10 py-28">
          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.span variants={fadeUp} custom={0}
                className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
                Client Stories
              </motion.span>
              <motion.h1 variants={fadeUp} custom={1}
                className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Success Stories
              </motion.h1>
              <motion.p variants={fadeUp} custom={2} className="text-xl text-white/60 leading-relaxed mb-8">
                Real founders. Real outcomes. Here&apos;s what&apos;s possible when you stop doing everything yourself.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex gap-8">
                {[
                  { value: "500+", label: "Founders" },
                  { value: "4.9★", label: "Avg. Rating" },
                  { value: "20hrs", label: "Saved/Week" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="text-2xl font-bold text-white">{value}</div>
                    <div className="text-xs text-white/50">{label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Floating testimonial card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="glass-dark rounded-2xl p-6 shadow-2xl">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-5">
                  &ldquo;I don&apos;t know how I ran a business without this. My inbox went from anxiety to completely under control in two weeks.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D2B7F] to-[#4A47C4] flex items-center justify-center text-white font-bold text-sm">S</div>
                  <div>
                    <p className="text-white font-semibold text-sm">Sarah K.</p>
                    <p className="text-white/40 text-xs">Founder, E-commerce Brand</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-12 bg-white border-b relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center"
          >
            {[
              { value: "500+", label: "Founders Helped", icon: Users },
              { value: "4.9 / 5", label: "Average Rating", icon: Star },
              { value: "20hrs", label: "Avg. Weekly Savings", icon: Clock },
              { value: "93%", label: "First-Match Success", icon: TrendingUp },
            ].map(({ value, label, icon: Icon }, i) => (
              <motion.div key={label} variants={fadeUp} custom={i}>
                <div className="w-10 h-10 bg-[#2D2B7F]/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-[#2D2B7F]" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED STORIES — workspace decorative corner ===== */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] opacity-[0.06] pointer-events-none hidden lg:block">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-bl-[60px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="text-center mb-16">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#2D2B7F] mb-4">
              In Their Own Words
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl font-bold mb-4">What Our Clients Say</motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              No scripts. No incentives. Just honest accounts of what changed.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {stories.map(({ name, role, company, initial, industry, timeSaved, rating, headline, quote, results }, i) => (
              <motion.div key={name} variants={fadeUp} custom={i}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-[#2D2B7F]/5 hover:-translate-y-1 transition-all duration-500 flex flex-col">
                <div className="p-6 bg-gradient-to-br from-[#2D2B7F]/5 to-[#4A47C4]/5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D2B7F] to-[#4A47C4] flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {initial}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{name}</p>
                        <p className="text-xs text-muted-foreground">{role} · {company}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium bg-[#2D2B7F]/10 text-[#2D2B7F] px-2 py-1 rounded-full">{industry}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: rating }).map((_, si) => (
                      <Star key={si} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D2B7F]">
                    <Clock className="w-3.5 h-3.5" />{timeSaved} saved
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-[#2D2B7F]/20 mb-2" />
                    <h3 className="font-bold text-gray-900 text-base mb-3">&ldquo;{headline}&rdquo;</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{quote}</p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Results</p>
                    <ul className="space-y-1.5">
                      {results.map((r) => (
                        <li key={r} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F] flex-shrink-0" />{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PULL QUOTE — hero-assistant bg ===== */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0E2E]/93 to-[#2D2B7F]/88" />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A47C4]/15 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Quote className="w-14 h-14 text-[#4A47C4]/50 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
              &ldquo;I&apos;m not exaggerating when I say my company has grown and is thriving
              thanks to the support and commitment from my Nolojia assistant.&rdquo;
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A47C4] to-[#7773E7] flex items-center justify-center text-white font-bold text-lg shadow-lg">K</div>
              <div className="text-left">
                <p className="font-semibold text-white">Keri F.</p>
                <p className="text-white/50 text-sm">Founder, Apex Growth Partners</p>
              </div>
            </div>
            {/* Floating stat below quote */}
            <div className="inline-flex items-center gap-3 glass-dark rounded-2xl px-6 py-3 mt-2">
              <BarChart3 className="w-5 h-5 text-[#9996ED]" />
              <span className="text-white/80 text-sm font-medium">Revenue grew 35% in the first 6 months</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== MINI TESTIMONIALS — image bg ===== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-[250px] h-[300px] hidden xl:block opacity-[0.05]">
          <Image src="/images/team-collaboration.png" alt="" fill className="object-cover rounded-tr-[60px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}
            className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl font-bold mb-4">More From Our Community</motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-muted-foreground">
              Founders, operators, and leaders who found a better way to work.
            </motion.p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={stagger}
            className="grid md:grid-cols-2 gap-4">
            {[
              { quote: "I've tried three VA services. This is the only one that actually stuck.", author: "Thomas R.", role: "E-commerce Founder" },
              { quote: "The AI workflows they built are genuinely smarter than what I would have designed myself.", author: "Aisha N.", role: "Marketing Director" },
              { quote: "Onboarding was seamless. By week two, I felt like she'd been on my team for months.", author: "Leo B.", role: "SaaS CEO" },
              { quote: "The ROI calculation is simple: 20 hours saved per week at my billing rate. It pays for itself many times over.", author: "Carol W.", role: "Independent Consultant" },
              { quote: "I keep waiting to find something they can't handle. I'm still waiting.", author: "Ryan M.", role: "Agency Owner" },
              { quote: "For the first time in years, my weekends actually feel like weekends.", author: "Sam T.", role: "Startup Founder" },
            ].map(({ quote, author, role }, i) => (
              <motion.div key={author} variants={fadeUp} custom={i}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-[#2D2B7F]/20 hover:shadow-md transition-all duration-300">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star key={si} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-4">&ldquo;{quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-xs text-gray-900">{author}</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA — workspace bg ===== */}
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
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Your Story Could Be Next</h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              Book a free discovery call and let&apos;s talk about what&apos;s possible when you have the right support.
            </p>
            <Button size="lg" onClick={() => setBookingOpen(true)}
              className="bg-white text-[#2D2B7F] hover:bg-white/90 text-base px-10 py-6 rounded-xl font-semibold shadow-xl shadow-black/20 group">
              <CalendarDays className="w-5 h-5 mr-2" />
              Book Your Free Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-white/40">
              Spots are limited — we only take on clients we can truly serve.
            </p>
          </motion.div>
        </div>
      </section>

      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
