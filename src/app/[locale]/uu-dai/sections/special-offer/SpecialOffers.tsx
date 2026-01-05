'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import SpecialOffersCard from './SpecialOffersCard'
import { convertRemToPx } from '@/lib/utils'
import './styles.css'
import { Navigation } from 'swiper/modules'
import NavigateButton from '@/components/shared/NavigateButton'
import { ICChevron } from '@/components/icons'

const SPECIAL_OFFERS = [
  {
    id: 1,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 20,
    code: 'ABCD12345',
  },
  {
    id: 2,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 5,
    code: 'ABCD12345',
  },
  {
    id: 3,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 10,
    code: 'ABCD12345',
  },
  {
    id: 4,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 15,
    code: 'ABCD12345',
  },
  {
    id: 5,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 15,
    code: 'ABCD12345',
  },
  {
    id: 6,
    location: 'Ha Noi',
    title: 'Giảm giá đặt phòng',
    applyDate: '24/12/2025',
    benefit: 'Dành cho chủ thẻ Vietcombank',
    discountPercent: 15,
    code: 'ABCD12345',
  },
]

export default function SpecialOffers() {
  return (
    <div className='xsm:gap-[1.25rem] flex flex-col items-start gap-[2.5rem] self-stretch'>
      <h2 className='xsm:w-full xsm:text-[1.25rem] xsm:leading-[1.5rem] xsm:tracking-[0.025rem] w-full max-w-[87.5rem] mx-auto text-[#2E2E2E] font-phu-du text-[2.125rem] font-medium leading-[2.3375rem]'>
        Special offer just for you!
      </h2>
      <div className='special-offer-swiper w-full max-w-[100rem] mx-auto'>
        <Swiper
          slidesPerView={3}
          modules={[Navigation]}
          navigation={{
            nextEl: '.special-offer-swiper-next',
            prevEl: '.special-offer-swiper-prev',
          }}
          grabCursor
          spaceBetween={convertRemToPx(1.25)}
          className='xsm:!hidden w-full h-full !px-[6.25rem] !py-[2.5rem] relative'
        >
          {SPECIAL_OFFERS.map((offer) => (
            <SwiperSlide key={offer.id}>
              <SpecialOffersCard offer={offer} />
            </SwiperSlide>
          ))}
          <div className='z-10 absolute top-1/2 -translate-y-1/2 left-[3rem] right-[3rem] flex justify-between items-center'>
            <div className='special-offer-swiper-prev p-[0.47369rem] rounded-full bg-white shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)]'>
              <ICChevron className='text-[#A1A1A1] rotate-90' />
            </div>
            <div className='special-offer-swiper-next p-[0.47369rem] rounded-full bg-[#479064] shadow-[113px_188px_61px_0_rgba(87,87,87,0.00),73px_120px_56px_0_rgba(87,87,87,0.01),41px_68px_47px_0_rgba(87,87,87,0.05),18px_30px_35px_0_rgba(87,87,87,0.09),5px_8px_19px_0_rgba(87,87,87,0.10)]'></div>
          </div>
        </Swiper>
        <div className='sm:hidden grid grid-cols-1 gap-[1.25rem]'>
          {SPECIAL_OFFERS.map((offer) => (
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
