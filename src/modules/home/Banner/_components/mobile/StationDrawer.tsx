'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItemCustom } from '@/components/ui/radio-group'
import { useTranslations } from 'next-intl'
import { DrawerHeader } from './DrawerHeader'
import { ApplyButton } from './ApplyButton'

interface Station {
  name: string
  value: string
}

interface StationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  stations: Station[]
  selectedStation: string
  onStationChange: (value: string) => void
}

export const StationDrawer = ({
  open,
  onOpenChange,
  stations,
  selectedStation,
  onStationChange,
}: StationDrawerProps) => {
  const t = useTranslations('HomePage.banner')

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
      showDrawerDrag={false}
    >
      <div className='pt-[1.5rem] pb-4'>
        <DrawerHeader
          title={t('station')}
          onClose={() => onOpenChange(false)}
        />
        <RadioGroup
          value={selectedStation}
          onValueChange={onStationChange}
          className='space-y-3 px-4'
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
      </div>
      <ApplyButton onClick={() => onOpenChange(false)} />
    </DrawerProvider>
  )
}

