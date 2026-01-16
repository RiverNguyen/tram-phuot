import Banner from '@/modules/tours/_components/Banner'
import WrapperTourList from '@/modules/tours/_components/WrapperTourList'
import tourService from '@/services/tour'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.tour.rank_math[locale as keyof typeof endpoints.tour.rank_math],
  )
  return metadataValues(res)
}
export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const tourPage = await fetchData({
    api: ENDPOINTS.tour[locale as 'en' | 'vi'],
  })

  const [{ data: taxonomies }, tourRes] = await Promise.all([
    tourService.getTaxonomies(locale),
    tourService.getTours({
      locale,
      limit: 12,
    }),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED] bg-[url("/uu-dai/bg.webp")]'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={tourPage?.acf}
      />

      {/* Main content */}
      <WrapperTourList
        tourRes={tourRes}
        taxonomies={taxonomies}
        locale={locale}
      />
    </main>
  )
}
