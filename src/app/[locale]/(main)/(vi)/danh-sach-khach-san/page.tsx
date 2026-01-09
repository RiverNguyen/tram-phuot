import Banner from '@/modules/hotels/_components/Banner'
import WrapperHotelList from '@/modules/hotels/_components/WrapperHotelList'
import hotelService from '@/services/hotels'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    locations?: string
    ['hotel-amenities']?: string
    paged?: string
    checkIn?: string
    checkOut?: string
    adults?: string
    children?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])

  const hotelPage = await fetchData({
    api: ENDPOINTS.hotel[locale as 'en' | 'vi'],
  })

  const [{ data: taxonomies }, { data, totalPages }] = await Promise.all([
    hotelService.getTaxonomies(locale),
    hotelService.getHotels({
      locale,
      locations: sp.locations || '',
      hotelAmenities: sp['hotel-amenities'] || '',
      page: sp.paged || '1',
      limit: 8,
    }),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED] bg-[url("/uu-dai/bg.webp")]'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={hotelPage?.acf}
      />

      {/* Main content */}
      <WrapperHotelList
        data={data}
        totalPages={totalPages}
        taxonomies={taxonomies}
      />
    </main>
  )
}
