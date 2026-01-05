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

  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  )
  return rem * rootFontSize
}