import {
  BarChart3,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Cog,
  Database,
  FileSpreadsheet,
  Handshake,
  Headset,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MailCheck,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  Plug,
  Receipt,
  Rocket,
  Scale,
  ScanSearch,
  ScrollText,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Ticket,
  UserPlus,
  UserRoundCheck,
  Workflow,
  Wrench,
  Zap,
  type LucideProps,
} from "lucide-react"

/**
 * Icons are referenced by name, never by component reference.
 *
 * Lucide icons are forwardRef objects, and React Server Components cannot
 * serialise those across the server/client boundary — passing one as a prop
 * throws "Functions cannot be passed directly to Client Components". Content
 * files therefore store an `IconName` string and this registry resolves it on
 * whichever side of the boundary is doing the rendering.
 */
export const ICONS = {
  BarChart3,
  Bell,
  Bot,
  Boxes,
  BrainCircuit,
  Briefcase,
  CalendarCheck,
  CheckCircle2,
  ClipboardList,
  Cog,
  Database,
  FileSpreadsheet,
  Handshake,
  Headset,
  Inbox,
  LayoutDashboard,
  LifeBuoy,
  Mail,
  MailCheck,
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  PenLine,
  Plug,
  Receipt,
  Rocket,
  Scale,
  ScanSearch,
  ScrollText,
  Send,
  Settings2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  Ticket,
  UserPlus,
  UserRoundCheck,
  Workflow,
  Wrench,
  Zap,
} as const

export type IconName = keyof typeof ICONS

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = ICONS[name]
  return <Component aria-hidden="true" {...props} />
}
