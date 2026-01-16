import ThankYou from '@/modules/thankyou'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'en' }]
}

export default function page() {
  return <ThankYou />
}
