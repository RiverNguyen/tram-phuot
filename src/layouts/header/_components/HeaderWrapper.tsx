import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Header from '@/layouts/header'
import { ISiteSetting } from '@/interface/site-setting.interface'

export default async function HeaderWrapper({ locale }: { locale: string }) {
  const dataSiteSettings: ISiteSetting = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}&field=header`,
  })

  return (
    <Header
      data={dataSiteSettings?.data?.header}
      socialMedia={dataSiteSettings.data?.header?.social_media}
    />
  )
}
