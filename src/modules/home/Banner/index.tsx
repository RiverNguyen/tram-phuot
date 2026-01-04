'use client'

import { useState } from 'react'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { IHomePage } from '@/interface/homepage.interface'
import { BannerSlider } from '@/modules/home/Banner/_components/BannerSlider'
import { BannerTitle } from '@/modules/home/Banner/_components/BannerTitle'
import { BookingForm } from '@/modules/home/Banner/_components/desktop/BookingForm'
import BookingFormMobile from '@/modules/home/Banner/_components/mobile/BookingFormMobile'

const stations = [
  {
    name: 'Cao Bang',
    value: 'caobang',
  },
  {
    name: 'Sapa',
    value: 'sapa',
  },
  {
    name: 'Ha Giang',
    value: 'hagiang',
  },
  {
    name: 'Ta Xua',
    value: 'taxua',
  },
]

const BannerHomePage = ({ data }: { data: IHomePage }) => {
  // Lấy ngày hiện tại và ngày mai làm giá trị mặc định
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [checkInDate, setCheckInDate] = useState<Date | undefined>(today)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(tomorrow)
  const [selectedStation, setSelectedStation] = useState<string>('caobang')
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(1)

  const handleCheckInChange = (date: Date | undefined) => {
    setCheckInDate(date)
    // Nếu check-in lớn hơn check-out, tự động cập nhật check-out thành ngày sau check-in 1 ngày
    if (date && checkOutDate && date >= checkOutDate) {
      const nextDay = new Date(date)
      nextDay.setDate(nextDay.getDate() + 1)
      setCheckOutDate(nextDay)
    }
  }

  const handleCheckOutChange = (date: Date | undefined) => {
    // Chỉ cho phép set check-out nếu nó lớn hơn check-in
    if (date && checkInDate && date <= checkInDate) {
      return // Không cho phép set nếu check-out <= check-in
    }
    setCheckOutDate(date)
  }

  return (
    <section className='relative'>
      <h1 className='sr-only'>Trạm Phượt</h1>

      <ProgressiveBlur
        blurIntensity={2}
        direction='bottom'
        className='w-full h-[16.375rem] opacity-70 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)]  absolute bottom-0 left-0 z-[2] pointer-events-none'
      />
      <div className='w-full h-screen overflow-hidden relative'>
        <BannerTitle title={data.banner.title} />
        <BannerSlider
          gallery={data?.banner?.gallery || []}
          galleryMobile={data?.banner?.gallery_mobile || []}
        />
        {/* Desktop */}
        <BookingForm
          stations={stations}
          selectedStation={selectedStation}
          onStationChange={setSelectedStation}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
          adults={adults}
          children={children}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
        />

        {/* Mobile */}
        <BookingFormMobile
          stations={stations}
          selectedStation={selectedStation}
          onStationChange={setSelectedStation}
        />
      </div>
    </section>
  )
}

export default BannerHomePage
