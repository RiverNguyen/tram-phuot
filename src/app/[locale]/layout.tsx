import ENDPOINTS from '@/configs/endpoints'
import fetchData from '@/fetches/fetchData'
import Header from '@/layouts/header'
import { NextIntlClientProvider } from 'next-intl'
import { ISiteSetting } from '@/interface/site-setting.interface'
import { TooltipProvider } from '@/components/ui/tooltip'
import OrganizationSchema from '@/seo/schemas/OrganizationSchema'
import WebSiteSchema from '@/seo/schemas/WebSiteSchema'
import { SEO_CONFIG } from '@/seo/seo.config'

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
        <OrganizationSchema lang={locale} />
        <WebSiteSchema
          lang={locale}
          name={SEO_CONFIG.siteName}
        />
        <Header
          data={dataSiteSettings?.data?.header}
          socialMedia={dataSiteSettings.data?.header?.social_media}
        />
        {children}
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}
