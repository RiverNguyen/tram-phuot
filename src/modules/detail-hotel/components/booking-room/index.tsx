'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { PopupGallery } from '@/components/shared'
import { IRoom } from '@/interface/hotel.interface'
import { useEffect, useState, useRef } from 'react'
import RoomCard from './_components/RoomCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import { useTranslations } from 'next-intl'

type SelectedRoomSummary = {
  id: number | string
  index: number
  title: string
  quantity: number
  pricePerNight: number
  totalPrice: number
}

type BookingRoomProps = {
  rooms: IRoom[]
  onChangeSelection?: (summary: SelectedRoomSummary[]) => void
  clearRoomIndex?: number | null
}

const BookingRoom = ({ rooms, onChangeSelection, clearRoomIndex }: BookingRoomProps) => {
  const t = useTranslations('DetailHotelPage')
  const [quantities, setQuantities] = useState<number[]>(() => rooms?.map(() => 0) ?? [])
  const [currentSlides, setCurrentSlides] = useState<number[]>(() => rooms?.map(() => 0) ?? [])
  const [openGalleryIndex, setOpenGalleryIndex] = useState<number | null>(null)
  const prevSummariesRef = useRef<SelectedRoomSummary[]>([])

  useEffect(() => {
    setQuantities(rooms?.map(() => 0) ?? [])
    setCurrentSlides(rooms?.map(() => 0) ?? [])
  }, [rooms])

  useEffect(() => {
    if (clearRoomIndex !== null && clearRoomIndex !== undefined) {
      setQuantities((prev) => {
        const next = [...prev]
        if (next[clearRoomIndex] !== undefined) {
          next[clearRoomIndex] = 0
        }
        return next
      })
    }
  }, [clearRoomIndex])

  // Update parent component when quantities change
  useEffect(() => {
    if (onChangeSelection) {
      const summaries: SelectedRoomSummary[] = rooms.reduce((acc, room, idx) => {
        const quantity = quantities[idx] ?? 0
        if (!quantity) return acc

        // Get price string, prefer price_reduced over price
        const priceString = room?.acf?.price_reduced || room?.acf?.price
        // Parse price: if it's a string like "4.5" (meaning 4500) or "4500"
        // Only parse if priceString exists and is not empty
        let pricePerNight = 0
        if (priceString && priceString.trim() !== '') {
          const parsed = Number(priceString)
          pricePerNight = isNaN(parsed) ? 0 : parsed
        }

        acc.push({
          id: (room as any)?.id ?? (room as any)?.slug ?? idx,
          index: idx,
          title: room?.title ?? 'Room',
          quantity,
          pricePerNight,
          totalPrice: pricePerNight * quantity,
        })

        return acc
      }, [] as SelectedRoomSummary[])

      // Only call onChangeSelection if summaries actually changed
      const summariesChanged =
        prevSummariesRef.current.length !== summaries.length ||
        prevSummariesRef.current.some(
          (prev, idx) =>
            !summaries[idx] ||
            prev.id !== summaries[idx].id ||
            prev.quantity !== summaries[idx].quantity ||
            prev.pricePerNight !== summaries[idx].pricePerNight,
        )

      if (summariesChanged) {
        prevSummariesRef.current = summaries
        onChangeSelection(summaries)
      }
    }
  }, [quantities, rooms])

  const handleChangeQuantity = (roomIndex: number, delta: number) => {
    setQuantities((prev) => {
      const next = prev.map((quantity, index) =>
        index === roomIndex ? Math.max(0, quantity + delta) : quantity,
      )
      return next
    })
  }

  const handleSlideChange = (roomIndex: number, activeIndex: number) => {
    setCurrentSlides((prev) => {
      const next = [...prev]
      next[roomIndex] = activeIndex
      return next
    })
  }

  const currentRoom = openGalleryIndex !== null ? rooms[openGalleryIndex] : null

  return (
    <>
      {currentRoom && (
        <PopupGallery
          open={openGalleryIndex !== null}
          setOpen={(open) => setOpenGalleryIndex(open ? openGalleryIndex : null)}
          items={
            currentRoom?.acf?.gallery?.map((url, i) => ({
              id: i,
              url,
              alt: `${currentRoom?.title} - Image ${i + 1}`,
            })) ?? []
          }
          initialIndex={openGalleryIndex !== null ? currentSlides[openGalleryIndex] : 0}
        />
      )}
      <section
        id='booking-room-dorm'
        className='p-8 pr-0 rounded-[0.5rem] bg-white mt-8 relative z-[0] xsm:px-4 xsm:pt-8 xsm:pb-0 xsm:bg-transparent xsm:rounded-none xsm:border-black/10 xsm:border-t xsm:mt-8'
      >
        <div className='flex items-center space-x-[0.625rem] mb-6 xsm:flex-col xsm:items-start'>
          <h3 className='text-[1.5rem] xsm:text-[1.125rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
            {t('textBookingRoomAndDorm')}
          </h3>
          <p className='text-[#2E2E2E]/60 text-[0.875rem] leading-[1.5] xsm:text-[0.75rem] xsm:leading-[1.4] xsm:mt-3'>
            (* {t('textPricesMayIncreaseOnWeekendsOrHolidays')})
          </p>
        </div>
        <ScrollArea className='max-h-[50.75rem] pr-4 mr-4 xsm:hidden'>
          <div className='space-y-4'>
            {rooms?.map((room, index) => (
              <RoomCard
                key={index}
                room={room}
                roomIndex={index}
                quantity={quantities[index] ?? 0}
                currentSlide={currentSlides[index] ?? 0}
                onSlideChange={handleSlideChange}
                onQuantityChange={handleChangeQuantity}
                onOpenGallery={setOpenGalleryIndex}
              />
            ))}
          </div>
        </ScrollArea>
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          className='hidden xsm:block w-full pb-8 [&_.swiper-pagination]:!bottom-0 [&_.swiper-pagination]:!relative [&_.swiper-pagination]:!mt-6 [&_.swiper-pagination]:!flex [&_.swiper-pagination]:!justify-center [&_.swiper-pagination]:!items-center [&_.swiper-pagination-bullet]:!size-[0.375rem] [&_.swiper-pagination-bullet]:!bg-[#2E2E2E]/30 [&_.swiper-pagination-bullet-active]:!bg-[#2E2E2E] [&_.swiper-pagination-bullet]:!mx-1 [&_.swiper-pagination-bullet]:!transition-all [&_.swiper-pagination-bullet]:!duration-300 [&_.swiper-pagination-bullet]:!rounded-full sm:hidden!'
          speed={800}
          grabCursor
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
          modules={[Pagination]}
        >
          {rooms?.map((room, index) => (
            <SwiperSlide key={index}>
              <RoomCard
                key={index}
                room={room}
                roomIndex={index}
                quantity={quantities[index] ?? 0}
                currentSlide={currentSlides[index] ?? 0}
                onSlideChange={handleSlideChange}
                onQuantityChange={handleChangeQuantity}
                onOpenGallery={setOpenGalleryIndex}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}

export default BookingRoom
