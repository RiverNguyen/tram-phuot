import Banner from '@/modules/about-us/_components/Banner'
import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import OurAbout from '@/modules/about-us/_components/OurAbout'
import OurStoryAbout from '@/modules/about-us/_components/OurStoryAbout'
import JourneyAbout from '@/modules/about-us/_components/JourneyAbout'
import VideoStory from '@/modules/about-us/_components/VideoStory'

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    locations: string
    ['tour-type']: string
    ['tour-duration']: string
    page?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])

  const aboutPage = await fetchData({
    api: ENDPOINTS.about[locale as 'en' | 'vi'],
  })

  return (
    <main className='relative w-full h-full bg-[#FDF4ED] overflow-hidden'>
      {/* Banner */}
      <Banner
        locale={locale}
        data={aboutPage?.acf}
      />
      <OurAbout
        about={aboutPage?.acf?.about_us}
      />
      
      <OurStoryAbout content={aboutPage?.acf?.our_story} />
      <JourneyAbout explorers={aboutPage?.acf.where_dreams_take_flight} />
      <VideoStory
        theExplorer={aboutPage?.acf.the_explorers}
        video={aboutPage?.acf.video}
      />
    </main>
  )
}
