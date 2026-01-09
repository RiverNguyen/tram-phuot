'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, type Variants } from 'framer-motion'

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

const CTA = () => {
  const [isOpen, setIsOpen] = useState(false)

  const items = [
    { id: 'call', label: 'Call', textClass: 'text-xs' },
    { id: 'zalo', label: 'Zalo', textClass: 'text-xs' },
    { id: 'insta', label: 'Insta', textClass: 'text-[0.65rem]' },
    { id: 'mess', label: 'Mess', textClass: 'text-[0.6rem]' },
  ]

  return (
    <div className='fixed right-8 bottom-8 z-[20] flex flex-col items-center gap-3'>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key='cta-menu'
            initial='closed'
            animate='open'
            exit='closed'
            variants={menuVariants}
            className='flex flex-col items-center gap-4 mb-1'
          >
            {items.map((item) => (
              <motion.button
                key={item.id}
                type='button'
                variants={itemVariants}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className='size-10 rounded-full bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] flex-center shadow-lg'
              >
                <span className={`text-white font-semibold ${item.textClass}`}>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

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
        className='size-10 rounded-full bg-[linear-gradient(139deg,#FFB715_4.6%,#F04C05_101.16%)] flex-center shadow-lg'
      >
        {isOpen ? (
          // Icon close
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
  )
}

export default CTA
