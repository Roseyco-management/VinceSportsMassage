import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { env } from "@/lib/env"
import { verifyWebhookSecret } from "@/lib/webhook-auth"
import { blogPostPayloadSchema } from "@/lib/validation"
import { logger } from "@/lib/logger"
import type {
  ApiErrorResponse,
  BlogPostSuccessResponse,
  BlogPostListResponse,
} from "@/lib/types/api"

// Lazy initialization of Supabase client
let supabase: SupabaseClient | null = null

function getSupabaseClient() {
  if (!supabase) {
    supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.SUPABASE_SERVICE_ROLE_KEY
    )
  }
  return supabase
}

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// POST - Create new blog post (called by n8n)
export async function POST(request: Request) {
  try {
    // Verify webhook secret with timing-safe comparison
    const headersList = await headers()
    const webhookSecret = headersList.get("x-webhook-secret")

    // Use constant-time comparison to prevent timing attacks
    // env.N8N_WEBHOOK_SECRET is validated at startup, guaranteed to exist
    if (!webhookSecret || !verifyWebhookSecret(webhookSecret, env.N8N_WEBHOOK_SECRET)) {
      logger.error("Invalid webhook secret")
      return NextResponse.json<ApiErrorResponse>(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate payload with Zod schema
    const result = blogPostPayloadSchema.safeParse(body)

    if (!result.success) {
      // Format validation errors for readable response
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }))

      return NextResponse.json<ApiErrorResponse>(
        { error: "Validation failed", details: errors },
        { status: 400 }
      )
    }

    // Use validated data for type-safe access
    const validatedBody = result.data

    // Generate slug if not provided
    const slug = validatedBody.slug || generateSlug(validatedBody.title)

    const db = getSupabaseClient()

    // Check if slug already exists
    const { data: existing } = await db
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single()

    const finalSlug = existing ? `${slug}-${Date.now()}` : slug

    // Prepare post data using validated fields
    const postData = {
      title: validatedBody.title,
      slug: finalSlug,
      content: validatedBody.content,
      excerpt: validatedBody.excerpt || validatedBody.content.substring(0, 160).replace(/<[^>]*>/g, "") + "...",
      featured_image: validatedBody.imageUrl || validatedBody.featured_image || null,
      meta_description: validatedBody.metaDescription || validatedBody.meta_description || null,
      meta_keywords: validatedBody.keywords || validatedBody.meta_keywords || [],
      author: validatedBody.author || "Vince McDowell",
      status: validatedBody.publish ? "published" : "draft",
      published_at: validatedBody.publish ? new Date().toISOString() : null,
      n8n_execution_id: validatedBody.executionId || validatedBody.n8n_execution_id || null,
      auto_generated: true,
    }

    // Insert blog post
    const { data, error } = await db
      .from("blog_posts")
      .insert(postData)
      .select()
      .single()

    if (error) {
      logger.error("Database insert failed", {
        error: error.message,
        title: validatedBody.title,
      })

      // Log error to automation_logs
      await db.from("automation_logs").insert({
        workflow_name: "Blog Automation",
        execution_id: validatedBody.executionId || validatedBody.n8n_execution_id || null,
        status: "error",
        payload: validatedBody,
        result: { error: error.message },
      })

      return NextResponse.json<ApiErrorResponse>(
        { error: error.message },
        { status: 500 }
      )
    }

    // Log success
    await db.from("automation_logs").insert({
      workflow_name: "Blog Automation",
      execution_id: validatedBody.executionId || validatedBody.n8n_execution_id || null,
      status: "success",
      payload: validatedBody,
      result: { postId: data.id, slug: data.slug },
    })

    // Revalidate blog pages with error handling
    try {
      revalidatePath("/blog")
      revalidatePath(`/blog/${data.slug}`)
    } catch (error) {
      // Log but don't fail the request - post was created successfully
      logger.warn("Cache revalidation failed", {
        error,
        slug: data.slug,
        message: "Post created but cache not refreshed",
      })
    }

    return NextResponse.json<BlogPostSuccessResponse>({
      success: true,
      post: {
        id: data.id,
        slug: data.slug,
        title: data.title,
        status: data.status,
        url: `${env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`,
      },
    })
  } catch (error) {
    logger.error("Unexpected error in blog POST", { error })
    return NextResponse.json<ApiErrorResponse>(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET - Fetch blog posts (for static generation or client-side)
export async function GET(request: Request) {
  try {
    const db = getSupabaseClient()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "published"
    const limit = parseInt(searchParams.get("limit") || "10")
    const offset = parseInt(searchParams.get("offset") || "0")

    let query = db
      .from("blog_posts")
      .select("id, slug, title, excerpt, featured_image, author, published_at, status")
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1)

    if (status !== "all") {
      query = query.eq("status", status)
    }

    const { data, error } = await query

    if (error) {
      logger.error("Database query failed", {
        error: error.message,
        status,
        limit,
        offset,
      })
      return NextResponse.json<ApiErrorResponse>(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json<BlogPostListResponse>({
      posts: data,
      count: data?.length || 0,
    })
  } catch (error) {
    logger.error("Unexpected error in blog GET", { error })
    return NextResponse.json<ApiErrorResponse>(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
