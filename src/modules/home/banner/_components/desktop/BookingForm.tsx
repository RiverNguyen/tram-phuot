'use client'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { SubmitButton } from '@/modules/home/banner/_components/desktop/SubmitButton'
import { StationSelector } from '@/modules/home/banner/_components/desktop/StationSelector'
import { DatePickerField } from '@/modules/home/banner/_components/desktop/DatePickerField'
import { GuestCounter } from '@/modules/home/banner/_components/desktop/GuestCounter'
import { ILocation } from '@/interface/taxonomy.interface'

interface BookingFormProps {
  stations: ILocation[]
  selectedStation: string
  onStationChange: (value: string) => void
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onCheckInChange: (date: Date | undefined) => void
  onCheckOutChange: (date: Date | undefined) => void
  adults: number
  children: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
}

export const BookingForm = ({
  stations,
  selectedStation,
  onStationChange,
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
}: BookingFormProps) => {
  const t = useTranslations('HomePage.banner')
  
  // Tạo ngày hôm nay một lần để tái sử dụng
  const today = (() => {
    const date = new Date()
    date.setHours(0, 0, 0, 0)
    return date
  })()

  return (
    <div className='xsm:hidden absolute right-[7.5375rem] bottom-[3.5625rem] z-[3] flex w-[55.6875rem] flex-col'>
      <Image
        width={52}
        height={60}
        src='/home/decor.svg'
        alt='bg-banner'
        className='absolute top-1 -right-5 h-[3.72563rem] w-[3.25838rem] object-cover'
      />
      <div
        className='flex-center h-[2.5rem] w-fit px-[0.75rem_1.625rem]'
        style={{
          borderRadius: '1rem 1rem 0 0',
          background: 'linear-gradient(247deg, #03328C 12.24%, #00804D 106.2%), #F56E0A',
        }}
      >
        <p className='text-[1.125rem] font-semibold text-white'>{t('text')}</p>
      </div>
      <div
        className='flex-y-center relative h-[5.5rem] w-full rounded-br-[1.25rem] rounded-bl-[1rem] pl-[1.875rem]'
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <SubmitButton
          selectedStation={selectedStation}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          adults={adults}
          children={children}
        />

        <StationSelector
          stations={stations.map((station) => ({
            name: station.name,
            value: station.slug,
          }))}
          selectedStation={selectedStation}
          onStationChange={onStationChange}
        />

        <Separator
          orientation='vertical'
          className='mx-4 h-[3.75rem] border-[0.0325rem] border-black/6'
        />

        <DatePickerField
          label={t('checkIn')}
          date={checkInDate}
          onDateChange={onCheckInChange}
          disabled={(date) => {
            const dateTime = new Date(date)
            dateTime.setHours(0, 0, 0, 0)
            return dateTime < today
          }}
          fromDate={today}
          fromMonth={today}
        />

        <Separator
          orientation='vertical'
          className='mx-4 h-[3.75rem] border-[0.0325rem] border-black/6'
        />

        <DatePickerField
          label={t('checkOut')}
          date={checkOutDate}
          onDateChange={onCheckOutChange}
          disabled={(date) => {
            if (!checkInDate) return false
            const checkInTime = new Date(checkInDate)
            checkInTime.setHours(0, 0, 0, 0)
            const dateTime = new Date(date)
            dateTime.setHours(0, 0, 0, 0)
            return dateTime <= checkInTime
          }}
          fromDate={checkInDate || today}
          fromMonth={checkInDate || today}
        />

        <Separator
          orientation='vertical'
          className='mx-4 h-[3.75rem] border-[0.0325rem] border-black/6'
        />

        <GuestCounter
          adults={adults}
          children={children}
          onAdultsChange={onAdultsChange}
          onChildrenChange={onChildrenChange}
        />
      </div>
    </div>
  )
}
