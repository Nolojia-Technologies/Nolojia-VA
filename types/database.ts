export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type AdminRole = 'super_admin' | 'hr_manager' | 'operations_manager' | 'finance_manager' | 'marketing_manager'
export type ApplicationStatus = 'new' | 'reviewed' | 'shortlisted' | 'hired' | 'rejected'
export type JobStatus = 'open' | 'closed' | 'draft'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'client' | 'assistant' | 'admin'
          admin_role: AdminRole | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'client' | 'assistant' | 'admin'
          admin_role?: AdminRole | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'client' | 'assistant' | 'admin'
          admin_role?: AdminRole | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          id: string
          user_id: string
          company_name: string | null
          industry: string | null
          phone: string | null
          timezone: string | null
          plan_tier: 'starter' | 'growth' | 'dedicated'
          status: 'active' | 'inactive' | 'pending'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name?: string | null
          industry?: string | null
          phone?: string | null
          timezone?: string | null
          plan_tier?: 'starter' | 'growth' | 'dedicated'
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string | null
          industry?: string | null
          phone?: string | null
          timezone?: string | null
          plan_tier?: 'starter' | 'growth' | 'dedicated'
          status?: 'active' | 'inactive' | 'pending'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      assistants: {
        Row: {
          id: string
          user_id: string
          specialization: string | null
          bio: string | null
          skills: string[] | null
          availability: string | null
          status: 'available' | 'busy' | 'offline'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          specialization?: string | null
          bio?: string | null
          skills?: string[] | null
          availability?: string | null
          status?: 'available' | 'busy' | 'offline'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          specialization?: string | null
          bio?: string | null
          skills?: string[] | null
          availability?: string | null
          status?: 'available' | 'busy' | 'offline'
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          id: string
          client_id: string
          assistant_id: string | null
          title: string
          description: string | null
          status: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          assistant_id?: string | null
          title: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          assistant_id?: string | null
          title?: string
          description?: string | null
          status?: 'pending' | 'in_progress' | 'review' | 'completed' | 'cancelled'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      task_activities: {
        Row: {
          id: string
          task_id: string
          user_id: string
          action: string
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          action: string
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          user_id?: string
          action?: string
          details?: Json | null
          created_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          id: string
          title: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversation_participants: {
        Row: {
          id: string
          conversation_id: string
          user_id: string
          joined_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          user_id: string
          joined_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          user_id?: string
          joined_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          content: string
          attachments: Json | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          content: string
          attachments?: Json | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          content?: string
          attachments?: Json | null
          read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      files: {
        Row: {
          id: string
          user_id: string
          client_id: string | null
          name: string
          size: number
          type: string
          url: string
          folder: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          client_id?: string | null
          name: string
          size: number
          type: string
          url: string
          folder?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          client_id?: string | null
          name?: string
          size?: number
          type?: string
          url?: string
          folder?: string | null
          created_at?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          id: string
          client_id: string
          invoice_number: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          invoice_number: string
          amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          invoice_number?: string
          amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          paid_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          id: string
          invoice_id: string
          amount: number
          payment_method: string
          transaction_id: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id: string
          amount: number
          payment_method: string
          transaction_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string
          amount?: number
          payment_method?: string
          transaction_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          created_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          date: string
          time: string
          message: string | null
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          date: string
          time: string
          message?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          date?: string
          time?: string
          message?: string | null
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          created_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          content: string
          cover_image: string | null
          category: string
          tags: string[]
          author_name: string
          author_avatar: string | null
          published: boolean
          featured: boolean
          read_time_minutes: number
          meta_title: string | null
          meta_description: string | null
          published_at: string
          updated_at: string
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt: string
          content: string
          cover_image?: string | null
          category: string
          tags?: string[]
          author_name?: string
          author_avatar?: string | null
          published?: boolean
          featured?: boolean
          read_time_minutes?: number
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string
          updated_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string
          content?: string
          cover_image?: string | null
          category?: string
          tags?: string[]
          author_name?: string
          author_avatar?: string | null
          published?: boolean
          featured?: boolean
          read_time_minutes?: number
          meta_title?: string | null
          meta_description?: string | null
          published_at?: string
          updated_at?: string
          created_at?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      blog_post_categories: {
        Row: {
          post_id: string
          category_id: string
        }
        Insert: {
          post_id: string
          category_id: string
        }
        Update: {
          post_id?: string
          category_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read?: boolean
          created_at?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          id: string
          slug: string
          title: string
          department: string
          type: string
          location: string
          description: string | null
          requirements: Json
          benefits: Json
          status: JobStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          department: string
          type?: string
          location?: string
          description?: string | null
          requirements?: Json
          benefits?: Json
          status?: JobStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          department?: string
          type?: string
          location?: string
          description?: string | null
          requirements?: Json
          benefits?: Json
          status?: JobStatus
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      applications: {
        Row: {
          id: string
          job_slug: string
          job_title: string
          full_name: string
          email: string
          phone: string | null
          location: string | null
          linkedin: string | null
          portfolio: string | null
          resume_url: string | null
          cover_letter: string | null
          years_experience: string | null
          expected_salary: string | null
          status: ApplicationStatus
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          job_slug: string
          job_title: string
          full_name: string
          email: string
          phone?: string | null
          location?: string | null
          linkedin?: string | null
          portfolio?: string | null
          resume_url?: string | null
          cover_letter?: string | null
          years_experience?: string | null
          expected_salary?: string | null
          status?: ApplicationStatus
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          job_slug?: string
          job_title?: string
          full_name?: string
          email?: string
          phone?: string | null
          location?: string | null
          linkedin?: string | null
          portfolio?: string | null
          resume_url?: string | null
          cover_letter?: string | null
          years_experience?: string | null
          expected_salary?: string | null
          status?: ApplicationStatus
          notes?: string | null
          created_at?: string
        }
        Relationships: []
      }
      application_notes: {
        Row: {
          id: string
          application_id: string
          author_id: string
          author_name: string | null
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          application_id: string
          author_id: string
          author_name?: string | null
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          author_id?: string
          author_name?: string | null
          content?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

/**
 * Row helpers. Prefer these over hand-written shapes or `any` — they track the
 * schema, so a migration that changes a column becomes a type error rather than
 * a runtime surprise.
 */
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type ProfileRow = Tables<'profiles'>
export type JobRow = Tables<'jobs'>
export type ApplicationRow = Tables<'applications'>
export type ApplicationNoteRow = Tables<'application_notes'>
export type NotificationRow = Tables<'notifications'>
