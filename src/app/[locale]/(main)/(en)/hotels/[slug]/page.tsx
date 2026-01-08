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
    />
  )
}
