'use client'

import { ICChevron } from '@/components/icons'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { useTranslations } from 'next-intl'

interface Station {
  name: string
  value: string
}

interface StationSelectorProps {
  stations: Station[]
  selectedStation: string
  onStationChange: (value: string) => void
}

export const StationSelector = ({
  stations,
  selectedStation,
  onStationChange,
}: StationSelectorProps) => {
  const t = useTranslations('HomePage.banner')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='flex items-end space-x-[1.125rem] cursor-pointer'>
          <div className='space-y-1'>
            <p className='text-[#2e2e2e] text-[0.875rem] leading-[1.6]'>{t('station')}</p>
            <h3 className='text-[2.125rem] font-medium leading-[0.9] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
              {stations.find((s) => s.value === selectedStation)?.name.toUpperCase() ||
                'CAOBANG'}
            </h3>
          </div>
          <ICChevron className='size-4 text-black opacity-24' />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='w-[13.5625rem] py-[0.9375rem] px-4 rounded-[0.25rem] shadow-[0_0_40px_0_rgba(0,0,0,0.06)] ml-[-1.875rem]'
        align='start'
      >
        <RadioGroup
          value={selectedStation}
          onValueChange={onStationChange}
          className='space-y-3'
        >
          {stations.map((station) => (
            <div
              key={station.value}
              className='flex items-center space-x-2'
            >
              <RadioGroupItemCustom
                value={station.value}
                id={station.value}
              />
              <Label
                htmlFor={station.value}
                className='text-[#303030] text-[0.875rem] font-normal leading-[1.5] cursor-pointer'
              >
                {station.name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </PopoverContent>
    </Popover>
  )
}

