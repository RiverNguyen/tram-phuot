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
}

export const DatePickerField = ({
  label,
  date,
  onDateChange,
  disabled,
}: DatePickerFieldProps) => {
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
            'flex items-end space-x-2 cursor-pointer',
            locale === 'vi' ? 'ml-1' : 'ml-[1.375rem]',
          )}
        >
          <div className='space-y-1'>
            <p className='text-[#2e2e2e] text-[0.875rem] leading-[1.6]'>{label}</p>
            <div className='flex items-center space-x-2'>
              <p className='text-[2.125rem] font-medium leading-[0.9] font-phu-du text-transparent bg-clip-text bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit'>
                {formatDate(date).day}
              </p>
              <p className='text-[#2e2e2e]/60 text-[0.75rem] font-medium leading-[1.6] tracking-[-0.0075rem] bg-transparent'>
                {formatDate(date).month}
              </p>
            </div>
          </div>
          <ICChevron className='size-4 text-black opacity-24' />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className='w-[22.25rem] pt-4 pb-6 ml-[-2rem]'
        align='start'
      >
        <CalendarCustom
          mode='single'
          selected={date}
          onSelect={onDateChange}
          disabled={disabled}
          className='rounded-md border-0 w-full'
          localeCode={locale}
        />
      </PopoverContent>
    </Popover>
  )
}

