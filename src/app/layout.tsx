import { montserrat, motherland, phuDu } from '@/app/fonts'
import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader'
import { Toaster } from 'sonner'
import '@/app/globals.css'

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
        <NextTopLoader
          color='linear-gradient(0deg, #6EEBFF 0%, #141ED2 100%)'
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing='ease'
          speed={200}
          shadow='0 0 10px #6EEBFF,0 0 5px #6EEBFF'
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
