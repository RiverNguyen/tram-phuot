import DetailsTour from '@/modules/details-tour'
import tourService from '@/services/tour'
import wordpressService from '@/services/wordpress'
import {
  DetailsTourApiResponseType,
  DetailsTourRelatedToursResType,
  TourCouponsResType,
} from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export default async function page({ params }: PageProps) {
  const { slug, locale } = await params
  const [detailTour, siteSettings, relatedTours, tourCoupons]: [
    DetailsTourApiResponseType,
    SiteSettingsResType,
    DetailsTourRelatedToursResType,
    TourCouponsResType,
  ] = await Promise.all([
    tourService.getDetailTour(slug, locale, 'tour'),
    wordpressService.getSiteSettings(locale, 'social'),
    tourService.getRelatedTours(slug, locale, 'tour-duration', 'tour'),
    tourService.getTourCoupons(slug, locale, 'tour'),
  ])

  return (
    <DetailsTour
      detailsTourData={detailTour}
      siteSettings={siteSettings}
      relatedTours={relatedTours?.data || []}
      tourCoupons={tourCoupons?.data || []}
    />
  )
}
