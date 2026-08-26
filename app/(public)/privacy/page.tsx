import { LegalPage, type LegalSection } from "@/components/site/legal-page"
import { pageMetadata } from "@/lib/seo/metadata"
import { COMPANY } from "@/lib/content/site"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Nolojia collects, uses, shares and protects personal information — and the rights you have over your data.",
  path: "/privacy",
})

const CRUMBS = [
  { name: "Home", href: "/" },
  { name: "Privacy", href: "/privacy" },
]

const SECTIONS: LegalSection[] = [
  {
    id: "information-we-collect",
    icon: "Database",
    title: "Information we collect",
    content: [
      {
        subtitle: "Information you provide directly",
        text: "When you fill out our contact form, book a discovery call or subscribe to our newsletter, we collect your name, email address, company name and any details you choose to share about your business needs.",
      },
      {
        subtitle: "Information collected automatically",
        text: "We collect standard web analytics data including your IP address, browser type, referring pages and pages visited on our site. This is used to improve the website experience and understand how visitors interact with our content.",
      },
      {
        subtitle: "Communication records",
        text: "When you contact us by email or through our forms, we retain those communications so we can answer your request and maintain continuity in our relationship with you.",
      },
      {
        subtitle: "Client systems data",
        text: "During an engagement we may be granted access to systems you own — an inbox, a CRM, a database. We access only what a workflow requires, we do not copy that data anywhere it does not need to go, and access is removed when the engagement ends.",
      },
    ],
  },
  {
    id: "how-we-use-it",
    icon: "ScanSearch",
    title: "How we use your information",
    content: [
      {
        subtitle: "To respond to your enquiries",
        text: "We use your contact information to reply to messages, schedule calls and follow up on service enquiries. We will only contact you in ways you have consented to.",
      },
      {
        subtitle: "To deliver our services",
        text: "If you become a client, we use relevant information to scope the work, configure the systems we build for you and make sure the engagement meets its objectives.",
      },
      {
        subtitle: "To send you updates, with consent",
        text: "If you subscribe to our newsletter, we may send you practical guides and company news. You can unsubscribe at any time using the link in every email.",
      },
      {
        subtitle: "To improve our website",
        text: "Aggregated, anonymised analytics help us understand which parts of the site are useful and where we can improve. No personally identifying information is used for this purpose.",
      },
    ],
  },
  {
    id: "how-we-protect-it",
    icon: "ShieldCheck",
    title: "How we protect your data",
    content: [
      {
        subtitle: "Technical safeguards",
        text: "The website is served over HTTPS. Personal data stored in our systems is protected with encryption in transit and at rest, and we use infrastructure providers who maintain their own security programmes.",
      },
      {
        subtitle: "Access controls",
        text: "Access to personal data within our team is restricted to the people who need it to do their jobs, and everyone is trained on data-handling responsibilities.",
      },
      {
        subtitle: "Retention",
        text: "We retain personal data only as long as it is needed for the purpose it was collected, or as required by law. Contact form submissions are reviewed and cleared on a rolling 12-month basis unless an active client relationship exists.",
      },
    ],
  },
  {
    id: "sharing",
    icon: "Plug",
    title: "Sharing your information",
    content: [
      {
        subtitle: "We do not sell your data",
        text: "Nolojia does not sell, rent or trade your personal information to any third party for marketing purposes.",
      },
      {
        subtitle: "Service providers",
        text: "We share limited data with the tools we use to run our business — our booking platform, email service provider and website analytics. Each is bound by its own privacy commitments and data processing terms.",
      },
      {
        subtitle: "Legal requirements",
        text: "We may disclose information where required by law, court order or a governmental authority, or to protect the rights, property or safety of Nolojia, our clients or others.",
      },
    ],
  },
  {
    id: "cookies",
    icon: "Cog",
    title: "Cookies",
    content: [
      {
        subtitle: "What we use",
        text: "We use only essential cookies, which keep the site working, and analytics cookies, which tell us in aggregate how the site is used. We do not use advertising or cross-site tracking cookies.",
      },
      {
        subtitle: "Your control",
        text: "You can block or delete cookies at any time through your browser settings. Blocking essential cookies may stop parts of the site from working; blocking analytics cookies will not.",
      },
      {
        subtitle: "Third-party cookies",
        text: "Where an embedded third-party service sets its own cookies, that service's own policy applies in addition to this one.",
      },
    ],
  },
  {
    id: "your-rights",
    icon: "UserRoundCheck",
    title: "Your rights",
    content: [
      {
        subtitle: "Access and correction",
        text: "You can request a copy of the personal data we hold about you and ask us to correct anything inaccurate.",
      },
      {
        subtitle: "Deletion",
        text: "You can ask us to delete your personal data. We will action this promptly, subject to any legal obligation to retain certain records.",
      },
      {
        subtitle: "Opt out",
        text: "You can unsubscribe from our newsletter at any time. Unsubscribing from marketing does not affect transactional messages relating to an active service.",
      },
    ],
  },
  {
    id: "contact-and-updates",
    icon: "Mail",
    title: "Contact and updates",
    content: [
      {
        subtitle: "Questions about this policy",
        text: `If you have questions, concerns or requests about this policy or how we handle your data, email us at ${COMPANY.email}. We aim to respond within five business days.`,
      },
      {
        subtitle: "Policy updates",
        text: "We may update this policy to reflect changes in our practices or applicable law. When we do, we will update the effective date above and, where appropriate, notify active clients by email.",
      },
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Privacy is a right, not a checkbox. This page states exactly what we collect, why we collect it, who else sees it and what you can ask us to do about it."
      effective="1 January 2025"
      updated="1 March 2025"
      sections={SECTIONS}
      crumbs={CRUMBS}
      contactEmail={COMPANY.email}
    />
  )
}
