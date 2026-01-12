'use client'

export function extractHeadings(html: string): Element[] {
  if (!html.trim() || typeof window === 'undefined') return []

  const doc = new DOMParser().parseFromString(html, 'text/html')

  return Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'))
}
