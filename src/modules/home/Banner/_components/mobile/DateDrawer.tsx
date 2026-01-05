'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import { CalendarCustom } from '@/components/ui/calendar-custom'
import { useTranslations, useLocale } from 'next-intl'
import { DrawerHeader } from './DrawerHeader'
import { ApplyButton } from './ApplyButton'

interface DateDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
}

export const DateDrawer = ({
  open,
  onOpenChange,
  title,
  selectedDate,
  onDateChange,
  disabled,
}: DateDrawerProps) => {
  const locale = useLocale()

  return (
    <DrawerProvider
      open={open}
      setOpen={onOpenChange}
      showDrawerDrag={false}
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
            className='rounded-md border-0 w-full'
            localeCode={locale}
          />
        </div>
      </div>
      <ApplyButton onClick={() => onOpenChange(false)} />
    </DrawerProvider>
  )
}


