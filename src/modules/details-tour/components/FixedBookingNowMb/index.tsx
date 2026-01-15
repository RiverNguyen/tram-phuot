'use client'

import ICClose from '@/components/icons/ICClose'
import ICCompass from '@/components/icons/ICCompass'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { BrandButton } from '@/components/shared'
import SectionBookingOverview from '@/modules/details-tour/components/SectionBookingOverview'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import { TourDurationType } from '@/types/details-tour.type'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'

interface FixedBookingNowMbProps {
  tourDuration: TourDurationType
  pricePerPax: number
  tourTitle: string
}

export default function FixedBookingNowMb({
  tourDuration,
  pricePerPax,
  tourTitle,
}: FixedBookingNowMbProps) {
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  const bookingTourContext = useContext(BookingTourContext)
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }
  const { openBookingOverviewMobile, setOpenBookingOverviewMobile } = bookingTourContext

  // Hide when footer enters viewport
  useEffect(() => {
    const footerEl = document.querySelector('footer')
    if (!footerEl) return

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(Boolean(entry?.isIntersecting))
      },
      { threshold: 0 },
    )

    footerObserver.observe(footerEl)
    return () => footerObserver.disconnect()
  }, [])

  return (
    <>
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            key='details-tour-fixed-booking-now-mb'
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
            className='xsm:block shadow-booking-now-mb fixed right-0 bottom-0 left-0 z-50 hidden space-y-2.5 bg-white px-5 py-3'
          >
            <div className='flex items-center justify-between'>
              <span className='font-montserrat section-title-h2 text-[0.75rem] leading-[1.6] font-bold tracking-[-0.0075rem] uppercase underline'>
                Booking Overview
              </span>

              <div className='flex items-center space-x-1'>
                <ICCompass className='size-4 text-[#F56E0A]' />
                <p className='flex items-center space-x-1'>
                  <span className='font-phu-du text-[1.125rem] leading-[1.1] font-bold text-[#F56E0A]'>
                    {pricePerPax} USD
                  </span>
                  <span className='font-montserrat text-[0.75rem] leading-[1.6] font-medium tracking-[-0.0075rem] text-black/50'>
                    /{translateDetailsTourPage('textPerson')}
                  </span>
                </p>
              </div>
            </div>

            <BrandButton
              type={{
                variant: 'button',
                type: 'button',
                onClick: () => setOpenBookingOverviewMobile(true),
              }}
              variant='blueGradient'
              classNameButtonText='uppercase font-montserrat text-[0.875rem] text-white'
              classNameButtonContainer='w-full'
            >
              Book now
            </BrandButton>
          </motion.div>
        )}
      </AnimatePresence>
      <DrawerProvider
        open={openBookingOverviewMobile}
        setOpen={setOpenBookingOverviewMobile}
        className='rounded-t-[0.5rem]'
        showDrawerDrag={true}
      >
        <button
          type='button'
          className='absolute top-3.75 right-4.75 size-5'
          onClick={() => setOpenBookingOverviewMobile(false)}
        >
          <ICClose className='size-full' />
        </button>
        <SectionBookingOverview
          tourTitle={tourTitle || ''}
          tourDuration={tourDuration || {}}
          pricePerPax={pricePerPax}
        />
      </DrawerProvider>
    </>
  )
}
