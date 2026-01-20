'use client'

import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { IHomePage } from '@/interface/homepage.interface'
import { ILocation } from '@/interface/taxonomy.interface'
import { useState, useMemo, useCallback } from 'react'
import { BannerTitle } from '@/modules/home/banner/_components/BannerTitle'
import { BookingForm } from '@/modules/home/banner/_components/desktop/BookingForm'
import BookingFormMobile from '@/modules/home/banner/_components/mobile/BookingFormMobile'

import dynamic from 'next/dynamic'

const BannerSlider = dynamic(() => import('@/modules/home/banner/_components/BannerSlider'), {
  ssr: false,
})

// Helper function để tạo date với time = 00:00:00
const createDateAtMidnight = (date: Date): Date => {
  const newDate = new Date(date)
  newDate.setHours(0, 0, 0, 0)
  return newDate
}

// Helper function để tạo ngày tiếp theo
const getNextDay = (date: Date): Date => {
  const nextDay = new Date(date)
  nextDay.setDate(nextDay.getDate() + 1)
  return nextDay
}

const BannerHomePage = ({ data, locations }: { data: IHomePage; locations: ILocation[] }) => {
  // Memoize default dates để tránh tính toán lại mỗi lần render
  const defaultDates = useMemo(() => {
    const today = createDateAtMidnight(new Date())
    const tomorrow = getNextDay(today)
    return { today, tomorrow }
  }, [])

  // Memoize default station để tránh tính toán lại
  const defaultStation = useMemo(
    () => locations[0]?.slug || '',
    [locations]
  )

  const [checkInDate, setCheckInDate] = useState<Date | undefined>(defaultDates.today)
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(defaultDates.tomorrow)
  const [selectedStation, setSelectedStation] = useState<string>(defaultStation)
  const [adults, setAdults] = useState<number>(2)
  const [children, setChildren] = useState<number>(1)

  // Memoize handlers để tránh tạo function mới mỗi lần render
  // Sử dụng functional updates cho checkOutDate để giảm dependency
  const handleCheckInChange = useCallback((date: Date | undefined) => {
    setCheckInDate(date)
    // Nếu check-in lớn hơn check-out, tự động cập nhật check-out thành ngày sau check-in 1 ngày
    if (date) {
      const checkInTime = createDateAtMidnight(date)
      setCheckOutDate((prevCheckOut) => {
        if (!prevCheckOut) return getNextDay(checkInTime)
        const checkOutTime = createDateAtMidnight(prevCheckOut)
        if (checkInTime >= checkOutTime) {
          return getNextDay(checkInTime)
        }
        return prevCheckOut
      })
    }
  }, [])

  const handleCheckOutChange = useCallback((date: Date | undefined) => {
    // Chỉ cho phép set check-out nếu nó lớn hơn check-in
    if (!date) {
      setCheckOutDate(date)
      return
    }

    const dateTime = createDateAtMidnight(date)
    // Cần đọc checkInDate hiện tại để so sánh, nên giữ dependency
    if (!checkInDate) {
      setCheckOutDate(date)
      return
    }

    const checkInTime = createDateAtMidnight(checkInDate)
    if (dateTime > checkInTime) {
      setCheckOutDate(date)
    }
  }, [checkInDate])

  return (
    <section className='relative'>
      <h1 className='sr-only'>Trạm Phượt</h1>

      <ProgressiveBlur
        blurIntensity={1.5}
        blurLayers={3}
        direction='bottom'
        className='w-full h-[16.375rem] opacity-70 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(2,3,5,0.08)_13.88%,#192842_100%)]  absolute bottom-0 left-0 z-[2] pointer-events-none'
      />
      <div className='w-full h-[100vh] tablet:h-[40vh] xsm:h-[80vh] overflow-hidden relative'>
        <BannerTitle title={data.banner.title} />
        <BannerSlider
          gallery={data?.banner?.gallery || []}
          galleryMobile={data?.banner?.gallery_mobile || []}
        />
        {/* Desktop */}
        <BookingForm
          stations={locations}
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
          stations={locations}
          selectedStation={selectedStation}
          onStationChange={setSelectedStation}
          adults={adults}
          children={children}
          onAdultsChange={setAdults}
          onChildrenChange={setChildren}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onCheckInChange={handleCheckInChange}
          onCheckOutChange={handleCheckOutChange}
        />
      </div>
    </section>
  )
}

export default BannerHomePage
