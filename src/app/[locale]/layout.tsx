import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Header from '@/layouts/header'
import { NextIntlClientProvider } from 'next-intl'
import { ISiteSetting } from '@/interface/site-setting.interface'

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const dataSiteSettings: ISiteSetting = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}&field=header`,
  })

  return (
    <NextIntlClientProvider>
      <Header
        data={dataSiteSettings?.data?.header}
        socialMedia={dataSiteSettings.data.footer?.footer_content?.social_media}
      />
      {children}
    </NextIntlClientProvider>
  )
}
