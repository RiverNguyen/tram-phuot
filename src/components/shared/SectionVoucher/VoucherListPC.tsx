'use client'

import { Pagination, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { convertRemToPx } from '@/lib/utils'
import { TourCouponItemType } from '@/types/details-tour.type'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import VoucherItem from '@/components/shared/SectionVoucher/VoucherItem'
import useIsMobile from '@/hooks/useIsMobile'

interface VoucherListPCProps {
  tourCoupons: TourCouponItemType[]
}

export default function VoucherListPC({ tourCoupons }: VoucherListPCProps) {
  const isMobile = useIsMobile()
  const nextSlideBtnRef = useRef<HTMLButtonElement>(null)
  const prevSlideBtnRef = useRef<HTMLButtonElement>(null)
  const paginationRef = useRef<HTMLDivElement>(null)
  const [swiper, setSwiper] = useState<SwiperType | null>(null)

  // Update navigation and pagination after swiper and refs are ready
  useEffect(() => {
    if (swiper && prevSlideBtnRef.current && nextSlideBtnRef.current) {
      swiper.params.navigation = {
        ...(typeof swiper.params.navigation === 'object' ? swiper.params.navigation : {}),
        prevEl: prevSlideBtnRef.current,
        nextEl: nextSlideBtnRef.current,
      }

      swiper.navigation?.destroy()
      swiper.navigation?.init()
      swiper.navigation?.update()
    }

    if (swiper && paginationRef.current) {
      swiper.params.pagination = {
        ...(typeof swiper.params.pagination === 'object' ? swiper.params.pagination : {}),
        el: paginationRef.current,
        clickable: true,
      }

      swiper.pagination?.destroy()
      swiper.pagination?.init()
      swiper.pagination?.render()
      swiper.pagination?.update()
    }
  }, [swiper])

  if (isMobile) return null

  return (
    <div className='xsm:hidden relative w-full'>
      <button
        ref={prevSlideBtnRef}
        className='flex-center shadow-booking-now-mb absolute top-26 left-2 z-5 size-8 cursor-pointer rounded-full bg-[#479064] text-white disabled:cursor-not-allowed disabled:bg-white disabled:text-[#479064]'
      >
        <ICArrowLeft className='size-[1.05263rem]' />
      </button>
      <button
        ref={nextSlideBtnRef}
        className='flex-center shadow-booking-now-mb absolute top-26 right-2 z-5 size-8 cursor-pointer rounded-full bg-[#479064] text-white disabled:cursor-not-allowed disabled:bg-white disabled:text-[#479064]'
      >
        <ICArrowLeft className='size-[1.05263rem] rotate-180' />
      </button>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={2}
        spaceBetween={convertRemToPx(1) || 16}
        modules={[Pagination, Navigation]}
        grabCursor={true}
        speed={800}
        className='relative w-full px-8! pt-9! pb-[4.4rem]!'
      >
        {tourCoupons?.map((item, index) => (
          <SwiperSlide key={index}>
            <VoucherItem
              couponTitle={item?.title}
              couponType={item?.type}
              couponApplyStartDate={item?.time_goes?.start}
              couponApplyEndDate={item?.time_goes?.end}
              couponCode={item?.code}
              couponLocation={item?.locations?.[0]?.name}
              couponDiscountPercent={item?.percent_sale}
              couponDiscountPrice={item?.price_discount}
              couponMinPrice={item?.minimum_total_price}
              couponForWhom={item?.for_whom}
              minimumNumberOfNights={item?.minimum_number_of_nights || 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={paginationRef}
        className='voucher-pagination swiper-pagination'
      ></div>
    </div>
  )
}

function ICArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={17}
      height={17}
      viewBox='0 0 17 17'
      fill='none'
      {...props}
    >
      <path
        d='M10.5882 2.86304L6.01276 7.43847C5.47241 7.97883 5.47241 8.86304 6.01276 9.40339L10.5882 13.9788'
        stroke='currentColor'
        strokeWidth='1.26316'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
