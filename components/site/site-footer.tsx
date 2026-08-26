import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, Phone } from "lucide-react"
import { FOOTER_NAV } from "@/lib/content/navigation"
import { COMPANY, SOCIAL_LINKS } from "@/lib/content/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_3fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Image
              src="/images/nolojia-logo.png"
              alt="Nolojia"
              width={120}
              height={36}
              className="h-7 w-auto brightness-0 invert"
            />
            <p className="mt-5 text-sm leading-relaxed text-white/55">
              {COMPANY.positioning}
            </p>

            <div className="mt-6 space-y-2.5 text-sm">
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 text-white/65 transition-colors hover:text-white"
              >
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-white/40" />
                {COMPANY.email}
              </a>
              <a
                href={COMPANY.phoneHref}
                className="flex items-center gap-2.5 text-white/65 transition-colors hover:text-white"
              >
                <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-white/40" />
                {COMPANY.phone}
              </a>
            </div>

            {SOCIAL_LINKS.length > 0 ? (
              <div className="mt-6 flex gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Nolojia on ${social.name}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/12 bg-white/5 text-white/60 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    <Linkedin aria-hidden="true" className="h-4 w-4" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Link columns */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_NAV.map((column) => (
              <div key={column.heading}>
                <h2 className="text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white/45">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/45">
            &copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/35">
            AI Employees &middot; AI Automation &middot; Business Systems &middot; Human Support
          </p>
        </div>
      </div>
    </footer>
  )
}
