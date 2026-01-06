'use client'
import ICTicket from '@/components/icons/ICTicket'
import { BrandButton } from '@/components/shared'
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
import { useContext, useState, useTransition } from 'react'
import { toast } from 'sonner'

interface BookingOverviewProps {
  tourDuration: TourDurationType
  pricePerPax: DetailsTourPricePerPaxType
}

export default function BookingOverview({ tourDuration, pricePerPax }: BookingOverviewProps) {
  const bookingTourContext = useContext(BookingTourContext)
  if (!bookingTourContext) {
    throw new Error('BookingTourContext not found')
  }

  const {
    bookingTourData: { startDate, endDate, paxQuantity },
    tourSlug,
  } = bookingTourContext
  const { adults = 0, children58 = 0, children14 = 0 } = paxQuantity || {}
  const locale = useLocale()
  const translateBookingTourForm = useTranslations('BookingTourForm')
  const translateDetailsTourPage = useTranslations('DetailsTourPage')
  const [voucher, setVoucher] = useState({ voucherCode: '', voucherPrice: 0 })
  const [isApplyingVoucher, startApplyingTransition] = useTransition()

  const formatDateByLocale = (date?: Date, locale = 'en') => {
    if (!date) return ''

    return new Intl.DateTimeFormat(locale === 'vi' ? 'vi-VN' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }
  const paxQuantityItems = [
    {
      label: translateBookingTourForm('adultsLabel'),
      quantity: adults,
      price: Number(pricePerPax?.adults) * Number(adults) || 0,
    },
    {
      label: translateBookingTourForm('children58Label'),
      quantity: children58,
      price: Number(pricePerPax?.children58) * Number(children58) || 0,
    },
    {
      label: translateBookingTourForm('children14Label'),
      quantity: children14,
      price: Number(pricePerPax?.children14) * Number(children14) || 0,
    },
  ]

  const provisionalPrice = paxQuantityItems.reduce((acc, item) => acc + item.price, 0) || 0
  const totalPrice = provisionalPrice - voucher.voucherPrice || 0

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
          voucherCode: voucher.voucherCode,
          paxQuantity: {
            adults: adults,
            children58: children58,
            children14: children14,
          },
        }

        const response: ApplyVoucherResponseType = await tourService.applyVoucher(payload)
        if (response.success) {
          setVoucher((prev) => ({ ...prev, voucherPrice: response.voucher.discount }))
          toast.success(translateBookingTourForm('textApplyVoucherSuccess'))
        } else {
          toast.error(translateBookingTourForm('textApplyVoucherError'))
        }
      } catch (error) {
        console.error(error)
        toast.error(translateBookingTourForm('textApplyVoucherError'))
      } finally {
        setVoucher((prev) => ({ ...prev, voucherCode: '' }))
      }
    })
  }

  return (
    <>
      <div className='font-montserrat xsm:px-5 xsm:mb-3 xsm:overflow-y-auto xsm:max-h-[60vh] space-y-3.5'>
        <div className='flex items-start rounded-[1rem] bg-[#F5F5F5] px-3.5 py-2'>
          <div className='shrink-0 space-y-1.5'>
            <span className='text-[0.875rem] leading-normal text-[#3B3943]'>Duration:</span>
            <p className='xsm:uppercase xsm:tracking-normal xsm:text-[0.75rem] text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-[#F56E0A]'>
              {tourDuration?.name || ''}
            </p>
          </div>
          <div className='xsm:ml-1 mr-5 ml-5.75 shrink-0 self-stretch border-r border-solid border-black/12'></div>
          <div className='space-y-1.5'>
            <span className='text-[0.875rem] leading-normal text-[#3B3943]'>Schedule:</span>
            <p className='xsm:uppercase xsm:tracking-normal xsm:text-[0.75rem] space-x-1 text-[0.875rem] leading-[1.2] font-semibold tracking-[0.00875rem] text-[#F56E0A]'>
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
                {item?.price}$
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
                value={voucher.voucherCode}
                onChange={(e) => setVoucher({ ...voucher, voucherCode: e.target.value })}
              />
              <ICTicket className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#2E2E2E]' />
            </div>
            <button
              type='button'
              disabled={isApplyingVoucher || voucher.voucherCode.length === 0}
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
              {provisionalPrice}$
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='font-montserrat text-[1rem] leading-[1.6] tracking-[0.04rem] text-black'>
              {translateDetailsTourPage('textVoucher')}:
            </p>
            <p className='font-montserrat text-[1rem] leading-[1.6] tracking-[0.04rem] text-black'>
              {voucher.voucherPrice}$
            </p>
          </div>
          <div className='h-[0.05rem] w-full bg-[#ccc]'></div>
          <div className='flex items-center justify-between'>
            <p className='font-phu-du text-[1rem] leading-[1.3] font-bold tracking-[-0.01875rem] text-black uppercase'>
              {translateDetailsTourPage('textTotal')}
            </p>
            <p className='font-phu-du section-title-h2 text-[1.75rem] leading-8.25 font-bold tracking-[-0.03125rem] uppercase'>
              {totalPrice}$
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
