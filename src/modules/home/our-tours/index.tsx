'use client'
import { BrandButton, BrandTitle, TourCard } from '@/components/shared'
import { IOurTourHomePage } from '@/interface/homepage.interface'
import Image from 'next/image'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { cn, convertRemToPx } from '@/lib/utils'
import { motion } from 'motion/react'
import { ITourRes } from '@/interface/tour.interface'
import { IHotelRes } from '@/interface/hotel.interface'
import HotelCard from '@/modules/hotels/_components/HotelCard'
import { useTranslations } from 'next-intl'
import Map from './_components/Map'
import { ILocation } from '@/interface/taxonomy.interface'
import tourService from '@/services/tour'
import hotelService from '@/services/hotel'
import SkeletonTour from '@/modules/tours/_components/SkeletonTour'
import useSWR from 'swr'
import EmptyResult from '@/modules/tours/_components/EmptyResult'

const tourFetcher = ([_, locale, location]: [string, string, string]) => {
  return tourService.getTours({
    locale,
    locations: location,
  })
}

const hotelFetcher = ([_, locale, location]: [string, string, string]) => {
  return hotelService.getHotels({
    locale,
    locations: location,
  })
}

export default function OurTours({
  ourTours,
  tourRes,
  hotelRes,
  locations,
  locale,
}: {
  tourRes: ITourRes
  hotelRes: IHotelRes
  ourTours: IOurTourHomePage
  locations: ILocation[]
  locale: string
}) {
  const [location, setLocation] = useState<string>('')
  const [tab, setTab] = useState<'stayPoints' | 'tourAndChill'>('tourAndChill')
  const t = useTranslations('HomePage.ourTours')
  const {
    data: { data: tourData },
    isLoading: tourLoading,
  } = useSWR(['home-tours', locale, location], tourFetcher, {
    fallbackData: tourRes,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })
  const {
    data: { data: hotelData },
    isLoading: hotelLoading,
  } = useSWR(['home-hotels', locale, location], hotelFetcher, {
    fallbackData: hotelRes,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  const tours = tourData ?? tourRes?.data
  const hotels = hotelData ?? hotelRes?.data

  const isFetching = tourLoading || hotelLoading
  const isFilter = Boolean(location)

  const exploreMoreTour = locale === 'en' ? '/tours' : '/danh-sach-tour'
  const exploreMoreHotel = locale === 'en' ? '/hotels' : '/danh-sach-khach-san'

  const handleFilterByLocation = (slug: string) => {
    setLocation(slug)
  }

  const handleReset = () => {
    setLocation('')
  }

  return (
    <section className='xsm:h-auto xsm:mt-[-4rem] xsm:overflow-hidden relative z-3 h-[71.8125rem] w-full sm:mt-[-15.875rem]'>
      <Image
        src='/home/our-tours/d-bg-mobile.webp'
        alt=''
        fill
        className='absolute inset-0 z-1 size-full object-cover sm:hidden'
      />
      <Image
        src='/home/our-tours/d-bg.svg'
        alt=''
        width={0}
        height={0}
        className='xsm:hidden absolute inset-0 h-full w-full object-cover'
      />
      <div className='xsm:hidden absolute inset-0 z-1 h-[63.4375rem] w-full overflow-hidden'>
        <Image
          src='/home/our-tours/d-deco.svg'
          alt=''
          width={0}
          height={0}
          className='absolute top-1/2 left-1/2 h-[342.73938rem] w-[142.1715rem] -translate-1/2'
        />
      </div>

      <div className='xsm:pt-[4.83rem] xsm:pb-[4.04rem] relative z-10 flex w-full pt-[14rem] sm:pl-[6.6rem]'>
        <div className='xsm:hidden relative h-[35.04981rem] w-[27.875rem] shrink-0'>
          <Map
            locations={locations}
            onFilter={handleFilterByLocation}
            className='xsm:hidden size-full'
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
            className='xsm:hidden pointer-events-none absolute right-[2.16rem] bottom-[11.18rem] z-1 size-[33.25794rem] rounded-full border-2 border-white/80'
          ></motion.div>
        </div>

        <div className='relative min-w-0 grow'>
          <BrandTitle
            classNameContainer='sm:absolute sm:-top-[3.02rem] sm:-left-[1.675rem] xsm:mb-[3rem] xsm:w-[19.125rem] xsm:h-[11.8125rem] xsm:mx-auto'
            title={ourTours?.text_decor}
            subtitle={ourTours?.title}
            classNameTitleContainer='xsm:left-[3.43rem] xsm:top-[-0.125rem]'
            classNameTitle='xsm:text-[2.03056rem]'
            classNameSubtitle='w-[11.875rem] xsm:left-[3.43rem] xsm:text-[3rem] xsm:top-[3.21rem]'
            variant='green'
          />
          <div className='relative z-1 sm:pointer-events-none sm:pt-[4.12rem]'>
            <div className='xsm:px-4 xsm:mb-[1.5rem] pointer-events-auto mb-[1.7rem] flex w-full items-center justify-end space-x-[0.56rem] sm:pr-[6.4rem]'>
              {isFilter && (
                <button
                  type='button'
                  onClick={handleReset}
                  className='text-white cursor-pointer font-montserrat text-[0.875rem] leading-[1.4rem] tracking-[0.035rem] text-uppercase xsm:hidden'
                >
                  {t('resetAll')}
                </button>
              )}

              <button
                type='button'
                onClick={() => setTab('stayPoints')}
                className={cn(
                  'flex-center font-montserrat xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:leading-[0.9rem] h-[2.45925rem] cursor-pointer space-x-[0.5625rem] overflow-hidden rounded-[0.625rem] border border-transparent px-[1.875rem] text-[0.875rem] leading-[1.05rem] font-semibold text-[#F9EAD5] uppercase',
                  tab === 'stayPoints'
                    ? 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)]'
                    : 'border-[#00804D] bg-white/15',
                )}
              >
                <Image
                  src='/home/our-tours/d-stay-points.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='xsm:size-4 size-[1.25rem]'
                />
                <span className='shrink-0'>{t('stayPoints')}</span>
              </button>
              <button
                type='button'
                onClick={() => setTab('tourAndChill')}
                className={cn(
                  'flex-center font-montserrat xsm:w-[10.4375rem] xsm:text-[0.75rem] xsm:leading-[0.9rem] h-[2.45925rem] cursor-pointer space-x-[0.5625rem] overflow-hidden rounded-[0.625rem] border border-transparent px-[1.875rem] text-[0.875rem] leading-[1.05rem] font-semibold text-[#F9EAD5] uppercase',
                  tab === 'tourAndChill'
                    ? 'bg-[linear-gradient(44deg,#03328C_-111.22%,#00804D_80.69%)]'
                    : 'border-[#00804D] bg-white/15',
                )}
              >
                <Image
                  src='/home/our-tours/d-tour-chill.svg'
                  alt=''
                  width={0}
                  height={0}
                  className='xsm:size-4 size-[1.25rem]'
                />
                <span className='shrink-0'>{t('tourAndChill')}</span>
              </button>
            </div>

            {tab === 'tourAndChill' && (
              <>
                {Array.isArray(tours) && tours.length === 0 ? (
                  <EmptyResult
                    wrapperClassName='pointer-events-auto h-[27.6875rem] mb-[1.25rem]'
                    imgClassName='size-[14rem]'
                    textClassName='text-white text-[1.25rem]'
                  />
                ) : (
                  <Swiper
                    slidesPerView='auto'
                    touchEventsTarget='container'
                    grabCursor
                    spaceBetween={convertRemToPx(0.725)}
                    className='mb-[1.25rem]! rounded-[0.5rem] h-[27.6875rem] pr-4! pointer-events-auto! xsm:hidden!'
                  >
                    {isFetching
                      ? Array.from({ length: 8 }).map((_, i) => (
                          <SwiperSlide
                            key={i}
                            className='xsm:w-[15.67125rem]! w-[19.125rem]!'
                          >
                            <SkeletonTour className='xsm:h-[22.6875rem] h-[27.6875rem]' />
                          </SwiperSlide>
                        ))
                      : tours.map((tour, i) => (
                          <SwiperSlide
                            key={i}
                            className='xsm:w-[15.67125rem]! w-[19.125rem]!'
                          >
                            <TourCard
                              tourType={tour?.taxonomies?.['tour-type']?.[0]?.name || ''}
                              taxonomies={tour?.taxonomies?.['tour-duration'] || []}
                              tourName={tour?.title}
                              tourLocation={tour?.taxonomies?.locations?.[0]?.name || ''}
                              tourPrice={Number.parseFloat(tour?.acf?.price_person || '0') || 0}
                              tourThumbnail={tour?.thumbnail as any}
                              tourSlug={tour?.slug}
                              type='tour'
                              size='medium'
                              classNameCard='xsm:h-[22.6875rem] h-[27.6875rem]'
                            />
                          </SwiperSlide>
                        ))}
                  </Swiper>
                )}
              </>
            )}

            {tab === 'stayPoints' && (
              <>
                {Array.isArray(hotels) && hotels.length === 0 ? (
                  <EmptyResult
                    wrapperClassName='pointer-events-auto h-[27.6875rem] mb-[1.25rem]'
                    imgClassName='size-[14rem]'
                    textClassName='text-white text-[1.25rem]'
                  />
                ) : (
                  <Swiper
                    slidesPerView='auto'
                    touchEventsTarget='container'
                    grabCursor
                    spaceBetween={convertRemToPx(0.725)}
                    className='mb-[1.25rem]! rounded-[0.5rem] h-[27.6875rem] pr-4! pointer-events-auto! xsm:hidden!'
                  >
                    {isFetching
                      ? Array.from({ length: 8 }).map((_, i) => (
                          <SwiperSlide
                            key={i}
                            className='xsm:w-[15.67125rem]! w-[19.125rem]!'
                          >
                            <SkeletonTour className='xsm:h-[22.6875rem] h-[27.6875rem]' />
                          </SwiperSlide>
                        ))
                      : hotels.map((hotel, i) => {
                          hotel.type = t('stayPoints')

                          return (
                            <SwiperSlide
                              key={i}
                              className='xsm:w-[15.67125rem]! w-[19.125rem]! h-[27.6875rem]'
                            >
                              <HotelCard
                                hotel={hotel}
                                className='xsm:h-[22.6875rem] h-[27.6875rem]'
                              />
                            </SwiperSlide>
                          )
                        })}
                  </Swiper>
                )}
              </>
            )}

            {/* Mobile Slide */}
            <div
              style={{
                scrollbarWidth: 'none',
              }}
              className='mb-[1.5rem] flex space-x-[1.125rem] overflow-x-auto px-4 sm:hidden'
            >
              {tab === 'stayPoints' ? (
                Array.isArray(hotels) && hotels.length > 0 ? (
                  hotels.map((hotel, i) => {
                    hotel.type = t('stayPoints')

                    return (
                      <HotelCard
                        hotel={hotel}
                        key={i}
                        className='xsm:h-[22.6875rem] xsm:w-[15.67125rem] h-[27.6875rem] w-[19.125rem] shrink-0'
                      />
                    )
                  })
                ) : (
                  <EmptyResult
                    wrapperClassName='pointer-events-auto'
                    imgClassName='size-[14rem]'
                    textClassName='text-white text-[1.25rem]'
                  />
                )
              ) : Array.isArray(tours) && tours.length > 0 ? (
                tours.map((tour, i) => {
                  return (
                    <TourCard
                      key={i}
                      tourType={tour?.taxonomies?.['tour-type']?.[0]?.name || ''}
                      taxonomies={tour?.taxonomies?.['tour-duration'] || []}
                      tourName={tour?.title}
                      tourLocation={tour?.taxonomies?.locations?.[0]?.name || ''}
                      tourPrice={Number.parseFloat(tour?.acf?.price_person || '0') || 0}
                      tourThumbnail={tour?.thumbnail as any}
                      tourSlug={tour?.slug}
                      type='tour'
                      size='medium'
                      classNameCard='xsm:h-[22.6875rem] xsm:w-[15.67125rem] h-[27.6875rem] w-[19.125rem] shrink-0'
                    />
                  )
                })
              ) : (
                <EmptyResult
                  wrapperClassName='pointer-events-auto'
                  textClassName='text-white text-[1.25rem]'
                />
              )}
            </div>

            <div className='xsm:px-4 pointer-events-auto flex w-full items-center justify-center sm:space-x-[1.625rem] sm:pr-[6.4rem]'>
              <div className='xsm:hidden h-[0.0625rem] grow bg-white/16'></div>
              <BrandButton
                type={{
                  variant: 'link',
                  href: tab === 'stayPoints' ? exploreMoreHotel : exploreMoreTour,
                }}
                variant='orangeGradient'
                classNameButtonContainer='shrink-0 xsm:w-full'
              >
                {t('exploreMore')}
              </BrandButton>
              <div className='xsm:hidden h-[0.0625rem] grow bg-white/16'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='xsm:relative xsm:h-[4.3125rem] z-4 h-[9.2285rem] w-full bg-[#8DB52F] sm:absolute sm:right-0 sm:bottom-0 sm:left-0'>
        <Image
          src='/home/our-tours/d-bottom-mobile.webp'
          alt=''
          width={408}
          height={202}
          className='absolute bottom-0 left-0 z-1 h-[6.5rem] w-[12.75rem] sm:hidden'
        />
        <Image
          src='/home/our-tours/d-mountain.webp'
          alt=''
          width={593}
          height={688}
          className='xsm:hidden absolute bottom-0 left-0 h-[28.66606rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-span-1.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute -bottom-[1.45rem] left-[0.38rem] z-3 h-[6.853rem] w-[9.40644rem]'
        />
        <Image
          src='/home/our-tours/d-span-2.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute bottom-[calc(100%+1rem)] left-[26.81rem] z-3 h-[5.55694rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-span-3.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute -bottom-[1.5rem] left-[40.12rem] z-3 h-auto w-[4.97038rem]'
        />
        <Image
          src='/home/our-tours/d-woman.webp'
          alt=''
          width={363}
          height={472}
          className='xsm:hidden absolute bottom-0 left-[15.52rem] z-2 h-[19.64119rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-kids.webp'
          alt=''
          width={478}
          height={280}
          className='xsm:hidden absolute bottom-0 left-[26.66rem] z-1 h-[11.64944rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-gradient-1.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute bottom-[5.82rem] left-[50.67rem] h-[4.79713rem] w-[5.85219rem]'
        />

        <Image
          src='/home/our-tours/d-house.webp'
          alt=''
          width={328}
          height={314}
          className='xsm:hidden absolute bottom-0 left-[42.56rem] h-[13.05663rem] w-[13.64788rem] object-contain'
        />
        <Image
          src='/home/our-tours/d-logo.webp'
          alt=''
          width={481}
          height={130}
          className='xsm:right-[0.95rem] xsm:left-auto xsm:h-[2.07294rem] xsm:w-[7.71919rem] xsm:bottom-[0.91rem] absolute bottom-[1.59rem] left-[61.33rem] h-[5.38088rem] w-[20.03738rem]'
        />
        <Image
          src='/home/our-tours/d-bicycle.webp'
          alt=''
          width={413}
          height={280}
          className='xsm:hidden absolute right-0 -bottom-[3.46rem] z-1 h-[11.68175rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-dragon.webp'
          alt=''
          width={358}
          height={368}
          className='xsm:hidden absolute right-0 bottom-0 h-[15.30738rem] w-auto'
        />
        <Image
          src='/home/our-tours/d-gradient-2.svg'
          alt=''
          width={0}
          height={0}
          className='xsm:hidden absolute -top-[calc(4.0385rem+0.32rem)] right-[7.94rem] z-1 h-[4.0385rem] w-[3.99506rem]'
        />
      </div>
    </section>
  )
}
