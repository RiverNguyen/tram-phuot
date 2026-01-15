'use client'
import { SectionVoucher } from '@/components/shared'
import ContactForm from '@/modules/details-tour/components/ContactForm'
import FixedBookingNowMb from '@/modules/details-tour/components/FixedBookingNowMb'
import FixedCta from '@/modules/details-tour/components/FixedCta'
import SectionBanner from '@/modules/details-tour/components/SectionBanner'
import SectionBookingOverview from '@/modules/details-tour/components/SectionBookingOverview'
import SectionBookingTour from '@/modules/details-tour/components/SectionBookingTour'
import SectionBriefItinerary from '@/modules/details-tour/components/SectionBriefItinerary'
import SectionDetailItinerary from '@/modules/details-tour/components/SectionDetailItinerary'
import SectionExploreOtherTours from '@/modules/details-tour/components/SectionExploreOtherTours'
import SectionOverview from '@/modules/details-tour/components/SectionOverview'
import SectionPolicy from '@/modules/details-tour/components/SectionPolicy'
import BookingTourProvider from '@/modules/details-tour/providers/BookingTourProvider'
import {
  DetailsTourApiResponseType,
  RelatedTourType,
  TourCouponItemType,
} from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'

interface DetailsTourProps {
  detailsTourData: DetailsTourApiResponseType
  siteSettings: SiteSettingsResType
  relatedTours: RelatedTourType[]
  tourCoupons: TourCouponItemType[]
}

export default function DetailsTour({
  detailsTourData,
  siteSettings,
  relatedTours,
  tourCoupons,
}: DetailsTourProps) {
  return (
    <BookingTourProvider pricePerPax={Number(detailsTourData?.data?.acf?.price_person)}>
      <main className="xsm:bg-[url('/details-tour/background-mb.webp')] relative bg-[#FDF4ED] bg-[url('/details-tour/background-pc.webp')] bg-cover bg-fixed bg-center">
        <SectionBanner
          title={detailsTourData?.data?.title || ''}
          banner={detailsTourData?.data?.acf?.banner}
          tourDuration={detailsTourData?.data?.tour_duration || '0'}
          fromPricePerPax={Number(detailsTourData?.data?.acf?.price_person) || 0}
          transport={detailsTourData?.data?.acf?.transport || ''}
          accommodation={detailsTourData?.data?.acf?.accommodation || ''}
          pickupAndDropoff={detailsTourData?.data?.acf?.pickup_and_dropoff || ''}
        />
        <div className='xsm:pt-6.5 relative mx-auto pt-25 mb-8 flex max-w-351 items-start justify-between z-[5]'>
          <div className='xsm:w-full xsm:space-y-6 w-full max-w-222 shrink-0 space-y-8'>
            <SectionOverview
              overview={detailsTourData?.data?.acf?.overview}
              siteSettings={siteSettings}
            />
            <div className='xsm:block hidden'>
              <SectionBriefItinerary
                briefItinerary={detailsTourData?.data?.acf?.brief_itinerary || {}}
                fromPricePerPax={Number(detailsTourData?.data?.acf?.price_person) || 0}
                tourDuration={detailsTourData?.data?.tour_duration || {}}
              />
            </div>
            <SectionDetailItinerary
              detailItinerary={detailsTourData?.data?.acf?.detail_itinerary}
            />
          </div>
          <div className='xsm:hidden sticky top-22 w-full max-w-120 shrink-0'>
            <SectionBriefItinerary
              briefItinerary={detailsTourData?.data?.acf?.brief_itinerary || {}}
              fromPricePerPax={Number(detailsTourData?.data?.acf?.price_person) || 0}
              tourDuration={detailsTourData?.data?.tour_duration || {}}
            />
          </div>
        </div>

        <div className='xsm:mb-6 relative mx-auto mb-27 flex max-w-351 items-start justify-between'>
          <div className='xsm:w-full xsm:space-y-6 w-full max-w-222 shrink-0 space-y-8'>
            <SectionBookingTour
              tourDuration={detailsTourData?.data?.tour_duration}
              pricePerPax={Number(detailsTourData?.data?.acf?.price_person) || 0}
            />
            <SectionVoucher tourCoupons={tourCoupons || []} />
            <SectionPolicy policy={detailsTourData?.data?.acf?.policy || {}} />
          </div>
          <div className='xsm:hidden sticky top-22 w-full max-w-120 shrink-0'>
            <SectionBookingOverview
              tourTitle={detailsTourData?.data?.title || ''}
              tourDuration={detailsTourData?.data?.tour_duration || {}}
              pricePerPax={Number(detailsTourData?.data?.acf?.price_person) || 0}
            />
          </div>
        </div>

        <SectionExploreOtherTours relatedTours={relatedTours} />

        <FixedCta />
        <FixedBookingNowMb
          tourTitle={detailsTourData?.data?.title || ''}
          tourDuration={detailsTourData?.data?.tour_duration}
          pricePerPax={Number(detailsTourData?.data?.acf?.price_person)}
        />
        <ContactForm pricePerPax={Number(detailsTourData?.data?.acf?.price_person)} />
      </main>
    </BookingTourProvider>
  )
}
