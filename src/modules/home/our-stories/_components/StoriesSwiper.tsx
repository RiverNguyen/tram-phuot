import { IOurStoriesData } from '@/interface/homepage.interface'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Swiper as SwiperType } from 'swiper'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import StoriesCard from './StoriesCard'
import StoriesCardSkeleton from './StoriesCardSkeleton'
import { convertRemToPx } from '@/lib/utils'

import 'swiper/css'
import 'swiper/css/navigation'

interface StoriesSwiperProps {
  isLoading: boolean
  storiesData?: IOurStoriesData[]
  blogs?: IOurStoriesData[]
  onSwiper?: (swiper: SwiperType) => void
}

const StoriesSwiper = ({ isLoading, storiesData, blogs, onSwiper }: StoriesSwiperProps) => {
  if (isLoading) {
    return (
      <div className='relative flex space-x-5.5 xsm:space-x-[1.125rem] xsm:px-4 xsm:overflow-hidden'>
        {[...Array(3)].map((_, index) => (
          <StoriesCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  const stories = storiesData && storiesData.length > 0 ? storiesData : blogs

  if (!stories || stories.length === 0) {
    return (
      <div className='text-center text-[#1F4D37] font-phu-du text-[1.5rem]'>No stories found</div>
    )
  }

  return (
    <div className='relative'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={convertRemToPx(1.375) || 22}
        slidesPerView={3}
        onSwiper={(swiper) => {
          if (onSwiper) onSwiper(swiper)
        }}
        className='pb-0! xsm:hidden!'
        speed={800}
        navigation={{
          prevEl: '.prev-stories',
          nextEl: '.next-stories',
          disabledClass: 'opacity-0 cursor-not-allowed pointer-events-none',
        }}
      >
        {stories.map((story: IOurStoriesData, index: number) => (
          <SwiperSlide key={story.slug || index}>
            <StoriesCard story={story} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute-center w-380 flex items-center justify-between pointer-events-none xsm:hidden'>
        <button className='prev-stories size-12 rounded-full bg-[#4E9666] text-white flex items-center justify-center shadow-lg hover:opacity-90 transition cursor-pointer pointer-events-auto'>
          <ChevronLeft
            className='size-5'
            strokeWidth={2.2}
          />
        </button>
        <button className='next-stories size-12 rounded-full bg-[#4E9666] text-white flex items-center justify-center shadow-lg hover:opacity-90 transition cursor-pointer pointer-events-auto'>
          <ChevronRight
            className='size-5'
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className='flex overflow-auto sm:hidden space-x-[1.125rem] px-4 hidden_scroll'>
        {stories.map((story: IOurStoriesData, index: number) => (
          <StoriesCard
            key={story.slug || index}
            story={story}
          />
        ))}
      </div>
    </div>
  )
}

export default StoriesSwiper
