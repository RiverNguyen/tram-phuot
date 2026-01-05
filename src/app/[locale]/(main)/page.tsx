import BannerHomePage from '@/modules/home/banner'
import Overview from '@/modules/home/overview'
import homeService from '@/services/home'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dataHome = await homeService.getHome(locale)

  return (
    <>
      <BannerHomePage data={dataHome?.acf} />
      <Overview overview={dataHome?.acf?.overview} />
    </>
  )
}
