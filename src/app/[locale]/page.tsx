import { useTranslations } from 'next-intl'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function page() {
  const t = useTranslations('HomePage')
  return (
    <div className='sm:bg-black bg-white'>
      <h1 className='scroll-m-2'>{t('title')}</h1>
    </div>
  )
}
