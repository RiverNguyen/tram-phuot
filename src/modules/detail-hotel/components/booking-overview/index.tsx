'use client'

import DrawerProvider from '@/components/provider/DrawerProvider'
import BrandButton2 from '@/components/shared/BrandButton2'
import { ContactFormDialog } from '@/components/shared/ContactFormBooking'
import { Field, FieldError } from '@/components/ui/field'
import { Form } from '@/components/ui/form'
import ENDPOINTS from '@/configs/endpoints'
import CF7Request from '@/fetches/cf7Request'
import useIsMobile from '@/hooks/useIsMobile'
import { ContactFormValues } from '@/schemas/booking-tour.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { formatUSD, normalizePrice } from '@/lib/utils'
import hotelService from '@/services/hotel'
import {
  ApplyHotelVoucherPayloadType,
  ApplyHotelVoucherResponseType,
} from '@/types/detail-hotel.type'
import { IHotelDetail } from '@/interface/hotel.interface'
import DatePickerFields from './_components/DatePickerFields'
import HotelContactFormContent from './_components/HotelContactFormContent'
import NumberStepperField from './_components/NumberStepperField'
import PriceSummary from './_components/PriceSummary'
import RoomCard from './_components/RoomCard'
import VoucherCodeField from './_components/VoucherCodeField'
import { XIcon } from 'lucide-react'

