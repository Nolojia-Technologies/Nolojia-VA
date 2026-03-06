"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Shield, Lock, Eye, Database, Mail, RefreshCw } from "lucide-react"

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" },
  }),
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }

const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information you provide directly",
        text: "When you fill out our contact form, book a discovery call, or subscribe to our newsletter, we collect your name, email address, company name, and any details you choose to share about your business needs.",
      },
      {
        subtitle: "Information collected automatically",
        text: "We collect standard web analytics data including your IP address, browser type, referring pages, and pages visited on our site. This data is used solely to improve our website experience and understand how visitors interact with our content.",
      },
      {
        subtitle: "Communication records",
        text: "When you contact us by email or through our forms, we retain those communications to better serve your requests and maintain continuity in our relationship with you.",
      },
    ],
  },
  {
    icon: Eye,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "To respond to your enquiries",
        text: "We use your contact information to reply to messages, schedule discovery calls, and follow up on service enquiries. We will only contact you in ways you have consented to.",
      },
      {
        subtitle: "To deliver our services",
        text: "If you become a client, we use relevant information to match you with the right assistant, onboard your team, and ensure our service meets your expectations.",
      },
      {
        subtitle: "To send you updates (with consent)",
        text: "If you subscribe to our newsletter, we may send you practical guides, productivity tips, and company news. You can unsubscribe at any time using the link in every email.",
      },
      {
        subtitle: "To improve our platform",
        text: "Aggregated, anonymised analytics help us understand which parts of our site are most useful and where we can improve. No personally identifiable information is used for this purpose.",
      },
    ],
  },
  {
    icon: Shield,
    title: "How We Protect Your Data",
    content: [
      {
        subtitle: "Technical safeguards",
        text: "Our website is served over HTTPS. Any personal data stored in our systems is protected with industry-standard encryption at rest and in transit. We use trusted third-party infrastructure providers who maintain their own robust security certifications.",
      },
      {
        subtitle: "Access controls",
        text: "Access to personal data within our team is restricted to those who need it to do their jobs. All staff receive training on data handling responsibilities.",
      },
      {
        subtitle: "Retention policy",
        text: "We retain personal data only as long as necessary to fulfil the purpose for which it was collected, or as required by law. Contact form submissions are reviewed and cleared on a rolling 12-month basis unless an active client relationship exists.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Sharing Your Information",
    content: [
      {
        subtitle: "We do not sell your data",
        text: "Nolojia does not sell, rent, or trade your personal information to any third party for marketing purposes — ever.",
      },
      {
        subtitle: "Trusted service providers",
        text: "We may share limited data with trusted tools we use to run our business — such as our calendar booking platform, email service provider, and website analytics. Each provider is bound by their own privacy commitments and data processing agreements.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose information if required to do so by law, court order, or governmental authority, or to protect the rights, property, or safety of Nolojia, our clients, or others.",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "Your Rights",
    content: [
      {
        subtitle: "Access and correction",
        text: "You have the right to request a copy of the personal data we hold about you and to ask us to correct any inaccuracies.",
      },
      {
        subtitle: "Deletion",
        text: "You may request that we delete your personal data. We will action this promptly, subject to any legal obligations we have to retain certain records.",
      },
      {
        subtitle: "Opt-out",
        text: "You can unsubscribe from our newsletter at any time using the link in our emails, or by contacting us directly. Unsubscribing from marketing communications does not affect our ability to send you transactional messages related to an active service.",
      },
      {
        subtitle: "Cookies",
        text: "We use only essential and analytics cookies. You can control cookie behaviour through your browser settings at any time.",
      },
    ],
  },
  {
    icon: Mail,
    title: "Contact & Updates",
    content: [
      {
        subtitle: "Questions about this policy",
        text: "If you have any questions, concerns, or requests relating to this Privacy Policy or how we handle your data, please email us at privacy@nolojia.com. We aim to respond within 5 business days.",
      },
      {
        subtitle: "Policy updates",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we do, we will update the effective date below and, where appropriate, notify active clients by email.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[42vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/workspace-overhead.png" alt="Privacy Policy" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 via-[#1A1849]/90 to-[#2D2B7F]/75" />
        </div>
        <div className="absolute top-20 right-[18%] w-56 h-56 bg-[#4A47C4]/20 rounded-full blur-[90px] animate-float" />

        <div className="container mx-auto px-4 relative z-10 py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Legal
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Privacy Policy
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/60 leading-relaxed">
              We believe privacy is a right, not a checkbox. Here is exactly how we collect,
              use, and protect your information.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-sm text-white/30 mt-4">
              Effective date: 1 January 2025 &nbsp;&middot;&nbsp; Last updated: 1 March 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== CONTENT ===== */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Subtle image watermark */}
        <div className="absolute top-0 right-0 w-[260px] h-[260px] opacity-[0.04] pointer-events-none hidden lg:block">
          <Image src="/images/hero-assistant.png" alt="" fill className="object-cover rounded-bl-[60px]" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">

          {/* Intro box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#2D2B7F]/5 border border-[#2D2B7F]/10 rounded-2xl p-6 mb-12"
          >
            <p className="text-gray-700 leading-relaxed text-sm">
              This Privacy Policy applies to the Nolojia website at{" "}
              <span className="font-semibold text-[#2D2B7F]">nolojia.com</span> and all services
              provided by Nolojia (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By using our website or engaging with our
              services, you agree to the practices described in this policy. If you do not agree,
              please do not use our site or services.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, sIdx) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: sIdx * 0.05 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-center gap-4 px-7 py-5 border-b border-gray-100 bg-gray-50/50">
                  <div className="w-10 h-10 rounded-xl bg-[#2D2B7F]/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-5 h-5 text-[#2D2B7F]" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                </div>

                {/* Section body */}
                <div className="px-7 py-6 space-y-5">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.subtitle}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 text-center"
          >
            <p className="text-sm text-gray-400">
              Questions?{" "}
              <Link href="/contact" className="text-[#2D2B7F] hover:underline font-medium">
                Contact us
              </Link>{" "}
              or email{" "}
              <a href="mailto:privacy@nolojia.com" className="text-[#2D2B7F] hover:underline font-medium">
                privacy@nolojia.com
              </a>
              . Also see our{" "}
              <Link href="/terms" className="text-[#2D2B7F] hover:underline font-medium">
                Terms of Service
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/team-collaboration.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/50 text-sm mb-3">Have a question about your data?</p>
            <h2 className="text-3xl font-bold text-white mb-4">We&apos;re happy to help.</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Reach out to our team directly and we&apos;ll get back to you within one business day.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#2D2B7F] rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Contact Us
              </Link>
              <a
                href="mailto:privacy@nolojia.com"
                className="inline-flex items-center justify-center px-7 py-3 bg-white/10 border-2 border-white/50 text-white rounded-xl font-semibold text-sm hover:bg-white/20 hover:border-white/70 transition-colors"
              >
                privacy@nolojia.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
