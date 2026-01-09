'use client'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { TocItem } from '../..'

export default function Summary({
  tocs,
  scrollToHeading,
}: {
  tocs: TocItem[]
  scrollToHeading: (id: string) => void
}) {
  const t = useTranslations('DetailBlogPage')
  const [expand, setExpand] = useState(false)

  if (tocs.length < 1)
    return (
      <Skeleton className='mt-10 h-[18.5rem] top-[calc(4.5rem+0.625rem+0.625rem)] sticky w-[27.5rem] shrink-0 rounded-[0.75rem] p-[1.5rem_1.875rem] shadow-[0_3px_40px_1px_rgba(214,214,221,0.40)] space-y-4 xsm:hidden' />
    )

  return (
    <aside className='h-fit mt-10 top-[calc(4.5rem+0.625rem+0.625rem)] sticky w-[27.5rem] shrink-0 rounded-[0.75rem] p-[1.5rem_1.875rem] bg-white shadow-[0_3px_40px_1px_rgba(214,214,221,0.40)] space-y-4 xsm:hidden'>
      <h4 className='font-phu-du text-[1.25rem] font-medium leading-[1.5rem] tracking-[0.025rem] text-[#2E2E2E] uppercase'>
        {t('contentSummary')}
      </h4>
      <ul className='space-y-2 font-montserrat text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)]'>
        {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
          <li key={i}>
            <button
              type='button'
              onClick={() => scrollToHeading(toc.id)}
              className={cn('cursor-pointer text-left')}
            >
              {toc.text}
            </button>
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={() => setExpand((prev) => !prev)}
        className='text-[#338FE5] font-montserrat text-[1rem] font-medium leading-[1.5rem] -tracking-[0.01563rem] cursor-pointer'
      >
        {expand ? t('seeLess') : t('seeMore')}
      </button>
    </aside>
  )
}
