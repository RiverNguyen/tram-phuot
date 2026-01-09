import DetailHotel from '@/modules/detail-hotel'
import hotelService from '@/services/hotel'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/configs/endpoints'
import HotelPageSchema from '@/seo/schemas/HotelPageSchema'
import { SEO_CONFIG } from '@/seo/seo.config'

export const dynamic = 'force-dynamic'
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
    endpoints.hotel.rank_math_detail[locale as keyof typeof endpoints.hotel.rank_math_detail](slug),
  )
  return metadataValues(res)
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{
    checkIn?: string
    checkOut?: string
    adults?: string
    children?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  let { slug } = await params
  const [detailHotel, taxonomies, coupons, relatedHotels] = await Promise.all([
    hotelService.getDetailHotel(slug),
    hotelService.getTaxonomies(locale),
    hotelService.getCoupons(slug),
    hotelService.getHotels({ locale, limit: 8 }),
  ])

  // Build URL for schema
  const hotelUrl = `${SEO_CONFIG.siteUrl}/hotels/${slug}`
  const hotelImages = detailHotel?.acf?.banner?.gallery || []
  const hotelImage = hotelImages.length > 0 ? hotelImages : detailHotel?.thumbnail

  return (
    <>
      <HotelPageSchema
        title={detailHotel?.title || ''}
        url={hotelUrl}
        image={hotelImage}
        address={detailHotel?.acf?.banner?.address}
        description={detailHotel?.acf?.overview?.content}
        rating={detailHotel?.acf?.banner?.review?.rating}
        lang={locale}
      />
      <DetailHotel
        detailHotel={detailHotel}
        taxonomies={taxonomies?.data}
        coupons={coupons?.data}
        initialCheckIn={sp.checkIn}
        initialCheckOut={sp.checkOut}
        initialAdults={sp.adults}
        initialChildren={sp.children}
        relatedHotels={relatedHotels?.data || []}
      />
    </>
  )
}
