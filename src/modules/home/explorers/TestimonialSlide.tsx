import { Swiper, SwiperSlide } from 'swiper/react'
import TestimonialItem from './TestimonialItem'
import { convertRemToPx } from '@/lib/utils'

interface TestimonialSlideProps {
  testimonials: {
    avatar: string
    name: string
    date: string
    rating: number
    title: string
    description: string
  }[]
}
export default function TestimonialSlide({ testimonials }: TestimonialSlideProps) {
  return (
    <Swiper
      slidesPerView='auto'
      centeredSlides={true}
      initialSlide={2}
      loop={true}
      grabCursor={true}
      spaceBetween={convertRemToPx(1.5)}
      className='w-full h-[15.875rem] !overflow-visible relative !z-0'
    >
      {testimonials?.map((testimonial, index) => (
        <SwiperSlide
          key={index}
          className='!w-[23.75rem] !h-[15.875rem]'
        >
          <TestimonialItem testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
