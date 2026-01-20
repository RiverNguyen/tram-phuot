'use client'

import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/parallax'
import { Autoplay, Pagination, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import useIsMobile from '@/hooks/use-is-mobile'

interface BannerSliderProps {
  gallery: Array<{ url: string; alt: string }>
  galleryMobile: Array<{ url: string; alt: string }>
}

const BannerSlider = ({ gallery, galleryMobile }: BannerSliderProps) => {
  const isMobile = useIsMobile()

  return (
    <Swiper
      slidesPerView={1}
      modules={[Parallax, Autoplay, Pagination]}
      speed={1500}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
        el: '.banner-pagination',
        bulletClass: 'banner-pagination-bullet',
        bulletActiveClass: 'banner-pagination-bullet-active',
      }}
      parallax={true}
      className='w-full h-full'
      grabCursor={true}
    >
      {Array.isArray(isMobile ? galleryMobile : gallery) &&
        (isMobile ? galleryMobile : gallery).map((item, index) => (
          <SwiperSlide
            key={index}
            className='relative overflow-hidden'
          >
            <div
              className='size-full overflow-hidden absolute top-0 left-0'
              data-swiper-parallax='50%'
            >
              <Image
                width={1920}
                height={1080}
                src={item.url}
                alt={item.alt}
                className='w-full h-full object-cover'
                loading={index === 0 ? undefined : 'lazy'}
                preload={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  )
}

export default BannerSlider
