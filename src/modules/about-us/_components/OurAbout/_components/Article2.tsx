'use client'
import { motion } from 'motion/react'
import useIsMobile from '@/hooks/use-is-mobile'
import { IAboutUsContent } from '@/interface/about.interface'
import './styles.css'

interface ArticleProps {
  about: IAboutUsContent
  isInView: boolean
  className?: string
}

const Article = ({ about, isInView, className }: ArticleProps) => {
  const isMobile = useIsMobile()
  const yOffset = isMobile ? '3rem' : '8rem'

  return (
    <motion.article
      initial={{ opacity: 0, y: yOffset, filter: 'blur(10px)' }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y: yOffset, filter: 'blur(10px)' }
      }
      transition={{ duration: 1.5, ease: [0.39, 0.02, 0.15, 0.85], delay: 0.2 }}
      className={` ${className}`}
    >
      <div className='xsm:w-full text-[1.5rem] xsm:text-[1.125rem] font-bold leading-[1.1] uppercase'>
        <h2 className='font-phu-du text-[#2E2E2E]'>{about?.title}</h2>
      </div>

      <div
        className='descriptionWrapper xsm:w-[21.32519rem] text-[1rem] xsm:text-[0.875rem] xsm:indent-0 mt-8 xsm:mt-[0.875rem] leading-[2.0] tracking-[-0.02] xsm:text-[#07364D]'
        dangerouslySetInnerHTML={{ __html: about?.description }}
      />
    </motion.article>
  )
}

export default Article
