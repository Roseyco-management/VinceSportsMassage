/**
 * API Response Type Definitions
 *
 * TypeScript interfaces for Next.js API route responses.
 * Provides compile-time type safety for response structures.
 */

/**
 * Blog post creation success response
 *
 * Returned when a blog post is successfully created via POST /api/blog
 */
export interface BlogPostSuccessResponse {
  readonly success: true
  readonly post: {
    readonly id: string
    readonly slug: string
    readonly title: string
    readonly status: string
    readonly url: string
  }
}

/**
 * Blog post list response
 *
 * Returned when fetching blog posts via GET /api/blog
 */
export interface BlogPostListResponse {
  readonly posts: ReadonlyArray<{
    readonly id: string
    readonly slug: string
    readonly title: string
    readonly excerpt: string | null
    readonly featured_image: string | null
    readonly author: string
    readonly published_at: string | null
    readonly status: string
  }>
  readonly count: number
}

/**
 * API error response
 *
 * Returned when an API request fails with validation or server errors
 */
export interface ApiErrorResponse {
  readonly error: string
  readonly details?: ReadonlyArray<{
    readonly field: string
    readonly message: string
  }>
}
