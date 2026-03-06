"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Users, CreditCard, AlertTriangle, Scale, RefreshCw } from "lucide-react"

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
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to these terms",
        text: "By accessing or using the Nolojia website at nolojia.com, requesting a discovery call, or engaging with any Nolojia service, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use our website or services.",
      },
      {
        subtitle: "Who these terms apply to",
        text: "These terms apply to all visitors to our website and to all clients who engage Nolojia for virtual assistant or operational support services. References to \"you\" or \"client\" include both.",
      },
      {
        subtitle: "Changes to these terms",
        text: "We reserve the right to update these Terms of Service at any time. When we do, we will revise the effective date at the bottom of this page. Continued use of our services after changes are posted constitutes acceptance of those changes. We will notify active clients of material changes by email.",
      },
    ],
  },
  {
    icon: Users,
    title: "Our Services",
    content: [
      {
        subtitle: "What Nolojia provides",
        text: "Nolojia provides virtual assistant and business operations support services, including but not limited to calendar management, email management, research, data entry, project coordination, and AI-assisted workflow setup. The specific scope of work is agreed upon during onboarding and documented in your service agreement.",
      },
      {
        subtitle: "Service availability",
        text: "We strive to provide consistent, high-quality service during agreed working hours. While we make every effort to maintain availability, we cannot guarantee uninterrupted service due to factors outside our control, including third-party platform outages or circumstances affecting your assigned assistant.",
      },
      {
        subtitle: "Assistant matching",
        text: "We carefully match clients with assistants based on skill set, timezone, communication style, and business context. If for any reason the match is not the right fit within the first four weeks, we will re-pair you at no additional cost — this is our standard onboarding guarantee.",
      },
      {
        subtitle: "Information-only website",
        text: "This website is informational in nature. No account creation, login, or sign-up is required or offered here. To engage our services, please book a discovery call or contact us directly.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    content: [
      {
        subtitle: "Pricing and plans",
        text: "Our pricing plans are provided upon request during your discovery call or by contacting us directly. All prices are quoted in USD unless otherwise stated. Pricing is subject to change; existing clients will receive at least 30 days' notice of any price changes affecting their plan.",
      },
      {
        subtitle: "Payment terms",
        text: "Payment terms, billing cycles, and accepted payment methods are specified in your individual service agreement. Invoices are typically issued monthly in advance. Late payments may result in a pause of services until the outstanding balance is settled.",
      },
      {
        subtitle: "Cancellation",
        text: "You may cancel your service at any time by providing written notice to your account manager. Notice periods and any applicable terms are outlined in your service agreement. Prepaid service hours or subscription periods are generally non-refundable unless cancellation is due to a breach by Nolojia.",
      },
      {
        subtitle: "Refunds",
        text: "Refund requests are handled on a case-by-case basis. If you believe service was not delivered as agreed, please contact us promptly. We are committed to resolving disputes fairly and quickly.",
      },
    ],
  },
  {
    icon: AlertTriangle,
    title: "Your Responsibilities",
    content: [
      {
        subtitle: "Accurate information",
        text: "You agree to provide accurate and complete information when engaging our services. Providing false or misleading information may result in termination of your service agreement.",
      },
      {
        subtitle: "Appropriate use",
        text: "You agree not to direct your assigned assistant to engage in any activity that is illegal, unethical, harmful to third parties, or in violation of any applicable platform terms of service. Any such direction will be refused and may result in immediate termination of your agreement.",
      },
      {
        subtitle: "Confidentiality of access",
        text: "If you share login credentials, account access, or proprietary information with your assistant, you remain responsible for any consequences arising from that access. We recommend granting only the minimum necessary level of access for tasks to be completed.",
      },
      {
        subtitle: "Timely communication",
        text: "Effective delegation requires clear communication. You agree to respond to questions and feedback from your assistant in a reasonably timely manner to avoid delays in task completion.",
      },
    ],
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "No warranties",
        text: "Nolojia provides its services on an \"as is\" and \"as available\" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      },
      {
        subtitle: "Limitation of damages",
        text: "In no event shall Nolojia be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or website, even if we have been advised of the possibility of such damages. Our total liability to you for any claim shall not exceed the total fees paid by you in the three months preceding the claim.",
      },
      {
        subtitle: "Third-party tools",
        text: "Our services may involve the use of third-party platforms and tools (such as Google Workspace, project management software, or communication platforms). We are not responsible for the performance, availability, or terms of those third-party services.",
      },
      {
        subtitle: "Force majeure",
        text: "We are not liable for any failure or delay in performance resulting from causes beyond our reasonable control, including natural disasters, government actions, internet outages, or other force majeure events.",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing law",
        text: "These Terms of Service are governed by and construed in accordance with applicable law. Specific jurisdiction is determined by the governing law clause in your individual service agreement.",
      },
      {
        subtitle: "Dispute resolution",
        text: "We prefer to resolve any disputes directly and amicably. If you have a concern, please contact us first. If we cannot reach a resolution informally, disputes will be submitted to binding arbitration in accordance with the rules specified in your service agreement.",
      },
      {
        subtitle: "Intellectual property",
        text: "All content on this website — including text, design, logos, and imagery — is the property of Nolojia or its licensors and is protected by copyright law. Work product created by your assistant on your behalf becomes your property upon full payment for the relevant period of service.",
      },
      {
        subtitle: "Severability",
        text: "If any provision of these Terms is found to be unenforceable or invalid under applicable law, that provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions will continue in full force and effect.",
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[42vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-assistant.png" alt="Terms of Service" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 via-[#1A1849]/90 to-[#2D2B7F]/75" />
        </div>
        <div className="absolute bottom-16 right-[12%] w-64 h-64 bg-[#4A47C4]/20 rounded-full blur-[100px] animate-float-delayed" />

        <div className="container mx-auto px-4 relative z-10 py-24 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-2xl mx-auto">
            <motion.span variants={fadeUp} custom={0}
              className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#9996ED] mb-4">
              Legal
            </motion.span>
            <motion.h1 variants={fadeUp} custom={1}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Terms of Service
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-white/60 leading-relaxed">
              Straightforward terms that protect both you and us. Please read before engaging our services.
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
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover rounded-bl-[60px]" />
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
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Nolojia website and services
              operated by <span className="font-semibold text-[#2D2B7F]">Nolojia</span> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              These Terms should be read alongside our{" "}
              <Link href="/privacy" className="text-[#2D2B7F] hover:underline font-medium">Privacy Policy</Link>.
              If you have questions about anything here, please{" "}
              <Link href="/contact" className="text-[#2D2B7F] hover:underline font-medium">contact us</Link>{" "}
              before proceeding.
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
              Questions about these terms?{" "}
              <Link href="/contact" className="text-[#2D2B7F] hover:underline font-medium">
                Contact us
              </Link>{" "}
              or email{" "}
              <a href="mailto:legal@nolojia.com" className="text-[#2D2B7F] hover:underline font-medium">
                legal@nolojia.com
              </a>
              . Also see our{" "}
              <Link href="/privacy" className="text-[#2D2B7F] hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/workspace-overhead.png" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0E2E]/95 to-[#2D2B7F]/90" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/50 text-sm mb-3">Ready to get started?</p>
            <h2 className="text-3xl font-bold text-white mb-4">Let&apos;s have a real conversation.</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto text-sm leading-relaxed">
              Book a free, no-obligation discovery call and find out whether Nolojia is the right fit for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/book"
                className="inline-flex items-center justify-center px-7 py-3 bg-white text-[#2D2B7F] rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Book a Free Discovery Call
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/20 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
