export interface NavLink {
  label: string
  href: string
  description?: string
  badge?: string
}

export interface NavGroup {
  label: string
  href: string
  /** When present the item renders as a dropdown / accordion section. */
  links?: NavLink[]
  /** Optional promoted card shown alongside the links on desktop. */
  feature?: { title: string; description: string; href: string; cta: string }
}

export const PRIMARY_NAV: NavGroup[] = [
  {
    label: "Solutions",
    href: "/solutions",
    links: [
      {
        label: "AI Employees",
        href: "/solutions/ai-employees",
        description: "Assistants that handle email, sales, support and operations work.",
      },
      {
        label: "AI Automation",
        href: "/solutions/automation",
        description: "Turn repetitive processes into reliable automated workflows.",
      },
      {
        label: "Business Systems",
        href: "/solutions/business-systems",
        description: "Connected dashboards, portals and internal tools built around you.",
      },
      {
        label: "Human + AI Support",
        href: "/solutions/human-ai",
        description: "Trained operators handling judgement, exceptions and relationships.",
      },
    ],
    feature: {
      title: "From manual work to intelligent systems",
      description: "See how a discovery call turns into a deployed AI workflow in four steps.",
      href: "/solutions#how-it-works",
      cta: "See the process",
    },
  },
  {
    label: "Products",
    href: "/products",
    links: [
      {
        label: "PageMarks",
        href: "/products/pagemarks",
        description: "Notes and highlights that stay on the page, and the reason you saved it.",
        badge: "Live",
      },
      {
        label: "AI Architecture",
        href: "/products/ai-architecture",
        description: "AI-assisted architectural design with editable 2D plans and 3D models.",
        badge: "In development",
      },
      {
        label: "All products",
        href: "/products",
        description: "Technology Nolojia builds, not just technology we implement.",
      },
    ],
  },
  {
    label: "Resources",
    href: "/case-studies",
    links: [
      {
        label: "Case Studies",
        href: "/case-studies",
        description: "How real businesses replaced manual work with systems.",
      },
      { label: "Insights", href: "/blog", description: "Writing on AI, automation and operations." },
      { label: "FAQ", href: "/faq", description: "Straight answers about scope, security and delivery." },
    ],
  },
  {
    label: "Company",
    href: "/about",
    links: [
      { label: "About", href: "/about", description: "Why Nolojia exists and who builds it." },
      { label: "Security", href: "/security", description: "How we handle access, data and oversight." },
      { label: "Careers", href: "/careers", description: "Open roles across engineering and operations." },
      { label: "Contact", href: "/contact", description: "Tell us what you want to automate." },
    ],
  },
]

export const FOOTER_NAV: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Solutions",
    links: [
      { label: "AI Employees", href: "/solutions/ai-employees" },
      { label: "AI Automation", href: "/solutions/automation" },
      { label: "Business Systems", href: "/solutions/business-systems" },
      { label: "Human + AI Support", href: "/solutions/human-ai" },
      { label: "All solutions", href: "/solutions" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "PageMarks", href: "/products/pagemarks" },
      { label: "AI Architecture", href: "/products/ai-architecture" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Book a call", href: "/book" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Services A–Z", href: "/services" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookies", href: "/privacy#cookies" },
    ],
  },
]
