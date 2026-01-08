'use client'

import { useState, useMemo } from 'react'
import { IHotelDetail, ITaxonomies } from '@/interface/hotel.interface'
import Banner from '@/modules/detail-hotel/components/Banner'
import Overview from '@/modules/detail-hotel/components/overview'
import BookingRoom from './components/booking-room'
import Location from './components/location'
import Policy from './components/policy'
import BookingOverview from './components/booking-overview'
import { SectionVoucher } from '@/components/shared'
import BrandButton2 from '@/components/shared/BrandButton2'
import DrawerProvider from '@/components/provider/DrawerProvider'
import { formatUSD, normalizePrice } from '@/lib/utils'

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
  const [openBookingOverview, setOpenBookingOverview] = useState(false)

  // Calculate total price from selected rooms
  const totalPrice = useMemo(() => {
    return selectedRooms.reduce((total, room) => {
      const normalizedPrice = normalizePrice(room.pricePerNight)
      return total + normalizedPrice * room.quantity
    }, 0)
  }, [selectedRooms])

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
      <div className='mx-auto mt-[5.75rem] flex max-w-[87.5rem] space-x-[1.875rem] xsm:mt-0 xsm:space-x-0 xsm:pt-8 xsm:border-t xsm:border-black/10'>
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
          <div className='mt-8 xsm:mt-0'>
            <SectionVoucher tourCoupons={coupons || []} />
          </div>
          <Policy policy={detailHotel?.acf?.policy || {}} />
        </div>
        <div className='w-[27.75rem] bg-white rounded-[0.5rem] px-[1.375rem] py-4 h-fit sticky top-22 xsm:hidden'>
          <BookingOverview
            selectedRooms={selectedRooms}
            onRemoveRoom={handleRemoveRoom}
            onClearAllRooms={handleClearAllRooms}
            detailHotel={detailHotel}
          />
        </div>
        <div className='fixed w-[21.4375rem] h-[3.75rem] sm:hidden left-4 right-4 bottom-4 p-[0.625rem_0.75rem] rounded-[0.75rem] bg-black/50 backdrop-blur-[10px] flex-between'>
          <div className=''>
            <p className='text-white text-[0.875rem] leading-[1.5] mb-1'>Total</p>
            <p className='text-[#FF7B4A] font-bold font-phu-du leading-[1.1]'>
              {formatUSD(totalPrice)} USD
            </p>
          </div>
          <BrandButton2
            type='button'
            className='h-[2.5rem]! px-[1.875rem]! rounded-[0.625rem]!'
            onClick={() => setOpenBookingOverview(true)}
          >
            <p className='text-[#F9EAD5] text-[0.75rem] font-semibold leading-[1.2] uppercase'>
              Detail
            </p>
          </BrandButton2>
        </div>

        {/* Mobile Booking Overview Drawer */}
        <DrawerProvider
          open={openBookingOverview}
          setOpen={setOpenBookingOverview}
          showDrawerDrag={false}
          className='rounded-t-[0.5rem] p-4'
        >
          <BookingOverview
            selectedRooms={selectedRooms}
            onRemoveRoom={handleRemoveRoom}
            onClearAllRooms={handleClearAllRooms}
            detailHotel={detailHotel}
            onClose={() => setOpenBookingOverview(false)}
          />
        </DrawerProvider>
      </div>
    </main>
  )
}
