import Promotions from '@/modules/promotions'

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    locations?: string
    ['tour-type']?: string
    paged?: string
  }>
}) {
  const [{ locale }, sp] = await Promise.all([params, searchParams])
  return <Promotions locale={locale} searchParams={sp} />
}
