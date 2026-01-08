'use client'

import RFHDatePickerField from '@/modules/details-tour/components/FormControl/RFHDatePickerField'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Controller, Control, FieldErrors } from 'react-hook-form'

type DatePickerFieldsProps = {
  control: Control<any>
  errors: FieldErrors<any>
}

export default function DatePickerFields({ control, errors }: DatePickerFieldsProps) {
  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-6'>
        <Field>
          <FieldLabel
            className='text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#2E2E2E]/75'
            htmlFor='check_in_date'
          >
            Check in date <span className='text-[#EF2020]'>*</span>
          </FieldLabel>
          <Controller
            control={control}
            name='check_in_date'
            render={({ field }) => (
              <RFHDatePickerField
                field={field}
                placeholder='Placeholder'
              />
            )}
          />
          <FieldError>{errors.check_in_date?.message as string | undefined}</FieldError>
        </Field>
      </div>

      <div className='col-span-6'>
        <Field>
          <FieldLabel
            className='text-[0.875rem] leading-[1.2] tracking-[0.00875rem] text-[#2E2E2E]/75'
            htmlFor='check_out_date'
          >
            Check out date <span className='text-[#EF2020]'>*</span>
          </FieldLabel>
          <Controller
            control={control}
            name='check_out_date'
            render={({ field }) => (
              <RFHDatePickerField
                field={field}
                placeholder='Placeholder'
              />
            )}
          />
          <FieldError>{errors.check_out_date?.message as string | undefined}</FieldError>
        </Field>
      </div>
    </div>
  )
}
