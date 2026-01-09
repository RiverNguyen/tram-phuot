import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
import Contact from '@/modules/contact'

export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.contact.rank_math[locale as keyof typeof endpoints.contact.rank_math],
  )
  return metadataValues(res)
}
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <Contact locale={locale} />
}
