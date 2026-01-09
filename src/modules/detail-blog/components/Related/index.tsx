'use client'

import { BrandButton } from '@/components/shared'
import { IRelatedBlog } from '@/interface/blog.interface'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import BlogItem from './BlogItem'

export default function Related({ relatedBlogs }: { relatedBlogs: IRelatedBlog[] }) {
  const { locale } = useParams<{ locale: string }>()
  const t = useTranslations('DetailBlogPage')

  return (
    <div className='max-w-[87.5rem] mx-auto xsm:max-w-full pt-[2.5rem] pb-[5rem] xsm:py-[3rem]'>
      <div className='flex items-end justify-between mb-[2.5rem] xsm:mb-[1.25rem] xsm:px-4'>
        <div className='relative'>
          <h3 className='relative ml-[1.9375rem] mb-[-1rem] font-motherland text-[2.25rem] leading-normal text-[#F56E0A] xsm:text-[1.5rem] xsm:mb-[-0.5rem] xsm:ml-[1.27rem]'>
            <div className='text-stroke absolute inset-0'>{t('otherBlog')}</div>
            <div className='relative z-1'>{t('otherBlog')}</div>
          </h3>
          <div className='relative flex items-center space-x-3 z-1'>
            <h2 className='font-phu-du text-[3rem] font-bold leading-[3rem] bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-transparent xsm:text-[2rem] xsm:leading-[2rem] xsm:font-medium'>
              {t('relatedBlogs')}
            </h2>
            <Image
              src='/detail-blog/d-title-icon.svg'
              alt=''
              width={0}
              height={0}
              className='w-[2rem] h-auto object-cover xsm:w-[1.8125rem]'
            />
          </div>
        </div>
        <BrandButton
          type={{
            variant: 'link',
            href: locale === 'en' ? '/blogs' : 'danh-sach-tin-tuc',
          }}
          variant='transparent'
          classNameButtonContainer='xsm:hidden'
        >
          {t('viewMore')}
        </BrandButton>
      </div>
      <div
        className='xsm:flex xsm:space-x-[0.875rem] sm:space-y-[2.5rem] xsm:pb-[1.25rem] xsm:overflow-x-auto xsm:px-4'
        style={{
          scrollbarWidth: 'none',
        }}
      >
        {Array.isArray(relatedBlogs) &&
          relatedBlogs.map((blog) => (
            <BlogItem
              blog={blog}
              key={blog.id}
              className='xsm:w-[18.75rem] xsm:h-[23.9375rem] xsm:shrink-0'
            />
          ))}
      </div>
      <BrandButton
        type={{
          variant: 'link',
          href: locale === 'en' ? '/blogs' : 'danh-sach-tin-tuc',
        }}
        variant='transparent'
        classNameButtonContainer='sm:hidden w-fit mx-auto'
      >
        {t('viewMore')}
      </BrandButton>
    </div>
  )
}
