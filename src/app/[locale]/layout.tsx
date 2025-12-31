import { NextIntlClientProvider } from 'next-intl'

export default function layout({ children }: { children: React.ReactNode }) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
