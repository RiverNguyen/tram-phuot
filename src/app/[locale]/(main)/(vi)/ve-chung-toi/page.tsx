import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import WrapperAbout from '@/modules/about-us'


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
    <WrapperAbout
        locale={locale}
        banner={aboutPage?.acf}
        about={aboutPage?.acf?.about_us}
        content={aboutPage?.acf?.our_story}
        explorers={aboutPage?.acf.where_dreams_take_flight}
        theExplorer={aboutPage?.acf.the_explorers}
        video={aboutPage?.acf.video}
      />
  )
}
