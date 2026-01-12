'use client'
import { Link } from '@/i18n/navigation'
import { IRelatedBlog } from '@/interface/blog.interface'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'

export default function BlogItem({ blog, className }: { blog: IRelatedBlog; className?: string }) {
  const { locale } = useParams<{ locale: string }>()

  const href = locale === 'en' ? `/blogs/${blog.slug}` : `/danh-sach-tin-tuc/${blog.slug}`

  return (
    <Link
      href={href}
      className={cn(
        'xsm:flex-col overflow-hidden xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] xsm:gap-[0.875rem] flex items-center gap-[4.5rem] group',
        className,
      )}
    >
      <div className='relative overflow-hidden xsm:h-[13.8125rem] xsm:w-full h-[19.75rem] w-[34rem] shrink-0 rounded-[1.25rem] xsm:rounded-none'>
        <Image
          src={blog?.thumbnail?.url}
          alt={''}
          width={799}
          height={478}
          className='size-full object-cover transition-all duration-500 ease-[cubic-bezier(0.65,0.01,0.28,0.98)] lg:group-hover:scale-107'
        />
      </div>

      <div className='w-full xsm:px-[0.875rem] xsm:pb-[0.875rem] xsm:gap-[1.25rem] flex flex-1 flex-col justify-between gap-[4rem]'>
        <div>
          {/* taxonomies */}
          {Array.isArray(blog?.taxonomies['type-news']) && (
            <div className='xsm:text-[0.75rem] font-montserrat text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem] text-[#F56E0A]'>
              {blog.taxonomies['type-news'][0]?.name}
            </div>
          )}
          {/* title */}
          <h3 className='xsm:mt-[0.5rem] xsm:mb-[0.375rem] xsm:text-[1.125rem] xsm:leading-[1.2375rem] font-phu-du my-[1rem] line-clamp-2 text-[2.125rem] leading-[2.3375rem] font-medium text-[#1F4D37]'>
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
  )
}
