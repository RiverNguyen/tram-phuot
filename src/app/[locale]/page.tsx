import { useTranslations } from 'next-intl'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }]
}

export default function page() {
  const t = useTranslations('HomePage')
  return <></>
}
