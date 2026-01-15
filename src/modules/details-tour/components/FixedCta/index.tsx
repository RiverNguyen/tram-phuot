'use client'

import { cn } from '@/lib/utils'
import { scrollToSection } from '@/utils/scrollToSection'
import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'section-overview', label: 'Overview' },
  { id: 'section-detail-itinerary', label: 'Detail Itinerary' },
  { id: 'section-booking', label: 'Booking tour' },
  { id: 'section-policy', label: 'Policy' },
]

export default function FixedCta() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0,
      },
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Hide when footer enters viewport
  useEffect(() => {
    const footerEl = document.querySelector('footer')
    if (!footerEl) return

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(Boolean(entry?.isIntersecting))
      },
      {
        threshold: 0,
      },
    )

    footerObserver.observe(footerEl)
    return () => footerObserver.disconnect()
  }, [])

  const handleClickCta = (sectionId: string) => {
    scrollToSection(sectionId, 1, 6)
  }

  if (isFooterVisible) return null

  return (
    <div className='xsm:hidden fixed right-0 bottom-0 left-0 z-50 flex h-13.25 w-full items-center bg-white px-25 shadow-[0_-4px_12px_0_rgba(0,0,0,0.08)]'>
      {SECTIONS.map((item, index) => (
        <button
          key={index}
          type='button'
          onClick={() => handleClickCta(item.id)}
          className={cn(
            'flex-center font-phu-du relative h-full flex-1 cursor-pointer text-[1.125rem] leading-[1.1] font-medium text-[#07364D] uppercase after:absolute after:right-full after:bottom-0 after:left-0 after:block after:h-1.5 after:bg-[linear-gradient(-45deg,#03328C_0%,#00804D_100%)] after:transition-all after:duration-500 after:ease-in-out',
            activeId === item.id && 'after:right-0',
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
