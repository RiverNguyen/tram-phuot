'use client'

import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldItem } from './FieldItem'
import { StationDrawer } from './StationDrawer'
import { GuestsDrawer } from './GuestsDrawer'
import { DateDrawer } from './DateDrawer'
import { SearchButton } from './SearchButton'

interface Station {
  name: string
  value: string
}

interface BookingFormMobileProps {
  stations: Station[]
  selectedStation: string
  onStationChange: (value: string) => void
  adults: number
  children: number
  onAdultsChange: (value: number) => void
  onChildrenChange: (value: number) => void
  checkInDate: Date | undefined
  checkOutDate: Date | undefined
  onCheckInChange: (date: Date | undefined) => void
  onCheckOutChange: (date: Date | undefined) => void
}

const BookingFormMobile = ({
  stations,
  selectedStation,
  onStationChange,
  adults,
  children,
  onAdultsChange,
  onChildrenChange,
  checkInDate,
  checkOutDate,
  onCheckInChange,
  onCheckOutChange,
}: BookingFormMobileProps) => {
  const t = useTranslations('HomePage.banner')
  const [openStationDrawer, setOpenStationDrawer] = useState(false)
  const [openGuestsDrawer, setOpenGuestsDrawer] = useState(false)
  const [openCheckInDrawer, setOpenCheckInDrawer] = useState(false)
  const [openCheckOutDrawer, setOpenCheckOutDrawer] = useState(false)

  const formatDate = (date: Date | undefined) => {
    if (!date) return { day: '', month: '' }
    const day = date.getDate()
    const month = t(`months.${date.getMonth()}`)
    return { day: day.toString().padStart(2, '0'), month }
  }

  return (
    <div className='absolute bottom-[2.26rem] left-[0.9375rem] right-[0.9375rem] xsm:block hidden z-[3]'>
      <div
        className='h-[2.5rem] p-[0.5rem_1rem] flex-center rounded-t-[1rem] w-fit'
        style={{
          background: 'linear-gradient(247deg, #03328C 12.24%, #00804D 106.2%), #F56E0A',
        }}
      >
        <p className='text-white text-[0.875rem] font-semibold leading-[1.6] tracking-[-0.00875rem]'>
          {t('text')}
        </p>
      </div>
      <div className='bg-white py-[0.625rem] w-full grid grid-cols-2 gap-y-[0.8125rem] relative'>
        <Separator
          orientation='vertical'
          className='absolute-center h-[7rem]'
        />
        <Separator className='absolute-center w-full h-[0.0325rem]' />
        <FieldItem
          label={t('station')}
          value={
            <p className='text-[1.25rem] font-medium leading-[1.1] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
              {stations.find((s) => s.value === selectedStation)?.name.toUpperCase() || 'CAOBANG'}
            </p>
          }
          onClick={() => setOpenStationDrawer(true)}
        />
        <FieldItem
          label={t('numberOfGuests')}
          value={
            <div className='flex items-center space-x-1'>
              <p className='text-[1.25rem] font-medium leading-[1.1] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
                {(adults + children).toString().padStart(2, '0')}
              </p>
              <p className='text-[#2e2e2e]/60 text-[0.625rem] font-medium leading-[1.6] tracking-[-0.00625rem]'>
                {adults} {adults === 1 ? t('adult') : t('adults')}
                {children > 0 && `, ${children} ${children === 1 ? t('child') : t('children')}`}
              </p>
            </div>
          }
          onClick={() => setOpenGuestsDrawer(true)}
        />
        <FieldItem
          label={t('checkIn')}
          value={
            <div className='flex items-center space-x-1'>
              <p className='text-[1.25rem] font-medium leading-[1.1] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
                {formatDate(checkInDate).day}
              </p>
              <p className='text-[#2e2e2e]/60 text-[0.625rem] font-medium leading-[1.6] tracking-[-0.00625rem]'>
                {formatDate(checkInDate).month}
              </p>
            </div>
          }
          onClick={() => setOpenCheckInDrawer(true)}
        />
        <FieldItem
          label={t('checkOut')}
          value={
            <div className='flex items-center space-x-1'>
              <p className='text-[1.25rem] font-medium leading-[1.1] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
                {formatDate(checkOutDate).day}
              </p>
              <p className='text-[#2e2e2e]/60 text-[0.625rem] font-medium leading-[1.6] tracking-[-0.00625rem]'>
                {formatDate(checkOutDate).month}
              </p>
            </div>
          }
          onClick={() => setOpenCheckOutDrawer(true)}
        />
      </div>
      <StationDrawer
        open={openStationDrawer}
        onOpenChange={setOpenStationDrawer}
        stations={stations}
        selectedStation={selectedStation}
        onStationChange={onStationChange}
      />
      <GuestsDrawer
        open={openGuestsDrawer}
        onOpenChange={setOpenGuestsDrawer}
        adults={adults}
        children={children}
        onAdultsChange={onAdultsChange}
        onChildrenChange={onChildrenChange}
      />
      <DateDrawer
        open={openCheckInDrawer}
        onOpenChange={setOpenCheckInDrawer}
        title={t('checkIn')}
        selectedDate={checkInDate}
        onDateChange={onCheckInChange}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          return date < today
        }}
      />
      <DateDrawer
        open={openCheckOutDrawer}
        onOpenChange={setOpenCheckOutDrawer}
        title={t('checkOut')}
        selectedDate={checkOutDate}
        onDateChange={onCheckOutChange}
        disabled={(date) => {
          const today = new Date()
          today.setHours(0, 0, 0, 0)
          if (date < today) return true
          if (checkInDate && date <= checkInDate) return true
          return false
        }}
      />
      <SearchButton />
    </div>
  )
}

export default BookingFormMobile
