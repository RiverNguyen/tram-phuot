'use client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, convertRemToPx } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { TocItem } from '../..'
import { ChevronUp, X } from 'lucide-react'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { DrawerClose } from '@/components/ui/drawer'
import useIsMobile from '@/hooks/use-is-mobile'
import { scrollToSection } from '@/utils/scrollToSection'

gsap.registerPlugin(ScrollTrigger)

const offsetRem = 5.75

export default function Summary({ tocs }: { tocs: TocItem[] }) {
  const t = useTranslations('DetailBlogPage')
  const [open, setOpen] = useState(false)
  const [expand, setExpand] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const { isLoading, isMobile } = useIsMobile()

  const scrollToHeading = (id: string) => {
    scrollToSection(id, 1, offsetRem)
  }

  useEffect(() => {
    if (!tocs || tocs.length === 0) return

    const headings = tocs
      .map((toc) => document.getElementById(toc.id))
      .filter(Boolean) as HTMLElement[]

    if (headings.length === 0) return

    setActiveId((prev) => prev ?? headings[0].id)

    const ctx = gsap.context(() => {
      headings.forEach((heading, i) => {
        ScrollTrigger.create({
          trigger: heading,
          start: `top top+=${convertRemToPx(offsetRem)}px`,
          end: 'bottom bottom',
          onEnter: () => setActiveId(heading.id),
          onEnterBack: () => {
            const prevHeading = headings[i - 1]
            if (prevHeading) {
              setActiveId(prevHeading.id)
            }
          },
        })
      })
    })

    return () => ctx.revert()
  }, [tocs])

  if (tocs.length < 1)
    return (
      <Skeleton className='mt-10 h-[18.5rem] top-[calc(4.5rem+0.625rem+0.625rem)] sticky w-[27.5rem] shrink-0 rounded-[0.75rem] p-[1.5rem_1.875rem] shadow-[0_3px_40px_1px_rgba(214,214,221,0.40)] space-y-4 xsm:hidden' />
    )

  return (
    <>
      <aside className='h-fit mt-10 top-[calc(4.5rem+0.625rem+0.625rem)] sticky w-[27.5rem] shrink-0 rounded-[0.75rem] p-[1.5rem_1.875rem] bg-white shadow-[0_3px_40px_1px_rgba(214,214,221,0.40)] space-y-4 xsm:hidden'>
        <h4 className='font-phu-du text-[1.25rem] font-medium leading-[1.5rem] tracking-[0.025rem] text-[#2E2E2E] uppercase'>
          {t('contentSummary')}
        </h4>
        <ul className='space-y-2'>
          {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
            <li key={i}>
              <button
                type='button'
                onClick={() => scrollToHeading(toc.id)}
                className={cn(
                  'cursor-pointer text-left font-montserrat text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)] transition-all duration-200',
                  activeId === toc.id && 'font-medium text-[#2E2E2E]',
                )}
              >
                {toc.text}
              </button>
            </li>
          ))}
        </ul>
        {tocs.length > 4 && (
          <button
            type='button'
            onClick={() => setExpand((prev) => !prev)}
            className='text-[#338FE5] font-montserrat text-[1rem] font-medium leading-[1.5rem] -tracking-[0.01563rem] cursor-pointer'
          >
            {expand ? t('seeLess') : t('seeMore')}
          </button>
        )}
      </aside>

      {!isLoading && isMobile && (
        <>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className={cn(
              'fixed bottom-0 left-0 right-0 z-12 w-full p-[0.75rem_1rem] font-phu-du text-[0.875rem] font-medium leading-[1.1375rem] text-[#2E2E2E] flex items-center justify-between bg-white sm:hidden',
            )}
          >
            <span>{t('contentSummary')}</span>
            <ChevronUp className='size-[1.25rem]' />
          </button>

          <DrawerProvider
            open={open}
            setOpen={setOpen}
            showDrawerDrag={false}
            className='rounded-t-[0.5rem]! p-[1.5rem_1rem]!'
          >
            <div className='flex items-center justify-between mb-[1.25rem]'>
              <h2 className='font-phu-du text-[1.125rem] font-bold leading-[1.2375rem] bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'>
                {t('contentSummary')}
              </h2>
              <DrawerClose asChild>
                <button
                  type='button'
                  className='size-[2rem] flex-center'
                >
                  <X className='size-6' />
                </button>
              </DrawerClose>
            </div>
            <ul className='space-y-2 mb-[1.25rem] '>
              {tocs.slice(0, expand ? tocs.length : 4).map((toc, i) => (
                <li key={i}>
                  <button
                    type='button'
                    onClick={() => {
                      setOpen(false)
                      scrollToHeading(toc.id)
                    }}
                    className={cn(
                      'cursor-pointer text-left font-montserrat text-[0.875rem] leading-[1.3125rem] text-[rgba(46,46,46,0.75)] transition-all duration-200 whitespace-pre-line',
                      activeId === toc.id && 'font-medium text-[#2E2E2E]',
                    )}
                  >
                    {toc.text}
                  </button>
                </li>
              ))}
            </ul>
            {tocs.length > 4 && (
              <button
                onClick={() => setExpand((prev) => !prev)}
                type='button'
                className='text-[#338FE5] text-left font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] cursor-pointer'
              >
                {expand ? t('seeLess') : t('seeMore')}
              </button>
            )}
          </DrawerProvider>
        </>
      )}
    </>
  )
}
