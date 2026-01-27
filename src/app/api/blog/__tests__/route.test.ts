import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock environment module before imports
vi.mock('@/lib/env', () => ({
  env: {
    N8N_WEBHOOK_SECRET: 'test-secret-123',
    NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
    SUPABASE_SERVICE_ROLE_KEY: 'test-key',
    NEXT_PUBLIC_SITE_URL: 'https://test.com',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key',
  },
}))

// Mock Next.js headers
vi.mock('next/headers', () => ({
  headers: vi.fn(),
}))

// Mock Next.js cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// Mock logger
vi.mock('@/lib/logger', () => ({
  logger: {
    error: vi.fn(),
    warn: vi.fn(),
  },
}))

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({ data: null })),
        })),
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: '123',
              slug: 'test-post',
              title: 'Test Post',
              status: 'published',
            },
            error: null,
          })),
        })),
      })),
    })),
  })),
}))

// Import after mocks
import { POST } from '../route'

describe('Blog API POST - Webhook Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when webhook secret header is missing', async () => {
    const { headers } = await import('next/headers')
    vi.mocked(headers).mockResolvedValue(
      new Map([]) as any
    )

    const request = new Request('http://localhost:3000/api/blog', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Test content',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toEqual({ error: 'Unauthorized' })
  })

  it('returns 401 when webhook secret is invalid', async () => {
    const { headers } = await import('next/headers')
    vi.mocked(headers).mockResolvedValue(
      new Map([['x-webhook-secret', 'invalid-secret']]) as any
    )

    const request = new Request('http://localhost:3000/api/blog', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-webhook-secret': 'invalid-secret',
      },
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Test content',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data).toEqual({ error: 'Unauthorized' })
  })

  it('accepts valid webhook secret and processes request', async () => {
    const { headers } = await import('next/headers')
    vi.mocked(headers).mockResolvedValue(
      new Map([['x-webhook-secret', 'test-secret-123']]) as any
    )

    const request = new Request('http://localhost:3000/api/blog', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-webhook-secret': 'test-secret-123',
      },
      body: JSON.stringify({
        title: 'Test Post',
        content: 'Test content',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    // Should not return 401 - authentication passed
    expect(response.status).not.toBe(401)

    // Should return success response with post data
    expect(data).toHaveProperty('success')
    expect(data).toHaveProperty('post')
  })
})
