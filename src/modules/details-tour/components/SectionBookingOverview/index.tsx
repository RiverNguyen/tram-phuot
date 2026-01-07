'use client'
import BookingOverview from '@/modules/details-tour/components/SectionBookingOverview/BookingOverview'
import { DetailsTourPricePerPaxType, TourDurationType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'

interface SectionBookingOverviewProps {
  tourTitle: string
  tourDuration: TourDurationType
  pricePerPax: DetailsTourPricePerPaxType
}

export default function SectionBookingOverview({
  tourTitle,
  tourDuration,
  pricePerPax,
}: SectionBookingOverviewProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')

  return (
    <section className='xsm:rounded-[inherit] xsm:py-5 xsm:px-0 xsm:border-none xsm:space-y-0 w-full space-y-4.5 rounded-[1.5rem] border border-solid border-[#EDEDED] bg-white px-5.5 py-5'>
      <div className='xsm:px-5 xsm:space-y-2 xsm:mb-5 space-y-1.5'>
        <h2 className='section-title-h2 xsm:text-[1.5rem] font-phu-du w-fit pr-2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem]'>
          {translateDetailsTourPage('sectionBookingOverviewTitle')}
        </h2>
        <p className='font-montserrat text-body/75 xsm:text-body/60 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem]'>
          {tourTitle}
        </p>
      </div>
      <BookingOverview
        tourDuration={tourDuration}
        pricePerPax={pricePerPax}
      />
    </section>
  )
}
