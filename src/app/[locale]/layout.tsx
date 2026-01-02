import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Header from '@/layouts/header'
import { NextIntlClientProvider } from 'next-intl'
import { IHeader, ISocialMedia } from '@/interface/site-setting.interface'

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  const dataSiteSettings = await fetchData({
    api: `${ENDPOINTS.site_settings}?locale=${locale}`,
  })

  return (
    <NextIntlClientProvider>
      <Header
        data={dataSiteSettings?.data?.header as IHeader}
        socialMedia={dataSiteSettings.data.footer?.footer_content?.social_media as ISocialMedia[]}
      />
      {children}
    </NextIntlClientProvider>
  )
}
