'use client'

import { useState } from 'react'
import { IHotelDetail, ITaxonomies } from '@/interface/hotel.interface'
import Banner from '@/modules/detail-hotel/components/Banner'
import Overview from '@/modules/detail-hotel/components/overview'
import BookingRoom from './components/booking-room'
import Location from './components/location'
import Policy from './components/policy'
import BookingOverview from './components/booking-overview'
import { SectionVoucher } from '@/components/shared'

export default function DetailHotel({
  detailHotel,
  taxonomies,
  coupons,
}: {
  detailHotel: IHotelDetail
  taxonomies: ITaxonomies[]
  coupons: any
}) {
  type SelectedRoomSummary = {
    id: number | string
    index: number
    title: string
    quantity: number
    pricePerNight: number
    totalPrice: number
  }

  const [selectedRooms, setSelectedRooms] = useState<SelectedRoomSummary[]>([])
  const [clearRoomIndex, setClearRoomIndex] = useState<number | null>(null)

  const handleRemoveRoom = (id: number | string) => {
    const roomToRemove = selectedRooms.find((room) => room.id === id)
    if (roomToRemove) {
      setClearRoomIndex(roomToRemove.index)
      setSelectedRooms((prev) => prev.filter((room) => room.id !== id))
      // Reset clearRoomIndex after a short delay to allow BookingRoom to process it
      setTimeout(() => setClearRoomIndex(null), 100)
    }
  }

  const handleClearAllRooms = () => {
    if (selectedRooms.length > 0) {
      // Clear selectedRooms first
      setSelectedRooms([])

      // Clear each room index with a small delay to ensure BookingRoom processes each one
      selectedRooms.forEach((room, index) => {
        setTimeout(() => {
          setClearRoomIndex(room.index)
          // Reset clearRoomIndex after processing
          setTimeout(() => setClearRoomIndex(null), 50)
        }, index * 50)
      })
    }
  }

  return (
    <main className='xsm:pt-0 xsm:mt-0 relative bg-[#FDF4ED] pt-[7.625rem]'>
      <Banner detailHotel={detailHotel} />
      <div className='mx-auto mt-[5.75rem] flex max-w-[87.5rem] space-x-[1.875rem]'>
        <div className='flex-1 min-w-0'>
          <Overview
            overview={detailHotel?.acf?.overview || {}}
            taxonomies={taxonomies}
          />
          <BookingRoom
            rooms={detailHotel?.acf?.room_and_dorm?.select || []}
            onChangeSelection={setSelectedRooms}
            clearRoomIndex={clearRoomIndex}
          />
          <Location location={detailHotel?.acf?.location || {}} />
          <SectionVoucher tourCoupons={coupons || []} />
          <Policy policy={detailHotel?.acf?.policy || {}} />
        </div>
        <div className='w-[27.75rem] bg-white rounded-[0.5rem] px-[1.375rem] py-4 h-fit sticky top-22 max-h-[42rem] overflow-y-auto'>
          <BookingOverview
            selectedRooms={selectedRooms}
            onRemoveRoom={handleRemoveRoom}
            onClearAllRooms={handleClearAllRooms}
            detailHotel={detailHotel}
          />
        </div>
      </div>
    </main>
  )
}
