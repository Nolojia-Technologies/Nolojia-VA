"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingPopup, BookingNudge, BookingTrigger, useBookingNudge } from "@/components/ui/booking-popup"

const socialLinks = [
  {
    name: "X",
    href: "https://x.com/nolojia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/93209134/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/nolojia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@nolojia",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.77a4.85 4.85 0 01-1.02-.08z" />
      </svg>
    ),
  },
]

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { nudgeVisible, fullPopupOpen, dismissNudge, openFullPopup, closeFullPopup } = useBookingNudge()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-white shadow-md border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        {/* Gradient scrim — ensures nav is always readable over hero images */}
        {!scrolled && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-transparent pointer-events-none" />
        )}

        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/nolojia-logo.png"
              alt="Nolojia"
              width={130}
              height={40}
              className={`h-8 md:h-9 w-auto transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/success-stories", label: "Success Stories" },
              { href: "/faq", label: "FAQ" },
            ].map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-sm font-semibold transition-colors duration-300 group ${
                    isActive
                      ? scrolled ? "text-[#2D2B7F]" : "text-white"
                      : scrolled
                        ? "text-gray-800 hover:text-[#2D2B7F]"
                        : "text-white/70 hover:text-white drop-shadow-sm"
                  }`}
                >
                  {label}
                  {/* Active underline indicator */}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-full bg-[#4A47C4]"
                        : "w-0 group-hover:w-full bg-[#4A47C4]/50"
                    } ${!scrolled && isActive ? "bg-white" : ""}`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button
              onClick={openFullPopup}
              className={`hidden md:flex rounded-xl font-bold px-5 py-2 transition-all duration-300 shadow-lg ${
                scrolled
                  ? "bg-[#2D2B7F] text-white hover:bg-[#232161] shadow-[#2D2B7F]/20"
                  : "bg-white text-[#2D2B7F] hover:bg-white/95 shadow-black/20"
              }`}
            >
              Book a Call
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                scrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-xl">
            <div className="container mx-auto px-4 py-5 space-y-1">
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/success-stories", label: "Success Stories" },
                { href: "/faq", label: "FAQ" },
              ].map(({ href, label }) => {
                const isActive = pathname === href
                return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between text-sm font-semibold rounded-lg px-3 py-2.5 transition-all ${
                    isActive
                      ? "text-[#2D2B7F] bg-[#2D2B7F]/8"
                      : "text-gray-800 hover:text-[#2D2B7F] hover:bg-[#2D2B7F]/5"
                  }`}
                >
                  {label}
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#2D2B7F]" />}
                </Link>
              )})}
              <div className="pt-2">
                <Button
                  onClick={() => { openFullPopup(); setMobileMenuOpen(false) }}
                  className="w-full bg-[#2D2B7F] text-white hover:bg-[#232161] rounded-xl font-bold py-3"
                >
                  Book a Free Call
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0A0920] text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          {/* Gradient accent line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#4A47C4] to-transparent mb-14" />

          <div className="grid md:grid-cols-4 gap-10">
            {/* Brand column */}
            <div className="md:col-span-1">
              <Image
                src="/images/nolojia-logo.png"
                alt="Nolojia"
                width={120}
                height={36}
                className="h-8 w-auto brightness-0 invert mb-5"
              />
              <p className="text-sm text-white/65 leading-relaxed mb-6">
                Admin, creative, and growth support for modern businesses.
                Do more by doing less.
              </p>

              {/* Social Icons */}
              <div className="flex gap-2.5">
                {socialLinks.map(({ name, href, icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/75 hover:bg-[#4A47C4] hover:border-[#4A47C4] hover:text-white transition-all duration-200"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Services</h4>
              <ul className="space-y-3">
                {[
                  { href: "/services", label: "All Services" },
                  { href: "/services#admin", label: "Admin Support" },
                  { href: "/services#creative", label: "Creative Support" },
                  { href: "/services#growth", label: "Growth Support" },
                  { href: "/book", label: "Book a Call" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Company</h4>
              <ul className="space-y-3">
                {[
                  { href: "/about", label: "About Us" },
                  { href: "/success-stories", label: "Success Stories" },
                  { href: "/faq", label: "FAQ" },
                  { href: "/careers", label: "Careers" },
                  { href: "/blog", label: "Blog" },
                  { href: "/contact", label: "Contact" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal + CTA column */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5 text-white">Legal</h4>
              <ul className="space-y-3 mb-8">
                {[
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/terms", label: "Terms of Service" },
                ].map(({ href, label }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mini CTA */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-xs text-white/60 mb-3 leading-relaxed">
                  Ready to reclaim your time?
                </p>
                <Button
                  onClick={openFullPopup}
                  className="w-full bg-[#2D2B7F] hover:bg-[#4A47C4] text-white rounded-lg font-semibold text-xs py-2 transition-all"
                >
                  Book a Free Call
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-white/50">
              &copy; {new Date().getFullYear()} Nolojia Limited. All rights reserved.
            </p>
            <p className="text-xs text-white/35">
              Admin &middot; Creative &middot; Growth
            </p>
          </div>
        </div>
      </footer>

      {/* Floating trigger button */}
      <BookingTrigger onClick={openFullPopup} />

      {/* Auto-appearing nudge */}
      <BookingNudge isVisible={nudgeVisible} onClose={dismissNudge} onBook={openFullPopup} />

      {/* Full booking popup */}
      <BookingPopup isOpen={fullPopupOpen} onClose={closeFullPopup} />
    </div>
  )
}
