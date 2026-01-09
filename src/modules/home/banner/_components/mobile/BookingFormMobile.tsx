'use client'

import { Separator } from '@/components/ui/separator'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FieldItem } from '@/modules/home/banner/_components/mobile/FieldItem'
import { StationDrawer } from '@/modules/home/banner/_components/mobile/StationDrawer'
import { GuestsDrawer } from '@/modules/home/banner/_components/mobile/GuestsDrawer'
import { DateDrawer } from '@/modules/home/banner/_components/mobile/DateDrawer'
import { SearchButton } from '@/modules/home/banner/_components/mobile/SearchButton'
import { ILocation } from '@/interface/taxonomy.interface'

interface BookingFormMobileProps {
  stations: ILocation[]
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
    <div className='xsm:block absolute right-[0.9375rem] bottom-[2.26rem] left-[0.9375rem] z-[3] hidden'>
      <div
        className='flex-center h-[2.5rem] w-fit rounded-t-[1rem] p-[0.5rem_1rem]'
        style={{
          background: 'linear-gradient(247deg, #03328C 12.24%, #00804D 106.2%), #F56E0A',
        }}
      >
        <p className='text-[0.875rem] leading-[1.6] font-semibold tracking-[-0.00875rem] text-white'>
          {t('text')}
        </p>
      </div>
      <div className='relative grid w-full grid-cols-2 gap-y-[0.8125rem] bg-white py-[0.625rem]'>
        <Separator
          orientation='vertical'
          className='absolute-center h-[7rem]'
        />
        <Separator className='absolute-center h-[0.0325rem] w-full' />
        <FieldItem
          label={t('station')}
          value={
            <p className='font-phu-du w-fit bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[1.25rem] leading-[1.1] font-medium text-transparent'>
              {stations.find((s) => s.slug === selectedStation)?.name.toUpperCase() ||
                stations[0].name.toUpperCase()}
            </p>
          }
          onClick={() => setOpenStationDrawer(true)}
        />
        <FieldItem
          label={t('numberOfGuests')}
          value={
            <div className='flex items-center space-x-1'>
              <p className='font-phu-du w-fit bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[1.25rem] leading-[1.1] font-medium text-transparent'>
                {(adults + children).toString().padStart(2, '0')}
              </p>
              <p className='text-[0.625rem] leading-[1.6] font-medium tracking-[-0.00625rem] text-[#2e2e2e]/60'>
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
              <p className='font-phu-du w-fit bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[1.25rem] leading-[1.1] font-medium text-transparent'>
                {formatDate(checkInDate).day}
              </p>
              <p className='text-[0.625rem] leading-[1.6] font-medium tracking-[-0.00625rem] text-[#2e2e2e]/60'>
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
              <p className='font-phu-du w-fit bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[1.25rem] leading-[1.1] font-medium text-transparent'>
                {formatDate(checkOutDate).day}
              </p>
              <p className='text-[0.625rem] leading-[1.6] font-medium tracking-[-0.00625rem] text-[#2e2e2e]/60'>
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
        stations={stations.map((station) => ({
          name: station.name,
          value: station.slug,
        }))}
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
      <SearchButton
        selectedStation={selectedStation}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        adults={adults}
        children={children}
      />
    </div>
  )
}

export default BookingFormMobile
