/**
 * Tools Nolojia connects to when we build a system.
 *
 * These are the platforms we work with — not a claim that a pre-built,
 * one-click connector ships with every engagement. Connections are configured
 * per project against each platform's own API or automation layer.
 */
export const INTEGRATION_GROUPS: { heading: string; tools: string[] }[] = [
  {
    heading: "Work & communication",
    tools: ["Google Workspace", "Microsoft 365", "Slack", "WhatsApp", "Notion"],
  },
  {
    heading: "Sales & customers",
    tools: ["HubSpot", "Salesforce", "Calendly", "Shopify"],
  },
  {
    heading: "Automation & finance",
    tools: ["Zapier", "Make", "QuickBooks"],
  },
]

export const INTEGRATIONS = INTEGRATION_GROUPS.flatMap((g) => g.tools)
