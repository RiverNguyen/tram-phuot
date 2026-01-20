import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import CTA from '@/layouts/cta'
import { ISiteSetting } from '@/interface/site-setting.interface'

export default async function CTAWrapper({ locale }: { locale: string }) {
  const dataSiteSettings: ISiteSetting = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}&field=cta`,
  })

  return <CTA data={dataSiteSettings?.data?.cta?.list} />
}
