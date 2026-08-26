/**
 * Application constants
 */

export const APP_NAME = 'Nolojia'
export const APP_DESCRIPTION = 'AI-Powered Virtual Assistant Services'

// Task statuses
export const TASK_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  REVIEW: 'review',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

export const TASK_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  review: 'In Review',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

export const TASK_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  in_progress: 'bg-blue-100 text-blue-800',
  review: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

// Task priorities
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

export const TASK_PRIORITY_LABELS: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
}

export const TASK_PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
}

// User roles
export const USER_ROLES = {
  CLIENT: 'client',
  ASSISTANT: 'assistant',
  ADMIN: 'admin',
} as const

export const USER_ROLE_LABELS: Record<string, string> = {
  client: 'Client',
  assistant: 'Assistant',
  admin: 'Admin',
}

// Plan tiers
export const PLAN_TIERS = {
  STARTER: 'starter',
  GROWTH: 'growth',
  DEDICATED: 'dedicated',
} as const

export const PLAN_TIER_LABELS: Record<string, string> = {
  starter: 'Starter',
  growth: 'Growth',
  dedicated: 'Dedicated Team',
}

// Invoice statuses
export const INVOICE_STATUSES = {
  DRAFT: 'draft',
  SENT: 'sent',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
} as const

export const INVOICE_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  sent: 'Sent',
  paid: 'Paid',
  overdue: 'Overdue',
  cancelled: 'Cancelled',
}

export const INVOICE_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  sent: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
}

// Client statuses
export const CLIENT_STATUSES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
} as const

export const CLIENT_STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
}

// Booking statuses
export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
}

// Assistant statuses
export const ASSISTANT_STATUSES = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  OFFLINE: 'offline',
} as const

export const ASSISTANT_STATUS_LABELS: Record<string, string> = {
  available: 'Available',
  busy: 'Busy',
  offline: 'Offline',
}

export const ASSISTANT_STATUS_COLORS: Record<string, string> = {
  available: 'bg-green-100 text-green-800',
  busy: 'bg-yellow-100 text-yellow-800',
  offline: 'bg-gray-100 text-gray-800',
}

// File upload limits
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
]

// Pagination
export const DEFAULT_PAGE_SIZE = 20
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

// Routes
export const PUBLIC_ROUTES = ['/', '/services', '/pricing', '/blog', '/book', '/about', '/contact']
export const AUTH_ROUTES = ['/login', '/signup', '/reset-password']
export const PROTECTED_ROUTES = ['/dashboard', '/admin']

// API endpoints
export const API_ROUTES = {
  AUTH: '/api/auth',
  TASKS: '/api/tasks',
  FILES: '/api/files',
  MESSAGES: '/api/messages',
  INVOICES: '/api/invoices',
  BOOKINGS: '/api/bookings',
  BLOG: '/api/blog',
} as const

// Contact info. Social links live in lib/content/site.ts, which lists only
// accounts verified to exist.
export const CONTACT_EMAIL = 'info@nolojia.com'
export const SUPPORT_EMAIL = 'support@nolojia.com'
