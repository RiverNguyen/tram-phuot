'use client'

import { Field, FieldError } from '@/components/ui/field'
import RFHDatePickerField from '@/modules/details-tour/components/FormControl/RFHDatePickerField'
import { useTranslations } from 'next-intl'
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form'
import { startOfDay } from 'date-fns'

type DatePickerFieldsProps = {
  control: Control<any>
  errors: FieldErrors<any>
}

export default function DatePickerFields({ control, errors }: DatePickerFieldsProps) {
  const t = useTranslations('DetailHotelPage')
  const checkInDate = useWatch({ control, name: 'check_in_date' })

  return (
    <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-6'>
        <Field>
          <Controller
            control={control}
            name='check_in_date'
            render={({ field }) => (
              <RFHDatePickerField
                field={field}
                placeholder='Placeholder'
                label={t('textCheckInDate')}
                required
              />
            )}
          />
          <FieldError>{errors.check_in_date?.message as string | undefined}</FieldError>
        </Field>
      </div>

      <div className='col-span-6'>
        <Field>
          <Controller
            control={control}
            name='check_out_date'
            render={({ field }) => (
              <RFHDatePickerField
                field={field}
                placeholder='Placeholder'
                label={t('textCheckOutDate')}
                required
                disabledDates={(date) => {
                  // Disable past dates
                  if (startOfDay(date) < startOfDay(new Date())) {
                    return true
                  }
                  // Disable dates <= check-in date if check-in date is set
                  if (checkInDate instanceof Date) {
                    return startOfDay(date) <= startOfDay(checkInDate)
                  }
                  return false
                }}
              />
            )}
          />
          <FieldError>{errors.check_out_date?.message as string | undefined}</FieldError>
        </Field>
      </div>
    </div>
  )
}
