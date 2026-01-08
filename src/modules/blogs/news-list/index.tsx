'use client'
import Image from 'next/image'
import Pagination from '@/components/shared/Pagination'

export default function NewsList() {
  return (
    <div className='xsm:gap-[1rem] flex w-full flex-col gap-[2rem]'>
      <div className='flex items-center justify-center gap-[3.75rem]'>
        <h2 className='xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du w-[28.5625rem] text-[3rem] leading-[3rem] font-medium text-[#2E2E2E] uppercase'>
          News List
        </h2>
        {/* filters */}
        <div className='flex flex-1 justify-between'>
          
        </div>
      </div>

      {/* news list */}
      <div className='xsm:gap-[1.25rem] flex flex-col gap-[1.875rem]'>
        {/* news item */}
        <div className='xsm:flex-col xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_3px_10px_0_rgba(0,0,0,0.08)] xsm:gap-[0.875rem] flex items-center gap-[4.5rem]'>
          <Image
            src='/blogs/d-blog-item-1.webp'
            alt='news item'
            width={799}
            height={478}
            className='xsm:h-[13.8125rem] xsm:w-full xsm:rounded-none h-[19.75rem] w-[34rem] shrink-0 rounded-[1.25rem]'
          />
          <div className='xsm:px-[0.875rem] xsm:pb-[0.875rem] xsm:gap-[1.25rem] flex flex-1 flex-col gap-[4rem]'>
            <div>
              {/* taxonomies */}
              <div className='xsm:text-[0.75rem] font-montserrat text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem] text-[#F56E0A]'>
                Featured news
              </div>
              {/* title */}
              <h3 className='xsm:mt-[0.5rem] xsm:mb-[0.375rem] xsm:text-[1.125rem] xsm:leading-[1.2375rem] font-phu-du my-[1rem] line-clamp-2 text-[2.125rem] leading-[2.3375rem] font-medium text-[#1F4D37]'>
                The Secretary Hau A Lenh attended the memorial service for Heroes and Martyrs.
              </h3>
              {/* description */}
              <p className='xsm:line-clamp-2 xsm:text-[0.875rem] xsm:leading-[1.3125rem] font-montserrat line-clamp-3 text-[1rem] leading-[1.5rem] text-[rgba(46,46,46,0.75)]'>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book
              </p>
            </div>

            {/* date */}
            <div className='xsm:text-[0.75rem] xsm:tracking-[-0.0075rem] font-montserrat text-[0.875rem] leading-[0.625rem] font-semibold tracking-[-0.00875rem] text-[rgba(46,46,46,0.60)]'>
              October 15, 2024
            </div>
          </div>
        </div>
      </div>

      {/* pagination */}
      <Pagination
        pageCurrent={1}
        pageCount={10}
        onPageChange={() => {}}
        className='xsm:mt-[1.25rem] mt-[2.5rem]'
      />
    </div>
  )
}
