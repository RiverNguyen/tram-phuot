import DetailHotel from '@/modules/detail-hotel'
import hotelService from '@/services/hotel'

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

  return (
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
  )
}
