# Next Steps Checklist - Phase 2: Authentication & Marketing

## Prerequisites ✅

Before starting Phase 2, ensure Phase 1 is complete:

- [x] Project is set up and running (`npm run dev` works)
- [x] Supabase project is created
- [x] All 4 database migrations are run successfully
- [x] Environment variables are configured in `.env.local`
- [x] Homepage, services, and pricing pages are accessible

---

## Phase 2: Authentication System

### 1. Create Auth Pages Structure

```bash
# Create auth directory structure
mkdir -p app/(auth)/login app/(auth)/signup app/(auth)/reset-password
```

**Files to create:**
- [ ] `app/(auth)/layout.tsx` - Auth pages layout (centered card design)
- [ ] `app/(auth)/login/page.tsx` - Login page
- [ ] `app/(auth)/signup/page.tsx` - Signup page
- [ ] `app/(auth)/reset-password/page.tsx` - Password reset page

### 2. Create Form Components

**Files to create:**
- [ ] `components/forms/login-form.tsx`
  - Email and password fields
  - "Remember me" checkbox
  - "Forgot password?" link
  - Submit button with loading state

- [ ] `components/forms/signup-form.tsx`
  - Full name field
  - Email field
  - Password field (with strength indicator)
  - Confirm password field
  - Terms acceptance checkbox
  - Submit button with loading state

- [ ] `components/forms/reset-password-form.tsx`
  - Email field
  - Submit button
  - Success message display

### 3. Create Validation Schemas

**Files to create:**
- [ ] `lib/validations/auth.ts`
  ```typescript
  // Login schema
  export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  // Signup schema
  export const signupSchema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).regex(/.../, "Password must contain..."),
    confirmPassword: z.string(),
  }).refine(...)

  // Reset password schema
  export const resetPasswordSchema = z.object({
    email: z.string().email(),
  })
  ```

### 4. Create Auth Hooks

**Files to create:**
- [ ] `lib/hooks/use-auth.ts`
  - `useAuth()` - Get current user and auth state
  - `useSignIn()` - Sign in with email/password
  - `useSignUp()` - Sign up new user
  - `useSignOut()` - Sign out user
  - `useResetPassword()` - Request password reset

- [ ] `lib/hooks/use-user.ts`
  - `useUser()` - Get user profile
  - `useUpdateProfile()` - Update user profile

### 5. Create Additional UI Components

**Files to create:**
- [ ] `components/ui/dialog.tsx` - Modal dialogs
- [ ] `components/ui/form.tsx` - Form wrapper with react-hook-form
- [ ] `components/ui/toast.tsx` - Toast notifications
- [ ] `components/ui/spinner.tsx` - Loading spinner

### 6. Update Middleware

**File to update:**
- [ ] `middleware.ts`
  - Test redirect logic for authenticated users
  - Test redirect logic for unauthenticated users accessing protected routes
  - Add role-based checks for admin routes

### 7. Testing Checklist

Test each flow:
- [ ] User can sign up with valid data
- [ ] Email validation works
- [ ] Password validation works (minimum length, complexity)
- [ ] Confirm password validation works
- [ ] User is redirected to dashboard after signup
- [ ] User can log in with correct credentials
- [ ] User sees error message with incorrect credentials
- [ ] User can request password reset
- [ ] User is redirected away from auth pages if already logged in
- [ ] Protected routes redirect to login if not authenticated
- [ ] Admin routes require admin role

---

## Phase 2: Marketing Pages

### 8. Create Blog Pages

**Files to create:**
- [ ] `app/(public)/blog/page.tsx` - Blog listing page
  - Grid of blog post cards
  - Category filter
  - Search functionality
  - Pagination

- [ ] `app/(public)/blog/[slug]/page.tsx` - Individual blog post
  - Dynamic route for post slug
  - Post content rendering
  - Author information
  - Related posts
  - Share buttons

