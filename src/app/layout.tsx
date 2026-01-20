import { montserrat, motherland, phuDu } from '@/app/fonts'
import type { Metadata, Viewport } from 'next'
import '@/app/globals.css'
import DeferredScripts from '@/app/_components/DeferredScripts'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'Tram Phuot',
  description: 'Tram Phuot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
    >
      <body
        className={`${phuDu.variable} ${montserrat.variable} ${montserrat.className} ${motherland.variable} antialiased`}
      >
        {children}
        <DeferredScripts />
      </body>
    </html>
  )
}
