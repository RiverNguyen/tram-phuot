<<<<<<< HEAD
import DetailsTour from '@/modules/details-tour'
import tourService from '@/services/tour'
import wordpressService from '@/services/wordpress'
import { DetailsTourApiResponseType } from '@/types/details-tour.type'
import { SiteSettingsResType } from '@/types/wordpress.type'

interface PageProps {
  params: Promise<{
    slug: string
    locale: string
  }>
}

export default async function page({ params }: PageProps) {
  const { slug, locale } = await params
  const [detailTour, siteSettings, relatedTours]: [
    DetailsTourApiResponseType,
    SiteSettingsResType,
    any,
  ] = await Promise.all([
    tourService.getDetailTour(slug, locale, 'tour'),
    wordpressService.getSiteSettings(locale, 'social'),
    tourService.getRelatedTours(slug, locale, 'tour-duration', 'tour'),
  ])

  console.log({ relatedTours })

  return (
    <DetailsTour
      detailsTourData={detailTour}
      siteSettings={siteSettings}
      relatedTours={relatedTours?.data || []}
      tourCoupons={[]}
=======
import DetailHotel from '@/modules/detail-hotel'
import hotelService from '@/services/hotel'

export default async function page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale } = await params
  let { slug } = await params
  const [detailHotel, taxonomies, coupons] = await Promise.all([
    hotelService.getDetailHotel(slug),
    hotelService.getTaxonomies(locale),
    hotelService.getCoupons(slug),
  ])

  return (
    <DetailHotel
      detailHotel={detailHotel}
      taxonomies={taxonomies?.data}
      coupons={coupons?.data}
>>>>>>> 7f1100ef9bffedf7696a2efe9ab87e64b56a6fa9
    />
  )
}
