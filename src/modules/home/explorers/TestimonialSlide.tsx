import Marquee from '@/components/ui/marquee'
import TestimonialItem from './TestimonialItem'
import { IReview } from '@/interface/homepage.interface'

interface TestimonialSlideProps {
  testimonials: IReview[]
}
export default function TestimonialSlide({ testimonials }: TestimonialSlideProps) {
  return (
    <Marquee
      className='w-full'
      baseVelocity={12}
      repeat={4}
      draggable={false}
      slowDownFactor={0.1}
      slowdownOnHover
      direction='left'
    >
      {testimonials?.map((review, index) => (
        <TestimonialItem
          key={index}
          review={review}
        />
      ))}
    </Marquee>
  )
}
