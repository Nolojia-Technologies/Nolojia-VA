"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { PRIMARY_NAV } from "@/lib/content/navigation"
import { CTA } from "@/lib/content/site"
import { CtaLink } from "@/components/site/cta"
import { Pill } from "@/components/site/primitives"
import { track } from "@/lib/analytics"
import { cn } from "@/lib/utils/cn"

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileSection, setMobileSection] = React.useState<string | null>(null)
  const navRef = React.useRef<HTMLDivElement>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const mobileToggleRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close everything on navigation.
  React.useEffect(() => {
    setOpenMenu(null)
    setMobileOpen(false)
    setMobileSection(null)
  }, [pathname])

  // Escape closes the open dropdown or drawer, and hands focus back to the
  // control that opened it so keyboard users are not dropped on <body>.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      if (openMenu) {
        setOpenMenu(null)
        navRef.current?.querySelector<HTMLButtonElement>(`[aria-expanded="true"]`)?.focus()
      }
      if (mobileOpen) {
        setMobileOpen(false)
        mobileToggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [openMenu, mobileOpen])

  // Click outside closes the dropdown.
  React.useEffect(() => {
    if (!openMenu) return
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [openMenu])

  // While the full-screen drawer is open, lock body scroll and take the page
  // behind it out of the tab order — otherwise Tab walks off the last drawer
  // link into content nobody can see.
  React.useEffect(() => {
    const behind = [document.getElementById("main"), document.querySelector("footer")]
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    for (const el of behind) {
      if (!el) continue
      if (mobileOpen) el.setAttribute("inert", "")
      else el.removeAttribute("inert")
    }
    return () => {
      document.body.style.overflow = ""
      for (const el of behind) el?.removeAttribute("inert")
    }
  }, [mobileOpen])

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120)
  }
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled || openMenu || mobileOpen
          ? "border-border bg-background/85 backdrop-blur-xl supports-[backdrop-filter]:bg-background/75"
          : "border-transparent bg-background"
      )}
    >
      <div ref={navRef} className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center rounded-md" aria-label="Nolojia — home">
          <Image
            src="/images/nolojia-logo.png"
            alt="Nolojia"
            width={130}
            height={40}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="ml-4 hidden lg:block">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((group) => {
              const open = openMenu === group.label
              const panelId = `nav-panel-${group.label.toLowerCase()}`
              return (
                <li
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMenu(group.label)
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(open ? null : group.label)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive(group.href) || open
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {group.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
                    />
                  </button>

                  {open && group.links ? (
                    <div
                      id={panelId}
                      className={cn("absolute left-0 top-full pt-2", group.feature ? "w-[42rem]" : "w-[24rem]")}
                      onMouseEnter={cancelClose}
                    >
                      <div
                        className={cn(
                          "grid gap-1 rounded-2xl border border-border bg-popover p-2 shadow-lg",
                          group.feature ? "grid-cols-[1.15fr_1fr]" : "grid-cols-1"
                        )}
                      >
                        <ul className="grid gap-0.5">
                          {group.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                onClick={() => track("nav_click", { label: link.label, href: link.href })}
                                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2"
                              >
                                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                                  {link.label}
                                  {link.badge ? (
                                    <Pill tone="warning" className="px-1.5 py-0 text-[0.6875rem]">
                                      {link.badge}
                                    </Pill>
                                  ) : null}
                                </span>
                                {link.description ? (
                                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-muted-foreground">
                                    {link.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {group.feature ? (
                          <Link
                            href={group.feature.href}
                            className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-brand/25"
                          >
                            <div>
                              <p className="text-sm font-semibold text-foreground">{group.feature.title}</p>
                              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted-foreground">
                                {group.feature.description}
                              </p>
                            </div>
                            <span className="mt-5 text-[0.8125rem] font-semibold text-brand">
                              {group.feature.cta} &rarr;
                            </span>
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={CTA.secondary.href}
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            {CTA.secondary.label}
          </Link>
          <CtaLink
            href={CTA.primary.href}
            withArrow={false}
            className="hidden sm:inline-flex"
            onClick={() => track("cta_click", { label: CTA.primary.label, location: "header" })}
          >
            {CTA.primary.label}
          </CtaLink>

          <button
            ref={mobileToggleRef}
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-surface-2 lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden"
        >
          <nav aria-label="Mobile" className="px-5 pb-10 pt-4 sm:px-6">
            <ul className="divide-y divide-border">
              {PRIMARY_NAV.map((group) => {
                const expanded = mobileSection === group.label
                return (
                  <li key={group.label} className="py-1">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => setMobileSection(expanded ? null : group.label)}
                      className="flex w-full items-center justify-between rounded-lg px-1 py-3.5 text-left text-base font-semibold text-foreground"
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform duration-200",
                          expanded && "rotate-180"
                        )}
                      />
                    </button>
                    {expanded && group.links ? (
                      <ul className="pb-3">
                        {group.links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => track("nav_click", { label: link.label, href: link.href })}
                              className="flex items-center gap-2 rounded-lg px-1 py-2.5 text-[0.9375rem] text-muted-foreground transition-colors hover:text-foreground"
                            >
                              {link.label}
                              {link.badge ? (
                                <Pill tone="warning" className="px-1.5 py-0 text-[0.6875rem]">
                                  {link.badge}
                                </Pill>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>

            <div className="mt-8 grid gap-3">
              <CtaLink
                href={CTA.primary.href}
                size="lg"
                withArrow={false}
                onClick={() => track("cta_click", { label: CTA.primary.label, location: "mobile-nav" })}
              >
                {CTA.primary.label}
              </CtaLink>
              <CtaLink href={CTA.secondary.href} variant="secondary" size="lg">
                {CTA.secondary.label}
              </CtaLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
