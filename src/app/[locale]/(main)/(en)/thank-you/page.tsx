import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import ThankYou from '@/modules/thankyou'
import metadataValues from '@/utils/metadataValues'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'en' }]
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.thank_you.rank_math[locale as keyof typeof endpoints.thank_you.rank_math],
  )
  return metadataValues(res)
}

export default function page() {
  return <ThankYou />
}
