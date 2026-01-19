import Banner from '@/modules/tours/_components/Banner'
import WrapperTourList from '@/modules/tours/_components/WrapperTourList'
import tourService from '@/services/tour'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import endpoints from '@/configs/endpoints'
import { Metadata } from 'next'
import { headers } from 'next/headers'

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return [{ locale: 'en' }]
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

  // Detect mobile on server side
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') || ''
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|windows phone|mobile/i.test(userAgent)
  const limit = isMobile ? 10 : 12

  const tourPage = await fetchData({
    api: ENDPOINTS.tour[locale as 'en' | 'vi'],
  })

  const [{ data: taxonomies }, tourRes] = await Promise.all([
    tourService.getTaxonomies(locale),
    tourService.getTours({ locale, limit }),
  ])

  return (
    <main className='relative w-full h-full bg-[#FDF4ED]'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={tourPage?.acf}
      />

      {/* Main content */}

      <div className='relative w-full h-full bg-[url("/uu-dai/bg.webp")] bg-cover bg-top xsm:bg-contain'>
        <WrapperTourList
          tourRes={tourRes}
          taxonomies={taxonomies}
          locale={locale}
          limit={limit}
        />
      </div>
    </main>
  )
}
