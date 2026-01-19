import Banner from '@/modules/hotels/_components/Banner'
import WrapperHotelList from '@/modules/hotels/_components/WrapperHotelList'
import hotelService from '@/services/hotels'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/configs/endpoints'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.hotel.rank_math[locale as keyof typeof endpoints.hotel.rank_math],
  )
  return metadataValues(res)
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ locations?: string; 'hotel-amenities'?: string; page?: string; paged?: string }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  const locations = sp.locations || ''
  const hotelAmenities = sp['hotel-amenities'] || ''
  const page = sp.page || sp.paged || '1'

  const hotelPage = await fetchData({
    api: ENDPOINTS.hotel[locale as 'en' | 'vi'],
  })

  const [{ data: taxonomies }, hotelRes] = await Promise.all([
    hotelService.getTaxonomies(locale),
    hotelService.getHotels({ locale, locations, hotelAmenities, page, limit: 12 }),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={hotelPage?.acf}
      />

      {/* Main content */}
      <div className='relative w-full h-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-top xsm:bg-contain'>
        <WrapperHotelList
          hotelRes={hotelRes}
          taxonomies={taxonomies}
          locale={locale}
        />
      </div>
    </main>
  )
}