- [ ] `components/features/blog/blog-card.tsx` - Blog post card component
  - Thumbnail image
  - Title and excerpt
  - Author and date
  - Category badge
  - Read more link

### 9. Create Booking Page

**Files to create:**
- [ ] `app/(public)/book/page.tsx` - Booking consultation page
  - Calendar component
  - Time slot picker
  - Booking form
  - Confirmation display

- [ ] `components/features/booking/calendar-view.tsx`
  - Interactive calendar
  - Highlight available dates
  - Date selection

- [ ] `components/features/booking/time-slot-picker.tsx`
  - Show available time slots for selected date
  - Timezone selection
  - Slot selection

- [ ] `components/forms/booking-form.tsx`
  - Name, email, phone fields
  - Company field (optional)
  - Message field
  - Selected date/time display
  - Submit button

- [ ] `components/ui/calendar.tsx` - Calendar UI component
- [ ] `components/ui/popover.tsx` - Popover component for calendar

### 10. Create Additional Pages

**Files to create:**
- [ ] `app/(public)/about/page.tsx` - About page
  - Company story
  - Team members
  - Mission and values

- [ ] `app/(public)/contact/page.tsx` - Contact page
  - Contact form
  - Contact information
  - Map (optional)

### 11. Enhance Header Component

**File to create:**
- [ ] `components/layout/header.tsx` - Enhanced header
  - Mobile menu
  - User dropdown (when logged in)
  - Active link highlighting

### 12. Create Footer Component

**File to create:**
- [ ] `components/layout/footer.tsx` - Reusable footer
  - Newsletter signup form
  - Social links
  - Site map links

### 13. Add SEO Metadata

**Files to update:**
- [ ] Add metadata to all pages
- [ ] Create `app/sitemap.ts` - Sitemap generation
- [ ] Create `app/robots.ts` - Robots.txt
- [ ] Create `public/favicon.ico` - Favicon
- [ ] Create `app/opengraph-image.tsx` - OG image generation

---

## Validation Checklist

Before moving to Phase 3:

### Functionality
- [ ] All authentication flows work correctly
- [ ] Protected routes are properly secured
- [ ] Role-based access control works
- [ ] All marketing pages are accessible
- [ ] Blog listing shows published posts
- [ ] Booking form submits successfully
- [ ] Forms show validation errors correctly
- [ ] Success/error toasts display

### UI/UX
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Loading states are shown during async operations
- [ ] Error states are handled gracefully
- [ ] Empty states have helpful messages
- [ ] Forms have clear labels and placeholders
- [ ] Buttons have hover/active states

### Performance
- [ ] Pages load quickly
- [ ] Images are optimized
- [ ] No console errors
- [ ] No hydration warnings

### SEO
- [ ] All pages have proper metadata
- [ ] Heading hierarchy is correct (h1, h2, h3)
- [ ] Images have alt text
- [ ] Links have descriptive text

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators are visible
- [ ] Form fields have labels
- [ ] Color contrast is sufficient
- [ ] Screen reader friendly

---

## Useful Commands

```bash
# Development
npm run dev

# Build (check for errors)
npm run build

# Lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## Resources

- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth
- **React Hook Form:** https://react-hook-form.com/
- **Zod Validation:** https://zod.dev/
- **Next.js Routing:** https://nextjs.org/docs/app/building-your-application/routing
- **Next.js Metadata:** https://nextjs.org/docs/app/building-your-application/optimizing/metadata

---

## Notes

- Remember to test all auth flows with real Supabase backend
- Keep security in mind - never expose sensitive data
- Follow the existing component patterns (see button.tsx as example)
- Use the `cn()` utility for className merging
- Prefer server components unless client interactivity is needed
- Use proper TypeScript types from `types/database.ts`

---

## After Phase 2 is Complete

Move to `PHASE_3_CHECKLIST.md` for booking system implementation.

Good luck! 🚀
