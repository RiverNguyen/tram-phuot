import DetailsTour from '@/modules/details-tour'
import tourService from '@/services/tour'
import wordpressService from '@/services/wordpress'
import {
  DetailsTourApiResponseType,
  DetailsTourRelatedToursResType,
  TourCouponsResType,
} from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/configs/endpoints'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const res = await getMetaDataRankMath(
    endpoints.tour.rank_math_detail[locale as keyof typeof endpoints.tour.rank_math_detail](slug),
  )
  return metadataValues(res)
}
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
