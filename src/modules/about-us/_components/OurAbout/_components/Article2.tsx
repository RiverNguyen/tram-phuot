'use client'
import { motion } from 'motion/react'
import useIsMobile from '@/hooks/use-is-mobile'
import {IAboutUsContent} from '@/interface/about.interface'

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
      className={`absolute z-[5] ${className}`}
    >
      <div className="xsm:w-full text-[1.5rem] xsm:text-[1.125rem] font-bold leading-[1.1] uppercase">
        <h2 className="font-phu-du text-[#2E2E2E]">
          {about?.title}
        </h2>
      </div>

      <p
        className='xsm:w-[21.32519rem] text-[0.875rem] xsm:indent-0 mt-4 font-medium leading-[2.0] tracking-[-0.02] xsm:line-clamp-4 xsm:line-clamp-none xsm:text-[#07364D] [&_ul]:list-disc [&_ol]:list-decimal [&_ol]:pl-8 [&_ul]:pl-8 [&_table]:w-full [&_table]:block [&_table]:overflow-x-auto [&_th]:border [&_td]:border [&_th]:bg-gray-50 [&_th]:font-semibold [&_td]:px-3 [&_td]:py-2'
        style={{
          textDecoration: 'underline dotted #AEAFAE',
        }}
        dangerouslySetInnerHTML={{ __html: about?.description }}
      />
    </motion.article>
  )
}

export default Article
