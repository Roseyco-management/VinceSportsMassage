import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { NextResponse } from "next/server"

// Lazy initialization of Supabase client
let supabase: SupabaseClient | null = null

function getSupabaseClient() {
  if (!supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!url || !key) {
      throw new Error("Supabase credentials not configured")
    }

    supabase = createClient(url, key)
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
    // Verify webhook secret
    const headersList = await headers()
    const webhookSecret = headersList.get("x-webhook-secret")

    if (webhookSecret !== process.env.N8N_WEBHOOK_SECRET) {
      console.error("Invalid webhook secret")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields: title and content" },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const slug = body.slug || generateSlug(body.title)

    const db = getSupabaseClient()

    // Check if slug already exists
    const { data: existing } = await db
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single()

    if (existing) {
      // Append timestamp to make unique
      const uniqueSlug = `${slug}-${Date.now()}`
      body.slug = uniqueSlug
    } else {
      body.slug = slug
    }

    // Prepare post data
    const postData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || body.content.substring(0, 160).replace(/<[^>]*>/g, "") + "...",
      featured_image: body.imageUrl || body.featured_image || null,
      meta_description: body.metaDescription || body.meta_description || null,
      meta_keywords: body.keywords || body.meta_keywords || [],
      author: body.author || "Vince McDowell",
      status: body.publish ? "published" : "draft",
      published_at: body.publish ? new Date().toISOString() : null,
      n8n_execution_id: body.executionId || body.n8n_execution_id || null,
      auto_generated: true,
    }

    // Insert blog post
    const { data, error } = await db
      .from("blog_posts")
      .insert(postData)
      .select()
      .single()

    if (error) {
      console.error("Error inserting blog post:", error)

      // Log error to automation_logs
      await db.from("automation_logs").insert({
        workflow_name: "Blog Automation",
        execution_id: body.executionId || null,
        status: "error",
        payload: body,
        result: { error: error.message },
      })

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Log success
    await db.from("automation_logs").insert({
      workflow_name: "Blog Automation",
      execution_id: body.executionId || null,
      status: "success",
      payload: body,
      result: { postId: data.id, slug: data.slug },
    })

    // Revalidate blog pages
    revalidatePath("/blog")
    revalidatePath(`/blog/${data.slug}`)

    return NextResponse.json({
      success: true,
      post: {
        id: data.id,
        slug: data.slug,
        title: data.title,
        status: data.status,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}`,
      },
    })
  } catch (error) {
    console.error("Unexpected error in blog API:", error)
    return NextResponse.json(
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
      console.error("Error fetching blog posts:", error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      posts: data,
      count: data?.length || 0,
    })
  } catch (error) {
    console.error("Unexpected error fetching posts:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
