'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SpecialOffersCard from './SpecialOffersCard'
import { convertRemToPx } from '@/lib/utils'
import './styles.css'
import { Navigation } from 'swiper/modules'
import { ICChevron } from '@/components/icons'
import { CouponItem } from '@/types/coupon.type'
import { useRef } from 'react'

export default function SpecialOffers({ data }: { data: CouponItem[] }) {
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)
  return (
    <div className='xsm:gap-0 flex flex-col items-start gap-[2.5rem] self-stretch'>
      <h2 className='xsm:w-full xsm:px-[1rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] w-full max-w-[87.5rem] mx-auto text-[#2E2E2E] font-phu-du text-[2.125rem] font-medium leading-[2.3375rem]'>
        Special offer just for you!
      </h2>
      <div className='special-offer-swiper w-full max-w-[99rem] mx-auto'>
        <Swiper
          slidesPerView={3}
          modules={[Navigation]}
          navigation
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
          }}
          grabCursor
          spaceBetween={convertRemToPx(1.25)}
          className='xsm:!hidden w-full h-full !px-[5.75rem] !py-[2.5rem] relative select-none'
        >
          {data
            .filter((offer: CouponItem) => !offer.acf.private)
            .map((offer: CouponItem) => (
              <SwiperSlide key={offer.id} className='!w-[28.33331rem]'>
                <SpecialOffersCard offer={offer} />
              </SwiperSlide>
            ))}
          <div className='z-10 absolute top-1/2 -translate-y-1/2 left-[2.5rem] right-[2.5rem] flex justify-between items-center pointer-events-none'>
            <div ref={prevRef} className='special-offer-prev size-[2.5rem] flex items-center justify-center rounded-full bg-[#479064] shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)] pointer-events-auto cursor-pointer'>
              <ICChevron className='size-[0.825rem] text-white rotate-90' />
            </div>
            <div ref={nextRef} className='special-offer-next size-[2.5rem] flex items-center justify-center rounded-full bg-[#479064] shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)] pointer-events-auto cursor-pointer'>
              <ICChevron className='size-[0.825rem] text-white rotate-270' />
            </div>
          </div>
        </Swiper>
        <div className='sm:hidden xsm:px-[1rem] xsm:pt-[1.25rem] xsm:pb-[2.5rem] flex gap-[1rem] overflow-x-auto hidden_scroll'>
          {data
            .filter((offer: CouponItem) => !offer.acf.private)
            .map((offer: CouponItem) => (
              <SpecialOffersCard
                key={offer.id}
                offer={offer}
              />
            ))}
        </div>
      </div>
    </div>
  )
}
