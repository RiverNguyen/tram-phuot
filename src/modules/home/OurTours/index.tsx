'use client'
import { BrandButton, BrandTitle } from '@/components/shared'
import { IOurTourHomePage } from '@/interface/homepage.interface'
import Image from 'next/image'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import TourCard from '@/modules/tours/_components/TourCard'
import { cn, convertRemToPx } from '@/lib/utils'
import { motion } from 'motion/react'
import { ITour } from '@/interface/tour.interface'
import { IHotel } from '@/interface/hotel.interface'
import HotelCard from '@/modules/hotels/_components/HotelCard'
import { useTranslations } from 'next-intl'
import Map from './_components/Map'
import { ILocation } from '@/interface/taxonomy.interface'
import useIsMobile from '@/hooks/use-is-mobile'

export default function OurTours({
  ourTours,
  tours,
  hotels,
  locations,
}: {
  ourTours: IOurTourHomePage
  tours: ITour[]
  hotels: IHotel[]
  locations: ILocation[]
}) {
  const [tab, setTab] = useState<'stayPoints' | 'tourAndChill'>('tourAndChill')
  const t = useTranslations('HomePage.ourTours')
  const { isMobile, isLoading } = useIsMobile()

  return (
    <>
      <section className='relative h-[71.8125rem] sm:mt-[-15.875rem] xsm:h-auto xsm:mt-[-4rem] xsm:overflow-hidden w-full z-3'>
        <Image
          src='/home/our-tours/d-bg-mobile.webp'
          alt=''
          width={563}
          height={1385}
          className='absolute inset-0 object-cover z-1 sm:hidden'
        />
        <Image
          src='/home/our-tours/d-bg.svg'
          alt=''
          width={0}
          height={0}
          className='w-full h-full object-cover absolute inset-0 xsm:hidden'
        />
        <div className='absolute overflow-hidden inset-0 w-full h-[63.4375rem] xsm:hidden z-1'>
          <Image
            src='/home/our-tours/d-deco.svg'
            alt=''
            width={0}
            height={0}
            className='w-[142.1715rem] h-[342.73938rem] absolute top-1/2 left-1/2 -translate-1/2'
          />
        </div>

        <div className='relative pt-[14rem] flex sm:pl-[6.6rem] w-full xsm:pt-[4.83rem] z-10 xsm:pb-[4.04rem]'>
          {!isLoading && !isMobile && (
            <div className='relative w-[27.875rem] h-[35.04981rem] shrink-0 xsm:hidden'>
              <Map
                locations={locations}
                className='size-full xsm:hidden'
              />

              <motion.div
                initial={{
                  visibility: 'hidden',
                }}
                whileInView={{
                  scale: [0, 1],
                  opacity: [0, 1, 0],
                  visibility: 'visible',
                }}
                viewport={{ once: true, amount: 0.9 }}
                transition={{
                  duration: 1.2,
                  ease: 'linear',
                  repeat: Infinity,
                }}
                className='size-[33.25794rem] absolute bottom-[11.18rem] right-[2.16rem] z-1 rounded-full border-2 border-white/80 pointer-events-none xsm:hidden'
              ></motion.div>
            </div>
          )}

          <div className='relative min-w-0'>
            <BrandTitle
              classNameContainer='sm:absolute sm:-top-[3.02rem] sm:-left-[1.675rem] xsm:mb-[3rem] xsm:w-[19.125rem] xsm:h-[11.8125rem] xsm:mx-auto'
              title={ourTours?.text_decor}
              subtitle={ourTours?.title}
              classNameTitleContainer='xsm:left-[3.43rem] xsm:top-[-0.125rem]'
              classNameTitle='xsm:text-[2.03056rem]'
              classNameSubtitle='w-[11.875rem] xsm:left-[3.43rem] xsm:text-[3rem] xsm:top-[3.21rem]'
              variant='green'
            />
            <div className='relative z-1 sm:pt-[4.12rem] pointer-events-none'>
              <div className='pointer-events-auto w-full flex justify-end items-center sm:pr-[6.4rem] space-x-[0.56rem] xsm:px-4 mb-[1.7rem] xsm:mb-[1.5rem]'>
                <button
                  type='button'
                  onClick={() => setTab('stayPoints')}
                  className={cn(
                    'h-[2.45925rem] px-[1.875rem] flex-center space-x-[0.5625rem] rounded-[0.625rem] font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase text-[#F9EAD5] cursor-pointer xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:leading-[0.9rem]',
                    tab === 'stayPoints'
                      ? 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)]'
                      : 'border border-[#03328C] bg-white/15 ',
                  )}
                >
                  <Image
                    src='/home/our-tours/d-stay-points.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.25rem] xsm:size-4'
                  />
                  <span className='shrink-0'>{t('stayPoints')}</span>
                </button>
                <button
                  type='button'
                  onClick={() => setTab('tourAndChill')}
                  className={cn(
                    'h-[2.45925rem] px-[1.875rem] flex-center space-x-[0.5625rem] rounded-[0.625rem]  font-montserrat text-[0.875rem] font-semibold leading-[1.05rem] uppercase text-[#F9EAD5] cursor-pointer xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:leading-[0.9rem]',
                    tab === 'tourAndChill'
                      ? 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)]'
                      : 'border border-[#03328C] bg-white/15 ',
                  )}
                >
                  <Image
                    src='/home/our-tours/d-tour-chill.svg'
                    alt=''
                    width={0}
                    height={0}
                    className='size-[1.25rem] xsm:size-4'
                  />
                  <span className='shrink-0'>{t('tourAndChill')}</span>
                </button>
              </div>
              <Swiper
                slidesPerView='auto'
                grabCursor
                spaceBetween={convertRemToPx(1.12)}
                breakpoints={{
                  639: {
                    spaceBetween: convertRemToPx(0.72),
                  },
                }}
                className='pr-4! xsm:pl-4! mb-[1.25rem]! xsm:mb-[1.5rem]! pointer-events-auto!'
              >
                {tab === 'stayPoints'
                  ? Array.isArray(hotels) &&
                    hotels.map((hotel, i) => {
                      hotel.type = t('stayPoints')

                      return (
                        <SwiperSlide
                          key={i}
                          className='w-[19.125rem]! xsm:w-[15.67125rem]!'
                        >
                          <HotelCard
                            hotel={hotel}
                            className='h-[27.6875rem] xsm:h-[22.6875rem]'
                          />
                        </SwiperSlide>
                      )
                    })
                  : Array.isArray(tours) &&
                    tours.map((tour, i) => {
                      return (
                        <SwiperSlide
                          key={i}
                          className='w-[19.125rem]! xsm:w-[15.67125rem]!'
                        >
                          <TourCard
                            tour={tour}
                            className='h-[27.6875rem] xsm:h-[22.6875rem]'
                          />
                        </SwiperSlide>
                      )
                    })}
              </Swiper>
              <div className='flex items-center justify-center sm:pr-[6.4rem] sm:space-x-[1.625rem] xsm:px-4 pointer-events-auto'>
                <div className='grow bg-white/16 h-[0.0625rem] xsm:hidden'></div>
                <BrandButton
                  href={ourTours?.button?.url}
                  variant='orangeGradient'
                  classNameButtonContainer='shrink-0 xsm:w-full'
                >
                  {ourTours?.button?.title}
                </BrandButton>
                <div className='grow bg-white/16 h-[0.0625rem] xsm:hidden'></div>
              </div>
            </div>
          </div>
        </div>

        <div className='sm:absolute sm:bottom-0 sm:left-0 sm:right-0 xsm:relative w-full h-[9.2285rem] bg-[#8DB52F] xsm:h-[4.3125rem] z-4'>
          <Image
            src='/home/our-tours/d-bottom-mobile.webp'
            alt=''
            width={408}
            height={202}
            className='w-[12.75rem] h-[6.5rem] absolute bottom-0 left-0 z-1 sm:hidden'
          />
          <Image
            src='/home/our-tours/d-mountain.webp'
            alt=''
            width={593}
            height={688}
            className='absolute bottom-0 left-0 h-[28.66606rem] w-auto xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-span-1.svg'
            alt=''
            width={0}
            height={0}
            className='absolute -bottom-[1.45rem] left-[0.38rem] w-[9.40644rem] h-[6.853rem] z-3 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-span-2.svg'
            alt=''
            width={0}
            height={0}
            className='absolute bottom-[calc(100%+1rem)] left-[26.81rem] h-[5.55694rem] w-auto z-3 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-span-3.svg'
            alt=''
            width={0}
            height={0}
            className='absolute left-[40.12rem] -bottom-[1.5rem] w-[4.97038rem] h-auto z-3 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-woman.webp'
            alt=''
            width={363}
            height={472}
            className='absolute bottom-0 left-[15.52rem] h-[19.64119rem] w-auto z-2 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-kids.webp'
            alt=''
            width={478}
            height={280}
            className='absolute left-[26.66rem] bottom-0 w-auto h-[11.64944rem] z-1 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-gradient-1.svg'
            alt=''
            width={0}
            height={0}
            className='absolute left-[50.67rem] bottom-[5.82rem] w-[5.85219rem] h-[4.79713rem] xsm:hidden'
          />

          <Image
            src='/home/our-tours/d-house.webp'
            alt=''
            width={328}
            height={314}
            className='w-[13.64788rem] h-[13.05663rem] object-contain absolute bottom-0 left-[42.56rem] xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-logo.webp'
            alt=''
            width={481}
            height={130}
            className='absolute bottom-[1.59rem] left-[61.33rem] w-[20.03738rem] h-[5.38088rem] xsm:right-[0.95rem] xsm:left-auto xsm:h-[2.07294rem] xsm:w-[7.71919rem] xsm:bottom-[0.91rem]'
          />
          <Image
            src='/home/our-tours/d-bicycle.webp'
            alt=''
            width={413}
            height={280}
            className='absolute h-[11.68175rem] w-auto right-0 -bottom-[3.46rem] z-1 xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-dragon.webp'
            alt=''
            width={358}
            height={368}
            className='absolute bottom-0 right-0 h-[15.30738rem] w-auto xsm:hidden'
          />
          <Image
            src='/home/our-tours/d-gradient-2.svg'
            alt=''
            width={0}
            height={0}
            className='absolute right-[7.94rem] -top-[calc(4.0385rem+0.32rem)] w-[3.99506rem] h-[4.0385rem] z-1 xsm:hidden'
          />
        </div>
      </section>
    </>
  )
}
