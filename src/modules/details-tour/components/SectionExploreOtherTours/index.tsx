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
import { IHotel } from '@/interface/hotel.interface'
import { WPImage, WPTaxonomy } from '@/types/acf-wordpress.type'

interface SectionExploreOtherToursProps {
  relatedTours: RelatedTourType[] | IHotel[]
  type?: 'tour' | 'hotel'
}

export default function SectionExploreOtherTours({
  relatedTours,
  type = 'tour',
}: SectionExploreOtherToursProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  const t = useTranslations('DetailHotelPage')

  // Type guard to check if item is RelatedTourType
  const isRelatedTourType = (item: RelatedTourType | IHotel): item is RelatedTourType => {
    return 'tour_type' in item
  }

  // Helper function to get tour type
  const getTourType = (item: RelatedTourType | IHotel): string => {
    if (isRelatedTourType(item)) {
      return item.tour_type?.[0]?.name || ''
    } else {
      return item.taxonomies?.['hotel-amenities']?.[0]?.name || ''
    }
  }

  // Helper function to get location
  const getLocation = (item: RelatedTourType | IHotel): string => {
    if (isRelatedTourType(item)) {
      return item.locations?.[0]?.name || item.taxonomies?.['locations']?.[0]?.name || ''
    } else {
      return item.taxonomies?.['locations']?.[0]?.name || ''
    }
  }

  // Helper function to get price
  const getPrice = (item: RelatedTourType | IHotel): number => {
    if (isRelatedTourType(item)) {
      return Number(item.price_person || 0)
    } else {
      const price =
        typeof item.acf?.banner?.price_person === 'number'
          ? item.acf.banner.price_person
          : typeof item.acf?.banner?.price_person === 'string'
            ? Number(item.acf.banner.price_person) || 0
            : typeof item.acf?.price_person === 'number'
              ? item.acf.price_person
              : typeof item.acf?.price_person === 'string'
                ? Number(item.acf.price_person) || 0
                : 0
      return price
    }
  }

  // Helper function to get thumbnail
  const getThumbnail = (item: RelatedTourType | IHotel): WPImage => {
    if (isRelatedTourType(item)) {
      return item.thumbnail
    } else {
      // Convert IHotel thumbnail to WPImage format
      return {
        id: item.thumbnail.id,
        url: item.thumbnail.url,
        alt: item.title || '',
      }
    }
  }

  // Helper function to get rating
  const getRating = (item: RelatedTourType | IHotel): number | undefined => {
    if (isRelatedTourType(item)) {
      // Tours don't have rating
      return undefined
    } else {
      // Hotels have rating in acf.banner.review.rating
      const rating = item.acf?.banner?.review?.rating
      if (rating) {
        return typeof rating === 'string' ? parseFloat(rating) : rating
      }
      return undefined
    }
  }

  // Helper function to get taxonomies as WPTaxonomy[]
  const getTaxonomies = (item: RelatedTourType | IHotel): WPTaxonomy[] => {
    if (isRelatedTourType(item)) {
      // For tours, taxonomies is Record<string, WPTaxonomy[]>
      // Return all taxonomies flattened or empty array
      if (item.taxonomies) {
        return Object.values(item.taxonomies).flat()
      }
      return []
    } else {
      // For hotels, convert ITerm[] to WPTaxonomy[]
      const hotelAmenities = item.taxonomies?.['hotel-amenities'] || []
      return hotelAmenities.map((term) => ({
        id: term.id,
        name: term.name,
        slug: term.slug,
      }))
    }
  }

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
                {type === 'tour'
                  ? translateDetailsTourPage('sectionExploreOtherTours.title')
                  : t('textExploreOtherHotels')}
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
            slidesPerView={type === 'tour' ? 4 : 3}
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
                    taxonomies={getTaxonomies(tour)}
                    type={type}
                    key={tour.id || index}
                    tourType={getTourType(tour)}
                    tourName={tour?.title || ''}
                    tourLocation={getLocation(tour)}
                    tourPrice={getPrice(tour)}
                    tourThumbnail={getThumbnail(tour)}
                    tourSlug={tour?.slug || ''}
                    rating={getRating(tour)}
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
                taxonomies={getTaxonomies(tour)}
                key={tour.id || index}
                tourType={getTourType(tour)}
                tourName={tour?.title || ''}
                tourLocation={getLocation(tour)}
                tourPrice={getPrice(tour)}
                tourThumbnail={getThumbnail(tour)}
                tourSlug={tour?.slug || ''}
                rating={getRating(tour)}
                type={type}
                classNameCard='col-span-1 xsm:shrink-0 xsm:w-[15.625rem] xsm:h-[22.6205rem] xsm:first:ml-4 sm:hidden'
              />
            ))}
        </div>

        <div className='xsm:flex hidden items-center justify-center'>
          <BrandButton
            variant='transparent'
            type={{ variant: 'link', href: type === 'tour' ? '/tours' : '/hotels' }}
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
