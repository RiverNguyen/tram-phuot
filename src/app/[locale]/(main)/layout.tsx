import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import { ISiteSetting } from '@/interface/site-setting.interface'
import Footer from '@/layouts/footer'
import CTA from '@/layouts/cta'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const dataSiteSettings: ISiteSetting = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}&field=footer,cta`,
  })

  return (
    <>
      <CTA data={dataSiteSettings?.data?.cta?.list} />
      {children}
      <Footer data={dataSiteSettings?.data?.footer} />
    </>
  )
}
