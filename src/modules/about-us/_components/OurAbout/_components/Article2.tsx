'use client'
import { motion } from 'motion/react'
import useIsMobile from '@/hooks/use-is-mobile'
import { IAboutUsContent } from '@/interface/about.interface'
import './styles.css'
import { cn } from '@/lib/utils'

interface ArticleProps {
  about: IAboutUsContent
  isInView: boolean
  className?: string
}

const Article = ({ about, isInView, className }: ArticleProps) => {
  const isMobile = useIsMobile()
  const yOffset = isMobile ? '3rem' : '8rem'
  const lines = about?.description
    ?.split(/<br\s*\/?>/i)
    .filter(Boolean);

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
      <div className='xsm:w-full text-[1.5rem] xsm:text-[1.125rem] font-bold leading-[1.1] uppercase w-[27.0625rem]'>
        <h2 className='font-phu-du text-[#2E2E2E]'>{about?.title}</h2>
      </div>

      <div className="mt-[1.625rem] xsm:hidden">
        {lines.map((line, i) => (
          <div className="relative py-1 w-fit" key={i}>
            <p
              className={cn("leading-[2] text-[#07364D] xsm:text-[0.875rem]")}
              dangerouslySetInnerHTML={{ __html: line }}
            />

            <span className="pointer-events-none absolute left-0 right-0 bottom-2 border-b border-dashed border-[#AEAFAE]" />
          </div>

        ))}
      </div>
      <div
        className='xsm:w-[20.32519rem] sm:hidden text-[1rem] xsm:text-[0.875rem] xsm:indent-0 mt-8 xsm:mt-[0.875rem] leading-[1.8] tracking-[-0.02] xsm:text-[#07364D] [&_br:not(:has(+_strong))]:hidden'
        dangerouslySetInnerHTML={{ __html: about?.description }}
      />
    </motion.article>
  )
}

export default Article
