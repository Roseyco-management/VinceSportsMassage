export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string | null
          content: string
          featured_image: string | null
          meta_description: string | null
          meta_keywords: string[] | null
          author: string
          status: "draft" | "published" | "scheduled"
          published_at: string | null
          created_at: string
          updated_at: string
          canonical_url: string | null
          og_image: string | null
          n8n_execution_id: string | null
          auto_generated: boolean
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string | null
          content: string
          featured_image?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          author?: string
          status?: "draft" | "published" | "scheduled"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          canonical_url?: string | null
          og_image?: string | null
          n8n_execution_id?: string | null
          auto_generated?: boolean
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string | null
          content?: string
          featured_image?: string | null
          meta_description?: string | null
          meta_keywords?: string[] | null
          author?: string
          status?: "draft" | "published" | "scheduled"
          published_at?: string | null
          created_at?: string
          updated_at?: string
          canonical_url?: string | null
          og_image?: string | null
          n8n_execution_id?: string | null
          auto_generated?: boolean
        }
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
        }
      }
      post_categories: {
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
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          image: string | null
          price_from: number | null
          duration_minutes: number | null
          display_order: number
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          image?: string | null
          price_from?: number | null
          duration_minutes?: number | null
          display_order?: number
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          image?: string | null
          price_from?: number | null
          duration_minutes?: number | null
          display_order?: number
          is_active?: boolean
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string | null
          content: string
          rating: number | null
          image: string | null
          is_featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role?: string | null
          content: string
          rating?: number | null
          image?: string | null
          is_featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string | null
          content?: string
          rating?: number | null
          image?: string | null
          is_featured?: boolean
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string
          created_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message: string
          created_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string
          created_at?: string
          is_read?: boolean
        }
      }
      automation_logs: {
        Row: {
          id: string
          workflow_name: string
          execution_id: string | null
          status: "success" | "error" | "pending"
          payload: Json | null
          result: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          workflow_name: string
          execution_id?: string | null
          status: "success" | "error" | "pending"
          payload?: Json | null
          result?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          workflow_name?: string
          execution_id?: string | null
          status?: "success" | "error" | "pending"
          payload?: Json | null
          result?: Json | null
          created_at?: string
        }
      }
    }
  }
}
