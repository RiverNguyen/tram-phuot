'use client'

import ICTicket from '@/components/icons/ICTicket'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { UseFormRegister, FieldErrors } from 'react-hook-form'

type VoucherCodeFieldProps = {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  couponCode: string
  onCouponCodeChange: (value: string) => void
  onApply: () => void
  isApplying: boolean
}

export default function VoucherCodeField({
  register,
  errors,
  couponCode,
  onCouponCodeChange,
  onApply,
  isApplying,
}: VoucherCodeFieldProps) {
  return (
    <Field>
      <FieldLabel
        className='text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#2E2E2E]/75'
        htmlFor='coupon_code'
      >
        Voucher code
      </FieldLabel>
      <div className='flex space-x-2'>
        <div className='relative flex-1'>
          <Input
            id='coupon_code'
            placeholder='ABCD12345'
            className='text-[#2E2E2E]/75 placeholder:text-[#2E2E2E]/50 h-[3.25rem] rounded-[0.75rem] border border-[#EDEDED] bg-[#F5F5F5] px-4 pr-12 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] shadow-none outline-none placeholder:font-normal focus-visible:border-[#EDEDED] focus-visible:ring-0'
            {...register('coupon_code')}
            value={couponCode}
            onChange={(e) => {
              onCouponCodeChange(e.target.value)
              register('coupon_code').onChange(e)
            }}
          />
          <ICTicket className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#2E2E2E]' />
        </div>
        <button
          type='button'
          disabled={isApplying || !couponCode}
          onClick={onApply}
          className='bg-text-title-h2 flex-center cursor-pointer rounded-[0.75rem] px-4 h-[3.25rem] text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-white uppercase disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap'
        >
          Apply
        </button>
      </div>
      <FieldError>{errors.coupon_code?.message as string | undefined}</FieldError>
    </Field>
  )
}
