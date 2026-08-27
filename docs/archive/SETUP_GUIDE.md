# Nolojia Platform - Quick Setup Guide

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- Supabase account (free tier works)

## Step 1: Clone and Install

```bash
cd nolojia-platform
npm install
```

## Step 2: Set Up Supabase

### Option A: Supabase Cloud (Recommended)

1. Go to [https://supabase.com](https://supabase.com)
2. Create a free account
3. Click "New Project"
4. Fill in project details:
   - **Name:** Nolojia Platform
   - **Database Password:** (Choose a strong password)
   - **Region:** Choose closest to your users
5. Wait for project to be created (~2 minutes)

### Option B: Local Supabase (For Development)

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase locally
supabase init

# Start Supabase
supabase start
```

## Step 3: Run Database Migrations

### In Supabase Cloud:

1. Go to your project dashboard
2. Click "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the contents of each migration file **in order**:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_rls_policies.sql`
   - `supabase/migrations/003_storage_buckets.sql`
   - `supabase/migrations/004_functions.sql`
5. Click "Run" after each migration

### In Local Supabase:

```bash
# Migrations are automatically applied from supabase/migrations/
supabase db reset
```

## Step 4: Configure Environment Variables

1. Copy the example environment file:

```bash
cp .env.local.example .env.local
```

2. Get your Supabase credentials:
   - Go to **Project Settings** > **API**
   - Copy the **Project URL**
   - Copy the **anon/public key**

3. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Create Your First Admin User

Since the platform uses Row Level Security, you need to create an admin user:

1. Go to Supabase Dashboard > **Authentication** > **Users**
2. Click "Add User" > "Create new user"
3. Fill in:
   - **Email:** your-email@example.com
   - **Password:** (choose a secure password)
   - **Auto Confirm User:** Yes
4. Click "Create user"
5. Go to **SQL Editor** and run:

```sql
-- Update the user's role to admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

Now you can log in at [http://localhost:3000/login](http://localhost:3000/login)

## Step 7: Set Up Storage Buckets (Optional)

If storage policies didn't create buckets automatically:

1. Go to **Storage** in Supabase dashboard
2. Create three buckets:
   - **avatars** (Public)
   - **files** (Private)
   - **blog-images** (Public)

## Troubleshooting

### "Invalid API credentials"
- Check that your `.env.local` file exists
- Verify the Supabase URL and key are correct
- Restart the dev server after changing environment variables

### "Database connection error"
- Make sure all migrations ran successfully
- Check Supabase dashboard for any errors
- Verify your database is not paused (free tier auto-pauses after inactivity)

### "CORS errors"
- Go to **Project Settings** > **API**
- Under "API Settings" > "CORS", ensure `http://localhost:3000` is allowed

### Migrations fail
- Make sure you run migrations in order (001, 002, 003, 004)
- Check SQL Editor for error messages
- Each migration must complete successfully before running the next

## Next Steps

1. Test the homepage at http://localhost:3000
2. Explore the services page at http://localhost:3000/services
3. Check out pricing at http://localhost:3000/pricing
4. Begin implementing Phase 2 (Authentication pages)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Useful Supabase Commands

```bash
# Start local Supabase
supabase start

# Stop local Supabase
supabase stop

# Reset database (re-run migrations)
supabase db reset

# Generate TypeScript types from database
supabase gen types typescript --local > types/database.ts
```

## Support

For issues or questions:
1. Check the main README.md
2. Review IMPLEMENTATION_STATUS.md for progress
3. Check Supabase documentation: https://supabase.com/docs

---

**You're all set!** 🎉 Start building amazing features.
