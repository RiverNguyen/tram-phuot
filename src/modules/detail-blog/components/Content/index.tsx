'use client'
import { useTranslations } from 'next-intl'
import './style.css'
import { IBlogDetail } from '@/interface/blog.interface'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function normalizeCmsHtml(html: string): string {
  if (!html) return html

  // dùng DOMParser nếu có (browser / edge runtime)
  if (typeof window !== 'undefined') {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
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

    return doc.body.innerHTML
  }

  // fallback SSR: return nguyên html
  return html
}

export default function Content({ blog }: { blog: IBlogDetail }) {
  const { locale } = useParams<{ locale: string }>()
  const t = useTranslations('DetailBlogPage')
  const [url, setUrl] = useState('')

  const handleShare = async () => {
    const url = window.location.href

    try {
      await navigator.clipboard.writeText(url)
      toast.success(t('copyClipboard'))
    } catch (error) {
      toast.error(t('copyClipboardError'))
    }
  }

  useEffect(() => {
    setUrl(window.location.href)
  }, [])

  return (
    <div className='grow min-w-0'>
      <div
        id='blog_detail'
        className='pb-10 border-b border-b-[#DFDEDE] font-phu-du xsm:pb-[1.25rem]'
        dangerouslySetInnerHTML={{
          __html: normalizeCmsHtml(blog?.content || ''),
        }}
      ></div>
      <div className='flex sm:items-center justify-between pt-[1.125rem] xsm:flex-col xsm:justify-start xsm:pt-[1.25rem] xsm:space-y-[1.25rem] font-montserrat text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)] xsm:text-[0.75rem] xsm:leading-[1.05rem]'>
        <div className='sm:space-x-12 flex sm:items-center xsm:flex-col xsm:space-y-[0.75rem]'>
          <div className='space-x-[0.3125rem]'>
            <span>{t('postedBy')}:</span>
            <span className='font-bold text-[#2E2E2E] xsm:font-semibold'>Admin</span>
          </div>
          <div className='space-x-[0.3125rem]'>
            <span>{t('postedOn')}:</span>
            <span className='font-bold text-[#2E2E2E] xsm:font-semibold'>
              {new Date(blog.date).toLocaleDateString(locale, {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
        <div className='flex items-center space-x-3'>
          <span>{t('share')}:</span>
          <div className='flex items-center space-x-2'>
            <button
              type='button'
              className='cursor-pointer'
              onClick={handleShare}
            >
              <Image
                src='/detail-blog/d-share.svg'
                alt=''
                width={40}
                height={40}
                className='size-[2.5rem] xsm:size-[1.5rem]'
              />
            </button>
            <Link
              href={`https://facebook.com/sharer/sharer.php?u=${url}`}
              target='_blank'
            >
              <Image
                src='/detail-blog/d-fb.svg'
                alt=''
                width={40}
                height={40}
                className='size-[2.5rem] xsm:size-[1.5rem]'
              />
            </Link>
            <Link
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
              target='_blank'
            >
              <Image
                src='/detail-blog/d-linkedin.svg'
                alt=''
                width={40}
                height={40}
                className='size-[2.5rem] xsm:size-[1.5rem]'
              />
            </Link>
            <Link
              href={`https://x.com/intent/post?url=${url}`}
              target='_blank'
            >
              <Image
                src='/detail-blog/d-x.svg'
                alt=''
                width={40}
                height={40}
                className='size-[2.5rem] xsm:size-[1.5rem]'
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
