'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SpecialOffersCard from './SpecialOffersCard'
import { convertRemToPx } from '@/lib/utils'
import './styles.css'
import { Navigation } from 'swiper/modules'
import { ICChevron } from '@/components/icons'
import { ICoupon } from '@/interface/coupon.interface'
import { useRef, useMemo } from 'react'
import { parse } from 'date-fns'

export default function SpecialOffers({ data, text1 }: { data: ICoupon[]; text1: string }) {
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)

  // Lọc dữ liệu: loại bỏ private và kiểm tra booking_time
  const visibleData = useMemo(() => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    return data.filter((offer: ICoupon) => {
      // Loại bỏ private offers
      if (offer?.acf?.private) return false

      // Kiểm tra booking_time
      if (offer?.acf?.booking_time?.start && offer?.acf?.booking_time?.end) {
        try {
          // Parse dates từ format dd/MM/yyyy
          const startDate = parse(offer.acf.booking_time.start, 'dd/MM/yyyy', new Date())
          startDate.setHours(0, 0, 0, 0)

          const endDate = parse(offer.acf.booking_time.end, 'dd/MM/yyyy', new Date())
          endDate.setHours(23, 59, 59, 999)

          // Chỉ hiển thị nếu ngày hiện tại nằm trong khoảng booking_time
          return now >= startDate && now <= endDate
        } catch (error) {
          console.error('Error parsing booking_time dates:', error)
          // Nếu có lỗi parse thì vẫn hiển thị voucher
          return true
        }
      }

      // Nếu không có booking_time thì hiển thị voucher
      return true
    })
  }, [data])
  return (
    <div className='xsm:gap-0 flex flex-col items-start gap-[2.5rem] self-stretch'>
      <h2 className='xsm:w-full xsm:px-[1rem] xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] font-phu-du mx-auto w-full max-w-[87.5rem] text-[2.125rem] leading-[2.3375rem] font-medium text-[#2E2E2E]'>
        {text1}
      </h2>
      <div className='special-offer-swiper mx-auto w-full max-w-[99rem]'>
        <Swiper
          slidesPerView='auto'
          modules={[Navigation]}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
          }}
          grabCursor
          spaceBetween={convertRemToPx(1.25)}
          className='xsm:!hidden relative h-full w-full !px-[5.75rem] !py-[2.5rem] select-none'
        >
          {visibleData.map((offer: ICoupon) => (
            <SwiperSlide
              key={offer.id}
              className='!w-[28.33331rem]'
            >
              <SpecialOffersCard offer={offer} />
            </SwiperSlide>
          ))}
          <div className='pointer-events-none absolute top-1/2 right-[2.5rem] left-[2.5rem] z-10 flex -translate-y-1/2 items-center justify-between'>
            <div
              ref={prevRef}
              className='special-offer-prev pointer-events-auto flex size-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-[#479064] shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)] hover:opacity-90 transition-opacity duration-300'
            >
              <ICChevron className='size-[0.825rem] rotate-90 text-white' />
            </div>
            <div
              ref={nextRef}
              className='special-offer-next pointer-events-auto flex size-[2.5rem] cursor-pointer items-center justify-center rounded-full bg-[#479064] shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)] hover:opacity-90 transition-opacity duration-300'
            >
              <ICChevron className='size-[0.825rem] rotate-270 text-white' />
            </div>
          </div>
        </Swiper>
        <div className='xsm:px-[1rem] xsm:pt-[1.25rem] xsm:pb-[2.5rem] hidden_scroll flex gap-[1rem] overflow-x-auto sm:hidden'>
          {visibleData.map((offer: ICoupon) => (
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
