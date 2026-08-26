/**
 * Analytics abstraction.
 *
 * No vendor is wired up. Events are pushed to `window.dataLayer` if a tag
 * manager is present and are otherwise dropped, so a provider can be added
 * later without touching a single component. Nothing personally identifying
 * is collected here — only the name of the interaction and where it happened.
 */

export type AnalyticsEvent =
  | "cta_click"
  | "nav_click"
  | "product_click"
  | "contact_form_submit"
  | "contact_form_error"
  | "consultation_request"
  | "job_application_submit"

type Props = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  if (typeof window === "undefined") return
  try {
    window.dataLayer?.push({ event, ...props })
  } catch {
    // Analytics must never break the page.
  }
}
