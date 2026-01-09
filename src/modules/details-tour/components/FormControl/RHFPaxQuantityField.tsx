'use client'
import ICMinus from '@/components/icons/ICMinus'
import ICPlus from '@/components/icons/ICPlus'
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'
import { ControllerRenderProps, FieldPath } from 'react-hook-form'

interface RHFPaxQuantityFieldProps {
  label?: string
  classNameFormItem?: string
  classNameFormLabel?: string
  classNameFormMessage?: string
  required?: boolean
  field: ControllerRenderProps<any, FieldPath<any>>
  unitPrice?: number
}

export default function RHFPaxQuantityField({
  label,
  classNameFormItem,
  classNameFormLabel,
  classNameFormMessage,
  field,
  required,
  unitPrice,
}: RHFPaxQuantityFieldProps) {
  const translateBookingTourForm = useTranslations('BookingTourForm')
  const value = Number(field.value || 0)

  const handleIncrease = () => {
    field.onChange(value + 1)
  }

  const handleDecrease = () => {
    field.onChange(Math.max(0, value - 1))
  }
  return (
    <FormItem
      className={cn('xsm:gap-y-1.5 font-montserrat flex flex-col gap-y-2', classNameFormItem)}
    >
      <FormControl>
        <div className='xsm:pl-4 xsm:pr-2 xsm:block xsm:h-auto xsm:py-2.75 xsm:space-y-3 xsm:space-x-0 flex h-13 items-center justify-between space-x-2 rounded-[0.75rem] border border-solid border-[#EDEDED] bg-[#F5F5F5] px-2.75'>
          <Input
            {...field}
            className='sr-only'
          />
          <div className='xsm:flex shrink-0 items-center justify-between'>
            <p
              className={cn(
                'text-[0.875rem] leading-[1.6] font-semibold tracking-[-0.00875rem] text-[#2E2E2E]',
                classNameFormLabel,
              )}
            >
              {label} {required && <span>*</span>}
            </p>

            <div className='xsm:flex hidden items-center space-x-1'>
              <span className='section-title-h2 inline-block text-[1rem] leading-normal font-semibold tracking-[-0.01563rem]'>
                {unitPrice ? `${unitPrice}$` : '0$'}
              </span>
              <span className='text-body/60 text-[0.875rem] leading-none'>
                /{translateBookingTourForm('textPax')}
              </span>
            </div>
          </div>
          <div className='xsm:space-x-0 flex items-center space-x-3.5'>
            <div className='xsm:hidden flex items-center space-x-1'>
              <span className='section-title-h2 inline-block text-[1rem] leading-normal font-semibold tracking-[-0.01563rem]'>
                {unitPrice ? `${unitPrice}$` : '0$'}
              </span>
              <span className='text-body/60 text-[0.875rem] leading-none'>
                /{translateBookingTourForm('textPax')}
              </span>
            </div>

            <div className='xsm:w-full xsm:p-2 xsm:rounded-[0.75rem] xsm:bg-white flex w-24.25 items-center justify-between'>
              <button
                type='button'
                onClick={handleDecrease}
                className='flex-center xsm:rounded-[0.75rem] size-8 shrink-0 cursor-pointer rounded-full border-[1.143px] border-solid border-[#DDD] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)]'
              >
                <ICMinus className='size-4' />
              </button>
              <span className='flex-center flex-1 text-[0.875rem] leading-[1.6] font-semibold tracking-[-0.00875rem] text-[#2E2E2E]'>
                {value.toString().padStart(2, '0')}
              </span>
              <button
                type='button'
                onClick={handleIncrease}
                className='flex-center xsm:rounded-[0.75rem] xsm:bg-text-title-h2 size-8 shrink-0 cursor-pointer rounded-full border-[1.143px] border-solid border-[#DDD] bg-white shadow-[2.286px_4.571px_18.286px_0_rgba(0,0,0,0.03)]'
              >
                <ICPlus className='xsm:text-white size-4' />
              </button>
            </div>
          </div>
        </div>
      </FormControl>

      <FormMessage
        className={cn('xsm:text-[0.8125rem] text-[0.875rem] leading-[1.2]', classNameFormMessage)}
      />
    </FormItem>
  )
}
