import { z } from "zod"

/**
 * Zod schema for blog post payload validation
 * Supports both camelCase (n8n) and snake_case (legacy) field names
 */
export const blogPostPayloadSchema = z.object({
  // Required fields
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),

  // Optional fields - camelCase (n8n)
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  imageUrl: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  publish: z.boolean().optional(),
  executionId: z.string().optional(),

  // Optional fields - snake_case (legacy)
  featured_image: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.array(z.string()).optional(),
  n8n_execution_id: z.string().optional(),
})

export type BlogPostPayload = z.infer<typeof blogPostPayloadSchema>
