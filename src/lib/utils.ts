import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractTiktokId(url: string): string {
  const match = url.match(/video\/(\d+)/)
  return match ? match[1] : ''
}

export function convertRemToPx(rem: number) {
  if (typeof window === 'undefined' || !document?.documentElement) {
    return
  }

  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
  return rem * rootFontSize
}

// Helper function to normalize price (convert 3.5 to 3500 if needed)
export const normalizePrice = (price: number): number => {
  const numPrice = Number(price)
  // If the number is less than 100 and has decimal places, it might be in "thousands" format (e.g., 3.5 = 3500)
  if (numPrice < 100 && numPrice % 1 !== 0) {
    return Math.round(numPrice * 1000)
  }
  return Math.round(numPrice)
}

// Format USD currency
export const formatUSD = (amount: number): string => {
  const normalizedAmount = normalizePrice(amount)
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(normalizedAmount)
}

export function decodeHtmlEntities(text: string): string {
  if (typeof window === 'undefined') {
    // Server-side: simple decode for common entities
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
  }
  // Client-side: use browser API for complete decoding
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}
