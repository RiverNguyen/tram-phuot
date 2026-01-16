import endpoints from '@/configs/endpoints'
import ENV from '@/configs/env'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import BannerHomePage from '@/modules/home/banner'
import TheExplorers from '@/modules/home/explorers'
import OurStories from '@/modules/home/our-stories/OurStories'
import OurTours from '@/modules/home/our-tours'
import Overview from '@/modules/home/overview'
import homeService from '@/services/home'
import hotelService from '@/services/hotel'
import tourService from '@/services/tour'
import metadataValues from '@/utils/metadataValues'
import { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.home.rank_math[locale as keyof typeof endpoints.home.rank_math],
  )
  return metadataValues(res)
}

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const [dataHome, hotelRes, tourRes, locationRes, dataReviews, dataOurStories, dataTaxonomies] =
    await Promise.all([
      homeService.getHome(locale),
      hotelService.getHotels({ locale }),
      tourService.getTours({ locale }),
      homeService.getTaxonomy(locale, 'locations'),
      homeService.getReviews(locale),
      homeService.getOurStories(locale, 'stay-points'),
      homeService.getTaxonomies(locale, 'post'),
    ])

  return (
    <>
      <BannerHomePage
        data={dataHome?.acf}
        locations={locationRes?.data}
      />
      <Overview overview={dataHome?.acf?.overview} />
      <OurTours
        tourRes={tourRes}
        hotelRes={hotelRes}
        locations={locationRes?.data}
        ourTours={dataHome?.acf?.our_tours}
        locale={locale}
      />
      <div className='relative bg-[#FDF4ED]'>
        <div className="pointer-events-none absolute inset-0 bg-[url('/home/explorers/bg-pc.webp')] bg-[length:100%_auto] bg-top bg-repeat-y opacity-8" />
        <div className='relative'>
          <TheExplorers
            explorers={dataHome?.acf?.explorers}
            reviews={dataReviews?.data}
          />
          <OurStories
            data={dataHome?.acf?.our_stories}
            blogs={dataOurStories?.data}
            taxonomies={dataTaxonomies?.data}
          />
        </div>
      </div>
    </>
  )
}
