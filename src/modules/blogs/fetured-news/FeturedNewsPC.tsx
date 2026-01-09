'use client'
import Image from 'next/image'
import { IBlog } from '@/interface/blogs.interface'
import { Autoplay, Parallax, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/parallax'
import './style.css'
import BlogContent from './BlogContent'

export default function FeturedNewsPC({
  featuredNewsData,
  baseHref,
}: {
  featuredNewsData: IBlog[]
  baseHref: string
}) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentSlide(swiper.realIndex ?? swiper.activeIndex)
  }

  return (
    <div className='xsm:relative xsm:flex-col xsm:gap-[1.25rem] xsm:rounded-[0.75rem] xsm:bg-white xsm:shadow-[0_4px_12px_0_rgba(0,0,0,0.10)] group flex items-center gap-[2.5rem]'>
      {/* image slider */}
      <div className='xsm:static xsm:w-full xsm:h-[15.3125rem] xsm:rounded-none relative w-[49.9375rem] h-[29.875rem] rounded-[1.25rem]'>
        <Swiper
          modules={[Autoplay, Parallax, Pagination]}
          slidesPerView={1}
          grabCursor={true}
          speed={1000}
          loop={featuredNewsData && featuredNewsData.length > 1}
          className='xsm:rounded-t-[0.75rem] xsm:rounded-b-none w-full h-full rounded-[1.25rem]'
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          parallax={true}
          pagination={{
            clickable: true,
            el: '.featured-news-pagination',
            bulletClass: 'featured-news-pagination-bullet',
            bulletActiveClass: 'featured-news-pagination-bullet-active',
          }}
        >
          {featuredNewsData?.map((item) => (
            <SwiperSlide
              key={item?.id}
              className='relative overflow-hidden'
            >
              <div
                className='size-full overflow-hidden absolute top-0 left-0 will-change-transform'
                data-swiper-parallax='70%'
              >
                <Image
                  src={item?.thumbnail?.url}
                  alt='featured news'
                  width={799}
                  height={478}
                  className='w-full h-full object-cover will-change-transform group-hover:scale-110 transition-all duration-500 ease-[cubic-bezier(0.65,0.01,0.28,0.98)]'
                  preload
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* pagination */}
        <div className='xsm:!bottom-[-1.25rem] featured-news-pagination absolute !bottom-[2rem] left-0 z-10 flex justify-center items-center gap-[0.5rem]' />
      </div>

      {/* content slider */}
      {featuredNewsData[currentSlide] && (
        <div
          key={currentSlide}
          className='xsm:w-full xsm:px-[0.875rem] xsm:pt-0 xsm:pb-[1.25rem] animate-content w-[35.0625rem] py-[1.75rem]'
        >
          <BlogContent
            blog={featuredNewsData[currentSlide]}
            baseHref={baseHref}
            variant='desktop'
          />
        </div>
      )}
    </div>
  )
}
