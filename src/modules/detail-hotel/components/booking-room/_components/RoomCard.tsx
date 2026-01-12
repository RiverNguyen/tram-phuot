'use client'

import { Separator } from '@/components/ui/separator'
import { IRoom } from '@/interface/hotel.interface'
import RoomImageSlider from './RoomImageSlider'
import RoomInfo from './RoomInfo'
import RoomPrice from './RoomPrice'
import QuantitySelector from './QuantitySelector'
import { useTranslations } from 'next-intl'

type RoomCardProps = {
  room: IRoom
  roomIndex: number
  quantity: number
  currentSlide: number
  onSlideChange: (roomIndex: number, activeIndex: number) => void
  onQuantityChange: (roomIndex: number, delta: number) => void
  onOpenGallery: (roomIndex: number) => void
}

const RoomCard = ({
  room,
  roomIndex,
  quantity,
  currentSlide,
  onSlideChange,
  onQuantityChange,
  onOpenGallery,
}: RoomCardProps) => {
  const images = room?.acf?.gallery ?? []
  const t = useTranslations('DetailHotelPage')
  return (
    <div className='rounded-[0.5rem] bg-[#f8f8f8] w-full flex overflow-hidden xsm:flex-col xsm:bg-[#FFFFFF]'>
      <RoomImageSlider
        images={images}
        roomTitle={room?.title ?? t('textRoom')}
        roomIndex={roomIndex}
        currentSlide={currentSlide}
        onSlideChange={(activeIndex) => onSlideChange(roomIndex, activeIndex)}
        onOpenGallery={() => onOpenGallery(roomIndex)}
      />

      <div className='pt-3 pb-[1.125rem] xsm:p-4'>
        <RoomInfo room={room} />
        <Separator className='w-[31.875rem] bg-[#EDEDED] mb-[1.125rem] xsm:w-full xsm:mb-4' />
        <div className='flex items-center justify-between'>
          <RoomPrice
            price={room?.acf?.price}
            priceReduced={room?.acf?.price_reduced}
          />
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => onQuantityChange(roomIndex, -1)}
            onIncrease={() => onQuantityChange(roomIndex, 1)}
          />
        </div>
      </div>
    </div>
  )
}

export default RoomCard
