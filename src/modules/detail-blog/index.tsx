'use client'
import { Breadcrumb } from '@/components/shared'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Content from './components/Content'
import Summary from './components/Summary'
import { IBlogDetail, IRelatedBlog } from '@/interface/blog.interface'
import { useEffect, useState } from 'react'
import Related from './components/Related'

export interface TocItem {
  id: string
  text: string
  level: number // h1 -> 1, h2 -> 2...
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function DetailBlog({
  blog,
  relatedBlogs,
}: {
  blog: IBlogDetail
  relatedBlogs: IRelatedBlog[]
}) {
  const t = useTranslations('DetailBlogPage')
  const { locale } = useParams<{ locale: string }>()
  const [tocs, setTocs] = useState<TocItem[]>([])
  const [html, setHTML] = useState(blog?.content || '')

  const breadcrumbItems = [
    { label: t('breadcrumbHome'), href: '/' },
    { label: t('breadcrumbBlogList'), href: locale === 'en' ? '/blogs' : '/vi/danh-sach-tin-tuc' },
    { label: blog?.title || '', href: '' },
  ]

  useEffect(() => {
    if (!html) return

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const tables = Array.from(doc.querySelectorAll('table'))

    tables.forEach((table) => {
      // Tránh bọc lại nếu đã có wrapper
      if (table.parentElement?.classList.contains('table-wrapper')) return

      const wrapper = doc.createElement('div')
      wrapper.className = 'table-wrapper'

      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })

    const headings = Array.from(doc.querySelectorAll('h2'))
    const usedIds = new Set<string>()

    headings.forEach((heading) => {
      if (heading.id) {
        usedIds.add(heading.id)
        return
      }

      const text = heading.textContent?.trim()
      if (!text) return

      const baseId = slugify(text)
      let id = baseId
      let i = 1

      while (usedIds.has(id)) {
        id = `${baseId}-${i++}`
      }

      heading.id = id
      usedIds.add(id)
    })

    setTocs(
      headings.map((heading) => ({
        id: heading.id,
        text: heading.textContent?.trim() || '',
        level: Number(heading.tagName.replace('H', '')),
      })),
    )
    setHTML(doc.body.innerHTML)
  }, [])

  return (
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
          <Content
            blog={blog}
            html={html}
          />
          <Summary tocs={tocs} />
        </div>
      </div>
      <Related relatedBlogs={relatedBlogs} />
    </main>
  )
}
