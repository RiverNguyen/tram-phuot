import DetailHotel from '@/modules/detail-hotel'
import hotelService from '@/services/hotel'

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
  let { slug } = await params
  const detailHotel = await hotelService.getDetailHotel(slug)

  return <DetailHotel detailHotel={detailHotel} />
}
