'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { WPImage } from '@/types/acf-wordpress.type'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Image from 'next/image'
import { DrawerClose } from '@/components/ui/drawer'
import ICClose from '@/components/icons/ICClose'
import ICGallery from '@/components/icons/ICGallery'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import '@/components/shared/PopupGallery/style.css'

interface PopupGalleryProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title?: string
  items: WPImage[]
  initialIndex?: number
}

export default function PopupGallery({
  title,
  items,
  open,
  setOpen,
  initialIndex = 0,
}: PopupGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const total = items?.length || 0

  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  /** set initial index */
  useEffect(() => {
    if (!open || !mainSwiper) return

    const safeIndex = initialIndex >= 0 && initialIndex < items.length ? initialIndex : 0

    mainSwiper.slideTo(safeIndex, 0)
  }, [open, mainSwiper, initialIndex, items.length])

  /** re-bind navigation khi Dialog mở (DOM đã mount) */
  useEffect(() => {
    if (open && mainSwiper && prevRef.current && nextRef.current) {
      mainSwiper.params.navigation = {
        ...(typeof mainSwiper.params.navigation === 'object' ? mainSwiper.params.navigation : {}),
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      }

      mainSwiper.navigation?.destroy()
      mainSwiper.navigation?.init()
      mainSwiper.navigation?.update()
    }
  }, [open, mainSwiper])

  /** clear swiper khi đóng Dialog */
  useEffect(() => {
    if (!open) {
      setMainSwiper(null)
      setThumbsSwiper(null)
    }
  }, [open])

  /** guard thumbs */
  const safeThumbs = thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogContent
        showCloseButton={false}
        className='xsm:p-0 h-screen w-screen max-w-full! rounded-none! border-none! bg-black/80 backdrop-blur-sm'
      >
        <DialogHeader className='hidden'>
          <DialogTitle>{title || 'Thư viện hình ảnh'}</DialogTitle>
        </DialogHeader>

        <div className='flex size-full items-center justify-center'>
          <div className='xsm:w-full xsm:h-full relative h-175 max-h-full w-207.75 space-y-3'>
            <Swiper
              modules={[FreeMode, Navigation, Thumbs]}
              spaceBetween={10}
              thumbs={{ swiper: safeThumbs }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(s) => {
                s.params.navigation = {
                  ...(typeof s.params.navigation === 'object' ? s.params.navigation : {}),
                  prevEl: prevRef.current,
                  nextEl: nextRef.current,
                }
              }}
              onSwiper={(swiper) => {
                setMainSwiper(swiper)
                setCurrentIndex(swiper.activeIndex)
              }}
              onSlideChange={(swiper) => {
                setCurrentIndex(swiper.activeIndex)
              }}
              speed={800}
              className='swiper-main-gallery xsm:h-69.5 xsm:absolute! xsm:top-1/2 xsm:left-0 xsm:-translate-y-1/2 h-153.75 w-full'
            >
              {items.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className='h-full! w-full!'
                >
                  <Image
                    width={830}
                    height={615}
                    src={item.url}
                    alt={item?.alt || ''}
                    className='size-full object-cover'
                    quality={100}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Thumbs]}
              spaceBetween={6}
              slidesPerView='auto'
              speed={800}
              freeMode
              watchSlidesProgress
              className='swiper-thumbs-gallery xsm:px-[0.35rem]! xsm:absolute! xsm:bottom-0 xsm:left-0 h-18.25 w-full'
            >
              {items.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className='h-full! w-[6.18125rem]! cursor-pointer'
                >
                  <Image
                    width={100}
                    height={75}
                    src={item.url}
                    alt={item?.alt || ''}
                    className='size-full object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className='xsm:absolute xsm:flex xsm:bg-black xsm:top-0 xsm:left-0 xsm:w-full xsm:items-center xsm:justify-between xsm:p-4'>
            <p className='xsm:static xsm:space-x-0 absolute top-8 left-8 z-5 flex items-center space-x-2 py-2.5'>
              <ICGallery className='xsm:hidden size-4.5 shrink-0' />
              <span className='xsm:text-[0.875rem] xsm:tracking-[0.00875rem] text-[1.125rem] font-semibold text-white'>
                {currentIndex + 1}/{total}
              </span>
            </p>

            <DrawerClose className='xsm:size-7 xsm:static absolute top-8 right-8 z-5 size-8 cursor-pointer'>
              <ICClose className='size-full text-white' />
            </DrawerClose>
          </div>

          <button
            ref={prevRef}
            type='button'
            className='xsm:hidden absolute top-1/2 left-8.5 z-10 -translate-y-1/2 cursor-pointer disabled:opacity-50'
          >
            <ICArrowLeft className='size-8' />
          </button>

          <button
            ref={nextRef}
            type='button'
            className='xsm:hidden absolute top-1/2 right-8.5 z-10 -translate-y-1/2 cursor-pointer disabled:opacity-50'
          >
            <ICArrowRight className='size-8' />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ICArrowLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={40}
      height={40}
      viewBox='0 0 40 40'
      fill='none'
      {...props}
    >
      <path
        d='M15.9502 9.88281L5.83353 19.9995L15.9502 30.1161'
        stroke='white'
        strokeWidth='2.85714'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M34.167 20H6.11699'
        stroke='white'
        strokeWidth='2.85714'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function ICArrowRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={40}
      height={40}
      viewBox='0 0 40 40'
      fill='none'
      {...props}
    >
      <path
        d='M24.0498 9.88281L34.1665 19.9995L24.0498 30.1161'
        stroke='white'
        strokeWidth='2.85714'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.83301 20H33.883'
        stroke='white'
        strokeWidth='2.85714'
        strokeMiterlimit={10}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
