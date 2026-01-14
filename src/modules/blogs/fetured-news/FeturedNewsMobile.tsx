'use client'
import { IBlog } from '@/interface/blogs.interface'
import Image from 'next/image'
import BlogContent from './BlogContent'
import Link from 'next/link'

export default function FeturedNewsMobile({ blog, baseHref }: { blog: IBlog; baseHref: string }) {
  return (
    <Link href={`${baseHref}/${blog?.slug}`} className='xsm:relative xsm:flex-col xsm:gap-[1rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] flex items-center gap-[2.5rem] shrink-0 xsm:w-[18.75rem] w-full'>
      <Image
        src={blog?.thumbnail?.url || '/default.webp'}
        alt={blog?.title}
        width={799}
        height={478}
        className='xsm:h-[12rem] xsm:w-full xsm:rounded-t-[0.75rem] xsm:rounded-b-none shrink-0 h-[29.875rem] rounded-[1.25rem] object-cover'
      />

      <div className='xsm:w-full xsm:px-[0.75rem] xsm:pt-0 xsm:pb-[1rem] h-full animate-content w-[35.0625rem] py-[1.75rem]'>
        <BlogContent
          blog={blog}
          variant='mobile'
        />
      </div>
    </Link>
  )
}
