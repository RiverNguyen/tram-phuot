'use client'

import { BrandButton } from '@/components/shared'
import { IHomePageOverview } from '@/interface/homepage.interface'
import Link from 'next/link'
import { motion } from 'motion/react'

interface ArticleProps {
  overview: IHomePageOverview
  isInView: boolean
}

const Article = ({ overview, isInView }: ArticleProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: '8rem', filter: 'blur(10px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: '8rem', filter: 'blur(10px)' }
      }
      transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.2 }}
      className='absolute top-[4.67rem] xsm:top-[3.125rem] xsm:left-[3rem] left-[11rem] z-[5]'
    >
      <motion.div
        initial={{ y: '3rem' }}
        animate={isInView ? { y: 0 } : { y: '3rem' }}
        transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.25 }}
        className='w-[11.976rem] xsm:w-[5.06181rem] xsm:h-[1.34863rem] h-[3.19075rem] rounded-[99%] bg-[#F6CD40] flex-center rotate-[-7.522deg] absolute top-[5.5rem] left-[-4rem] xsm:top-9 xsm:left-[-2.25rem]'
      >
        <p className='text-[#23323C] xsm:text-[0.38738rem] font-montserrat text-[0.9165rem] font-bold leading-[1.0] uppercase w-[6.9375rem] text-center xsm:w-[2.9375rem]'>
          {overview?.text_decor_2}
        </p>
      </motion.div>
      <motion.h3
        initial={{ y: '3rem' }}
        animate={isInView ? { y: 0 } : { y: '3rem' }}
        transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.3 }}
        className='text-[#F56E0A] font-motherland text-[3.3125rem] xsm:text-[1.4rem] rotate-[-5.037deg] pl-[5.75rem] translate-y-[1.5rem] xsm:pl-8 xsm:translate-y-[-0.75rem]'
        style={{
          WebkitTextStrokeColor: '#FDF6EC',
          WebkitTextStrokeWidth: '4.61px',
          paintOrder: 'stroke fill',
        }}
      >
        {overview?.text_decor_1}
      </motion.h3>

      <h2 className='text-[4.125rem] font-bold font-phu-du leading-[4rem] bg-clip-text text-transparent bg-[linear-gradient(180deg,#000_0%,#2E8B6F_90%,#0D7C5E_100%)] mix-blend-overlay xsm:text-[1.75rem] xsm:leading-[1.0]'>
        <p className='pl-[8rem] xsm:pl-12'>{overview?.title?.line_1}</p>
        <p>{overview?.title?.line_2}</p>
        <p>{overview?.title?.line_3}</p>
        <p className='pl-[5rem] xsm:pl-8'>{overview?.title?.line_4}</p>
      </h2>
      <p
        className='w-[37.4502rem] xsm:w-[21.4375rem] xsm:text-[0.875rem] xsm:indent-0 mt-4 text-[1.125rem] font-medium leading-[2.0] tracking-[-0.02] indent-[4rem]'
        style={{
          textDecoration: 'underline dotted #AEAFAE',
        }}
      >
        {overview?.description}
      </p>
      <div className='flex space-x-[0.6875rem] mt-[1.72rem] xsm:flex-col xsm:space-y-[0.875rem]'>
        <Link
          href={overview?.button_1?.url}
          target={overview?.button_1?.target}
        >
          <BrandButton
            variant='blueGradient'
            classNameButtonContainer='xsm:w-[8.875rem]'
          >
            {overview?.button_1?.title}
          </BrandButton>
        </Link>
        <Link
          href={overview?.button_2?.url}
          target={overview?.button_2?.target}
        >
          <BrandButton
            variant='transparent'
            classNameButtonContainer='xsm:w-[8.875rem]'
          >
            {overview?.button_2?.title}
          </BrandButton>
        </Link>
      </div>
    </motion.article>
  )
}

export default Article
