import { describe, it, expect } from 'vitest'
import { blogPostPayloadSchema } from '../validation'

describe('blogPostPayloadSchema', () => {
  describe('valid inputs', () => {
    it('accepts minimal valid payload with title and content', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: 'This is test content',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.title).toBe('Test Post')
        expect(result.data.content).toBe('This is test content')
      }
    })

    it('accepts full payload with all optional fields', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: 'This is test content',
        slug: 'test-post',
        excerpt: 'Test excerpt',
        imageUrl: 'https://example.com/image.jpg',
        metaDescription: 'Test meta description',
        keywords: ['test', 'post'],
        author: 'Test Author',
        publish: true,
        executionId: 'exec-123',
      })

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.slug).toBe('test-post')
        expect(result.data.excerpt).toBe('Test excerpt')
        expect(result.data.keywords).toEqual(['test', 'post'])
      }
    })

    it('accepts camelCase field names (n8n format)', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: 'This is test content',
        imageUrl: 'https://example.com/image.jpg',
        metaDescription: 'Test meta',
        executionId: 'exec-123',
      })

      expect(result.success).toBe(true)
    })

    it('accepts snake_case field names (legacy format)', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: 'This is test content',
        featured_image: 'https://example.com/image.jpg',
        meta_description: 'Test meta',
        meta_keywords: ['test'],
        n8n_execution_id: 'exec-123',
      })

      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('rejects payload with missing title', () => {
      const result = blogPostPayloadSchema.safeParse({
        content: 'This is test content',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === 'title'
        )
        expect(titleError).toBeDefined()
        expect(titleError?.code).toBe('invalid_type')
      }
    })

    it('rejects payload with missing content', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const contentError = result.error.issues.find(
          (issue) => issue.path[0] === 'content'
        )
        expect(contentError).toBeDefined()
        expect(contentError?.code).toBe('invalid_type')
      }
    })

    it('rejects payload with empty title', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: '',
        content: 'This is test content',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === 'title'
        )
        expect(titleError).toBeDefined()
        expect(titleError?.message).toContain('required')
      }
    })

    it('rejects payload with empty content', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: '',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const contentError = result.error.issues.find(
          (issue) => issue.path[0] === 'content'
        )
        expect(contentError).toBeDefined()
        expect(contentError?.message).toContain('required')
      }
    })

    it('rejects payload with invalid field types', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 123, // Should be string
        content: 'This is test content',
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const titleError = result.error.issues.find(
          (issue) => issue.path[0] === 'title'
        )
        expect(titleError).toBeDefined()
      }
    })

    it('rejects payload with invalid array type for keywords', () => {
      const result = blogPostPayloadSchema.safeParse({
        title: 'Test Post',
        content: 'This is test content',
        keywords: 'not-an-array', // Should be array
      })

      expect(result.success).toBe(false)
      if (!result.success) {
        const keywordsError = result.error.issues.find(
          (issue) => issue.path[0] === 'keywords'
        )
        expect(keywordsError).toBeDefined()
      }
    })
  })
})
