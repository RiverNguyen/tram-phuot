'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import Link from 'next/link'
import useIsMobile from '@/hooks/use-is-mobile'

const menuVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 16,
      bounce: 0.35,
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
  closed: {
    opacity: 0,
    y: 24,
    scale: 0.7,
    transition: {
      duration: 0.18,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 320, damping: 18, bounce: 0.4 },
  },
  closed: {
    opacity: 0,
    y: 18,
    scale: 0.75,
    rotate: -8,
    transition: { duration: 0.14 },
  },
}

const ScrollToTopIcon = ({
  circleRef,
}: {
  circleRef: React.RefObject<SVGCircleElement | null>
}) => {
  return (
    <svg
      width='61'
      height='61'
      viewBox='0 0 61 61'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='size-10'
    >
      <g clipPath='url(#clip0_604_10721)'>
        <circle
          id='circle'
          ref={circleRef}
          cx='30.4477'
          cy='30.3598'
          r='28.8142'
          stroke='#F56E0A'
          strokeWidth='1.82947'
        />
        <path
          d='M30.0777 41.7945L30.0777 21.6703'
          stroke='#F56E0A'
          strokeWidth='3.65894'
        />
        <path
          d='M20.9648 30.7812L30.0726 21.6735L39.1804 30.7812'
          stroke='#F56E0A'
          strokeWidth='3.65894'
        />
      </g>
      <defs>
        <clipPath id='clip0_604_10721'>
          <rect
            width='59.4578'
            height='59.4578'
            fill='white'
            transform='translate(0.71875 0.630859)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

const CTA = ({ data }: { data: { icon: string; link: string }[] }) => {
  const { isMobile, isLoading: isMobileLoading } = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)
  const circleRef = useRef<SVGCircleElement | null>(null)

  // Ở PC: luôn mở, ở mobile: bắt đầu đóng
  useEffect(() => {
    if (!isMobileLoading) {
      setIsOpen(!isMobile)
    }
  }, [isMobile, isMobileLoading])

  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return

    const radius = circle.r.baseVal.value
    const circumference = 2 * Math.PI * radius

    circle.style.strokeDasharray = `${circumference} ${circumference}`
    circle.style.strokeDashoffset = `${circumference}`
    circle.style.transform = 'rotate(-90deg)'
    circle.style.transformOrigin = '50% 50%'

    let rafId: number | null = null
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      const progress = height > 0 ? Math.min(Math.max(scrollTop / height, 0), 1) : 0
      const offset = circumference - progress * circumference
      circle.style.strokeDashoffset = `${offset}`
      rafId = null
    }

    const throttledUpdate = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', throttledUpdate, { passive: true })
    window.addEventListener('resize', throttledUpdate)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', throttledUpdate)
      window.removeEventListener('resize', throttledUpdate)
    }
  }, [])

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='fixed xsm:right-4 right-8 bottom-16 xsm:bottom-20 xsm:z-[50] z-[99] flex flex-col items-center gap-5'>
      {/* <button
        type='button'
        onClick={handleScrollToTop}
        aria-label='Scroll to top'
        className='cursor-pointer'
      >
        <ScrollToTopIcon circleRef={circleRef} />
      </button> */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='cta-menu'
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
            className='flex flex-col items-center space-y-3 mb-1'
          >
            {Array.isArray(data) &&
              data?.map((item, index) => (
                <Link
                  href={index === 0 ? `tel:${item?.link}` : item?.link}
                  key={index}
                  target='_blank'
                  className='cursor-pointer'
                >
                  <motion.button
                    key={index}
                    type='button'
                    variants={itemVariants}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className='size-10 rounded-full bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] flex-center shadow-lg cursor-pointer'
                  >
                    <Image
                      src={item.icon}
                      alt='cta'
                      width={20}
                      height={20}
                      className='h-[1.25rem] w-auto object-cover'
                    />
                  </motion.button>
                </Link>
              ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nút toggle chính */}
      <div className='relative inline-flex items-center justify-center'>
        {/* Ripple layer – chỉ hiện khi !isOpen */}
        {!isOpen && <span className='ripple_video' />}

        {/* Nút toggle chính */}
        <motion.button
          type='button'
          onClick={() => setIsOpen((prev) => !prev)}
          whileTap={{ scale: 0.9 }}
          animate={{
            rotate: isOpen ? 90 : 0,
            scale: isOpen ? 1.05 : 1,
            transition: { type: 'spring', stiffness: 260, damping: 20 },
          }}
          className='relative z-10 size-10 rounded-full
      bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)]
      flex items-center justify-center shadow-lg cursor-pointer'
        >
          {isOpen ? (
            <span className='text-white text-2xl leading-none'>×</span>
          ) : (
            <Image
              src='/cta/logo.svg'
              alt='cta'
              width={20}
              height={20}
              className='w-[1.375rem] h-[1.3125rem] object-cover'
            />
          )}
        </motion.button>
      </div>

      <button
        type='button'
        onClick={handleScrollToTop}
        aria-label='Scroll to top'
        className='cursor-pointer h-full w-full'
      >
        <ScrollToTopIcon circleRef={circleRef} />
      </button>
    </div>
  )
}

export default CTA
