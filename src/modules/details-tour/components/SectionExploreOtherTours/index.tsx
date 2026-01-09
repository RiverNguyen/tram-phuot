import { BrandButton, TourCard } from '@/components/shared'
import ICDetailItinerary from '@/modules/details-tour/icons/ICDetailItinerary'
import { RelatedTourType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import { convertRemToPx } from '@/lib/utils'

interface SectionExploreOtherToursProps {
  relatedTours: RelatedTourType[]
  price?: string
  type?: 'tour' | 'hotel'
}

export default function SectionExploreOtherTours({
  relatedTours,
  price,
  type = 'tour',
}: SectionExploreOtherToursProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  return (
    <section className='xsm:pt-8 xsm:pb-20 relative'>
      <div className='mx-auto'>
        <div className='xsm:px-4 xsm:block xsm:mb-6 mb-10 flex items-end justify-between max-w-350 mx-auto'>
          <div className='xsm:h-13.5 xsm:pt-5.5 relative h-25.75 shrink-0 pt-8'>
            <span
              style={{
                WebkitTextStroke: '0.375rem',
                WebkitTextStrokeColor: '#FDF6EC',
                paintOrder: 'stroke fill',
              }}
              className='font-motherland xsm:text-[1.5rem] xsm:left-5 absolute -top-1 left-7.75 text-[2.25rem] leading-normal text-[#F56E0A]'
            >
              {translateDetailsTourPage('sectionExploreOtherTours.subtitle')}
            </span>
            <div className='flex'>
              <h2 className='font-phu-du section-title-h2 xsm:text-[2rem] xsm:pr-2.75 w-fit pr-2 text-[3rem] leading-none font-bold'>
                {translateDetailsTourPage('sectionExploreOtherTours.title')}
              </h2>
              <span className='xsm:mt-1.5 mt-3.25 inline-block shrink-0'>
                <ICDetailItinerary className='xsm:w-7.25 xsm:h-[1.79538rem] h-[1.88238rem] w-8' />
              </span>
            </div>
          </div>
          <div className='xsm:hidden shrink-0'>
            <BrandButton
              variant='transparent'
              type={{ variant: 'link', href: type === 'tour' ? '/tours' : '/hotels' }}
            >
              <span className='leading-[1.2]'>
                {translateDetailsTourPage('sectionExploreOtherTours.viewMore')}
              </span>
            </BrandButton>
          </div>
        </div>

        <div className='xsm:flex xsm:gap-x-0 xsm:mb-8 xsm:overflow-x-auto xsm:space-x-3.5 hidden_scroll relative xsm:px-4'>
          <Swiper
            modules={[Navigation]}
            slidesPerView={4}
            spaceBetween={convertRemToPx(1.25)}
            speed={800}
            className='rounded-[0.5rem] mx-[6.25rem]! xsm:hidden!'
            navigation={{
              prevEl: '.prev-related-tours',
              nextEl: '.next-related-tours',
              disabledClass: 'opacity-0 cursor-not-allowed pointer-events-none',
            }}
          >
            {Array.isArray(relatedTours) &&
              relatedTours.map((tour, index) => (
                <SwiperSlide
                  key={tour.id || index}
                  className='w-fit'
                >
                  <TourCard
                    type={type}
                    key={tour.id || index}
                    tourType={
                      tour?.tour_type?.[0]?.name ||
                      tour?.taxonomies?.['hotel-amenities']?.[0]?.name ||
                      ''
                    }
                    tourName={tour?.title || ''}
                    tourLocation={
                      tour?.locations?.[0]?.name || tour?.taxonomies?.['locations']?.[0]?.name || ''
                    }
                    tourPrice={Number(tour?.price_person || price)}
                    tourThumbnail={tour?.thumbnail}
                    tourSlug={tour?.slug || ''}
                    classNameCard='col-span-1 xsm:shrink-0 xsm:w-[15.625rem] xsm:h-[22.6205rem] xsm:first:ml-4 xsm:last:mr-4'
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className='absolute top-1/2 w-[90rem] xsm:hidden -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-between pointer-events-none xsm:hidden z-10'>
            <button
              className='prev-related-tours size-12 rounded-full bg-[#479064] text-white flex items-center justify-center shadow-lg hover:opacity-90 transition cursor-pointer pointer-events-auto'
              aria-label='Previous slide'
            >
              <ChevronLeft
                className='size-5'
                strokeWidth={2.2}
              />
            </button>
            <button
              className='next-related-tours size-12 rounded-full bg-[#479064] text-white flex items-center justify-center shadow-lg hover:opacity-90 transition cursor-pointer pointer-events-auto'
              aria-label='Next slide'
            >
              <ChevronRight
                className='size-5'
                strokeWidth={2.2}
              />
            </button>
          </div>
          {Array.isArray(relatedTours) &&
            relatedTours.map((tour, index) => (
              <TourCard
                key={tour.id || index}
                tourType={
                  tour?.tour_type?.[0]?.name ||
                  tour?.taxonomies?.['hotel-amenities']?.[0]?.name ||
                  ''
                }
                tourName={tour?.title || ''}
                tourLocation={
                  tour?.locations?.[0]?.name || tour?.taxonomies?.['locations']?.[0]?.name || ''
                }
                tourPrice={Number(tour?.price_person || price)}
                tourThumbnail={tour?.thumbnail}
                tourSlug={tour?.slug || ''}
                classNameCard='col-span-1 xsm:shrink-0 xsm:w-[15.625rem] xsm:h-[22.6205rem] xsm:first:ml-4 sm:hidden'
              />
            ))}
        </div>

        <div className='xsm:flex hidden items-center justify-center'>
          <BrandButton
            variant='transparent'
            type={{ variant: 'link', href: '/' }}
            classNameButtonContainer='w-[9.0625rem] h-[2.5rem]'
          >
            <span className='leading-[1.2]'>
              {translateDetailsTourPage('sectionExploreOtherTours.viewMore')}
            </span>
          </BrandButton>
        </div>
      </div>
    </section>
  )
}
