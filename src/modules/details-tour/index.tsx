import SectionBanner from '@/modules/details-tour/components/SectionBanner'
import SectionOverview from '@/modules/details-tour/components/SectionOverview'
import { DetailsTourApiResponseType } from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'

interface DetailsTourProps {
  detailsTourData: DetailsTourApiResponseType
  siteSettings: SiteSettingsResType
}

export default function DetailsTour({ detailsTourData, siteSettings }: DetailsTourProps) {
  return (
    <main className="xsm:bg-[url('/details-tour/background-mb.webp')] relative bg-[#FDF4ED] bg-[url('/details-tour/background-pc.webp')] bg-cover bg-fixed bg-center bg-no-repeat">
      <SectionBanner
        title={detailsTourData?.data?.title || ''}
        banner={detailsTourData?.data?.acf?.banner}
        tourDuration={detailsTourData?.data?.tour_duration || '0'}
        pricePerPax={detailsTourData?.data?.acf?.price_per_pax || '0'}
        transport={detailsTourData?.data?.acf?.transport || ''}
        accommodation={detailsTourData?.data?.acf?.accommodation || ''}
        pickupAndDropoff={detailsTourData?.data?.acf?.pickup_and_dropoff || ''}
      />
      <div className='xsm:pt-6.5 relative mx-auto flex max-w-351 justify-between pt-25'>
        <div className='xsm:w-full w-full max-w-222 shrink-0'>
          <SectionOverview
            overview={detailsTourData?.data?.acf?.overview}
            siteSettings={siteSettings}
          />
        </div>
        <div className='xsm:hidden w-full max-w-140.25 shrink-0'></div>
      </div>
    </main>
  )
}
