import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { pageMetadata } from "@/lib/seo/metadata"
import { COMPANY } from "@/lib/content/site"

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms governing use of the Nolojia website and services: what we provide, how billing works, your responsibilities and the limits of our liability.",
  path: "/terms",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Terms", href: "/terms" },
]

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    icon: "ClipboardList",
    title: "Acceptance of terms",
    content: [
      {
        subtitle: "Agreement to these terms",
        text: "By accessing the Nolojia website, requesting a call or engaging any Nolojia service, you agree to these Terms of Service and our Privacy Policy. If you do not agree with any part of them, please do not use the website or our services.",
      },
      {
        subtitle: "Who these terms apply to",
        text: 'These terms apply to visitors to our website and to clients who engage Nolojia for AI, automation, systems or operational support work. References to "you" or "client" include both.',
      },
      {
        subtitle: "Changes to these terms",
        text: "We may update these terms. When we do, we revise the effective date on this page. Continued use of our services after changes are posted constitutes acceptance, and we notify active clients of material changes by email.",
      },
    ],
  },
  {
    id: "our-services",
    icon: "Boxes",
    title: "Our services",
    content: [
      {
        subtitle: "What Nolojia provides",
        text: "Nolojia provides AI assistant deployment, workflow automation, custom business systems and human operational support. The specific scope of any engagement is agreed during discovery and documented in your service agreement — that agreement, not this page, defines what we owe you.",
      },
      {
        subtitle: "Service availability",
        text: "We work to provide consistent service during agreed hours. We cannot guarantee uninterrupted service where the cause is outside our control, including third-party platform outages or changes to a provider's API.",
      },
      {
        subtitle: "AI-assisted work",
        text: "Some work is performed by AI systems we configure. Those systems can make mistakes. We design approval steps and escalation paths for that reason, and we tell you which parts of a workflow are automated and which are reviewed by a person before anything goes live.",
      },
      {
        subtitle: "Informational website",
        text: "This website is informational. No account creation or sign-in is offered here. To engage our services, contact us or book a call.",
      },
    ],
  },
  {
    id: "billing",
    icon: "Receipt",
    title: "Billing and payments",
    content: [
      {
        subtitle: "Pricing",
        text: "Pricing is quoted per engagement after we understand the scope. All prices are quoted in USD unless otherwise stated. Existing clients receive at least 30 days' notice of any price change affecting their agreement.",
      },
      {
        subtitle: "Payment terms",
        text: "Payment terms, billing cycles and accepted methods are specified in your service agreement. Invoices are typically issued monthly in advance. Late payment may result in a pause of services until the balance is settled.",
      },
      {
        subtitle: "Cancellation",
        text: "You may cancel by giving written notice to your account contact. Notice periods and any applicable terms are set out in your service agreement. Prepaid periods are generally non-refundable unless cancellation follows a breach by Nolojia.",
      },
      {
        subtitle: "Refunds",
        text: "Refund requests are handled case by case. If you believe work was not delivered as agreed, contact us promptly and we will resolve it fairly.",
      },
    ],
  },
  {
    id: "your-responsibilities",
    icon: "ShieldAlert",
    title: "Your responsibilities",
    content: [
      {
        subtitle: "Accurate information",
        text: "You agree to provide accurate and complete information when engaging our services. False or misleading information may result in termination of the agreement.",
      },
      {
        subtitle: "Appropriate use",
        text: "You agree not to direct Nolojia staff or systems to do anything illegal, harmful to third parties, or in breach of another platform's terms. Such instructions will be refused and may end the agreement immediately.",
      },
      {
        subtitle: "System access",
        text: "Where you grant access to your systems, you remain responsible for what that access permits. We ask for the narrowest scope a workflow needs and recommend you grant no more than that.",
      },
      {
        subtitle: "Timely communication",
        text: "Automation and delegation both depend on clear input. You agree to respond to questions and approval requests in reasonable time so work is not blocked.",
      },
    ],
  },
  {
    id: "liability",
    icon: "Scale",
    title: "Limitation of liability",
    content: [
      {
        subtitle: "No warranties",
        text: 'Nolojia provides its services on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement.',
      },
      {
        subtitle: "Limitation of damages",
        text: "Nolojia is not liable for indirect, incidental, special, consequential or punitive damages arising from use of our services or website, even if advised of the possibility. Our total liability for any claim will not exceed the fees you paid in the three months preceding the claim.",
      },
      {
        subtitle: "Third-party platforms",
        text: "Our work often involves third-party platforms and APIs. We are not responsible for their performance, availability, pricing or terms, or for changes they make to them.",
      },
      {
        subtitle: "Force majeure",
        text: "We are not liable for failure or delay caused by events beyond our reasonable control, including natural disasters, government action or internet outages.",
      },
    ],
  },
  {
    id: "law-and-ip",
    icon: "ScrollText",
    title: "Governing law, IP and disputes",
    content: [
      {
        subtitle: "Governing law",
        text: "These terms are governed by applicable law, with the specific jurisdiction determined by the governing law clause in your service agreement.",
      },
      {
        subtitle: "Dispute resolution",
        text: "We prefer to resolve disputes directly. If you have a concern, contact us first. Where an informal resolution is not reached, disputes are handled in accordance with the process specified in your service agreement.",
      },
      {
        subtitle: "Intellectual property",
        text: "Website content — text, design, logos and imagery — is the property of Nolojia or its licensors. Work product created for you under an engagement becomes your property on full payment for the relevant period, except for Nolojia's own pre-existing tools and libraries, which remain ours and are licensed to you for use in the delivered system.",
      },
      {
        subtitle: "Severability",
        text: "If any provision is found unenforceable, it will be modified to the minimum extent necessary to make it enforceable and the remaining provisions continue in force.",
      },
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The terms that govern use of this website and any engagement with Nolojia. Where a signed service agreement says something different, that agreement takes precedence."
      effective="1 January 2025"
      updated="1 March 2025"
      sections={SECTIONS}
      crumbs={CRUMBS}
      contactEmail={COMPANY.email}
    />
  )
}
