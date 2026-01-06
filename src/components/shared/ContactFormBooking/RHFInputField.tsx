import { FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { ContactFormValues } from '@/schemas/booking-tour.schema'
import { ControllerRenderProps, FieldPath } from 'react-hook-form'

interface RHFInputFieldProps {
  placeholder?: string
  required?: boolean
  field: ControllerRenderProps<ContactFormValues, FieldPath<ContactFormValues>>
  className?: string
}

export default function RHFInputField({
  placeholder,
  required,
  field,
  className,
}: RHFInputFieldProps) {
  return (
    <FormItem className={cn('xsm:gap-y-1.5 font-montserrat flex flex-col gap-y-2', className)}>
      <FormControl>
        <div className='relative flex flex-col space-y-3.75'>
          <Input
            {...field}
            placeholder=''
            className='peer text-body-t1 h-4.25 rounded-none border-none! px-0 py-0 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] shadow-none! ring-0! outline-0!'
          />

          <p className='pointer-events-none absolute top-0 left-0 space-x-1 text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#8B8B8B] peer-[:not(:placeholder-shown)]:hidden'>
            <span>{placeholder}</span>
            {required && <span className='text-[#EF2020]'>*</span>}
          </p>

          <div className='h-px w-full bg-[#8B8B8B]/40'></div>
        </div>
      </FormControl>
      <FormMessage className='text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#EF2020]' />
    </FormItem>
  )
}
