'use client'

import { BookingTourFormValues, bookingTourSchema } from '@/schemas/booking-tour.schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import RFHDatePickerField from '@/modules/details-tour/components/FormControl/RFHDatePickerField'
import { Form, FormField } from '@/components/ui/form'
import { DetailsTourPricePerPaxType, TourDurationType } from '@/types/details-tour.type'
import { useContext, useEffect } from 'react'
import { addDays } from 'date-fns'
import RHFPaxQuantityField from '@/modules/details-tour/components/FormControl/RHFPaxQuantityField'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'

interface FormBookingTourProps {
  tourDuration: TourDurationType
  pricePerPax: DetailsTourPricePerPaxType
}

export default function FormBookingTour({ tourDuration, pricePerPax }: FormBookingTourProps) {
  const translateBookingTourForm = useTranslations('BookingTourForm')
  const tourDayNumber = Number(tourDuration?.day_number) || 0
  const bookingTourContext = useContext(BookingTourContext)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }

  const {
    bookingTourData,
    openBookingOverviewMobile,
    setBookingTourData,
    setOpenBookingOverviewMobile,
    setOpenContactForm,
  } = bookingTourContext

  const translateBookingTourMessages = {
    startDateRequired: translateBookingTourForm('startDateRequired'),
    endDateRequired: translateBookingTourForm('endDateRequired'),
    adultsMin: translateBookingTourForm('adultsMin'),
    endDateAfterStartDate: translateBookingTourForm('endDateAfterStartDate'),
  }

  const translateBookingTourFormLabels = {
    startDateLabel: translateBookingTourForm('startDateLabel'),
    endDateLabel: translateBookingTourForm('endDateLabel'),
    adultsLabel: translateBookingTourForm('adultsLabel'),
    children58Label: translateBookingTourForm('children58Label'),
    children14Label: translateBookingTourForm('children14Label'),
  }

  const form = useForm<BookingTourFormValues>({
    resolver: zodResolver(bookingTourSchema(translateBookingTourMessages)),
    defaultValues: bookingTourData,
  })

  const startDate = form.watch('startDate')

  const handleSubmitFormSuccess = () => {
    setOpenContactForm(true)
  }

  const handleSubmitFormError = (errors: FieldErrors<BookingTourFormValues>) => {
    if (openBookingOverviewMobile) {
      setOpenBookingOverviewMobile(false)
    }
  }

  useEffect(() => {
    const subscription = form.watch((values) => {
      setBookingTourData(values as BookingTourFormValues)
    })

    return () => subscription.unsubscribe()
  }, [form, setBookingTourData])

  useEffect(() => {
    if (!startDate || !tourDayNumber) return

    // tourDayNumber = số ngày tour
    // endDate = startDate + (tourDayNumber - 1)
    const calculatedEndDate = addDays(startDate, tourDayNumber - 1)

    form.setValue('endDate', calculatedEndDate, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [startDate, tourDayNumber, form])

  return (
    <Form {...form}>
      <form
        id='booking-tour-form'
        onSubmit={form.handleSubmit(handleSubmitFormSuccess, handleSubmitFormError)}
        className='xsm:space-y-5.5 relative w-full space-y-7'
      >
        <div className='xsm:grid-cols-1 xsm:gap-x-0 xsm:gap-y-6 grid grid-cols-2 gap-x-3.5'>
          <FormField
            name='startDate'
            control={form.control}
            render={({ field }) => (
              <RFHDatePickerField
                required
                field={field}
                className='col-span-1'
                placeholder='dd/mm/yyyy'
                label={translateBookingTourFormLabels.startDateLabel}
              />
            )}
          />
          <FormField
            name='endDate'
            control={form.control}
            render={({ field }) => (
              <RFHDatePickerField
                required
                disabled
                field={field}
                className='col-span-1'
                placeholder='dd/mm/yyyy'
                label={translateBookingTourFormLabels.endDateLabel}
              />
            )}
          />
        </div>
        <div className='space-y-5'>
          <p className='font-phu-du text-[1rem] leading-[1.3] font-medium text-black uppercase'>
            Pax quantity *
          </p>
          <div className='xsm:space-y-3 space-y-2'>
            <FormField
              name='paxQuantity.adults'
              control={form.control}
              render={({ field }) => (
                <RHFPaxQuantityField
                  required
                  field={field}
                  classNameFormItem='w-full'
                  unitPrice={pricePerPax?.adults || 0}
                  label={translateBookingTourFormLabels.adultsLabel}
                />
              )}
            />
            <FormField
              name='paxQuantity.children58'
              control={form.control}
              render={({ field }) => (
                <RHFPaxQuantityField
                  required
                  field={field}
                  classNameFormItem='w-full'
                  unitPrice={pricePerPax?.children58 || 0}
                  label={translateBookingTourFormLabels.children58Label}
                />
              )}
            />
            <FormField
              name='paxQuantity.children14'
              control={form.control}
              render={({ field }) => (
                <RHFPaxQuantityField
                  required
                  field={field}
                  classNameFormItem='w-full'
                  unitPrice={pricePerPax?.children14 || 0}
                  label={translateBookingTourFormLabels.children14Label}
                />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  )
}
