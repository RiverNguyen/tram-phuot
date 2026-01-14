'use client'

import { BrandButton } from '@/components/shared'
import Link from 'next/link'
import { motion } from 'motion/react'
import useIsMobile from '@/hooks/use-is-mobile'
import {IAboutUsContent1} from '@/interface/about.interface'

interface ArticleProps {
  about: IAboutUsContent1
  isInView: boolean
}

const Article = ({ about, isInView }: ArticleProps) => {
  const isMobile = useIsMobile()
  const yOffset = isMobile ? '3rem' : '8rem'

  const title = about?.title ?? ""
  const [line1, line2] = title.split(":")

  return (
    <motion.article
      initial={{ opacity: 0, y: yOffset, filter: 'blur(10px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: yOffset, filter: 'blur(10px)' }
      }
      transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.2 }}
      className='xsm:w-[19.75rem] w-[39.625rem]'
    >
      <motion.div
        initial={{ y: '3rem' }}
        animate={isInView ? { y: 0 } : { y: '3rem' }}
        transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.25 }}
        className='w-[10.72631rem] xsm:w-[5.625rem] xsm:h-[1.5rem] h-[2.85775rem] rounded-[99%] bg-[linear-gradient(13deg,rgba(0,128,77,0.80)_25.6%,rgba(3,50,140,0.80)_108.95%)] flex-center rotate-[-7.522deg] absolute top-0 left-0'
      >
        <p className='text-white xsm:text-[0.4375rem] font-montserrat text-[0.82081rem] font-bold leading-[1.0] uppercase w-[6.9375rem] text-center xsm:w-[2.9375rem] uppercase'>
          About us
        </p>
      </motion.div>
      <motion.h3
        initial={{ y: '3rem' }}
        animate={isInView ? { y: 0 } : { y: '3rem' }}
        transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.3 }}
        className="relative z-[-1] xsm:pb-0 xsm:pt-[0.5rem] pb-[0.5rem] font-motherland text-[3.3125rem] xsm:text-[1.5rem] rotate-[-5.037deg] pl-[3.85rem] translate-y-[1.5rem] xsm:pl-8 xsm:translate-y-[0.5rem] bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#29C486_100.15%)]"
      >
        {about?.subtitle}
      </motion.h3>


      <div className="xsm:w-[19.75rem] w-[39.5625rem] xsm:w-full text-[3.69456rem] xsm:text-[1.75rem] font-bold leading-[1]">
        <h2 className="font-phu-du indent-[6rem] xsm:indent-[3rem] text-[#2E2E2E]">
          {line1}:
        </h2>

        {/* LINE 2 */}
        <h2 className="font-phu-du bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] bg-clip-text text-transparent">
          {line2?.trim()}
        </h2>
      </div>

      <p
        className='w-[32rem] xsm:w-[21.32519rem] xsm:text-[0.875rem] xsm:indent-0 mt-8 text-[1.125rem] font-medium leading-[2.0] tracking-[-0.02] xsm:line-clamp-4 xsm:line-clamp-6'
        style={{
          textDecoration: 'underline dotted #AEAFAE',
        }}
      >
        {about?.description}
      </p>
    </motion.article>
  )
}

export default Article
