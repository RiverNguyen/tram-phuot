import FormBookingTour from '@/modules/details-tour/components/SectionBookingTour/FormBookingTour'
import {  TourDurationType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'

interface SectionBookingTourProps {
  tourDuration: TourDurationType
  pricePerPax: number
}

export default function SectionBookingTour({ tourDuration, pricePerPax }: SectionBookingTourProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  return (
    <section
      id='section-booking'
      className='xsm:px-4 relative w-full'
    >
      <div className='section-box xsm:px-3 xsm:py-4 xsm:rounded-[0.75rem] xsm:shadow-none space-y-5 rounded-[1.5rem] p-8'>
        <h2 className='xsm:text-[1.25rem] xsm:w-full font-phu-du xsm:pb-[0.725rem] section-title-h2 xsm:border-b xsm:border-solid xsm:border-[#EDEDED] w-fit pr-2 pb-3 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
          {translateDetailsTourPage('sectionBookingTourTitle')}
        </h2>
        <FormBookingTour
          tourDuration={tourDuration}
          pricePerPax={pricePerPax}
        />
      </div>
    </section>
  )
}
