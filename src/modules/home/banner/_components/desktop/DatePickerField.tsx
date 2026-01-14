'use client'

import { ICChevron } from '@/components/icons'
import { CalendarCustom } from '@/components/ui/calendar-custom'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

interface DatePickerFieldProps {
  label: string
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  disabled?: (date: Date) => boolean
  fromDate?: Date
  fromMonth?: Date
}

export const DatePickerField = ({ label, date, onDateChange, disabled, fromDate, fromMonth }: DatePickerFieldProps) => {
  const t = useTranslations('HomePage.banner')
  const locale = useLocale()

  const formatDate = (date: Date | undefined) => {
    if (!date) return { day: '', month: '' }
    const day = date.getDate()
    const month = t(`months.${date.getMonth()}`)
    return { day: day.toString().padStart(2, '0'), month }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'flex cursor-pointer items-end space-x-2',
            locale === 'vi' ? 'ml-1' : 'ml-5.5',
          )}
        >
          <div className='space-y-1'>
            <p className='text-body-t1 text-[0.875rem] leading-[1.6]'>{label}</p>
            <div className='flex items-center space-x-2'>
              <p className='font-phu-du w-fit bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] bg-clip-text text-[2.125rem] leading-[0.9] font-medium text-transparent'>
                {formatDate(date).day}
              </p>
              <p className='text-body-t1/60 bg-transparent text-[0.75rem] leading-[1.6] font-medium tracking-[-0.0075rem]'>
                {formatDate(date).month}
              </p>
            </div>
          </div>
          <ICChevron className='size-4 text-black opacity-24' />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='-ml-8 w-89 pt-4 pb-6'
        align='start'
      >
        <CalendarCustom
          mode='single'
          selected={date}
          onSelect={onDateChange}
          disabled={disabled}
          fromDate={fromDate}
          fromMonth={fromMonth}
          className='w-full rounded-md border-0'
          localeCode={locale}
        />
      </PopoverContent>
    </Popover>
  )
}
