import { BrandButton, TourCard } from '@/components/shared'
import ICDetailItinerary from '@/modules/details-tour/icons/ICDetailItinerary'
import { RelatedTourType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'

interface SectionExploreOtherToursProps {
  relatedTours: RelatedTourType[]
}

export default function SectionExploreOtherTours({ relatedTours }: SectionExploreOtherToursProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  return (
    <section className='xsm:pt-8 xsm:pb-20 relative'>
      <div className='mx-auto max-w-350'>
        <div className='xsm:px-4 xsm:block xsm:mb-6 mb-10 flex items-end justify-between'>
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
              type={{ variant: 'link', href: '/' }}
            >
              <span className='leading-[1.2]'>
                {translateDetailsTourPage('sectionExploreOtherTours.viewMore')}
              </span>
            </BrandButton>
          </div>
        </div>

        <div className='xsm:flex xsm:gap-x-0 xsm:mb-8 xsm:overflow-x-auto xsm:space-x-3.5 hidden_scroll grid grid-cols-4 gap-x-4.5'>
          {Array.isArray(relatedTours) &&
            relatedTours.map((tour) => (
              <TourCard
                key={tour.id}
                tourType={tour?.tour_type[0]?.name}
                tourName={tour?.title}
                tourLocation={tour?.locations[0]?.name}
                tourPrice={Number(tour?.price_person || 0)}
                tourThumbnail={tour?.thumbnail}
                tourSlug={tour?.slug}
                classNameCard='col-span-1 xsm:shrink-0 xsm:w-[15.625rem] xsm:h-[22.6205rem] xsm:first:ml-4 xsm:last:mr-4'
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
