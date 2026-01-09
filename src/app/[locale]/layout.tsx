import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Header from '@/layouts/header'
import { NextIntlClientProvider } from 'next-intl'
import { ISiteSetting } from '@/interface/site-setting.interface'
import { TooltipProvider } from '@/components/ui/tooltip'

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
      <TooltipProvider>
        <Header
          data={dataSiteSettings?.data?.header}
          socialMedia={dataSiteSettings.data?.header?.social_media}
        />
        {children}
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}
