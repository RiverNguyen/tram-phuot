'use client'
import { Breadcrumb } from '@/components/shared'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Content from './components/Content'
import Summary from './components/Summary'
import { IBlogDetail, IRelatedBlog } from '@/interface/blog.interface'
import { useEffect, useRef, useState } from 'react'
import DrawerProvider from '@/components/provider/DrawerProvider'
import Related from './components/Related'
import { ChevronUp, X } from 'lucide-react'
import { DrawerClose } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'

import { scrollToSection } from '@/utils/scrollToSection'

export interface TocItem {
  id: string
  text: string
  level: number // h1 -> 1, h2 -> 2...
}

export default function DetailBlog({
  blog,
  relatedBlogs,
}: {
  blog: IBlogDetail
  relatedBlogs: IRelatedBlog[]
}) {
  const [open, setOpen] = useState(false)
  const t = useTranslations('DetailBlogPage')
  const { locale } = useParams<{ locale: string }>()
  const [tocs, setTocs] = useState<TocItem[]>([])

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbBlogList'), href: locale === 'en' ? '/blogs' : '/danh-sach-tin-tuc' },
    { label: blog?.title || '', href: '' },
  ]

  const scrollToHeading = (id: string) => {
    scrollToSection(id, 1, 5.75)
  }

  useEffect(() => {
    function slugify(text: string): string {
      return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
    }

    function parseContentWithTOC(html: string): TocItem[] {
      if (typeof window === 'undefined') {
        return []
      }

      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')

      const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const usedIds = new Set<string>()
      const toc: TocItem[] = []

      headings.forEach((heading) => {
        const level = Number(heading.tagName.replace('H', ''))
        const text = heading.textContent?.trim()
        if (!text) return

        // generate id nếu chưa có
        let id = heading.id
        if (!id) {
          const baseId = slugify(text)
          id = baseId
          let i = 1

          while (usedIds.has(id)) {
            id = `${baseId}-${i++}`
          }

          heading.id = id
        }

        usedIds.add(id)

        toc.push({
          id,
          text,
          level,
        })
      })

      return toc
    }

    setTocs(parseContentWithTOC(blog?.content || ''))
  }, [blog])

  return (
    <>
      <main className='relative bg-[#FDF4ED] pt-[calc(4.5rem+0.625rem+0.625rem)] xsm:pt-[calc(3.75rem+0.625rem)]'>
        <div className='max-w-[87.5rem] mx-auto xsm:max-w-full xsm:px-4'>
          <Breadcrumb
            breadcrumbItems={breadcrumbItems}
            classNameBreadcrumbList='py-[2.5rem] xsm:pb-[1.25rem]'
            classNameBreadcrumbItem='text-[#2E2E2E] not-last:text-[rgba(46,46,46,0.60)] last:max-w-[30.4375rem] -tracking-[0.01563rem] xsm:last:font-bold xsm:text-[0.875rem]'
          />

          <h1 className='w-[56.25rem] font-phu-du text-[3rem] font-medium leading-[3.6rem] text-[#2E2E2E] xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.375rem] xsm:mb-[0.5rem]'>
            {blog?.title}
          </h1>

          <div className='relative flex sm:space-x-[3.75rem] flex-start xsm:flex-col pb-[6.25rem] xsm:pb-[3rem]'>
            <Content blog={blog} />
            <Summary
              tocs={tocs}
              scrollToHeading={scrollToHeading}
            />
          </div>
        </div>
        <Related relatedBlogs={relatedBlogs} />
      </main>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='fixed bottom-0 left-0 right-0 z-12 w-full p-[0.75rem_1rem] font-phu-du text-[0.875rem] font-medium leading-[1.1375rem] text-[#2E2E2E] flex items-center justify-between bg-white sm:hidden'
      >
        <span>{t('contentSummary')}</span>
        <ChevronUp className='size-[1.25rem]' />
      </button>

      <DrawerProvider
        open={open}
        setOpen={setOpen}
        showDrawerDrag={false}
        className='rounded-t-[0.5rem] p-[1.5rem_1rem]!'
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
        <ul className='space-y-2 mb-[1.25rem] font-montserrat text-[0.875rem] leading-[1.3125rem] text-[rgba(46,46,46,0.75)] whitespace-pre-line'>
          {tocs.map((toc, i) => (
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
          className='text-[#338FE5] text-left font-montserrat text-[0.875rem] font-medium leading-[1.3125rem] cursor-pointer'
        >
          {t('seeMore')}
        </button>
      </DrawerProvider>
    </>
  )
}
