import endpoints from '@/configs/endpoints'
import Promotions from '@/modules/promotions'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import metadataValues from '@/utils/metadataValues'
export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.promotion.rank_math[locale as keyof typeof endpoints.promotion.rank_math],
  )
  return metadataValues(res)
}
export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <Promotions locale={locale} />
}
