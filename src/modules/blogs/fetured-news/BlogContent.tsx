'use client'

import { IBlog } from '@/interface/blogs.interface'
import BrandButton from '@/components/shared/BrandButton'
import { useLocale, useTranslations } from 'next-intl'

interface BlogContentProps {
  blog: IBlog
  baseHref?: string
  variant?: 'desktop' | 'mobile'
}

export default function BlogContent({ blog, baseHref, variant = 'desktop' }: BlogContentProps) {
  const t = useTranslations('BlogsPage')
  const locale = useLocale()
  return (
    <div className='w-full h-full flex flex-col justify-between items-start'>
      <div className='xsm:mb-[1rem] mb-[2.5rem]'>
        {/* taxonomies and date */}
        <div className='font-montserrat flex items-center space-x-[0.5rem] text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem]'>
          <span className='text-[#F56E0A] xsm:max-w-[8rem] xsm:line-clamp-1'>{blog?.taxonomies?.['type-news']?.[0]?.name}</span>
          <span className='size-[0.25rem] rounded-full bg-[#3B3943]'></span>
          <span className='text-[rgba(46,46,46,0.60)]'>
            {new Date(blog?.date).toLocaleDateString(locale, {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        {/* title */}
        <h3 className='xsm:mt-[0.625rem] xsm:mb-[0.75rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du my-[1.25rem] line-clamp-3 text-[2.125rem] leading-[2.3375rem] font-medium text-[#1F4D37]'>
          {blog?.title}
        </h3>
        {/* description */}
        <p className='xsm:line-clamp-4 xsm:text-[0.875rem] xsm:leading-[1.3125rem] font-montserrat line-clamp-8 text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)]'>
          {blog?.acf?.short_description}
        </p>
      </div>

      {/* Action button */}
      {variant === 'desktop' ? (
        <BrandButton
          type={{ variant: 'link', href: `${baseHref}/${blog?.slug}` }}
          variant='blueGradient'
          classNameButtonContainer='xsm:hidden w-[9.0625rem] px-[1rem] py-[1.0625rem]'
        >
          {t('seeDetail')}
        </BrandButton>
      ) : (
        <button
          type='button'
          className='mt-auto font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)] sm:hidden'
        >
          {t('seeDetail')} →
        </button>
      )}
    </div>
  )
}
