import { Suspense } from 'react'
import Footer from '@/layouts/footer'
import CTA from '@/layouts/cta'
import FooterWrapper from '@/layouts/footer/_components/FooterWrapper'
import CTAWrapper from '@/layouts/cta/_components/CTAWrapper'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <Suspense fallback={null}>
        <CTAWrapper locale={locale} />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <FooterWrapper locale={locale} />
      </Suspense>
    </>
  )
}
