'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import { CalendarCustom } from '@/components/ui/calendar-custom'
import { useLocale } from 'next-intl'
import { ApplyButton } from '@/modules/home/banner/_components/mobile/ApplyButton'
import { DrawerHeader } from '@/modules/home/banner/_components/mobile/DrawerHeader'

interface DateDrawerProps {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  fromDate?: Date
  fromMonth?: Date
}

export const DateDrawer = ({
  open,
  onOpenChange,
  title,
  selectedDate,
  onDateChange,
  disabled,
  fromDate,
  fromMonth,
}: DateDrawerProps) => {
  const locale = useLocale()

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
      showDrawerDrag={true}
    >
      <div className='pt-[1.5rem] pb-4'>
        <DrawerHeader
          title={title}
          onClose={() => onOpenChange(false)}
        />
        <div className='px-4'>
          <CalendarCustom
            mode='single'
            selected={selectedDate}
            onSelect={onDateChange}
            disabled={disabled}
            fromDate={fromDate}
            fromMonth={fromMonth}
            className='rounded-md border-0 w-full'
            localeCode={locale}
          />
        </div>
      </div>
      <ApplyButton onClick={() => onOpenChange(false)} />
    </DrawerProvider>
  )
}
