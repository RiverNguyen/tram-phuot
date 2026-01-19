'use client'
import ICTicket from '@/components/icons/ICTicket'
import { BrandButton } from '@/components/shared'
import { PaxType } from '@/enums'
import { formatUSD } from '@/lib/utils'
import ICArrowRight from '@/modules/details-tour/icons/ICArrowRight'
import { BookingTourContext } from '@/modules/details-tour/providers/BookingTourProvider'
import tourService from '@/services/tour'
import {
  ApplyVoucherPayloadType,
  ApplyVoucherResponseType,
  DetailsTourPricePerPaxType,
  TourDurationType,
} from '@/types/details-tour.type'
import { useLocale, useTranslations } from 'next-intl'
import { useContext, useEffect, useRef, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface BookingOverviewProps {
  tourDuration: TourDurationType
  pricePerPax: number
}

export default function BookingOverview({ tourDuration, pricePerPax }: BookingOverviewProps) {
  const bookingTourContext = useContext(BookingTourContext)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }

  const {
    bookingTourData: { startDate, endDate, paxQuantity },
    tourSlug,
    tourPrice,
    pricePerPaxTypes,
    setTourPrice,
  } = bookingTourContext
  const { adults = 0, children58 = 0, children14 = 0, children9 = 0 } = paxQuantity || {}
  const locale = useLocale()
  const translateBookingTourForm = useTranslations('BookingTourForm')
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  const [couponCode, setCouponCode] = useState<string>('')
  const [isApplyingVoucher, startApplyingTransition] = useTransition()
  const [appliedVoucherCode, setAppliedVoucherCode] = useState<string | null>(null)
  const previousDatesRef = useRef<{ startDate?: Date; endDate?: Date }>({})
  const previousPaxQuantityRef = useRef<{
    adults: number
    children58: number
    children14: number
    children9: number
  }>({
    adults: 0,
    children58: 0,
    children14: 0,
    children9: 0,
  })
  const isInitialMountRef = useRef(true)
  const previousResetStateRef = useRef<{
    startDate: Date | undefined
    endDate: Date | undefined
    adults: number
    children58: number
    children14: number
    children9: number
  }>({
    startDate: undefined,
    endDate: undefined,
    adults: 1,
    children58: 0,
    children14: 0,
    children9: 0,
  })

  // Reset appliedVoucherCode when bookingTourData is reset (after successful form submission)
  useEffect(() => {
    const isResetState =
      !startDate &&
      !endDate &&
      adults === 1 &&
      children58 === 0 &&
      children14 === 0 &&
      children9 === 0
    const prevState = previousResetStateRef.current
    const wasNonResetState =
      prevState.startDate ||
      prevState.endDate ||
      prevState.adults !== 1 ||
      prevState.children58 !== 0 ||
      prevState.children14 !== 0 ||
      prevState.children9 !== 0

    // Only reset voucher when transitioning from non-reset to reset state
    if (isResetState && wasNonResetState) {
      setAppliedVoucherCode(null)
      setTourPrice((prevData) => ({ ...prevData, discountPrice: 0 }))
    }

    previousResetStateRef.current = {
      startDate,
      endDate,
      adults,
      children58,
      children14,
      children9,
    }
  }, [startDate, endDate, adults, children58, children14, children9, setTourPrice])

  const formatDateByLocale = (date?: Date, locale = 'en') => {
    if (!date) return ''

    return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }
  const unitPricePerPax: Record<PaxType, number> = {
    adults: pricePerPaxTypes[PaxType.ADULTS].unitPrice || 0,
    children58: pricePerPaxTypes[PaxType.CHILDREN_58].unitPrice || 0,
    children14: pricePerPaxTypes[PaxType.CHILDREN_14].unitPrice || 0,
    children9: pricePerPaxTypes[PaxType.CHILDREN_9].unitPrice || 0,
  }
  const children14FreeQty = children14 > 0 ? 1 : 0 // bé đầu tiên miễn phí
  const children14ChargedQty = Math.max(0, children14 - children14FreeQty)

  const paxQuantityItems = [
    {
      label: translateBookingTourForm('adultsLabel'),
      quantity: adults,
      price: unitPricePerPax[PaxType.ADULTS] * adults,
    },
    {
      label: translateBookingTourForm('children58Label'),
      quantity: children58,
      price: unitPricePerPax[PaxType.CHILDREN_58] * children58,
    },
    {
      label: translateBookingTourForm('children14Label'),
      quantity: children14,
      price: unitPricePerPax[PaxType.CHILDREN_14] * children14ChargedQty,
    },
    {
      label: translateBookingTourForm('children9Label'),
      quantity: children9,
      price: unitPricePerPax[PaxType.CHILDREN_9] * children9,
    },
  ].filter((item) => item.quantity > 0)

  const handleApplyVoucher = async () => {
    startApplyingTransition(async () => {
      try {
        if (!startDate || !endDate) {
          toast.error(translateBookingTourForm('startDateRequired'))
          return
        }
        const payload: ApplyVoucherPayloadType = {
          startDate: startDate,
          endDate: endDate,
          tourSlug: tourSlug,
          voucherCode: couponCode,
          paxQuantity: {
            adults: adults,
            children58: children58,
            children14: children14,
            children9: children9,
          },
        }

        const response: ApplyVoucherResponseType = await tourService.applyVoucher(payload)
        if (response.success) {
          setTourPrice((prevData) => ({
            ...prevData,
            discountPrice: response.voucher?.discount || 0,
          }))
          setAppliedVoucherCode(couponCode) // Lưu voucher code đã áp dụng thành công
          toast.success(translateBookingTourForm('textApplyVoucherSuccess'))
        } else {
          setTourPrice((prevData) => ({ ...prevData, discountPrice: 0 }))
          setAppliedVoucherCode(null) // Reset voucher code khi apply fail
          // Hiển thị message cụ thể từ API nếu có, nếu không thì dùng message mặc định
          const errorMessage = response.message
            ? response.message[locale as 'vi' | 'en'] || response.message.en || response.message.vi
            : translateBookingTourForm('textApplyVoucherError')
          toast.error(errorMessage)
        }
      } catch (error) {
        console.error(error)
        toast.error(translateBookingTourForm('textApplyVoucherError'))
      } finally {
        setCouponCode('')
      }
    })
  }

  // Tự động validate lại voucher khi ngày check-in/check-out hoặc số lượng pax thay đổi
  useEffect(() => {
    // Bỏ qua lần mount đầu tiên
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false
      previousDatesRef.current = { startDate, endDate }
      previousPaxQuantityRef.current = { adults, children58, children14, children9 }
      return
    }

    // Kiểm tra xem ngày có thay đổi không
    const datesChanged =
      previousDatesRef.current.startDate?.getTime() !== startDate?.getTime() ||
      previousDatesRef.current.endDate?.getTime() !== endDate?.getTime()

    // Kiểm tra xem số lượng pax có thay đổi không
    const paxQuantityChanged =
      previousPaxQuantityRef.current.adults !== adults ||
      previousPaxQuantityRef.current.children58 !== children58 ||
      previousPaxQuantityRef.current.children14 !== children14

    // Nếu ngày hoặc số lượng pax thay đổi và có voucher đã áp dụng, validate lại
    if ((datesChanged || paxQuantityChanged) && appliedVoucherCode && startDate && endDate) {
      const validateVoucher = async () => {
        try {
          const payload: ApplyVoucherPayloadType = {
            startDate: startDate,
            endDate: endDate,
            tourSlug: tourSlug,
            voucherCode: appliedVoucherCode,
            paxQuantity: {
              adults: adults,
              children58: children58,
              children14: children14,
              children9: children9,
            },
          }

          const response: ApplyVoucherResponseType = await tourService.applyVoucher(payload)
          if (response.success) {
            // Voucher vẫn hợp lệ, cập nhật discount price
            setTourPrice((prevData) => ({
              ...prevData,
              discountPrice: response.voucher?.discount || 0,
            }))
          } else {
            // Voucher không còn hợp lệ, reset và hiển thị thông báo
            setTourPrice((prevData) => ({ ...prevData, discountPrice: 0 }))
            setAppliedVoucherCode(null)
            const errorMessage = response.message
              ? response.message[locale as 'vi' | 'en'] ||
              response.message.en ||
              response.message.vi
              : translateBookingTourForm('textApplyVoucherError')
            toast.error(errorMessage)
          }
        } catch (error) {
          console.error('Error validating voucher:', error)
          // Nếu có lỗi khi validate, reset voucher để tránh hiển thị sai
          setTourPrice((prevData) => ({ ...prevData, discountPrice: 0 }))
          setAppliedVoucherCode(null)
        }
      }

      validateVoucher()
    }

    // Cập nhật previous dates và pax quantity
    previousDatesRef.current = { startDate, endDate }
    previousPaxQuantityRef.current = { adults, children58, children14, children9 }
  }, [
    startDate,
    endDate,
    appliedVoucherCode,
    tourSlug,
    adults,
    children58,
    children14,
    locale,
    translateBookingTourForm,
    setTourPrice,
  ])

  return (
    <>
      <div className='font-montserrat xsm:px-5 xsm:mb-3 xsm:overflow-y-auto xsm:max-h-[60vh] space-y-3.5'>
        <div className='flex items-start rounded-[1rem] bg-[#F5F5F5] px-3.5 py-2'>
          <div className='shrink-0 space-y-1.5'>
            <p className='text-[0.875rem] leading-normal text-[#3B3943]'>Duration:</p>
            <p className='capitalize xsm:tracking-normal xsm:text-[0.75rem] text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-[#F56E0A] xsm:mr-[0.8125rem]'>
              {tourDuration?.name || ''}
            </p>
          </div>
          <div className='xsm:ml-1 mr-5 ml-5.75 shrink-0 self-stretch border-r border-solid border-black/12'></div>
          <div className='space-y-1.5'>
            <p className='text-[0.875rem] leading-normal text-[#3B3943]'>Schedule:</p>
            <p className='xsm:capitalize xsm:tracking-normal xsm:text-[0.75rem] space-x-1 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-[#F56E0A]'>
              {startDate && endDate ? (
                <>
                  <span>{formatDateByLocale(startDate, locale)}</span>
                  <ICArrowRight className='inline-block size-4 -translate-y-0.25 text-[#2E2E2E]' />
                  <span>{formatDateByLocale(endDate, locale)}</span>
                </>
              ) : (
                '---'
              )}
            </p>
          </div>
        </div>

        <div className='space-y-2.5 rounded-[1rem] border-[0.4px] border-solid border-[rgba(110,110,110,0.00)] bg-[linear-gradient(139deg,#FFEDC7_-127.39%,#F7F7F7_68.78%)] p-4'>
          {paxQuantityItems?.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between not-last:border-b not-last:border-dashed not-last:border-[rgba(186,186,186,0.40)] not-last:pb-2.5'
            >
              <p className='font-montserrat flex items-center space-x-1.5 text-[0.875rem] leading-normal'>
                <span className='xsm:font-bold text-[#303030]'>
                  {item?.quantity?.toString().padStart(2, '0')}
                </span>
                <span className='text-[rgba(48,48,48,0.70)]'>{item.label}</span>
              </p>
              <p className='font-montserrat section-title-h2 text-[1rem] leading-normal font-semibold tracking-[-0.01563rem]'>
                {formatUSD(item?.price || 0)}$
              </p>
            </div>
          ))}
        </div>

        <div className='space-y-2'>
          <p className='text-body/75 font-montserrat text-[0.875rem] leading-[1.2] tracking-[0.00875rem]'>
            {translateDetailsTourPage('textVoucherCode')}
          </p>
          <div className='flex space-x-2'>
            <div className='relative flex-1'>
              <input
                type='text'
                name='voucherCode'
                className='text-body/75 placeholder:text-body/50 font-montserrat xsm:px-3 h-13 w-full rounded-[0.625rem] border-[0.8px] border-solid border-[#EDEDED] px-4 py-0 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] shadow-none outline-none placeholder:font-normal'
                placeholder={translateDetailsTourPage('textVoucherCodePlaceholder')}
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <ICTicket className='pointer-events-none absolute top-1/2 right-3 size-[1.25rem] -translate-y-1/2 text-[#2E2E2E]' />
            </div>
            <button
              type='button'
              disabled={isApplyingVoucher || !couponCode}
              onClick={handleApplyVoucher}
              className='bg-text-title-h2 flex-center xsm:text-[0.75rem] cursor-pointer rounded-[0.625rem] px-4 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-white uppercase disabled:cursor-not-allowed disabled:opacity-50'
            >
              {translateDetailsTourPage('textApply')}
            </button>
          </div>
        </div>

        <div className='space-y-4.5'>
          <div className='flex items-center justify-between'>
            <p className='text-body/75 font-montserrat text-[1rem] leading-normal opacity-80'>
              {translateDetailsTourPage('textProvisional')}:
            </p>
            <p className='font-montserrat text-body/75 text-[1.125rem] leading-loose font-medium tracking-[-0.0225rem] opacity-80'>
              {formatUSD(tourPrice?.provisionalPrice || 0)}$
            </p>
          </div>
          {tourPrice?.discountPrice != null && tourPrice.discountPrice > 0 && (
            <div className='flex items-center justify-between'>
              <p className='text-body/75 font-montserrat text-[1rem] leading-normal opacity-80'>
                {translateDetailsTourPage('textVoucher')}:
              </p>
              <p className='font-montserrat text-body/75 text-[1.125rem] leading-loose font-medium tracking-[-0.0225rem] opacity-80'>
                - {formatUSD(tourPrice.discountPrice)}$
              </p>
            </div>
          )}
          <div className='h-[0.05rem] w-full bg-[#ccc]'></div>
          <div className='flex items-center justify-between'>
            <p className='font-phu-du text-[1rem] leading-[1.3] font-bold tracking-[-0.01875rem] text-black uppercase'>
              {translateDetailsTourPage('textTotal')}
            </p>
            <p className='font-phu-du section-title-h2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
              {formatUSD(tourPrice?.provisionalPrice - tourPrice?.discountPrice || 0)}$
            </p>
          </div>
        </div>
      </div>
      <div className='xsm:px-5'>
        <BrandButton
          type={{
            variant: 'button',
            type: 'submit',
            disabled: isApplyingVoucher,
            form: 'booking-tour-form',
          }}
          variant='blueGradient'
          classNameButtonText='uppercase font-montserrat text-[0.875rem] text-white xsm:text-[0.875rem] xsm:font-semibold'
          classNameButtonContainer='w-full'
        >
          {translateDetailsTourPage('textBookNow')}
        </BrandButton>
      </div>
    </>
  )
}
