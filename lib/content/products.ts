export type ProductStatus = "available" | "in-development"

export interface Product {
  slug: string
  name: string
  status: ProductStatus
  statusLabel: string
  category: string
  tagline: string
  summary: string
  /** What the product does today. Never a roadmap item stated as a fact. */
  features: { title: string; description: string }[]
  /** Honest description of what is and is not built yet. */
  maturityNote: string
  cta: { label: string; href: string }
  /** The product's own site, when it has one and is publicly reachable. */
  siteUrl?: string
  /** Where a visitor can actually install or start using it today. */
  installUrl?: string
  /** Platforms it genuinely runs on. Used for SoftwareApplication schema. */
  platforms?: string[]
}

export const PRODUCTS: Product[] = [
  {
    slug: "pagemarks",
    name: "PageMarks",
    status: "available",
    statusLabel: "Live",
    category: "Browser extension",
    tagline: "Your browser remembers where you were. PageMarks remembers why.",
    summary:
      "A browser extension that puts sticky notes over any page without blocking it, and hands the page back weeks later exactly as you left it — your highlights, your reading position, and the note explaining why you kept it.",
    features: [
      {
        title: "Notes that click straight through",
        description:
          "Other sticky-note tools drop a box on the page and that box eats your clicks. PageMarks notes stay visible while every click, scroll and keystroke passes through to the page underneath.",
      },
      {
        title: "Pages that remember you back",
        description:
          "A saved page keeps your notes, your highlights and how far you had read, so returning weeks later lands you where you stopped instead of at the top.",
      },
      {
        title: "Workspaces and collections",
        description:
          "Keep work and personal completely apart, and gather pages from across the web around one idea — a project, a renovation, a research rabbit hole.",
      },
      {
        title: "Sessions and timeline",
        description:
          "Capture a whole window of tabs, reading positions and all, and bring the moment back later. Everything you keep is browsable by when you kept it.",
      },
      {
        title: "One fuzzy search across everything",
        description:
          "Search notes, highlights, saved pages and collections together — by a word, a phrase, or the page it lived on. Typos are fine.",
      },
      {
        title: "Local by default",
        description:
          "Notes live in your browser's own storage. Cloud sync is optional and off until you turn it on, and there is no analytics or advertising code in the extension.",
      },
    ],
    maturityNote:
      "PageMarks is live for Chrome, Edge, Brave and Arc, and is currently free while it is being built with its early users. Pricing will return, with notice before it does.",
    cta: { label: "Explore PageMarks", href: "/products/pagemarks" },
    siteUrl: "https://pagemarks.nolojia.site/",
    installUrl:
      "https://chromewebstore.google.com/detail/gbiiidioofdnaahdlphgdmcjhnbgokfi",
    platforms: ["Chrome", "Edge", "Brave", "Arc"],
  },
  {
    slug: "ai-architecture",
    name: "AI Architecture",
    status: "in-development",
    statusLabel: "In development",
    category: "Design technology",
    tagline: "AI-assisted architectural design that produces real geometry.",
    summary:
      "An architectural design platform where AI assists the design process and the output is real, editable architecture — not a picture of a building.",
    features: [
      {
        title: "Real architectural geometry",
        description:
          "The model underneath is proper geometry — walls, levels and spaces — rather than an image generated to look like a building.",
      },
      {
        title: "Editable 2D plans",
        description: "Plans you can change directly, with the model staying consistent as you do.",
      },
      {
        title: "Editable 3D models",
        description: "The same design in three dimensions, editable rather than fixed at export.",
      },
      {
        title: "Photorealistic rendering",
        description: "Take a design to a presentable render without rebuilding it in another tool.",
      },
    ],
    maturityNote:
      "AI Architecture is in active development and is not publicly available yet. We are talking to studios and developers who want early involvement.",
    cta: { label: "Explore AI Architecture", href: "/products/ai-architecture" },
  },
]

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}
