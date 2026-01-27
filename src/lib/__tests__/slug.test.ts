import { describe, it, expect } from 'vitest'
import { generateSlug } from '../slug'

describe('generateSlug', () => {
  it('converts basic title to lowercase with hyphens', () => {
    expect(generateSlug('Hello World')).toBe('hello-world')
  })

  it('removes special characters', () => {
    expect(generateSlug('Hello! World?')).toBe('hello-world')
  })

  it('collapses multiple spaces into single hyphen', () => {
    expect(generateSlug('Hello   World')).toBe('hello-world')
  })

  it('removes leading and trailing hyphens', () => {
    expect(generateSlug('-hello-world-')).toBe('hello-world')
  })

  it('preserves numbers', () => {
    expect(generateSlug('Hello 2024 World')).toBe('hello-2024-world')
  })

  it('handles empty string', () => {
    expect(generateSlug('')).toBe('')
  })

  it('handles strings with only special characters', () => {
    expect(generateSlug('!!??##')).toBe('')
  })

  it('handles mixed special characters and text', () => {
    expect(generateSlug('The @Best #Massage $100!')).toBe('the-best-massage-100')
  })
})
