'use client'

import ICTrash from '@/components/icons/ICTrash'

type Room = {
  id: number | string
  index: number
  title: string
  quantity: number
  pricePerNight: number
  totalPrice: number
}

type RoomCardProps = {
  room: Room
  onRemove?: (id: number | string) => void
  formatUSD: (amount: number) => string
}

export default function RoomCard({ room, onRemove, formatUSD }: RoomCardProps) {
  return (
    <div className='p-4 bg-[#f8f8f8] rounded-[1rem]'>
      <div className='flex-between mb-[1.375rem]'>
        <p className='text-[#2e2e2e] font-phu-du leading-[1.3] font-semibold line-clamp-1 w-[80%]'>
          {room.title}
        </p>
        <button
          type='button'
          onClick={() => onRemove?.(room.id)}
          className='text-[#E34A20] hover:opacity-80 transition-opacity cursor-pointer'
          aria-label='Remove room'
        >
          <ICTrash className='size-5' />
        </button>
      </div>
      <div className='flex-between'>
        <p className='text-[#2e2e2e]/60 text-[0.875rem] leading-[1.5] opacity-80'>
          {room.quantity} Room
        </p>
        <p className='text-[#2e2e2e] text-[0.875rem] font-semibold leading-[1.6] tracking-[-0.00875rem]'>
          Price:{' '}
          <span className='font-phu-du font-bold text-base leading-[1.1] text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)]'>
            {formatUSD(room.pricePerNight)} USD
          </span>
          <span className='text-[0.875rem] font-normal leading-[1.5] ml-1'>/night</span>
          <span className='text-[0.875rem] font-normal leading-[1.5] ml-1'>/room</span>
        </p>
      </div>
    </div>
  )
}
