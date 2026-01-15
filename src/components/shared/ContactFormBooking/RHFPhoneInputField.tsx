import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { PhoneInput } from '@/components/ui/phone-input-custom'
import { cn } from '@/lib/utils'
import { ContactFormValues } from '@/schemas/booking-tour.schema'
import { ControllerRenderProps } from 'react-hook-form'

interface RHFPhoneInputFieldProps {
  placeholder?: string
  required?: boolean
  field: ControllerRenderProps<ContactFormValues, any>
  className?: string
}

export default function RHFPhoneInputField({
  placeholder,
  required,
  field,
  className,
}: RHFPhoneInputFieldProps) {
  return (
    <FormItem className={cn('xsm:gap-y-1.5 font-montserrat flex flex-col gap-y-2', className)}>
      <FormControl>
        <div className='relative flex flex-col space-y-3.75'>
          <PhoneInput
            {...field}
            defaultCountry='VN'
            required={required}
            placeholder={placeholder}
            className='peer text-body-t1 h-4.25 rounded-none border-none! px-0 py-0 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] shadow-none! ring-0! outline-0!'
          />

          <div className='h-px w-full bg-[#8B8B8B]/40'></div>
        </div>
      </FormControl>
      <FormMessage className='text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#EF2020]' />
    </FormItem>
  )
}
