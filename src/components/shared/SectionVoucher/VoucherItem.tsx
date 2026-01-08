'use client'

import ICCopy from '@/components/icons/ICCopy'
import { cn } from '@/lib/utils'
import { VoucherType } from '@/types/details-tour.type'
import { useCopyToClipboard } from '@uidotdev/usehooks'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { toast } from 'sonner'

interface VoucherItemProps {
  couponLocation: string
  couponTitle: string
  couponCode: string
  couponType: VoucherType
  couponDiscountPercent: number
  couponDiscountPrice: number
  couponApplyStartDate: string
  couponMinPrice: number
  couponForWhom: string
  classNameCard?: string
}

export default function VoucherItem({
  couponLocation,
  couponTitle,
  couponCode,
  couponType,
  couponDiscountPercent,
  couponDiscountPrice,
  couponApplyStartDate,
  couponForWhom,
  couponMinPrice,
  classNameCard,
}: VoucherItemProps) {
  const translateComponent = useTranslations('Components.CouponCard')
  const [_, copyToClipboard] = useCopyToClipboard()
  const handleCopyVoucher = async (couponCode: string) => {
    try {
      await copyToClipboard(couponCode)
      toast.success(`${translateComponent('textCopied')}: ${couponCode}`)
    } catch (error) {
      toast.error('Copy failed')
    }
  }

  return (
    <article
      className={cn(
        'xsm:w-full xsm:h-38.25 xsm:drop-shadow-[0_3.026px_12.106px_rgba(0,0,0,0.12)] relative h-[11.9725rem] w-full rounded-[1.25rem] drop-shadow-[0_4px_16px_rgba(0,0,0,0.12)]',
        classNameCard,
      )}
    >
      <div className='relative h-full w-full overflow-hidden rounded-[1.25rem]'>
        <Image
          src='/uu-dai/bg-card-left.webp'
          alt='bg card left'
          fill
          className='xsm:hidden object-cover'
        />
        <Image
          alt=''
          fill
          className='object-cover sm:hidden'
          src='/coupon-card/bg-card-left-mb.svg'
        />
        <Image
          src='/uu-dai/bg-card-right.webp'
          alt='bg card right'
          fill
          className='xsm:hidden object-cover'
        />
        <Image
          fill
          alt=''
          className='object-cover sm:hidden'
          src='/coupon-card/bg-card-right-mb.svg'
        />
        <div className='xsm:left-52 font-phu-du xsm:w-[7.15rem] xsm:space-y-[0.8125rem] absolute top-0 left-64.75 flex h-full w-[8.9375rem] flex-col items-center justify-center font-bold tracking-normal text-white'>
          <div className='flex-col items-center justify-center'>
            <div className='xsm:text-[1.11025rem] text-center text-[1.3125rem] leading-[0.9]'>
              {translateComponent('textDiscount')}
            </div>
            <div className='xsm:text-[3.25rem] text-center text-[4rem] leading-[0.9]'>
              {couponType === 'percent' ? couponDiscountPercent + '%' : couponDiscountPrice + '$'}
            </div>
          </div>

          <p className='xsm:block font-montserrat hidden text-center text-[0.625rem] leading-[1.6] font-medium tracking-[-0.00625rem] text-white'>
            <span>{translateComponent('textMinApplication')}</span>
            <br />
            <span>{couponMinPrice}$</span>
          </p>
        </div>

        <div className='xsm:top-2.5 xsm:left-[0.7125rem] xsm:w-47 xsm:h-31 absolute top-3.75 left-[0.9rem] z-1 flex h-[10.0325rem] w-[14.68844rem] flex-col items-start justify-between'>
          <div className='xsm:space-y-2 space-y-3'>
            {/* tag */}
            <p className='xsm:h-[0.9686rem] xsm:px-[0.35406rem] xsm:rounded-[0.177rem] flex h-5 w-fit items-center justify-center rounded-[0.25rem] bg-[#F56E0A] px-1.75'>
              <span className='font-montserrat text-[0.75rem] leading-[1.2rem] font-medium tracking-[-0.0075rem] text-white'>
                {couponLocation}
              </span>
            </p>
            {/* title */}
            <div className='xsm:h-2.5 h-2.75'>
              <h3 className='xsm:text-[0.875rem] xsm:leading-[1.05rem] xsm:tracking-[0.0175rem] font-phu-du text-body-t1 line-clamp-1 text-[1rem] leading-none font-medium'>
                {couponTitle}
              </h3>
            </div>
            <div className='space-y-3'>
              <div className='xsm:h-1.75 h-2.5'>
                <div className='xsm:space-x-[0.28375rem] xsm:text-[0.625rem] xsm:leading-4 xsm:tracking-[-0.00625rem] font-montserrat text-body-t1/48 flex items-center space-x-[0.33256rem] text-[0.75rem] leading-[1.2] font-medium tracking-[-0.0075rem]'>
                  <span>{translateComponent('textApplyDate')}:</span>
                  <span>{couponApplyStartDate}</span>
                </div>
              </div>
              <div className='xsm:h-[1.13162rem] xsm:px-[0.35406rem] xsm:h-[1.1456rem] xsm:rounded-[0.18913rem] xsm:text-[0.625rem] xsm:leading-[1.6] xsm:tracking-[-0.00625rem] font-montserrat flex h-[1.3869rem] w-fit items-center justify-center rounded-[0.25rem] bg-[#2BAB7D] p-[0.44344rem] text-[0.75rem] leading-[1.2] font-medium tracking-[-0.0075rem] text-white'>
                <p className='line-clamp-1'>{couponForWhom}</p>
              </div>
            </div>
          </div>
          <div className='xsm:space-y-[0.47288rem] w-full space-y-[0.55rem]'>
            <div className='xsm:h-1.75 h-2'>
              <p className='xsm:text-[0.625rem] xsm:leading-4 xsm:tracking-[-0.00625rem] font-montserrat text-body-t1/48 text-[0.75rem] leading-none font-medium tracking-[-0.0075rem]'>
                {translateComponent('textApplyDate')}:
              </p>
            </div>
            <div className='xsm:gap-[0.56744rem] xsm:justify-between flex items-center space-x-[0.66513rem]'>
              <span className='xsm:text-[0.75rem] xsm:leading-[1.6] xsm:tracking-[-0.0075rem] font-montserrat max-w-30 truncate text-[0.75rem] leading-[1.6] font-semibold tracking-[-0.0075rem] text-[#1F4D37]'>
                {couponCode}
              </span>
              <button
                type='button'
                onClick={() => handleCopyVoucher(couponCode)}
                className='xsm:h-[1.04035rem] xsm:py-[0.18913rem] xsm:px-[0.37831rem] xsm:gap-[0.28375rem] xsm:rounded-[0.18913rem] xsm:text-[0.625rem] xsm:leading-[1rem] xsm:tracking-[-0.00625rem] font-montserrat flex h-[1.375rem] shrink-0 cursor-pointer items-center gap-[0.375rem] rounded-[0.25rem] bg-[rgba(0,0,0,0.60)] px-[0.5rem] py-[0.25rem] text-[0.75rem] leading-[1.2rem] font-medium tracking-[-0.0075rem] text-white'
              >
                <ICCopy className='xsm:size-[0.66206rem] size-[0.875rem]' />
                <span>{translateComponent('textCopy')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
