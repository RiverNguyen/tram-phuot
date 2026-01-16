'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { XIcon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AdvertisementPopupProps {
  imageUrl: string
  imageAlt?: string
  linkUrl?: string
  className?: string
  delay?: number
}

export default function AdvertisementPopup({
  imageUrl,
  imageAlt = 'Advertisement',
  linkUrl,
  className,
  delay = 1000,
}: AdvertisementPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Always show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, delay)
    return () => clearTimeout(timer)
  }, [mounted, delay])

  // Disable scroll when popup is open
  useEffect(() => {
    if (!mounted) return

    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen, mounted])

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleImageClick = () => {
    if (linkUrl) {
      window.open(linkUrl, '_blank', 'noopener,noreferrer')
    }
  }

  if (!mounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-[100] flex items-center justify-center p-4'
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className='absolute inset-0 bg-black/50'
          />

          {/* Popup Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
            }}
            className={cn(
              'relative bg-white rounded-lg shadow-2xl overflow-hidden',
              'w-full max-w-[30rem] aspect-square',
              className,
            )}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className='absolute top-2 right-2 z-10 rounded-full bg-black/50 p-1.5 text-white opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer'
              aria-label='Close advertisement'
            >
              <XIcon className='size-5' />
            </motion.button>

            {/* Image */}
            <motion.div
              onClick={handleImageClick}
              whileHover={linkUrl ? { scale: 1.02 } : {}}
              className={cn(
                'relative w-full h-full cursor-pointer',
                linkUrl && 'transition-opacity',
              )}
            >
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className='object-cover'
                sizes='(max-width: 768px) 100vw, 400px'
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
