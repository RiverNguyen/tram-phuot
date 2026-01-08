import BannerHomePage from '@/modules/home/banner'
import TheExplorers from '@/modules/home/explorers'
import OurStories from '@/modules/home/our-stories/OurStories'
import OurTours from '@/modules/home/our-tours'
import Overview from '@/modules/home/overview'
import homeService from '@/services/home'
import tourService from '@/services/tour'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const [dataHome, hotelRes, tourRes, locationRes, dataReviews, dataOurStories, dataTaxonomies] =
    await Promise.all([
      homeService.getHome(locale),
      homeService.getHotels(locale),
      tourService.getTours({ locale }),
      homeService.getTaxonomy(locale, 'locations'),
      homeService.getReviews(locale),
      homeService.getOurStories(locale, 'stay-points'),
      homeService.getTaxonomies(locale, 'post'),
    ])

  return (
    <>
      <BannerHomePage data={dataHome?.acf} />
      <Overview overview={dataHome?.acf?.overview} />
      <OurTours
        tours={tourRes?.data}
        hotels={hotelRes?.data}
        locations={locationRes?.data}
        ourTours={dataHome?.acf?.our_tours}
      />
      <div className='relative bg-[#FDF4ED]'>
        <div className="pointer-events-none absolute inset-0 bg-[url('/home/explorers/bg-pc.webp')] bg-[length:100%_auto] bg-top bg-repeat-y opacity-5" />
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
