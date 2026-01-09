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
import TourPageSchema from '@/seo/schemas/TourPageSchema'
import { SEO_CONFIG } from '@/seo/seo.config'

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

  // Build URL for schema
  const tourUrl = `${SEO_CONFIG.siteUrl}/tours/${slug}`
  const tourData = detailTour?.data
  const tourImage =
    tourData?.acf?.banner?.background_pc?.url || tourData?.acf?.banner?.background_mobile?.url
  const tourDuration = tourData?.tour_duration?.name || tourData?.tour_duration?.slug

  return (
    <>
      <TourPageSchema
        title={tourData?.title || ''}
        url={tourUrl}
        image={tourImage}
        price={tourData?.acf?.price_person}
        description={tourData?.acf?.overview?.description}
        duration={tourDuration}
        lang={locale}
      />
      <DetailsTour
        detailsTourData={detailTour}
        siteSettings={siteSettings}
        relatedTours={relatedTours?.data || []}
        tourCoupons={tourCoupons?.data || []}
      />
    </>
  )
}
