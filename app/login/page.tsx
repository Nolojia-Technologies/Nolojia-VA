import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { SITE_URL } from "@/lib/seo/config"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Nolojia admin console.",
  robots: { index: false, follow: false },
  // Self-canonical so this page does not inherit the site root canonical.
  alternates: { canonical: `${SITE_URL}/login` },
}

/**
 * Staff sign-in. The middleware redirects unauthenticated /admin and
 * /dashboard requests here, so this route has to exist for those guards to
 * work at all. It is deliberately unlinked from the public navigation.
 */
export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-5 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mx-auto block w-fit">
          <Image
            src="/images/nolojia-logo.png"
            alt="Nolojia"
            width={130}
            height={40}
            className="h-7 w-auto"
          />
        </Link>

        <div className="mt-8 rounded-2xl border border-border bg-card p-7 shadow-sm">
          <h1 className="text-xl font-semibold text-foreground">Sign in</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Nolojia staff only. Accounts are provisioned internally.
          </p>

          <div className="mt-6">
            <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Looking for the website?{" "}
          <Link href="/" className="font-medium text-brand underline-offset-4 hover:underline">
            Go to nolojia.com
          </Link>
        </p>
      </div>
    </main>
  )
}
