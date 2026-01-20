import { montserrat, motherland, phuDu } from '@/app/fonts'
import type { Metadata, Viewport } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import '@/app/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <SpeedInsights />
        <NextTopLoader
          color='linear-gradient(0deg, #FFB715 0%, #F04C05 100%)'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing='ease'
          speed={200}
          // shadow='0 0 10px #FFB715,0 0 5px #F04C05'
          template='<div class="bar" role="bar"><div class="peg"></div></div>
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <Toaster richColors />
      </body>
    </html>
  )
}
