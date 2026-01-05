'use client'

import { IHomePageOverview } from '@/interface/homepage.interface'
import { useInView } from 'motion/react'
import { useRef } from 'react'
import Images from '@/modules/home/Overview/_components/Images'
import Article from '@/modules/home/Overview/_components/Article'

const Overview = ({ overview }: { overview: IHomePageOverview }) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section
      ref={sectionRef}
      className='h-[68.5rem] relative w-full bg-[url("/home/overview/bg.webp")] bg-cover bg-center overflow-hidden xsm:h-[37.75rem]'
    >
      <Images isInView={isInView} />
      <Article
        overview={overview}
        isInView={isInView}
      />
    </section>
  )
}

export default Overview
