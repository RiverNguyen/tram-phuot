import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Footer from '@/layouts/footer'
import { ISiteSetting } from '@/interface/site-setting.interface'

export default async function FooterWrapper({ locale }: { locale: string }) {
  const dataSiteSettings: ISiteSetting = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}&field=footer`,
  })

  return <Footer data={dataSiteSettings?.data?.footer} />
}
