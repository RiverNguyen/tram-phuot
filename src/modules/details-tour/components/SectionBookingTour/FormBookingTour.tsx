'use client'

import { BookingTourFormValues, bookingTourSchema } from '@/schemas/booking-tour.schema'
import { FieldErrors, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import RFHDatePickerField from '@/modules/details-tour/components/FormControl/RFHDatePickerField'
import { Form, FormField } from '@/components/ui/form'
import { DetailsTourPricePerPaxType, TourDurationType } from '@/types/details-tour.type'
import { useContext, useEffect, useRef } from 'react'
import { addDays } from 'date-fns'
import RHFPaxQuantityField from '@/modules/details-tour/components/FormControl/RHFPaxQuantityField'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import { calculateProvisionalPriceByPaxQuantity } from '@/modules/details-tour/utils'
import { PaxType } from '@/enums'

interface FormBookingTourProps {
  tourDuration: TourDurationType
  pricePerPax: number
}

export default function FormBookingTour({ tourDuration, pricePerPax = 0 }: FormBookingTourProps) {
  const translateBookingTourForm = useTranslations('BookingTourForm')
  const tourDayNumber = Number(tourDuration?.day_number) || 0
  const bookingTourContext = useContext(BookingTourContext)

  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }

  const {
    bookingTourData,
    openBookingOverviewMobile,
    pricePerPaxTypes,
    setBookingTourData,
    setOpenBookingOverviewMobile,
    setOpenContactForm,
    setTourPrice,
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

  const { watch } = form
  const previousBookingDataRef = useRef(bookingTourData)
  const isResettingRef = useRef(false)
  const bookingTourDataRef = useRef(bookingTourData)

  const startDate = watch('startDate')
  const adults = watch('paxQuantity.adults')
  const children58 = watch('paxQuantity.children58')
  const children14 = watch('paxQuantity.children14')

  const handleSubmitFormSuccess = () => {
    setOpenContactForm(true)
  }

  const handleSubmitFormError = (errors: FieldErrors<BookingTourFormValues>) => {
    if (openBookingOverviewMobile) {
      setOpenBookingOverviewMobile(false)
    }
  }

  // Keep ref in sync with bookingTourData
  useEffect(() => {
    bookingTourDataRef.current = bookingTourData
  }, [bookingTourData])

  useEffect(() => {
    const subscription = form.watch((values) => {
      // Skip updating if we're in the middle of resetting
      if (isResettingRef.current) {
        return
      }
      
      // Only update if values are different from current bookingTourData
      const currentValues = values as BookingTourFormValues
      const currentBookingData = bookingTourDataRef.current
      const isDifferent =
        currentValues.startDate?.getTime() !== currentBookingData.startDate?.getTime() ||
        currentValues.endDate?.getTime() !== currentBookingData.endDate?.getTime() ||
        currentValues.paxQuantity.adults !== currentBookingData.paxQuantity.adults ||
        currentValues.paxQuantity.children58 !== currentBookingData.paxQuantity.children58 ||
        currentValues.paxQuantity.children14 !== currentBookingData.paxQuantity.children14

      if (isDifferent) {
        setBookingTourData(currentValues)
      }
    })

    return () => subscription.unsubscribe()
  }, [form, setBookingTourData])

  // Reset form when bookingTourData is reset (after successful form submission)
  useEffect(() => {
    const prevData = previousBookingDataRef.current
    const isResetState =
      !bookingTourData.startDate &&
      !bookingTourData.endDate &&
      bookingTourData.paxQuantity.adults === 1 &&
      bookingTourData.paxQuantity.children58 === 0 &&
      bookingTourData.paxQuantity.children14 === 0

    // Only reset if we're transitioning from a non-reset state to reset state
    const wasNonResetState = prevData.startDate || prevData.endDate || prevData.paxQuantity.adults !== 1 || prevData.paxQuantity.children58 !== 0 || prevData.paxQuantity.children14 !== 0

    if (isResetState && wasNonResetState) {
      isResettingRef.current = true
      form.reset({
        startDate: undefined,
        endDate: undefined,
        paxQuantity: {
          adults: 1,
          children58: 0,
          children14: 0,
        },
      })
      // Reset flag after form has synced
      requestAnimationFrame(() => {
        isResettingRef.current = false
      })
    }

    previousBookingDataRef.current = bookingTourData
  }, [bookingTourData, form])

  useEffect(() => {
    if (!startDate || !tourDayNumber) return
    const calculatedEndDate = addDays(startDate, tourDayNumber - 1)

    form.setValue('endDate', calculatedEndDate, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [startDate, tourDayNumber, form])

  useEffect(() => {
    const { provisionalPrice } = calculateProvisionalPriceByPaxQuantity(
      { adults, children58, children14 },
      Number(pricePerPax),
    )
    setTourPrice((prevData) => ({
      ...prevData,
      provisionalPrice: provisionalPrice,
    }))
  }, [adults, children58, children14])

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
                  unitPrice={pricePerPaxTypes[PaxType.ADULTS]?.unitPrice || 0}
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
                  unitPrice={pricePerPaxTypes[PaxType.CHILDREN_58]?.unitPrice || 0}
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
                  unitPrice={pricePerPaxTypes[PaxType.CHILDREN_14]?.unitPrice || 0}
                  label={translateBookingTourFormLabels.children14Label}
                />
              )}
            />
            <p className='text-body-t1/60 font-montserrat text-[0.75rem] leading-[1.6] font-semibold tracking-[-0.0075rem]'>
              {translateBookingTourForm('textNoteChildren14')}
            </p>
          </div>
        </div>
      </form>
    </Form>
  )
}
