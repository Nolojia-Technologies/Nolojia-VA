# Running Database Migrations

Your Supabase project is ready! Follow these steps to set up the database.

## Step 1: Access Supabase SQL Editor

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on your project: **fjlwduqbdtpbfxcqayav**
3. In the left sidebar, click **SQL Editor**
4. Click **New Query**

## Step 2: Run Migrations in Order

### Migration 1: Initial Schema (Tables & Indexes)

1. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
2. Paste into the SQL Editor
3. Click **Run** (or press Ctrl+Enter)
4. Wait for "Success" message
5. You should see: "14 tables created successfully"

**What this does:**
- Creates 14 tables (profiles, clients, assistants, tasks, etc.)
- Adds indexes for performance
- Sets up timestamps and triggers

### Migration 2: Row Level Security (RLS) Policies

1. Click **New Query** to start a fresh query
2. Copy the entire contents of `supabase/migrations/002_rls_policies.sql`
3. Paste into the SQL Editor
4. Click **Run**
5. Wait for "Success" message

**What this does:**
- Enables RLS on all tables
- Creates security policies for clients, assistants, admins
- Ensures users can only access their own data

### Migration 3: Storage Buckets

1. Click **New Query**
2. Copy the entire contents of `supabase/migrations/003_storage_buckets.sql`
3. Paste into the SQL Editor
4. Click **Run**
5. Wait for "Success" message

**What this does:**
- Creates 3 storage buckets (avatars, files, blog-images)
- Sets up storage policies for uploads

### Migration 4: Database Functions

1. Click **New Query**
2. Copy the entire contents of `supabase/migrations/004_functions.sql`
3. Paste into the SQL Editor
4. Click **Run**
5. Wait for "Success" message

**What this does:**
- Creates helper functions for user management
- Adds dashboard stats functions
- Sets up automatic profile creation on signup

## Step 3: Verify Setup

### Check Tables
1. In Supabase dashboard, go to **Table Editor**
2. You should see 14 tables listed:
   - profiles
   - clients
   - assistants
   - tasks
   - task_activities
   - conversations
   - conversation_participants
   - messages
   - files
   - invoices
   - payments
   - bookings
   - blog_posts
   - blog_categories
   - blog_post_categories
   - notifications

### Check Storage Buckets
1. Go to **Storage** in the left sidebar
2. You should see 3 buckets:
   - avatars (public)
   - files (private)
   - blog-images (public)

## Step 4: Create Your First Admin User

### Option A: Via Supabase Dashboard (Easiest)

1. Go to **Authentication** > **Users**
2. Click **Add User** > **Create new user**
3. Fill in:
   - **Email:** your-email@example.com
   - **Password:** (choose a secure password)
   - **Auto Confirm User:** ✅ Yes
4. Click **Create user**
5. Copy the User ID (UUID)
6. Go to **SQL Editor** and run:

```sql
-- Update the user's role to admin
UPDATE profiles
SET role = 'admin'
WHERE id = 'paste-user-id-here';
```

### Option B: Via Signup Page (After app is running)

1. Start your dev server: `npm run dev`
2. Go to http://localhost:3000/signup (after you build the signup page in Phase 2)
3. Sign up with your email
4. Go back to Supabase SQL Editor and run:

```sql
-- Update your user to admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

## Troubleshooting

### "Relation already exists" errors
This means some tables were already created. You can either:
- Skip that migration
- Or drop the tables first (⚠️ This deletes all data):
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  GRANT ALL ON SCHEMA public TO postgres;
  GRANT ALL ON SCHEMA public TO public;
  ```
  Then run all migrations again from the start.

### "Permission denied" errors
- Make sure you're running the SQL as the postgres user
- Check that RLS is not blocking the operation

### Storage buckets not created
If migration 3 fails:
1. Go to **Storage** in dashboard
2. Manually create the 3 buckets:
   - avatars (make it public)
   - files (keep it private)
   - blog-images (make it public)

### Functions not working
- Make sure all previous migrations completed successfully
- Check that the `auth.users` table exists

## Next Steps

Once migrations are complete:

1. ✅ Verify tables exist
2. ✅ Verify storage buckets exist
3. ✅ Create admin user
4. ✅ Test login (after building auth pages)
5. 🚀 Start building Phase 2: Authentication

---

**Need help?** Check the error messages in the SQL Editor for specific issues.
