import Promotions from '@/modules/promotions'

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <Promotions locale={locale} />
}
