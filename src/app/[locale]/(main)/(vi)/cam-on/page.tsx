import ThankYou from '@/modules/thankyou'

export const dynamicParams = false
export function generateStaticParams() {
  return [{ locale: 'vi' }]
}

export default function page() {
  return <ThankYou />
}
