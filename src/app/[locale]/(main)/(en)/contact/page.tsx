import Contact from '@/modules/contact'
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <Contact locale={locale} />
}
