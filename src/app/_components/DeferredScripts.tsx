'use client'

import dynamic from 'next/dynamic'

// Dynamically import non-critical scripts to defer loading
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then((mod) => mod.SpeedInsights), {
  ssr: false,
})

const NextTopLoader = dynamic(() => import('nextjs-toploader'), {
  ssr: false,
})

const Toaster = dynamic(() => import('sonner').then((mod) => mod.Toaster), {
  ssr: false,
})

export default function DeferredScripts() {
  return (
    <>
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
        template='<div class="bar" role="bar"><div class="peg"></div></div>
    <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />
      <Toaster richColors />
    </>
  )
}
