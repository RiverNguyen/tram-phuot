'use client'

import { useEffect, useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { IRoom } from '@/interface/hotel.interface'
import Image from 'next/image'

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
  const [quantities, setQuantities] = useState<number[]>(() => rooms?.map(() => 0) ?? [])

  useEffect(() => {
    setQuantities(rooms?.map(() => 0) ?? [])
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

        const pricePerNight = Number(room?.acf?.price_reduced ?? room?.acf?.price ?? 0)

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

      onChangeSelection(summaries)
    }
  }, [quantities, rooms, onChangeSelection])

  const handleChangeQuantity = (roomIndex: number, delta: number) => {
    setQuantities((prev) => {
      const next = prev.map((quantity, index) =>
        index === roomIndex ? Math.max(0, quantity + delta) : quantity,
      )
      return next
    })
  }

  return (
    <section className='p-8 pr-0 rounded-[0.5rem] bg-white mt-8'>
      <div className='flex items-center space-x-[0.625rem] mb-6'>
        <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
          BOOKING ROOM & DORM
        </h3>
        <p className='text-[#2E2E2E]/60 text-[0.875rem] leading-[1.5]'>
          (* Prices may increase on weekends or holidays)
        </p>
      </div>
      <ScrollArea className='h-[50.75rem] pr-4 mr-4'>
        <div className='space-y-4'>
          {rooms?.map((room, index) => (
            <div
              key={index}
              className='rounded-[0.5rem] bg-[#f8f8f8] w-full flex space-x-[1.5rem] overflow-hidden'
            >
              <Image
                src={room?.acf?.gallery?.[0]}
                alt={room?.title}
                width={310}
                height={230}
                className='w-[19.25rem] object-cover'
              />
              <div className='pt-3 pb-[1.125rem]'>
                <div className='flex space-x-1 items-center rounded-[0.25rem] bg-[#2BAB7D] h-[1.25rem] px-2 w-fit'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    className='size-3'
                  >
                    <path
                      d='M6.00141 7.08375C4.93641 7.08375 4.06641 6.21875 4.06641 5.14875C4.06641 4.07875 4.93641 3.21875 6.00141 3.21875C7.06641 3.21875 7.93641 4.08375 7.93641 5.15375C7.93641 6.22375 7.06641 7.08375 6.00141 7.08375ZM6.00141 3.96875C5.35141 3.96875 4.81641 4.49875 4.81641 5.15375C4.81641 5.80875 5.34641 6.33875 6.00141 6.33875C6.65641 6.33875 7.18641 5.80875 7.18641 5.15375C7.18641 4.49875 6.65141 3.96875 6.00141 3.96875Z'
                      fill='white'
                    />
                    <path
                      d='M6.00082 11.38C5.26082 11.38 4.51582 11.1 3.93582 10.545C2.46082 9.125 0.830821 6.86 1.44582 4.165C2.00082 1.72 4.13582 0.625 6.00082 0.625C6.00082 0.625 6.00082 0.625 6.00582 0.625C7.87082 0.625 10.0058 1.72 10.5608 4.17C11.1708 6.865 9.54082 9.125 8.06582 10.545C7.48582 11.1 6.74082 11.38 6.00082 11.38ZM6.00082 1.375C4.54582 1.375 2.67582 2.15 2.18082 4.33C1.64082 6.685 3.12082 8.715 4.46082 10C5.32582 10.835 6.68082 10.835 7.54582 10C8.88082 8.715 10.3608 6.685 9.83082 4.33C9.33082 2.15 7.45582 1.375 6.00082 1.375Z'
                      fill='white'
                    />
                  </svg>
                  <p className='text-white text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                    {room?.taxonomies?.['locations']?.[0]?.name}
                  </p>
                </div>
                <h4 className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1] w-[21.8125rem] line-clamp-2 mt-[0.625rem]'>
                  {room?.title}
                </h4>
                <div className='my-[1.125rem] space-y-5'>
                  <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                    Area <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.area}</strong>
                  </p>
                  <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                    Room type{' '}
                    <strong className='text-[#2e2e2e] ml-1'>
                      {room?.taxonomies?.['room-and-dorm-type']
                        ?.map((type) => type.name)
                        .join(', ')}
                    </strong>
                  </p>
                  <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem]'>
                    Number of beds{' '}
                    <strong className='text-[#2e2e2e] ml-1'>{room?.acf?.number_of_beds}</strong>
                  </p>
                </div>
                <Separator className='w-[31.875rem] bg-[#EDEDED] mb-[1.125rem]' />
                <div className='flex items-center justify-between'>
                  <div>
                    {room?.acf?.price_reduced ? (
                      <div className='flex space-x-[0.375rem]'>
                        <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1]'>
                          {room?.acf?.price_reduced} USD
                        </p>
                        <p className='text-[#2e2e2e]/40 line-through font-phu-du text-[1.125rem] font-medium leading-[1.1] relative'>
                          {room?.acf?.price} USD
                          <p className='text-[#2e2e2e]/40 font-montserrat text-[0.75rem] font-medium leading-[1.6] absolute -top-1 -right-10'>
                            /night
                          </p>
                        </p>
                      </div>
                    ) : (
                      <p className='text-[#2e2e2e] font-phu-du text-[1.125rem] font-medium leading-[1.1]'>
                        {room?.acf?.price} USD
                      </p>
                    )}
                  </div>
                  <div className='flex items-center space-x-[0.625rem]'>
                    <button
                      type='button'
                      onClick={() => handleChangeQuantity(index, -1)}
                      className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                      disabled={quantities[index] === 0}
                      aria-label='Decrease room quantity'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='12'
                        height='2'
                        viewBox='0 0 12 2'
                        fill='none'
                        className='w-[0.58rem] h-auto'
                      >
                        <path
                          d='M1 1H10.3333'
                          stroke='#2E2E2E'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                    <p className='text-[#2e2e2e] text-[0.75rem] font-semibold leading-[1.6] tracking-[-0.0075rem]'>
                      {quantities[index]} Room
                    </p>
                    <button
                      type='button'
                      onClick={() => handleChangeQuantity(index, 1)}
                      className='size-[1.875rem] flex-center rounded-full border border-[#ddd] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)] cursor-pointer hover:bg-gray-50 transition-colors disabled:cursor-not-allowed disabled:opacity-50'
                      aria-label='Increase room quantity'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        className='size-4'
                      >
                        <path
                          d='M4 8H12'
                          stroke='#2E2E2E'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                        <path
                          d='M8 12V4'
                          stroke='#2E2E2E'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  )
}

export default BookingRoom
