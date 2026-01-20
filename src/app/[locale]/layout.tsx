import { Suspense } from 'react'
import Header from '@/layouts/header'
import { NextIntlClientProvider } from 'next-intl'
import { TooltipProvider } from '@/components/ui/tooltip'
import OrganizationSchema from '@/seo/schemas/OrganizationSchema'
import WebSiteSchema from '@/seo/schemas/WebSiteSchema'
import { SEO_CONFIG } from '@/seo/seo.config'
import HeaderLoader from '@/layouts/header/_components/HeaderLoader'
import HeaderWrapper from '@/layouts/header/_components/HeaderWrapper'

export default async function layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <NextIntlClientProvider>
      <TooltipProvider>
        <OrganizationSchema lang={locale} />
        <WebSiteSchema
          lang={locale}
          name={SEO_CONFIG.siteName}
        />
        <Suspense fallback={<HeaderLoader />}>
          <HeaderWrapper locale={locale} />
        </Suspense>
        {children}
      </TooltipProvider>
    </NextIntlClientProvider>
  )
}
