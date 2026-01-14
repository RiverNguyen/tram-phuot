import Banner from '@/modules/tours/_components/Banner'
import queryString from 'query-string'
import WrapperTourList from '@/modules/tours/_components/WrapperTourList'
import tourService from '@/services/tour'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/configs/endpoints'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.tour.rank_math[locale as keyof typeof endpoints.tour.rank_math],
  )
  return metadataValues(res)
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])

  const currSearchParams = await searchParams
  // Tạo query string từ searchParams
  const queryStr = queryString.stringify(currSearchParams, {
    arrayFormat: 'comma',
    skipNull: true,
    skipEmptyString: true,
  })

  const tourPage = await fetchData({
    api: ENDPOINTS.tour[locale as 'en' | 'vi'],
  })

  const [{ data: taxonomies }, { data, totalPages }] = await Promise.all([
    tourService.getTaxonomies(locale),
    tourService.getTours({
      locale,
      ...currSearchParams,
    }),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED] bg-[url("/uu-dai/bg.webp")] overflow-hidden'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={tourPage?.acf}
      />

      {/* Main content */}
      {/* <WrapperTourList
        data={data}
        totalPages={totalPages}
        taxonomies={taxonomies}
      /> */}
    </main>
  )
}