const formSchema = z.object({
  check_in_date: z.date(),
  check_out_date: z.date(),
  adults: z.coerce.number().min(1, 'At least 1 adult is required'),
  child: z.coerce.number().optional(),
  coupon_code: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

type BookingOverviewProps = {
  selectedRooms: {
    id: number | string
    index: number
    title: string
    quantity: number
    pricePerNight: number
    totalPrice: number
  }[]
  onRemoveRoom?: (id: number | string) => void
  onClearAllRooms?: () => void
  detailHotel?: IHotelDetail
  onClose?: () => void
}

export default function BookingOverview({
  selectedRooms,
  onRemoveRoom,
  onClearAllRooms,
  detailHotel,
  onClose,
}: BookingOverviewProps) {
  const [voucherDiscount, setVoucherDiscount] = useState(0)
  const [openContactForm, setOpenContactForm] = useState(false)
  const [couponCode, setCouponCode] = useState<string>('')
  const [isApplyingVoucher, startApplyingTransition] = useTransition()
  const locale = useLocale()
  const isMobile = useIsMobile()
  const params = useParams()
  const hotelSlug = params?.slug as string
  const translateBookingTourForm = useTranslations('BookingTourForm')

  // Set default dates: today and tomorrow
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      check_in_date: today,
      check_out_date: tomorrow,
      adults: 0,
      child: 0,
      coupon_code: '',
    },
  })

  const watchDates = form.watch(['check_in_date', 'check_out_date'])
  const checkInDate = watchDates[0]

  // Auto-update check-out date when check-in date changes
  useEffect(() => {
    if (checkInDate) {
      const nextDay = new Date(checkInDate)
      nextDay.setDate(nextDay.getDate() + 1)
      nextDay.setHours(0, 0, 0, 0)

      const currentCheckOut = form.getValues('check_out_date')
      // Only update if check-out is not already set to the next day
      if (!currentCheckOut || currentCheckOut.getTime() !== nextDay.getTime()) {
        form.setValue('check_out_date', nextDay, { shouldValidate: true })
      }
    }
  }, [checkInDate, form])

  // Calculate number of nights
  const numberOfNights = useMemo(() => {
    const checkIn = watchDates[0]
    const checkOut = watchDates[1]
    if (!checkIn || !checkOut || checkOut <= checkIn) return 0
    const diffTime = checkOut.getTime() - checkIn.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }, [watchDates])

  // Calculate provisional amount
  const provisionalAmount = useMemo(() => {
    return selectedRooms.reduce((total, room) => {
      const normalizedPrice = normalizePrice(room.pricePerNight)
      return total + normalizedPrice * room.quantity * numberOfNights
    }, 0)
  }, [selectedRooms, numberOfNights])

  // Calculate total
  const totalAmount = useMemo(() => {
    return Math.max(0, provisionalAmount - voucherDiscount)
  }, [provisionalAmount, voucherDiscount])

  const handleApplyVoucher = async () => {
    startApplyingTransition(async () => {
      try {
        const formValues = form.getValues()
        if (!formValues.check_in_date || !formValues.check_out_date) {
          toast.error(
            translateBookingTourForm('startDateRequired') ||
              'Please select check-in and check-out dates',
          )
          return
        }
        if (selectedRooms.length === 0) {
          toast.error('Please select at least one room')
          return
        }
        if (!couponCode) {
          toast.error('Please enter a voucher code')
          return
        }

        const payload: ApplyHotelVoucherPayloadType = {
          checkInDate: format(formValues.check_in_date, 'dd/MM/yyyy'),
          checkOutDate: format(formValues.check_out_date, 'dd/MM/yyyy'),
          hotelSlug: hotelSlug,
          voucherCode: couponCode,
          rooms: selectedRooms.map((room) => ({
            title: room.title,
            quantity: room.quantity,
            pricePerNight: normalizePrice(room.pricePerNight),
          })),
          adults: Number(formValues.adults) || 0,
          children: Number(formValues.child) || 0,
          bookingTime: format(new Date(), 'dd/MM/yyyy'),
          hotelTitle: detailHotel?.title || '',
        }

        const response: ApplyHotelVoucherResponseType = await hotelService.applyVoucher(payload)
        if (response.success) {
          setVoucherDiscount(response.voucher.discount)
          toast.success(
            translateBookingTourForm('textApplyVoucherSuccess') || 'Voucher applied successfully',
          )
        } else {
          toast.error(
            translateBookingTourForm('textApplyVoucherError') || 'Failed to apply voucher',
          )
        }
      } catch (error) {
        console.error(error)
        toast.error(translateBookingTourForm('textApplyVoucherError') || 'Failed to apply voucher')
      } finally {
        setCouponCode('')
        form.setValue('coupon_code', '')
      }
    })
  }

  const handleBookNow = async () => {
    // Check if at least one room is selected
    if (selectedRooms.length === 0) {
      toast.error('Please select at least one room')
      return
    }

    // Validate form before opening contact form
    const isValid = await form.trigger('adults')

    if (!isValid) {
      // If validation fails, the error will be shown automatically
      return
    }

    const formValues = form.getValues()
    const adultsValue = Number(formValues.adults) || 0

    if (adultsValue <= 0) {
      form.setError('adults', {
        type: 'manual',
        message: 'At least 1 adult is required',
      })
      return
    }

    setOpenContactForm(true)
  }

  const handleSubmitContactForm = async (contactData: ContactFormValues) => {
    try {
      const formValues = form.getValues()
      // Ensure dates are selected before submitting booking information
      if (!formValues.check_in_date || !formValues.check_out_date) {
        toast.error(
          translateBookingTourForm('startDateRequired') ||
            'Please select check-in and check-out dates before sending information.',
        )
        return { success: false }
      }

      const formData = {
        ...contactData,
        checkInDate: format(formValues.check_in_date, 'dd/MM/yyyy'),
        checkOutDate: format(formValues.check_out_date, 'dd/MM/yyyy'),
        adults: formValues.adults,
        children: formValues.child || 0,
        couponCode: formValues.coupon_code || '',
        // rooms: selectedRooms.map((room) => ({
        //   title: room.title,
        //   quantity: room.quantity,
        //   pricePerNight: room.pricePerNight,
        // })),
        provisionalAmount,
        voucherDiscount,
        totalAmount,
        bookingTime: format(new Date(), 'dd/MM/yyyy'),
        hotelTitle: detailHotel?.title || '',
        room: selectedRooms
          .map(
            (r, i) =>
              `${i + 1}. ${r.title}
          - Qty: ${r.quantity}
          - Price/Night: ${r.pricePerNight}`,
          )
          .join('\n\n'),
        currentUrl: typeof window !== 'undefined' ? window.location.href : '',
      }

      const cf7Request = new CF7Request(formData)

      // You may need to add hotel booking endpoints to ENDPOINTS config
      // For now, using tour endpoints as placeholder
      const CONTACT_ENDPOINT_BY_LOCALE = {
        vi: ENDPOINTS.contact_form.form_booking_hotel_en,
        en: ENDPOINTS.contact_form.form_booking_hotel_en,
      }
      const endpoint = CONTACT_ENDPOINT_BY_LOCALE[locale as keyof typeof CONTACT_ENDPOINT_BY_LOCALE]
      const response = await cf7Request.send({ id: endpoint.id, unitTag: endpoint.unit_tag })

      if (response.status === 'mail_sent') {
        setOpenContactForm(false)
        toast.success('Booking successful, our staff will contact you soon.')

        // Close parent drawer (mobile) after successful submission
        if (onClose) {
          onClose()
        }

        // Reset form values
        form.reset({
          check_in_date: today,
          check_out_date: tomorrow,
          adults: 0,
          child: 0,
          coupon_code: '',
        })

        // Reset voucher discount and coupon code
        setVoucherDiscount(0)
        setCouponCode('')

        // Clear all selected rooms
        if (onClearAllRooms) {
          onClearAllRooms()
        }

        return { success: true }
      }
      return { success: false }
    } catch (error) {
      console.error('Error submitting contact form:', error)
      return { success: false }
    }
  }

  return (
    <div className='relative'>
      <div className='flex-between mb-4 xsm:mb-6'>
        <h3 className='text-[1.5rem] font-phu-du leading-[1.1] font-bold bg-clip-text text-transparent bg-[linear-gradient(230deg,#03328C_5.76%,#00804D_100.15%)] w-fit xsm:text-[1.125rem]'>
          Booking Overview
        </h3>
        <button
          className='sm:hidden'
          type='button'
          onClick={onClose}
        >
          <XIcon className='size-5 text-[#2E2E2E]' />
        </button>
      </div>

      <Form {...form}>
        <form
          onSubmit={(e) => e.preventDefault()}
          className='space-y-[1.25rem]'
        >
          <DatePickerFields
            control={form.control}
            errors={form.formState.errors}
          />
          <div className='max-h-[15rem] xsm:max-h-[20rem] overflow-y-auto space-y-4'>
            <Field>
              <Controller
                control={form.control}
                name='adults'
                render={({ field }) => (
                  <NumberStepperField
                    label='Adults'
                    field={field}
                  />
                )}
              />
              <FieldError>{form.formState.errors.adults?.message}</FieldError>
            </Field>
            <Field>
              <Controller
                control={form.control}
                name='child'
                render={({ field }) => (
                  <NumberStepperField
                    label='Child'
                    field={field}
                  />
                )}
              />
              <FieldError>{form.formState.errors.child?.message}</FieldError>
            </Field>

            {selectedRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                onRemove={onRemoveRoom}
                formatUSD={formatUSD}
              />
            ))}
          </div>
          <VoucherCodeField
            register={form.register}
            errors={form.formState.errors}
            couponCode={couponCode}
            onCouponCodeChange={setCouponCode}
            onApply={handleApplyVoucher}
            isApplying={isApplyingVoucher}
          />
          {selectedRooms.length > 0 && provisionalAmount > 0 && (
            <PriceSummary
              provisionalAmount={provisionalAmount}
              voucherDiscount={voucherDiscount}
              totalAmount={totalAmount}
              formatUSD={formatUSD}
            />
          )}

          <BrandButton2
            type='button'
            className='w-full xsm:h-[2.5rem]! xsm:rounded-[0.625rem]!'
            onClick={handleBookNow}
          >
            Book Now
          </BrandButton2>
        </form>
      </Form>

      {/* Contact Form Dialog */}
      {!isMobile && (
        <ContactFormDialog
          open={openContactForm}
          setOpen={setOpenContactForm}
        >
          <HotelContactFormContent
            onSubmitForm={handleSubmitContactForm}
            onClose={() => setOpenContactForm(false)}
          />
        </ContactFormDialog>
      )}

      {isMobile && (
        <DrawerProvider
          open={openContactForm}
          setOpen={setOpenContactForm}
          showDrawerDrag={false}
          className='rounded-t-[0.5rem]'
        >
          <HotelContactFormContent
            onSubmitForm={handleSubmitContactForm}
            onClose={() => setOpenContactForm(false)}
          />
        </DrawerProvider>
      )}
    </div>
  )
}
