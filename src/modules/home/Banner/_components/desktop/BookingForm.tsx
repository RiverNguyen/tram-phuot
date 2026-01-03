'use client'

import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { DatePickerField } from '@/modules/home/Banner/_components/desktop/DatePickerField'
import { GuestCounter } from '@/modules/home/Banner/_components/desktop/GuestCounter'
import { StationSelector } from '@/modules/home/Banner/_components/desktop/StationSelector'
import { SubmitButton } from '@/modules/home/Banner/_components/desktop/SubmitButton'

interface Station {
  name: string
  value: string
}

interface BookingFormProps {
  stations: Station[]
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

  return (
    <div className='w-[55.6875rem] absolute bottom-[3.5625rem] right-[7.5375rem] z-[3] flex flex-col xsm:hidden'>
      <Image
        width={52}
        height={60}
        src='/home/decor.svg'
        alt='bg-banner'
        className='w-[3.25838rem] h-[3.72563rem] object-cover absolute -right-5 top-1'
      />
      <div
        className='h-[2.5rem] px-[0.75rem_1.625rem] flex-center w-fit'
        style={{
          borderRadius: '1rem 1rem 0 0',
          background: 'linear-gradient(247deg, #03328C 12.24%, #00804D 106.2%), #F56E0A',
        }}
      >
        <p className='text-white text-[1.125rem] font-semibold'>{t('text')}</p>
      </div>
      <div
        className='w-full h-[5.5rem] rounded-bl-[1rem] rounded-br-[1.25rem] relative pl-[1.875rem] flex-y-center'
        style={{
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <SubmitButton />

        <StationSelector
          stations={stations}
          selectedStation={selectedStation}
          onStationChange={onStationChange}
        />

        <Separator
          orientation='vertical'
          className='h-[3.75rem] mx-4 border-[0.0325rem] border-black/6'
        />

        <DatePickerField
          label={t('checkIn')}
          date={checkInDate}
          onDateChange={onCheckInChange}
        />

        <Separator
          orientation='vertical'
          className='h-[3.75rem] mx-4 border-[0.0325rem] border-black/6'
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
        />

        <Separator
          orientation='vertical'
          className='h-[3.75rem] mx-4 border-[0.0325rem] border-black/6'
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
