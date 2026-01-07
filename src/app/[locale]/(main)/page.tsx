import BannerHomePage from '@/modules/home/Banner'
import OurTours from '@/modules/home/OurTours'
import Overview from '@/modules/home/Overview'
import homeService from '@/services/home'
import hotelService from '@/services/hotel'
import taxonomyService from '@/services/taxonomy'
import tourService from '@/services/tour'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  const [dataHome, hotelRes, tourRes, locationRes] = await Promise.all([
    homeService.getHome(locale),
    hotelService.getHotels(locale),
    tourService.getTours({ locale }),
    taxonomyService.getLocations(locale),
  ])

  return (
    <>
      <BannerHomePage data={dataHome?.acf} />
      <Overview overview={dataHome?.acf?.overview} />
      <OurTours
        ourTours={dataHome?.acf?.our_tours}
        tours={tourRes?.data}
        hotels={hotelRes?.data}
        locations={locationRes?.data}
      />
    </>
  )
}
