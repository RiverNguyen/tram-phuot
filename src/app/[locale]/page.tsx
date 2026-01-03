export const dynamicParams = false

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default async function page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  console.log(locale)
  return (
    <>
      <div className='h-screen'>Banner</div>
    </>
  )
}
