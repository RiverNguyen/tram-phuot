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
import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
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

const formSchema = z
  .object({
    check_in_date: z.date(),
    check_out_date: z.date(),
    adults: z.coerce.number().min(1, 'At least 1 adult is required'),
    child: z.coerce.number().optional(),
    coupon_code: z.string().optional(),
  })
  .refine((data) => data.check_out_date > data.check_in_date, {
    message: 'Check-out date must be after check-in date',
    path: ['check_out_date'],
  })

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
  initialCheckIn?: string
  initialCheckOut?: string
  initialAdults?: string
  initialChildren?: string
  onFormStateChange?: (state: {
    checkIn?: string
    checkOut?: string
    adults?: string
    children?: string
    voucherDiscount?: number
    appliedVoucherCode?: string | null
  }) => void
  savedVoucherDiscount?: number
  savedAppliedVoucherCode?: string | null
}

export default function BookingOverview({
  selectedRooms,
  onRemoveRoom,
  onClearAllRooms,
  detailHotel,
  onClose,
  initialCheckIn,
  initialCheckOut,
  initialAdults,
  initialChildren,
  onFormStateChange,
  savedVoucherDiscount,
  savedAppliedVoucherCode,
}: BookingOverviewProps) {
  const t = useTranslations('DetailHotelPage')
  const [voucherDiscount, setVoucherDiscount] = useState(savedVoucherDiscount || 0)
  const [openContactForm, setOpenContactForm] = useState(false)
  const [couponCode, setCouponCode] = useState<string>('')
  const [appliedVoucherCode, setAppliedVoucherCode] = useState<string | null>(
    savedAppliedVoucherCode || null,
  )
  const [isApplyingVoucher, startApplyingTransition] = useTransition()
  const locale = useLocale()
  const isMobile = useIsMobile()
  const params = useParams()
  const hotelSlug = params?.slug as string
  const translateBookingTourForm = useTranslations('BookingTourForm')

  // Set default dates: today and tomorrow, or use initial values from query params
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Parse initial values from query params
  const parseInitialCheckIn = () => {
    if (initialCheckIn) {
      const date = new Date(initialCheckIn)
      if (!isNaN(date.getTime())) {
        date.setHours(0, 0, 0, 0)
        return date
      }
    }
    return today
  }

  const parseInitialCheckOut = () => {
    if (initialCheckOut) {
      const date = new Date(initialCheckOut)
      if (!isNaN(date.getTime())) {
        date.setHours(0, 0, 0, 0)
        return date
      }
    }
    return tomorrow
  }

  const parseInitialAdults = () => {
    if (initialAdults) {
      const parsed = parseInt(initialAdults, 10)
      if (!isNaN(parsed) && parsed > 0) {
        return parsed
      }
    }
    return 0
  }

  const parseInitialChildren = () => {
    if (initialChildren) {
      const parsed = parseInt(initialChildren, 10)
      if (!isNaN(parsed) && parsed >= 0) {
        return parsed
      }
    }
    return 0
  }

  const initialCheckInDate = parseInitialCheckIn()
  const initialCheckOutDate = parseInitialCheckOut()
  const initialAdultsValue = parseInitialAdults()
  const initialChildrenValue = parseInitialChildren()

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      check_in_date: initialCheckInDate,
      check_out_date: initialCheckOutDate,
      adults: initialAdultsValue,
      child: initialChildrenValue,
      coupon_code: '',
    },
  })

  const watchDates = form.watch(['check_in_date', 'check_out_date'])
  const watchAdults = form.watch('adults')
  const watchChildren = form.watch('child')
  const checkInDate = watchDates[0]
  const checkOutDate = watchDates[1]
  const [isInitialMount, setIsInitialMount] = useState(true)
  const previousDatesRef = useRef<{
    checkIn: Date | null
    checkOut: Date | null
  }>({ checkIn: null, checkOut: null })
  const previousPaxQuantityRef = useRef<{ adults: number; children: number }>({
    adults: 0,
    children: 0,
  })
  const previousRoomsRef = useRef<string>('') // Store stringified rooms for comparison

  // Save form state to parent component when form values change
  useEffect(() => {
    if (!onFormStateChange || isInitialMount) return

    const checkInStr = checkInDate ? format(checkInDate, 'yyyy-MM-dd') : undefined
    const checkOutStr = checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : undefined
    const adultsStr = watchAdults ? String(watchAdults) : undefined
    const childrenStr = watchChildren !== undefined ? String(watchChildren) : undefined

    onFormStateChange({
      checkIn: checkInStr,
      checkOut: checkOutStr,
      adults: adultsStr,
      children: childrenStr,
      voucherDiscount,
      appliedVoucherCode,
    })
  }, [
    checkInDate,
    checkOutDate,
    watchAdults,
    watchChildren,
    voucherDiscount,
    appliedVoucherCode,
    onFormStateChange,
    isInitialMount,
  ])

  // Track initial mount to prevent auto-update on first render
  useEffect(() => {
    setIsInitialMount(false)
  }, [])

  // Restore saved voucher state when component mounts with saved state
  useEffect(() => {
    if (savedVoucherDiscount !== undefined) {
      setVoucherDiscount(savedVoucherDiscount)
    }
    if (savedAppliedVoucherCode !== undefined) {
      setAppliedVoucherCode(savedAppliedVoucherCode)
    }
  }, []) // Only run on mount

  // Auto-update check-out date when check-in date changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount) return

    if (checkInDate) {
      const nextDay = new Date(checkInDate)
      nextDay.setDate(nextDay.getDate() + 1)
      nextDay.setHours(0, 0, 0, 0)

      const currentCheckOut = form.getValues('check_out_date')
      // Only update if check-out is not already set to a valid date after check-in
      if (!currentCheckOut || currentCheckOut <= checkInDate) {
        form.setValue('check_out_date', nextDay, { shouldValidate: true })
      }
    }
  }, [checkInDate, form, isInitialMount])

  // Tự động validate lại voucher khi ngày, số lượng pax, hoặc phòng thay đổi
  useEffect(() => {
    if (isInitialMount) {
      // Initialize previous values on first mount
      if (checkInDate && checkOutDate) {
        previousDatesRef.current = { checkIn: checkInDate, checkOut: checkOutDate }
      }
      previousPaxQuantityRef.current = {
        adults: Number(watchAdults) || 0,
        children: Number(watchChildren) || 0,
      }
      previousRoomsRef.current = JSON.stringify(selectedRooms)
      return
    }

    if (!checkInDate || !checkOutDate) return

    // Initialize previous values if not set
    if (!previousDatesRef.current.checkIn || !previousDatesRef.current.checkOut) {
      previousDatesRef.current = { checkIn: checkInDate, checkOut: checkOutDate }
      previousPaxQuantityRef.current = {
        adults: Number(watchAdults) || 0,
        children: Number(watchChildren) || 0,
      }
      previousRoomsRef.current = JSON.stringify(selectedRooms)
      return
    }

    // Check if dates have actually changed
    const datesChanged =
      checkInDate.getTime() !== previousDatesRef.current.checkIn.getTime() ||
      checkOutDate.getTime() !== previousDatesRef.current.checkOut.getTime()

    // Check if pax quantity has changed
    const currentAdults = Number(watchAdults) || 0
    const currentChildren = Number(watchChildren) || 0
    const paxQuantityChanged =
      previousPaxQuantityRef.current.adults !== currentAdults ||
      previousPaxQuantityRef.current.children !== currentChildren

    // Check if rooms have changed
    const roomsChanged = previousRoomsRef.current !== JSON.stringify(selectedRooms)

    // Nếu có thay đổi và có voucher đã áp dụng, validate lại
    if ((datesChanged || paxQuantityChanged || roomsChanged) && appliedVoucherCode) {
      const validateVoucher = async () => {
        try {
          const formValues = form.getValues()
          if (
            !formValues.check_in_date ||
            !formValues.check_out_date ||
            selectedRooms.length === 0
          ) {
            // Nếu thiếu thông tin cần thiết, reset voucher
            setVoucherDiscount(0)
            setAppliedVoucherCode(null)
            return
          }

          const payload: ApplyHotelVoucherPayloadType = {
            checkInDate: format(formValues.check_in_date, 'dd/MM/yyyy'),
            checkOutDate: format(formValues.check_out_date, 'dd/MM/yyyy'),
            hotelSlug: hotelSlug,
            voucherCode: appliedVoucherCode,
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
            // Voucher vẫn hợp lệ, cập nhật discount
            setVoucherDiscount(response.voucher.discount)
          } else {
            // Voucher không còn hợp lệ, reset và hiển thị thông báo
            setVoucherDiscount(0)
            setAppliedVoucherCode(null)
            const formatErrorMessage = (
              rawMessage?: string | { vi?: string; en?: string } | null,
            ) => {
              if (!rawMessage) return ''
              if (typeof rawMessage === 'object') {
                const localized =
                  (locale === 'vi' ? rawMessage.vi : rawMessage.en) ??
                  rawMessage.en ??
                  rawMessage.vi
                if (localized) return localized
                return ''
              }
              const parts = rawMessage.split(': ')
              return parts[parts.length - 1] || rawMessage
            }
            const errorMessage = formatErrorMessage(response.message)
            toast.error(
              errorMessage ||
                translateBookingTourForm('textApplyVoucherError') ||
                'Voucher is not applicable',
            )
          }
        } catch (error) {
          console.error('Error validating voucher:', error)
          // Nếu có lỗi khi validate, reset voucher để tránh hiển thị sai
          setVoucherDiscount(0)
          setAppliedVoucherCode(null)
        }
      }

      validateVoucher()
    }

    // Update previous values
    previousDatesRef.current = { checkIn: checkInDate, checkOut: checkOutDate }
    previousPaxQuantityRef.current = {
      adults: Number(watchAdults) || 0,
      children: Number(watchChildren) || 0,
    }
    previousRoomsRef.current = JSON.stringify(selectedRooms)
  }, [
    checkInDate,
    checkOutDate,
    watchAdults,
    watchChildren,
    selectedRooms,
    isInitialMount,
    appliedVoucherCode,
    hotelSlug,
    detailHotel?.title,
    locale,
    translateBookingTourForm,
    form,
  ])

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
    const formatErrorMessage = (rawMessage?: string | { vi?: string; en?: string } | null) => {
      if (!rawMessage) return ''

      // API might return localized object; prefer current locale
      if (typeof rawMessage === 'object') {
        const localized =
          (locale === 'vi' ? rawMessage.vi : rawMessage.en) ?? rawMessage.en ?? rawMessage.vi
        if (localized) return localized
        return ''
      }

      const parts = rawMessage.split(': ')
      return parts[parts.length - 1] || rawMessage
    }

    const getErrorMessage = (error: unknown) => {
      if (typeof error === 'string') return error
      if (error instanceof Error) return error.message
      if (error && typeof error === 'object' && 'message' in error) {
        const message = (error as { message?: unknown }).message
        if (typeof message === 'string' || (message && typeof message === 'object')) {
          return message as string | { vi?: string; en?: string }
        }
      }
      return ''
    }

    startApplyingTransition(async () => {
      const defaultErrorMessage =
        translateBookingTourForm('textApplyVoucherError') || 'Failed to apply voucher'

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
          setAppliedVoucherCode(couponCode)
          toast.success(
            translateBookingTourForm('textApplyVoucherSuccess') || 'Voucher applied successfully',
          )
        } else {
          setVoucherDiscount(0)
          setAppliedVoucherCode(null)
          const responseMessage = formatErrorMessage(response.message)
          toast.error(responseMessage || defaultErrorMessage)
        }
      } catch (error) {
        console.error(error)
        setVoucherDiscount(0)
        setAppliedVoucherCode(null)
        const parsedError = formatErrorMessage(getErrorMessage(error))
        toast.error(parsedError || defaultErrorMessage)
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
        message: t('textAtLeast1AdultRequired'),
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
            t('textPleaseSelectCheckInAndCheckOutDatesBeforeSendingInformation'),
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
        vi: ENDPOINTS.contact_form.form_booking_hotel_vi,
        en: ENDPOINTS.contact_form.form_booking_hotel_en,
      }
      const endpoint = CONTACT_ENDPOINT_BY_LOCALE[locale as keyof typeof CONTACT_ENDPOINT_BY_LOCALE]
      const response = await cf7Request.send({ id: endpoint.id, unitTag: endpoint.unit_tag })

      if (response.status === 'mail_sent') {
        setOpenContactForm(false)
        toast.success(t('textBookingSuccessfulOurStaffWillContactYouSoon'))

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
        setAppliedVoucherCode(null)

        // Reset saved form state
        if (onFormStateChange) {
          onFormStateChange({
            checkIn: undefined,
            checkOut: undefined,
            adults: undefined,
            children: undefined,
            voucherDiscount: 0,
            appliedVoucherCode: null,
          })
        }

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
          {t('textBookingOverview')}
        </h3>
        <button
          className='sm:hidden'
          type='button'
          onClick={() => {
            // Save form state before closing
            if (onFormStateChange) {
              const checkInStr = checkInDate ? format(checkInDate, 'yyyy-MM-dd') : undefined
              const checkOutStr = checkOutDate ? format(checkOutDate, 'yyyy-MM-dd') : undefined
              const adultsStr = watchAdults ? String(watchAdults) : undefined
              const childrenStr = watchChildren !== undefined ? String(watchChildren) : undefined

              onFormStateChange({
                checkIn: checkInStr,
                checkOut: checkOutStr,
                adults: adultsStr,
                children: childrenStr,
                voucherDiscount,
                appliedVoucherCode,
              })
            }
            if (onClose) {
              onClose()
            }
          }}
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
                    label={t('textAdults')}
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
                    label={t('textChild')}
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
            {t('textBookNow')}
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
