import endpoints from '@/configs/endpoints'
import getMetaDataRankMath from '@/fetches/getMetaDataRankMath'
import Blogs from '@/modules/blogs'
import metadataValues from '@/utils/metadataValues'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'en' }]
}
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const res = await getMetaDataRankMath(
    endpoints.blogs.rank_math[locale as keyof typeof endpoints.blogs.rank_math],
  )
  return metadataValues(res)
}

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    kind?: string
    ['type-news']?: string
    sort?: string
    paged?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  return <Blogs locale={locale} searchParams={sp} />
}
