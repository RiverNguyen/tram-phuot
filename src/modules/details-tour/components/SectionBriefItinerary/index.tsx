import ICCompass from '@/components/icons/ICCompass'
import ButtonBookNow from '@/modules/details-tour/components/SectionBriefItinerary/ButtonBookNow'
import { DetailsTourBriefItineraryType, TourDurationType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface SectionBriefItineraryProps {
  briefItinerary: DetailsTourBriefItineraryType
  fromPricePerPax: number
  tourDuration: TourDurationType
}

export default function SectionBriefItinerary({
  briefItinerary,
  fromPricePerPax,
  tourDuration,
}: SectionBriefItineraryProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  return (
    <section className='xsm:px-4 relative'>
      <div className='xsm:px-0 xsm:pt-5 xsm:pb-4 xsm:rounded-[1.08288rem] xsm:border-[0.722px] rounded-[1.5rem] border border-solid border-[#EDEDED] bg-white px-5 pt-7 pb-5.5'>
        <div className='xsm:px-3.5 xsm:mb-1 mb-3.25'>
          <h2 className='xsm:text-[1.25rem] font-phu-du section-title-h2 w-fit pr-2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
            {translateDetailsTourPage('sectionBriefItineraryTitle')}
          </h2>
        </div>
        <div className='xsm:px-3.75 xsm:mb-0 mb-4 w-full'>
          {briefItinerary?.brief_image && (
            <Image
              alt=''
              width={425}
              height={360}
              src={briefItinerary?.brief_image?.url}
              className='h-auto w-full'
            />
          )}
        </div>
        <div className='xsm:hidden flex items-center justify-between rounded-[0.75rem] bg-[#F4F4F4] px-3.5 py-3'>
          <div className='space-y-1.5'>
            <p className='flex items-center space-x-1'>
              <ICCompass className='size-4 text-[#F56E0A]' />
              <span className='font-phu-du text-[1.125rem] leading-[1.1] font-bold text-[#F56E0A]'>
                {fromPricePerPax} USD
              </span>
              <span className='font-montserrat inline-block translate-y-0.5 text-[0.75rem] leading-none font-medium tracking-[-0.0075rem] text-black/50'>
                /{translateDetailsTourPage('textPerson')}
              </span>
            </p>
            <p className='font-montserrat text-[0.75rem] leading-[1.6] font-medium tracking-[-0.0075rem] text-black'>
              {tourDuration?.name || ''}
            </p>
          </div>
          <div className='w-45 shrink-0'>
            <ButtonBookNow />
          </div>
        </div>
      </div>
    </section>
  )
}
