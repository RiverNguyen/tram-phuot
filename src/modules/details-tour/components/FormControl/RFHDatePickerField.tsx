'use client'
import { format, startOfDay } from 'date-fns'
import { useState } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import useIsMobile from '@/hooks/useIsMobile'
import { cn } from '@/lib/utils'
import ICCalendar from '@/components/icons/ICCalendar'
import { CalendarCustom } from '@/components/ui/calendar-custom'
import { useLocale, useTranslations } from 'next-intl'
import DrawerProvider from '@/components/provider/DrawerProvider'
import ICClose from '@/components/icons/ICClose'

interface RFHDatePickerFieldProps {
  label?: string
  placeholder?: string
  className?: string
  disabled?: boolean
  required?: boolean
  field: ControllerRenderProps<any, any>
}

export default function RFHDatePickerField({
  label,
  placeholder,
  field,
  required,
  disabled,
  className,
}: RFHDatePickerFieldProps) {
  const t = useTranslations('BookingTourForm')
  const isMobile = useIsMobile()
  const [open, setOpen] = useState<boolean>(false)
  const locale = useLocale()

  const handleSelect = (date?: Date) => {
    if (!date) return
    field.onChange(date)
    setOpen(false)
  }

  return (
    <FormItem className={cn('xsm:gap-y-1.5 font-montserrat flex flex-col gap-y-2', className)}>
      {label && (
        <FormLabel className='xsm:text-[0.8125rem] text-body/75 gap-0.5 space-x-1 text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
          <span>{label}</span>
          {required && <span className='text-[#EF2020]'>*</span>}
        </FormLabel>
      )}
      {!isMobile && (
        <Popover
          open={open}
          onOpenChange={setOpen}
        >
          <PopoverTrigger
            asChild
            className='xsm:hidden w-full shadow-none!'
          >
            <FormControl className='w-full'>
              <Button
                type='button'
                ref={field.ref}
                disabled={disabled}
                variant={'outline'}
                className={cn(
                  'h-13 w-full cursor-pointer rounded-[0.625rem] border-[0.8px] border-solid border-[#EDEDED] bg-white! px-3.5 py-3 text-left text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)]! opacity-100!',
                  disabled &&
                    'pointer-events-none cursor-not-allowed text-[rgba(48,48,48,0.30)] opacity-50!',
                )}
              >
                {field.value instanceof Date ? (
                  format(field.value, 'dd/MM/yyyy')
                ) : (
                  <span>{placeholder}</span>
                )}
                <ICCalendar className={cn('ml-auto size-5.5', disabled && 'opacity-50')} />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent
            className='w-auto p-0'
            align='start'
          >
            <CalendarCustom
              mode='single'
              selected={field.value instanceof Date ? field.value : undefined}
              onSelect={handleSelect}
              disabled={(date) => startOfDay(date) <= startOfDay(new Date())}
              className='font-montserrat rounded-md border-0 p-4'
              localeCode={locale}
            />
          </PopoverContent>
        </Popover>
      )}

      {isMobile && (
        <FormControl>
          <div>
            <Button
              type='button'
              ref={field.ref}
              onClick={() => setOpen(true)}
              disabled={disabled}
              variant={'outline'}
              className={cn(
                'h-12.5 w-full cursor-pointer rounded-[0.625rem] border-[0.8px] border-solid border-[#EDEDED] bg-white! px-3 text-left text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[rgba(46,46,46,0.75)]! opacity-100! shadow-none',
                disabled &&
                  'pointer-events-none cursor-not-allowed text-[rgba(48,48,48,0.30)] opacity-50!',
              )}
            >
              {field.value instanceof Date ? (
                format(field.value, 'dd/MM/yyyy')
              ) : (
                <span>{placeholder}</span>
              )}
              <ICCalendar className={cn('ml-auto size-5', disabled && 'opacity-50')} />
            </Button>
            <DrawerProvider
              open={open}
              setOpen={setOpen}
              showDrawerDrag={false}
            >
              <div className='pt-3.25'>
                <div className='mb-3 flex items-center justify-between border-b border-solid border-[#EDEDED] px-4 pb-3'>
                  <p className='font-phu-du section-title-h2 text-[1rem] leading-[1.1] font-bold'>
                    {label}
                  </p>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='flex-center size-8'
                  >
                    <ICClose className='size-[0.8rem] text-black' />
                  </button>
                </div>
                <CalendarCustom
                  mode='single'
                  selected={field.value instanceof Date ? field.value : undefined}
                  onSelect={handleSelect}
                  disabled={(date) => startOfDay(date) <= startOfDay(new Date())}
                  className='font-montserrat mb-6 rounded-md border-0 p-4'
                  localeCode={locale}
                />

                <div className='border-t-[0.5px] border-solid border-[#EDEDED] px-4 pt-5 pb-4'>
                  <button
                    type='button'
                    onClick={() => setOpen(false)}
                    className='bg-button-ph flex-center h-10 w-full rounded-[0.625rem] px-7.5 text-[0.75rem] leading-[1.2] font-semibold text-[#F9EAD5]'
                  >
                    {t('textApply')}
                  </button>
                </div>
              </div>
            </DrawerProvider>
          </div>
        </FormControl>
      )}
      <FormMessage className='xsm:text-[0.8125rem] text-[0.875rem] leading-[1.2]' />
    </FormItem>
  )
}
