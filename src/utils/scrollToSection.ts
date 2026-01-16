'use client'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * Detects if the device is iOS
 */
function isIOS(): boolean {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

/**
 * Gets the current scroll position, compatible with iOS Safari
 */
function getScrollPosition(): number {
  // iOS Safari compatibility: use documentElement or body scrollTop
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

/**
 * Native smooth scroll for iOS using requestAnimationFrame (more reliable than GSAP on iOS)
 */
function nativeSmoothScroll(element: HTMLElement, offsetPx: number, duration: number): void {
  const startPosition = getScrollPosition()
  const targetRect = element.getBoundingClientRect()
  const targetPosition = targetRect.top + startPosition - offsetPx
  const distance = targetPosition - startPosition
  const startTime = performance.now()

  function animateScroll(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / (duration * 1000), 1)

    // Easing function (ease-out, similar to power2.out)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const currentPosition = startPosition + distance * easeOut

    // On iOS, scroll both window and documentElement to ensure compatibility
    window.scrollTo(0, currentPosition)
    document.documentElement.scrollTop = currentPosition
    if (document.body) {
      document.body.scrollTop = currentPosition
    }

    if (progress < 1) {
      requestAnimationFrame(animateScroll)
    }
  }

  requestAnimationFrame(animateScroll)
}

/**
 * Scrolls smoothly to a section with the given element ID using GSAP.
 * Falls back to native smooth scroll on iOS if GSAP doesn't work well.
 * @param elementId - The ID of the element to scroll to.
 * @param duration - Optional duration of the scroll animation in seconds (default: 1s).
 * @param offsetRem - Optional offset from the top in rem (default: 0rem).
 */
export function scrollToSection(
  elementId: string,
  duration: number = 1,
  offsetRem: number = 0,
): void {
  const targetElement = document.getElementById(elementId)

  if (!targetElement) {
    console.warn(`Element with ID '${elementId}' not found.`)
    return
  }

  const offsetPx = offsetRem * parseFloat(getComputedStyle(document.documentElement).fontSize)

  // Use native smooth scroll for iOS as GSAP ScrollToPlugin can be unreliable
  if (isIOS()) {
    nativeSmoothScroll(targetElement, offsetPx, duration)
    return
  }

  // For non-iOS, use GSAP
  const scrollPosition = getScrollPosition()
  const targetPosition = targetElement.getBoundingClientRect().top + scrollPosition - offsetPx

  // Use GSAP for other platforms
  gsap.to(window, {
    duration: duration,
    scrollTo: { y: targetPosition, autoKill: true },
    ease: 'power2.out',
  })
}
