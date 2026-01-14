'use client'
import Image from 'next/image'
import { IBlog } from '@/interface/blogs.interface'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

export default function NewsList({ blogsData }: { blogsData: IBlog[] }) {
  const t = useTranslations('BlogsPage')
  const locale = useLocale()
  const baseHref = locale === 'en' ? '/blogs' : '/vi/danh-sach-tin-tuc'

  return (
    <div className='xsm:gap-[1.25rem] flex flex-col gap-[1.875rem]'>
      {/* news item */}
      {blogsData?.length > 0 ? (
        blogsData.map((blog) => (
          <Link
            key={blog.id}
            href={`${baseHref}/${blog.slug}`}
            className='xsm:flex-col xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] xsm:gap-[0.875rem] group flex items-center gap-[4.5rem] overflow-hidden'
          >
            <div className='xsm:h-[13.8125rem] xsm:w-full xsm:rounded-none h-[19.75rem] w-[34rem] shrink-0 rounded-[1.25rem] overflow-hidden'>
              <Image
                src={blog?.thumbnail?.url || '/default.webp'}
                alt='news item'
                width={799}
                height={478}
                className='w-full h-full object-cover group-hover:scale-110 transition-all duration-300 ease-out'
              />
            </div>
            <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] xsm:gap-[1.25rem] w-full flex flex-1 flex-col gap-[4rem]'>
              <div>
                {/* taxonomies */}
                <div className='xsm:text-[0.75rem] font-montserrat text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem] text-[#F56E0A]'>
                  {blog?.taxonomies?.['type-news']?.[0]?.name}
                </div>
                {/* title */}
                <h3 className='xsm:mt-[0.5rem] xsm:mb-[0.375rem] xsm:text-[1.125rem] xsm:leading-[1.2375rem] font-phu-du my-[1rem] line-clamp-2 text-[2.125rem] leading-[2.3375rem] font-medium text-[#1F4D37] lg:group-hover:text-[#F56E0A] transition-all duration-300 ease-out'>
                  {blog?.title}
                </h3>
                {/* description */}
                <p className='xsm:line-clamp-2 xsm:text-[0.875rem] xsm:leading-[1.3125rem] font-montserrat line-clamp-3 text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)]'>
                  {blog?.acf?.short_description}
                </p>
              </div>

              {/* date */}
              <div className='xsm:text-[0.75rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem] text-[rgba(46,46,46,0.60)]'>
                {new Date(blog?.published).toLocaleDateString(locale, {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className='mx-auto text-center'>{t('noResult')}</p>
      )}
    </div>
  )
}
